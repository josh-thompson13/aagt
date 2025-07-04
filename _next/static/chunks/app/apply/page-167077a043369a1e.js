(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [385],
  {
    3453: (e, r, s) => {
      s.d(r, { A: () => a });
      const a = (0, s(9946).A)('circle-check', [
        ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
        ['path', { d: 'm9 12 2 2 4-4', key: 'dzmm74' }],
      ]);
    },
    5199: (e, r, s) => {
      Promise.resolve().then(s.t.bind(s, 9243, 23)), Promise.resolve().then(s.bind(s, 9795));
    },
    5339: (e, r, s) => {
      s.d(r, { A: () => a });
      const a = (0, s(9946).A)('circle-alert', [
        ['circle', { cx: '12', cy: '12', r: '10', key: '1mglay' }],
        ['line', { x1: '12', x2: '12', y1: '8', y2: '12', key: '1pkeuh' }],
        ['line', { x1: '12', x2: '12.01', y1: '16', y2: '16', key: '4dfq90' }],
      ]);
    },
    5525: (e, r, s) => {
      s.d(r, { A: () => a });
      const a = (0, s(9946).A)('shield', [
        [
          'path',
          {
            d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
            key: 'oel41y',
          },
        ],
      ]);
    },
    5868: (e, r, s) => {
      s.d(r, { A: () => a });
      const a = (0, s(9946).A)('dollar-sign', [
        ['line', { x1: '12', x2: '12', y1: '2', y2: '22', key: '7eqyqh' }],
        ['path', { d: 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', key: '1b0p4s' }],
      ]);
    },
    9795: (e, r, s) => {
      s.d(r, { default: () => u });
      var a = s(5155),
        n = s(2115),
        t = s(3453),
        l = s(5339),
        i = s(9946);
      const o = (0, i.A)('user', [
          ['path', { d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2', key: '975kel' }],
          ['circle', { cx: '12', cy: '7', r: '4', key: '17ys0d' }],
        ]),
        d = (0, i.A)('building', [
          ['rect', { width: '16', height: '20', x: '4', y: '2', rx: '2', ry: '2', key: '76otgf' }],
          ['path', { d: 'M9 22v-4h6v4', key: 'r93iot' }],
          ['path', { d: 'M8 6h.01', key: '1dz90k' }],
          ['path', { d: 'M16 6h.01', key: '1x0f13' }],
          ['path', { d: 'M12 6h.01', key: '1vi96p' }],
          ['path', { d: 'M12 10h.01', key: '1nrarc' }],
          ['path', { d: 'M12 14h.01', key: '1etili' }],
          ['path', { d: 'M16 10h.01', key: '1m94wz' }],
          ['path', { d: 'M16 14h.01', key: '1gbofw' }],
          ['path', { d: 'M8 10h.01', key: '19clt8' }],
          ['path', { d: 'M8 14h.01', key: '6423bh' }],
        ]);
      var c = s(5868),
        m = s(5525);
      function u() {
        const [e, r] = (0, n.useState)({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            businessName: '',
            abn: '',
            businessAddress: '',
            industry: '',
            yearsInBusiness: '',
            loanAmount: '',
            loanType: '',
            preferredTerm: '',
            timeframe: '',
            loanPurpose: '',
            hasProperty: '',
            propertyValue: '',
            propertyAddress: '',
            declinedByBanks: !1,
            workingWithBroker: !1,
            agreeToTerms: !1,
            receiveUpdates: !1,
          }),
          [s, i] = (0, n.useState)(!1),
          [u, p] = (0, n.useState)({ type: null, message: '' }),
          h = (e) => {
            const { name: s, value: a, type: n } = e.target;
            if ('checkbox' === n) {
              const a = e.target.checked;
              r((e) => ({ ...e, [s]: a }));
            } else r((e) => ({ ...e, [s]: a }));
          },
          x = async (s) => {
            if ((s.preventDefault(), !e.agreeToTerms))
              return void p({
                type: 'error',
                message: 'Please agree to the Terms and Conditions to continue.',
              });
            i(!0), p({ type: null, message: '' });
            try {
              const s = await fetch('/api/apply', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(e),
                }),
                a = await s.json();
              s.ok
                ? (p({
                    type: 'success',
                    message:
                      a.message ||
                      'Thank you for your loan application! A lending specialist will review your application and contact you within 4 hours during business hours.',
                  }),
                  r({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    businessName: '',
                    abn: '',
                    businessAddress: '',
                    industry: '',
                    yearsInBusiness: '',
                    loanAmount: '',
                    loanType: '',
                    preferredTerm: '',
                    timeframe: '',
                    loanPurpose: '',
                    hasProperty: '',
                    propertyValue: '',
                    propertyAddress: '',
                    declinedByBanks: !1,
                    workingWithBroker: !1,
                    agreeToTerms: !1,
                    receiveUpdates: !1,
                  }))
                : p({
                    type: 'error',
                    message: a.error || 'Something went wrong. Please try again.',
                  });
            } catch (e) {
              p({
                type: 'error',
                message: 'Network error. Please check your connection and try again.',
              });
            } finally {
              i(!1);
            }
          };
        return (0, a.jsxs)('div', {
          className: 'bg-white rounded-2xl shadow-lg p-8',
          children: [
            u.type &&
              (0, a.jsxs)('div', {
                className: `p-4 rounded-lg border flex items-center gap-3 mb-6 ${'success' === u.type ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`,
                children: [
                  'success' === u.type
                    ? (0, a.jsx)(t.A, { className: 'w-5 h-5 flex-shrink-0' })
                    : (0, a.jsx)(l.A, { className: 'w-5 h-5 flex-shrink-0' }),
                  (0, a.jsx)('p', { className: 'font-medium', children: u.message }),
                ],
              }),
            (0, a.jsxs)('form', {
              onSubmit: x,
              className: 'space-y-8',
              children: [
                (0, a.jsxs)('div', {
                  children: [
                    (0, a.jsxs)('h3', {
                      className: 'text-xl font-bold text-gray-900 mb-6 flex items-center',
                      children: [
                        (0, a.jsx)(o, { className: 'h-6 w-6 text-primary-700 mr-2' }),
                        'Personal Information',
                      ],
                    }),
                    (0, a.jsxs)('div', {
                      className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                      children: [
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'First Name *',
                            }),
                            (0, a.jsx)('input', {
                              type: 'text',
                              name: 'firstName',
                              value: e.firstName,
                              onChange: h,
                              required: !0,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              placeholder: 'Enter your first name',
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Last Name *',
                            }),
                            (0, a.jsx)('input', {
                              type: 'text',
                              name: 'lastName',
                              value: e.lastName,
                              onChange: h,
                              required: !0,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              placeholder: 'Enter your last name',
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Email Address *',
                            }),
                            (0, a.jsx)('input', {
                              type: 'email',
                              name: 'email',
                              value: e.email,
                              onChange: h,
                              required: !0,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              placeholder: 'your@email.com',
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Phone Number *',
                            }),
                            (0, a.jsx)('input', {
                              type: 'tel',
                              name: 'phone',
                              value: e.phone,
                              onChange: h,
                              required: !0,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              placeholder: '04XX XXX XXX',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsxs)('div', {
                  children: [
                    (0, a.jsxs)('h3', {
                      className: 'text-xl font-bold text-gray-900 mb-6 flex items-center',
                      children: [
                        (0, a.jsx)(d, { className: 'h-6 w-6 text-primary-700 mr-2' }),
                        'Business Information',
                      ],
                    }),
                    (0, a.jsxs)('div', {
                      className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                      children: [
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Business Name *',
                            }),
                            (0, a.jsx)('input', {
                              type: 'text',
                              name: 'businessName',
                              value: e.businessName,
                              onChange: h,
                              required: !0,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              placeholder: 'Your business name',
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'ABN',
                            }),
                            (0, a.jsx)('input', {
                              type: 'text',
                              name: 'abn',
                              value: e.abn,
                              onChange: h,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              placeholder: 'XX XXX XXX XXX',
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          className: 'md:col-span-2',
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Business Address *',
                            }),
                            (0, a.jsx)('input', {
                              type: 'text',
                              name: 'businessAddress',
                              value: e.businessAddress,
                              onChange: h,
                              required: !0,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              placeholder: 'Street address, city, state, postcode',
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Industry/Business Type *',
                            }),
                            (0, a.jsxs)('select', {
                              name: 'industry',
                              value: e.industry,
                              onChange: h,
                              required: !0,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              children: [
                                (0, a.jsx)('option', { value: '', children: 'Select industry' }),
                                (0, a.jsx)('option', {
                                  value: 'construction',
                                  children: 'Construction',
                                }),
                                (0, a.jsx)('option', { value: 'retail', children: 'Retail' }),
                                (0, a.jsx)('option', {
                                  value: 'manufacturing',
                                  children: 'Manufacturing',
                                }),
                                (0, a.jsx)('option', {
                                  value: 'professional-services',
                                  children: 'Professional Services',
                                }),
                                (0, a.jsx)('option', {
                                  value: 'hospitality',
                                  children: 'Hospitality',
                                }),
                                (0, a.jsx)('option', {
                                  value: 'real-estate',
                                  children: 'Real Estate',
                                }),
                                (0, a.jsx)('option', {
                                  value: 'technology',
                                  children: 'Technology',
                                }),
                                (0, a.jsx)('option', {
                                  value: 'healthcare',
                                  children: 'Healthcare',
                                }),
                                (0, a.jsx)('option', { value: 'other', children: 'Other' }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Years in Business *',
                            }),
                            (0, a.jsxs)('select', {
                              name: 'yearsInBusiness',
                              value: e.yearsInBusiness,
                              onChange: h,
                              required: !0,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              children: [
                                (0, a.jsx)('option', { value: '', children: 'Select years' }),
                                (0, a.jsx)('option', { value: '0-1', children: '0-1 years' }),
                                (0, a.jsx)('option', { value: '1-2', children: '1-2 years' }),
                                (0, a.jsx)('option', { value: '2-5', children: '2-5 years' }),
                                (0, a.jsx)('option', { value: '5-10', children: '5-10 years' }),
                                (0, a.jsx)('option', { value: '10+', children: '10+ years' }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsxs)('div', {
                  children: [
                    (0, a.jsxs)('h3', {
                      className: 'text-xl font-bold text-gray-900 mb-6 flex items-center',
                      children: [
                        (0, a.jsx)(c.A, { className: 'h-6 w-6 text-primary-700 mr-2' }),
                        'Loan Requirements',
                      ],
                    }),
                    (0, a.jsxs)('div', {
                      className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                      children: [
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Loan Amount Required *',
                            }),
                            (0, a.jsxs)('select', {
                              name: 'loanAmount',
                              value: e.loanAmount,
                              onChange: h,
                              required: !0,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              children: [
                                (0, a.jsx)('option', { value: '', children: 'Select amount' }),
                                (0, a.jsx)('option', {
                                  value: '150000-250000',
                                  children: '$150,000 - $250,000',
                                }),
                                (0, a.jsx)('option', {
                                  value: '250000-500000',
                                  children: '$250,000 - $500,000',
                                }),
                                (0, a.jsx)('option', {
                                  value: '500000-1000000',
                                  children: '$500,000 - $1,000,000',
                                }),
                                (0, a.jsx)('option', {
                                  value: '1000000-2500000',
                                  children: '$1,000,000 - $2,500,000',
                                }),
                                (0, a.jsx)('option', {
                                  value: '2500000-5000000',
                                  children: '$2,500,000 - $5,000,000',
                                }),
                                (0, a.jsx)('option', {
                                  value: '5000000+',
                                  children: '$5,000,000+',
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Loan Type *',
                            }),
                            (0, a.jsxs)('select', {
                              name: 'loanType',
                              value: e.loanType,
                              onChange: h,
                              required: !0,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              children: [
                                (0, a.jsx)('option', { value: '', children: 'Select loan type' }),
                                (0, a.jsx)('option', {
                                  value: 'business-loan',
                                  children: 'Business Loan',
                                }),
                                (0, a.jsx)('option', {
                                  value: 'investment-loan',
                                  children: 'Investment Loan',
                                }),
                                (0, a.jsx)('option', {
                                  value: 'bridge-finance',
                                  children: 'Bridge Finance',
                                }),
                                (0, a.jsx)('option', {
                                  value: 'second-mortgage',
                                  children: 'Second Mortgage',
                                }),
                                (0, a.jsx)('option', {
                                  value: 'development-finance',
                                  children: 'Development Finance',
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Preferred Term *',
                            }),
                            (0, a.jsxs)('select', {
                              name: 'preferredTerm',
                              value: e.preferredTerm,
                              onChange: h,
                              required: !0,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              children: [
                                (0, a.jsx)('option', { value: '', children: 'Select term' }),
                                (0, a.jsx)('option', { value: '1-3', children: '1-3 months' }),
                                (0, a.jsx)('option', { value: '3-6', children: '3-6 months' }),
                                (0, a.jsx)('option', { value: '6-12', children: '6-12 months' }),
                                (0, a.jsx)('option', { value: '12-18', children: '12-18 months' }),
                                (0, a.jsx)('option', { value: '18-24', children: '18-24 months' }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'When do you need funds? *',
                            }),
                            (0, a.jsxs)('select', {
                              name: 'timeframe',
                              value: e.timeframe,
                              onChange: h,
                              required: !0,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              children: [
                                (0, a.jsx)('option', { value: '', children: 'Select timeframe' }),
                                (0, a.jsx)('option', {
                                  value: 'immediately',
                                  children: 'Immediately',
                                }),
                                (0, a.jsx)('option', {
                                  value: '1-week',
                                  children: 'Within 1 week',
                                }),
                                (0, a.jsx)('option', {
                                  value: '2-weeks',
                                  children: 'Within 2 weeks',
                                }),
                                (0, a.jsx)('option', {
                                  value: '1-month',
                                  children: 'Within 1 month',
                                }),
                                (0, a.jsx)('option', { value: 'flexible', children: 'Flexible' }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          className: 'md:col-span-2',
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Purpose of Loan *',
                            }),
                            (0, a.jsx)('textarea', {
                              name: 'loanPurpose',
                              value: e.loanPurpose,
                              onChange: h,
                              required: !0,
                              rows: 4,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              placeholder:
                                'Please describe the purpose of your loan and how it will be used...',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsxs)('div', {
                  children: [
                    (0, a.jsxs)('h3', {
                      className: 'text-xl font-bold text-gray-900 mb-6 flex items-center',
                      children: [
                        (0, a.jsx)(m.A, { className: 'h-6 w-6 text-primary-700 mr-2' }),
                        'Security Information',
                      ],
                    }),
                    (0, a.jsxs)('div', {
                      className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                      children: [
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Do you own property that can be used as security?',
                            }),
                            (0, a.jsxs)('select', {
                              name: 'hasProperty',
                              value: e.hasProperty,
                              onChange: h,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              children: [
                                (0, a.jsx)('option', { value: '', children: 'Select option' }),
                                (0, a.jsx)('option', {
                                  value: 'yes-residential',
                                  children: 'Yes - Residential property',
                                }),
                                (0, a.jsx)('option', {
                                  value: 'yes-commercial',
                                  children: 'Yes - Commercial property',
                                }),
                                (0, a.jsx)('option', {
                                  value: 'yes-both',
                                  children: 'Yes - Both residential and commercial',
                                }),
                                (0, a.jsx)('option', { value: 'no', children: 'No' }),
                                (0, a.jsx)('option', { value: 'unsure', children: 'Not sure' }),
                              ],
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Estimated Property Value',
                            }),
                            (0, a.jsx)('input', {
                              type: 'text',
                              name: 'propertyValue',
                              value: e.propertyValue,
                              onChange: h,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              placeholder: '$XXX,XXX',
                            }),
                          ],
                        }),
                        (0, a.jsxs)('div', {
                          className: 'md:col-span-2',
                          children: [
                            (0, a.jsx)('label', {
                              className: 'block text-sm font-medium text-gray-700 mb-2',
                              children: 'Property Address (if applicable)',
                            }),
                            (0, a.jsx)('input', {
                              type: 'text',
                              name: 'propertyAddress',
                              value: e.propertyAddress,
                              onChange: h,
                              className:
                                'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                              placeholder: 'Property address, city, state, postcode',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsxs)('div', {
                  children: [
                    (0, a.jsx)('h3', {
                      className: 'text-xl font-bold text-gray-900 mb-6',
                      children: 'Additional Information',
                    }),
                    (0, a.jsxs)('div', {
                      className: 'space-y-4',
                      children: [
                        (0, a.jsx)('div', {
                          children: (0, a.jsxs)('label', {
                            className: 'flex items-start',
                            children: [
                              (0, a.jsx)('input', {
                                type: 'checkbox',
                                name: 'declinedByBanks',
                                checked: e.declinedByBanks,
                                onChange: h,
                                className:
                                  'mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded',
                              }),
                              (0, a.jsx)('span', {
                                className: 'ml-2 text-sm text-gray-700',
                                children: 'I have been declined by traditional banks',
                              }),
                            ],
                          }),
                        }),
                        (0, a.jsx)('div', {
                          children: (0, a.jsxs)('label', {
                            className: 'flex items-start',
                            children: [
                              (0, a.jsx)('input', {
                                type: 'checkbox',
                                name: 'workingWithBroker',
                                checked: e.workingWithBroker,
                                onChange: h,
                                className:
                                  'mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded',
                              }),
                              (0, a.jsx)('span', {
                                className: 'ml-2 text-sm text-gray-700',
                                children: 'I am working with a mortgage broker',
                              }),
                            ],
                          }),
                        }),
                        (0, a.jsx)('div', {
                          children: (0, a.jsxs)('label', {
                            className: 'flex items-start',
                            children: [
                              (0, a.jsx)('input', {
                                type: 'checkbox',
                                name: 'agreeToTerms',
                                checked: e.agreeToTerms,
                                onChange: h,
                                required: !0,
                                className:
                                  'mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded',
                              }),
                              (0, a.jsxs)('span', {
                                className: 'ml-2 text-sm text-gray-700',
                                children: [
                                  'I agree to the ',
                                  (0, a.jsx)('a', {
                                    href: '#',
                                    className: 'text-primary-700 hover:text-primary-600 underline',
                                    children: 'Terms and Conditions',
                                  }),
                                  ' and ',
                                  (0, a.jsx)('a', {
                                    href: '#',
                                    className: 'text-primary-700 hover:text-primary-600 underline',
                                    children: 'Privacy Policy',
                                  }),
                                  ' *',
                                ],
                              }),
                            ],
                          }),
                        }),
                        (0, a.jsx)('div', {
                          children: (0, a.jsxs)('label', {
                            className: 'flex items-start',
                            children: [
                              (0, a.jsx)('input', {
                                type: 'checkbox',
                                name: 'receiveUpdates',
                                checked: e.receiveUpdates,
                                onChange: h,
                                className:
                                  'mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded',
                              }),
                              (0, a.jsx)('span', {
                                className: 'ml-2 text-sm text-gray-700',
                                children:
                                  'I would like to receive updates about loan products and industry insights',
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, a.jsxs)('div', {
                  className: 'text-center pt-6',
                  children: [
                    (0, a.jsx)('button', {
                      type: 'submit',
                      disabled: s,
                      className:
                        'w-full md:w-auto inline-flex items-center justify-center px-12 py-4 text-lg font-bold rounded-lg text-white bg-primary-700 hover:bg-primary-600 focus:ring-4 focus:ring-primary-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
                      children: s
                        ? (0, a.jsxs)(a.Fragment, {
                            children: [
                              (0, a.jsx)('div', {
                                className:
                                  'w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2',
                              }),
                              'Submitting Application...',
                            ],
                          })
                        : (0, a.jsxs)(a.Fragment, {
                            children: [
                              'Submit Application',
                              (0, a.jsx)(t.A, { className: 'ml-2 h-5 w-5' }),
                            ],
                          }),
                    }),
                    (0, a.jsx)('p', {
                      className: 'mt-4 text-sm text-gray-600',
                      children: 'Secure 256-bit SSL encryption. Your information is protected.',
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
    },
  },
  (e) => {
    var r = (r) => e((e.s = r));
    e.O(0, [966, 441, 684, 358], () => r(5199)), (_N_E = e.O());
  },
]);
