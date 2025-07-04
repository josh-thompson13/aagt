(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [219],
  {
    136: (e, t, n) => {
      e.exports = n(7588);
    },
    2464: (e, t, n) => {
      Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'AmpStateContext', { enumerable: !0, get: () => r });
      const r = n(8229)._(n(2115)).default.createContext({});
    },
    3938: (e, t, n) => {
      Promise.resolve().then(n.bind(n, 8385));
    },
    5029: (e, t, n) => {
      Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'default', { enumerable: !0, get: () => i });
      const r = n(2115),
        o = r.useLayoutEffect,
        l = r.useEffect;
      function i(e) {
        const { headManager: t, reduceComponentsToState: n } = e;
        function i() {
          if (t && t.mountedInstances) {
            const o = r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));
            t.updateHead(n(o, e));
          }
        }
        return (
          o(() => {
            var n;
            return (
              null == t || null == (n = t.mountedInstances) || n.add(e.children),
              () => {
                var n;
                null == t || null == (n = t.mountedInstances) || n.delete(e.children);
              }
            );
          }),
          o(
            () => (
              t && (t._pendingUpdate = i),
              () => {
                t && (t._pendingUpdate = i);
              }
            )
          ),
          l(
            () => (
              t && t._pendingUpdate && (t._pendingUpdate(), (t._pendingUpdate = null)),
              () => {
                t && t._pendingUpdate && (t._pendingUpdate(), (t._pendingUpdate = null));
              }
            )
          ),
          null
        );
      }
    },
    5564: (e, t, n) => {
      var r = n(9509);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        !((e, t) => {
          for (var n in t) Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        })(t, { default: () => y, defaultHead: () => p });
      const o = n(8229),
        l = n(6966),
        i = n(5155),
        s = l._(n(2115)),
        a = o._(n(5029)),
        d = n(2464),
        u = n(2830),
        c = n(7544);
      function p(e) {
        void 0 === e && (e = !1);
        const t = [(0, i.jsx)('meta', { charSet: 'utf-8' }, 'charset')];
        return (
          e ||
            t.push(
              (0, i.jsx)('meta', { name: 'viewport', content: 'width=device-width' }, 'viewport')
            ),
          t
        );
      }
      function f(e, t) {
        return 'string' == typeof t || 'number' == typeof t
          ? e
          : t.type === s.default.Fragment
            ? e.concat(
                s.default.Children.toArray(t.props.children).reduce(
                  (e, t) => ('string' == typeof t || 'number' == typeof t ? e : e.concat(t)),
                  []
                )
              )
            : e.concat(t);
      }
      n(3230);
      const h = ['name', 'httpEquiv', 'charSet', 'itemProp'];
      function m(e, t) {
        const { inAmpMode: n } = t;
        return e
          .reduce(f, [])
          .reverse()
          .concat(p(n).reverse())
          .filter(
            (() => {
              const e = new Set(),
                t = new Set(),
                n = new Set(),
                r = {};
              return (o) => {
                let l = !0,
                  i = !1;
                if (o.key && 'number' != typeof o.key && o.key.indexOf('$') > 0) {
                  i = !0;
                  const t = o.key.slice(o.key.indexOf('$') + 1);
                  e.has(t) ? (l = !1) : e.add(t);
                }
                switch (o.type) {
                  case 'title':
                  case 'base':
                    t.has(o.type) ? (l = !1) : t.add(o.type);
                    break;
                  case 'meta':
                    for (let e = 0, t = h.length; e < t; e++) {
                      const t = h[e];
                      if (Object.hasOwn(o.props, t))
                        if ('charSet' === t) n.has(t) ? (l = !1) : n.add(t);
                        else {
                          const e = o.props[t],
                            n = r[t] || new Set();
                          ('name' !== t || !i) && n.has(e) ? (l = !1) : (n.add(e), (r[t] = n));
                        }
                    }
                }
                return l;
              };
            })()
          )
          .reverse()
          .map((e, t) => {
            const o = e.key || t;
            if (
              r.env.__NEXT_OPTIMIZE_FONTS &&
              !n &&
              'link' === e.type &&
              e.props.href &&
              ['https://fonts.googleapis.com/css', 'https://use.typekit.net/'].some((t) =>
                e.props.href.startsWith(t)
              )
            ) {
              const t = { ...(e.props || {}) };
              return (
                (t['data-href'] = t.href),
                (t.href = void 0),
                (t['data-optimized-fonts'] = !0),
                s.default.cloneElement(e, t)
              );
            }
            return s.default.cloneElement(e, { key: o });
          });
      }
      const y = (e) => {
        const { children: t } = e,
          n = (0, s.useContext)(d.AmpStateContext),
          r = (0, s.useContext)(u.HeadManagerContext);
        return (0, i.jsx)(a.default, {
          reduceComponentsToState: m,
          headManager: r,
          inAmpMode: (0, c.isInAmpMode)(n),
          children: t,
        });
      };
      ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
        void 0 === t.default.__esModule &&
        (Object.defineProperty(t.default, '__esModule', { value: !0 }),
        Object.assign(t.default, t),
        (e.exports = t.default));
    },
    7544: (e, t) => {
      function n(e) {
        const { ampFirst: t = !1, hybrid: n = !1, hasQuery: r = !1 } = void 0 === e ? {} : e;
        return t || (n && r);
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'isInAmpMode', { enumerable: !0, get: () => n });
    },
    7588: (e, t, n) => {
      Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'default', { enumerable: !0, get: () => u });
      const r = n(8229),
        o = n(5155),
        l = r._(n(2115)),
        i = r._(n(5564)),
        s = {
          400: 'Bad Request',
          404: 'This page could not be found',
          405: 'Method Not Allowed',
          500: 'Internal Server Error',
        };
      function a(e) {
        const { req: t, res: n, err: r } = e;
        return {
          statusCode: n && n.statusCode ? n.statusCode : r ? r.statusCode : 404,
          hostname: window.location.hostname,
        };
      }
      const d = {
        error: {
          fontFamily:
            'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
          height: '100vh',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        desc: { lineHeight: '48px' },
        h1: {
          display: 'inline-block',
          margin: '0 20px 0 0',
          paddingRight: 23,
          fontSize: 24,
          fontWeight: 500,
          verticalAlign: 'top',
        },
        h2: { fontSize: 14, fontWeight: 400, lineHeight: '28px' },
        wrap: { display: 'inline-block' },
      };
      class u extends l.default.Component {
        render() {
          const { statusCode: e, withDarkMode: t = !0 } = this.props,
            n = this.props.title || s[e] || 'An unexpected error has occurred';
          return (0, o.jsxs)('div', {
            style: d.error,
            children: [
              (0, o.jsx)(i.default, {
                children: (0, o.jsx)('title', {
                  children: e
                    ? e + ': ' + n
                    : 'Application error: a client-side exception has occurred',
                }),
              }),
              (0, o.jsxs)('div', {
                style: d.desc,
                children: [
                  (0, o.jsx)('style', {
                    dangerouslySetInnerHTML: {
                      __html:
                        'body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}' +
                        (t
                          ? '@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}'
                          : ''),
                    },
                  }),
                  e
                    ? (0, o.jsx)('h1', { className: 'next-error-h1', style: d.h1, children: e })
                    : null,
                  (0, o.jsx)('div', {
                    style: d.wrap,
                    children: (0, o.jsxs)('h2', {
                      style: d.h2,
                      children: [
                        this.props.title || e
                          ? n
                          : (0, o.jsxs)(o.Fragment, {
                              children: [
                                'Application error: a client-side exception has occurred',
                                ' ',
                                !!this.props.hostname &&
                                  (0, o.jsxs)(o.Fragment, {
                                    children: ['while loading ', this.props.hostname],
                                  }),
                                ' ',
                                '(see the browser console for more information)',
                              ],
                            }),
                        '.',
                      ],
                    }),
                  }),
                ],
              }),
            ],
          });
        }
      }
      (u.displayName = 'ErrorPage'),
        (u.getInitialProps = a),
        (u.origGetInitialProps = a),
        ('function' == typeof t.default || ('object' == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, '__esModule', { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
    },
    8385: (e, t, n) => {
      n.r(t), n.d(t, { default: () => s });
      var r = n(5155),
        o = n(136),
        l = n.n(o),
        i = n(2115);
      function s(e) {
        return (
          (0, i.useEffect)(() => {}, [e.error]),
          (0, r.jsx)('html', {
            lang: 'en',
            children: (0, r.jsx)('body', { children: (0, r.jsx)(l(), { statusCode: 0 }) }),
          })
        );
      }
    },
  },
  (e) => {
    var t = (t) => e((e.s = t));
    e.O(0, [441, 684, 358], () => t(3938)), (_N_E = e.O());
  },
]);
