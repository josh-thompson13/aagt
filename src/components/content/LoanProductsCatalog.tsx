'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import type { LoanProduct, ContentFilter } from '@/types/content';
import { productCategories, productFeatures } from '@/data/loanProducts';

interface Props {
  products: LoanProduct[];
}

export function LoanProductsCatalog({ products }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ContentFilter>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'title' | 'rate' | 'amount' | 'popular'>('popular');

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Text search
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          product.features.some((feature) => feature.toLowerCase().includes(searchLower));

        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category?.length && !filters.category.includes(product.category)) {
        return false;
      }

      // Amount filter
      if (filters.minAmount && product.maxAmount < filters.minAmount) {
        return false;
      }
      if (filters.maxAmount && product.minAmount > filters.maxAmount) {
        return false;
      }

      // Rate filter
      if (filters.minRate && product.maxRate < filters.minRate) {
        return false;
      }
      if (filters.maxRate && product.minRate > filters.maxRate) {
        return false;
      }

      // Features filter
      if (filters.features?.length) {
        const hasFeature = filters.features.some((feature) =>
          product.features.some((pFeature) =>
            pFeature.toLowerCase().includes(feature.toLowerCase())
          )
        );
        if (!hasFeature) return false;
      }

      // Availability filter
      if (filters.available !== undefined && product.available !== filters.available) {
        return false;
      }

      // Featured filter
      if (filters.featured !== undefined && product.featured !== filters.featured) {
        return false;
      }

      // Popular filter
      if (filters.popular !== undefined && product.popular !== filters.popular) {
        return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rate':
          return a.minRate - b.minRate;
        case 'amount':
          return a.minAmount - b.minAmount;
        case 'popular':
          // Featured first, then popular, then by rate
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return a.minRate - b.minRate;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, filters, sortBy]);

  const updateFilter = (key: keyof ContentFilter, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRate = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search loan products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Sort */}
          <div className="lg:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="popular">Popular First</option>
              <option value="title">Name A-Z</option>
              <option value="rate">Lowest Rate</option>
              <option value="amount">Lowest Amount</option>
            </select>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filters
            <ChevronDown
              className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="space-y-2">
                  {productCategories.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.category?.includes(category.id) || false}
                        onChange={(e) => {
                          const current = filters.category || [];
                          if (e.target.checked) {
                            updateFilter('category', [...current, category.id]);
                          } else {
                            updateFilter(
                              'category',
                              current.filter((c) => c !== category.id)
                            );
                          }
                        }}
                        className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amount Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
                <div className="space-y-2">
                  <input
                    type="number"
                    placeholder="Min amount"
                    value={filters.minAmount || ''}
                    onChange={(e) =>
                      updateFilter('minAmount', e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max amount"
                    value={filters.maxAmount || ''}
                    onChange={(e) =>
                      updateFilter('maxAmount', e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Rate Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Min rate"
                    value={filters.minRate || ''}
                    onChange={(e) =>
                      updateFilter('minRate', e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Max rate"
                    value={filters.maxRate || ''}
                    onChange={(e) =>
                      updateFilter('maxRate', e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {productFeatures.slice(0, 6).map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.features?.includes(feature) || false}
                        onChange={(e) => {
                          const current = filters.features || [];
                          if (e.target.checked) {
                            updateFilter('features', [...current, feature]);
                          } else {
                            updateFilter(
                              'features',
                              current.filter((f) => f !== feature)
                            );
                          }
                        }}
                        className="mr-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear All Filters
              </button>
              <div className="text-sm text-gray-600 flex items-center">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
                  <p className="text-gray-600">{product.shortDescription}</p>
                </div>
                <div className="flex gap-2">
                  {product.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                      Featured
                    </span>
                  )}
                  {product.popular && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      Popular
                    </span>
                  )}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-100 rounded-full mx-auto mb-2">
                    <DollarSign className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="text-sm text-gray-600">Amount</div>
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(product.minAmount)} - {formatCurrency(product.maxAmount)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-sm text-gray-600">Rate from</div>
                  <div className="font-semibold text-gray-900">
                    {formatRate(product.minRate)} p.a.
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-sm text-gray-600">Approval</div>
                  <div className="font-semibold text-gray-900">
                    {product.turnaroundTime.approval}
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
              <div className="grid grid-cols-1 gap-2">
                {product.features.slice(0, 4).map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
                {product.features.length > 4 && (
                  <div className="text-sm text-gray-500 mt-1">
                    +{product.features.length - 4} more features
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href={`/loan-products/${product.slug}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/calculator"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Calculate
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search criteria or clearing the filters
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
