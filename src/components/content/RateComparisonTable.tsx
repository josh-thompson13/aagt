'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, Info, Crown, Calculator, ArrowUpDown } from 'lucide-react';
import type { RateComparison } from '@/types/content';
import { rateCategories } from '@/data/rateComparisons';

interface Props {
  rates: RateComparison[];
}

type SortField = 'lender' | 'rate' | 'comparisonRate' | 'establishment' | 'maxLoanAmount';
type SortDirection = 'asc' | 'desc';

export function RateComparisonTable({ rates }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'business' | 'investment' | 'personal'>('all');
  const [sortField, setSortField] = useState<SortField>('comparisonRate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showAAGTOnly, setShowAAGTOnly] = useState(false);

  const filteredRates = useMemo(() => {
    let filtered = rates;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(rate => rate.category === selectedCategory);
    }

    // AAGT only filter
    if (showAAGTOnly) {
      filtered = filtered.filter(rate => rate.isAAGT);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortField) {
        case 'lender':
          aValue = a.lender;
          bValue = b.lender;
          break;
        case 'rate':
          aValue = a.rate;
          bValue = b.rate;
          break;
        case 'comparisonRate':
          aValue = a.comparisonRate;
          bValue = b.comparisonRate;
          break;
        case 'establishment':
          aValue = a.fees.establishment;
          bValue = b.fees.establishment;
          break;
        case 'maxLoanAmount':
          aValue = a.maxLoanAmount;
          bValue = b.maxLoanAmount;
          break;
        default:
          aValue = a.comparisonRate;
          bValue = b.comparisonRate;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    // AAGT rates first when not filtering
    if (!showAAGTOnly) {
      filtered.sort((a, b) => {
        if (a.isAAGT && !b.isAAGT) return -1;
        if (!a.isAAGT && b.isAAGT) return 1;
        return 0;
      });
    }

    return filtered;
  }, [rates, selectedCategory, sortField, sortDirection, showAAGTOnly]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatRate = (rate: number) => {
    return `${rate.toFixed(2)}%`;
  };

  const getAAGTAdvantage = (aagtRate: RateComparison, bankRate: RateComparison) => {
    const rateDiff = bankRate.comparisonRate - aagtRate.comparisonRate;
    const isLower = rateDiff > 0;
    
    return {
      isLower,
      difference: Math.abs(rateDiff),
      message: isLower 
        ? `${rateDiff.toFixed(2)}% higher than AAGT`
        : `${Math.abs(rateDiff).toFixed(2)}% lower than AAGT`
    };
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-primary-600 transition-colors group"
    >
      {children}
      <ArrowUpDown className="w-4 h-4 opacity-50 group-hover:opacity-100" />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {rateCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* AAGT Filter */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showAAGTOnly}
                onChange={(e) => setShowAAGTOnly(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Show AAGT only</span>
            </label>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Info className="w-4 h-4" />
            Showing {filteredRates.length} rate{filteredRates.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  <SortButton field="lender">Lender</SortButton>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Product
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  <SortButton field="rate">Interest Rate</SortButton>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  <SortButton field="comparisonRate">Comparison Rate</SortButton>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  <SortButton field="establishment">Est. Fee</SortButton>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  <SortButton field="maxLoanAmount">Max Loan</SortButton>
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Features
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRates.map((rate, index) => (
                <tr 
                  key={rate.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    rate.isAAGT ? 'bg-primary-50 border-primary-200' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {rate.isAAGT && <Crown className="w-4 h-4 text-yellow-500" />}
                      <div>
                        <div className={`font-semibold ${rate.isAAGT ? 'text-primary-900' : 'text-gray-900'}`}>
                          {rate.lender}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {rate.category} loan
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {rate.productName}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`text-lg font-semibold ${rate.isAAGT ? 'text-primary-600' : 'text-gray-900'}`}>
                      {formatRate(rate.rate)}
                    </div>
                    <div className="text-xs text-gray-500">p.a.</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className={`text-lg font-semibold ${rate.isAAGT ? 'text-primary-600' : 'text-gray-900'}`}>
                      {formatRate(rate.comparisonRate)}
                    </div>
                    <div className="text-xs text-gray-500">incl. fees</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(rate.fees.establishment)}
                    </div>
                    {rate.fees.monthly > 0 && (
                      <div className="text-xs text-gray-500">
                        +{formatCurrency(rate.fees.monthly)}/mo
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(rate.maxLoanAmount)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Up to {rate.maxLvr}% LVR
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs space-y-1">
                      {rate.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="text-gray-600">
                          • {feature}
                        </div>
                      ))}
                      {rate.features.length > 3 && (
                        <div className="text-gray-500">
                          +{rate.features.length - 3} more
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AAGT Advantages Summary */}
      {!showAAGTOnly && filteredRates.some(r => r.isAAGT) && (
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-yellow-300" />
            <h3 className="text-xl font-semibold">Why Choose AAGT?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-300" />
              <div>
                <div className="font-semibold">Same-Day Approval</div>
                <div className="text-primary-100 text-sm">vs 10-14 days with banks</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8 text-blue-300" />
              <div>
                <div className="font-semibold">No Monthly Fees</div>
                <div className="text-primary-100 text-sm">Save on ongoing costs</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-yellow-300" />
              <div>
                <div className="font-semibold">Minimal Documentation</div>
                <div className="text-primary-100 text-sm">Streamlined application</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
        <div className="text-sm text-yellow-700 space-y-1">
          <p>• Comparison rates calculated on a loan amount of $150,000 over a term of 25 years</p>
          <p>• All rates shown are indicative and subject to credit assessment</p>
          <p>• Actual rates may vary based on loan amount, security, and borrower profile</p>
          <p>• Rates current as of {new Date().toLocaleDateString('en-AU')} and subject to change</p>
          <p>• Applications subject to credit approval and lending criteria</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="/calculator"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          <Calculator className="w-5 h-5" />
          Calculate Your Payments
        </a>
        <a
          href="/contact"
          className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
        >
          Get Personalized Quote
        </a>
      </div>
    </div>
  );
}