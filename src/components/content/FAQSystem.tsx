'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Filter,
  Tag,
} from 'lucide-react';
import type { FAQItem } from '@/types/content';
import { faqCategories } from '@/data/faqs';

interface Props {
  faqs: FAQItem[];
}

export function FAQSystem({ faqs }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());
  const [showPopularFirst, setShowPopularFirst] = useState(true);
  const [feedbackGiven, setFeedbackGiven] = useState<Set<string>>(new Set());

  const filteredFAQs = useMemo(() => {
    let filtered = faqs;

    // Category filter
    if (selectedCategory !== 'all') {
      const categoryName =
        faqCategories.find((cat) => cat.id === selectedCategory)?.name || selectedCategory;
      filtered = filtered.filter((faq) => faq.category === categoryName);
    }

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchLower) ||
          faq.answer.toLowerCase().includes(searchLower) ||
          faq.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          faq.category.toLowerCase().includes(searchLower)
      );
    }

    // Sort by popularity if enabled
    if (showPopularFirst) {
      filtered.sort((a, b) => {
        // Featured first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Then by helpfulness ratio
        const aRatio = a.helpful / (a.helpful + a.notHelpful);
        const bRatio = b.helpful / (b.helpful + b.notHelpful);
        return bRatio - aRatio;
      });
    }

    return filtered;
  }, [faqs, selectedCategory, searchTerm, showPopularFirst]);

  const toggleFAQ = (faqId: string) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedFAQs(newExpanded);
  };

  const handleFeedback = (faqId: string, isHelpful: boolean) => {
    // In a real app, this would update the backend
    setFeedbackGiven((prev) => new Set([...prev, faqId]));

    // Show a thank you message or update local state
    console.log(`Feedback for ${faqId}: ${isHelpful ? 'helpful' : 'not helpful'}`);
  };

  const getPopularityScore = (faq: FAQItem) => {
    const total = faq.helpful + faq.notHelpful;
    if (total === 0) return 0;
    return Math.round((faq.helpful / total) * 100);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
  };

  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
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
              placeholder="Search questions, answers, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="lg:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {faqCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Toggle */}
          <label className="flex items-center gap-2 lg:w-48">
            <input
              type="checkbox"
              checked={showPopularFirst}
              onChange={(e) => setShowPopularFirst(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Popular first</span>
          </label>
        </div>

        {/* Active Filters */}
        {(searchTerm || selectedCategory !== 'all') && (
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Active filters:</span>
            </div>
            <div className="flex gap-2">
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  <Search className="w-3 h-3" />"{searchTerm}"
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
                  <Tag className="w-3 h-3" />
                  {faqCategories.find((cat) => cat.id === selectedCategory)?.name}
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredFAQs.length} of {faqs.length} questions
        </div>
      </div>

      {/* Category Overview */}
      {selectedCategory === 'all' && !searchTerm && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {faqCategories.map((category) => {
            const categoryFAQs = faqs.filter((faq) => faq.category === category.name);
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="bg-white rounded-lg border border-gray-200 p-6 text-left hover:shadow-md hover:border-primary-300 transition-all group"
              >
                <div className="text-2xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                <div className="text-sm text-primary-600 font-medium">
                  {categoryFAQs.length} questions
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.map((faq) => (
          <div
            key={faq.id}
            className={`bg-white rounded-lg border transition-all ${
              expandedFAQs.has(faq.id)
                ? 'border-primary-300 shadow-lg'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            {/* Question Header */}
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {highlightSearchTerm(faq.question, searchTerm)}
                  </h3>
                  {faq.featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                      Popular
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="capitalize">{faq.category}</span>
                  <span>•</span>
                  <span>{getPopularityScore(faq)}% found helpful</span>
                  <span>•</span>
                  <span>Updated {new Date(faq.lastUpdated).toLocaleDateString('en-AU')}</span>
                </div>
              </div>

              <div className="ml-4">
                {expandedFAQs.has(faq.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                )}
              </div>
            </button>

            {/* Answer Content */}
            {expandedFAQs.has(faq.id) && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="pt-4">
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {highlightSearchTerm(faq.answer, searchTerm)}
                    </p>
                  </div>

                  {/* Tags */}
                  {faq.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {faq.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => setSearchTerm(tag)}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Related Questions */}
                  {faq.relatedQuestions.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Related Questions</h4>
                      <div className="space-y-2">
                        {faq.relatedQuestions.map((relatedId) => {
                          const relatedFAQ = faqs.find((f) => f.id === relatedId);
                          if (!relatedFAQ) return null;

                          return (
                            <button
                              key={relatedId}
                              onClick={() => toggleFAQ(relatedId)}
                              className="block text-left text-sm text-primary-600 hover:text-primary-700 hover:underline"
                            >
                              → {relatedFAQ.question}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Feedback */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Was this helpful?</span>

                      {feedbackGiven.has(faq.id) ? (
                        <span className="text-sm text-green-600 font-medium">
                          Thank you for your feedback!
                        </span>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleFeedback(faq.id, true)}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4" />
                            Yes ({faq.helpful})
                          </button>
                          <button
                            onClick={() => handleFeedback(faq.id, false)}
                            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <ThumbsDown className="w-4 h-4" />
                            No ({faq.notHelpful})
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredFAQs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <MessageCircle className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any questions matching your search. Try different keywords or browse
            all categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Clear Filters
            </button>
            <a
              href="/contact"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Ask a Question
            </a>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-gray-100 rounded-xl p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Still have questions?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Ask Our Experts
            </a>
            <a
              href="/calculator"
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
