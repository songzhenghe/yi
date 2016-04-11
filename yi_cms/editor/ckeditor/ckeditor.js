﻿/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
(function () {
    if (!window.CKEDITOR) window.CKEDITOR = (function () {
        var a = {
            timestamp: 'A5AB4B6',
            version: '3.3.1',
            revision: '5586',
            _: {},
            status: 'unloaded',
            basePath: (function () {
                var d = window.CKEDITOR_BASEPATH || '';
                if (!d) {
                    var e = document.getElementsByTagName('script');
                    for (var f = 0; f < e.length; f++) {
                        var g = e[f].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
                        if (g) {
                            d = g[1];
                            break;
                        }
                    }
                }
                if (d.indexOf('://') == -1) if (d.indexOf('/') === 0) d = location.href.match(/^.*?:\/\/[^\/]*/)[0] + d;
                else d = location.href.match(/^[^\?]*\/(?:)/)[0] + d;
                if (!d) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
                return d;
            })(),
            getUrl: function (d) {
                if (d.indexOf('://') == -1 && d.indexOf('/') !== 0) d = this.basePath + d;
                if (this.timestamp && d.charAt(d.length - 1) != '/') d += (d.indexOf('?') >= 0 ? '&' : '?') + 't=' + this.timestamp;
                return d;
            }
        },
            b = window.CKEDITOR_GETURL;
        if (b) {
            var c = a.getUrl;
            a.getUrl = function (d) {
                return b.call(a, d) || c.call(a, d);
            };
        }
        return a;
    })();
    var a = CKEDITOR;
    if (!a.event) {
        a.event = function () {};
        a.event.implementOn = function (b, c) {
            var d = a.event.prototype;
            for (var e in d) {
                if (b[e] == undefined) b[e] = d[e];
            }
        };
        a.event.prototype = (function () {
            var b = function (d) {
                    var e = d.getPrivate && d.getPrivate() || d._ || (d._ = {});
                    return e.events || (e.events = {});
                },
                c = function (d) {
                    this.name = d;
                    this.listeners = [];
                };
            c.prototype = {
                getListenerIndex: function (d) {
                    for (var e = 0, f = this.listeners; e < f.length; e++) {
                        if (f[e].fn == d) return e;
                    }
                    return -1;
                }
            };
            return {
                on: function (d, e, f, g, h) {
                    var i = b(this),
                        j = i[d] || (i[d] = new c(d));
                    if (j.getListenerIndex(e) < 0) {
                        var k = j.listeners;
                        if (!f) f = this;
                        if (isNaN(h)) h = 10;
                        var l = this,
                            m = function (o, p, q, r) {
                                var s = {
                                    name: d,
                                    sender: this,
                                    editor: o,
                                    data: p,
                                    listenerData: g,
                                    stop: q,
                                    cancel: r,
                                    removeListener: function () {
                                        l.removeListener(d, e);
                                    }
                                };
                                e.call(f, s);
                                return s.data;
                            };
                        m.fn = e;
                        m.priority = h;
                        for (var n = k.length - 1; n >= 0; n--) {
                            if (k[n].priority <= h) {
                                k.splice(n + 1, 0, m);
                                return;
                            }
                        }
                        k.unshift(m);
                    }
                },
                fire: (function () {
                    var d = false,
                        e = function () {
                            d = true;
                        },
                        f = false,
                        g = function () {
                            f = true;
                        };
                    return function (h, i, j) {
                        var k = b(this)[h],
                            l = d,
                            m = f;
                        d = f = false;
                        if (k) {
                            var n = k.listeners;
                            if (n.length) {
                                n = n.slice(0);
                                for (var o = 0; o < n.length; o++) {
                                    var p = n[o].call(this, j, i, e, g);
                                    if (typeof p != 'undefined') i = p;
                                    if (d || f) break;
                                }
                            }
                        }
                        var q = f || (typeof i == 'undefined' ? false : i);
                        d = l;
                        f = m;
                        return q;
                    };
                })(),
                fireOnce: function (d, e, f) {
                    var g = this.fire(d, e, f);
                    delete b(this)[d];
                    return g;
                },
                removeListener: function (d, e) {
                    var f = b(this)[d];
                    if (f) {
                        var g = f.getListenerIndex(e);
                        if (g >= 0) f.listeners.splice(g, 1);
                    }
                },
                hasListeners: function (d) {
                    var e = b(this)[d];
                    return e && e.listeners.length > 0;
                }
            };
        })();
    }
    if (!a.editor) {
        a.ELEMENT_MODE_NONE = 0;
        a.ELEMENT_MODE_REPLACE = 1;
        a.ELEMENT_MODE_APPENDTO = 2;
        a.editor = function (b, c, d, e) {
            var f = this;
            f._ = {
                instanceConfig: b,
                element: c,
                data: e
            };
            f.elementMode = d || 0;
            a.event.call(f);
            f._init();
        };
        a.editor.replace = function (b, c) {
            var d = b;
            if (typeof d != 'object') {
                d = document.getElementById(b);
                if (!d) {
                    var e = 0,
                        f = document.getElementsByName(b);
                    while ((d = f[e++]) && d.tagName.toLowerCase() != 'textarea') {}
                }
                if (!d) throw '[CKEDITOR.editor.replace] The element with id or name "' + b + '" was not found.';
            }
            d.style.visibility = 'hidden';
            return new a.editor(c, d, 1);
        };
        a.editor.appendTo = function (b, c, d) {
            var e = b;
            if (typeof e != 'object') {
                e = document.getElementById(b);
                if (!e) throw '[CKEDITOR.editor.appendTo] The element with id "' + b + '" was not found.';
            }
            return new a.editor(c, e, 2, d);
        };
        a.editor.prototype = {
            _init: function () {
                var b = a.editor._pending || (a.editor._pending = []);
                b.push(this);
            },
            fire: function (b, c) {
                return a.event.prototype.fire.call(this, b, c, this);
            },
            fireOnce: function (b, c) {
                return a.event.prototype.fireOnce.call(this, b, c, this);
            }
        };
        a.event.implementOn(a.editor.prototype, true);
    }
    if (!a.env) a.env = (function () {
        var b = navigator.userAgent.toLowerCase(),
            c = window.opera,
            d = {
                ie: /*@cc_on!@*/
                false,
                opera: !! c && c.version,
                webkit: b.indexOf(' applewebkit/') > -1,
                air: b.indexOf(' adobeair/') > -1,
                mac: b.indexOf('macintosh') > -1,
                quirks: document.compatMode == 'BackCompat',
                mobile: b.indexOf('mobile') > -1,
                isCustomDomain: function () {
                    var g = document.domain,
                        h = window.location.hostname;
                    return this.ie && g != h && g != '[' + h + ']';
                }
            };
        d.gecko = navigator.product == 'Gecko' && !d.webkit && !d.opera;
        var e = 0;
        if (d.ie) {
            e = parseFloat(b.match(/msie (\d+)/)[1]);
            d.ie8 = !! document.documentMode;
            d.ie8Compat = document.documentMode == 8;
            d.ie7Compat = e == 7 && !document.documentMode || document.documentMode == 7;
            d.ie6Compat = e < 7 || d.quirks;
        }
        if (d.gecko) {
            var f = b.match(/rv:([\d\.]+)/);
            if (f) {
                f = f[1].split('.');
                e = f[0] * 10000 + (f[1] || 0) * 100 + +(f[2] || 0);
            }
        }
        if (d.opera) e = parseFloat(c.version());
        if (d.air) e = parseFloat(b.match(/ adobeair\/(\d+)/)[1]);
        if (d.webkit) e = parseFloat(b.match(/ applewebkit\/(\d+)/)[1]);
        d.version = e;
        d.isCompatible = !d.mobile && (d.ie && e >= 6 || d.gecko && e >= 10801 || d.opera && e >= 9.5 || d.air && e >= 1 || d.webkit && e >= 522 || false);
        d.cssClass = 'cke_browser_' + (d.ie ? 'ie' : d.gecko ? 'gecko' : d.opera ? 'opera' : d.air ? 'air' : d.webkit ? 'webkit' : 'unknown');
        if (d.quirks) d.cssClass += ' cke_browser_quirks';
        if (d.ie) {
            d.cssClass += ' cke_browser_ie' + (d.version < 7 ? '6' : d.version >= 8 ? '8' : '7');
            if (d.quirks) d.cssClass += ' cke_browser_iequirks';
        }
        if (d.gecko && e < 10900) d.cssClass += ' cke_browser_gecko18';
        return d;
    })();
    var b = a.env;
    var c = b.ie;
    if (a.status == 'unloaded')(function () {
        a.event.implementOn(a);
        a.loadFullCore = function () {
            if (a.status != 'basic_ready') {
                a.loadFullCore._load = true;
                return;
            }
            delete a.loadFullCore;
            var e = document.createElement('script');
            e.type = 'text/javascript';
            e.src = a.basePath + 'ckeditor.js';
            document.getElementsByTagName('head')[0].appendChild(e);
        };
        a.loadFullCoreTimeout = 0;
        a.replaceClass = 'ckeditor';
        a.replaceByClassEnabled = true;
        var d = function (e, f, g, h) {
                if (b.isCompatible) {
                    if (a.loadFullCore) a.loadFullCore();
                    var i = g(e, f, h);
                    a.add(i);
                    return i;
                }
                return null;
            };
        a.replace = function (e, f) {
            return d(e, f, a.editor.replace);
        };
        a.appendTo = function (e, f, g) {
            return d(e, f, a.editor.appendTo, g);
        };
        a.add = function (e) {
            var f = this._.pending || (this._.pending = []);
            f.push(e);
        };
        a.replaceAll = function () {
            var e = document.getElementsByTagName('textarea');
            for (var f = 0; f < e.length; f++) {
                var g = null,
                    h = e[f],
                    i = h.name;
                if (!h.name && !h.id) continue;
                if (typeof arguments[0] == 'string') {
                    var j = new RegExp('(?:^|\\s)' + arguments[0] + '(?:$|\\s)');
                    if (!j.test(h.className)) continue;
                } else if (typeof arguments[0] == 'function') {
                    g = {};
                    if (arguments[0](h, g) === false) continue;
                }
                this.replace(h, g);
            }
        };
        (function () {
            var e = function () {
                    var f = a.loadFullCore,
                        g = a.loadFullCoreTimeout;
                    if (a.replaceByClassEnabled) a.replaceAll(a.replaceClass);
                    a.status = 'basic_ready';
                    if (f && f._load) f();
                    else if (g) setTimeout(function () {
                        if (a.loadFullCore) a.loadFullCore();
                    }, g * 1000);
                };
            if (window.addEventListener) window.addEventListener('load', e, false);
            else if (window.attachEvent) window.attachEvent('onload', e);
        })();
        a.status = 'basic_loaded';
    })();
    a.dom = {};
    var d = a.dom;
    (function () {
        var e = [];
        a.on('reset', function () {
            e = [];
        });
        a.tools = {
            arrayCompare: function (f, g) {
                if (!f && !g) return true;
                if (!f || !g || f.length != g.length) return false;
                for (var h = 0; h < f.length; h++) {
                    if (f[h] != g[h]) return false;
                }
                return true;
            },
            clone: function (f) {
                var g;
                if (f && f instanceof Array) {
                    g = [];
                    for (var h = 0; h < f.length; h++) g[h] = this.clone(f[h]);
                    return g;
                }
                if (f === null || typeof f != 'object' || f instanceof String || f instanceof Number || f instanceof Boolean || f instanceof Date || f instanceof RegExp) return f;
                g = new f.constructor();
                for (var i in f) {
                    var j = f[i];
                    g[i] = this.clone(j);
                }
                return g;
            },
            capitalize: function (f) {
                return f.charAt(0).toUpperCase() + f.substring(1).toLowerCase();
            },
            extend: function (f) {
                var g = arguments.length,
                    h, i;
                if (typeof (h = arguments[g - 1]) == 'boolean') g--;
                else if (typeof (h = arguments[g - 2]) == 'boolean') {
                    i = arguments[g - 1];
                    g -= 2;
                }
                for (var j = 1; j < g; j++) {
                    var k = arguments[j];
                    for (var l in k) {
                        if (h === true || f[l] == undefined) if (!i || l in i) f[l] = k[l];
                    }
                }
                return f;
            },
            prototypedCopy: function (f) {
                var g = function () {};
                g.prototype = f;
                return new g();
            },
            isArray: function (f) {
                return !!f && f instanceof Array;
            },
            isEmpty: function (f) {
                for (var g in f) {
                    if (f.hasOwnProperty(g)) return false;
                }
                return true;
            },
            cssStyleToDomStyle: (function () {
                var f = document.createElement('div').style,
                    g = typeof f.cssFloat != 'undefined' ? 'cssFloat' : typeof f.styleFloat != 'undefined' ? 'styleFloat' : 'float';
                return function (h) {
                    if (h == 'float') return g;
                    else return h.replace(/-./g, function (i) {
                        return i.substr(1).toUpperCase();
                    });
                };
            })(),
            buildStyleHtml: function (f) {
                f = [].concat(f);
                var g, h = [];
                for (var i = 0; i < f.length; i++) {
                    g = f[i];
                    if (/@import|[{}]/.test(g)) h.push('<style>' + g + '</style>');
                    else h.push('<link type="text/css" rel=stylesheet href="' + g + '">');
                }
                return h.join('');
            },
            htmlEncode: function (f) {
                var g = function (k) {
                        var l = new d.element('span');
                        l.setText(k);
                        return l.getHtml();
                    },
                    h = g('\n').toLowerCase() == '<br>' ?
                function (k) {
                    return g(k).replace(/<br>/gi, '\n');
                } : g, i = g('>') == '>' ?
                function (k) {
                    return h(k).replace(/>/g, '&gt;');
                } : h, j = g('  ') == '&nbsp; ' ?
                function (k) {
                    return i(k).replace(/&nbsp;/g, ' ');
                } : i;
                this.htmlEncode = j;
                return this.htmlEncode(f);
            },
            htmlEncodeAttr: function (f) {
                return f.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/, '&gt;');
            },
            escapeCssSelector: function (f) {
                return f.replace(/[\s#:.,$*^\[\]()~=+>]/g, '\\$&');
            },
            getNextNumber: (function () {
                var f = 0;
                return function () {
                    return ++f;
                };
            })(),
            override: function (f, g) {
                return g(f);
            },
            setTimeout: function (f, g, h, i, j) {
                if (!j) j = window;
                if (!h) h = j;
                return j.setTimeout(function () {
                    if (i) f.apply(h, [].concat(i));
                    else f.apply(h);
                }, g || 0);
            },
            trim: (function () {
                var f = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                return function (g) {
                    return g.replace(f, '');
                };
            })(),
            ltrim: (function () {
                var f = /^[ \t\n\r]+/g;
                return function (g) {
                    return g.replace(f, '');
                };
            })(),
            rtrim: (function () {
                var f = /[ \t\n\r]+$/g;
                return function (g) {
                    return g.replace(f, '');
                };
            })(),
            indexOf: Array.prototype.indexOf ?
            function (f, g) {
                return f.indexOf(g);
            } : function (f, g) {
                for (var h = 0, i = f.length; h < i; h++) {
                    if (f[h] === g) return h;
                }
                return -1;
            },
            bind: function (f, g) {
                return function () {
                    return f.apply(g, arguments);
                };
            },
            createClass: function (f) {
                var g = f.$,
                    h = f.base,
                    i = f.privates || f._,
                    j = f.proto,
                    k = f.statics;
                if (i) {
                    var l = g;
                    g = function () {
                        var p = this;
                        var m = p._ || (p._ = {});
                        for (var n in i) {
                            var o = i[n];
                            m[n] = typeof o == 'function' ? a.tools.bind(o, p) : o;
                        }
                        l.apply(p, arguments);
                    };
                }
                if (h) {
                    g.prototype = this.prototypedCopy(h.prototype);
                    g.prototype['constructor'] = g;
                    g.prototype.base = function () {
                        this.base = h.prototype.base;
                        h.apply(this, arguments);
                        this.base = arguments.callee;
                    };
                }
                if (j) this.extend(g.prototype, j, true);
                if (k) this.extend(g, k, true);
                return g;
            },
            addFunction: function (f, g) {
                return e.push(function () {
                    f.apply(g || this, arguments);
                }) - 1;
            },
            removeFunction: function (f) {
                e[f] = null;
            },
            callFunction: function (f) {
                var g = e[f];
                return g && g.apply(window, Array.prototype.slice.call(arguments, 1));
            },
            cssLength: (function () {
                var f = /^\d+(?:\.\d+)?$/;
                return function (g) {
                    return g + (f.test(g) ? 'px' : '');
                };
            })(),
            repeat: function (f, g) {
                return new Array(g + 1).join(f);
            },
            tryThese: function () {
                var f;
                for (var g = 0, h = arguments.length; g < h; g++) {
                    var i = arguments[g];
                    try {
                        f = i();
                        break;
                    } catch (j) {}
                }
                return f;
            },
            genKey: function () {
                return Array.prototype.slice.call(arguments).join('-');
            }
        };
    })();
    var e = a.tools;
    a.dtd = (function () {
        var f = e.extend,
            g = {
                isindex: 1,
                fieldset: 1
            },
            h = {
                input: 1,
                button: 1,
                select: 1,
                textarea: 1,
                label: 1
            },
            i = f({
                a: 1
            }, h),
            j = f({
                iframe: 1
            }, i),
            k = {
                hr: 1,
                ul: 1,
                menu: 1,
                div: 1,
                blockquote: 1,
                noscript: 1,
                table: 1,
                center: 1,
                address: 1,
                dir: 1,
                pre: 1,
                h5: 1,
                dl: 1,
                h4: 1,
                noframes: 1,
                h6: 1,
                ol: 1,
                h1: 1,
                h3: 1,
                h2: 1
            },
            l = {
                ins: 1,
                del: 1,
                script: 1,
                style: 1
            },
            m = f({
                b: 1,
                acronym: 1,
                bdo: 1,
                'var': 1,
                '#': 1,
                abbr: 1,
                code: 1,
                br: 1,
                i: 1,
                cite: 1,
                kbd: 1,
                u: 1,
                strike: 1,
                s: 1,
                tt: 1,
                strong: 1,
                q: 1,
                samp: 1,
                em: 1,
                dfn: 1,
                span: 1
            }, l),
            n = f({
                sub: 1,
                img: 1,
                object: 1,
                sup: 1,
                basefont: 1,
                map: 1,
                applet: 1,
                font: 1,
                big: 1,
                small: 1
            }, m),
            o = f({
                p: 1
            }, n),
            p = f({
                iframe: 1
            }, n, h),
            q = {
                img: 1,
                noscript: 1,
                br: 1,
                kbd: 1,
                center: 1,
                button: 1,
                basefont: 1,
                h5: 1,
                h4: 1,
                samp: 1,
                h6: 1,
                ol: 1,
                h1: 1,
                h3: 1,
                h2: 1,
                form: 1,
                font: 1,
                '#': 1,
                select: 1,
                menu: 1,
                ins: 1,
                abbr: 1,
                label: 1,
                code: 1,
                table: 1,
                script: 1,
                cite: 1,
                input: 1,
                iframe: 1,
                strong: 1,
                textarea: 1,
                noframes: 1,
                big: 1,
                small: 1,
                span: 1,
                hr: 1,
                sub: 1,
                bdo: 1,
                'var': 1,
                div: 1,
                object: 1,
                sup: 1,
                strike: 1,
                dir: 1,
                map: 1,
                dl: 1,
                applet: 1,
                del: 1,
                isindex: 1,
                fieldset: 1,
                ul: 1,
                b: 1,
                acronym: 1,
                a: 1,
                blockquote: 1,
                i: 1,
                u: 1,
                s: 1,
                tt: 1,
                address: 1,
                q: 1,
                pre: 1,
                p: 1,
                em: 1,
                dfn: 1
            },
            r = f({
                a: 1
            }, p),
            s = {
                tr: 1
            },
            t = {
                '#': 1
            },
            u = f({
                param: 1
            }, q),
            v = f({
                form: 1
            }, g, j, k, o),
            w = {
                li: 1
            },
            x = {
                style: 1,
                script: 1
            },
            y = {
                base: 1,
                link: 1,
                meta: 1,
                title: 1
            },
            z = f(y, x),
            A = {
                head: 1,
                body: 1
            },
            B = {
                html: 1
            },
            C = {
                address: 1,
                blockquote: 1,
                center: 1,
                dir: 1,
                div: 1,
                dl: 1,
                fieldset: 1,
                form: 1,
                h1: 1,
                h2: 1,
                h3: 1,
                h4: 1,
                h5: 1,
                h6: 1,
                hr: 1,
                isindex: 1,
                menu: 1,
                noframes: 1,
                ol: 1,
                p: 1,
                pre: 1,
                table: 1,
                ul: 1
            };
        return {
            $nonBodyContent: f(B, A, y),
            $block: C,
            $blockLimit: {
                body: 1,
                div: 1,
                td: 1,
                th: 1,
                caption: 1,
                form: 1
            },
            $inline: r,
            $body: f({
                script: 1,
                style: 1
            }, C),
            $cdata: {
                script: 1,
                style: 1
            },
            $empty: {
                area: 1,
                base: 1,
                br: 1,
                col: 1,
                hr: 1,
                img: 1,
                input: 1,
                link: 1,
                meta: 1,
                param: 1
            },
            $listItem: {
                dd: 1,
                dt: 1,
                li: 1
            },
            $list: {
                ul: 1,
                ol: 1,
                dl: 1
            },
            $nonEditable: {
                applet: 1,
                button: 1,
                embed: 1,
                iframe: 1,
                map: 1,
                object: 1,
                option: 1,
                script: 1,
                textarea: 1,
                param: 1
            },
            $removeEmpty: {
                abbr: 1,
                acronym: 1,
                address: 1,
                b: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                q: 1,
                s: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                tt: 1,
                u: 1,
                'var': 1
            },
            $tabIndex: {
                a: 1,
                area: 1,
                button: 1,
                input: 1,
                object: 1,
                select: 1,
                textarea: 1
            },
            $tableContent: {
                caption: 1,
                col: 1,
                colgroup: 1,
                tbody: 1,
                td: 1,
                tfoot: 1,
                th: 1,
                thead: 1,
                tr: 1
            },
            html: A,
            head: z,
            style: t,
            script: t,
            body: v,
            base: {},
            link: {},
            meta: {},
            title: t,
            col: {},
            tr: {
                td: 1,
                th: 1
            },
            img: {},
            colgroup: {
                col: 1
            },
            noscript: v,
            td: v,
            br: {},
            th: v,
            center: v,
            kbd: r,
            button: f(o, k),
            basefont: {},
            h5: r,
            h4: r,
            samp: r,
            h6: r,
            ol: w,
            h1: r,
            h3: r,
            option: t,
            h2: r,
            form: f(g, j, k, o),
            select: {
                optgroup: 1,
                option: 1
            },
            font: r,
            ins: r,
            menu: w,
            abbr: r,
            label: r,
            table: {
                thead: 1,
                col: 1,
                tbody: 1,
                tr: 1,
                colgroup: 1,
                caption: 1,
                tfoot: 1
            },
            code: r,
            script: t,
            tfoot: s,
            cite: r,
            li: v,
            input: {},
            iframe: v,
            strong: r,
            textarea: t,
            noframes: v,
            big: r,
            small: r,
            span: r,
            hr: {},
            dt: r,
            sub: r,
            optgroup: {
                option: 1
            },
            param: {},
            bdo: r,
            'var': r,
            div: v,
            object: u,
            sup: r,
            dd: v,
            strike: r,
            area: {},
            dir: w,
            map: f({
                area: 1,
                form: 1,
                p: 1
            }, g, l, k),
            applet: u,
            dl: {
                dt: 1,
                dd: 1
            },
            del: r,
            isindex: {},
            fieldset: f({
                legend: 1
            }, q),
            thead: s,
            ul: w,
            acronym: r,
            b: r,
            a: p,
            blockquote: v,
            caption: r,
            i: r,
            u: r,
            tbody: s,
            s: r,
            address: f(j, o),
            tt: r,
            legend: r,
            q: r,
            pre: f(m, i),
            p: r,
            em: r,
            dfn: r
        };
    })();
    var f = a.dtd;
    d.event = function (g) {
        this.$ = g;
    };
    d.event.prototype = {
        getKey: function () {
            return this.$.keyCode || this.$.which;
        },
        getKeystroke: function () {
            var h = this;
            var g = h.getKey();
            if (h.$.ctrlKey || h.$.metaKey) g += 1000;
            if (h.$.shiftKey) g += 2000;
            if (h.$.altKey) g += 4000;
            return g;
        },
        preventDefault: function (g) {
            var h = this.$;
            if (h.preventDefault) h.preventDefault();
            else h.returnValue = false;
            if (g) this.stopPropagation();
        },
        stopPropagation: function () {
            var g = this.$;
            if (g.stopPropagation) g.stopPropagation();
            else g.cancelBubble = true;
        },
        getTarget: function () {
            var g = this.$.target || this.$.srcElement;
            return g ? new d.node(g) : null;
        }
    };
    a.CTRL = 1000;
    a.SHIFT = 2000;
    a.ALT = 4000;
    d.domObject = function (g) {
        if (g) this.$ = g;
    };
    d.domObject.prototype = (function () {
        var g = function (h, i) {
                return function (j) {
                    if (typeof a != 'undefined') h.fire(i, new d.event(j));
                };
            };
        return {
            getPrivate: function () {
                var h;
                if (!(h = this.getCustomData('_'))) this.setCustomData('_', h = {});
                return h;
            },
            on: function (h) {
                var k = this;
                var i = k.getCustomData('_cke_nativeListeners');
                if (!i) {
                    i = {};
                    k.setCustomData('_cke_nativeListeners', i);
                }
                if (!i[h]) {
                    var j = i[h] = g(k, h);
                    if (k.$.addEventListener) k.$.addEventListener(h, j, !! a.event.useCapture);
                    else if (k.$.attachEvent) k.$.attachEvent('on' + h, j);
                }
                return a.event.prototype.on.apply(k, arguments);
            },
            removeListener: function (h) {
                var k = this;
                a.event.prototype.removeListener.apply(k, arguments);
                if (!k.hasListeners(h)) {
                    var i = k.getCustomData('_cke_nativeListeners'),
                        j = i && i[h];
                    if (j) {
                        if (k.$.removeEventListener) k.$.removeEventListener(h, j, false);
                        else if (k.$.detachEvent) k.$.detachEvent('on' + h, j);
                        delete i[h];
                    }
                }
            },
            removeAllListeners: function () {
                var k = this;
                var h = k.getCustomData('_cke_nativeListeners');
                for (var i in h) {
                    var j = h[i];
                    if (k.$.removeEventListener) k.$.removeEventListener(i, j, false);
                    else if (k.$.detachEvent) k.$.detachEvent('on' + i, j);
                    delete h[i];
                }
            }
        };
    })();
    (function (g) {
        var h = {};
        a.on('reset', function () {
            h = {};
        });
        g.equals = function (i) {
            return i && i.$ === this.$;
        };
        g.setCustomData = function (i, j) {
            var k = this.getUniqueId(),
                l = h[k] || (h[k] = {});
            l[i] = j;
            return this;
        };
        g.getCustomData = function (i) {
            var j = this.$._cke_expando,
                k = j && h[j];
            return k && k[i];
        };
        g.removeCustomData = function (i) {
            var j = this.$._cke_expando,
                k = j && h[j],
                l = k && k[i];
            if (typeof l != 'undefined') delete k[i];
            return l || null;
        };
        g.clearCustomData = function () {
            this.removeAllListeners();
            var i = this.$._cke_expando;
            i && delete h[i];
        };
        g.getUniqueId = function () {
            return this.$._cke_expando || (this.$._cke_expando = e.getNextNumber());
        };
        a.event.implementOn(g);
    })(d.domObject.prototype);
    d.window = function (g) {
        d.domObject.call(this, g);
    };
    d.window.prototype = new d.domObject();
    e.extend(d.window.prototype, {
        focus: function () {
            if (b.webkit && this.$.parent) this.$.parent.focus();
            this.$.focus();
        },
        getViewPaneSize: function () {
            var g = this.$.document,
                h = g.compatMode == 'CSS1Compat';
            return {
                width: (h ? g.documentElement.clientWidth : g.body.clientWidth) || 0,
                height: (h ? g.documentElement.clientHeight : g.body.clientHeight) || 0
            };
        },
        getScrollPosition: function () {
            var g = this.$;
            if ('pageXOffset' in g) return {
                x: g.pageXOffset || 0,
                y: g.pageYOffset || 0
            };
            else {
                var h = g.document;
                return {
                    x: h.documentElement.scrollLeft || h.body.scrollLeft || 0,
                    y: h.documentElement.scrollTop || h.body.scrollTop || 0
                };
            }
        }
    });
    d.document = function (g) {
        d.domObject.call(this, g);
    };
    var g = d.document;
    g.prototype = new d.domObject();
    e.extend(g.prototype, {
        appendStyleSheet: function (h) {
            if (this.$.createStyleSheet) this.$.createStyleSheet(h);
            else {
                var i = new d.element('link');
                i.setAttributes({
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: h
                });
                this.getHead().append(i);
            }
        },
        appendStyleText: function (h) {
            var k = this;
            if (k.$.createStyleSheet) {
                var i = k.$.createStyleSheet('');
                i.cssText = h;
            } else {
                var j = new d.element('style', k);
                j.append(new d.text(h, k));
                k.getHead().append(j);
            }
        },
        createElement: function (h, i) {
            var j = new d.element(h, this);
            if (i) {
                if (i.attributes) j.setAttributes(i.attributes);
                if (i.styles) j.setStyles(i.styles);
            }
            return j;
        },
        createText: function (h) {
            return new d.text(h, this);
        },
        focus: function () {
            this.getWindow().focus();
        },
        getById: function (h) {
            var i = this.$.getElementById(h);
            return i ? new d.element(i) : null;
        },
        getByAddress: function (h, i) {
            var j = this.$.documentElement;
            for (var k = 0; j && k < h.length; k++) {
                var l = h[k];
                if (!i) {
                    j = j.childNodes[l];
                    continue;
                }
                var m = -1;
                for (var n = 0; n < j.childNodes.length; n++) {
                    var o = j.childNodes[n];
                    if (i === true && o.nodeType == 3 && o.previousSibling && o.previousSibling.nodeType == 3) continue;
                    m++;
                    if (m == l) {
                        j = o;
                        break;
                    }
                }
            }
            return j ? new d.node(j) : null;
        },
        getElementsByTag: function (h, i) {
            if (!c && i) h = i + ':' + h;
            return new d.nodeList(this.$.getElementsByTagName(h));
        },
        getHead: function () {
            var h = this.$.getElementsByTagName('head')[0];
            h = new d.element(h);
            return (this.getHead = function () {
                return h;
            })();
        },
        getBody: function () {
            var h = new d.element(this.$.body);
            return (this.getBody = function () {
                return h;
            })();
        },
        getDocumentElement: function () {
            var h = new d.element(this.$.documentElement);
            return (this.getDocumentElement = function () {
                return h;
            })();
        },
        getWindow: function () {
            var h = new d.window(this.$.parentWindow || this.$.defaultView);
            return (this.getWindow = function () {
                return h;
            })();
        }
    });
    d.node = function (h) {
        if (h) {
            switch (h.nodeType) {
            case 9:
                return new g(h);
            case 1:
                return new d.element(h);
            case 3:
                return new d.text(h);
            }
            d.domObject.call(this, h);
        }
        return this;
    };
    d.node.prototype = new d.domObject();
    a.NODE_ELEMENT = 1;
    a.NODE_DOCUMENT = 9;
    a.NODE_TEXT = 3;
    a.NODE_COMMENT = 8;
    a.NODE_DOCUMENT_FRAGMENT = 11;
    a.POSITION_IDENTICAL = 0;
    a.POSITION_DISCONNECTED = 1;
    a.POSITION_FOLLOWING = 2;
    a.POSITION_PRECEDING = 4;
    a.POSITION_IS_CONTAINED = 8;
    a.POSITION_CONTAINS = 16;
    e.extend(d.node.prototype, {
        appendTo: function (h, i) {
            h.append(this, i);
            return h;
        },
        clone: function (h, i) {
            var j = this.$.cloneNode(h);
            if (!i) {
                var k = function (l) {
                        if (l.nodeType != 1) return;
                        l.removeAttribute('id', false);
                        l.removeAttribute('_cke_expando', false);
                        var m = l.childNodes;
                        for (var n = 0; n < m.length; n++) k(m[n]);
                    };
                k(j);
            }
            return new d.node(j);
        },
        hasPrevious: function () {
            return !!this.$.previousSibling;
        },
        hasNext: function () {
            return !!this.$.nextSibling;
        },
        insertAfter: function (h) {
            h.$.parentNode.insertBefore(this.$, h.$.nextSibling);
            return h;
        },
        insertBefore: function (h) {
            h.$.parentNode.insertBefore(this.$, h.$);
            return h;
        },
        insertBeforeMe: function (h) {
            this.$.parentNode.insertBefore(h.$, this.$);
            return h;
        },
        getAddress: function (h) {
            var i = [],
                j = this.getDocument().$.documentElement,
                k = this.$;
            while (k && k != j) {
                var l = k.parentNode,
                    m = -1;
                if (l) {
                    for (var n = 0; n < l.childNodes.length; n++) {
                        var o = l.childNodes[n];
                        if (h && o.nodeType == 3 && o.previousSibling && o.previousSibling.nodeType == 3) continue;
                        m++;
                        if (o == k) break;
                    }
                    i.unshift(m);
                }
                k = l;
            }
            return i;
        },
        getDocument: function () {
            var h = new g(this.$.ownerDocument || this.$.parentNode.ownerDocument);
            return (this.getDocument = function () {
                return h;
            })();
        },
        getIndex: function () {
            var h = this.$,
                i = h.parentNode && h.parentNode.firstChild,
                j = -1;
            while (i) {
                j++;
                if (i == h) return j;
                i = i.nextSibling;
            }
            return -1;
        },
        getNextSourceNode: function (h, i, j) {
            if (j && !j.call) {
                var k = j;
                j = function (n) {
                    return !n.equals(k);
                };
            }
            var l = !h && this.getFirst && this.getFirst(),
                m;
            if (!l) {
                if (this.type == 1 && j && j(this, true) === false) return null;
                l = this.getNext();
            }
            while (!l && (m = (m || this).getParent())) {
                if (j && j(m, true) === false) return null;
                l = m.getNext();
            }
            if (!l) return null;
            if (j && j(l) === false) return null;
            if (i && i != l.type) return l.getNextSourceNode(false, i, j);
            return l;
        },
        getPreviousSourceNode: function (h, i, j) {
            if (j && !j.call) {
                var k = j;
                j = function (n) {
                    return !n.equals(k);
                };
            }
            var l = !h && this.getLast && this.getLast(),
                m;
            if (!l) {
                if (this.type == 1 && j && j(this, true) === false) return null;
                l = this.getPrevious();
            }
            while (!l && (m = (m || this).getParent())) {
                if (j && j(m, true) === false) return null;
                l = m.getPrevious();
            }
            if (!l) return null;
            if (j && j(l) === false) return null;
            if (i && l.type != i) return l.getPreviousSourceNode(false, i, j);
            return l;
        },
        getPrevious: function (h) {
            var i = this.$,
                j;
            do {
                i = i.previousSibling;
                j = i && new d.node(i);
            } while (j && h && !h(j)) return j;
        },
        getNext: function (h) {
            var i = this.$,
                j;
            do {
                i = i.nextSibling;
                j = i && new d.node(i);
            } while (j && h && !h(j)) return j;
        },
        getParent: function () {
            var h = this.$.parentNode;
            return h && h.nodeType == 1 ? new d.node(h) : null;
        },
        getParents: function (h) {
            var i = this,
                j = [];
            do j[h ? 'push' : 'unshift'](i);
            while (i = i.getParent()) return j;
        },
        getCommonAncestor: function (h) {
            var j = this;
            if (h.equals(j)) return j;
            if (h.contains && h.contains(j)) return h;
            var i = j.contains ? j : j.getParent();
            do {
                if (i.contains(h)) return i;
            } while (i = i.getParent()) return null;
        },
        getPosition: function (h) {
            var i = this.$,
                j = h.$;
            if (i.compareDocumentPosition) return i.compareDocumentPosition(j);
            if (i == j) return 0;
            if (this.type == 1 && h.type == 1) {
                if (i.contains) {
                    if (i.contains(j)) return 16 + 4;
                    if (j.contains(i)) return 8 + 2;
                }
                if ('sourceIndex' in i) return i.sourceIndex < 0 || j.sourceIndex < 0 ? 1 : i.sourceIndex < j.sourceIndex ? 4 : 2;
            }
            var k = this.getAddress(),
                l = h.getAddress(),
                m = Math.min(k.length, l.length);
            for (var n = 0; n <= m - 1; n++) {
                if (k[n] != l[n]) {
                    if (n < m) return k[n] < l[n] ? 4 : 2;
                    break;
                }
            }
            return k.length < l.length ? 16 + 4 : 8 + 2;
        },
        getAscendant: function (h, i) {
            var j = this.$;
            if (!i) j = j.parentNode;
            while (j) {
                if (j.nodeName && j.nodeName.toLowerCase() == h) return new d.node(j);
                j = j.parentNode;
            }
            return null;
        },
        hasAscendant: function (h, i) {
            var j = this.$;
            if (!i) j = j.parentNode;
            while (j) {
                if (j.nodeName && j.nodeName.toLowerCase() == h) return true;
                j = j.parentNode;
            }
            return false;
        },
        move: function (h, i) {
            h.append(this.remove(), i);
        },
        remove: function (h) {
            var i = this.$,
                j = i.parentNode;
            if (j) {
                if (h) for (var k; k = i.firstChild;) j.insertBefore(i.removeChild(k), i);
                j.removeChild(i);
            }
            return this;
        },
        replace: function (h) {
            this.insertBefore(h);
            h.remove();
        },
        trim: function () {
            this.ltrim();
            this.rtrim();
        },
        ltrim: function () {
            var k = this;
            var h;
            while (k.getFirst && (h = k.getFirst())) {
                if (h.type == 3) {
                    var i = e.ltrim(h.getText()),
                        j = h.getLength();
                    if (!i) {
                        h.remove();
                        continue;
                    } else if (i.length < j) {
                        h.split(j - i.length);
                        k.$.removeChild(k.$.firstChild);
                    }
                }
                break;
            }
        },
        rtrim: function () {
            var k = this;
            var h;
            while (k.getLast && (h = k.getLast())) {
                if (h.type == 3) {
                    var i = e.rtrim(h.getText()),
                        j = h.getLength();
                    if (!i) {
                        h.remove();
                        continue;
                    } else if (i.length < j) {
                        h.split(i.length);
                        k.$.lastChild.parentNode.removeChild(k.$.lastChild);
                    }
                }
                break;
            }
            if (!c && !b.opera) {
                h = k.$.lastChild;
                if (h && h.type == 1 && h.nodeName.toLowerCase() == 'br') h.parentNode.removeChild(h);
            }
        }
    });
    d.nodeList = function (h) {
        this.$ = h;
    };
    d.nodeList.prototype = {
        count: function () {
            return this.$.length;
        },
        getItem: function (h) {
            var i = this.$[h];
            return i ? new d.node(i) : null;
        }
    };
    d.element = function (h, i) {
        if (typeof h == 'string') h = (i ? i.$ : document).createElement(h);
        d.domObject.call(this, h);
    };
    var h = d.element;
    h.get = function (i) {
        return i && (i.$ ? i : new h(i));
    };
    h.prototype = new d.node();
    h.createFromHtml = function (i, j) {
        var k = new h('div', j);
        k.setHtml(i);
        return k.getFirst().remove();
    };
    h.setMarker = function (i, j, k, l) {
        var m = j.getCustomData('list_marker_id') || j.setCustomData('list_marker_id', e.getNextNumber()).getCustomData('list_marker_id'),
            n = j.getCustomData('list_marker_names') || j.setCustomData('list_marker_names', {}).getCustomData('list_marker_names');
        i[m] = j;
        n[k] = 1;
        return j.setCustomData(k, l);
    };
    h.clearAllMarkers = function (i) {
        for (var j in i) h.clearMarkers(i, i[j], true);
    };
    h.clearMarkers = function (i, j, k) {
        var l = j.getCustomData('list_marker_names'),
            m = j.getCustomData('list_marker_id');
        for (var n in l) j.removeCustomData(n);
        j.removeCustomData('list_marker_names');
        if (k) {
            j.removeCustomData('list_marker_id');
            delete i[m];
        }
    };
    e.extend(h.prototype, {
        type: 1,
        addClass: function (i) {
            var j = this.$.className;
            if (j) {
                var k = new RegExp('(?:^|\\s)' + i + '(?:\\s|$)', '');
                if (!k.test(j)) j += ' ' + i;
            }
            this.$.className = j || i;
        },
        removeClass: function (i) {
            var j = this.getAttribute('class');
            if (j) {
                var k = new RegExp('(?:^|\\s+)' + i + '(?=\\s|$)', 'i');
                if (k.test(j)) {
                    j = j.replace(k, '').replace(/^\s+/, '');
                    if (j) this.setAttribute('class', j);
                    else this.removeAttribute('class');
                }
            }
        },
        hasClass: function (i) {
            var j = new RegExp('(?:^|\\s+)' + i + '(?=\\s|$)', '');
            return j.test(this.getAttribute('class'));
        },
        append: function (i, j) {
            var k = this;
            if (typeof i == 'string') i = k.getDocument().createElement(i);
            if (j) k.$.insertBefore(i.$, k.$.firstChild);
            else k.$.appendChild(i.$);
            return i;
        },
        appendHtml: function (i) {
            var k = this;
            if (!k.$.childNodes.length) k.setHtml(i);
            else {
                var j = new h('div', k.getDocument());
                j.setHtml(i);
                j.moveChildren(k);
            }
        },
        appendText: function (i) {
            if (this.$.text != undefined) this.$.text += i;
            else this.append(new d.text(i));
        },
        appendBogus: function () {
            var k = this;
            var i = k.getLast();
            while (i && i.type == 3 && !e.rtrim(i.getText())) i = i.getPrevious();
            if (!i || !i.is || !i.is('br')) {
                var j = b.opera ? k.getDocument().createText('') : k.getDocument().createElement('br');
                b.gecko && j.setAttribute('type', '_moz');
                k.append(j);
            }
        },
        breakParent: function (i) {
            var l = this;
            var j = new d.range(l.getDocument());
            j.setStartAfter(l);
            j.setEndAfter(i);
            var k = j.extractContents();
            j.insertNode(l.remove());
            k.insertAfterNode(l);
        },
        contains: c || b.webkit ?
        function (i) {
            var j = this.$;
            return i.type != 1 ? j.contains(i.getParent().$) : j != i.$ && j.contains(i.$);
        } : function (i) {
            return !!(this.$.compareDocumentPosition(i.$) & 16);
        },
        focus: function () {
            try {
                this.$.focus();
            } catch (i) {}
        },
        getHtml: function () {
            var i = this.$.innerHTML;
            return c ? i.replace(/<\?[^>]*>/g, '') : i;
        },
        getOuterHtml: function () {
            var j = this;
            if (j.$.outerHTML) return j.$.outerHTML.replace(/<\?[^>]*>/, '');
            var i = j.$.ownerDocument.createElement('div');
            i.appendChild(j.$.cloneNode(true));
            return i.innerHTML;
        },
        setHtml: function (i) {
            return this.$.innerHTML = i;
        },
        setText: function (i) {
            h.prototype.setText = this.$.innerText != undefined ?
            function (j) {
                return this.$.innerText = j;
            } : function (j) {
                return this.$.textContent = j;
            };
            return this.setText(i);
        },
        getAttribute: (function () {
            var i = function (j) {
                    return this.$.getAttribute(j, 2);
                };
            if (c && (b.ie7Compat || b.ie6Compat)) return function (j) {
                var n = this;
                switch (j) {
                case 'class':
                    j = 'className';
                    break;
                case 'tabindex':
                    var k = i.call(n, j);
                    if (k !== 0 && n.$.tabIndex === 0) k = null;
                    return k;
                    break;
                case 'checked':
                    var l = n.$.attributes.getNamedItem(j),
                        m = l.specified ? l.nodeValue : n.$.checked;
                    return m ? 'checked' : null;
                case 'hspace':
                    return n.$.hspace;
                case 'style':
                    return n.$.style.cssText;
                }
                return i.call(n, j);
            };
            else return i;
        })(),
        getChildren: function () {
            return new d.nodeList(this.$.childNodes);
        },
        getComputedStyle: c ?
        function (i) {
            return this.$.currentStyle[e.cssStyleToDomStyle(i)];
        } : function (i) {
            return this.getWindow().$.getComputedStyle(this.$, '').getPropertyValue(i);
        },
        getDtd: function () {
            var i = f[this.getName()];
            this.getDtd = function () {
                return i;
            };
            return i;
        },
        getElementsByTag: g.prototype.getElementsByTag,
        getTabIndex: c ?
        function () {
            var i = this.$.tabIndex;
            if (i === 0 && !f.$tabIndex[this.getName()] && parseInt(this.getAttribute('tabindex'), 10) !== 0) i = -1;
            return i;
        } : b.webkit ?
        function () {
            var i = this.$.tabIndex;
            if (i == undefined) {
                i = parseInt(this.getAttribute('tabindex'), 10);
                if (isNaN(i)) i = -1;
            }
            return i;
        } : function () {
            return this.$.tabIndex;
        },
        getText: function () {
            return this.$.textContent || this.$.innerText || '';
        },
        getWindow: function () {
            return this.getDocument().getWindow();
        },
        getId: function () {
            return this.$.id || null;
        },
        getNameAtt: function () {
            return this.$.name || null;
        },
        getName: function () {
            var i = this.$.nodeName.toLowerCase();
            if (c) {
                var j = this.$.scopeName;
                if (j != 'HTML') i = j.toLowerCase() + ':' + i;
            }
            return (this.getName = function () {
                return i;
            })();
        },
        getValue: function () {
            return this.$.value;
        },
        getFirst: function (i) {
            var j = this.$.firstChild,
                k = j && new d.node(j);
            if (k && i && !i(k)) k = k.getNext(i);
            return k;
        },
        getLast: function (i) {
            var j = this.$.lastChild,
                k = j && new d.node(j);
            if (k && i && !i(k)) k = k.getPrevious(i);
            return k;
        },
        getStyle: function (i) {
            return this.$.style[e.cssStyleToDomStyle(i)];
        },
        is: function () {
            var i = this.getName();
            for (var j = 0; j < arguments.length; j++) {
                if (arguments[j] == i) return true;
            }
            return false;
        },
        isEditable: function () {
            var i = this.getName(),
                j = !f.$nonEditable[i] && (f[i] || f.span);
            return j && j['#'];
        },
        isIdentical: function (i) {
            if (this.getName() != i.getName()) return false;
            var j = this.$.attributes,
                k = i.$.attributes,
                l = j.length,
                m = k.length;
            if (!c && l != m) return false;
            for (var n = 0; n < l; n++) {
                var o = j[n];
                if ((!c || o.specified && o.nodeName != '_cke_expando') && o.nodeValue != i.getAttribute(o.nodeName)) return false;
            }
            if (c) for (n = 0; n < m; n++) {
                o = k[n];
                if (o.specified && o.nodeName != '_cke_expando' && o.nodeValue != this.getAttribute(o.nodeName)) return false;
            }
            return true;
        },
        isVisible: function () {
            var i = !! this.$.offsetHeight && this.getComputedStyle('visibility') != 'hidden',
                j, k;
            if (i && (b.webkit || b.opera)) {
                j = this.getWindow();
                if (!j.equals(a.document.getWindow()) && (k = j.$.frameElement)) i = new h(k).isVisible();
            }
            return i;
        },
        isEmptyInlineRemoveable: function () {
            if (!f.$removeEmpty[this.getName()]) return false;
            var i = this.getChildren();
            for (var j = 0, k = i.count(); j < k; j++) {
                var l = i.getItem(j);
                if (l.type == 1 && l.getAttribute('_fck_bookmark')) continue;
                if (l.type == 1 && !l.isEmptyInlineRemoveable() || l.type == 3 && e.trim(l.getText())) return false;
            }
            return true;
        },
        hasAttributes: c && (b.ie7Compat || b.ie6Compat) ?
        function () {
            var i = this.$.attributes;
            for (var j = 0; j < i.length; j++) {
                var k = i[j];
                switch (k.nodeName) {
                case 'class':
                    if (this.getAttribute('class')) return true;
                case '_cke_expando':
                    continue;
                default:
                    if (k.specified) return true;
                }
            }
            return false;
        } : function () {
            var i = this.$.attributes;
            return i.length > 1 || i.length == 1 && i[0].nodeName != '_cke_expando';
        },
        hasAttribute: function (i) {
            var j = this.$.attributes.getNamedItem(i);
            return !!(j && j.specified);
        },
        hide: function () {
            this.setStyle('display', 'none');
        },
        moveChildren: function (i, j) {
            var k = this.$;
            i = i.$;
            if (k == i) return;
            var l;
            if (j) while (l = k.lastChild) i.insertBefore(k.removeChild(l), i.firstChild);
            else while (l = k.firstChild) i.appendChild(k.removeChild(l));
        },
        mergeSiblings: (function () {
            function i(j, k, l) {
                if (k && k.type == 1) {
                    var m = [];
                    while (k.getAttribute('_fck_bookmark') || k.isEmptyInlineRemoveable()) {
                        m.push(k);
                        k = l ? k.getNext() : k.getPrevious();
                        if (!k || k.type != 1) return;
                    }
                    if (j.isIdentical(k)) {
                        var n = l ? j.getLast() : j.getFirst();
                        while (m.length) m.shift().move(j, !l);
                        k.moveChildren(j, !l);
                        k.remove();
                        if (n && n.type == 1) n.mergeSiblings();
                    }
                }
            };
            return function () {
                var j = this;
                if (!(f.$removeEmpty[j.getName()] || j.is('a'))) return;
                i(j, j.getNext(), true);
                i(j, j.getPrevious());
            };
        })(),
        show: function () {
            this.setStyles({
                display: '',
                visibility: ''
            });
        },
        setAttribute: (function () {
            var i = function (j, k) {
                    this.$.setAttribute(j, k);
                    return this;
                };
            if (c && (b.ie7Compat || b.ie6Compat)) return function (j, k) {
                var l = this;
                if (j == 'class') l.$.className = k;
                else if (j == 'style') l.$.style.cssText = k;
                else if (j == 'tabindex') l.$.tabIndex = k;
                else if (j == 'checked') l.$.checked = k;
                else i.apply(l, arguments);
                return l;
            };
            else return i;
        })(),
        setAttributes: function (i) {
            for (var j in i) this.setAttribute(j, i[j]);
            return this;
        },
        setValue: function (i) {
            this.$.value = i;
            return this;
        },
        removeAttribute: (function () {
            var i = function (j) {
                    this.$.removeAttribute(j);
                };
            if (c && (b.ie7Compat || b.ie6Compat)) return function (j) {
                if (j == 'class') j = 'className';
                else if (j == 'tabindex') j = 'tabIndex';
                i.call(this, j);
            };
            else return i;
        })(),
        removeAttributes: function (i) {
            if (e.isArray(i)) for (var j = 0; j < i.length; j++) this.removeAttribute(i[j]);
            else for (var k in i) i.hasOwnProperty(k) && this.removeAttribute(k);
        },
        removeStyle: function (i) {
            var j = this;
            j.setStyle(i, '');
            if (j.$.style.removeAttribute) j.$.style.removeAttribute(e.cssStyleToDomStyle(i));
            if (!j.$.style.cssText) j.removeAttribute('style');
        },
        setStyle: function (i, j) {
            this.$.style[e.cssStyleToDomStyle(i)] = j;
            return this;
        },
        setStyles: function (i) {
            for (var j in i) this.setStyle(j, i[j]);
            return this;
        },
        setOpacity: function (i) {
            if (c) {
                i = Math.round(i * 100);
                this.setStyle('filter', i >= 100 ? '' : 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + i + ')');
            } else this.setStyle('opacity', i);
        },
        unselectable: b.gecko ?
        function () {
            this.$.style.MozUserSelect = 'none';
        } : b.webkit ?
        function () {
            this.$.style.KhtmlUserSelect = 'none';
        } : function () {
            if (c || b.opera) {
                var i = this.$,
                    j, k = 0;
                i.unselectable = 'on';
                while (j = i.all[k++]) switch (j.tagName.toLowerCase()) {
                case 'iframe':
                case 'textarea':
                case 'input':
                case 'select':
                    break;
                default:
                    j.unselectable = 'on';
                }
            }
        },
        getPositionedAncestor: function () {
            var i = this;
            while (i.getName() != 'html') {
                if (i.getComputedStyle('position') != 'static') return i;
                i = i.getParent();
            }
            return null;
        },
        getDocumentPosition: function (i) {
            var D = this;
            var j = 0,
                k = 0,
                l = D.getDocument().getBody(),
                m = D.getDocument().$.compatMode == 'BackCompat',
                n = D.getDocument();
            if (document.documentElement.getBoundingClientRect) {
                var o = D.$.getBoundingClientRect(),
                    p = n.$,
                    q = p.documentElement,
                    r = q.clientTop || l.$.clientTop || 0,
                    s = q.clientLeft || l.$.clientLeft || 0,
                    t = true;
                if (c) {
                    var u = n.getDocumentElement().contains(D),
                        v = n.getBody().contains(D);
                    t = m && v || !m && u;
                }
                if (t) {
                    j = o.left + (!m && q.scrollLeft || l.$.scrollLeft);
                    j -= s;
                    k = o.top + (!m && q.scrollTop || l.$.scrollTop);
                    k -= r;
                }
            } else {
                var w = D,
                    x = null,
                    y;
                while (w && !(w.getName() == 'body' || w.getName() == 'html')) {
                    j += w.$.offsetLeft - w.$.scrollLeft;
                    k += w.$.offsetTop - w.$.scrollTop;
                    if (!w.equals(D)) {
                        j += w.$.clientLeft || 0;
                        k += w.$.clientTop || 0;
                    }
                    var z = x;
                    while (z && !z.equals(w)) {
                        j -= z.$.scrollLeft;
                        k -= z.$.scrollTop;
                        z = z.getParent();
                    }
                    x = w;
                    w = (y = w.$.offsetParent) ? new h(y) : null;
                }
            }
            if (i) {
                var A = D.getWindow(),
                    B = i.getWindow();
                if (!A.equals(B) && A.$.frameElement) {
                    var C = new h(A.$.frameElement).getDocumentPosition(i);
                    j += C.x;
                    k += C.y;
                }
            }
            if (!document.documentElement.getBoundingClientRect) if (b.gecko && !m) {
                j += D.$.clientLeft ? 1 : 0;
                k += D.$.clientTop ? 1 : 0;
            }
            return {
                x: j,
                y: k
            };
        },
        scrollIntoView: function (i) {
            var o = this;
            var j = o.getWindow(),
                k = j.getViewPaneSize().height,
                l = k * -1;
            if (i) l += k;
            else {
                l += o.$.offsetHeight || 0;
                l += parseInt(o.getComputedStyle('marginBottom') || 0, 10) || 0;
            }
            var m = o.getDocumentPosition();
            l += m.y;
            l = l < 0 ? 0 : l;
            var n = j.getScrollPosition().y;
            if (l > n || l < n - k) j.$.scrollTo(0, l);
        },
        setState: function (i) {
            var j = this;
            switch (i) {
            case 1:
                j.addClass('cke_on');
                j.removeClass('cke_off');
                j.removeClass('cke_disabled');
                break;
            case 0:
                j.addClass('cke_disabled');
                j.removeClass('cke_off');
                j.removeClass('cke_on');
                break;
            default:
                j.addClass('cke_off');
                j.removeClass('cke_on');
                j.removeClass('cke_disabled');
                break;
            }
        },
        getFrameDocument: function () {
            var i = this.$;
            try {
                i.contentWindow.document;
            } catch (j) {
                i.src = i.src;
                if (c && b.version < 7) window.showModalDialog('javascript:document.write("<script>window.setTimeout(function(){window.close();},50);</script>")');
            }
            return i && new g(i.contentWindow.document);
        },
        copyAttributes: function (i, j) {
            var p = this;
            var k = p.$.attributes;
            j = j || {};
            for (var l = 0; l < k.length; l++) {
                var m = k[l],
                    n = m.nodeName.toLowerCase(),
                    o;
                if (n in j) continue;
                if (n == 'checked' && (o = p.getAttribute(n))) i.setAttribute(n, o);
                else if (m.specified || c && m.nodeValue && n == 'value') {
                    o = p.getAttribute(n);
                    if (o === null) o = m.nodeValue;
                    i.setAttribute(n, o);
                }
            }
            if (p.$.style.cssText !== '') i.$.style.cssText = p.$.style.cssText;
        },
        renameNode: function (i) {
            var l = this;
            if (l.getName() == i) return;
            var j = l.getDocument(),
                k = new h(i, j);
            l.copyAttributes(k);
            l.moveChildren(k);
            l.getParent() && l.$.parentNode.replaceChild(k.$, l.$);
            k.$._cke_expando = l.$._cke_expando;
            l.$ = k.$;
        },
        getChild: function (i) {
            var j = this.$;
            if (!i.slice) j = j.childNodes[i];
            else while (i.length > 0 && j) j = j.childNodes[i.shift()];
            return j ? new d.node(j) : null;
        },
        getChildCount: function () {
            return this.$.childNodes.length;
        },
        disableContextMenu: function () {
            this.on('contextmenu', function (i) {
                if (!i.data.getTarget().hasClass('cke_enable_context_menu')) i.data.preventDefault();
            });
        }
    });
    a.command = function (i, j) {
        this.uiItems = [];
        this.exec = function (k) {
            if (this.state == 0) return false;
            if (this.editorFocus) i.focus();
            return j.exec.call(this, i, k) !== false;
        };
        e.extend(this, j, {
            modes: {
                wysiwyg: 1
            },
            editorFocus: true,
            state: 2
        });
        a.event.call(this);
    };
    a.command.prototype = {
        enable: function () {
            var i = this;
            if (i.state == 0) i.setState(!i.preserveState || typeof i.previousState == 'undefined' ? 2 : i.previousState);
        },
        disable: function () {
            this.setState(0);
        },
        setState: function (i) {
            var j = this;
            if (j.state == i) return false;
            j.previousState = j.state;
            j.state = i;
            j.fire('state');
            return true;
        },
        toggleState: function () {
            var i = this;
            if (i.state == 2) i.setState(1);
            else if (i.state == 1) i.setState(2);
        }
    };
    a.event.implementOn(a.command.prototype, true);
    a.ENTER_P = 1;
    a.ENTER_BR = 2;
    a.ENTER_DIV = 3;
    a.config = {
        customConfig: 'config.js',
        autoUpdateElement: true,
        baseHref: '',
        contentsCss: a.basePath + 'contents.css',
        contentsLangDirection: 'ui',
        contentsLanguage: '',
        language: '',
        defaultLanguage: 'en',
        enterMode: 1,
        forceEnterMode: false,
        shiftEnterMode: 2,
        corePlugins: '',
        docType: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
        bodyId: '',
        bodyClass: '',
        fullPage: false,
        height: 200,
        plugins: 'about,a11yhelp,basicstyles,blockquote,button,clipboard,colorbutton,colordialog,contextmenu,div,elementspath,enterkey,entities,filebrowser,find,flash,font,format,forms,horizontalrule,htmldataprocessor,image,indent,justify,keystrokes,link,list,liststyle,maximize,newpage,pagebreak,pastefromword,pastetext,popup,preview,print,removeformat,resize,save,scayt,smiley,showblocks,showborders,sourcearea,stylescombo,table,tabletools,specialchar,tab,templates,toolbar,undo,wysiwygarea,wsc',
        extraPlugins: '',
        removePlugins: '',
        protectedSource: [],
        tabIndex: 0,
        theme: 'default',
        skin: 'kama',
        width: '',
        baseFloatZIndex: 10000
    };
    var i = a.config;
    a.focusManager = function (j) {
        if (j.focusManager) return j.focusManager;
        this.hasFocus = false;
        this._ = {
            editor: j
        };
        return this;
    };
    a.focusManager.prototype = {
        focus: function () {
            var k = this;
            if (k._.timer) clearTimeout(k._.timer);
            if (!k.hasFocus) {
                if (a.currentInstance) a.currentInstance.focusManager.forceBlur();
                var j = k._.editor;
                j.container.getChild(1).addClass('cke_focus');
                k.hasFocus = true;
                j.fire('focus');
            }
        },
        blur: function () {
            var j = this;
            if (j._.timer) clearTimeout(j._.timer);
            j._.timer = setTimeout(function () {
                delete j._.timer;
                j.forceBlur();
            }, 100);
        },
        forceBlur: function () {
            if (this.hasFocus) {
                var j = this._.editor;
                j.container.getChild(1).removeClass('cke_focus');
                this.hasFocus = false;
                j.fire('blur');
            }
        }
    };
    (function () {
        var j = {};
        a.lang = {
            languages: {
                af: 1,
                ar: 1,
                bg: 1,
                bn: 1,
                bs: 1,
                ca: 1,
                cs: 1,
                cy: 1,
                da: 1,
                de: 1,
                el: 1,
                'en-au': 1,
                'en-ca': 1,
                'en-gb': 1,
                en: 1,
                eo: 1,
                es: 1,
                et: 1,
                eu: 1,
                fa: 1,
                fi: 1,
                fo: 1,
                'fr-ca': 1,
                fr: 1,
                gl: 1,
                gu: 1,
                he: 1,
                hi: 1,
                hr: 1,
                hu: 1,
                is: 1,
                it: 1,
                ja: 1,
                km: 1,
                ko: 1,
                lt: 1,
                lv: 1,
                mn: 1,
                ms: 1,
                nb: 1,
                nl: 1,
                no: 1,
                pl: 1,
                'pt-br': 1,
                pt: 1,
                ro: 1,
                ru: 1,
                sk: 1,
                sl: 1,
                'sr-latn': 1,
                sr: 1,
                sv: 1,
                th: 1,
                tr: 1,
                uk: 1,
                vi: 1,
                'zh-cn': 1,
                zh: 1
            },
            load: function (k, l, m) {
                if (!k || !a.lang.languages[k]) k = this.detect(l, k);
                if (!this[k]) a.scriptLoader.load(a.getUrl('lang/' + k + '.js'), function () {
                    m(k, this[k]);
                }, this);
                else m(k, this[k]);
            },
            detect: function (k, l) {
                var m = this.languages;
                l = l || navigator.userLanguage || navigator.language;
                var n = l.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
                    o = n[1],
                    p = n[2];
                if (m[o + '-' + p]) o = o + '-' + p;
                else if (!m[o]) o = null;
                a.lang.detect = o ?
                function () {
                    return o;
                } : function (q) {
                    return q;
                };
                return o || k;
            }
        };
    })();
    a.scriptLoader = (function () {
        var j = {},
            k = {};
        return {
            load: function (l, m, n, o, p) {
                var q = typeof l == 'string';
                if (q) l = [l];
                if (!n) n = a;
                var r = l.length,
                    s = [],
                    t = [],
                    u = function (z) {
                        if (m) if (q) m.call(n, z);
                        else m.call(n, s, t);
                    };
                if (r === 0) {
                    u(true);
                    return;
                }
                var v = function (z, A) {
                        (A ? s : t).push(z);
                        if (--r <= 0) {
                            p && a.document.getDocumentElement().removeStyle('cursor');
                            u(A);
                        }
                    },
                    w = function (z, A) {
                        j[z] = 1;
                        var B = k[z];
                        delete k[z];
                        for (var C = 0; C < B.length; C++) B[C](z, A);
                    },
                    x = function (z) {
                        if (o !== true && j[z]) {
                            v(z, true);
                            return;
                        }
                        var A = k[z] || (k[z] = []);
                        A.push(v);
                        if (A.length > 1) return;
                        var B = new h('script');
                        B.setAttributes({
                            type: 'text/javascript',
                            src: z
                        });
                        if (m) if (c) B.$.onreadystatechange = function () {
                            if (B.$.readyState == 'loaded' || B.$.readyState == 'complete') {
                                B.$.onreadystatechange = null;
                                w(z, true);
                            }
                        };
                        else {
                            B.$.onload = function () {
                                setTimeout(function () {
                                    w(z, true);
                                }, 0);
                            };
                            B.$.onerror = function () {
                                w(z, false);
                            };
                        }
                        B.appendTo(a.document.getHead());
                    };
                p && a.document.getDocumentElement().setStyle('cursor', 'wait');
                for (var y = 0; y < r; y++) x(l[y]);
            },
            loadCode: function (l) {
                var m = new h('script');
                m.setAttribute('type', 'text/javascript');
                m.appendText(l);
                m.appendTo(a.document.getHead());
            }
        };
    })();
    a.resourceManager = function (j, k) {
        var l = this;
        l.basePath = j;
        l.fileName = k;
        l.registered = {};
        l.loaded = {};
        l.externals = {};
        l._ = {
            waitingList: {}
        };
    };
    a.resourceManager.prototype = {
        add: function (j, k) {
            if (this.registered[j]) throw '[CKEDITOR.resourceManager.add] The resource name "' + j + '" is already registered.';
            a.fire(j + e.capitalize(this.fileName) + 'Ready', this.registered[j] = k || {});
        },
        get: function (j) {
            return this.registered[j] || null;
        },
        getPath: function (j) {
            var k = this.externals[j];
            return a.getUrl(k && k.dir || this.basePath + j + '/');
        },
        getFilePath: function (j) {
            var k = this.externals[j];
            return a.getUrl(this.getPath(j) + (k && typeof k.file == 'string' ? k.file : this.fileName + '.js'));
        },
        addExternal: function (j, k, l) {
            j = j.split(',');
            for (var m = 0; m < j.length; m++) {
                var n = j[m];
                this.externals[n] = {
                    dir: k,
                    file: l
                };
            }
        },
        load: function (j, k, l) {
            if (!e.isArray(j)) j = j ? [j] : [];
            var m = this.loaded,
                n = this.registered,
                o = [],
                p = {},
                q = {};
            for (var r = 0; r < j.length; r++) {
                var s = j[r];
                if (!s) continue;
                if (!m[s] && !n[s]) {
                    var t = this.getFilePath(s);
                    o.push(t);
                    if (!(t in p)) p[t] = [];
                    p[t].push(s);
                } else q[s] = this.get(s);
            }
            a.scriptLoader.load(o, function (u, v) {
                if (v.length) throw '[CKEDITOR.resourceManager.load] Resource name "' + p[v[0]].join(',') + '" was not found at "' + v[0] + '".';
                for (var w = 0; w < u.length; w++) {
                    var x = p[u[w]];
                    for (var y = 0; y < x.length; y++) {
                        var z = x[y];
                        q[z] = this.get(z);
                        m[z] = 1;
                    }
                }
                k.call(l, q);
            }, this);
        }
    };
    a.plugins = new a.resourceManager('plugins/', 'plugin');
    var j = a.plugins;
    j.load = e.override(j.load, function (k) {
        return function (l, m, n) {
            var o = {},
                p = function (q) {
                    k.call(this, q, function (r) {
                        e.extend(o, r);
                        var s = [];
                        for (var t in r) {
                            var u = r[t],
                                v = u && u.requires;
                            if (v) for (var w = 0; w < v.length; w++) {
                                if (!o[v[w]]) s.push(v[w]);
                            }
                        }
                        if (s.length) p.call(this, s);
                        else {
                            for (t in o) {
                                u = o[t];
                                if (u.onLoad && !u.onLoad._called) {
                                    u.onLoad();
                                    u.onLoad._called = 1;
                                }
                            }
                            if (m) m.call(n || window, o);
                        }
                    }, this);
                };
            p.call(this, l);
        };
    });
    j.setLang = function (k, l, m) {
        var n = this.get(k),
            o = n.lang || (n.lang = {});
        o[l] = m;
    };
    (function () {
        var k = {},
            l = function (m, n) {
                var o = function () {
                        p.removeAllListeners();
                        k[m] = 1;
                        n();
                    },
                    p = new h('img');
                p.on('load', o);
                p.on('error', o);
                p.setAttribute('src', m);
            };
        a.imageCacher = {
            load: function (m, n) {
                var o = m.length,
                    p = function () {
                        if (--o === 0) n();
                    };
                for (var q = 0; q < m.length; q++) {
                    var r = m[q];
                    if (k[r]) p();
                    else l(r, p);
                }
            }
        };
    })();
    a.skins = (function () {
        var k = {},
            l = {},
            m = {},
            n = function (o, p, q, r) {
                var s = k[p];
                if (!o.skin) {
                    o.skin = s;
                    if (s.init) s.init(o);
                }
                var t = function (D) {
                        for (var E = 0; E < D.length; E++) D[E] = a.getUrl(m[p] + D[E]);
                    };

                function u(D, E) {
                    return D.replace(/url\s*\(([\s'"]*)(.*?)([\s"']*)\)/g, function (F, G, H, I) {
                        if (/^\/|^\w?:/.test(H)) return F;
                        else return 'url(' + E + G + H + I + ')';
                    });
                };
                if (!l[p]) {
                    var v = s.preload;
                    if (v && v.length > 0) {
                        t(v);
                        a.imageCacher.load(v, function () {
                            l[p] = 1;
                            n(o, p, q, r);
                        });
                        return;
                    }
                    l[p] = 1;
                }
                q = s[q];
                var w = !q || !! q._isLoaded;
                if (w) r && r();
                else {
                    var x = q._pending || (q._pending = []);
                    x.push(r);
                    if (x.length > 1) return;
                    var y = !q.css || !q.css.length,
                        z = !q.js || !q.js.length,
                        A = function () {
                            if (y && z) {
                                q._isLoaded = 1;
                                for (var D = 0; D < x.length; D++) {
                                    if (x[D]) x[D]();
                                }
                            }
                        };
                    if (!y) {
                        var B = q.css;
                        if (e.isArray(B)) {
                            t(B);
                            for (var C = 0; C < B.length; C++) a.document.appendStyleSheet(B[C]);
                        } else {
                            B = u(B, a.getUrl(m[p]));
                            a.document.appendStyleText(B);
                        }
                        q.css = B;
                        y = 1;
                    }
                    if (!z) {
                        t(q.js);
                        a.scriptLoader.load(q.js, function () {
                            z = 1;
                            A();
                        });
                    }
                    A();
                }
            };
        return {
            add: function (o, p) {
                k[o] = p;
                p.skinPath = m[o] || (m[o] = a.getUrl('skins/' + o + '/'));
            },
            load: function (o, p, q) {
                var r = o.skinName,
                    s = o.skinPath;
                if (k[r]) n(o, r, p, q);
                else {
                    m[r] = s;
                    a.scriptLoader.load(a.getUrl(s + 'skin.js'), function () {
                        n(o, r, p, q);
                    });
                }
            }
        };
    })();
    a.themes = new a.resourceManager('themes/', 'theme');
    a.ui = function (k) {
        if (k.ui) return k.ui;
        this._ = {
            handlers: {},
            items: {},
            editor: k
        };
        return this;
    };
    var k = a.ui;
    k.prototype = {
        add: function (l, m, n) {
            this._.items[l] = {
                type: m,
                command: n.command || null,
                args: Array.prototype.slice.call(arguments, 2)
            };
        },
        create: function (l) {
            var q = this;
            var m = q._.items[l],
                n = m && q._.handlers[m.type],
                o = m && m.command && q._.editor.getCommand(m.command),
                p = n && n.create.apply(q, m.args);
            if (o) o.uiItems.push(p);
            return p;
        },
        addHandler: function (l, m) {
            this._.handlers[l] = m;
        }
    };
    (function () {
        var l = 0,
            m = function () {
                var x = 'editor' + ++l;
                return a.instances && a.instances[x] ? m() : x;
            },
            n = {},
            o = function (x) {
                var y = x.config.customConfig;
                if (!y) return false;
                y = a.getUrl(y);
                var z = n[y] || (n[y] = {});
                if (z.fn) {
                    z.fn.call(x, x.config);
                    if (a.getUrl(x.config.customConfig) == y || !o(x)) x.fireOnce('customConfigLoaded');
                } else a.scriptLoader.load(y, function () {
                    if (a.editorConfig) z.fn = a.editorConfig;
                    else z.fn = function () {};
                    o(x);
                });
                return true;
            },
            p = function (x, y) {
                x.on('customConfigLoaded', function () {
                    if (y) {
                        if (y.on) for (var z in y.on) x.on(z, y.on[z]);
                        e.extend(x.config, y, true);
                        delete x.config.on;
                    }
                    q(x);
                });
                if (y && y.customConfig != undefined) x.config.customConfig = y.customConfig;
                if (!o(x)) x.fireOnce('customConfigLoaded');
            },
            q = function (x) {
                var y = x.config.skin.split(','),
                    z = y[0],
                    A = a.getUrl(y[1] || 'skins/' + z + '/');
                x.skinName = z;
                x.skinPath = A;
                x.skinClass = 'cke_skin_' + z;
                x.tabIndex = x.config.tabIndex || x.element.getAttribute('tabindex') || 0;
                x.fireOnce('configLoaded');
                t(x);
            },
            r = function (x) {
                a.lang.load(x.config.language, x.config.defaultLanguage, function (y, z) {
                    x.langCode = y;
                    x.lang = e.prototypedCopy(z);
                    if (b.gecko && b.version < 10900 && x.lang.dir == 'rtl') x.lang.dir = 'ltr';
                    var A = x.config;
                    A.contentsLangDirection == 'ui' && (A.contentsLangDirection = x.lang.dir);
                    s(x);
                });
            },
            s = function (x) {
                var y = x.config,
                    z = y.plugins,
                    A = y.extraPlugins,
                    B = y.removePlugins;
                if (A) {
                    var C = new RegExp('(?:^|,)(?:' + A.replace(/\s*,\s*/g, '|') + ')(?=,|$)', 'g');
                    z = z.replace(C, '');
                    z += ',' + A;
                }
                if (B) {
                    C = new RegExp('(?:^|,)(?:' + B.replace(/\s*,\s*/g, '|') + ')(?=,|$)', 'g');
                    z = z.replace(C, '');
                }
                j.load(z.split(','), function (D) {
                    var E = [],
                        F = [],
                        G = [];
                    x.plugins = D;
                    for (var H in D) {
                        var I = D[H],
                            J = I.lang,
                            K = j.getPath(H),
                            L = null;
                        I.path = K;
                        if (J) {
                            L = e.indexOf(J, x.langCode) >= 0 ? x.langCode : J[0];
                            if (!I.lang[L]) G.push(a.getUrl(K + 'lang/' + L + '.js'));
                            else {
                                e.extend(x.lang, I.lang[L]);
                                L = null;
                            }
                        }
                        F.push(L);
                        E.push(I);
                    }
                    a.scriptLoader.load(G, function () {
                        var M = ['beforeInit', 'init', 'afterInit'];
                        for (var N = 0; N < M.length; N++) for (var O = 0; O < E.length; O++) {
                            var P = E[O];
                            if (N === 0 && F[O] && P.lang) e.extend(x.lang, P.lang[F[O]]);
                            if (P[M[N]]) P[M[N]](x);
                        }
                        x.fire('pluginsLoaded');
                        u(x);
                    });
                });
            },
            t = function (x) {
                a.skins.load(x, 'editor', function () {
                    r(x);
                });
            },
            u = function (x) {
                var y = x.config.theme;
                a.themes.load(y, function () {
                    var z = x.theme = a.themes.get(y);
                    z.path = a.themes.getPath(y);
                    z.build(x);
                    if (x.config.autoUpdateElement) v(x);
                });
            },
            v = function (x) {
                var y = x.element;
                if (x.elementMode == 1 && y.is('textarea')) {
                    var z = y.$.form && new h(y.$.form);
                    if (z) {
                        function A() {
                            x.updateElement();
                        };
                        z.on('submit', A);
                        if (!z.$.submit.nodeName) z.$.submit = e.override(z.$.submit, function (B) {
                            return function () {
                                x.updateElement();
                                if (B.apply) B.apply(this, arguments);
                                else B();
                            };
                        });
                        x.on('destroy', function () {
                            z.removeListener('submit', A);
                        });
                    }
                }
            };

        function w() {
            var x, y = this._.commands,
                z = this.mode;
            for (var A in y) {
                x = y[A];
                x[x.startDisabled ? 'disable' : x.modes[z] ? 'enable' : 'disable']();
            }
        };
        a.editor.prototype._init = function () {
            var z = this;
            var x = h.get(z._.element),
                y = z._.instanceConfig;
            delete z._.element;
            delete z._.instanceConfig;
            z._.commands = {};
            z._.styles = [];
            z.element = x;
            z.name = x && z.elementMode == 1 && (x.getId() || x.getNameAtt()) || m();
            if (z.name in a.instances) throw '[CKEDITOR.editor] The instance "' + z.name + '" already exists.';
            z.config = e.prototypedCopy(i);
            z.ui = new k(z);
            z.focusManager = new a.focusManager(z);
            a.fire('instanceCreated', null, z);
            z.on('mode', w, null, null, 1);
            p(z, y);
        };
    })();
    e.extend(a.editor.prototype, {
        addCommand: function (l, m) {
            return this._.commands[l] = new a.command(this, m);
        },
        addCss: function (l) {
            this._.styles.push(l);
        },
        destroy: function (l) {
            var r = this;
            if (!l) r.updateElement();
            if (r.mode) r._.modes[r.mode].unload(r.getThemeSpace('contents'));
            r.theme.destroy(r);
            var m, n = 0,
                o, p, q;
            if (r.toolbox) {
                m = r.toolbox.toolbars;
                for (; n < m.length; n++) {
                    p = m[n].items;
                    for (o = 0; o < p.length; o++) {
                        q = p[o];
                        if (q.clickFn) e.removeFunction(q.clickFn);
                        if (q.keyDownFn) e.removeFunction(q.keyDownFn);
                        if (q.index) k.button._.instances[q.index] = null;
                    }
                }
            }
            if (r.contextMenu) e.removeFunction(r.contextMenu._.functionId);
            if (r._.filebrowserFn) e.removeFunction(r._.filebrowserFn);
            r.fire('destroy');
            a.remove(r);
            a.fire('instanceDestroyed', null, r);
        },
        execCommand: function (l, m) {
            var n = this.getCommand(l),
                o = {
                    name: l,
                    commandData: m,
                    command: n
                };
            if (n && n.state != 0) if (this.fire('beforeCommandExec', o) !== true) {
                o.returnValue = n.exec(o.commandData);
                if (!n.async && this.fire('afterCommandExec', o) !== true) return o.returnValue;
            }
            return false;
        },
        getCommand: function (l) {
            return this._.commands[l];
        },
        getData: function () {
            var n = this;
            n.fire('beforeGetData');
            var l = n._.data;
            if (typeof l != 'string') {
                var m = n.element;
                if (m && n.elementMode == 1) l = m.is('textarea') ? m.getValue() : m.getHtml();
                else l = '';
            }
            l = {
                dataValue: l
            };
            n.fire('getData', l);
            return l.dataValue;
        },
        getSnapshot: function () {
            var l = this.fire('getSnapshot');
            if (typeof l != 'string') {
                var m = this.element;
                if (m && this.elementMode == 1) l = m.is('textarea') ? m.getValue() : m.getHtml();
            }
            return l;
        },
        loadSnapshot: function (l) {
            this.fire('loadSnapshot', l);
        },
        setData: function (l, m) {
            if (m) this.on('dataReady', function (o) {
                o.removeListener();
                m.call(o.editor);
            });
            var n = {
                dataValue: l
            };
            this.fire('setData', n);
            this._.data = n.dataValue;
            this.fire('afterSetData', n);
        },
        insertHtml: function (l) {
            this.fire('insertHtml', l);
        },
        insertElement: function (l) {
            this.fire('insertElement', l);
        },
        checkDirty: function () {
            return this.mayBeDirty && this._.previousValue !== this.getSnapshot();
        },
        resetDirty: function () {
            if (this.mayBeDirty) this._.previousValue = this.getSnapshot();
        },
        updateElement: function () {
            var n = this;
            var l = n.element;
            if (l && n.elementMode == 1) {
                var m = n.getData();
                if (n.config.htmlEncodeOutput) m = e.htmlEncode(m);
                if (l.is('textarea')) l.setValue(m);
                else l.setHtml(m);
            }
        }
    });
    a.on('loaded', function () {
        var l = a.editor._pending;
        if (l) {
            delete a.editor._pending;
            for (var m = 0; m < l.length; m++) l[m]._init();
        }
    });
    a.htmlParser = function () {
        this._ = {
            htmlPartsRegex: new RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)-->)|(?:([^\\s>]+)\\s*((?:(?:[^\"'>]+)|(?:\"[^\"]*\")|(?:'[^']*'))*)\\/?>))", 'g')
        };
    };
    (function () {
        var l = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
            m = {
                checked: 1,
                compact: 1,
                declare: 1,
                defer: 1,
                disabled: 1,
                ismap: 1,
                multiple: 1,
                nohref: 1,
                noresize: 1,
                noshade: 1,
                nowrap: 1,
                readonly: 1,
                selected: 1
            };
        a.htmlParser.prototype = {
            onTagOpen: function () {},
            onTagClose: function () {},
            onText: function () {},
            onCDATA: function () {},
            onComment: function () {},
            parse: function (n) {
                var A = this;
                var o, p, q = 0,
                    r;
                while (o = A._.htmlPartsRegex.exec(n)) {
                    var s = o.index;
                    if (s > q) {
                        var t = n.substring(q, s);
                        if (r) r.push(t);
                        else A.onText(t);
                    }
                    q = A._.htmlPartsRegex.lastIndex;
                    if (p = o[1]) {
                        p = p.toLowerCase();
                        if (r && f.$cdata[p]) {
                            A.onCDATA(r.join(''));
                            r = null;
                        }
                        if (!r) {
                            A.onTagClose(p);
                            continue;
                        }
                    }
                    if (r) {
                        r.push(o[0]);
                        continue;
                    }
                    if (p = o[3]) {
                        p = p.toLowerCase();
                        var u = {},
                            v, w = o[4],
                            x = !! (w && w.charAt(w.length - 1) == '/');
                        if (w) while (v = l.exec(w)) {
                            var y = v[1].toLowerCase(),
                                z = v[2] || v[3] || v[4] || '';
                            if (!z && m[y]) u[y] = y;
                            else u[y] = z;
                        }
                        A.onTagOpen(p, u, x);
                        if (!r && f.$cdata[p]) r = [];
                        continue;
                    }
                    if (p = o[2]) A.onComment(p);
                }
                if (n.length > q) A.onText(n.substring(q, n.length));
            }
        };
    })();
    a.htmlParser.comment = function (l) {
        this.value = l;
        this._ = {
            isBlockLike: false
        };
    };
    a.htmlParser.comment.prototype = {
        type: 8,
        writeHtml: function (l, m) {
            var n = this.value;
            if (m) {
                if (!(n = m.onComment(n, this))) return;
                if (typeof n != 'string') {
                    n.parent = this.parent;
                    n.writeHtml(l, m);
                    return;
                }
            }
            l.comment(n);
        }
    };
    (function () {
        var l = /[\t\r\n ]{2,}|[\t\r\n]/g;
        a.htmlParser.text = function (m) {
            this.value = m;
            this._ = {
                isBlockLike: false
            };
        };
        a.htmlParser.text.prototype = {
            type: 3,
            writeHtml: function (m, n) {
                var o = this.value;
                if (n && !(o = n.onText(o, this))) return;
                m.text(o);
            }
        };
    })();
    (function () {
        a.htmlParser.cdata = function (l) {
            this.value = l;
        };
        a.htmlParser.cdata.prototype = {
            type: 3,
            writeHtml: function (l) {
                l.write(this.value);
            }
        };
    })();
    a.htmlParser.fragment = function () {
        this.children = [];
        this.parent = null;
        this._ = {
            isBlockLike: true,
            hasInlineStarted: false
        };
    };
    (function () {
        var l = {
            colgroup: 1,
            dd: 1,
            dt: 1,
            li: 1,
            option: 1,
            p: 1,
            td: 1,
            tfoot: 1,
            th: 1,
            thead: 1,
            tr: 1
        },
            m = e.extend({
                table: 1,
                ul: 1,
                ol: 1,
                dl: 1
            }, f.table, f.ul, f.ol, f.dl),
            n = f.$list,
            o = f.$listItem;
        a.htmlParser.fragment.fromHtml = function (p, q) {
            var r = new a.htmlParser(),
                s = [],
                t = new a.htmlParser.fragment(),
                u = [],
                v = [],
                w = t,
                x = false,
                y;

            function z(E) {
                var F;
                if (u.length > 0) for (var G = 0; G < u.length; G++) {
                    var H = u[G],
                        I = H.name,
                        J = f[I],
                        K = w.name && f[w.name];
                    if ((!K || K[I]) && (!E || !J || J[E] || !f[E])) {
                        if (!F) {
                            A();
                            F = 1;
                        }
                        H = H.clone();
                        H.parent = w;
                        w = H;
                        u.splice(G, 1);
                        G--;
                    }
                }
            };

            function A() {
                while (v.length) w.add(v.shift());
            };

            function B(E, F, G) {
                F = F || w || t;
                if (q && !F.type) {
                    var H, I;
                    if (E.attributes && (I = E.attributes._cke_real_element_type)) H = I;
                    else H = E.name;
                    if (H && !(H in f.$body) && !(H in f.$nonBodyContent)) {
                        var J = w;
                        w = F;
                        r.onTagOpen(q, {});
                        F = w;
                        if (G) w = J;
                    }
                }
                if (E._.isBlockLike && E.name != 'pre') {
                    var K = E.children.length,
                        L = E.children[K - 1],
                        M;
                    if (L && L.type == 3) if (!(M = e.rtrim(L.value))) E.children.length = K - 1;
                    else L.value = M;
                }
                F.add(E);
                if (E.returnPoint) {
                    w = E.returnPoint;
                    delete E.returnPoint;
                }
            };
            r.onTagOpen = function (E, F, G) {
                var H = new a.htmlParser.element(E, F);
                if (H.isUnknown && G) H.isEmpty = true;
                if (f.$removeEmpty[E]) {
                    u.push(H);
                    return;
                } else if (E == 'pre') x = true;
                else if (E == 'br' && x) {
                    w.add(new a.htmlParser.text('\n'));
                    return;
                }
                if (E == 'br') {
                    v.push(H);
                    return;
                }
                var I = w.name,
                    J = I && (f[I] || (w._.isBlockLike ? f.div : f.span));
                if (J && !H.isUnknown && !w.isUnknown && !J[E]) {
                    var K = false,
                        L;
                    if (E in n && I in n) {
                        var M = w.children,
                            N = M[M.length - 1];
                        if (!(N && N.name in o)) B(N = new a.htmlParser.element('li'), w);
                        y = w, L = N;
                    } else if (E == I) B(w, w.parent);
                    else {
                        if (m[I]) {
                            if (!y) y = w;
                        } else {
                            B(w, w.parent, true);
                            if (!l[I]) u.unshift(w);
                        }
                        K = true;
                    }
                    if (L) w = L;
                    else w = w.returnPoint || w.parent;
                    if (K) {
                        r.onTagOpen.apply(this, arguments);
                        return;
                    }
                }
                z(E);
                A();
                H.parent = w;
                H.returnPoint = y;
                y = 0;
                if (H.isEmpty) B(H);
                else w = H;
            };
            r.onTagClose = function (E) {
                for (var F = u.length - 1; F >= 0; F--) {
                    if (E == u[F].name) {
                        u.splice(F, 1);
                        return;
                    }
                }
                var G = [],
                    H = [],
                    I = w;
                while (I.type && I.name != E) {
                    if (!I._.isBlockLike) H.unshift(I);
                    G.push(I);
                    I = I.parent;
                }
                if (I.type) {
                    for (F = 0; F < G.length; F++) {
                        var J = G[F];
                        B(J, J.parent);
                    }
                    w = I;
                    if (w.name == 'pre') x = false;
                    if (I._.isBlockLike) A();
                    B(I, I.parent);
                    if (I == w) w = w.parent;
                    u = u.concat(H);
                }
                if (E == 'body') q = false;
            };
            r.onText = function (E) {
                if (!w._.hasInlineStarted && !x) {
                    E = e.ltrim(E);
                    if (E.length === 0) return;
                }
                A();
                z();
                if (q && (!w.type || w.name == 'body') && e.trim(E)) this.onTagOpen(q, {});
                if (!x) E = E.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, ' ');
                w.add(new a.htmlParser.text(E));
            };
            r.onCDATA = function (E) {
                w.add(new a.htmlParser.cdata(E));
            };
            r.onComment = function (E) {
                w.add(new a.htmlParser.comment(E));
            };
            r.parse(p);
            A();
            while (w.type) {
                var C = w.parent,
                    D = w;
                if (q && (!C.type || C.name == 'body') && !f.$body[D.name]) {
                    w = C;
                    r.onTagOpen(q, {});
                    C = w;
                }
                C.add(D);
                w = C;
            }
            return t;
        };
        a.htmlParser.fragment.prototype = {
            add: function (p) {
                var s = this;
                var q = s.children.length,
                    r = q > 0 && s.children[q - 1] || null;
                if (r) {
                    if (p._.isBlockLike && r.type == 3) {
                        r.value = e.rtrim(r.value);
                        if (r.value.length === 0) {
                            s.children.pop();
                            s.add(p);
                            return;
                        }
                    }
                    r.next = p;
                }
                p.previous = r;
                p.parent = s;
                s.children.push(p);
                s._.hasInlineStarted = p.type == 3 || p.type == 1 && !p._.isBlockLike;
            },
            writeHtml: function (p, q) {
                var r;
                this.filterChildren = function () {
                    var s = new a.htmlParser.basicWriter();
                    this.writeChildrenHtml.call(this, s, q, true);
                    var t = s.getHtml();
                    this.children = new a.htmlParser.fragment.fromHtml(t).children;
                    r = 1;
                };
                !this.name && q && q.onFragment(this);
                this.writeChildrenHtml(p, r ? null : q);
            },
            writeChildrenHtml: function (p, q) {
                for (var r = 0; r < this.children.length; r++) this.children[r].writeHtml(p, q);
            }
        };
    })();
    a.htmlParser.element = function (l, m) {
        var r = this;
        r.name = l;
        r.attributes = m || (m = {});
        r.children = [];
        var n = m._cke_real_element_type || l,
            o = f,
            p = !! (o.$nonBodyContent[n] || o.$block[n] || o.$listItem[n] || o.$tableContent[n] || o.$nonEditable[n] || n == 'br'),
            q = !! o.$empty[l];
        r.isEmpty = q;
        r.isUnknown = !o[l];
        r._ = {
            isBlockLike: p,
            hasInlineStarted: q || !p
        };
    };
    (function () {
        var l = function (m, n) {
                m = m[0];
                n = n[0];
                return m < n ? -1 : m > n ? 1 : 0;
            };
        a.htmlParser.element.prototype = {
            type: 1,
            add: a.htmlParser.fragment.prototype.add,
            clone: function () {
                return new a.htmlParser.element(this.name, this.attributes);
            },
            writeHtml: function (m, n) {
                var o = this.attributes,
                    p = this,
                    q = p.name,
                    r, s, t, u;
                p.filterChildren = function () {
                    if (!u) {
                        var z = new a.htmlParser.basicWriter();
                        a.htmlParser.fragment.prototype.writeChildrenHtml.call(p, z, n);
                        p.children = new a.htmlParser.fragment.fromHtml(z.getHtml()).children;
                        u = 1;
                    }
                };
                if (n) {
                    for (;;) {
                        if (!(q = n.onElementName(q))) return;
                        p.name = q;
                        if (!(p = n.onElement(p))) return;
                        p.parent = this.parent;
                        if (p.name == q) break;
                        if (p.type != 1) {
                            p.writeHtml(m, n);
                            return;
                        }
                        q = p.name;
                        if (!q) {
                            this.writeChildrenHtml.call(p, m, u ? null : n);
                            return;
                        }
                    }
                    o = p.attributes;
                }
                m.openTag(q, o);
                var v = [];
                for (var w = 0; w < 2; w++) for (r in o) {
                    s = r;
                    t = o[r];
                    if (w == 1) v.push([r, t]);
                    else if (n) {
                        for (;;) {
                            if (!(s = n.onAttributeName(r))) {
                                delete o[r];
                                break;
                            } else if (s != r) {
                                delete o[r];
                                r = s;
                                continue;
                            } else break;
                        }
                        if (s) if ((t = n.onAttribute(p, s, t)) === false) delete o[s];
                        else o[s] = t;
                    }
                }
                if (m.sortAttributes) v.sort(l);
                var x = v.length;
                for (w = 0; w < x; w++) {
                    var y = v[w];
                    m.attribute(y[0], y[1]);
                }
                m.openTagClose(q, p.isEmpty);
                if (!p.isEmpty) {
                    this.writeChildrenHtml.call(p, m, u ? null : n);
                    m.closeTag(q);
                }
            },
            writeChildrenHtml: function (m, n) {
                a.htmlParser.fragment.prototype.writeChildrenHtml.apply(this, arguments);
            }
        };
    })();
    (function () {
        a.htmlParser.filter = e.createClass({
            $: function (q) {
                this._ = {
                    elementNames: [],
                    attributeNames: [],
                    elements: {
                        $length: 0
                    },
                    attributes: {
                        $length: 0
                    }
                };
                if (q) this.addRules(q, 10);
            },
            proto: {
                addRules: function (q, r) {
                    var s = this;
                    if (typeof r != 'number') r = 10;
                    m(s._.elementNames, q.elementNames, r);
                    m(s._.attributeNames, q.attributeNames, r);
                    n(s._.elements, q.elements, r);
                    n(s._.attributes, q.attributes, r);
                    s._.text = o(s._.text, q.text, r) || s._.text;
                    s._.comment = o(s._.comment, q.comment, r) || s._.comment;
                    s._.root = o(s._.root, q.root, r) || s._.root;
                },
                onElementName: function (q) {
                    return l(q, this._.elementNames);
                },
                onAttributeName: function (q) {
                    return l(q, this._.attributeNames);
                },
                onText: function (q) {
                    var r = this._.text;
                    return r ? r.filter(q) : q;
                },
                onComment: function (q, r) {
                    var s = this._.comment;
                    return s ? s.filter(q, r) : q;
                },
                onFragment: function (q) {
                    var r = this._.root;
                    return r ? r.filter(q) : q;
                },
                onElement: function (q) {
                    var v = this;
                    var r = [v._.elements['^'], v._.elements[q.name], v._.elements.$],
                        s, t;
                    for (var u = 0; u < 3; u++) {
                        s = r[u];
                        if (s) {
                            t = s.filter(q, v);
                            if (t === false) return null;
                            if (t && t != q) return v.onNode(t);
                            if (q.parent && !q.name) break;
                        }
                    }
                    return q;
                },
                onNode: function (q) {
                    var r = q.type;
                    return r == 1 ? this.onElement(q) : r == 3 ? new a.htmlParser.text(this.onText(q.value)) : r == 8 ? new a.htmlParser.comment(this.onComment(q.value)) : null;
                },
                onAttribute: function (q, r, s) {
                    var t = this._.attributes[r];
                    if (t) {
                        var u = t.filter(s, q, this);
                        if (u === false) return false;
                        if (typeof u != 'undefined') return u;
                    }
                    return s;
                }
            }
        });

        function l(q, r) {
            for (var s = 0; q && s < r.length; s++) {
                var t = r[s];
                q = q.replace(t[0], t[1]);
            }
            return q;
        };

        function m(q, r, s) {
            if (typeof r == 'function') r = [r];
            var t, u, v = q.length,
                w = r && r.length;
            if (w) {
                for (t = 0; t < v && q[t].pri < s; t++) {}
                for (u = w - 1; u >= 0; u--) {
                    var x = r[u];
                    if (x) {
                        x.pri = s;
                        q.splice(t, 0, x);
                    }
                }
            }
        };

        function n(q, r, s) {
            if (r) for (var t in r) {
                var u = q[t];
                q[t] = o(u, r[t], s);
                if (!u) q.$length++;
            }
        };

        function o(q, r, s) {
            if (r) {
                r.pri = s;
                if (q) {
                    if (!q.splice) {
                        if (q.pri > s) q = [r, q];
                        else q = [q, r];
                        q.filter = p;
                    } else m(q, r, s);
                    return q;
                } else {
                    r.filter = r;
                    return r;
                }
            }
        };

        function p(q) {
            var r = q.type || q instanceof a.htmlParser.fragment;
            for (var s = 0; s < this.length; s++) {
                if (r) var t = q.type,
                    u = q.name;
                var v = this[s],
                    w = v.apply(window, arguments);
                if (w === false) return w;
                if (r) {
                    if (w && (w.name != u || w.type != t)) return w;
                } else if (typeof w != 'string') return w;
                w != undefined && (q = w);
            }
            return q;
        };
    })();
    a.htmlParser.basicWriter = e.createClass({
        $: function () {
            this._ = {
                output: []
            };
        },
        proto: {
            openTag: function (l, m) {
                this._.output.push('<', l);
            },
            openTagClose: function (l, m) {
                if (m) this._.output.push(' />');
                else this._.output.push('>');
            },
            attribute: function (l, m) {
                if (typeof m == 'string') m = e.htmlEncodeAttr(m);
                this._.output.push(' ', l, '="', m, '"');
            },
            closeTag: function (l) {
                this._.output.push('</', l, '>');
            },
            text: function (l) {
                this._.output.push(l);
            },
            comment: function (l) {
                this._.output.push('<!--', l, '-->');
            },
            write: function (l) {
                this._.output.push(l);
            },
            reset: function () {
                this._.output = [];
                this._.indent = false;
            },
            getHtml: function (l) {
                var m = this._.output.join('');
                if (l) this.reset();
                return m;
            }
        }
    });
    delete a.loadFullCore;
    a.instances = {};
    a.document = new g(document);
    a.add = function (l) {
        a.instances[l.name] = l;
        l.on('focus', function () {
            if (a.currentInstance != l) {
                a.currentInstance = l;
                a.fire('currentInstance');
            }
        });
        l.on('blur', function () {
            if (a.currentInstance == l) {
                a.currentInstance = null;
                a.fire('currentInstance');
            }
        });
    };
    a.remove = function (l) {
        delete a.instances[l.name];
    };
    a.on('instanceDestroyed', function () {
        if (e.isEmpty(this.instances)) a.fire('reset');
    });
    a.TRISTATE_ON = 1;
    a.TRISTATE_OFF = 2;
    a.TRISTATE_DISABLED = 0;
    d.comment = e.createClass({
        base: d.node,
        $: function (l, m) {
            if (typeof l == 'string') l = (m ? m.$ : document).createComment(l);
            this.base(l);
        },
        proto: {
            type: 8,
            getOuterHtml: function () {
                return '<!--' + this.$.nodeValue + '-->';
            }
        }
    });
    (function () {
        var l = {
            address: 1,
            blockquote: 1,
            dl: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            p: 1,
            pre: 1,
            li: 1,
            dt: 1,
            dd: 1
        },
            m = {
                body: 1,
                div: 1,
                table: 1,
                tbody: 1,
                tr: 1,
                td: 1,
                th: 1,
                caption: 1,
                form: 1
            },
            n = function (o) {
                var p = o.getChildren();
                for (var q = 0, r = p.count(); q < r; q++) {
                    var s = p.getItem(q);
                    if (s.type == 1 && f.$block[s.getName()]) return true;
                }
                return false;
            };
        d.elementPath = function (o) {
            var u = this;
            var p = null,
                q = null,
                r = [],
                s = o;
            while (s) {
                if (s.type == 1) {
                    if (!u.lastElement) u.lastElement = s;
                    var t = s.getName();
                    if (c && s.$.scopeName != 'HTML') t = s.$.scopeName.toLowerCase() + ':' + t;
                    if (!q) {
                        if (!p && l[t]) p = s;
                        if (m[t]) if (!p && t == 'div' && !n(s)) p = s;
                        else q = s;
                    }
                    r.push(s);
                    if (t == 'body') break;
                }
                s = s.getParent();
            }
            u.block = p;
            u.blockLimit = q;
            u.elements = r;
        };
    })();
    d.elementPath.prototype = {
        compare: function (l) {
            var m = this.elements,
                n = l && l.elements;
            if (!n || m.length != n.length) return false;
            for (var o = 0; o < m.length; o++) {
                if (!m[o].equals(n[o])) return false;
            }
            return true;
        },
        contains: function (l) {
            var m = this.elements;
            for (var n = 0; n < m.length; n++) {
                if (m[n].getName() in l) return m[n];
            }
            return null;
        }
    };
    d.text = function (l, m) {
        if (typeof l == 'string') l = (m ? m.$ : document).createTextNode(l);
        this.$ = l;
    };
    d.text.prototype = new d.node();
    e.extend(d.text.prototype, {
        type: 3,
        getLength: function () {
            return this.$.nodeValue.length;
        },
        getText: function () {
            return this.$.nodeValue;
        },
        split: function (l) {
            var q = this;
            if (c && l == q.getLength()) {
                var m = q.getDocument().createText('');
                m.insertAfter(q);
                return m;
            }
            var n = q.getDocument(),
                o = new d.text(q.$.splitText(l), n);
            if (b.ie8) {
                var p = new d.text('', n);
                p.insertAfter(o);
                p.remove();
            }
            return o;
        },
        substring: function (l, m) {
            if (typeof m != 'number') return this.$.nodeValue.substr(l);
            else return this.$.nodeValue.substring(l, m);
        }
    });
    d.documentFragment = function (l) {
        l = l || a.document;
        this.$ = l.$.createDocumentFragment();
    };
    e.extend(d.documentFragment.prototype, h.prototype, {
        type: 11,
        insertAfterNode: function (l) {
            l = l.$;
            l.parentNode.insertBefore(this.$, l.nextSibling);
        }
    }, true, {
        append: 1,
        appendBogus: 1,
        getFirst: 1,
        getLast: 1,
        appendTo: 1,
        moveChildren: 1,
        insertBefore: 1,
        insertAfterNode: 1,
        replace: 1,
        trim: 1,
        type: 1,
        ltrim: 1,
        rtrim: 1,
        getDocument: 1,
        getChildCount: 1,
        getChild: 1,
        getChildren: 1
    });
    (function () {
        function l(t, u) {
            if (this._.end) return null;
            var v, w = this.range,
                x, y = this.guard,
                z = this.type,
                A = t ? 'getPreviousSourceNode' : 'getNextSourceNode';
            if (!this._.start) {
                this._.start = 1;
                w.trim();
                if (w.collapsed) {
                    this.end();
                    return null;
                }
            }
            if (!t && !this._.guardLTR) {
                var B = w.endContainer,
                    C = B.getChild(w.endOffset);
                this._.guardLTR = function (G, H) {
                    return (!H || !B.equals(G)) && (!C || !G.equals(C)) && (G.type != 1 || !H || G.getName() != 'body');
                };
            }
            if (t && !this._.guardRTL) {
                var D = w.startContainer,
                    E = w.startOffset > 0 && D.getChild(w.startOffset - 1);
                this._.guardRTL = function (G, H) {
                    return (!H || !D.equals(G)) && (!E || !G.equals(E)) && (G.type != 1 || !H || G.getName() != 'body');
                };
            }
            var F = t ? this._.guardRTL : this._.guardLTR;
            if (y) x = function (G, H) {
                if (F(G, H) === false) return false;
                return y(G, H);
            };
            else x = F;
            if (this.current) v = this.current[A](false, z, x);
            else if (t) {
                v = w.endContainer;
                if (w.endOffset > 0) {
                    v = v.getChild(w.endOffset - 1);
                    if (x(v) === false) v = null;
                } else v = x(v, true) === false ? null : v.getPreviousSourceNode(true, z, x);
            } else {
                v = w.startContainer;
                v = v.getChild(w.startOffset);
                if (v) {
                    if (x(v) === false) v = null;
                } else v = x(w.startContainer, true) === false ? null : w.startContainer.getNextSourceNode(true, z, x);
            }
            while (v && !this._.end) {
                this.current = v;
                if (!this.evaluator || this.evaluator(v) !== false) {
                    if (!u) return v;
                } else if (u && this.evaluator) return false;
                v = v[A](false, z, x);
            }
            this.end();
            return this.current = null;
        };

        function m(t) {
            var u, v = null;
            while (u = l.call(this, t)) v = u;
            return v;
        };
        d.walker = e.createClass({
            $: function (t) {
                this.range = t;
                this._ = {};
            },
            proto: {
                end: function () {
                    this._.end = 1;
                },
                next: function () {
                    return l.call(this);
                },
                previous: function () {
                    return l.call(this, true);
                },
                checkForward: function () {
                    return l.call(this, false, true) !== false;
                },
                checkBackward: function () {
                    return l.call(this, true, true) !== false;
                },
                lastForward: function () {
                    return m.call(this);
                },
                lastBackward: function () {
                    return m.call(this, true);
                },
                reset: function () {
                    delete this.current;
                    this._ = {};
                }
            }
        });
        var n = {
            block: 1,
            'list-item': 1,
            table: 1,
            'table-row-group': 1,
            'table-header-group': 1,
            'table-footer-group': 1,
            'table-row': 1,
            'table-column-group': 1,
            'table-column': 1,
            'table-cell': 1,
            'table-caption': 1
        },
            o = {
                hr: 1
            };
        h.prototype.isBlockBoundary = function (t) {
            var u = e.extend({}, o, t || {});
            return n[this.getComputedStyle('display')] || u[this.getName()];
        };
        d.walker.blockBoundary = function (t) {
            return function (u, v) {
                return !(u.type == 1 && u.isBlockBoundary(t));
            };
        };
        d.walker.listItemBoundary = function () {
            return this.blockBoundary({
                br: 1
            });
        };
        d.walker.bookmarkContents = function (t) {}, d.walker.bookmark = function (t, u) {
            function v(w) {
                return w && w.getName && w.getName() == 'span' && w.hasAttribute('_fck_bookmark');
            };
            return function (w) {
                var x, y;
                x = w && !w.getName && (y = w.getParent()) && v(y);
                x = t ? x : x || v(w);
                return u ^ x;
            };
        };
        d.walker.whitespaces = function (t) {
            return function (u) {
                var v = u && u.type == 3 && !e.trim(u.getText());
                return t ^ v;
            };
        };
        d.walker.invisible = function (t) {
            var u = d.walker.whitespaces();
            return function (v) {
                var w = u(v) || v.is && !v.$.offsetHeight;
                return t ^ w;
            };
        };
        var p = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
            q = d.walker.whitespaces(true),
            r = d.walker.bookmark(false, true),
            s = function (t) {
                return r(t) && q(t);
            };
        h.prototype.getBogus = function () {
            var t = this.getLast(s);
            if (t && (!c ? t.is && t.is('br') : t.getText && p.test(t.getText()))) return t;
            return false;
        };
    })();
    d.range = function (l) {
        var m = this;
        m.startContainer = null;
        m.startOffset = null;
        m.endContainer = null;
        m.endOffset = null;
        m.collapsed = true;
        m.document = l;
    };
    (function () {
        var l = function (t) {
                t.collapsed = t.startContainer && t.endContainer && t.startContainer.equals(t.endContainer) && t.startOffset == t.endOffset;
            },
            m = function (t, u, v) {
                t.optimizeBookmark();
                var w = t.startContainer,
                    x = t.endContainer,
                    y = t.startOffset,
                    z = t.endOffset,
                    A, B;
                if (x.type == 3) x = x.split(z);
                else if (x.getChildCount() > 0) if (z >= x.getChildCount()) {
                    x = x.append(t.document.createText(''));
                    B = true;
                } else x = x.getChild(z);
                if (w.type == 3) {
                    w.split(y);
                    if (w.equals(x)) x = w.getNext();
                } else if (!y) {
                    w = w.getFirst().insertBeforeMe(t.document.createText(''));
                    A = true;
                } else if (y >= w.getChildCount()) {
                    w = w.append(t.document.createText(''));
                    A = true;
                } else w = w.getChild(y).getPrevious();
                var C = w.getParents(),
                    D = x.getParents(),
                    E, F, G;
                for (E = 0; E < C.length; E++) {
                    F = C[E];
                    G = D[E];
                    if (!F.equals(G)) break;
                }
                var H = v,
                    I, J, K, L;
                for (var M = E; M < C.length; M++) {
                    I = C[M];
                    if (H && !I.equals(w)) J = H.append(I.clone());
                    K = I.getNext();
                    while (K) {
                        if (K.equals(D[M]) || K.equals(x)) break;
                        L = K.getNext();
                        if (u == 2) H.append(K.clone(true));
                        else {
                            K.remove();
                            if (u == 1) H.append(K);
                        }
                        K = L;
                    }
                    if (H) H = J;
                }
                H = v;
                for (var N = E; N < D.length; N++) {
                    I = D[N];
                    if (u > 0 && !I.equals(x)) J = H.append(I.clone());
                    if (!C[N] || I.$.parentNode != C[N].$.parentNode) {
                        K = I.getPrevious();
                        while (K) {
                            if (K.equals(C[N]) || K.equals(w)) break;
                            L = K.getPrevious();
                            if (u == 2) H.$.insertBefore(K.$.cloneNode(true), H.$.firstChild);
                            else {
                                K.remove();
                                if (u == 1) H.$.insertBefore(K.$, H.$.firstChild);
                            }
                            K = L;
                        }
                    }
                    if (H) H = J;
                }
                if (u == 2) {
                    var O = t.startContainer;
                    if (O.type == 3) {
                        O.$.data += O.$.nextSibling.data;
                        O.$.parentNode.removeChild(O.$.nextSibling);
                    }
                    var P = t.endContainer;
                    if (P.type == 3 && P.$.nextSibling) {
                        P.$.data += P.$.nextSibling.data;
                        P.$.parentNode.removeChild(P.$.nextSibling);
                    }
                } else {
                    if (F && G && (w.$.parentNode != F.$.parentNode || x.$.parentNode != G.$.parentNode)) {
                        var Q = G.getIndex();
                        if (A && G.$.parentNode == w.$.parentNode) Q--;
                        t.setStart(G.getParent(), Q);
                    }
                    t.collapse(true);
                }
                if (A) w.remove();
                if (B && x.$.parentNode) x.remove();
            },
            n = {
                abbr: 1,
                acronym: 1,
                b: 1,
                bdo: 1,
                big: 1,
                cite: 1,
                code: 1,
                del: 1,
                dfn: 1,
                em: 1,
                font: 1,
                i: 1,
                ins: 1,
                label: 1,
                kbd: 1,
                q: 1,
                samp: 1,
                small: 1,
                span: 1,
                strike: 1,
                strong: 1,
                sub: 1,
                sup: 1,
                tt: 1,
                u: 1,
                'var': 1
            };

        function o(t) {
            var u = false,
                v = d.walker.bookmark(true);
            return function (w) {
                if (v(w)) return true;
                if (w.type == 3) {
                    if (e.trim(w.getText()).length) return false;
                } else if (w.type == 1) if (!n[w.getName()]) if (!t && !c && w.getName() == 'br' && !u) u = true;
                else return false;
                return true;
            };
        };

        function p(t) {
            return t.type != 3 && t.getName() in f.$removeEmpty || !e.trim(t.getText()) || t.getParent().hasAttribute('_fck_bookmark');
        };
        var q = new d.walker.whitespaces(),
            r = new d.walker.bookmark();

        function s(t) {
            return !q(t) && !r(t);
        };
        d.range.prototype = {
            clone: function () {
                var u = this;
                var t = new d.range(u.document);
                t.startContainer = u.startContainer;
                t.startOffset = u.startOffset;
                t.endContainer = u.endContainer;
                t.endOffset = u.endOffset;
                t.collapsed = u.collapsed;
                return t;
            },
            collapse: function (t) {
                var u = this;
                if (t) {
                    u.endContainer = u.startContainer;
                    u.endOffset = u.startOffset;
                } else {
                    u.startContainer = u.endContainer;
                    u.startOffset = u.endOffset;
                }
                u.collapsed = true;
            },
            cloneContents: function () {
                var t = new d.documentFragment(this.document);
                if (!this.collapsed) m(this, 2, t);
                return t;
            },
            deleteContents: function () {
                if (this.collapsed) return;
                m(this, 0);
            },
            extractContents: function () {
                var t = new d.documentFragment(this.document);
                if (!this.collapsed) m(this, 1, t);
                return t;
            },
            createBookmark: function (t) {
                var y = this;
                var u, v, w, x;
                u = y.document.createElement('span');
                u.setAttribute('_fck_bookmark', 1);
                u.setStyle('display', 'none');
                u.setHtml('&nbsp;');
                if (t) {
                    w = 'cke_bm_' + e.getNextNumber();
                    u.setAttribute('id', w + 'S');
                }
                if (!y.collapsed) {
                    v = u.clone();
                    v.setHtml('&nbsp;');
                    if (t) v.setAttribute('id', w + 'E');
                    x = y.clone();
                    x.collapse();
                    x.insertNode(v);
                }
                x = y.clone();
                x.collapse(true);
                x.insertNode(u);
                if (v) {
                    y.setStartAfter(u);
                    y.setEndBefore(v);
                } else y.moveToPosition(u, 4);
                return {
                    startNode: t ? w + 'S' : u,
                    endNode: t ? w + 'E' : v,
                    serializable: t
                };
            },
            createBookmark2: function (t) {
                var A = this;
                var u = A.startContainer,
                    v = A.endContainer,
                    w = A.startOffset,
                    x = A.endOffset,
                    y, z;
                if (!u || !v) return {
                    start: 0,
                    end: 0
                };
                if (t) {
                    if (u.type == 1) {
                        y = u.getChild(w);
                        if (y && y.type == 3 && w > 0 && y.getPrevious().type == 3) {
                            u = y;
                            w = 0;
                        }
                    }
                    while (u.type == 3 && (z = u.getPrevious()) && z.type == 3) {
                        u = z;
                        w += z.getLength();
                    }
                    if (!A.isCollapsed) {
                        if (v.type == 1) {
                            y = v.getChild(x);
                            if (y && y.type == 3 && x > 0 && y.getPrevious().type == 3) {
                                v = y;
                                x = 0;
                            }
                        }
                        while (v.type == 3 && (z = v.getPrevious()) && z.type == 3) {
                            v = z;
                            x += z.getLength();
                        }
                    }
                }
                return {
                    start: u.getAddress(t),
                    end: A.isCollapsed ? null : v.getAddress(t),
                    startOffset: w,
                    endOffset: x,
                    normalized: t,
                    is2: true
                };
            },
            moveToBookmark: function (t) {
                var B = this;
                if (t.is2) {
                    var u = B.document.getByAddress(t.start, t.normalized),
                        v = t.startOffset,
                        w = t.end && B.document.getByAddress(t.end, t.normalized),
                        x = t.endOffset;
                    B.setStart(u, v);
                    if (w) B.setEnd(w, x);
                    else B.collapse(true);
                } else {
                    var y = t.serializable,
                        z = y ? B.document.getById(t.startNode) : t.startNode,
                        A = y ? B.document.getById(t.endNode) : t.endNode;
                    B.setStartBefore(z);
                    z.remove();
                    if (A) {
                        B.setEndBefore(A);
                        A.remove();
                    } else B.collapse(true);
                }
            },
            getBoundaryNodes: function () {
                var y = this;
                var t = y.startContainer,
                    u = y.endContainer,
                    v = y.startOffset,
                    w = y.endOffset,
                    x;
                if (t.type == 1) {
                    x = t.getChildCount();
                    if (x > v) t = t.getChild(v);
                    else if (x < 1) t = t.getPreviousSourceNode();
                    else {
                        t = t.$;
                        while (t.lastChild) t = t.lastChild;
                        t = new d.node(t);
                        t = t.getNextSourceNode() || t;
                    }
                }
                if (u.type == 1) {
                    x = u.getChildCount();
                    if (x > w) u = u.getChild(w).getPreviousSourceNode(true);
                    else if (x < 1) u = u.getPreviousSourceNode();
                    else {
                        u = u.$;
                        while (u.lastChild) u = u.lastChild;
                        u = new d.node(u);
                    }
                }
                if (t.getPosition(u) & 2) t = u;
                return {
                    startNode: t,
                    endNode: u
                };
            },
            getCommonAncestor: function (t, u) {
                var y = this;
                var v = y.startContainer,
                    w = y.endContainer,
                    x;
                if (v.equals(w)) {
                    if (t && v.type == 1 && y.startOffset == y.endOffset - 1) x = v.getChild(y.startOffset);
                    else x = v;
                } else x = v.getCommonAncestor(w);
                return u && !x.is ? x.getParent() : x;
            },
            optimize: function () {
                var v = this;
                var t = v.startContainer,
                    u = v.startOffset;
                if (t.type != 1) if (!u) v.setStartBefore(t);
                else if (u >= t.getLength()) v.setStartAfter(t);
                t = v.endContainer;
                u = v.endOffset;
                if (t.type != 1) if (!u) v.setEndBefore(t);
                else if (u >= t.getLength()) v.setEndAfter(t);
            },
            optimizeBookmark: function () {
                var v = this;
                var t = v.startContainer,
                    u = v.endContainer;
                if (t.is && t.is('span') && t.hasAttribute('_fck_bookmark')) v.setStartAt(t, 3);
                if (u && u.is && u.is('span') && u.hasAttribute('_fck_bookmark')) v.setEndAt(u, 4);
            },
            trim: function (t, u) {
                var B = this;
                var v = B.startContainer,
                    w = B.startOffset,
                    x = B.collapsed;
                if ((!t || x) && v && v.type == 3) {
                    if (!w) {
                        w = v.getIndex();
                        v = v.getParent();
                    } else if (w >= v.getLength()) {
                        w = v.getIndex() + 1;
                        v = v.getParent();
                    } else {
                        var y = v.split(w);
                        w = v.getIndex() + 1;
                        v = v.getParent();
                        if (B.startContainer.equals(B.endContainer)) B.setEnd(y, B.endOffset - B.startOffset);
                        else if (v.equals(B.endContainer)) B.endOffset += 1;
                    }
                    B.setStart(v, w);
                    if (x) {
                        B.collapse(true);
                        return;
                    }
                }
                var z = B.endContainer,
                    A = B.endOffset;
                if (!(u || x) && z && z.type == 3) {
                    if (!A) {
                        A = z.getIndex();
                        z = z.getParent();
                    } else if (A >= z.getLength()) {
                        A = z.getIndex() + 1;
                        z = z.getParent();
                    } else {
                        z.split(A);
                        A = z.getIndex() + 1;
                        z = z.getParent();
                    }
                    B.setEnd(z, A);
                }
            },
            enlarge: function (t) {
                switch (t) {
                case 1:
                    if (this.collapsed) return;
                    var u = this.getCommonAncestor(),
                        v = this.document.getBody(),
                        w, x, y, z, A, B = false,
                        C, D, E = this.startContainer,
                        F = this.startOffset;
                    if (E.type == 3) {
                        if (F) {
                            E = !e.trim(E.substring(0, F)).length && E;
                            B = !! E;
                        }
                        if (E) if (!(z = E.getPrevious())) y = E.getParent();
                    } else {
                        if (F) z = E.getChild(F - 1) || E.getLast();
                        if (!z) y = E;
                    }
                    while (y || z) {
                        if (y && !z) {
                            if (!A && y.equals(u)) A = true;
                            if (!v.contains(y)) break;
                            if (!B || y.getComputedStyle('display') != 'inline') {
                                B = false;
                                if (A) w = y;
                                else this.setStartBefore(y);
                            }
                            z = y.getPrevious();
                        }
                        while (z) {
                            C = false;
                            if (z.type == 3) {
                                D = z.getText();
                                if (/[^\s\ufeff]/.test(D)) z = null;
                                C = /[\s\ufeff]$/.test(D);
                            } else if (z.$.offsetWidth > 0 && !z.getAttribute('_fck_bookmark')) if (B && f.$removeEmpty[z.getName()]) {
                                D = z.getText();
                                if (/[^\s\ufeff]/.test(D)) z = null;
                                else {
                                    var G = z.$.all || z.$.getElementsByTagName('*');
                                    for (var H = 0, I; I = G[H++];) {
                                        if (!f.$removeEmpty[I.nodeName.toLowerCase()]) {
                                            z = null;
                                            break;
                                        }
                                    }
                                }
                                if (z) C = !! D.length;
                            } else z = null;
                            if (C) if (B) {
                                if (A) w = y;
                                else if (y) this.setStartBefore(y);
                            } else B = true;
                            if (z) {
                                var J = z.getPrevious();
                                if (!y && !J) {
                                    y = z;
                                    z = null;
                                    break;
                                }
                                z = J;
                            } else y = null;
                        }
                        if (y) y = y.getParent();
                    }
                    E = this.endContainer;
                    F = this.endOffset;
                    y = z = null;
                    A = B = false;
                    if (E.type == 3) {
                        E = !e.trim(E.substring(F)).length && E;
                        B = !(E && E.getLength());
                        if (E) if (!(z = E.getNext())) y = E.getParent();
                    } else {
                        z = E.getChild(F);
                        if (!z) y = E;
                    }
                    while (y || z) {
                        if (y && !z) {
                            if (!A && y.equals(u)) A = true;
                            if (!v.contains(y)) break;
                            if (!B || y.getComputedStyle('display') != 'inline') {
                                B = false;
                                if (A) x = y;
                                else if (y) this.setEndAfter(y);
                            }
                            z = y.getNext();
                        }
                        while (z) {
                            C = false;
                            if (z.type == 3) {
                                D = z.getText();
                                if (/[^\s\ufeff]/.test(D)) z = null;
                                C = /^[\s\ufeff]/.test(D);
                            } else if (z.$.offsetWidth > 0 && !z.getAttribute('_fck_bookmark')) if (B && f.$removeEmpty[z.getName()]) {
                                D = z.getText();
                                if (/[^\s\ufeff]/.test(D)) z = null;
                                else {
                                    G = z.$.all || z.$.getElementsByTagName('*');
                                    for (H = 0; I = G[H++];) {
                                        if (!f.$removeEmpty[I.nodeName.toLowerCase()]) {
                                            z = null;
                                            break;
                                        }
                                    }
                                }
                                if (z) C = !! D.length;
                            } else z = null;
                            if (C) if (B) if (A) x = y;
                            else this.setEndAfter(y);
                            if (z) {
                                J = z.getNext();
                                if (!y && !J) {
                                    y = z;
                                    z = null;
                                    break;
                                }
                                z = J;
                            } else y = null;
                        }
                        if (y) y = y.getParent();
                    }
                    if (w && x) {
                        u = w.contains(x) ? x : w;
                        this.setStartBefore(u);
                        this.setEndAfter(u);
                    }
                    break;
                case 2:
                case 3:
                    var K = new d.range(this.document);
                    v = this.document.getBody();
                    K.setStartAt(v, 1);
                    K.setEnd(this.startContainer, this.startOffset);
                    var L = new d.walker(K),
                        M, N, O = d.walker.blockBoundary(t == 3 ? {
                            br: 1
                        } : null),
                        P = function (R) {
                            var S = O(R);
                            if (!S) M = R;
                            return S;
                        },
                        Q = function (R) {
                            var S = P(R);
                            if (!S && R.is && R.is('br')) N = R;
                            return S;
                        };
                    L.guard = P;
                    y = L.lastBackward();
                    M = M || v;
                    this.setStartAt(M, !M.is('br') && (!y && this.checkStartOfBlock() || y && M.contains(y)) ? 1 : 4);
                    K = this.clone();
                    K.collapse();
                    K.setEndAt(v, 2);
                    L = new d.walker(K);
                    L.guard = t == 3 ? Q : P;
                    M = null;
                    y = L.lastForward();
                    M = M || v;
                    this.setEndAt(M, !y && this.checkEndOfBlock() || y && M.contains(y) ? 2 : 3);
                    if (N) this.setEndAfter(N);
                }
            },
            shrink: function (t, u) {
                if (!this.collapsed) {
                    t = t || 2;
                    var v = this.clone(),
                        w = this.startContainer,
                        x = this.endContainer,
                        y = this.startOffset,
                        z = this.endOffset,
                        A = this.collapsed,
                        B = 1,
                        C = 1;
                    if (w && w.type == 3) if (!y) v.setStartBefore(w);
                    else if (y >= w.getLength()) v.setStartAfter(w);
                    else {
                        v.setStartBefore(w);
                        B = 0;
                    }
                    if (x && x.type == 3) if (!z) v.setEndBefore(x);
                    else if (z >= x.getLength()) v.setEndAfter(x);
                    else {
                        v.setEndAfter(x);
                        C = 0;
                    }
                    var D = new d.walker(v);
                    D.evaluator = function (H) {
                        return H.type == (t == 1 ? 1 : 3);
                    };
                    var E;
                    D.guard = function (H, I) {
                        if (t == 1 && H.type == 3) return false;
                        if (I && H.equals(E)) return false;
                        if (!I && H.type == 1) E = H;
                        return true;
                    };
                    if (B) {
                        var F = D[t == 1 ? 'lastForward' : 'next']();
                        F && this.setStartAt(F, u ? 1 : 3);
                    }
                    if (C) {
                        D.reset();
                        var G = D[t == 1 ? 'lastBackward' : 'previous']();
                        G && this.setEndAt(G, u ? 2 : 4);
                    }
                    return !!(B || C);
                }
            },
            insertNode: function (t) {
                var x = this;
                x.optimizeBookmark();
                x.trim(false, true);
                var u = x.startContainer,
                    v = x.startOffset,
                    w = u.getChild(v);
                if (w) t.insertBefore(w);
                else u.append(t);
                if (t.getParent().equals(x.endContainer)) x.endOffset++;
                x.setStartBefore(t);
            },
            moveToPosition: function (t, u) {
                this.setStartAt(t, u);
                this.collapse(true);
            },
            selectNodeContents: function (t) {
                this.setStart(t, 0);
                this.setEnd(t, t.type == 3 ? t.getLength() : t.getChildCount());
            },
            setStart: function (t, u) {
                var v = this;
                if (t.type == 1 && f.$empty[t.getName()]) t = t.getParent(), u = t.getIndex();
                v.startContainer = t;
                v.startOffset = u;
                if (!v.endContainer) {
                    v.endContainer = t;
                    v.endOffset = u;
                }
                l(v);
            },
            setEnd: function (t, u) {
                var v = this;
                if (t.type == 1 && f.$empty[t.getName()]) t = t.getParent(), u = t.getIndex() + 1;
                v.endContainer = t;
                v.endOffset = u;
                if (!v.startContainer) {
                    v.startContainer = t;
                    v.startOffset = u;
                }
                l(v);
            },
            setStartAfter: function (t) {
                this.setStart(t.getParent(), t.getIndex() + 1);
            },
            setStartBefore: function (t) {
                this.setStart(t.getParent(), t.getIndex());
            },
            setEndAfter: function (t) {
                this.setEnd(t.getParent(), t.getIndex() + 1);
            },
            setEndBefore: function (t) {
                this.setEnd(t.getParent(), t.getIndex());
            },
            setStartAt: function (t, u) {
                var v = this;
                switch (u) {
                case 1:
                    v.setStart(t, 0);
                    break;
                case 2:
                    if (t.type == 3) v.setStart(t, t.getLength());
                    else v.setStart(t, t.getChildCount());
                    break;
                case 3:
                    v.setStartBefore(t);
                    break;
                case 4:
                    v.setStartAfter(t);
                }
                l(v);
            },
            setEndAt: function (t, u) {
                var v = this;
                switch (u) {
                case 1:
                    v.setEnd(t, 0);
                    break;
                case 2:
                    if (t.type == 3) v.setEnd(t, t.getLength());
                    else v.setEnd(t, t.getChildCount());
                    break;
                case 3:
                    v.setEndBefore(t);
                    break;
                case 4:
                    v.setEndAfter(t);
                }
                l(v);
            },
            fixBlock: function (t, u) {
                var x = this;
                var v = x.createBookmark(),
                    w = x.document.createElement(u);
                x.collapse(t);
                x.enlarge(2);
                x.extractContents().appendTo(w);
                w.trim();
                if (!c) w.appendBogus();
                x.insertNode(w);
                x.moveToBookmark(v);
                return w;
            },
            splitBlock: function (t) {
                var D = this;
                var u = new d.elementPath(D.startContainer),
                    v = new d.elementPath(D.endContainer),
                    w = u.blockLimit,
                    x = v.blockLimit,
                    y = u.block,
                    z = v.block,
                    A = null;
                if (!w.equals(x)) return null;
                if (t != 'br') {
                    if (!y) {
                        y = D.fixBlock(true, t);
                        z = new d.elementPath(D.endContainer).block;
                    }
                    if (!z) z = D.fixBlock(false, t);
                }
                var B = y && D.checkStartOfBlock(),
                    C = z && D.checkEndOfBlock();
                D.deleteContents();
                if (y && y.equals(z)) if (C) {
                    A = new d.elementPath(D.startContainer);
                    D.moveToPosition(z, 4);
                    z = null;
                } else if (B) {
                    A = new d.elementPath(D.startContainer);
                    D.moveToPosition(y, 3);
                    y = null;
                } else {
                    z = D.splitElement(y);
                    if (!c && !y.is('ul', 'ol')) y.appendBogus();
                }
                return {
                    previousBlock: y,
                    nextBlock: z,
                    wasStartOfBlock: B,
                    wasEndOfBlock: C,
                    elementPath: A
                };
            },
            splitElement: function (t) {
                var w = this;
                if (!w.collapsed) return null;
                w.setEndAt(t, 2);
                var u = w.extractContents(),
                    v = t.clone(false);
                u.appendTo(v);
                v.insertAfter(t);
                w.moveToPosition(t, 4);
                return v;
            },
            checkBoundaryOfElement: function (t, u) {
                var v = this.clone();
                v[u == 1 ? 'setStartAt' : 'setEndAt'](t, u == 1 ? 1 : 2);
                var w = new d.walker(v),
                    x = false;
                w.evaluator = p;
                return w[u == 1 ? 'checkBackward' : 'checkForward']();
            },
            checkStartOfBlock: function () {
                var z = this;
                var t = z.startContainer,
                    u = z.startOffset;
                if (u && t.type == 3) {
                    var v = e.ltrim(t.substring(0, u));
                    if (v.length) return false;
                }
                z.trim();
                var w = new d.elementPath(z.startContainer),
                    x = z.clone();
                x.collapse(true);
                x.setStartAt(w.block || w.blockLimit, 1);
                var y = new d.walker(x);
                y.evaluator = o(true);
                return y.checkBackward();
            },
            checkEndOfBlock: function () {
                var z = this;
                var t = z.endContainer,
                    u = z.endOffset;
                if (t.type == 3) {
                    var v = e.rtrim(t.substring(u));
                    if (v.length) return false;
                }
                z.trim();
                var w = new d.elementPath(z.endContainer),
                    x = z.clone();
                x.collapse(false);
                x.setEndAt(w.block || w.blockLimit, 2);
                var y = new d.walker(x);
                y.evaluator = o(false);
                return y.checkForward();
            },
            moveToElementEditablePosition: function (t, u) {
                var v;
                if (f.$empty[t.getName()]) return false;
                while (t && t.type == 1) {
                    v = t.isEditable();
                    if (v) this.moveToPosition(t, u ? 2 : 1);
                    else if (f.$inline[t.getName()]) {
                        this.moveToPosition(t, u ? 4 : 3);
                        return true;
                    }
                    if (f.$empty[t.getName()]) t = t[u ? 'getPrevious' : 'getNext'](s);
                    else t = t[u ? 'getLast' : 'getFirst'](s);
                    if (t && t.type == 3) {
                        this.moveToPosition(t, u ? 4 : 3);
                        return true;
                    }
                }
                return v;
            },
            moveToElementEditStart: function (t) {
                return this.moveToElementEditablePosition(t);
            },
            moveToElementEditEnd: function (t) {
                return this.moveToElementEditablePosition(t, true);
            },
            getEnclosedNode: function () {
                var t = this.clone();
                t.optimize();
                if (t.startContainer.type != 1 || t.endContainer.type != 1) return null;
                var u = new d.walker(t),
                    v = d.walker.bookmark(true),
                    w = d.walker.whitespaces(true),
                    x = function (z) {
                        return w(z) && v(z);
                    };
                t.evaluator = x;
                var y = u.next();
                u.reset();
                return y && y.equals(u.previous()) ? y : null;
            },
            getTouchedStartNode: function () {
                var t = this.startContainer;
                if (this.collapsed || t.type != 1) return t;
                return t.getChild(this.startOffset) || t;
            },
            getTouchedEndNode: function () {
                var t = this.endContainer;
                if (this.collapsed || t.type != 1) return t;
                return t.getChild(this.endOffset - 1) || t;
            }
        };
    })();
    a.POSITION_AFTER_START = 1;
    a.POSITION_BEFORE_END = 2;
    a.POSITION_BEFORE_START = 3;
    a.POSITION_AFTER_END = 4;
    a.ENLARGE_ELEMENT = 1;
    a.ENLARGE_BLOCK_CONTENTS = 2;
    a.ENLARGE_LIST_ITEM_CONTENTS = 3;
    a.START = 1;
    a.END = 2;
    a.STARTEND = 3;
    a.SHRINK_ELEMENT = 1;
    a.SHRINK_TEXT = 2;
    (function () {
        if (b.webkit) {
            b.hc = false;
            return;
        }
        var l = c && b.version < 7,
            m = c && b.version == 7,
            n = l ? a.basePath + 'images/spacer.gif' : m ? 'about:blank' : 'data:image/png;base64,',
            o = h.createFromHtml('<div style="width:0px;height:0px;position:absolute;left:-10000px;background-image:url(' + n + ')"></div>', a.document);
        o.appendTo(a.document.getHead());
        try {
            b.hc = o.getComputedStyle('background-image') == 'none';
        } catch (p) {
            b.hc = false;
        }
        if (b.hc) b.cssClass += ' cke_hc';
        o.remove();
    })();
    j.load(i.corePlugins.split(','), function () {
        a.status = 'loaded';
        a.fire('loaded');
        var l = a._.pending;
        if (l) {
            delete a._.pending;
            for (var m = 0; m < l.length; m++) a.add(l[m]);
        }
    });
    a.skins.add('kama', (function () {
        var l = [],
            m = 'cke_ui_color';
        if (c && b.version < 7) l.push('icons.png', 'images/sprites_ie6.png', 'images/dialog_sides.gif');
        return {
            preload: l,
            editor: {
                css: ['editor.css']
            },
            dialog: {
                css: ['dialog.css']
            },
            templates: {
                css: ['templates.css']
            },
            margins: [0, 0, 0, 0],
            init: function (n) {
                if (n.config.width && !isNaN(n.config.width)) n.config.width -= 12;
                var o = [],
                    p = /\$color/g,
                    q = '/* UI Color Support */.cke_skin_kama .cke_menuitem .cke_icon_wrapper{\tbackground-color: $color !important;\tborder-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a:focus .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a:active .cke_icon_wrapper{\tbackground-color: $color !important;\tborder-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover .cke_label,.cke_skin_kama .cke_menuitem a:focus .cke_label,.cke_skin_kama .cke_menuitem a:active .cke_label{\tbackground-color: $color !important;}.cke_skin_kama .cke_menuitem a.cke_disabled:hover .cke_label,.cke_skin_kama .cke_menuitem a.cke_disabled:focus .cke_label,.cke_skin_kama .cke_menuitem a.cke_disabled:active .cke_label{\tbackground-color: transparent !important;}.cke_skin_kama .cke_menuitem a.cke_disabled:hover .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a.cke_disabled:focus .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a.cke_disabled:active .cke_icon_wrapper{\tbackground-color: $color !important;\tborder-color: $color !important;}.cke_skin_kama .cke_menuitem a.cke_disabled .cke_icon_wrapper{\tbackground-color: $color !important;\tborder-color: $color !important;}.cke_skin_kama .cke_menuseparator{\tbackground-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover,.cke_skin_kama .cke_menuitem a:focus,.cke_skin_kama .cke_menuitem a:active{\tbackground-color: $color !important;}';
                if (b.webkit) {
                    q = q.split('}').slice(0, -1);
                    for (var r = 0; r < q.length; r++) q[r] = q[r].split('{');
                }
                function s(v) {
                    var w = v.getById(m);
                    if (!w) {
                        w = v.getHead().append('style');
                        w.setAttribute('id', m);
                        w.setAttribute('type', 'text/css');
                    }
                    return w;
                };

                function t(v, w, x) {
                    var y, z, A;
                    for (var B = 0; B < v.length; B++) {
                        if (b.webkit) for (z = 0; z < w.length; z++) {
                            A = w[z][1];
                            for (y = 0; y < x.length; y++) A = A.replace(x[y][0], x[y][1]);
                            v[B].$.sheet.addRule(w[z][0], A);
                        } else {
                            A = w;
                            for (y = 0; y < x.length; y++) A = A.replace(x[y][0], x[y][1]);
                            if (c) v[B].$.styleSheet.cssText += A;
                            else v[B].$.innerHTML += A;
                        }
                    }
                };
                var u = /\$color/g;
                e.extend(n, {
                    uiColor: null,
                    getUiColor: function () {
                        return this.uiColor;
                    },
                    setUiColor: function (v) {
                        var w, x = s(a.document),
                            y = '.cke_editor_' + e.escapeCssSelector(n.name),
                            z = [y + ' .cke_wrapper', y + '_dialog .cke_dialog_contents', y + '_dialog a.cke_dialog_tab', y + '_dialog .cke_dialog_footer'].join(','),
                            A = 'background-color: $color !important;';
                        if (b.webkit) w = [
                            [z, A]
                        ];
                        else w = z + '{' + A + '}';
                        return (this.setUiColor = function (B) {
                            var C = [
                                [u, B]
                            ];
                            n.uiColor = B;
                            t([x], w, C);
                            t(o, q, C);
                        })(v);
                    }
                });
                n.on('menuShow', function (v) {
                    var w = v.data[0],
                        x = w.element.getElementsByTag('iframe').getItem(0).getFrameDocument();
                    if (!x.getById('cke_ui_color')) {
                        var y = s(x);
                        o.push(y);
                        var z = n.getUiColor();
                        if (z) t([y], q, [
                            [u, z]
                        ]);
                    }
                });
                if (n.config.uiColor) n.setUiColor(n.config.uiColor);
            }
        };
    })());
    (function () {
        a.dialog ? l() : a.on('dialogPluginReady', l);

        function l() {
            a.dialog.on('resize', function (m) {
                var n = m.data,
                    o = n.width,
                    p = n.height,
                    q = n.dialog,
                    r = q.parts.contents;
                if (n.skin != 'kama') return;
                r.setStyles({
                    width: o + 'px',
                    height: p + 'px'
                });
                setTimeout(function () {
                    var s = q.parts.dialog.getChild([0, 0, 0]),
                        t = s.getChild(0),
                        u = s.getChild(2);
                    u.setStyle('width', t.$.offsetWidth + 'px');
                    u = s.getChild(7);
                    u.setStyle('width', t.$.offsetWidth - 28 + 'px');
                    u = s.getChild(4);
                    u.setStyle('height', t.$.offsetHeight - 31 - 14 + 'px');
                    u = s.getChild(5);
                    u.setStyle('height', t.$.offsetHeight - 31 - 14 + 'px');
                }, 100);
            });
        };
    })();
    j.add('about', {
        requires: ['dialog'],
        init: function (l) {
            var m = l.addCommand('about', new a.dialogCommand('about'));
            m.modes = {
                wysiwyg: 1,
                source: 1
            };
            m.canUndo = false;
            l.ui.addButton('About', {
                label: l.lang.about.title,
                command: 'about'
            });
            a.dialog.add('about', this.path + 'dialogs/about.js');
        }
    });
    (function () {
        var l = 'a11yhelp',
            m = 'a11yHelp';
        j.add(l, {
            availableLangs: {
                en: 1,
                he: 1
            },
            init: function (n) {
                var o = this;
                n.addCommand(m, {
                    exec: function () {
                        var p = n.langCode;
                        p = o.availableLangs[p] ? p : 'en';
                        a.scriptLoader.load(a.getUrl(o.path + 'lang/' + p + '.js'), function () {
                            e.extend(n.lang, o.lang[p]);
                            n.openDialog(m);
                        });
                    },
                    modes: {
                        wysiwyg: 1,
                        source: 1
                    },
                    canUndo: false
                });
                a.dialog.add(m, this.path + 'dialogs/a11yhelp.js');
            }
        });
    })();
    j.add('basicstyles', {
        requires: ['styles', 'button'],
        init: function (l) {
            var m = function (p, q, r, s) {
                    var t = new a.style(s);
                    l.attachStyleStateChange(t, function (u) {
                        l.getCommand(r).setState(u);
                    });
                    l.addCommand(r, new a.styleCommand(t));
                    l.ui.addButton(p, {
                        label: q,
                        command: r
                    });
                },
                n = l.config,
                o = l.lang;
            m('Bold', o.bold, 'bold', n.coreStyles_bold);
            m('Italic', o.italic, 'italic', n.coreStyles_italic);
            m('Underline', o.underline, 'underline', n.coreStyles_underline);
            m('Strike', o.strike, 'strike', n.coreStyles_strike);
            m('Subscript', o.subscript, 'subscript', n.coreStyles_subscript);
            m('Superscript', o.superscript, 'superscript', n.coreStyles_superscript);
        }
    });
    i.coreStyles_bold = {
        element: 'strong',
        overrides: 'b'
    };
    i.coreStyles_italic = {
        element: 'em',
        overrides: 'i'
    };
    i.coreStyles_underline = {
        element: 'u'
    };
    i.coreStyles_strike = {
        element: 'strike'
    };
    i.coreStyles_subscript = {
        element: 'sub'
    };
    i.coreStyles_superscript = {
        element: 'sup'
    };
    (function () {
        function l(p, q) {
            var r = q.block || q.blockLimit;
            if (!r || r.getName() == 'body') return 2;
            if (r.getAscendant('blockquote', true)) return 1;
            return 2;
        };

        function m(p) {
            var q = p.editor,
                r = q.getCommand('blockquote');
            r.state = l(q, p.data.path);
            r.fire('state');
        };

        function n(p) {
            for (var q = 0, r = p.getChildCount(), s; q < r && (s = p.getChild(q)); q++) {
                if (s.type == 1 && s.isBlockBoundary()) return false;
            }
            return true;
        };
        var o = {
            exec: function (p) {
                var q = p.getCommand('blockquote').state,
                    r = p.getSelection(),
                    s = r && r.getRanges()[0];
                if (!s) return;
                var t = r.createBookmarks();
                if (c) {
                    var u = t[0].startNode,
                        v = t[0].endNode,
                        w;
                    if (u && u.getParent().getName() == 'blockquote') {
                        w = u;
                        while (w = w.getNext()) {
                            if (w.type == 1 && w.isBlockBoundary()) {
                                u.move(w, true);
                                break;
                            }
                        }
                    }
                    if (v && v.getParent().getName() == 'blockquote') {
                        w = v;
                        while (w = w.getPrevious()) {
                            if (w.type == 1 && w.isBlockBoundary()) {
                                v.move(w);
                                break;
                            }
                        }
                    }
                }
                var x = s.createIterator(),
                    y;
                if (q == 2) {
                    var z = [];
                    while (y = x.getNextParagraph()) z.push(y);
                    if (z.length < 1) {
                        var A = p.document.createElement(p.config.enterMode == 1 ? 'p' : 'div'),
                            B = t.shift();
                        s.insertNode(A);
                        A.append(new d.text('\ufeff', p.document));
                        s.moveToBookmark(B);
                        s.selectNodeContents(A);
                        s.collapse(true);
                        B = s.createBookmark();
                        z.push(A);
                        t.unshift(B);
                    }
                    var C = z[0].getParent(),
                        D = [];
                    for (var E = 0; E < z.length; E++) {
                        y = z[E];
                        C = C.getCommonAncestor(y.getParent());
                    }
                    var F = {
                        table: 1,
                        tbody: 1,
                        tr: 1,
                        ol: 1,
                        ul: 1
                    };
                    while (F[C.getName()]) C = C.getParent();
                    var G = null;
                    while (z.length > 0) {
                        y = z.shift();
                        while (!y.getParent().equals(C)) y = y.getParent();
                        if (!y.equals(G)) D.push(y);
                        G = y;
                    }
                    while (D.length > 0) {
                        y = D.shift();
                        if (y.getName() == 'blockquote') {
                            var H = new d.documentFragment(p.document);
                            while (y.getFirst()) {
                                H.append(y.getFirst().remove());
                                z.push(H.getLast());
                            }
                            H.replace(y);
                        } else z.push(y);
                    }
                    var I = p.document.createElement('blockquote');
                    I.insertBefore(z[0]);
                    while (z.length > 0) {
                        y = z.shift();
                        I.append(y);
                    }
                } else if (q == 1) {
                    var J = [],
                        K = {};
                    while (y = x.getNextParagraph()) {
                        var L = null,
                            M = null;
                        while (y.getParent()) {
                            if (y.getParent().getName() == 'blockquote') {
                                L = y.getParent();
                                M = y;
                                break;
                            }
                            y = y.getParent();
                        }
                        if (L && M && !M.getCustomData('blockquote_moveout')) {
                            J.push(M);
                            h.setMarker(K, M, 'blockquote_moveout', true);
                        }
                    }
                    h.clearAllMarkers(K);
                    var N = [],
                        O = [];
                    K = {};
                    while (J.length > 0) {
                        var P = J.shift();
                        I = P.getParent();
                        if (!P.getPrevious()) P.remove().insertBefore(I);
                        else if (!P.getNext()) P.remove().insertAfter(I);
                        else {
                            P.breakParent(P.getParent());
                            O.push(P.getNext());
                        }
                        if (!I.getCustomData('blockquote_processed')) {
                            O.push(I);
                            h.setMarker(K, I, 'blockquote_processed', true);
                        }
                        N.push(P);
                    }
                    h.clearAllMarkers(K);
                    for (E = O.length - 1; E >= 0; E--) {
                        I = O[E];
                        if (n(I)) I.remove();
                    }
                    if (p.config.enterMode == 2) {
                        var Q = true;
                        while (N.length) {
                            P = N.shift();
                            if (P.getName() == 'div') {
                                H = new d.documentFragment(p.document);
                                var R = Q && P.getPrevious() && !(P.getPrevious().type == 1 && P.getPrevious().isBlockBoundary());
                                if (R) H.append(p.document.createElement('br'));
                                var S = P.getNext() && !(P.getNext().type == 1 && P.getNext().isBlockBoundary());
                                while (P.getFirst()) P.getFirst().remove().appendTo(H);
                                if (S) H.append(p.document.createElement('br'));
                                H.replace(P);
                                Q = false;
                            }
                        }
                    }
                }
                r.selectBookmarks(t);
                p.focus();
            }
        };
        j.add('blockquote', {
            init: function (p) {
                p.addCommand('blockquote', o);
                p.ui.addButton('Blockquote', {
                    label: p.lang.blockquote,
                    command: 'blockquote'
                });
                p.on('selectionChange', m);
            },
            requires: ['domiterator']
        });
    })();
    j.add('button', {
        beforeInit: function (l) {
            l.ui.addHandler(1, k.button.handler);
        }
    });
    a.UI_BUTTON = 1;
    k.button = function (l) {
        e.extend(this, l, {
            title: l.label,
            className: l.className || l.command && 'cke_button_' + l.command || '',
            click: l.click || (function (m) {
                m.execCommand(l.command);
            })
        });
        this._ = {};
    };
    k.button.handler = {
        create: function (l) {
            return new k.button(l);
        }
    };
    k.button.prototype = {
        canGroup: true,
        render: function (l, m) {
            var n = b,
                o = this._.id = 'cke_' + e.getNextNumber(),
                p = '',
                q = this.command,
                r, s;
            this._.editor = l;
            var t = {
                id: o,
                button: this,
                editor: l,
                focus: function () {
                    var v = a.document.getById(o);
                    v.focus();
                },
                execute: function () {
                    this.button.click(l);
                }
            };
            t.clickFn = r = e.addFunction(t.execute, t);
            t.index = s = k.button._.instances.push(t) - 1;
            if (this.modes) l.on('mode', function () {
                this.setState(this.modes[l.mode] ? 2 : 0);
            }, this);
            else if (q) {
                q = l.getCommand(q);
                if (q) {
                    q.on('state', function () {
                        this.setState(q.state);
                    }, this);
                    p += 'cke_' + (q.state == 1 ? 'on' : q.state == 0 ? 'disabled' : 'off');
                }
            }
            if (!q) p += 'cke_off';
            if (this.className) p += ' ' + this.className;
            m.push('<span class="cke_button">', '<a id="', o, '" class="', p, '"', n.gecko && n.version >= 10900 && !n.hc ? '' : '" href="javascript:void(\'' + (this.title || '').replace("'") + "')\"", ' title="', this.title, '" tabindex="-1" hidefocus="true" role="button" aria-labelledby="' + o + '_label"' + (this.hasArrow ? ' aria-haspopup="true"' : ''));
            if (n.opera || n.gecko && n.mac) m.push(' onkeypress="return false;"');
            if (n.gecko) m.push(' onblur="this.style.cssText = this.style.cssText;"');
            m.push(' onkeydown="return CKEDITOR.ui.button._.keydown(', s, ', event);" onfocus="return CKEDITOR.ui.button._.focus(', s, ', event);" onclick="CKEDITOR.tools.callFunction(', r, ', this); return false;"><span class="cke_icon"');
            if (this.icon) {
                var u = (this.iconOffset || 0) * -16;
                m.push(' style="background-image:url(', a.getUrl(this.icon), ');background-position:0 ' + u + 'px;"');
            }
            m.push('>&nbsp;</span><span id="', o, '_label" class="cke_label">', this.label, '</span>');
            if (this.hasArrow) m.push('<span class="cke_buttonarrow">' + (b.hc ? '&#9660;' : '&nbsp;') + '</span>');
            m.push('</a>', '</span>');
            if (this.onRender) this.onRender();
            return t;
        },
        setState: function (l) {
            if (this._.state == l) return false;
            this._.state = l;
            var m = a.document.getById(this._.id);
            if (m) {
                m.setState(l);
                l == 0 ? m.setAttribute('aria-disabled', true) : m.removeAttribute('aria-disabled');
                l == 1 ? m.setAttribute('aria-pressed', true) : m.removeAttribute('aria-pressed');
                return true;
            } else return false;
        }
    };
    k.button._ = {
        instances: [],
        keydown: function (l, m) {
            var n = k.button._.instances[l];
            if (n.onkey) {
                m = new d.event(m);
                return n.onkey(n, m.getKeystroke()) !== false;
            }
        },
        focus: function (l, m) {
            var n = k.button._.instances[l],
                o;
            if (n.onfocus) o = n.onfocus(n, new d.event(m)) !== false;
            if (b.gecko && b.version < 10900) m.preventBubble();
            return o;
        }
    };
    k.prototype.addButton = function (l, m) {
        this.add(l, 1, m);
    };
    a.on('reset', function () {
        k.button._.instances = [];
    });
    (function () {
        var l = function (s, t) {
                var u = s.document,
                    v = u.getBody(),
                    w = false,
                    x = function () {
                        w = true;
                    };
                v.on(t, x);
                (b.version > 7 ? u.$ : u.$.selection.createRange()).execCommand(t);
                v.removeListener(t, x);
                return w;
            },
            m = c ?
        function (s, t) {
            return l(s, t);
        } : function (s, t) {
            try {
                return s.document.$.execCommand(t);
            } catch (u) {
                return false;
            }
        }, n = function (s) {
            this.type = s;
            this.canUndo = this.type == 'cut';
        };
        n.prototype = {
            exec: function (s, t) {
                this.type == 'cut' && r(s);
                var u = m(s, this.type);
                if (!u) alert(s.lang.clipboard[this.type + 'Error']);
                return u;
            }
        };
        var o = {
            canUndo: false,
            exec: c ?
            function (s) {
                s.focus();
                if (!s.document.getBody().fire('beforepaste') && !l(s, 'paste')) {
                    s.fire('pasteDialog');
                    return false;
                }
            } : function (s) {
                try {
                    if (!s.document.getBody().fire('beforepaste') && !s.document.$.execCommand('Paste', false, null)) throw 0;
                } catch (t) {
                    setTimeout(function () {
                        s.fire('pasteDialog');
                    }, 0);
                    return false;
                }
            }
        },
            p = function (s) {
                if (this.mode != 'wysiwyg') return;
                switch (s.data.keyCode) {
                case 1000 + 86:
                case 2000 + 45:
                    var t = this.document.getBody();
                    if (!c && t.fire('beforepaste')) s.cancel();
                    else if (b.opera || b.gecko && b.version < 10900) t.fire('paste');
                    return;
                case 1000 + 88:
                case 2000 + 46:
                    var u = this;
                    this.fire('saveSnapshot');
                    setTimeout(function () {
                        u.fire('saveSnapshot');
                    }, 0);
                }
            };

        function q(s, t, u) {
            var v = this.document;
            if (c && v.getById('cke_pastebin')) return;
            if (t == 'text' && s.data && s.data.$.clipboardData) {
                var w = s.data.$.clipboardData.getData('text/plain');
                if (w) {
                    s.data.preventDefault();
                    u(w);
                    return;
                }
            }
            var x = this.getSelection(),
                y = new d.range(v),
                z = new h(t == 'text' ? 'textarea' : b.webkit ? 'body' : 'div', v);
            z.setAttribute('id', 'cke_pastebin');
            b.webkit && z.append(v.createText('\xa0'));
            v.getBody().append(z);
            z.setStyles({
                position: 'absolute',
                top: x.getStartElement().getDocumentPosition().y + 'px',
                width: '1px',
                height: '1px',
                overflow: 'hidden'
            });
            z.setStyle(this.config.contentsLangDirection == 'ltr' ? 'left' : 'right', '-1000px');
            var A = x.createBookmarks();
            if (t == 'text') {
                if (c) {
                    var B = v.getBody().$.createTextRange();
                    B.moveToElementText(z.$);
                    B.execCommand('Paste');
                    s.data.preventDefault();
                } else {
                    v.$.designMode = 'off';
                    z.$.focus();
                }
            } else {
                y.setStartAt(z, 1);
                y.setEndAt(z, 2);
                y.select(true);
            }
            window.setTimeout(function () {
                t == 'text' && !c && (v.$.designMode = 'on');
                z.remove();
                var C;
                z = b.webkit && (C = z.getFirst()) && C.is && C.hasClass('Apple-style-span') ? C : z;
                x.selectBookmarks(A);
                u(z['get' + (t == 'text' ? 'Value' : 'Html')]());
            }, 0);
        };

        function r(s) {
            if (!c || s.document.$.compatMode == 'BackCompat') return;
            var t = s.getSelection(),
                u;
            if (t.getType() == 3 && (u = t.getSelectedElement())) {
                var v = t.getRanges()[0],
                    w = s.document.createText('');
                w.insertBefore(u);
                v.setStartBefore(w);
                v.setEndAfter(u);
                t.selectRanges([v]);
                setTimeout(function () {
                    if (u.getParent()) {
                        w.remove();
                        t.selectElement(u);
                    }
                }, 0);
            }
        };
        j.add('clipboard', {
            requires: ['dialog', 'htmldataprocessor'],
            init: function (s) {
                s.on('paste', function (x) {
                    var y = x.data;
                    if (y.html) s.insertHtml(y.html);
                    else if (y.text) s.insertText(y.text);
                }, null, null, 1000);
                s.on('pasteDialog', function (x) {
                    setTimeout(function () {
                        s.openDialog('paste');
                    }, 0);
                });

                function t(x, y, z, A) {
                    var B = s.lang[y];
                    s.addCommand(y, z);
                    s.ui.addButton(x, {
                        label: B,
                        command: y
                    });
                    if (s.addMenuItems) s.addMenuItem(y, {
                        label: B,
                        command: y,
                        group: 'clipboard',
                        order: A
                    });
                };
                t('Cut', 'cut', new n('cut'), 1);
                t('Copy', 'copy', new n('copy'), 4);
                t('Paste', 'paste', o, 8);
                a.dialog.add('paste', a.getUrl(this.path + 'dialogs/paste.js'));
                s.on('key', p, s);
                var u = s.config.forcePasteAsPlainText ? 'text' : 'html';
                s.on('contentDom', function () {
                    var x = s.document.getBody();
                    x.on(u == 'text' && c || b.webkit ? 'paste' : 'beforepaste', function (y) {
                        if (v) return;
                        q.call(s, y, u, function (z) {
                            if (!z) return;
                            var A = {};
                            A[u] = z;
                            s.fire('paste', A);
                        });
                    });
                    x.on('beforecut', function () {
                        !v && r(s);
                    });
                });
                if (s.contextMenu) {
                    var v;

                    function w(x) {
                        c && (v = 1);
                        var y = s.document.$.queryCommandEnabled(x) ? 2 : 0;
                        v = 0;
                        return y;
                    };
                    s.contextMenu.addListener(function () {
                        return {
                            cut: w('Cut'),
                            copy: w('Cut'),
                            paste: b.webkit ? 2 : w('Paste')
                        };
                    });
                }
            }
        });
    })();
    j.add('colorbutton', {
        requires: ['panelbutton', 'floatpanel', 'styles'],
        init: function (l) {
            var m = l.config,
                n = l.lang.colorButton,
                o;
            if (!b.hc) {
                p('TextColor', 'fore', n.textColorTitle);
                p('BGColor', 'back', n.bgColorTitle);
            }
            function p(r, s, t) {
                l.ui.add(r, 4, {
                    label: t,
                    title: t,
                    className: 'cke_button_' + r.toLowerCase(),
                    modes: {
                        wysiwyg: 1
                    },
                    panel: {
                        css: l.skin.editor.css,
                        attributes: {
                            role: 'listbox',
                            'aria-label': n.panelTitle
                        }
                    },
                    onBlock: function (u, v) {
                        v.autoSize = true;
                        v.element.addClass('cke_colorblock');
                        v.element.setHtml(q(u, s));
                        var w = v.keys;
                        w[39] = 'next';
                        w[40] = 'next';
                        w[9] = 'next';
                        w[37] = 'prev';
                        w[38] = 'prev';
                        w[2000 + 9] = 'prev';
                        w[32] = 'click';
                    }
                });
            };

            function q(r, s) {
                var t = [],
                    u = m.colorButton_colors.split(','),
                    v = u.length + (m.colorButton_enableMore ? 2 : 1),
                    w = e.addFunction(function (C, D) {
                        if (C == '?') {
                            var E = arguments.callee;

                            function F(H) {
                                this.removeListener('ok', F);
                                this.removeListener('cancel', F);
                                H.name == 'ok' && E(this.getContentElement('picker', 'selectedColor').getValue(), D);
                            };
                            l.openDialog('colordialog', function () {
                                this.on('ok', F);
                                this.on('cancel', F);
                            });
                            return;
                        }
                        l.focus();
                        r.hide();
                        l.fire('saveSnapshot');
                        new a.style(m['colorButton_' + D + 'Style'], {
                            color: 'inherit'
                        }).remove(l.document);
                        if (C) {
                            var G = m['colorButton_' + D + 'Style'];
                            G.childRule = D == 'back' ?
                            function () {
                                return false;
                            } : function (H) {
                                return H.getName() != 'a';
                            };
                            new a.style(G, {
                                color: C
                            }).apply(l.document);
                        }
                        l.fire('saveSnapshot');
                    });
                t.push('<a class="cke_colorauto" _cke_focus=1 hidefocus=true title="', n.auto, '" onclick="CKEDITOR.tools.callFunction(', w, ",null,'", s, "');return false;\" href=\"javascript:void('", n.auto, '\')" role="option" aria-posinset="1" aria-setsize="', v, '"><table role="presentation" cellspacing=0 cellpadding=0 width="100%"><tr><td><span class="cke_colorbox" style="background-color:#000"></span></td><td colspan=7 align=center>', n.auto, '</td></tr></table></a><table role="presentation" cellspacing=0 cellpadding=0 width="100%">');
                for (var x = 0; x < u.length; x++) {
                    if (x % 8 === 0) t.push('</tr><tr>');
                    var y = u[x].split('/'),
                        z = y[0],
                        A = y[1] || z;
                    if (!y[1]) z = '#' + z.replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3');
                    var B = l.lang.colors[A] || A;
                    t.push('<td><a class="cke_colorbox" _cke_focus=1 hidefocus=true title="', B, '" onclick="CKEDITOR.tools.callFunction(', w, ",'", z, "','", s, "'); return false;\" href=\"javascript:void('", B, '\')" role="option" aria-posinset="', x + 2, '" aria-setsize="', v, '"><span class="cke_colorbox" style="background-color:#', A, '"></span></a></td>');
                }
                if (m.colorButton_enableMore) t.push('</tr><tr><td colspan=8 align=center><a class="cke_colormore" _cke_focus=1 hidefocus=true title="', n.more, '" onclick="CKEDITOR.tools.callFunction(', w, ",'?','", s, "');return false;\" href=\"javascript:void('", n.more, "')\"", ' role="option" aria-posinset="', v, '" aria-setsize="', v, '">', n.more, '</a></td>');
                t.push('</tr></table>');
                return t.join('');
            };
        }
    });
    i.colorButton_enableMore = true;
    i.colorButton_colors = '000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF';
    i.colorButton_foreStyle = {
        element: 'span',
        styles: {
            color: '#(color)'
        },
        overrides: [{
            element: 'font',
            attributes: {
                color: null
            }
        }]
    };
    i.colorButton_backStyle = {
        element: 'span',
        styles: {
            'background-color': '#(color)'
        }
    };
    (function () {
        j.colordialog = {
            init: function (l) {
                l.addCommand('colordialog', new a.dialogCommand('colordialog'));
                a.dialog.add('colordialog', this.path + 'dialogs/colordialog.js');
            }
        };
        j.add('colordialog', j.colordialog);
    })();
    j.add('contextmenu', {
        requires: ['menu'],
        beforeInit: function (l) {
            l.contextMenu = new j.contextMenu(l);
            l.addCommand('contextMenu', {
                exec: function () {
                    l.contextMenu.show(l.document.getBody());
                }
            });
        }
    });
    j.contextMenu = e.createClass({
        $: function (l) {
            this.id = 'cke_' + e.getNextNumber();
            this.editor = l;
            this._.listeners = [];
            this._.functionId = e.addFunction(function (m) {
                this._.panel.hide();
                l.focus();
                l.execCommand(m);
            }, this);
            this.definition = {
                panel: {
                    className: l.skinClass + ' cke_contextmenu',
                    attributes: {
                        'aria-label': l.lang.contextmenu.options
                    }
                }
            };
        },
        _: {
            onMenu: function (l, m, n, o) {
                var p = this._.menu,
                    q = this.editor;
                if (p) {
                    p.hide();
                    p.removeAll();
                } else {
                    p = this._.menu = new a.menu(q, this.definition);
                    p.onClick = e.bind(function (z) {
                        p.hide();
                        if (z.onClick) z.onClick();
                        else if (z.command) q.execCommand(z.command);
                    }, this);
                    p.onEscape = function (z) {
                        var A = this.parent;
                        if (A) {
                            A._.panel.hideChild();
                            var B = A._.panel._.panel._.currentBlock,
                                C = B._.focusIndex;
                            B._.markItem(C);
                        } else if (z == 27) {
                            this.hide();
                            q.focus();
                        }
                        return false;
                    };
                }
                var r = this._.listeners,
                    s = [],
                    t = this.editor.getSelection(),
                    u = t && t.getStartElement();
                p.onHide = e.bind(function () {
                    p.onHide = null;
                    if (c) {
                        var z = q.getSelection();
                        z && z.unlock();
                    }
                    this.onHide && this.onHide();
                }, this);
                for (var v = 0; v < r.length; v++) {
                    var w = r[v](u, t);
                    if (w) for (var x in w) {
                        var y = this.editor.getMenuItem(x);
                        if (y) {
                            y.state = w[x];
                            p.add(y);
                        }
                    }
                }
                p.items.length && p.show(l, m || (q.lang.dir == 'rtl' ? 2 : 1), n, o);
            }
        },
        proto: {
            addTarget: function (l, m) {
                if (b.opera) {
                    var n;
                    l.on('mousedown', function (r) {
                        r = r.data;
                        if (r.$.button != 2) {
                            if (r.getKeystroke() == 1000 + 1) l.fire('contextmenu', r);
                            return;
                        }
                        if (m && (b.mac ? r.$.metaKey : r.$.ctrlKey)) return;
                        var s = r.getTarget();
                        if (!n) {
                            var t = s.getDocument();
                            n = t.createElement('input');
                            n.$.type = 'button';
                            t.getBody().append(n);
                        }
                        n.setAttribute('style', 'position:absolute;top:' + (r.$.clientY - 2) + 'px;left:' + (r.$.clientX - 2) + 'px;width:5px;height:5px;opacity:0.01');
                    });
                    l.on('mouseup', function (r) {
                        if (n) {
                            n.remove();
                            n = undefined;
                            l.fire('contextmenu', r.data);
                        }
                    });
                }
                l.on('contextmenu', function (r) {
                    var s = r.data;
                    if (m && (b.webkit ? o : b.mac ? s.$.metaKey : s.$.ctrlKey)) return;
                    s.preventDefault();
                    var t = s.getTarget().getDocument().getDocumentElement(),
                        u = s.$.clientX,
                        v = s.$.clientY;
                    e.setTimeout(function () {
                        this.show(t, null, u, v);
                    }, 0, this);
                }, this);
                if (b.webkit) {
                    var o, p = function (r) {
                            o = b.mac ? r.data.$.metaKey : r.data.$.ctrlKey;
                        },
                        q = function () {
                            o = 0;
                        };
                    l.on('keydown', p);
                    l.on('keyup', q);
                    l.on('contextmenu', q);
                }
            },
            addListener: function (l) {
                this._.listeners.push(l);
            },
            show: function (l, m, n, o) {
                this.editor.focus();
                if (c) {
                    var p = this.editor.getSelection();
                    p && p.lock();
                }
                this._.onMenu(l || a.document.getDocumentElement(), m, n || 0, o || 0);
            }
        }
    });
    (function () {
        j.add('div', {
            requires: ['editingblock', 'domiterator', 'styles'],
            init: function (l) {
                var m = l.lang.div;
                l.addCommand('creatediv', new a.dialogCommand('creatediv'));
                l.addCommand('editdiv', new a.dialogCommand('editdiv'));
                l.addCommand('removediv', {
                    exec: function (n) {
                        var o = n.getSelection(),
                            p = o && o.getRanges(),
                            q, r = o.createBookmarks(),
                            s, t = [];

                        function u(w) {
                            var x = new d.elementPath(w),
                                y = x.blockLimit,
                                z = y.is('div') && y;
                            if (z && !z.getAttribute('_cke_div_added')) {
                                t.push(z);
                                z.setAttribute('_cke_div_added');
                            }
                        };
                        for (var v = 0; v < p.length; v++) {
                            q = p[v];
                            if (q.collapsed) u(o.getStartElement());
                            else {
                                s = new d.walker(q);
                                s.evaluator = u;
                                s.lastForward();
                            }
                        }
                        for (v = 0; v < t.length; v++) t[v].remove(true);
                        o.selectBookmarks(r);
                    }
                });
                l.ui.addButton('CreateDiv', {
                    label: m.toolbar,
                    command: 'creatediv'
                });
                if (l.addMenuItems) {
                    l.addMenuItems({
                        editdiv: {
                            label: m.edit,
                            command: 'editdiv',
                            group: 'div',
                            order: 1
                        },
                        removediv: {
                            label: m.remove,
                            command: 'removediv',
                            group: 'div',
                            order: 5
                        }
                    });
                    if (l.contextMenu) l.contextMenu.addListener(function (n, o) {
                        if (!n) return null;
                        var p = new d.elementPath(n),
                            q = p.blockLimit;
                        if (q && q.getAscendant('div', true)) return {
                            editdiv: 2,
                            removediv: 2
                        };
                        return null;
                    });
                }
                a.dialog.add('creatediv', this.path + 'dialogs/div.js');
                a.dialog.add('editdiv', this.path + 'dialogs/div.js');
            }
        });
    })();
    (function () {
        var l = {
            toolbarFocus: {
                exec: function (n) {
                    var o = n._.elementsPath.idBase,
                        p = a.document.getById(o + '0');
                    if (p) p.focus();
                }
            }
        },
            m = '<span class="cke_empty">&nbsp;</span>';
        j.add('elementspath', {
            requires: ['selection'],
            init: function (n) {
                var o = 'cke_path_' + n.name,
                    p, q = function () {
                        if (!p) p = a.document.getById(o);
                        return p;
                    },
                    r = 'cke_elementspath_' + e.getNextNumber() + '_';
                n._.elementsPath = {
                    idBase: r,
                    filters: []
                };
                n.on('themeSpace', function (s) {
                    if (s.data.space == 'bottom') s.data.html += '<span id="' + o + '_label" class="cke_voice_label">' + n.lang.elementsPath.eleLabel + '</span>' + '<div id="' + o + '" class="cke_path" role="group" aria-labelledby="' + o + '_label">' + m + '</div>';
                });
                n.on('selectionChange', function (s) {
                    var t = b,
                        u = s.data.selection,
                        v = u.getStartElement(),
                        w = [],
                        x = s.editor,
                        y = x._.elementsPath.list = [],
                        z = x._.elementsPath.filters;
                    while (v) {
                        var A = 0;
                        for (var B = 0; B < z.length; B++) {
                            if (z[B](v) === false) {
                                A = 1;
                                break;
                            }
                        }
                        if (!A) {
                            var C = y.push(v) - 1,
                                D;
                            if (v.getAttribute('_cke_real_element_type')) D = v.getAttribute('_cke_real_element_type');
                            else D = v.getName();
                            var E = '';
                            if (t.opera || t.gecko && t.mac) E += ' onkeypress="return false;"';
                            if (t.gecko) E += ' onblur="this.style.cssText = this.style.cssText;"';
                            var F = x.lang.elementsPath.eleTitle.replace(/%1/, D);
                            w.unshift('<a id="', r, C, '" href="javascript:void(\'', D, '\')" tabindex="-1" title="', F, '"' + (b.gecko && b.version < 10900 ? ' onfocus="event.preventBubble();"' : '') + ' hidefocus="true" ' + " onkeydown=\"return CKEDITOR._.elementsPath.keydown('", x.name, "',", C, ', event);"' + E, " onclick=\"return CKEDITOR._.elementsPath.click('", x.name, "',", C, ');"', ' role="button" aria-labelledby="' + r + C + '_label">', D, '<span id="', r, C, '_label" class="cke_label">' + F + '</span>', '</a>');
                        }
                        if (D == 'body') break;
                        v = v.getParent();
                    }
                    q().setHtml(w.join('') + m);
                });
                n.on('contentDomUnload', function () {
                    q().setHtml(m);
                });
                n.addCommand('elementsPathFocus', l.toolbarFocus);
            }
        });
    })();
    a._.elementsPath = {
        click: function (l, m) {
            var n = a.instances[l];
            n.focus();
            var o = n._.elementsPath.list[m];
            n.getSelection().selectElement(o);
            return false;
        },
        keydown: function (l, m, n) {
            var o = k.button._.instances[m],
                p = a.instances[l],
                q = p._.elementsPath.idBase,
                r;
            n = new d.event(n);
            var s = p.lang.dir == 'rtl';
            switch (n.getKeystroke()) {
            case s ? 39:
                37 : case 9:
                r = a.document.getById(q + (m + 1));
                if (!r) r = a.document.getById(q + '0');
                r.focus();
                return false;
            case s ? 37:
                39 : case 2000 + 9:
                r = a.document.getById(q + (m - 1));
                if (!r) r = a.document.getById(q + (p._.elementsPath.list.length - 1));
                r.focus();
                return false;
            case 27:
                p.focus();
                return false;
            case 13:
            case 32:
                this.click(l, m);
                return false;
            }
            return true;
        }
    };
    (function () {
        j.add('enterkey', {
            requires: ['keystrokes', 'indent'],
            init: function (s) {
                var t = s.specialKeys;
                t[13] = q;
                t[2000 + 13] = p;
            }
        });
        j.enterkey = {
            enterBlock: function (s, t, u, v) {
                u = u || r(s);
                var w = u.document;
                if (u.checkStartOfBlock() && u.checkEndOfBlock()) {
                    var x = new d.elementPath(u.startContainer),
                        y = x.block;
                    if (y && (y.is('li') || y.getParent().is('li'))) {
                        s.execCommand('outdent');
                        return;
                    }
                }
                var z = t == 3 ? 'div' : 'p',
                    A = u.splitBlock(z);
                if (!A) return;
                var B = A.previousBlock,
                    C = A.nextBlock,
                    D = A.wasStartOfBlock,
                    E = A.wasEndOfBlock,
                    F;
                if (C) {
                    F = C.getParent();
                    if (F.is('li')) {
                        C.breakParent(F);
                        C.move(C.getNext(), true);
                    }
                } else if (B && (F = B.getParent()) && F.is('li')) {
                    B.breakParent(F);
                    u.moveToElementEditStart(B.getNext());
                    B.move(B.getPrevious());
                }
                if (!D && !E) {
                    if (C.is('li') && (F = C.getFirst(d.walker.invisible(true))) && F.is && F.is('ul', 'ol'))(c ? w.createText('\xa0') : w.createElement('br')).insertBefore(F);
                    if (C) u.moveToElementEditStart(C);
                } else {
                    var G;
                    if (B) {
                        if (B.is('li') || !o.test(B.getName())) G = B.clone();
                    } else if (C) G = C.clone();
                    if (!G) G = w.createElement(z);
                    else if (v && !G.is('li')) G.renameNode(z);
                    var H = A.elementPath;
                    if (H) for (var I = 0, J = H.elements.length; I < J; I++) {
                        var K = H.elements[I];
                        if (K.equals(H.block) || K.equals(H.blockLimit)) break;
                        if (f.$removeEmpty[K.getName()]) {
                            K = K.clone();
                            G.moveChildren(K);
                            G.append(K);
                        }
                    }
                    if (!c) G.appendBogus();
                    u.insertNode(G);
                    if (c && D && (!E || !B.getChildCount())) {
                        u.moveToElementEditStart(E ? B : G);
                        u.select();
                    }
                    u.moveToElementEditStart(D && !E ? C : G);
                }
                if (!c) if (C) {
                    var L = w.createElement('span');
                    L.setHtml('&nbsp;');
                    u.insertNode(L);
                    L.scrollIntoView();
                    u.deleteContents();
                } else G.scrollIntoView();
                u.select();
            },
            enterBr: function (s, t, u, v) {
                u = u || r(s);
                var w = u.document,
                    x = t == 3 ? 'div' : 'p',
                    y = u.checkEndOfBlock(),
                    z = new d.elementPath(s.getSelection().getStartElement()),
                    A = z.block,
                    B = A && z.block.getName(),
                    C = false;
                if (!v && B == 'li') {
                    n(s, t, u, v);
                    return;
                }
                if (!v && y && o.test(B)) {
                    w.createElement('br').insertAfter(A);
                    if (b.gecko) w.createText('').insertAfter(A);
                    u.setStartAt(A.getNext(), c ? 3 : 1);
                } else {
                    var D;
                    C = B == 'pre';
                    if (C && !b.gecko) D = w.createText(c ? '\r' : '\n');
                    else D = w.createElement('br');
                    u.deleteContents();
                    u.insertNode(D);
                    if (!c) w.createText('\ufeff').insertAfter(D);
                    if (y && !c) D.getParent().appendBogus();
                    if (!c) D.getNext().$.nodeValue = '';
                    if (c) u.setStartAt(D, 4);
                    else u.setStartAt(D.getNext(), 1);
                    if (!c) {
                        var E = null;
                        if (!b.gecko) {
                            E = w.createElement('span');
                            E.setHtml('&nbsp;');
                        } else E = w.createElement('br');
                        E.insertBefore(D.getNext());
                        E.scrollIntoView();
                        E.remove();
                    }
                }
                u.collapse(true);
                u.select(C);
            }
        };
        var l = j.enterkey,
            m = l.enterBr,
            n = l.enterBlock,
            o = /^h[1-6]$/;

        function p(s) {
            if (s.mode != 'wysiwyg') return false;
            if (s.getSelection().getStartElement().hasAscendant('pre', true)) {
                setTimeout(function () {
                    n(s, s.config.enterMode, null, true);
                }, 0);
                return true;
            } else return q(s, s.config.shiftEnterMode, true);
        };

        function q(s, t, u) {
            u = s.config.forceEnterMode || u;
            if (s.mode != 'wysiwyg') return false;
            if (!t) t = s.config.enterMode;
            setTimeout(function () {
                s.fire('saveSnapshot');
                if (t == 2 || s.getSelection().getStartElement().hasAscendant('pre', true)) m(s, t, null, u);
                else n(s, t, null, u);
            }, 0);
            return true;
        };

        function r(s) {
            var t = s.getSelection().getRanges();
            for (var u = t.length - 1; u > 0; u--) t[u].deleteContents();
            return t[0];
        };
    })();
    (function () {
        var l = 'nbsp,gt,lt,quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro',
            m = 'Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml',
            n = 'Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv';

        function o(p) {
            var q = {},
                r = [],
                s = {
                    nbsp: '\xa0',
                    shy: '­',
                    gt: '>',
                    lt: '<'
                };
            p = p.replace(/\b(nbsp|shy|gt|lt|amp)(?:,|$)/g, function (x, y) {
                q[s[y]] = '&' + y + ';';
                r.push(s[y]);
                return '';
            });
            p = p.split(',');
            var t = document.createElement('div'),
                u;
            t.innerHTML = '&' + p.join(';&') + ';';
            u = t.innerHTML;
            t = null;
            for (var v = 0; v < u.length; v++) {
                var w = u.charAt(v);
                q[w] = '&' + p[v] + ';';
                r.push(w);
            }
            q.regex = r.join('');
            return q;
        };
        j.add('entities', {
            afterInit: function (p) {
                var q = p.config;
                if (!q.entities) return;
                var r = p.dataProcessor,
                    s = r && r.htmlFilter;
                if (s) {
                    var t = l;
                    if (q.entities_latin) t += ',' + m;
                    if (q.entities_greek) t += ',' + n;
                    if (q.entities_additional) t += ',' + q.entities_additional;
                    var u = o(t),
                        v = '[' + u.regex + ']';
                    delete u.regex;
                    if (q.entities_processNumerical) v = '[^ -~]|' + v;
                    v = new RegExp(v, 'g');

                    function w(x) {
                        return u[x] || '&#' + x.charCodeAt(0) + ';';
                    };
                    s.addRules({
                        text: function (x) {
                            return x.replace(v, w);
                        }
                    });
                }
            }
        });
    })();
    i.entities = true;
    i.entities_latin = true;
    i.entities_greek = true;
    i.entities_processNumerical = false;
    i.entities_additional = '#39';
    (function () {
        function l(u, v) {
            var w = [];
            if (!v) return u;
            else for (var x in v) w.push(x + '=' + encodeURIComponent(v[x]));
            return u + (u.indexOf('?') != -1 ? '&' : '?') + w.join('&');
        };

        function m(u) {
            u += '';
            var v = u.charAt(0).toUpperCase();
            return v + u.substr(1);
        };

        function n(u) {
            var B = this;
            var v = B.getDialog(),
                w = v.getParentEditor();
            w._.filebrowserSe = B;
            var x = w.config['filebrowser' + m(v.getName()) + 'WindowWidth'] || w.config.filebrowserWindowWidth || '80%',
                y = w.config['filebrowser' + m(v.getName()) + 'WindowHeight'] || w.config.filebrowserWindowHeight || '70%',
                z = B.filebrowser.params || {};
            z.CKEditor = w.name;
            z.CKEditorFuncNum = w._.filebrowserFn;
            if (!z.langCode) z.langCode = w.langCode;
            var A = l(B.filebrowser.url, z);
            w.popup(A, x, y);
        };

        function o(u) {
            var x = this;
            var v = x.getDialog(),
                w = v.getParentEditor();
            w._.filebrowserSe = x;
            if (!v.getContentElement(x['for'][0], x['for'][1]).getInputElement().$.value) return false;
            if (!v.getContentElement(x['for'][0], x['for'][1]).getAction()) return false;
            return true;
        };

        function p(u, v, w) {
            var x = w.params || {};
            x.CKEditor = u.name;
            x.CKEditorFuncNum = u._.filebrowserFn;
            if (!x.langCode) x.langCode = u.langCode;
            v.action = l(w.url, x);
            v.filebrowser = w;
        };

        function q(u, v, w, x) {
            var y, z;
            for (var A in x) {
                y = x[A];
                if (y.type == 'hbox' || y.type == 'vbox') q(u, v, w, y.children);
                if (!y.filebrowser) continue;
                if (typeof y.filebrowser == 'string') {
                    var B = {
                        action: y.type == 'fileButton' ? 'QuickUpload' : 'Browse',
                        target: y.filebrowser
                    };
                    y.filebrowser = B;
                }
                if (y.filebrowser.action == 'Browse') {
                    var C = y.filebrowser.url || u.config['filebrowser' + m(v) + 'BrowseUrl'] || u.config.filebrowserBrowseUrl;
                    if (C) {
                        y.onClick = n;
                        y.filebrowser.url = C;
                        y.hidden = false;
                    }
                } else if (y.filebrowser.action == 'QuickUpload' && y['for']) {
                    C = y.filebrowser.url || u.config['filebrowser' + m(v) + 'UploadUrl'] || u.config.filebrowserUploadUrl;
                    if (C) {
                        var D = y.onClick;
                        y.onClick = function (E) {
                            var F = E.sender;
                            if (D && D.call(F, E) === false) return false;
                            return o.call(F, E);
                        };
                        y.filebrowser.url = C;
                        y.hidden = false;
                        p(u, w.getContents(y['for'][0]).get(y['for'][1]), y.filebrowser);
                    }
                }
            }
        };

        function r(u, v) {
            var w = v.getDialog(),
                x = v.filebrowser.target || null;
            u = u.replace(/#/g, '%23');
            if (x) {
                var y = x.split(':'),
                    z = w.getContentElement(y[0], y[1]);
                if (z) {
                    z.setValue(u);
                    w.selectPage(y[0]);
                }
            }
        };

        function s(u, v, w) {
            if (w.indexOf(';') !== -1) {
                var x = w.split(';');
                for (var y = 0; y < x.length; y++) {
                    if (s(u, v, x[y])) return true;
                }
                return false;
            }
            var z = u.getContents(v).get(w).filebrowser;
            return z && z.url;
        };

        function t(u, v) {
            var z = this;
            var w = z._.filebrowserSe.getDialog(),
                x = z._.filebrowserSe['for'],
                y = z._.filebrowserSe.filebrowser.onSelect;
            if (x) w.getContentElement(x[0], x[1]).reset();
            if (typeof v == 'function' && v.call(z._.filebrowserSe) === false) return;
            if (y && y.call(z._.filebrowserSe, u, v) === false) return;
            if (typeof v == 'string' && v) alert(v);
            if (u) r(u, z._.filebrowserSe);
        };
        j.add('filebrowser', {
            init: function (u, v) {
                u._.filebrowserFn = e.addFunction(t, u);
            }
        });
        a.on('dialogDefinition', function (u) {
            var v = u.data.definition,
                w;
            for (var x in v.contents) {
                w = v.contents[x];
                q(u.editor, u.data.name, v, w.elements);
                if (w.hidden && w.filebrowser) w.hidden = !s(v, w.id, w.filebrowser);
            }
        });
    })();
    j.add('find', {
        init: function (l) {
            var m = j.find;
            l.ui.addButton('Find', {
                label: l.lang.findAndReplace.find,
                command: 'find'
            });
            var n = l.addCommand('find', new a.dialogCommand('find'));
            n.canUndo = false;
            l.ui.addButton('Replace', {
                label: l.lang.findAndReplace.replace,
                command: 'replace'
            });
            var o = l.addCommand('replace', new a.dialogCommand('replace'));
            o.canUndo = false;
            a.dialog.add('find', this.path + 'dialogs/find.js');
            a.dialog.add('replace', this.path + 'dialogs/find.js');
        },
        requires: ['styles']
    });
    i.find_highlight = {
        element: 'span',
        styles: {
            'background-color': '#004',
            color: '#fff'
        }
    };
    (function () {
        var l = /\.swf(?:$|\?)/i,
            m = /^\d+(?:\.\d+)?$/;

        function n(q) {
            if (m.test(q)) return q + 'px';
            return q;
        };

        function o(q) {
            var r = q.attributes;
            return r.type == 'application/x-shockwave-flash' || l.test(r.src || '');
        };

        function p(q, r) {
            var s = q.createFakeParserElement(r, 'cke_flash', 'flash', true),
                t = s.attributes.style || '',
                u = r.attributes.width,
                v = r.attributes.height;
            if (typeof u != 'undefined') t = s.attributes.style = t + 'width:' + n(u) + ';';
            if (typeof v != 'undefined') t = s.attributes.style = t + 'height:' + n(v) + ';';
            return s;
        };
        j.add('flash', {
            init: function (q) {
                q.addCommand('flash', new a.dialogCommand('flash'));
                q.ui.addButton('Flash', {
                    label: q.lang.common.flash,
                    command: 'flash'
                });
                a.dialog.add('flash', this.path + 'dialogs/flash.js');
                q.addCss('img.cke_flash{background-image: url(' + a.getUrl(this.path + 'images/placeholder.png') + ');' + 'background-position: center center;' + 'background-repeat: no-repeat;' + 'border: 1px solid #a9a9a9;' + 'width: 80px;' + 'height: 80px;' + '}');
                if (q.addMenuItems) q.addMenuItems({
                    flash: {
                        label: q.lang.flash.properties,
                        command: 'flash',
                        group: 'flash'
                    }
                });
                q.on('doubleclick', function (r) {
                    var s = r.data.element;
                    if (s.is('img') && s.getAttribute('_cke_real_element_type') == 'flash') r.data.dialog = 'flash';
                });
                if (q.contextMenu) q.contextMenu.addListener(function (r, s) {
                    if (r && r.is('img') && r.getAttribute('_cke_real_element_type') == 'flash') return {
                        flash: 2
                    };
                });
            },
            afterInit: function (q) {
                var r = q.dataProcessor,
                    s = r && r.dataFilter;
                if (s) s.addRules({
                    elements: {
                        'cke:object': function (t) {
                            var u = t.attributes,
                                v = u.classid && String(u.classid).toLowerCase();
                            if (!v) {
                                for (var w = 0; w < t.children.length; w++) {
                                    if (t.children[w].name == 'cke:embed') {
                                        if (!o(t.children[w])) return null;
                                        return p(q, t);
                                    }
                                }
                                return null;
                            }
                            return p(q, t);
                        },
                        'cke:embed': function (t) {
                            if (!o(t)) return null;
                            return p(q, t);
                        }
                    }
                }, 5);
            },
            requires: ['fakeobjects']
        });
    })();
    e.extend(i, {
        flashEmbedTagOnly: false,
        flashAddEmbedTag: true,
        flashConvertOnEdit: false
    });
    (function () {
        function l(m, n, o, p, q, r, s) {
            var t = m.config,
                u = q.split(';'),
                v = [],
                w = {};
            for (var x = 0; x < u.length; x++) {
                var y = u[x];
                if (y) {
                    y = y.split('/');
                    var z = {},
                        A = u[x] = y[0];
                    z[o] = v[x] = y[1] || A;
                    w[A] = new a.style(s, z);
                    w[A]._.definition.name = A;
                } else u.splice(x--, 1);
            }
            m.ui.addRichCombo(n, {
                label: p.label,
                title: p.panelTitle,
                className: 'cke_' + (o == 'size' ? 'fontSize' : 'font'),
                panel: {
                    css: m.skin.editor.css.concat(t.contentsCss),
                    multiSelect: false,
                    attributes: {
                        'aria-label': p.panelTitle
                    }
                },
                init: function () {
                    this.startGroup(p.panelTitle);
                    for (var B = 0; B < u.length; B++) {
                        var C = u[B];
                        this.add(C, w[C].buildPreview(), C);
                    }
                },
                onClick: function (B) {
                    m.focus();
                    m.fire('saveSnapshot');
                    var C = w[B];
                    if (this.getValue() == B) C.remove(m.document);
                    else C.apply(m.document);
                    m.fire('saveSnapshot');
                },
                onRender: function () {
                    m.on('selectionChange', function (B) {
                        var C = this.getValue(),
                            D = B.data.path,
                            E = D.elements;
                        for (var F = 0, G; F < E.length; F++) {
                            G = E[F];
                            for (var H in w) {
                                if (w[H].checkElementRemovable(G, true)) {
                                    if (H != C) this.setValue(H);
                                    return;
                                }
                            }
                        }
                        this.setValue('', r);
                    }, this);
                }
            });
        };
        j.add('font', {
            requires: ['richcombo', 'styles'],
            init: function (m) {
                var n = m.config;
                l(m, 'Font', 'family', m.lang.font, n.font_names, n.font_defaultLabel, n.font_style);
                l(m, 'FontSize', 'size', m.lang.fontSize, n.fontSize_sizes, n.fontSize_defaultLabel, n.fontSize_style);
            }
        });
    })();
    i.font_names = 'Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif';
    i.font_defaultLabel = '';
    i.font_style = {
        element: 'span',
        styles: {
            'font-family': '#(family)'
        },
        overrides: [{
            element: 'font',
            attributes: {
                face: null
            }
        }]
    };
    i.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px';
    i.fontSize_defaultLabel = '';
    i.fontSize_style = {
        element: 'span',
        styles: {
            'font-size': '#(size)'
        },
        overrides: [{
            element: 'font',
            attributes: {
                size: null
            }
        }]
    };
    j.add('format', {
        requires: ['richcombo', 'styles'],
        init: function (l) {
            var m = l.config,
                n = l.lang.format,
                o = m.format_tags.split(';'),
                p = {};
            for (var q = 0; q < o.length; q++) {
                var r = o[q];
                p[r] = new a.style(m['format_' + r]);
                p[r]._.enterMode = l.config.enterMode;
            }
            l.ui.addRichCombo('Format', {
                label: n.label,
                title: n.panelTitle,
                className: 'cke_format',
                panel: {
                    css: l.skin.editor.css.concat(m.contentsCss),
                    multiSelect: false,
                    attributes: {
                        'aria-label': n.panelTitle
                    }
                },
                init: function () {
                    this.startGroup(n.panelTitle);
                    for (var s in p) {
                        var t = n['tag_' + s];
                        this.add(s, '<' + s + '>' + t + '</' + s + '>', t);
                    }
                },
                onClick: function (s) {
                    l.focus();
                    l.fire('saveSnapshot');
                    p[s].apply(l.document);
                    setTimeout(function () {
                        l.fire('saveSnapshot');
                    }, 0);
                },
                onRender: function () {
                    l.on('selectionChange', function (s) {
                        var t = this.getValue(),
                            u = s.data.path;
                        for (var v in p) {
                            if (p[v].checkActive(u)) {
                                if (v != t) this.setValue(v, l.lang.format['tag_' + v]);
                                return;
                            }
                        }
                        this.setValue('');
                    }, this);
                }
            });
        }
    });
    i.format_tags = 'p;h1;h2;h3;h4;h5;h6;pre;address;div';
    i.format_p = {
        element: 'p'
    };
    i.format_div = {
        element: 'div'
    };
    i.format_pre = {
        element: 'pre'
    };
    i.format_address = {
        element: 'address'
    };
    i.format_h1 = {
        element: 'h1'
    };
    i.format_h2 = {
        element: 'h2'
    };
    i.format_h3 = {
        element: 'h3'
    };
    i.format_h4 = {
        element: 'h4'
    };
    i.format_h5 = {
        element: 'h5'
    };
    i.format_h6 = {
        element: 'h6'
    };
    j.add('forms', {
        init: function (l) {
            var m = l.lang;
            l.addCss('form{border: 1px dotted #FF0000;padding: 2px;}\n');
            l.addCss('img.cke_hidden{background-image: url(' + a.getUrl(this.path + 'images/hiddenfield.gif') + ');' + 'background-position: center center;' + 'background-repeat: no-repeat;' + 'border: 1px solid #a9a9a9;' + 'width: 16px;' + 'height: 16px;' + '}');
            var n = function (p, q, r) {
                    l.addCommand(q, new a.dialogCommand(q));
                    l.ui.addButton(p, {
                        label: m.common[p.charAt(0).toLowerCase() + p.slice(1)],
                        command: q
                    });
                    a.dialog.add(q, r);
                },
                o = this.path + 'dialogs/';
            n('Form', 'form', o + 'form.js');
            n('Checkbox', 'checkbox', o + 'checkbox.js');
            n('Radio', 'radio', o + 'radio.js');
            n('TextField', 'textfield', o + 'textfield.js');
            n('Textarea', 'textarea', o + 'textarea.js');
            n('Select', 'select', o + 'select.js');
            n('Button', 'button', o + 'button.js');
            n('ImageButton', 'imagebutton', j.getPath('image') + 'dialogs/image.js');
            n('HiddenField', 'hiddenfield', o + 'hiddenfield.js');
            if (l.addMenuItems) l.addMenuItems({
                form: {
                    label: m.form.menu,
                    command: 'form',
                    group: 'form'
                },
                checkbox: {
                    label: m.checkboxAndRadio.checkboxTitle,
                    command: 'checkbox',
                    group: 'checkbox'
                },
                radio: {
                    label: m.checkboxAndRadio.radioTitle,
                    command: 'radio',
                    group: 'radio'
                },
                textfield: {
                    label: m.textfield.title,
                    command: 'textfield',
                    group: 'textfield'
                },
                hiddenfield: {
                    label: m.hidden.title,
                    command: 'hiddenfield',
                    group: 'hiddenfield'
                },
                imagebutton: {
                    label: m.image.titleButton,
                    command: 'imagebutton',
                    group: 'imagebutton'
                },
                button: {
                    label: m.button.title,
                    command: 'button',
                    group: 'button'
                },
                select: {
                    label: m.select.title,
                    command: 'select',
                    group: 'select'
                },
                textarea: {
                    label: m.textarea.title,
                    command: 'textarea',
                    group: 'textarea'
                }
            });
            if (l.contextMenu) {
                l.contextMenu.addListener(function (p) {
                    if (p && p.hasAscendant('form', true)) return {
                        form: 2
                    };
                });
                l.contextMenu.addListener(function (p) {
                    if (p) {
                        var q = p.getName();
                        if (q == 'select') return {
                            select: 2
                        };
                        if (q == 'textarea') return {
                            textarea: 2
                        };
                        if (q == 'input') {
                            var r = p.getAttribute('type');
                            if (r == 'text' || r == 'password') return {
                                textfield: 2
                            };
                            if (r == 'button' || r == 'submit' || r == 'reset') return {
                                button: 2
                            };
                            if (r == 'checkbox') return {
                                checkbox: 2
                            };
                            if (r == 'radio') return {
                                radio: 2
                            };
                            if (r == 'image') return {
                                imagebutton: 2
                            };
                        }
                        if (q == 'img' && p.getAttribute('_cke_real_element_type') == 'hiddenfield') return {
                            hiddenfield: 2
                        };
                    }
                });
            }
            l.on('doubleclick', function (p) {
                var q = p.data.element;
                if (q.is('form')) p.data.dialog = 'form';
                else if (q.is('select')) p.data.dialog = 'select';
                else if (q.is('textarea')) p.data.dialog = 'textarea';
                else if (q.is('img') && q.getAttribute('_cke_real_element_type') == 'hiddenfield') p.data.dialog = 'hiddenfield';
                else if (q.is('input')) {
                    var r = q.getAttribute('type');
                    switch (r) {
                    case 'text':
                    case 'password':
                        p.data.dialog = 'textfield';
                        break;
                    case 'button':
                    case 'submit':
                    case 'reset':
                        p.data.dialog = 'button';
                        break;
                    case 'checkbox':
                        p.data.dialog = 'checkbox';
                        break;
                    case 'radio':
                        p.data.dialog = 'radio';
                        break;
                    case 'image':
                        p.data.dialog = 'imagebutton';
                        break;
                    }
                }
            });
        },
        afterInit: function (l) {
            var m = l.dataProcessor,
                n = m && m.htmlFilter,
                o = m && m.dataFilter;
            if (c) n && n.addRules({
                elements: {
                    input: function (p) {
                        var q = p.attributes,
                            r = q.type;
                        if (r == 'checkbox' || r == 'radio') q.value == 'on' && delete q.value;
                    }
                }
            });
            if (o) o.addRules({
                elements: {
                    input: function (p) {
                        if (p.attributes.type == 'hidden') return l.createFakeParserElement(p, 'cke_hidden', 'hiddenfield');
                    }
                }
            });
        },
        requires: ['image', 'fakeobjects']
    });
    if (c) h.prototype.hasAttribute = function (l) {
        var o = this;
        var m = o.$.attributes.getNamedItem(l);
        if (o.getName() == 'input') switch (l) {
        case 'class':
            return o.$.className.length > 0;
        case 'checked':
            return !!o.$.checked;
        case 'value':
            var n = o.getAttribute('type');
            if (n == 'checkbox' || n == 'radio') return o.$.value != 'on';
            break;
        default:
        }
        return !!(m && m.specified);
    };
    (function () {
        var l = {
            canUndo: false,
            exec: function (n) {
                n.insertElement(n.document.createElement('hr'));
            }
        },
            m = 'horizontalrule';
        j.add(m, {
            init: function (n) {
                n.addCommand(m, l);
                n.ui.addButton('HorizontalRule', {
                    label: n.lang.horizontalrule,
                    command: m
                });
            }
        });
    })();
    (function () {
        var l = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
            m = '{cke_protected}';

        function n(Q) {
            var R = Q.children.length,
                S = Q.children[R - 1];
            while (S && S.type == 3 && !e.trim(S.value)) S = Q.children[--R];
            return S;
        };

        function o(Q, R) {
            var S = Q.children,
                T = n(Q);
            if (T) {
                if ((R || !c) && T.type == 1 && T.name == 'br') S.pop();
                if (T.type == 3 && l.test(T.value)) S.pop();
            }
        };

        function p(Q) {
            var R = n(Q);
            return !R || R.type == 1 && R.name == 'br' || Q.name == 'form' && R.name == 'input';
        };

        function q(Q) {
            o(Q, true);
            if (p(Q)) if (c) Q.add(new a.htmlParser.text('\xa0'));
            else Q.add(new a.htmlParser.element('br', {}));
        };

        function r(Q) {
            o(Q);
            if (p(Q)) Q.add(new a.htmlParser.text('\xa0'));
        };
        var s = f,
            t = e.extend({}, s.$block, s.$listItem, s.$tableContent);
        for (var u in t) {
            if (!('br' in s[u])) delete t[u];
        }
        delete t.pre;
        var v = {
            elements: {},
            attributeNames: [
                [/^on/, '_cke_pa_on']
            ]
        },
            w = {
                elements: {}
            };
        for (u in t) w.elements[u] = q;
        var x = {
            elementNames: [
                [/^cke:/, ''],
                [/^\?xml:namespace$/, '']
            ],
            attributeNames: [
                [/^_cke_(saved|pa)_/, ''],
                [/^_cke.*/, ''],
                ['hidefocus', '']
            ],
            elements: {
                $: function (Q) {
                    var R = Q.attributes;
                    if (R) {
                        if (R.cke_temp) return false;
                        var S = ['name', 'href', 'src'],
                            T;
                        for (var U = 0; U < S.length; U++) {
                            T = '_cke_saved_' + S[U];
                            T in R && delete R[S[U]];
                        }
                    }
                    return Q;
                },
                embed: function (Q) {
                    var R = Q.parent;
                    if (R && R.name == 'object') {
                        var S = R.attributes.width,
                            T = R.attributes.height;
                        S && (Q.attributes.width = S);
                        T && (Q.attributes.height = T);
                    }
                },
                param: function (Q) {
                    Q.children = [];
                    Q.isEmpty = true;
                    return Q;
                },
                a: function (Q) {
                    if (!(Q.children.length || Q.attributes.name || Q.attributes._cke_saved_name)) return false;
                },
                html: function (Q) {
                    delete Q.attributes.contenteditable;
                    delete Q.attributes['class'];
                },
                body: function (Q) {
                    delete Q.attributes.spellcheck;
                    delete Q.attributes.contenteditable;
                },
                style: function (Q) {
                    var R = Q.children[0];
                    R && R.value && (R.value = e.trim(R.value));
                    if (!Q.attributes.type) Q.attributes.type = 'text/css';
                },
                title: function (Q) {
                    Q.children[0].value = Q.attributes._cke_title;
                }
            },
            attributes: {
                'class': function (Q, R) {
                    return e.ltrim(Q.replace(/(?:^|\s+)cke_[^\s]*/g, '')) || false;
                }
            },
            comment: function (Q) {
                if (Q.substr(0, m.length) == m) {
                    if (Q.substr(m.length, 3) == '{C}') Q = Q.substr(m.length + 3);
                    else Q = Q.substr(m.length);
                    return new a.htmlParser.cdata(decodeURIComponent(Q));
                }
                return Q;
            }
        },
            y = {
                elements: {}
            };
        for (u in t) y.elements[u] = r;
        if (c) x.attributes.style = function (Q, R) {
            return Q.toLowerCase();
        };

        function z(Q) {
            Q.attributes.contenteditable = 'false';
        };

        function A(Q) {
            delete Q.attributes.contenteditable;
        };
        for (u in {
            input: 1,
            textarea: 1
        }) {
            v.elements[u] = z;
            x.elements[u] = A;
        }
        var B = /<(?:a|area|img|input)[\s\S]*?\s((?:href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+)))/gi,
            C = /(?:<style(?=[ >])[^>]*>[\s\S]*<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
            D = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
            E = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
            F = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
            G = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi;

        function H(Q) {
            return Q.replace(B, '$& _cke_saved_$1');
        };

        function I(Q) {
            return Q.replace(C, function (R) {
                return '<cke:encoded>' + encodeURIComponent(R) + '</cke:encoded>';
            });
        };

        function J(Q) {
            return Q.replace(D, function (R, S) {
                return decodeURIComponent(S);
            });
        };

        function K(Q) {
            return Q.replace(E, '$1cke:$2');
        };

        function L(Q) {
            return Q.replace(F, '$1$2');
        };

        function M(Q) {
            return Q.replace(G, '<cke:$1$2></cke:$1>');
        };

        function N(Q) {
            return Q.replace(/<!--(?!{cke_protected})[\s\S]+?-->/g, function (R) {
                return '<!--' + m + '{C}' + encodeURIComponent(R).replace(/--/g, '%2D%2D') + '-->';
            });
        };

        function O(Q) {
            return Q.replace(/<!--\{cke_protected\}\{C\}([\s\S]+?)-->/g, function (R, S) {
                return decodeURIComponent(S);
            });
        };

        function P(Q, R) {
            var S = [],
                T = /<\!--\{cke_temp(comment)?\}(\d*?)-->/g,
                U = [/<script[\s\S]*?<\/script>/gi, /<noscript[\s\S]*?<\/noscript>/gi].concat(R);
            Q = Q.replace(/<!--[\s\S]*?-->/g, function (W) {
                return '<!--{cke_tempcomment}' + (S.push(W) - 1) + '-->';
            });
            for (var V = 0; V < U.length; V++) Q = Q.replace(U[V], function (W) {
                W = W.replace(T, function (X, Y, Z) {
                    return S[Z];
                });
                return '<!--{cke_temp}' + (S.push(W) - 1) + '-->';
            });
            Q = Q.replace(T, function (W, X, Y) {
                return '<!--' + m + (X ? '{C}' : '') + encodeURIComponent(S[Y]).replace(/--/g, '%2D%2D') + '-->';
            });
            return Q;
        };
        j.add('htmldataprocessor', {
            requires: ['htmlwriter'],
            init: function (Q) {
                var R = Q.dataProcessor = new a.htmlDataProcessor(Q);
                R.writer.forceSimpleAmpersand = Q.config.forceSimpleAmpersand;
                R.dataFilter.addRules(v);
                R.dataFilter.addRules(w);
                R.htmlFilter.addRules(x);
                R.htmlFilter.addRules(y);
            }
        });
        a.htmlDataProcessor = function (Q) {
            var R = this;
            R.editor = Q;
            R.writer = new a.htmlWriter();
            R.dataFilter = new a.htmlParser.filter();
            R.htmlFilter = new a.htmlParser.filter();
        };
        a.htmlDataProcessor.prototype = {
            toHtml: function (Q, R) {
                Q = P(Q, this.editor.config.protectedSource);
                Q = H(Q);
                Q = I(Q);
                Q = K(Q);
                Q = M(Q);
                var S = new h('div');
                S.setHtml('a' + Q);
                Q = S.getHtml().substr(1);
                Q = L(Q);
                Q = J(Q);
                Q = O(Q);
                var T = a.htmlParser.fragment.fromHtml(Q, R),
                    U = new a.htmlParser.basicWriter();
                T.writeHtml(U, this.dataFilter);
                Q = U.getHtml(true);
                Q = N(Q);
                return Q;
            },
            toDataFormat: function (Q, R) {
                var S = this.writer,
                    T = a.htmlParser.fragment.fromHtml(Q, R);
                S.reset();
                T.writeHtml(S, this.htmlFilter);
                return S.getHtml(true);
            }
        };
    })();
    i.forceSimpleAmpersand = false;
    j.add('image', {
        init: function (l) {
            var m = 'image';
            a.dialog.add(m, this.path + 'dialogs/image.js');
            l.addCommand(m, new a.dialogCommand(m));
            l.ui.addButton('Image', {
                label: l.lang.common.image,
                command: m
            });
            l.on('doubleclick', function (n) {
                var o = n.data.element;
                if (o.is('img') && !o.getAttribute('_cke_realelement')) n.data.dialog = 'image';
            });
            if (l.addMenuItems) l.addMenuItems({
                image: {
                    label: l.lang.image.menu,
                    command: 'image',
                    group: 'image'
                }
            });
            if (l.contextMenu) l.contextMenu.addListener(function (n, o) {
                if (!n || !n.is('img') || n.getAttribute('_cke_realelement')) return null;
                return {
                    image: 2
                };
            });
        }
    });
    i.image_removeLinkByEmptyURL = true;
    (function () {
        var l = {
            ol: 1,
            ul: 1
        },
            m = d.walker.whitespaces(true),
            n = d.walker.bookmark(false, true);

        function o(v, w) {
            v.getCommand(this.name).setState(w);
        };

        function p(v) {
            var E = this;
            var w = v.editor,
                x = v.data.path,
                y = x && x.contains(l);
            if (y) return o.call(E, w, 2);
            if (!E.useIndentClasses && E.name == 'indent') return o.call(E, w, 2);
            var z = v.data.path,
                A = z.block || z.blockLimit;
            if (!A) return o.call(E, w, 0);
            if (E.useIndentClasses) {
                var B = A.$.className.match(E.classNameRegex),
                    C = 0;
                if (B) {
                    B = B[1];
                    C = E.indentClassMap[B];
                }
                if (E.name == 'outdent' && !C || E.name == 'indent' && C == w.config.indentClasses.length) return o.call(E, w, 0);
                return o.call(E, w, 2);
            } else {
                var D = parseInt(A.getStyle(E.indentCssProperty), 10);
                if (isNaN(D)) D = 0;
                if (D <= 0) return o.call(E, w, 0);
                return o.call(E, w, 2);
            }
        };

        function q(v, w, x) {
            var y = w.startContainer,
                z = w.endContainer;
            while (y && !y.getParent().equals(x)) y = y.getParent();
            while (z && !z.getParent().equals(x)) z = z.getParent();
            if (!y || !z) return;
            var A = y,
                B = [],
                C = false;
            while (!C) {
                if (A.equals(z)) C = true;
                B.push(A);
                A = A.getNext();
            }
            if (B.length < 1) return;
            var D = x.getParents(true);
            for (var E = 0; E < D.length; E++) {
                if (D[E].getName && l[D[E].getName()]) {
                    x = D[E];
                    break;
                }
            }
            var F = this.name == 'indent' ? 1 : -1,
                G = B[0],
                H = B[B.length - 1],
                I = {},
                J = j.list.listToArray(x, I),
                K = J[H.getCustomData('listarray_index')].indent;
            for (E = G.getCustomData('listarray_index'); E <= H.getCustomData('listarray_index'); E++) {
                J[E].indent += F;
                var L = J[E].parent;
                J[E].parent = new h(L.getName(), L.getDocument());
            }
            for (E = H.getCustomData('listarray_index') + 1; E < J.length && J[E].indent > K; E++) J[E].indent += F;
            var M = j.list.arrayToList(J, I, null, v.config.enterMode, 0);
            if (this.name == 'outdent') {
                var N;
                if ((N = x.getParent()) && N.is('li')) {
                    var O = M.listNode.getChildren(),
                        P = [],
                        Q = O.count(),
                        R;
                    for (E = Q - 1; E >= 0; E--) {
                        if ((R = O.getItem(E)) && R.is && R.is('li')) P.push(R);
                    }
                }
            }
            if (M) M.listNode.replace(x);
            if (P && P.length) for (E = 0; E < P.length; E++) {
                var S = P[E],
                    T = S;
                while ((T = T.getNext()) && T.is && T.getName() in l) {
                    if (c && !S.getFirst(function (U) {
                        return m(U) && n(U);
                    })) S.append(w.document.createText('\xa0'));
                    S.append(T);
                }
                S.insertAfter(N);
            }
            h.clearAllMarkers(I);
        };

        function r(v, w) {
            var x = w.createIterator(),
                y = v.config.enterMode;
            x.enforceRealBlocks = true;
            x.enlargeBr = y != 2;
            var z;
            while (z = x.getNextParagraph()) s.call(this, v, z);
        };

        function s(v, w) {
            var B = this;
            if (B.useIndentClasses) {
                var x = w.$.className.match(B.classNameRegex),
                    y = 0;
                if (x) {
                    x = x[1];
                    y = B.indentClassMap[x];
                }
                if (B.name == 'outdent') y--;
                else y++;
                if (y < 0) return false;
                y = Math.min(y, v.config.indentClasses.length);
                y = Math.max(y, 0);
                var z = e.ltrim(w.$.className.replace(B.classNameRegex, ''));
                if (y < 1) w.$.className = z;
                else w.addClass(v.config.indentClasses[y - 1]);
            } else {
                var A = parseInt(w.getStyle(B.indentCssProperty), 10);
                if (isNaN(A)) A = 0;
                A += (B.name == 'indent' ? 1 : -1) * v.config.indentOffset;
                if (A < 0) return false;
                A = Math.max(A, 0);
                A = Math.ceil(A / v.config.indentOffset) * v.config.indentOffset;
                w.setStyle(B.indentCssProperty, A ? A + v.config.indentUnit : '');
                if (w.getAttribute('style') === '') w.removeAttribute('style');
            }
            return true;
        };

        function t(v, w) {
            var y = this;
            y.name = w;
            y.useIndentClasses = v.config.indentClasses && v.config.indentClasses.length > 0;
            if (y.useIndentClasses) {
                y.classNameRegex = new RegExp('(?:^|\\s+)(' + v.config.indentClasses.join('|') + ')(?=$|\\s)');
                y.indentClassMap = {};
                for (var x = 0; x < v.config.indentClasses.length; x++) y.indentClassMap[v.config.indentClasses[x]] = x + 1;
            } else y.indentCssProperty = v.config.contentsLangDirection == 'ltr' ? 'margin-left' : 'margin-right';
            y.startDisabled = w == 'outdent';
        };

        function u(v) {
            return v.type = 1 && v.is('li');
        };
        t.prototype = {
            exec: function (v) {
                var w = v.getSelection(),
                    x = w && w.getRanges()[0],
                    y = x.startContainer,
                    z = x.endContainer,
                    A = x.getCommonAncestor(),
                    B = A;
                while (B && !(B.type == 1 && l[B.getName()])) B = B.getParent();
                if (B && y.type == 1 && y.getName() in l) {
                    var C = new d.walker(x);
                    C.evaluator = u;
                    x.startContainer = C.next();
                }
                if (B && z.type == 1 && z.getName() in l) {
                    C = new d.walker(x);
                    C.evaluator = u;
                    x.endContainer = C.previous();
                }
                var D = w.createBookmarks(true);
                if (B) {
                    var E = B.getFirst(function (H) {
                        return H.type == 1 && H.is('li');
                    }),
                        F = x.startContainer,
                        G = E.equals(F) || E.contains(F);
                    if (!(G && s.call(this, v, B))) q.call(this, v, x, B);
                } else r.call(this, v, x);
                v.focus();
                v.forceNextSelectionCheck();
                w.selectBookmarks(D);
            }
        };
        j.add('indent', {
            init: function (v) {
                var w = new t(v, 'indent'),
                    x = new t(v, 'outdent');
                v.addCommand('indent', w);
                v.addCommand('outdent', x);
                v.ui.addButton('Indent', {
                    label: v.lang.indent,
                    command: 'indent'
                });
                v.ui.addButton('Outdent', {
                    label: v.lang.outdent,
                    command: 'outdent'
                });
                v.on('selectionChange', e.bind(p, w));
                v.on('selectionChange', e.bind(p, x));
                if (b.ie6Compat || b.ie7Compat) v.addCss('ul,ol{\tmargin-left: 0px;\tpadding-left: 40px;}');
            },
            requires: ['domiterator', 'list']
        });
    })();
    e.extend(i, {
        indentOffset: 40,
        indentUnit: 'px',
        indentClasses: null
    });
    (function () {
        var l = /(-moz-|-webkit-|start|auto)/i;

        function m(p, q) {
            var r = q.block || q.blockLimit;
            if (!r || r.getName() == 'body') return 2;
            var s = r.getComputedStyle('text-align').replace(l, '');
            if (!s && this.isDefaultAlign || s == this.value) return 1;
            return 2;
        };

        function n(p) {
            var q = p.editor.getCommand(this.name);
            q.state = m.call(this, p.editor, p.data.path);
            q.fire('state');
        };

        function o(p, q, r) {
            var u = this;
            u.name = q;
            u.value = r;
            var s = p.config.contentsLangDirection;
            u.isDefaultAlign = r == 'left' && s == 'ltr' || r == 'right' && s == 'rtl';
            var t = p.config.justifyClasses;
            if (t) {
                switch (r) {
                case 'left':
                    u.cssClassName = t[0];
                    break;
                case 'center':
                    u.cssClassName = t[1];
                    break;
                case 'right':
                    u.cssClassName = t[2];
                    break;
                case 'justify':
                    u.cssClassName = t[3];
                    break;
                }
                u.cssClassRegex = new RegExp('(?:^|\\s+)(?:' + t.join('|') + ')(?=$|\\s)');
            }
        };
        o.prototype = {
            exec: function (p) {
                var z = this;
                var q = p.getSelection(),
                    r = p.config.enterMode;
                if (!q) return;
                var s = q.createBookmarks(),
                    t = q.getRanges(),
                    u = z.cssClassName,
                    v, w;
                for (var x = t.length - 1; x >= 0; x--) {
                    v = t[x].createIterator();
                    v.enlargeBr = r != 2;
                    while (w = v.getNextParagraph()) {
                        w.removeAttribute('align');
                        if (u) {
                            var y = w.$.className = e.ltrim(w.$.className.replace(z.cssClassRegex, ''));
                            if (z.state == 2 && !z.isDefaultAlign) w.addClass(u);
                            else if (!y) w.removeAttribute('class');
                        } else if (z.state == 2 && !z.isDefaultAlign) w.setStyle('text-align', z.value);
                        else w.removeStyle('text-align');
                    }
                }
                p.focus();
                p.forceNextSelectionCheck();
                q.selectBookmarks(s);
            }
        };
        j.add('justify', {
            init: function (p) {
                var q = new o(p, 'justifyleft', 'left'),
                    r = new o(p, 'justifycenter', 'center'),
                    s = new o(p, 'justifyright', 'right'),
                    t = new o(p, 'justifyblock', 'justify');
                p.addCommand('justifyleft', q);
                p.addCommand('justifycenter', r);
                p.addCommand('justifyright', s);
                p.addCommand('justifyblock', t);
                p.ui.addButton('JustifyLeft', {
                    label: p.lang.justify.left,
                    command: 'justifyleft'
                });
                p.ui.addButton('JustifyCenter', {
                    label: p.lang.justify.center,
                    command: 'justifycenter'
                });
                p.ui.addButton('JustifyRight', {
                    label: p.lang.justify.right,
                    command: 'justifyright'
                });
                p.ui.addButton('JustifyBlock', {
                    label: p.lang.justify.block,
                    command: 'justifyblock'
                });
                p.on('selectionChange', e.bind(n, q));
                p.on('selectionChange', e.bind(n, s));
                p.on('selectionChange', e.bind(n, r));
                p.on('selectionChange', e.bind(n, t));
            },
            requires: ['domiterator']
        });
    })();
    e.extend(i, {
        justifyClasses: null
    });
    j.add('keystrokes', {
        beforeInit: function (l) {
            l.keystrokeHandler = new a.keystrokeHandler(l);
            l.specialKeys = {};
        },
        init: function (l) {
            var m = l.config.keystrokes,
                n = l.config.blockedKeystrokes,
                o = l.keystrokeHandler.keystrokes,
                p = l.keystrokeHandler.blockedKeystrokes;
            for (var q = 0; q < m.length; q++) o[m[q][0]] = m[q][1];
            for (q = 0; q < n.length; q++) p[n[q]] = 1;
        }
    });
    a.keystrokeHandler = function (l) {
        var m = this;
        if (l.keystrokeHandler) return l.keystrokeHandler;
        m.keystrokes = {};
        m.blockedKeystrokes = {};
        m._ = {
            editor: l
        };
        return m;
    };
    (function () {
        var l, m = function (o) {
                o = o.data;
                var p = o.getKeystroke(),
                    q = this.keystrokes[p],
                    r = this._.editor;
                l = r.fire('key', {
                    keyCode: p
                }) === true;
                if (!l) {
                    if (q) {
                        var s = {
                            from: 'keystrokeHandler'
                        };
                        l = r.execCommand(q, s) !== false;
                    }
                    if (!l) {
                        var t = r.specialKeys[p];
                        l = t && t(r) === true;
                        if (!l) l = !! this.blockedKeystrokes[p];
                    }
                }
                if (l) o.preventDefault(true);
                return !l;
            },
            n = function (o) {
                if (l) {
                    l = false;
                    o.data.preventDefault(true);
                }
            };
        a.keystrokeHandler.prototype = {
            attach: function (o) {
                o.on('keydown', m, this);
                if (b.opera || b.gecko && b.mac) o.on('keypress', n, this);
            }
        };
    })();
    i.blockedKeystrokes = [1000 + 66, 1000 + 73, 1000 + 85];
    i.keystrokes = [
        [4000 + 121, 'toolbarFocus'],
        [4000 + 122, 'elementsPathFocus'],
        [2000 + 121, 'contextMenu'],
        [1000 + 2000 + 121, 'contextMenu'],
        [1000 + 90, 'undo'],
        [1000 + 89, 'redo'],
        [1000 + 2000 + 90, 'redo'],
        [1000 + 76, 'link'],
        [1000 + 66, 'bold'],
        [1000 + 73, 'italic'],
        [1000 + 85, 'underline'],
        [4000 + 109, 'toolbarCollapse'],
        [4000 + 48, 'a11yHelp']
    ];
    j.add('link', {
        init: function (l) {
            l.addCommand('link', new a.dialogCommand('link'));
            l.addCommand('anchor', new a.dialogCommand('anchor'));
            l.addCommand('unlink', new a.unlinkCommand());
            l.ui.addButton('Link', {
                label: l.lang.link.toolbar,
                command: 'link'
            });
            l.ui.addButton('Unlink', {
                label: l.lang.unlink,
                command: 'unlink'
            });
            l.ui.addButton('Anchor', {
                label: l.lang.anchor.toolbar,
                command: 'anchor'
            });
            a.dialog.add('link', this.path + 'dialogs/link.js');
            a.dialog.add('anchor', this.path + 'dialogs/anchor.js');
            l.addCss('img.cke_anchor{background-image: url(' + a.getUrl(this.path + 'images/anchor.gif') + ');' + 'background-position: center center;' + 'background-repeat: no-repeat;' + 'border: 1px solid #a9a9a9;' + 'width: 18px;' + 'height: 18px;' + '}\n' + 'a.cke_anchor' + '{' + 'background-image: url(' + a.getUrl(this.path + 'images/anchor.gif') + ');' + 'background-position: 0 center;' + 'background-repeat: no-repeat;' + 'border: 1px solid #a9a9a9;' + 'padding-left: 18px;' + '}');
            l.on('selectionChange', function (m) {
                var n = l.getCommand('unlink'),
                    o = m.data.path.lastElement.getAscendant('a', true);
                if (o && o.getName() == 'a' && o.getAttribute('href')) n.setState(2);
                else n.setState(0);
            });
            l.on('doubleclick', function (m) {
                var n = j.link.getSelectedLink(l) || m.data.element;
                if (n.is('a')) m.data.dialog = n.getAttribute('name') && !n.getAttribute('href') ? 'anchor' : 'link';
                else if (n.is('img') && n.getAttribute('_cke_real_element_type') == 'anchor') m.data.dialog = 'anchor';
            });
            if (l.addMenuItems) l.addMenuItems({
                anchor: {
                    label: l.lang.anchor.menu,
                    command: 'anchor',
                    group: 'anchor'
                },
                link: {
                    label: l.lang.link.menu,
                    command: 'link',
                    group: 'link',
                    order: 1
                },
                unlink: {
                    label: l.lang.unlink,
                    command: 'unlink',
                    group: 'link',
                    order: 5
                }
            });
            if (l.contextMenu) l.contextMenu.addListener(function (m, n) {
                if (!m) return null;
                var o = m.is('img') && m.getAttribute('_cke_real_element_type') == 'anchor';
                if (!o) {
                    if (!(m = j.link.getSelectedLink(l))) return null;
                    o = m.getAttribute('name') && !m.getAttribute('href');
                }
                return o ? {
                    anchor: 2
                } : {
                    link: 2,
                    unlink: 2
                };
            });
        },
        afterInit: function (l) {
            var m = l.dataProcessor,
                n = m && m.dataFilter;
            if (n) n.addRules({
                elements: {
                    a: function (o) {
                        var p = o.attributes;
                        if (p.name && !p.href) return l.createFakeParserElement(o, 'cke_anchor', 'anchor');
                    }
                }
            });
        },
        requires: ['fakeobjects']
    });
    j.link = {
        getSelectedLink: function (l) {
            var m;
            try {
                m = l.getSelection().getRanges()[0];
            } catch (o) {
                return null;
            }
            m.shrink(2);
            var n = m.getCommonAncestor();
            return n.getAscendant('a', true);
        }
    };
    a.unlinkCommand = function () {};
    a.unlinkCommand.prototype = {
        exec: function (l) {
            var m = l.getSelection(),
                n = m.createBookmarks(),
                o = m.getRanges(),
                p, q;
            for (var r = 0; r < o.length; r++) {
                p = o[r].getCommonAncestor(true);
                q = p.getAscendant('a', true);
                if (!q) continue;
                o[r].selectNodeContents(q);
            }
            m.selectRanges(o);
            l.document.$.execCommand('unlink', false, null);
            m.selectBookmarks(n);
        },
        startDisabled: true
    };
    e.extend(i, {
        linkShowAdvancedTab: true,
        linkShowTargetTab: true
    });
    (function () {
        var l = {
            ol: 1,
            ul: 1
        },
            m = /^[\n\r\t ]*$/;
        j.list = {
            listToArray: function (B, C, D, E, F) {
                if (!l[B.getName()]) return [];
                if (!E) E = 0;
                if (!D) D = [];
                for (var G = 0, H = B.getChildCount(); G < H; G++) {
                    var I = B.getChild(G);
                    if (I.$.nodeName.toLowerCase() != 'li') continue;
                    var J = {
                        parent: B,
                        indent: E,
                        element: I,
                        contents: []
                    };
                    if (!F) {
                        J.grandparent = B.getParent();
                        if (J.grandparent && J.grandparent.$.nodeName.toLowerCase() == 'li') J.grandparent = J.grandparent.getParent();
                    } else J.grandparent = F;
                    if (C) h.setMarker(C, I, 'listarray_index', D.length);
                    D.push(J);
                    for (var K = 0, L = I.getChildCount(), M; K < L; K++) {
                        M = I.getChild(K);
                        if (M.type == 1 && l[M.getName()]) j.list.listToArray(M, C, D, E + 1, J.grandparent);
                        else J.contents.push(M);
                    }
                }
                return D;
            },
            arrayToList: function (B, C, D, E) {
                if (!D) D = 0;
                if (!B || B.length < D + 1) return null;
                var F = B[D].parent.getDocument(),
                    G = new d.documentFragment(F),
                    H = null,
                    I = D,
                    J = Math.max(B[D].indent, 0),
                    K = null,
                    L = E == 1 ? 'p' : 'div';
                for (;;) {
                    var M = B[I];
                    if (M.indent == J) {
                        if (!H || B[I].parent.getName() != H.getName()) {
                            H = B[I].parent.clone(false, true);
                            G.append(H);
                        }
                        K = H.append(M.element.clone(false, true));
                        for (var N = 0; N < M.contents.length; N++) K.append(M.contents[N].clone(true, true));
                        I++;
                    } else if (M.indent == Math.max(J, 0) + 1) {
                        var O = j.list.arrayToList(B, null, I, E);
                        K.append(O.listNode);
                        I = O.nextIndex;
                    } else if (M.indent == -1 && !D && M.grandparent) {
                        K;
                        if (l[M.grandparent.getName()]) K = M.element.clone(false, true);
                        else if (E != 2 && M.grandparent.getName() != 'td') K = F.createElement(L);
                        else K = new d.documentFragment(F);
                        for (N = 0; N < M.contents.length; N++) K.append(M.contents[N].clone(true, true));
                        if (K.type == 11 && I != B.length - 1) {
                            if (K.getLast() && K.getLast().type == 1 && K.getLast().getAttribute('type') == '_moz') K.getLast().remove();
                            K.appendBogus();
                        }
                        if (K.type == 1 && K.getName() == L && K.$.firstChild) {
                            K.trim();
                            var P = K.getFirst();
                            if (P.type == 1 && P.isBlockBoundary()) {
                                var Q = new d.documentFragment(F);
                                K.moveChildren(Q);
                                K = Q;
                            }
                        }
                        var R = K.$.nodeName.toLowerCase();
                        if (!c && (R == 'div' || R == 'p')) K.appendBogus();
                        G.append(K);
                        H = null;
                        I++;
                    } else return null;
                    if (B.length <= I || Math.max(B[I].indent, 0) < J) break;
                }
                if (C) {
                    var S = G.getFirst();
                    while (S) {
                        if (S.type == 1) h.clearMarkers(C, S);
                        S = S.getNextSourceNode();
                    }
                }
                return {
                    listNode: G,
                    nextIndex: I
                };
            }
        };

        function n(B, C) {
            B.getCommand(this.name).setState(C);
        };

        function o(B) {
            var C = B.data.path,
                D = C.blockLimit,
                E = C.elements,
                F;
            for (var G = 0; G < E.length && (F = E[G]) && !F.equals(D); G++) {
                if (l[E[G].getName()]) return n.call(this, B.editor, this.type == E[G].getName() ? 1 : 2);
            }
            return n.call(this, B.editor, 2);
        };

        function p(B, C, D, E) {
            var F = j.list.listToArray(C.root, D),
                G = [];
            for (var H = 0; H < C.contents.length; H++) {
                var I = C.contents[H];
                I = I.getAscendant('li', true);
                if (!I || I.getCustomData('list_item_processed')) continue;
                G.push(I);
                h.setMarker(D, I, 'list_item_processed', true);
            }
            var J = C.root.getDocument().createElement(this.type);
            for (H = 0; H < G.length; H++) {
                var K = G[H].getCustomData('listarray_index');
                F[K].parent = J;
            }
            var L = j.list.arrayToList(F, D, null, B.config.enterMode),
                M, N = L.listNode.getChildCount();
            for (H = 0; H < N && (M = L.listNode.getChild(H)); H++) {
                if (M.getName() == this.type) E.push(M);
            }
            L.listNode.replace(C.root);
        };
        var q = /^h[1-6]$/;

        function r(B, C, D) {
            var E = C.contents,
                F = C.root.getDocument(),
                G = [];
            if (E.length == 1 && E[0].equals(C.root)) {
                var H = F.createElement('div');
                E[0].moveChildren && E[0].moveChildren(H);
                E[0].append(H);
                E[0] = H;
            }
            var I = C.contents[0].getParent();
            for (var J = 0; J < E.length; J++) I = I.getCommonAncestor(E[J].getParent());
            for (J = 0; J < E.length; J++) {
                var K = E[J],
                    L;
                while (L = K.getParent()) {
                    if (L.equals(I)) {
                        G.push(K);
                        break;
                    }
                    K = L;
                }
            }
            if (G.length < 1) return;
            var M = G[G.length - 1].getNext(),
                N = F.createElement(this.type);
            D.push(N);
            while (G.length) {
                var O = G.shift(),
                    P = F.createElement('li');
                if (q.test(O.getName())) O.appendTo(P);
                else {
                    O.copyAttributes(P);
                    O.moveChildren(P);
                    O.remove();
                }
                P.appendTo(N);
                if (!c) P.appendBogus();
            }
            if (M) N.insertBefore(M);
            else N.appendTo(I);
        };

        function s(B, C, D) {
            var E = j.list.listToArray(C.root, D),
                F = [];
            for (var G = 0; G < C.contents.length; G++) {
                var H = C.contents[G];
                H = H.getAscendant('li', true);
                if (!H || H.getCustomData('list_item_processed')) continue;
                F.push(H);
                h.setMarker(D, H, 'list_item_processed', true);
            }
            var I = null;
            for (G = 0; G < F.length; G++) {
                var J = F[G].getCustomData('listarray_index');
                E[J].indent = -1;
                I = J;
            }
            for (G = I + 1; G < E.length; G++) {
                if (E[G].indent > E[G - 1].indent + 1) {
                    var K = E[G - 1].indent + 1 - E[G].indent,
                        L = E[G].indent;
                    while (E[G] && E[G].indent >= L) {
                        E[G].indent += K;
                        G++;
                    }
                    G--;
                }
            }
            var M = j.list.arrayToList(E, D, null, B.config.enterMode),
                N = M.listNode,
                O, P;

            function Q(R) {
                if ((O = N[R ? 'getFirst' : 'getLast']()) && !(O.is && O.isBlockBoundary()) && (P = C.root[R ? 'getPrevious' : 'getNext'](d.walker.whitespaces(true))) && !(P.is && P.isBlockBoundary({
                    br: 1
                }))) B.document.createElement('br')[R ? 'insertBefore' : 'insertAfter'](O);
            };
            Q(true);
            Q();
            N.replace(C.root);
        };

        function t(B, C) {
            this.name = B;
            this.type = C;
        };
        t.prototype = {
            exec: function (B) {
                B.focus();
                var C = B.document,
                    D = B.getSelection(),
                    E = D && D.getRanges();
                if (!E || E.length < 1) return;
                if (this.state == 2) {
                    var F = C.getBody();
                    F.trim();
                    if (!F.getFirst()) {
                        var G = C.createElement(B.config.enterMode == 1 ? 'p' : B.config.enterMode == 3 ? 'div' : 'br');
                        G.appendTo(F);
                        E = [new d.range(C)];
                        if (G.is('br')) {
                            E[0].setStartBefore(G);
                            E[0].setEndAfter(G);
                        } else E[0].selectNodeContents(G);
                        D.selectRanges(E);
                    } else {
                        var H = E.length == 1 && E[0],
                            I = H && H.getEnclosedNode();
                        if (I && I.is && this.type == I.getName()) n.call(this, B, 1);
                    }
                }
                var J = D.createBookmarks(true),
                    K = [],
                    L = {};
                while (E.length > 0) {
                    H = E.shift();
                    var M = H.getBoundaryNodes(),
                        N = M.startNode,
                        O = M.endNode;
                    if (N.type == 1 && N.getName() == 'td') H.setStartAt(M.startNode, 1);
                    if (O.type == 1 && O.getName() == 'td') H.setEndAt(M.endNode, 2);
                    var P = H.createIterator(),
                        Q;
                    P.forceBrBreak = this.state == 2;
                    while (Q = P.getNextParagraph()) {
                        var R = new d.elementPath(Q),
                            S = R.elements,
                            T = S.length,
                            U = null,
                            V = false,
                            W = R.blockLimit,
                            X;
                        for (var Y = T - 1; Y >= 0 && (X = S[Y]); Y--) {
                            if (l[X.getName()] && W.contains(X)) {
                                W.removeCustomData('list_group_object');
                                var Z = X.getCustomData('list_group_object');
                                if (Z) Z.contents.push(Q);
                                else {
                                    Z = {
                                        root: X,
                                        contents: [Q]
                                    };
                                    K.push(Z);
                                    h.setMarker(L, X, 'list_group_object', Z);
                                }
                                V = true;
                                break;
                            }
                        }
                        if (V) continue;
                        var aa = W;
                        if (aa.getCustomData('list_group_object')) aa.getCustomData('list_group_object').contents.push(Q);
                        else {
                            Z = {
                                root: aa,
                                contents: [Q]
                            };
                            h.setMarker(L, aa, 'list_group_object', Z);
                            K.push(Z);
                        }
                    }
                }
                var ab = [];
                while (K.length > 0) {
                    Z = K.shift();
                    if (this.state == 2) {
                        if (l[Z.root.getName()]) p.call(this, B, Z, L, ab);
                        else r.call(this, B, Z, ab);
                    } else if (this.state == 1 && l[Z.root.getName()]) s.call(this, B, Z, L);
                }
                for (Y = 0; Y < ab.length; Y++) {
                    U = ab[Y];
                    var ac, ad = this;
                    (ac = function (ae) {
                        var af = U[ae ? 'getPrevious' : 'getNext'](d.walker.whitespaces(true));
                        if (af && af.getName && af.getName() == ad.type) {
                            af.remove();
                            af.moveChildren(U, ae ? true : false);
                        }
                    })();
                    ac(true);
                }
                h.clearAllMarkers(L);
                D.selectBookmarks(J);
                B.focus();
            }
        };
        var u = f,
            v = /[\t\r\n ]*(?:&nbsp;|\xa0)$/;

        function w(B, C) {
            var D, E = B.children,
                F = E.length;
            for (var G = 0; G < F; G++) {
                D = E[G];
                if (D.name && D.name in C) return G;
            }
            return F;
        };

        function x(B) {
            return function (C) {
                var D = C.children,
                    E = w(C, u.$list),
                    F = D[E],
                    G = F && F.previous,
                    H;
                if (G && (G.name && G.name == 'br' || G.value && (H = G.value.match(v)))) {
                    var I = G;
                    if (!(H && H.index) && I == D[0]) D[0] = B || c ? new a.htmlParser.text('\xa0') : new a.htmlParser.element('br', {});
                    else if (I.name == 'br') D.splice(E - 1, 1);
                    else I.value = I.value.replace(v, '');
                }
            };
        };
        var y = {
            elements: {}
        };
        for (var z in u.$listItem) y.elements[z] = x();
        var A = {
            elements: {}
        };
        for (z in u.$listItem) A.elements[z] = x(true);
        j.add('list', {
            init: function (B) {
                var C = new t('numberedlist', 'ol'),
                    D = new t('bulletedlist', 'ul');
                B.addCommand('numberedlist', C);
                B.addCommand('bulletedlist', D);
                B.ui.addButton('NumberedList', {
                    label: B.lang.numberedlist,
                    command: 'numberedlist'
                });
                B.ui.addButton('BulletedList', {
                    label: B.lang.bulletedlist,
                    command: 'bulletedlist'
                });
                B.on('selectionChange', e.bind(o, C));
                B.on('selectionChange', e.bind(o, D));
            },
            afterInit: function (B) {
                var C = B.dataProcessor;
                if (C) {
                    C.dataFilter.addRules(y);
                    C.htmlFilter.addRules(A);
                }
            },
            requires: ['domiterator']
        });
    })();
    (function () {
        j.liststyle = {
            init: function (l) {
                l.addCommand('numberedListStyle', new a.dialogCommand('numberedListStyle'));
                a.dialog.add('numberedListStyle', this.path + 'dialogs/liststyle.js');
                l.addCommand('bulletedListStyle', new a.dialogCommand('bulletedListStyle'));
                a.dialog.add('bulletedListStyle', this.path + 'dialogs/liststyle.js');
                l.addMenuGroup('list', 108);
                if (l.addMenuItems) l.addMenuItems({
                    numberedlist: {
                        label: l.lang.list.numberedTitle,
                        group: 'list',
                        command: 'numberedListStyle'
                    },
                    bulletedlist: {
                        label: l.lang.list.bulletedTitle,
                        group: 'list',
                        command: 'bulletedListStyle'
                    }
                });
                if (l.contextMenu) l.contextMenu.addListener(function (m, n) {
                    if (!m) return null;
                    if (m.getAscendant('ol')) return {
                        numberedlist: 2
                    };
                    if (m.getAscendant('ul')) return {
                        bulletedlist: 2
                    };
                });
            }
        };
        j.add('liststyle', j.liststyle);
    })();
    (function () {
        function l(r) {
            if (!r || r.type != 1 || r.getName() != 'form') return [];
            var s = [],
                t = ['style', 'className'];
            for (var u = 0; u < t.length; u++) {
                var v = t[u],
                    w = r.$.elements.namedItem(v);
                if (w) {
                    var x = new h(w);
                    s.push([x, x.nextSibling]);
                    x.remove();
                }
            }
            return s;
        };

        function m(r, s) {
            if (!r || r.type != 1 || r.getName() != 'form') return;
            if (s.length > 0) for (var t = s.length - 1; t >= 0; t--) {
                var u = s[t][0],
                    v = s[t][1];
                if (v) u.insertBefore(v);
                else u.appendTo(r);
            }
        };

        function n(r, s) {
            var t = l(r),
                u = {},
                v = r.$;
            if (!s) {
                u['class'] = v.className || '';
                v.className = '';
            }
            u.inline = v.style.cssText || '';
            if (!s) v.style.cssText = 'position: static; overflow: visible';
            m(t);
            return u;
        };

        function o(r, s) {
            var t = l(r),
                u = r.$;
            if ('class' in s) u.className = s['class'];
            if ('inline' in s) u.style.cssText = s.inline;
            m(t);
        };

        function p(r) {
            var s = a.instances;
            for (var t in s) {
                var u = s[t];
                if (u.mode == 'wysiwyg') {
                    var v = u.document.getBody();
                    v.setAttribute('contentEditable', false);
                    v.setAttribute('contentEditable', true);
                }
            }
            if (r.focusManager.hasFocus) {
                r.toolbox.focus();
                r.focus();
            }
        };

        function q(r) {
            if (!c || b.version > 6) return null;
            var s = h.createFromHtml('<iframe frameborder="0" tabindex="-1" src="javascript:void((function(){document.open();' + (b.isCustomDomain() ? "document.domain='" + this.getDocument().$.domain + "';" : '') + 'document.close();' + '})())"' + ' style="display:block;position:absolute;z-index:-1;' + 'progid:DXImageTransform.Microsoft.Alpha(opacity=0);' + '"></iframe>');
            return r.append(s, true);
        };
        j.add('maximize', {
            init: function (r) {
                var s = r.lang,
                    t = a.document,
                    u = t.getWindow(),
                    v, w, x, y;

                function z() {
                    var B = u.getViewPaneSize();
                    y && y.setStyles({
                        width: B.width + 'px',
                        height: B.height + 'px'
                    });
                    r.resize(B.width, B.height, null, true);
                };
                var A = 2;
                r.addCommand('maximize', {
                    modes: {
                        wysiwyg: 1,
                        source: 1
                    },
                    editorFocus: false,
                    exec: function () {
                        var B = r.container.getChild(1),
                            C = r.getThemeSpace('contents');
                        if (r.mode == 'wysiwyg') {
                            var D = r.getSelection();
                            v = D && D.getRanges();
                            w = u.getScrollPosition();
                        } else {
                            var E = r.textarea.$;
                            v = !c && [E.selectionStart, E.selectionEnd];
                            w = [E.scrollLeft, E.scrollTop];
                        }
                        if (this.state == 2) {
                            u.on('resize', z);
                            x = u.getScrollPosition();
                            var F = r.container;
                            while (F = F.getParent()) {
                                F.setCustomData('maximize_saved_styles', n(F));
                                F.setStyle('z-index', r.config.baseFloatZIndex - 1);
                            }
                            C.setCustomData('maximize_saved_styles', n(C, true));
                            B.setCustomData('maximize_saved_styles', n(B, true));
                            if (c) t.$.documentElement.style.overflow = t.getBody().$.style.overflow = 'hidden';
                            else t.getBody().setStyles({
                                overflow: 'hidden',
                                width: '0px',
                                height: '0px'
                            });
                            c ? setTimeout(function () {
                                u.$.scrollTo(0, 0);
                            }, 0) : u.$.scrollTo(0, 0);
                            var G = u.getViewPaneSize();
                            B.setStyle('position', 'absolute');
                            B.$.offsetLeft;
                            B.setStyles({
                                'z-index': r.config.baseFloatZIndex - 1,
                                left: '0px',
                                top: '0px'
                            });
                            y = q(B);
                            z();
                            var H = B.getDocumentPosition();
                            B.setStyles({
                                left: -1 * H.x + 'px',
                                top: -1 * H.y + 'px'
                            });
                            b.gecko && p(r);
                            B.addClass('cke_maximized');
                        } else if (this.state == 1) {
                            u.removeListener('resize', z);
                            var I = [C, B];
                            for (var J = 0; J < I.length; J++) {
                                o(I[J], I[J].getCustomData('maximize_saved_styles'));
                                I[J].removeCustomData('maximize_saved_styles');
                            }
                            F = r.container;
                            while (F = F.getParent()) {
                                o(F, F.getCustomData('maximize_saved_styles'));
                                F.removeCustomData('maximize_saved_styles');
                            }
                            c ? setTimeout(function () {
                                u.$.scrollTo(x.x, x.y);
                            }, 0) : u.$.scrollTo(x.x, x.y);
                            B.removeClass('cke_maximized');
                            if (y) {
                                y.remove();
                                y = null;
                            }
                            r.fire('resize');
                        }
                        this.toggleState();
                        var K = this.uiItems[0],
                            L = this.state == 2 ? s.maximize : s.minimize,
                            M = r.element.getDocument().getById(K._.id);
                        M.getChild(1).setHtml(L);
                        M.setAttribute('title', L);
                        M.setAttribute('href', 'javascript:void("' + L + '");');
                        if (r.mode == 'wysiwyg') {
                            if (v) {
                                b.gecko && p(r);
                                r.getSelection().selectRanges(v);
                                var N = r.getSelection().getStartElement();
                                N && N.scrollIntoView(true);
                            } else u.$.scrollTo(w.x, w.y);
                        } else {
                            if (v) {
                                E.selectionStart = v[0];
                                E.selectionEnd = v[1];
                            }
                            E.scrollLeft = w[0];
                            E.scrollTop = w[1];
                        }
                        v = w = null;
                        A = this.state;
                    },
                    canUndo: false
                });
                r.ui.addButton('Maximize', {
                    label: s.maximize,
                    command: 'maximize'
                });
                r.on('mode', function () {
                    r.getCommand('maximize').setState(A);
                }, null, null, 100);
            }
        });
    })();
    j.add('newpage', {
        init: function (l) {
            l.addCommand('newpage', {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                exec: function (m) {
                    var n = this;
                    m.setData(m.config.newpage_html, function () {
                        setTimeout(function () {
                            m.fire('afterCommandExec', {
                                name: n.name,
                                command: n
                            });
                        }, 200);
                    });
                    m.focus();
                },
                async: true
            });
            l.ui.addButton('NewPage', {
                label: l.lang.newPage,
                command: 'newpage'
            });
        }
    });
    i.newpage_html = '';
    j.add('pagebreak', {
        init: function (l) {
            l.addCommand('pagebreak', j.pagebreakCmd);
            l.ui.addButton('PageBreak', {
                label: l.lang.pagebreak,
                command: 'pagebreak'
            });
            l.addCss('img.cke_pagebreak{background-image: url(' + a.getUrl(this.path + 'images/pagebreak.gif') + ');' + 'background-position: center center;' + 'background-repeat: no-repeat;' + 'clear: both;' + 'display: block;' + 'float: none;' + 'width:100%;_width:99.9%;' + 'border-top: #999999 1px dotted;' + 'border-bottom: #999999 1px dotted;' + 'height: 5px;' + 'page-break-after: always;' + '}');
        },
        afterInit: function (l) {
            var m = l.dataProcessor,
                n = m && m.dataFilter;
            if (n) n.addRules({
                elements: {
                    div: function (o) {
                        var p = o.attributes,
                            q = p && p.style,
                            r = q && o.children.length == 1 && o.children[0],
                            s = r && r.name == 'span' && r.attributes.style;
                        if (s && /page-break-after\s*:\s*always/i.test(q) && /display\s*:\s*none/i.test(s)) return l.createFakeParserElement(o, 'cke_pagebreak', 'div');
                    }
                }
            });
        },
        requires: ['fakeobjects']
    });
    j.pagebreakCmd = {
        exec: function (l) {
            var m = h.createFromHtml('<div style="page-break-after: always;"><span style="display: none;">&nbsp;</span></div>');
            m = l.createFakeElement(m, 'cke_pagebreak', 'div');
            var n = l.getSelection().getRanges();
            l.fire('saveSnapshot');
            for (var o, p = 0; p < n.length; p++) {
                o = n[p];
                if (p > 0) m = m.clone(true);
                o.splitBlock('p');
                o.insertNode(m);
                if (p == n.length - 1) {
                    o.moveToPosition(m, 4);
                    o.select();
                }
            }
            l.fire('saveSnapshot');
        }
    };
    (function () {
        j.add('pastefromword', {
            init: function (l) {
                var m = 0,
                    n = function () {
                        setTimeout(function () {
                            m = 0;
                        }, 0);
                    };
                l.addCommand('pastefromword', {
                    canUndo: false,
                    exec: function () {
                        m = 1;
                        if (l.execCommand('paste') === false) l.on('dialogHide', function (o) {
                            o.removeListener();
                            n();
                        });
                        else n();
                    }
                });
                l.ui.addButton('PasteFromWord', {
                    label: l.lang.pastefromword.toolbar,
                    command: 'pastefromword'
                });
                l.on('paste', function (o) {
                    var p = o.data,
                        q;
                    if ((q = p.html) && (m || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(q))) {
                        var r = this.loadFilterRules(function () {
                            if (r) l.fire('paste', p);
                            else if (!l.config.pasteFromWordPromptCleanup || m || confirm(l.lang.pastefromword.confirmCleanup)) p.html = a.cleanWord(q, l);
                        });
                        r && o.cancel();
                    }
                }, this);
            },
            loadFilterRules: function (l) {
                var m = a.cleanWord;
                if (m) l();
                else {
                    var n = a.getUrl(i.pasteFromWordCleanupFile || this.path + 'filter/default.js');
                    a.scriptLoader.load(n, l, null, false, true);
                }
                return !m;
            }
        });
    })();
    (function () {
        var l = {
            exec: function (o) {
                var p = e.tryThese(function () {
                    var q = window.clipboardData.getData('Text');
                    if (!q) throw 0;
                    return q;
                }, function () {
                    window.netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
                    var q = window.Components.classes['@mozilla.org/widget/clipboard;1'].getService(window.Components.interfaces.nsIClipboard),
                        r = window.Components.classes['@mozilla.org/widget/transferable;1'].createInstance(window.Components.interfaces.nsITransferable);
                    r.addDataFlavor('text/unicode');
                    q.getData(r, q.kGlobalClipboard);
                    var s = {},
                        t = {},
                        u;
                    r.getTransferData('text/unicode', s, t);
                    s = s.value.QueryInterface(window.Components.interfaces.nsISupportsString);
                    u = s.data.substring(0, t.value / 2);
                    return u;
                });
                if (!p) {
                    o.openDialog('pastetext');
                    return false;
                } else o.fire('paste', {
                    text: p
                });
                return true;
            }
        };

        function m(o, p) {
            if (c) {
                var q = o.selection;
                if (q.type == 'Control') q.clear();
                q.createRange().pasteHTML(p);
            } else o.execCommand('inserthtml', false, p);
        };
        j.add('pastetext', {
            init: function (o) {
                var p = 'pastetext',
                    q = o.addCommand(p, l);
                o.ui.addButton('PasteText', {
                    label: o.lang.pasteText.button,
                    command: p
                });
                a.dialog.add(p, a.getUrl(this.path + 'dialogs/pastetext.js'));
                if (o.config.forcePasteAsPlainText) o.on('beforeCommandExec', function (r) {
                    if (r.data.name == 'paste') {
                        o.execCommand('pastetext');
                        r.cancel();
                    }
                }, null, null, 0);
            },
            requires: ['clipboard']
        });

        function n(o, p, q, r) {
            while (q--) j.enterkey[p == 2 ? 'enterBr' : 'enterBlock'](o, p, null, r);
        };
        a.editor.prototype.insertText = function (o) {
            this.focus();
            this.fire('saveSnapshot');
            var p = this.getSelection().getStartElement().hasAscendant('pre', true) ? 2 : this.config.enterMode,
                q = p == 2,
                r = this.document.$,
                s = this,
                t;
            o = e.htmlEncode(o.replace(/\r\n|\r/g, '\n'));
            var u = 0;
            o.replace(/\n+/g, function (v, w) {
                t = o.substring(u, w);
                u = w + v.length;
                t.length && m(r, t);
                var x = v.length,
                    y = q ? 0 : Math.floor(x / 2),
                    z = q ? x : x % 2;
                n(s, p, y);
                n(s, 2, z, q ? false : true);
            });
            t = o.substring(u, o.length);
            t.length && m(r, t);
            this.fire('saveSnapshot');
        };
    })();
    j.add('popup');
    e.extend(a.editor.prototype, {
        popup: function (l, m, n) {
            m = m || '80%';
            n = n || '70%';
            if (typeof m == 'string' && m.length > 1 && m.substr(m.length - 1, 1) == '%') m = parseInt(window.screen.width * parseInt(m, 10) / 100, 10);
            if (typeof n == 'string' && n.length > 1 && n.substr(n.length - 1, 1) == '%') n = parseInt(window.screen.height * parseInt(n, 10) / 100, 10);
            if (m < 640) m = 640;
            if (n < 420) n = 420;
            var o = parseInt((window.screen.height - n) / 2, 10),
                p = parseInt((window.screen.width - m) / 2, 10),
                q = 'scrollbars=yes,location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,width=' + m + ',height=' + n + ',top=' + o + ',left=' + p,
                r = window.open('', null, q, true);
            if (!r) return false;
            try {
                r.moveTo(p, o);
                r.resizeTo(m, n);
                r.focus();
                r.location.href = l;
            } catch (s) {
                r = window.open(l, null, q, true);
            }
            return true;
        }
    });
    (function () {
        var l = {
            modes: {
                wysiwyg: 1,
                source: 1
            },
            canUndo: false,
            exec: function (n) {
                var o, p = n.config,
                    q = p.baseHref ? '<base href="' + p.baseHref + '"/>' : '',
                    r = b.isCustomDomain();
                if (p.fullPage) o = n.getData().replace(/<head>/, '$&' + q).replace(/[^>]*(?=<\/title>)/, n.lang.preview);
                else {
                    var s = '<body ',
                        t = n.document && n.document.getBody();
                    if (t) {
                        if (t.getAttribute('id')) s += 'id="' + t.getAttribute('id') + '" ';
                        if (t.getAttribute('class')) s += 'class="' + t.getAttribute('class') + '" ';
                    }
                    s += '>';
                    o = n.config.docType + '<html dir="' + n.config.contentsLangDirection + '">' + '<head>' + q + '<title>' + n.lang.preview + '</title>' + e.buildStyleHtml(n.config.contentsCss) + '</head>' + s + n.getData() + '</body></html>';
                }
                var u = 640,
                    v = 420,
                    w = 80;
                try {
                    var x = window.screen;
                    u = Math.round(x.width * 0.8);
                    v = Math.round(x.height * 0.7);
                    w = Math.round(x.width * 0.1);
                } catch (A) {}
                var y = '';
                if (r) {
                    window._cke_htmlToLoad = o;
                    y = 'javascript:void( (function(){document.open();document.domain="' + document.domain + '";' + 'document.write( window.opener._cke_htmlToLoad );' + 'document.close();' + 'window.opener._cke_htmlToLoad = null;' + '})() )';
                }
                var z = window.open(y, null, 'toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=' + u + ',height=' + v + ',left=' + w);
                if (!r) {
                    z.document.open();
                    z.document.write(o);
                    z.document.close();
                }
            }
        },
            m = 'preview';
        j.add(m, {
            init: function (n) {
                n.addCommand(m, l);
                n.ui.addButton('Preview', {
                    label: n.lang.preview,
                    command: m
                });
            }
        });
    })();
    j.add('print', {
        init: function (l) {
            var m = 'print',
                n = l.addCommand(m, j.print);
            l.ui.addButton('Print', {
                label: l.lang.print,
                command: m
            });
        }
    });
    j.print = {
        exec: function (l) {
            if (b.opera) return;
            else if (b.gecko) l.window.$.print();
            else l.document.$.execCommand('Print');
        },
        canUndo: false,
        modes: {
            wysiwyg: !b.opera
        }
    };
    j.add('removeformat', {
        requires: ['selection'],
        init: function (l) {
            l.addCommand('removeFormat', j.removeformat.commands.removeformat);
            l.ui.addButton('RemoveFormat', {
                label: l.lang.removeFormat,
                command: 'removeFormat'
            });
            l._.removeFormat = {
                filters: []
            };
        }
    });
    j.removeformat = {
        commands: {
            removeformat: {
                exec: function (l) {
                    var m = l._.removeFormatRegex || (l._.removeFormatRegex = new RegExp('^(?:' + l.config.removeFormatTags.replace(/,/g, '|') + ')$', 'i')),
                        n = l._.removeAttributes || (l._.removeAttributes = l.config.removeFormatAttributes.split(',')),
                        o = j.removeformat.filter,
                        p = l.getSelection().getRanges();
                    for (var q = 0, r; r = p[q]; q++) {
                        if (r.collapsed) continue;
                        r.enlarge(1);
                        var s = r.createBookmark(),
                            t = s.startNode,
                            u = s.endNode,
                            v = function (y) {
                                var z = new d.elementPath(y),
                                    A = z.elements;
                                for (var B = 1, C; C = A[B]; B++) {
                                    if (C.equals(z.block) || C.equals(z.blockLimit)) break;
                                    if (m.test(C.getName()) && o(l, C)) y.breakParent(C);
                                }
                            };
                        v(t);
                        v(u);
                        var w = t.getNextSourceNode(true, 1);
                        while (w) {
                            if (w.equals(u)) break;
                            var x = w.getNextSourceNode(false, 1);
                            if (!(w.getName() == 'img' && w.getAttribute('_cke_realelement')) && o(l, w)) if (m.test(w.getName())) w.remove(true);
                            else w.removeAttributes(n);
                            w = x;
                        }
                        r.moveToBookmark(s);
                    }
                    l.getSelection().selectRanges(p);
                }
            }
        },
        filter: function (l, m) {
            var n = l._.removeFormat.filters;
            for (var o = 0; o < n.length; o++) {
                if (n[o](m) === false) return false;
            }
            return true;
        }
    };
    a.editor.prototype.addRemoveFormatFilter = function (l) {
        this._.removeFormat.filters.push(l);
    };
    i.removeFormatTags = 'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var';
    i.removeFormatAttributes = 'class,style,lang,width,height,align,hspace,valign';
    j.add('resize', {
        init: function (l) {
            var m = l.config;
            if (m.resize_enabled) {
                var n = null,
                    o, p, q = (m.resize_dir == 'both' || m.resize_dir == 'horizontal') && m.resize_minWidth != m.resize_maxWidth,
                    r = (m.resize_dir == 'both' || m.resize_dir == 'vertical') && m.resize_minHeight != m.resize_maxHeight;

                function s(v) {
                    var w = v.data.$.screenX - o.x,
                        x = v.data.$.screenY - o.y,
                        y = p.width,
                        z = p.height,
                        A = y + w * (l.lang.dir == 'rtl' ? -1 : 1),
                        B = z + x;
                    if (q) y = Math.max(m.resize_minWidth, Math.min(A, m.resize_maxWidth));
                    if (r) z = Math.max(m.resize_minHeight, Math.min(B, m.resize_maxHeight));
                    l.resize(y, z);
                };

                function t(v) {
                    a.document.removeListener('mousemove', s);
                    a.document.removeListener('mouseup', t);
                    if (l.document) {
                        l.document.removeListener('mousemove', s);
                        l.document.removeListener('mouseup', t);
                    }
                };
                var u = e.addFunction(function (v) {
                    if (!n) n = l.getResizable();
                    p = {
                        width: n.$.offsetWidth || 0,
                        height: n.$.offsetHeight || 0
                    };
                    o = {
                        x: v.screenX,
                        y: v.screenY
                    };
                    a.document.on('mousemove', s);
                    a.document.on('mouseup', t);
                    if (l.document) {
                        l.document.on('mousemove', s);
                        l.document.on('mouseup', t);
                    }
                });
                l.on('destroy', function () {
                    e.removeFunction(u);
                });
                l.on('themeSpace', function (v) {
                    if (v.data.space == 'bottom') {
                        var w = '';
                        if (q && !r) w = ' cke_resizer_horizontal';
                        if (!q && r) w = ' cke_resizer_vertical';
                        v.data.html += '<div class="cke_resizer' + w + '"' + ' title="' + e.htmlEncode(l.lang.resize) + '"' + ' onmousedown="CKEDITOR.tools.callFunction(' + u + ', event)"' + '></div>';
                    }
                }, l, null, 100);
            }
        }
    });
    i.resize_minWidth = 750;
    i.resize_minHeight = 250;
    i.resize_maxWidth = 3000;
    i.resize_maxHeight = 3000;
    i.resize_enabled = true;
    i.resize_dir = 'both';
    (function () {
        var l = {
            modes: {
                wysiwyg: 1,
                source: 1
            },
            exec: function (n) {
                var o = n.element.$.form;
                if (o) try {
                    o.submit();
                } catch (p) {
                    if (o.submit.click) o.submit.click();
                }
            }
        },
            m = 'save';
        j.add(m, {
            init: function (n) {
                var o = n.addCommand(m, l);
                o.modes = {
                    wysiwyg: !! n.element.$.form
                };
                n.ui.addButton('Save', {
                    label: n.lang.save,
                    command: m
                });
            }
        });
    })();
    (function () {
        var l = 'scaytcheck',
            m = '';

        function n(s, t) {
            var u = false,
                v;
            for (v in t) {
                if (t[v] === s || t[v] == s) {
                    u = true;
                    break;
                }
            }
            return u;
        };
        var o = function () {
                var s = this,
                    t = function () {
                        var x = {};
                        x.srcNodeRef = s.document.getWindow().$.frameElement;
                        x.assocApp = 'CKEDITOR.' + a.version + '@' + a.revision;
                        x.customerid = s.config.scayt_customerid || '1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2';
                        x.customDictionaryIds = s.config.scayt_customDictionaryIds || '';
                        x.userDictionaryName = s.config.scayt_userDictionaryName || '';
                        x.sLang = s.config.scayt_sLang || 'en_US';
                        x.onLoad = function () {
                            if (!(c && b.version < 8)) this.addStyle(this.selectorCss(), 'padding-bottom: 2px !important;');
                            if (s.focusManager.hasFocus && !p.isControlRestored(s)) this.focus();
                        };
                        x.onBeforeChange = function () {
                            if (p.getScayt(s) && !s.checkDirty()) setTimeout(function () {
                                s.resetDirty();
                            });
                        };
                        var y = window.scayt_custom_params;
                        if (typeof y == 'object') for (var z in y) x[z] = y[z];
                        if (p.getControlId(s)) x.id = p.getControlId(s);
                        var A = new window.scayt(x);
                        A.afterMarkupRemove.push(function (H) {
                            new h(H, A.document).mergeSiblings();
                        });
                        var B = p.instances[s.name];
                        if (B) {
                            A.sLang = B.sLang;
                            A.option(B.option());
                            A.paused = B.paused;
                        }
                        p.instances[s.name] = A;
                        var C = 'scaytButton',
                            D = window.scayt.uiTags,
                            E = [];
                        for (var F = 0, G = 4; F < G; F++) E.push(D[F] && p.uiTabs[F]);
                        p.uiTabs = E;
                        try {
                            A.setDisabled(p.isPaused(s) === false);
                        } catch (H) {}
                        s.fire('showScaytState');
                    };
                s.on('contentDom', t);
                s.on('contentDomUnload', function () {
                    var x = a.document.getElementsByTag('script'),
                        y = /^dojoIoScript(\d+)$/i,
                        z = /^https?:\/\/svc\.spellchecker\.net\/spellcheck\/script\/ssrv\.cgi/i;
                    for (var A = 0; A < x.count(); A++) {
                        var B = x.getItem(A),
                            C = B.getId(),
                            D = B.getAttribute('src');
                        if (C && D && C.match(y) && D.match(z)) B.remove();
                    }
                });
                s.on('beforeCommandExec', function (x) {
                    if ((x.data.name == 'source' || x.data.name == 'newpage') && s.mode == 'wysiwyg') {
                        var y = p.getScayt(s);
                        if (y) {
                            p.setPaused(s, !y.disabled);
                            p.setControlId(s, y.id);
                            y.destroy(true);
                            delete p.instances[s.name];
                        }
                    } else if (x.data.name == 'source' && s.mode == 'source') p.markControlRestore(s);
                });
                s.on('afterCommandExec', function (x) {
                    if (!p.isScaytEnabled(s)) return;
                    if (s.mode == 'wysiwyg' && (x.data.name == 'undo' || x.data.name == 'redo')) window.setTimeout(function () {
                        p.getScayt(s).refresh();
                    }, 10);
                });
                s.on('destroy', function (x) {
                    var y = x.editor,
                        z = p.getScayt(y);
                    if (!z) return;
                    delete p.instances[y.name];
                    p.setControlId(y, z.id);
                    z.destroy(true);
                });
                s.on('afterSetData', function () {
                    if (p.isScaytEnabled(s)) window.setTimeout(function () {
                        var x = p.getScayt(s);
                        x && x.refresh();
                    }, 10);
                });
                s.on('insertElement', function () {
                    var x = p.getScayt(s);
                    if (p.isScaytEnabled(s)) {
                        if (c) s.getSelection().unlock(true);
                        window.setTimeout(function () {
                            x.focus();
                            x.refresh();
                        }, 10);
                    }
                }, this, null, 50);
                s.on('insertHtml', function () {
                    var x = p.getScayt(s);
                    if (p.isScaytEnabled(s)) {
                        if (c) s.getSelection().unlock(true);
                        window.setTimeout(function () {
                            x.focus();
                            x.refresh();
                        }, 10);
                    }
                }, this, null, 50);
                s.on('scaytDialog', function (x) {
                    x.data.djConfig = window.djConfig;
                    x.data.scayt_control = p.getScayt(s);
                    x.data.tab = m;
                    x.data.scayt = window.scayt;
                });
                var u = s.dataProcessor,
                    v = u && u.htmlFilter;
                if (v) v.addRules({
                    elements: {
                        span: function (x) {
                            if (x.attributes.scayt_word && x.attributes.scaytid) {
                                delete x.name;
                                return x;
                            }
                        }
                    }
                });
                var w = j.undo.Image.prototype;
                w.equals = e.override(w.equals, function (x) {
                    return function (y) {
                        var D = this;
                        var z = D.contents,
                            A = y.contents,
                            B = p.getScayt(D.editor);
                        if (B && p.isScaytReady(D.editor)) {
                            D.contents = B.reset(z) || '';
                            y.contents = B.reset(A) || '';
                        }
                        var C = x.apply(D, arguments);
                        D.contents = z;
                        y.contents = A;
                        return C;
                    };
                });
                if (s.document) t();
            };
        j.scayt = {
            engineLoaded: false,
            instances: {},
            controlInfo: {},
            setControlInfo: function (s, t) {
                if (s && s.name && typeof this.controlInfo[s.name] != 'object') this.controlInfo[s.name] = {};
                for (var u in t) this.controlInfo[s.name][u] = t[u];
            },
            isControlRestored: function (s) {
                if (s && s.name && this.controlInfo[s.name]) return this.controlInfo[s.name].restored;
                return false;
            },
            markControlRestore: function (s) {
                this.setControlInfo(s, {
                    restored: true
                });
            },
            setControlId: function (s, t) {
                this.setControlInfo(s, {
                    id: t
                });
            },
            getControlId: function (s) {
                if (s && s.name && this.controlInfo[s.name] && this.controlInfo[s.name].id) return this.controlInfo[s.name].id;
                return null;
            },
            setPaused: function (s, t) {
                this.setControlInfo(s, {
                    paused: t
                });
            },
            isPaused: function (s) {
                if (s && s.name && this.controlInfo[s.name]) return this.controlInfo[s.name].paused;
                return undefined;
            },
            getScayt: function (s) {
                return this.instances[s.name];
            },
            isScaytReady: function (s) {
                return this.engineLoaded === true && 'undefined' !== typeof window.scayt && this.getScayt(s);
            },
            isScaytEnabled: function (s) {
                var t = this.getScayt(s);
                return t ? t.disabled === false : false;
            },
            loadEngine: function (s) {
                if (b.gecko && b.version < 10900 || b.opera) return s.fire('showScaytState');
                if (this.engineLoaded === true) return o.apply(s);
                else if (this.engineLoaded == -1) return a.on('scaytReady', function () {
                    o.apply(s);
                });
                a.on('scaytReady', o, s);
                a.on('scaytReady', function () {
                    this.engineLoaded = true;
                }, this, null, 0);
                this.engineLoaded = -1;
                var t = document.location.protocol;
                t = t.search(/https?:/) != -1 ? t : 'http:';
                var u = 'svc.spellchecker.net/spellcheck31/lf/scayt24/loader__base.js',
                    v = s.config.scayt_srcUrl || t + '//' + u,
                    w = p.parseUrl(v).path + '/';
                if (window.scayt == undefined) {
                    a._djScaytConfig = {
                        baseUrl: w,
                        addOnLoad: [function () {
                            a.fireOnce('scaytReady');
                        }],
                        isDebug: false
                    };
                    a.document.getHead().append(a.document.createElement('script', {
                        attributes: {
                            type: 'text/javascript',
                            async: 'true',
                            src: v
                        }
                    }));
                } else a.fireOnce('scaytReady');
                return null;
            },
            parseUrl: function (s) {
                var t;
                if (s.match && (t = s.match(/(.*)[\/\\](.*?\.\w+)$/))) return {
                    path: t[1],
                    file: t[2]
                };
                else return s;
            }
        };
        var p = j.scayt,
            q = function (s, t, u, v, w, x, y) {
                s.addCommand(v, w);
                s.addMenuItem(v, {
                    label: u,
                    command: v,
                    group: x,
                    order: y
                });
            },
            r = {
                preserveState: true,
                editorFocus: false,
                exec: function (s) {
                    var t = s.config.scayt_autoStartup;
                    t = t == undefined || t;
                    if (p.isScaytReady(s)) {
                        var u = p.isScaytEnabled(s);
                        this.setState(u ? 2 : 1);
                        var v = p.getScayt(s);
                        v.focus();
                        v.setDisabled(u);
                    } else if (!t && p.engineLoaded >= 0) {
                        this.setState(0);
                        p.loadEngine(s);
                    }
                }
            };
        j.add('scayt', {
            requires: ['menubutton'],
            beforeInit: function (s) {
                var t = s.config.scayt_contextMenuItemsOrder || 'suggest|moresuggest|control',
                    u = '';
                t = t.split('|');
                if (t && t.length) for (var v in t) u += 'scayt_' + t[v] + (t.length != parseInt(v, 10) + 1 ? ',' : '');
                if (s.config.scayt_contextMenuOntop) s.config.menu_groups = u + ',' + s.config.menu_groups;
                else s.config.menu_groups = s.config.menu_groups + ',' + u;
            },
            init: function (s) {
                var t = {},
                    u = {},
                    v = s.addCommand(l, r);
                a.dialog.add(l, a.getUrl(this.path + 'dialogs/options.js'));
                var w = s.config.scayt_uiTabs || '1,1,1',
                    x = [];
                w = w.split(',');
                for (var y = 0, z = 3; y < z; y++) {
                    var A = parseInt(w[y] || '1', 10);
                    x.push(A);
                }
                var B = 'scaytButton';
                s.addMenuGroup(B);
                var C = {};
                C.scaytToggle = {
                    label: s.lang.scayt.enable,
                    command: l,
                    group: B
                };
                if (x[0] == 1) C.scaytOptions = {
                    label: s.lang.scayt.options,
                    group: B,
                    onClick: function () {
                        m = 'options';
                        s.openDialog(l);
                    }
                };
                if (x[1] == 1) C.scaytLangs = {
                    label: s.lang.scayt.langs,
                    group: B,
                    onClick: function () {
                        m = 'langs';
                        s.openDialog(l);
                    }
                };
                if (x[2] == 1) C.scaytDict = {
                    label: s.lang.scayt.dictionariesTab,
                    group: B,
                    onClick: function () {
                        m = 'dictionaries';
                        s.openDialog(l);
                    }
                };
                C.scaytAbout = {
                    label: s.lang.scayt.about,
                    group: B,
                    onClick: function () {
                        m = 'about';
                        s.openDialog(l);
                    }
                };
                x[3] = 1;
                p.uiTabs = x;
                s.addMenuItems(C);
                s.ui.add('Scayt', 5, {
                    label: s.lang.scayt.title,
                    title: b.opera ? s.lang.scayt.opera_title : s.lang.scayt.title,
                    className: 'cke_button_scayt',
                    onRender: function () {
                        v.on('state', function () {
                            this.setState(v.state);
                        }, this);
                    },
                    onMenu: function () {
                        var F = p.isScaytEnabled(s);
                        s.getMenuItem('scaytToggle').label = s.lang.scayt[F ? 'disable' : 'enable'];
                        return {
                            scaytToggle: 2,
                            scaytOptions: F && p.uiTabs[0] ? 2 : 0,
                            scaytLangs: F && p.uiTabs[1] ? 2 : 0,
                            scaytDict: F && p.uiTabs[2] ? 2 : 0,
                            scaytAbout: F && p.uiTabs[3] ? 2 : 0
                        };
                    }
                });
                if (s.contextMenu && s.addMenuItems) s.contextMenu.addListener(function () {
                    if (!p.isScaytEnabled(s)) return null;
                    var F = p.getScayt(s),
                        G = F.getScaytNode();
                    if (!G) return null;
                    var H = F.getWord(G);
                    if (!H) return null;
                    var I = F.getLang(),
                        J = {},
                        K = window.scayt.getSuggestion(H, I);
                    if (!K || !K.length) return null;
                    for (y in t) {
                        delete s._.menuItems[y];
                        delete s._.commands[y];
                    }
                    for (y in u) {
                        delete s._.menuItems[y];
                        delete s._.commands[y];
                    }
                    t = {};
                    u = {};
                    var L = s.config.scayt_moreSuggestions || 'on',
                        M = false,
                        N = s.config.scayt_maxSuggestions;
                    typeof N != 'number' && (N = 5);
                    !N && (N = K.length);
                    var O = s.config.scayt_contextCommands || 'all';
                    O = O.split('|');
                    for (var P = 0, Q = K.length; P < Q; P += 1) {
                        var R = 'scayt_suggestion_' + K[P].replace(' ', '_'),
                            S = (function (W, X) {
                                return {
                                    exec: function () {
                                        F.replace(W, X);
                                    }
                                };
                            })(G, K[P]);
                        if (P < N) {
                            q(s, 'button_' + R, K[P], R, S, 'scayt_suggest', P + 1);
                            J[R] = 2;
                            u[R] = 2;
                        } else if (L == 'on') {
                            q(s, 'button_' + R, K[P], R, S, 'scayt_moresuggest', P + 1);
                            t[R] = 2;
                            M = true;
                        }
                    }
                    if (M) {
                        s.addMenuItem('scayt_moresuggest', {
                            label: s.lang.scayt.moreSuggestions,
                            group: 'scayt_moresuggest',
                            order: 10,
                            getItems: function () {
                                return t;
                            }
                        });
                        u.scayt_moresuggest = 2;
                    }
                    if (n('all', O) || n('ignore', O)) {
                        var T = {
                            exec: function () {
                                F.ignore(G);
                            }
                        };
                        q(s, 'ignore', s.lang.scayt.ignore, 'scayt_ignore', T, 'scayt_control', 1);
                        u.scayt_ignore = 2;
                    }
                    if (n('all', O) || n('ignoreall', O)) {
                        var U = {
                            exec: function () {
                                F.ignoreAll(G);
                            }
                        };
                        q(s, 'ignore_all', s.lang.scayt.ignoreAll, 'scayt_ignore_all', U, 'scayt_control', 2);
                        u.scayt_ignore_all = 2;
                    }
                    if (n('all', O) || n('add', O)) {
                        var V = {
                            exec: function () {
                                window.scayt.addWordToUserDictionary(G);
                            }
                        };
                        q(s, 'add_word', s.lang.scayt.addWord, 'scayt_add_word', V, 'scayt_control', 3);
                        u.scayt_add_word = 2;
                    }
                    if (F.fireOnContextMenu) F.fireOnContextMenu(s);
                    return u;
                });
                var D = function () {
                        s.removeListener('showScaytState', D);
                        if (!b.opera) v.setState(p.isScaytEnabled(s) ? 1 : 2);
                        else v.setState(0);
                    };
                s.on('showScaytState', D);
                if (b.opera) s.on('instanceReady', function () {
                    D();
                });
                var E = s.config.scayt_autoStartup;
                if (E == undefined || E) s.on('instanceReady', function () {
                    p.loadEngine(s);
                });
            },
            afterInit: function (s) {
                var t, u = function (v) {
                        if (v.hasAttribute('scaytid')) return false;
                    };
                if (s._.elementsPath && (t = s._.elementsPath.filters)) t.push(u);
                s.addRemoveFormatFilter && s.addRemoveFormatFilter(u);
            }
        });
    })();
    j.add('smiley', {
        requires: ['dialog'],
        init: function (l) {
            l.config.smiley_path = l.config.smiley_path || this.path + 'images/';
            l.addCommand('smiley', new a.dialogCommand('smiley'));
            l.ui.addButton('Smiley', {
                label: l.lang.smiley.toolbar,
                command: 'smiley'
            });
            a.dialog.add('smiley', this.path + 'dialogs/smiley.js');
        }
    });
    i.smiley_images = ['regular_smile.gif', 'sad_smile.gif', 'wink_smile.gif', 'teeth_smile.gif', 'confused_smile.gif', 'tounge_smile.gif', 'embaressed_smile.gif', 'omg_smile.gif', 'whatchutalkingabout_smile.gif', 'angry_smile.gif', 'angel_smile.gif', 'shades_smile.gif', 'devil_smile.gif', 'cry_smile.gif', 'lightbulb.gif', 'thumbs_down.gif', 'thumbs_up.gif', 'heart.gif', 'broken_heart.gif', 'kiss.gif', 'envelope.gif'];
    i.smiley_descriptions = ['smiley', 'sad', 'wink', 'laugh', 'frown', 'cheeky', 'blush', 'surprise', 'indecision', 'angry', 'angel', 'cool', 'devil', 'crying', 'enlightened', 'no', 'yes', 'heart', 'broken heart', 'kiss', 'mail'];
    (function () {
        var l = '.%2 p,.%2 div,.%2 pre,.%2 address,.%2 blockquote,.%2 h1,.%2 h2,.%2 h3,.%2 h4,.%2 h5,.%2 h6{background-repeat: no-repeat;border: 1px dotted gray;padding-top: 8px;padding-left: 8px;}.%2 p{%1p.png);}.%2 div{%1div.png);}.%2 pre{%1pre.png);}.%2 address{%1address.png);}.%2 blockquote{%1blockquote.png);}.%2 h1{%1h1.png);}.%2 h2{%1h2.png);}.%2 h3{%1h3.png);}.%2 h4{%1h4.png);}.%2 h5{%1h5.png);}.%2 h6{%1h6.png);}',
            m = /%1/g,
            n = /%2/g,
            o = {
                preserveState: true,
                editorFocus: false,
                exec: function (p) {
                    this.toggleState();
                    this.refresh(p);
                },
                refresh: function (p) {
                    var q = this.state == 1 ? 'addClass' : 'removeClass';
                    p.document.getBody()[q]('cke_show_blocks');
                }
            };
        j.add('showblocks', {
            requires: ['wysiwygarea'],
            init: function (p) {
                var q = p.addCommand('showblocks', o);
                q.canUndo = false;
                if (p.config.startupOutlineBlocks) q.setState(1);
                p.addCss(l.replace(m, 'background-image: url(' + a.getUrl(this.path) + 'images/block_').replace(n, 'cke_show_blocks '));
                p.ui.addButton('ShowBlocks', {
                    label: p.lang.showBlocks,
                    command: 'showblocks'
                });
                p.on('mode', function () {
                    if (q.state != 0) q.refresh(p);
                });
                p.on('contentDom', function () {
                    if (q.state != 0) q.refresh(p);
                });
            }
        });
    })();
    i.startupOutlineBlocks = false;
    (function () {
        var l = 'cke_show_border',
            m, n = (b.ie6Compat ? ['.%1 table.%2,', '.%1 table.%2 td, .%1 table.%2 th,', '{', 'border : #d3d3d3 1px dotted', '}'] : ['.%1 table.%2,', '.%1 table.%2 > tr > td, .%1 table.%2 > tr > th,', '.%1 table.%2 > tbody > tr > td, .%1 table.%2 > tbody > tr > th,', '.%1 table.%2 > thead > tr > td, .%1 table.%2 > thead > tr > th,', '.%1 table.%2 > tfoot > tr > td, .%1 table.%2 > tfoot > tr > th', '{', 'border : #d3d3d3 1px dotted', '}']).join('');
        m = n.replace(/%2/g, l).replace(/%1/g, 'cke_show_borders ');
        var o = {
            preserveState: true,
            editorFocus: false,
            exec: function (p) {
                this.toggleState();
                this.refresh(p);
            },
            refresh: function (p) {
                var q = this.state == 1 ? 'addClass' : 'removeClass';
                p.document.getBody()[q]('cke_show_borders');
            }
        };
        j.add('showborders', {
            requires: ['wysiwygarea'],
            modes: {
                wysiwyg: 1
            },
            init: function (p) {
                var q = p.addCommand('showborders', o);
                q.canUndo = false;
                if (p.config.startupShowBorders !== false) q.setState(1);
                p.addCss(m);
                p.on('mode', function () {
                    if (q.state != 0) q.refresh(p);
                }, null, null, 100);
                p.on('contentDom', function () {
                    if (q.state != 0) q.refresh(p);
                });
            },
            afterInit: function (p) {
                var q = p.dataProcessor,
                    r = q && q.dataFilter,
                    s = q && q.htmlFilter;
                if (r) r.addRules({
                    elements: {
                        table: function (t) {
                            var u = t.attributes,
                                v = u['class'],
                                w = parseInt(u.border, 10);
                            if (!w || w <= 0) u['class'] = (v || '') + ' ' + l;
                        }
                    }
                });
                if (s) s.addRules({
                    elements: {
                        table: function (t) {
                            var u = t.attributes,
                                v = u['class'];
                            v && (u['class'] = v.replace(l, '').replace(/\s{2}/, ' ').replace(/^\s+|\s+$/, ''));
                        }
                    }
                });
            }
        });
        a.on('dialogDefinition', function (p) {
            var q = p.data.name;
            if (q == 'table' || q == 'tableProperties') {
                var r = p.data.definition,
                    s = r.getContents('info'),
                    t = s.get('txtBorder'),
                    u = t.commit;
                t.commit = e.override(u, function (v) {
                    return function (w, x) {
                        v.apply(this, arguments);
                        var y = parseInt(this.getValue(), 10);
                        x[!y || y <= 0 ? 'addClass' : 'removeClass'](l);
                    };
                });
            }
        });
    })();
    j.add('sourcearea', {
        requires: ['editingblock'],
        init: function (l) {
            var m = j.sourcearea,
                n = a.document.getWindow();
            l.on('editingBlockReady', function () {
                var o, p;
                l.addMode('source', {
                    load: function (q, r) {
                        if (c && b.version < 8) q.setStyle('position', 'relative');
                        l.textarea = o = new h('textarea');
                        o.setAttributes({
                            dir: 'ltr',
                            tabIndex: b.webkit ? -1 : l.tabIndex,
                            role: 'textbox',
                            'aria-label': l.lang.editorTitle.replace('%1', l.name)
                        });
                        o.addClass('cke_source');
                        o.addClass('cke_enable_context_menu');
                        var s = {
                            width: b.ie7Compat ? '99%' : '100%',
                            height: '100%',
                            resize: 'none',
                            outline: 'none',
                            'text-align': 'left'
                        };
                        if (c) {
                            p = function () {
                                o.hide();
                                o.setStyle('height', q.$.clientHeight + 'px');
                                o.setStyle('width', q.$.clientWidth + 'px');
                                o.show();
                            };
                            l.on('resize', p);
                            n.on('resize', p);
                            setTimeout(p, 0);
                        } else o.on('mousedown', function (u) {
                            u.data.stopPropagation();
                        });
                        q.setHtml('');
                        q.append(o);
                        o.setStyles(s);
                        l.fire('ariaWidget', o);
                        o.on('blur', function () {
                            l.focusManager.blur();
                        });
                        o.on('focus', function () {
                            l.focusManager.focus();
                        });
                        l.mayBeDirty = true;
                        this.loadData(r);
                        var t = l.keystrokeHandler;
                        if (t) t.attach(o);
                        setTimeout(function () {
                            l.mode = 'source';
                            l.fire('mode');
                        }, b.gecko || b.webkit ? 100 : 0);
                    },
                    loadData: function (q) {
                        o.setValue(q);
                        l.fire('dataReady');
                    },
                    getData: function () {
                        return o.getValue();
                    },
                    getSnapshotData: function () {
                        return o.getValue();
                    },
                    unload: function (q) {
                        o.clearCustomData();
                        l.textarea = o = null;
                        if (p) {
                            l.removeListener('resize', p);
                            n.removeListener('resize', p);
                        }
                        if (c && b.version < 8) q.removeStyle('position');
                    },
                    focus: function () {
                        o.focus();
                    }
                });
            });
            l.addCommand('source', m.commands.source);
            if (l.ui.addButton) l.ui.addButton('Source', {
                label: l.lang.source,
                command: 'source'
            });
            l.on('mode', function () {
                l.getCommand('source').setState(l.mode == 'source' ? 1 : 2);
            });
        }
    });
    j.sourcearea = {
        commands: {
            source: {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                editorFocus: false,
                exec: function (l) {
                    if (l.mode == 'wysiwyg') l.fire('saveSnapshot');
                    l.getCommand('source').setState(0);
                    l.setMode(l.mode == 'source' ? 'wysiwyg' : 'source');
                },
                canUndo: false
            }
        }
    };
    (function () {
        j.add('stylescombo', {
            requires: ['richcombo', 'styles'],
            init: function (m) {
                var n = m.config,
                    o = m.lang.stylesCombo,
                    p = {},
                    q = [];

                function r(s) {
                    m.getStylesSet(function (t) {
                        if (!q.length) {
                            var u, v;
                            for (var w = 0; w < t.length; w++) {
                                var x = t[w];
                                v = x.name;
                                u = p[v] = new a.style(x);
                                u._name = v;
                                u._.enterMode = n.enterMode;
                                q.push(u);
                            }
                            q.sort(l);
                        }
                        s && s();
                    });
                };
                m.ui.addRichCombo('Styles', {
                    label: o.label,
                    title: o.panelTitle,
                    className: 'cke_styles',
                    panel: {
                        css: m.skin.editor.css.concat(n.contentsCss),
                        multiSelect: true,
                        attributes: {
                            'aria-label': o.panelTitle
                        }
                    },
                    init: function () {
                        var s = this;
                        r(function () {
                            var t, u, v;
                            for (var w = 0; w < q.length; w++) {
                                t = q[w];
                                u = t._name;
                                var x = t.type;
                                if (x != v) {
                                    s.startGroup(o['panelTitle' + String(x)]);
                                    v = x;
                                }
                                s.add(u, t.type == 3 ? u : t.buildPreview(), u);
                            }
                            s.commit();
                            s.onOpen();
                        });
                    },
                    onClick: function (s) {
                        m.focus();
                        m.fire('saveSnapshot');
                        var t = p[s],
                            u = m.getSelection(),
                            v = new d.elementPath(u.getStartElement());
                        if (t.type == 2 && t.checkActive(v)) t.remove(m.document);
                        else t.apply(m.document);
                        m.fire('saveSnapshot');
                    },
                    onRender: function () {
                        m.on('selectionChange', function (s) {
                            var t = this.getValue(),
                                u = s.data.path,
                                v = u.elements;
                            for (var w = 0, x; w < v.length; w++) {
                                x = v[w];
                                for (var y in p) {
                                    if (p[y].checkElementRemovable(x, true)) {
                                        if (y != t) this.setValue(y);
                                        return;
                                    }
                                }
                            }
                            this.setValue('');
                        }, this);
                    },
                    onOpen: function () {
                        var z = this;
                        if (c || b.webkit) m.focus();
                        var s = m.getSelection(),
                            t = s.getSelectedElement(),
                            u = new d.elementPath(t || s.getStartElement()),
                            v = [0, 0, 0, 0];
                        z.showAll();
                        z.unmarkAll();
                        for (var w in p) {
                            var x = p[w],
                                y = x.type;
                            if (x.checkActive(u)) z.mark(w);
                            else if (y == 3 && !x.checkApplicable(u)) {
                                z.hideItem(w);
                                v[y]--;
                            }
                            v[y]++;
                        }
                        if (!v[1]) z.hideGroup(o['panelTitle' + String(1)]);
                        if (!v[2]) z.hideGroup(o['panelTitle' + String(2)]);
                        if (!v[3]) z.hideGroup(o['panelTitle' + String(3)]);
                    }
                });
                m.on('instanceReady', function () {
                    r();
                });
            }
        });

        function l(m, n) {
            var o = m.type,
                p = n.type;
            return o == p ? 0 : o == 3 ? -1 : p == 3 ? 1 : p == 1 ? 1 : -1;
        };
    })();
    j.add('table', {
        init: function (l) {
            var m = j.table,
                n = l.lang.table;
            l.addCommand('table', new a.dialogCommand('table'));
            l.addCommand('tableProperties', new a.dialogCommand('tableProperties'));
            l.ui.addButton('Table', {
                label: n.toolbar,
                command: 'table'
            });
            a.dialog.add('table', this.path + 'dialogs/table.js');
            a.dialog.add('tableProperties', this.path + 'dialogs/table.js');
            if (l.addMenuItems) l.addMenuItems({
                table: {
                    label: n.menu,
                    command: 'tableProperties',
                    group: 'table',
                    order: 5
                },
                tabledelete: {
                    label: n.deleteTable,
                    command: 'tableDelete',
                    group: 'table',
                    order: 1
                }
            });
            l.on('doubleclick', function (o) {
                var p = o.data.element;
                if (p.is('table')) o.data.dialog = 'tableProperties';
            });
            if (l.contextMenu) l.contextMenu.addListener(function (o, p) {
                if (!o) return null;
                var q = o.is('table') || o.hasAscendant('table');
                if (q) return {
                    tabledelete: 2,
                    table: 2
                };
                return null;
            });
        }
    });
    (function () {
        function l(G, H) {
            if (c) G.removeAttribute(H);
            else delete G[H];
        };
        var m = /^(?:td|th)$/;

        function n(G) {
            var H = G.createBookmarks(),
                I = G.getRanges(),
                J = [],
                K = {};

            function L(T) {
                if (J.length > 0) return;
                if (T.type == 1 && m.test(T.getName()) && !T.getCustomData('selected_cell')) {
                    h.setMarker(K, T, 'selected_cell', true);
                    J.push(T);
                }
            };
            for (var M = 0; M < I.length; M++) {
                var N = I[M];
                if (N.collapsed) {
                    var O = N.getCommonAncestor(),
                        P = O.getAscendant('td', true) || O.getAscendant('th', true);
                    if (P) J.push(P);
                } else {
                    var Q = new d.walker(N),
                        R;
                    Q.guard = L;
                    while (R = Q.next()) {
                        var S = R.getParent();
                        if (S && m.test(S.getName()) && !S.getCustomData('selected_cell')) {
                            h.setMarker(K, S, 'selected_cell', true);
                            J.push(S);
                        }
                    }
                }
            }
            h.clearAllMarkers(K);
            G.selectBookmarks(H);
            return J;
        };

        function o(G) {
            var H = 0,
                I = G.length - 1,
                J = {},
                K, L, M;
            while (K = G[H++]) h.setMarker(J, K, 'delete_cell', true);
            H = 0;
            while (K = G[H++]) {
                if ((L = K.getPrevious()) && !L.getCustomData('delete_cell') || (L = K.getNext()) && !L.getCustomData('delete_cell')) {
                    h.clearAllMarkers(J);
                    return L;
                }
            }
            h.clearAllMarkers(J);
            M = G[0].getParent();
            if (M = M.getPrevious()) return M.getLast();
            M = G[I].getParent();
            if (M = M.getNext()) return M.getChild(0);
            return null;
        };

        function p(G) {
            var H = G.cells;
            for (var I = 0; I < H.length; I++) {
                H[I].innerHTML = '';
                if (!c) new h(H[I]).appendBogus();
            }
        };

        function q(G, H) {
            var I = G.getStartElement().getAscendant('tr');
            if (!I) return;
            var J = I.clone(true);
            J.insertBefore(I);
            p(H ? J.$ : I.$);
        };

        function r(G) {
            if (G instanceof d.selection) {
                var H = n(G),
                    I = H.length,
                    J = [],
                    K, L, M;
                for (var N = 0; N < I; N++) {
                    var O = H[N].getParent(),
                        P = O.$.rowIndex;
                    !N && (L = P - 1);
                    J[P] = O;
                    N == I - 1 && (M = P + 1);
                }
                var Q = O.getAscendant('table'),
                    R = Q.$.rows,
                    S = R.length;
                K = new h(M < S && Q.$.rows[M] || L > 0 && Q.$.rows[L] || Q.$.parentNode);
                for (N = J.length; N >= 0; N--) {
                    if (J[N]) r(J[N]);
                }
                return K;
            } else if (G instanceof h) {
                Q = G.getAscendant('table');
                if (Q.$.rows.length == 1) Q.remove();
                else G.remove();
            }
            return 0;
        };

        function s(G, H) {
            var I = G.getStartElement(),
                J = I.getAscendant('td', true) || I.getAscendant('th', true);
            if (!J) return;
            var K = J.getAscendant('table'),
                L = J.$.cellIndex;
            for (var M = 0; M < K.$.rows.length; M++) {
                var N = K.$.rows[M];
                if (N.cells.length < L + 1) continue;
                J = new h(N.cells[L].cloneNode(false));
                if (!c) J.appendBogus();
                var O = new h(N.cells[L]);
                if (H) J.insertBefore(O);
                else J.insertAfter(O);
            }
        };

        function t(G) {
            var H = [],
                I = G[0] && G[0].getAscendant('table'),
                J, K, L, M;
            for (J = 0, K = G.length; J < K; J++) H.push(G[J].$.cellIndex);
            H.sort();
            for (J = 1, K = H.length; J < K; J++) {
                if (H[J] - H[J - 1] > 1) {
                    L = H[J - 1] + 1;
                    break;
                }
            }
            if (!L) L = H[0] > 0 ? H[0] - 1 : H[H.length - 1] + 1;
            var N = I.$.rows;
            for (J = 0, K = N.length; J < K; J++) {
                M = N[J].cells[L];
                if (M) break;
            }
            return M ? new h(M) : I.getPrevious();
        };

        function u(G) {
            if (G instanceof d.selection) {
                var H = n(G),
                    I = t(H);
                for (var J = H.length - 1; J >= 0; J--) {
                    if (H[J]) u(H[J]);
                }
                return I;
            } else if (G instanceof h) {
                var K = G.getAscendant('table');
                if (!K) return null;
                var L = G.$.cellIndex;
                for (J = K.$.rows.length - 1; J >= 0; J--) {
                    var M = new h(K.$.rows[J]);
                    if (!L && M.$.cells.length == 1) {
                        r(M);
                        continue;
                    }
                    if (M.$.cells[L]) M.$.removeChild(M.$.cells[L]);
                }
            }
            return null;
        };

        function v(G, H) {
            var I = G.getStartElement(),
                J = I.getAscendant('td', true) || I.getAscendant('th', true);
            if (!J) return;
            var K = J.clone();
            if (!c) K.appendBogus();
            if (H) K.insertBefore(J);
            else K.insertAfter(J);
        };

        function w(G) {
            if (G instanceof d.selection) {
                var H = n(G),
                    I = H[0] && H[0].getAscendant('table'),
                    J = o(H);
                for (var K = H.length - 1; K >= 0; K--) w(H[K]);
                if (J) y(J, true);
                else if (I) I.remove();
            } else if (G instanceof h) {
                var L = G.getParent();
                if (L.getChildCount() == 1) L.remove();
                else G.remove();
            }
        };

        function x(G) {
            var H = G.getBogus();
            H && H.remove();
            G.trim();
        };

        function y(G, H) {
            var I = new d.range(G.getDocument());
            if (!I['moveToElementEdit' + (H ? 'End' : 'Start')](G)) {
                I.selectNodeContents(G);
                I.collapse(H ? false : true);
            }
            I.select(true);
        };

        function z(G) {
            var H = G.$.rows,
                I = -1,
                J = [];
            for (var K = 0; K < H.length; K++) {
                I++;
                !J[I] && (J[I] = []);
                var L = -1;
                for (var M = 0; M < H[K].cells.length; M++) {
                    var N = H[K].cells[M];
                    L++;
                    while (J[I][L]) L++;
                    var O = isNaN(N.colSpan) ? 1 : N.colSpan,
                        P = isNaN(N.rowSpan) ? 1 : N.rowSpan;
                    for (var Q = 0; Q < P; Q++) {
                        if (!J[I + Q]) J[I + Q] = [];
                        for (var R = 0; R < O; R++) J[I + Q][L + R] = H[K].cells[M];
                    }
                    L += O - 1;
                }
            }
            return J;
        };

        function A(G, H, I) {
            var J = G[H];
            if (typeof I == 'undefined') return J;
            for (var K = 0; J && K < J.length; K++) {
                if (I.is && J[K] == I.$) return K;
                else if (K == I) return new h(J[K]);
            }
            return I.is ? -1 : null;
        };

        function B(G, H, I) {
            var J = [];
            for (var K = 0; K < G.length; K++) {
                var L = G[K];
                if (typeof I == 'undefined') J.push(L[H]);
                else if (I.is && L[H] == I.$) return K;
                else if (K == I) return new h(L[H]);
            }
            return typeof I == 'undefined' ? J : I.is ? -1 : null;
        };

        function C(G, H, I) {
            var J = n(G),
                K;
            if ((H ? J.length != 1 : J.length < 2) || (K = G.getCommonAncestor()) && K.type == 1 && K.is('table')) return false;
            var L, M = J[0],
                N = M.getAscendant('table'),
                O = z(N),
                P = O.length,
                Q = O[0].length,
                R = M.getParent().$.rowIndex,
                S = A(O, R, M);
            if (H) {
                var T;
                try {
                    T = O[H == 'up' ? R - 1 : H == 'down' ? R + 1 : R][H == 'left' ? S - 1 : H == 'right' ? S + 1 : S];
                } catch (al) {
                    return false;
                }
                if (!T || M.$ == T) return false;
                J[H == 'up' || H == 'left' ? 'unshift' : 'push'](new h(T));
            }
            var U = M.getDocument(),
                V = R,
                W = 0,
                X = 0,
                Y = !I && new d.documentFragment(U),
                Z = 0;
            for (var aa = 0; aa < J.length; aa++) {
                L = J[aa];
                var ab = L.getParent(),
                    ac = L.getFirst(),
                    ad = L.$.colSpan,
                    ae = L.$.rowSpan,
                    af = ab.$.rowIndex,
                    ag = A(O, af, L);
                Z += ad * ae;
                X = Math.max(X, ag - S + ad);
                W = Math.max(W, af - R + ae);
                if (!I) {
                    if (x(L), L.getChildren().count()) {
                        if (af != V && ac && !(ac.isBlockBoundary && ac.isBlockBoundary({
                            br: 1
                        }))) {
                            var ah = Y.getLast(d.walker.whitespaces(true));
                            if (ah && !(ah.is && ah.is('br'))) Y.append(new h('br'));
                        }
                        L.moveChildren(Y);
                    }
                    aa ? L.remove() : L.setHtml('');
                }
                V = af;
            }
            if (!I) {
                Y.moveChildren(M);
                if (!c) M.appendBogus();
                if (X >= Q) M.removeAttribute('rowSpan');
                else M.$.rowSpan = W;
                if (W >= P) M.removeAttribute('colSpan');
                else M.$.colSpan = X;
                var ai = new d.nodeList(N.$.rows),
                    aj = ai.count();
                for (aa = aj - 1; aa >= 0; aa--) {
                    var ak = ai.getItem(aa);
                    if (!ak.$.cells.length) {
                        ak.remove();
                        aj++;
                        continue;
                    }
                }
                return M;
            } else return W * X == Z;
        };

        function D(G, H) {
            var I = n(G);
            if (I.length > 1) return false;
            else if (H) return true;
            var J = I[0],
                K = J.getParent(),
                L = K.getAscendant('table'),
                M = z(L),
                N = K.$.rowIndex,
                O = A(M, N, J),
                P = J.$.rowSpan,
                Q, R, S, T;
            if (P > 1) {
                R = Math.ceil(P / 2);
                S = Math.floor(P / 2);
                T = N + R;
                var U = new h(L.$.rows[T]),
                    V = A(M, T),
                    W;
                Q = J.clone();
                for (var X = 0; X < V.length; X++) {
                    W = V[X];
                    if (W.parentNode == U.$ && X > O) {
                        Q.insertBefore(new h(W));
                        break;
                    } else W = null;
                }
                if (!W) U.append(Q, true);
            } else {
                S = R = 1;
                U = K.clone();
                U.insertAfter(K);
                U.append(Q = J.clone());
                var Y = A(M, N);
                for (var Z = 0;
                Z < Y.length; Z++) Y[Z].rowSpan++;
            }
            if (!c) Q.appendBogus();
            J.$.rowSpan = R;
            Q.$.rowSpan = S;
            if (R == 1) J.removeAttribute('rowSpan');
            if (S == 1) Q.removeAttribute('rowSpan');
            return Q;
        };

        function E(G, H) {
            var I = n(G);
            if (I.length > 1) return false;
            else if (H) return true;
            var J = I[0],
                K = J.getParent(),
                L = K.getAscendant('table'),
                M = z(L),
                N = K.$.rowIndex,
                O = A(M, N, J),
                P = J.$.colSpan,
                Q, R, S;
            if (P > 1) {
                R = Math.ceil(P / 2);
                S = Math.floor(P / 2);
            } else {
                S = R = 1;
                var T = B(M, O);
                for (var U = 0; U < T.length; U++) T[U].colSpan++;
            }
            Q = J.clone();
            Q.insertAfter(J);
            if (!c) Q.appendBogus();
            J.$.colSpan = R;
            Q.$.colSpan = S;
            if (R == 1) J.removeAttribute('colSpan');
            if (S == 1) Q.removeAttribute('colSpan');
            return Q;
        };
        var F = {
            thead: 1,
            tbody: 1,
            tfoot: 1,
            td: 1,
            tr: 1,
            th: 1
        };
        j.tabletools = {
            init: function (G) {
                var H = G.lang.table;
                G.addCommand('cellProperties', new a.dialogCommand('cellProperties'));
                a.dialog.add('cellProperties', this.path + 'dialogs/tableCell.js');
                G.addCommand('tableDelete', {
                    exec: function (I) {
                        var J = I.getSelection(),
                            K = J && J.getStartElement(),
                            L = K && K.getAscendant('table', true);
                        if (!L) return;
                        J.selectElement(L);
                        var M = J.getRanges()[0];
                        M.collapse();
                        J.selectRanges([M]);
                        var N = L.getParent();
                        if (N.getChildCount() == 1 && N.getName() != 'body') N.remove();
                        else L.remove();
                    }
                });
                G.addCommand('rowDelete', {
                    exec: function (I) {
                        var J = I.getSelection();
                        y(r(J));
                    }
                });
                G.addCommand('rowInsertBefore', {
                    exec: function (I) {
                        var J = I.getSelection();
                        q(J, true);
                    }
                });
                G.addCommand('rowInsertAfter', {
                    exec: function (I) {
                        var J = I.getSelection();
                        q(J);
                    }
                });
                G.addCommand('columnDelete', {
                    exec: function (I) {
                        var J = I.getSelection(),
                            K = u(J);
                        K && y(K, true);
                    }
                });
                G.addCommand('columnInsertBefore', {
                    exec: function (I) {
                        var J = I.getSelection();
                        s(J, true);
                    }
                });
                G.addCommand('columnInsertAfter', {
                    exec: function (I) {
                        var J = I.getSelection();
                        s(J);
                    }
                });
                G.addCommand('cellDelete', {
                    exec: function (I) {
                        var J = I.getSelection();
                        w(J);
                    }
                });
                G.addCommand('cellMerge', {
                    exec: function (I) {
                        y(C(I.getSelection()), true);
                    }
                });
                G.addCommand('cellMergeRight', {
                    exec: function (I) {
                        y(C(I.getSelection(), 'right'), true);
                    }
                });
                G.addCommand('cellMergeDown', {
                    exec: function (I) {
                        y(C(I.getSelection(), 'down'), true);
                    }
                });
                G.addCommand('cellVerticalSplit', {
                    exec: function (I) {
                        y(D(I.getSelection()));
                    }
                });
                G.addCommand('cellHorizontalSplit', {
                    exec: function (I) {
                        y(E(I.getSelection()));
                    }
                });
                G.addCommand('cellInsertBefore', {
                    exec: function (I) {
                        var J = I.getSelection();
                        v(J, true);
                    }
                });
                G.addCommand('cellInsertAfter', {
                    exec: function (I) {
                        var J = I.getSelection();
                        v(J);
                    }
                });
                if (G.addMenuItems) G.addMenuItems({
                    tablecell: {
                        label: H.cell.menu,
                        group: 'tablecell',
                        order: 1,
                        getItems: function () {
                            var I = G.getSelection(),
                                J = n(I);
                            return {
                                tablecell_insertBefore: 2,
                                tablecell_insertAfter: 2,
                                tablecell_delete: 2,
                                tablecell_merge: C(I, null, true) ? 2 : 0,
                                tablecell_merge_right: C(I, 'right', true) ? 2 : 0,
                                tablecell_merge_down: C(I, 'down', true) ? 2 : 0,
                                tablecell_split_vertical: D(I, true) ? 2 : 0,
                                tablecell_split_horizontal: E(I, true) ? 2 : 0,
                                tablecell_properties: J.length > 0 ? 2 : 0
                            };
                        }
                    },
                    tablecell_insertBefore: {
                        label: H.cell.insertBefore,
                        group: 'tablecell',
                        command: 'cellInsertBefore',
                        order: 5
                    },
                    tablecell_insertAfter: {
                        label: H.cell.insertAfter,
                        group: 'tablecell',
                        command: 'cellInsertAfter',
                        order: 10
                    },
                    tablecell_delete: {
                        label: H.cell.deleteCell,
                        group: 'tablecell',
                        command: 'cellDelete',
                        order: 15
                    },
                    tablecell_merge: {
                        label: H.cell.merge,
                        group: 'tablecell',
                        command: 'cellMerge',
                        order: 16
                    },
                    tablecell_merge_right: {
                        label: H.cell.mergeRight,
                        group: 'tablecell',
                        command: 'cellMergeRight',
                        order: 17
                    },
                    tablecell_merge_down: {
                        label: H.cell.mergeDown,
                        group: 'tablecell',
                        command: 'cellMergeDown',
                        order: 18
                    },
                    tablecell_split_horizontal: {
                        label: H.cell.splitHorizontal,
                        group: 'tablecell',
                        command: 'cellHorizontalSplit',
                        order: 19
                    },
                    tablecell_split_vertical: {
                        label: H.cell.splitVertical,
                        group: 'tablecell',
                        command: 'cellVerticalSplit',
                        order: 20
                    },
                    tablecell_properties: {
                        label: H.cell.title,
                        group: 'tablecellproperties',
                        command: 'cellProperties',
                        order: 21
                    },
                    tablerow: {
                        label: H.row.menu,
                        group: 'tablerow',
                        order: 1,
                        getItems: function () {
                            return {
                                tablerow_insertBefore: 2,
                                tablerow_insertAfter: 2,
                                tablerow_delete: 2
                            };
                        }
                    },
                    tablerow_insertBefore: {
                        label: H.row.insertBefore,
                        group: 'tablerow',
                        command: 'rowInsertBefore',
                        order: 5
                    },
                    tablerow_insertAfter: {
                        label: H.row.insertAfter,
                        group: 'tablerow',
                        command: 'rowInsertAfter',
                        order: 10
                    },
                    tablerow_delete: {
                        label: H.row.deleteRow,
                        group: 'tablerow',
                        command: 'rowDelete',
                        order: 15
                    },
                    tablecolumn: {
                        label: H.column.menu,
                        group: 'tablecolumn',
                        order: 1,
                        getItems: function () {
                            return {
                                tablecolumn_insertBefore: 2,
                                tablecolumn_insertAfter: 2,
                                tablecolumn_delete: 2
                            };
                        }
                    },
                    tablecolumn_insertBefore: {
                        label: H.column.insertBefore,
                        group: 'tablecolumn',
                        command: 'columnInsertBefore',
                        order: 5
                    },
                    tablecolumn_insertAfter: {
                        label: H.column.insertAfter,
                        group: 'tablecolumn',
                        command: 'columnInsertAfter',
                        order: 10
                    },
                    tablecolumn_delete: {
                        label: H.column.deleteColumn,
                        group: 'tablecolumn',
                        command: 'columnDelete',
                        order: 15
                    }
                });
                if (G.contextMenu) G.contextMenu.addListener(function (I, J) {
                    if (!I) return null;
                    while (I) {
                        if (I.getName() in F) return {
                            tablecell: 2,
                            tablerow: 2,
                            tablecolumn: 2
                        };
                        I = I.getParent();
                    }
                    return null;
                });
            },
            getSelectedCells: n
        };
        j.add('tabletools', j.tabletools);
    })();
    j.add('specialchar', {
        init: function (l) {
            var m = 'specialchar';
            a.dialog.add(m, this.path + 'dialogs/specialchar.js');
            l.addCommand(m, new a.dialogCommand(m));
            l.ui.addButton('SpecialChar', {
                label: l.lang.specialChar.toolbar,
                command: m
            });
        }
    });
    (function () {
        var l = {
            editorFocus: false,
            modes: {
                wysiwyg: 1,
                source: 1
            }
        },
            m = {
                exec: function (o) {
                    o.container.focusNext(true, o.tabIndex);
                }
            },
            n = {
                exec: function (o) {
                    o.container.focusPrevious(true, o.tabIndex);
                }
            };
        j.add('tab', {
            requires: ['keystrokes'],
            init: function (o) {
                var p = o.config.tabSpaces || 0,
                    q = '';
                while (p--) q += '\xa0';
                if (q) o.on('key', function (r) {
                    if (r.data.keyCode == 9) {
                        o.insertHtml(q);
                        r.cancel();
                    }
                });
                if (b.webkit || b.gecko) o.on('key', function (r) {
                    var s = r.data.keyCode;
                    if (s == 9 && !q) {
                        r.cancel();
                        o.execCommand('blur');
                    }
                    if (s == 2000 + 9) {
                        o.execCommand('blurBack');
                        r.cancel();
                    }
                });
                o.addCommand('blur', e.extend(m, l));
                o.addCommand('blurBack', e.extend(n, l));
            }
        });
    })();
    h.prototype.focusNext = function (l, m) {
        var v = this;
        var n = v.$,
            o = m === undefined ? v.getTabIndex() : m,
            p, q, r, s, t, u;
        if (o <= 0) {
            t = v.getNextSourceNode(l, 1);
            while (t) {
                if (t.isVisible() && t.getTabIndex() === 0) {
                    r = t;
                    break;
                }
                t = t.getNextSourceNode(false, 1);
            }
        } else {
            t = v.getDocument().getBody().getFirst();
            while (t = t.getNextSourceNode(false, 1)) {
                if (!p) if (!q && t.equals(v)) {
                    q = true;
                    if (l) {
                        if (!(t = t.getNextSourceNode(true, 1))) break;
                        p = 1;
                    }
                } else if (q && !v.contains(t)) p = 1;
                if (!t.isVisible() || (u = t.getTabIndex()) < 0) continue;
                if (p && u == o) {
                    r = t;
                    break;
                }
                if (u > o && (!r || !s || u < s)) {
                    r = t;
                    s = u;
                } else if (!r && u === 0) {
                    r = t;
                    s = u;
                }
            }
        }
        if (r) r.focus();
    };
    h.prototype.focusPrevious = function (l, m) {
        var v = this;
        var n = v.$,
            o = m === undefined ? v.getTabIndex() : m,
            p, q, r, s = 0,
            t, u = v.getDocument().getBody().getLast();
        while (u = u.getPreviousSourceNode(false, 1)) {
            if (!p) if (!q && u.equals(v)) {
                q = true;
                if (l) {
                    if (!(u = u.getPreviousSourceNode(true, 1))) break;
                    p = 1;
                }
            } else if (q && !v.contains(u)) p = 1;
            if (!u.isVisible() || (t = u.getTabIndex()) < 0) continue;
            if (o <= 0) {
                if (p && t === 0) {
                    r = u;
                    break;
                }
                if (t > s) {
                    r = u;
                    s = t;
                }
            } else {
                if (p && t == o) {
                    r = u;
                    break;
                }
                if (t < o && (!r || t > s)) {
                    r = u;
                    s = t;
                }
            }
        }
        if (r) r.focus();
    };
    (function () {
        j.add('templates', {
            requires: ['dialog'],
            init: function (n) {
                a.dialog.add('templates', a.getUrl(this.path + 'dialogs/templates.js'));
                n.addCommand('templates', new a.dialogCommand('templates'));
                n.ui.addButton('Templates', {
                    label: n.lang.templates.button,
                    command: 'templates'
                });
            }
        });
        var l = {},
            m = {};
        a.addTemplates = function (n, o) {
            l[n] = o;
        };
        a.getTemplates = function (n) {
            return l[n];
        };
        a.loadTemplates = function (n, o) {
            var p = [];
            for (var q = 0; q < n.length; q++) {
                if (!m[n[q]]) {
                    p.push(n[q]);
                    m[n[q]] = 1;
                }
            }
            if (p.length > 0) a.scriptLoader.load(p, o);
            else setTimeout(o, 0);
        };
    })();
    i.templates = 'default';
    i.templates_files = [a.getUrl('plugins/templates/templates/default.js')];
    i.templates_replaceContent = true;
    (function () {
        var l = function () {
                this.toolbars = [];
                this.focusCommandExecuted = false;
            };
        l.prototype.focus = function () {
            for (var n = 0, o; o = this.toolbars[n++];) for (var p = 0, q; q = o.items[p++];) {
                if (q.focus) {
                    q.focus();
                    return;
                }
            }
        };
        var m = {
            toolbarFocus: {
                modes: {
                    wysiwyg: 1,
                    source: 1
                },
                exec: function (n) {
                    if (n.toolbox) {
                        n.toolbox.focusCommandExecuted = true;
                        if (c) setTimeout(function () {
                            n.toolbox.focus();
                        }, 100);
                        else n.toolbox.focus();
                    }
                }
            }
        };
        j.add('toolbar', {
            init: function (n) {
                var o = function (p, q) {
                        var r, s, t, u = n.lang.dir == 'rtl';
                        switch (q) {
                        case u ? 37:
                            39 : case 9:
                            do {
                                r = p.next;
                                if (!r) {
                                    s = p.toolbar.next;
                                    t = s && s.items.length;
                                    while (t === 0) {
                                        s = s.next;
                                        t = s && s.items.length;
                                    }
                                    if (s) r = s.items[0];
                                }
                                p = r;
                            } while (p && !p.focus) if (p) p.focus();
                            else n.toolbox.focus();
                            return false;
                        case u ? 39:
                            37 : case 2000 + 9:
                            do {
                                r = p.previous;
                                if (!r) {
                                    s = p.toolbar.previous;
                                    t = s && s.items.length;
                                    while (t === 0) {
                                        s = s.previous;
                                        t = s && s.items.length;
                                    }
                                    if (s) r = s.items[t - 1];
                                }
                                p = r;
                            } while (p && !p.focus) if (p) p.focus();
                            else {
                                var v = n.toolbox.toolbars[n.toolbox.toolbars.length - 1].items;
                                v[v.length - 1].focus();
                            }
                            return false;
                        case 27:
                            n.focus();
                            return false;
                        case 13:
                        case 32:
                            p.execute();
                            return false;
                        }
                        return true;
                    };
                n.on('themeSpace', function (p) {
                    if (p.data.space == n.config.toolbarLocation) {
                        n.toolbox = new l();
                        var q = 'cke_' + e.getNextNumber(),
                            r = ['<div class="cke_toolbox" role="toolbar" aria-labelledby="', q, '"'],
                            s = n.config.toolbarStartupExpanded !== false,
                            t;
                        r.push(s ? '>' : ' style="display:none">');
                        r.push('<span id="', q, '" class="cke_voice_label">', n.lang.toolbar, '</span>');
                        var u = n.toolbox.toolbars,
                            v = n.config.toolbar instanceof Array ? n.config.toolbar : n.config['toolbar_' + n.config.toolbar];
                        for (var w = 0; w < v.length; w++) {
                            var x = v[w];
                            if (!x) continue;
                            var y = 'cke_' + e.getNextNumber(),
                                z = {
                                    id: y,
                                    items: []
                                };
                            if (t) {
                                r.push('</div>');
                                t = 0;
                            }
                            if (x === '/') {
                                r.push('<div class="cke_break"></div>');
                                continue;
                            }
                            r.push('<span id="', y, '" class="cke_toolbar" role="presentation"><span class="cke_toolbar_start"></span>');
                            var A = u.push(z) - 1;
                            if (A > 0) {
                                z.previous = u[A - 1];
                                z.previous.next = z;
                            }
                            for (var B = 0; B < x.length; B++) {
                                var C, D = x[B];
                                if (D == '-') C = k.separator;
                                else C = n.ui.create(D);
                                if (C) {
                                    if (C.canGroup) {
                                        if (!t) {
                                            r.push('<span class="cke_toolgroup" role="presentation">');
                                            t = 1;
                                        }
                                    } else if (t) {
                                        r.push('</span>');
                                        t = 0;
                                    }
                                    var E = C.render(n, r);
                                    A = z.items.push(E) - 1;
                                    if (A > 0) {
                                        E.previous = z.items[A - 1];
                                        E.previous.next = E;
                                    }
                                    E.toolbar = z;
                                    E.onkey = o;
                                    E.onfocus = function () {
                                        if (!n.toolbox.focusCommandExecuted) n.focus();
                                    };
                                }
                            }
                            if (t) {
                                r.push('</span>');
                                t = 0;
                            }
                            r.push('<span class="cke_toolbar_end"></span></span>');
                        }
                        r.push('</div>');
                        if (n.config.toolbarCanCollapse) {
                            var F = e.addFunction(function () {
                                n.execCommand('toolbarCollapse');
                            });
                            n.on('destroy', function () {
                                e.removeFunction(F);
                            });
                            var G = 'cke_' + e.getNextNumber();
                            n.addCommand('toolbarCollapse', {
                                exec: function (H) {
                                    var I = a.document.getById(G),
                                        J = I.getPrevious(),
                                        K = H.getThemeSpace('contents'),
                                        L = J.getParent(),
                                        M = parseInt(K.$.style.height, 10),
                                        N = L.$.offsetHeight,
                                        O = !J.isVisible();
                                    if (!O) {
                                        J.hide();
                                        I.addClass('cke_toolbox_collapser_min');
                                        I.setAttribute('title', H.lang.toolbarExpand);
                                    } else {
                                        J.show();
                                        I.removeClass('cke_toolbox_collapser_min');
                                        I.setAttribute('title', H.lang.toolbarCollapse);
                                    }
                                    I.getFirst().setText(O ? '▲' : '◀');
                                    var P = L.$.offsetHeight - N;
                                    K.setStyle('height', M - P + 'px');
                                    H.fire('resize');
                                },
                                modes: {
                                    wysiwyg: 1,
                                    source: 1
                                }
                            });
                            r.push('<a title="' + (s ? n.lang.toolbarCollapse : n.lang.toolbarExpand) + '" id="' + G + '" tabIndex="-1" class="cke_toolbox_collapser');
                            if (!s) r.push(' cke_toolbox_collapser_min');
                            r.push('" onclick="CKEDITOR.tools.callFunction(' + F + ')">', '<span>&#9650;</span>', '</a>');
                        }
                        p.data.html += r.join('');
                    }
                });
                n.addCommand('toolbarFocus', m.toolbarFocus);
            }
        });
    })();
    k.separator = {
        render: function (l, m) {
            m.push('<span class="cke_separator" role="separator"></span>');
            return {};
        }
    };
    i.toolbarLocation = 'top';
    i.toolbar_Basic = [
        ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
    ];
    i.toolbar_Full = [
        ['Source', '-', 'Save', 'NewPage', 'Preview', '-', 'Templates'],
        ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Print', 'SpellChecker', 'Scayt'],
        ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'],
        ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'], '/', ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
        ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote', 'CreateDiv'],
        ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
        ['Link', 'Unlink', 'Anchor'],
        ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'], '/', ['Styles', 'Format', 'Font', 'FontSize'],
        ['TextColor', 'BGColor'],
        ['Maximize', 'ShowBlocks', '-', 'About']
    ];
    i.toolbar = 'Full';
    i.toolbarCanCollapse = true;
    (function () {
        j.add('undo', {
            requires: ['selection', 'wysiwygarea'],
            init: function (r) {
                var s = new n(r),
                    t = r.addCommand('undo', {
                        exec: function () {
                            if (s.undo()) {
                                r.selectionChange();
                                this.fire('afterUndo');
                            }
                        },
                        state: 0,
                        canUndo: false
                    }),
                    u = r.addCommand('redo', {
                        exec: function () {
                            if (s.redo()) {
                                r.selectionChange();
                                this.fire('afterRedo');
                            }
                        },
                        state: 0,
                        canUndo: false
                    });
                s.onChange = function () {
                    t.setState(s.undoable() ? 2 : 0);
                    u.setState(s.redoable() ? 2 : 0);
                };

                function v(w) {
                    if (s.enabled && w.data.command.canUndo !== false) s.save();
                };
                r.on('beforeCommandExec', v);
                r.on('afterCommandExec', v);
                r.on('saveSnapshot', function () {
                    s.save();
                });
                r.on('contentDom', function () {
                    r.document.on('keydown', function (w) {
                        if (!w.data.$.ctrlKey && !w.data.$.metaKey) s.type(w);
                    });
                });
                r.on('beforeModeUnload', function () {
                    r.mode == 'wysiwyg' && s.save(true);
                });
                r.on('mode', function () {
                    s.enabled = r.mode == 'wysiwyg';
                    s.onChange();
                });
                r.ui.addButton('Undo', {
                    label: r.lang.undo,
                    command: 'undo'
                });
                r.ui.addButton('Redo', {
                    label: r.lang.redo,
                    command: 'redo'
                });
                r.resetUndo = function () {
                    s.reset();
                    r.fire('saveSnapshot');
                };
                r.on('updateSnapshot', function () {
                    if (s.currentImage && new l(r).equals(s.currentImage)) setTimeout(function () {
                        s.update();
                    }, 0);
                });
            }
        });
        j.undo = {};
        var l = j.undo.Image = function (r) {
                this.editor = r;
                var s = r.getSnapshot(),
                    t = s && r.getSelection();
                c && s && (s = s.replace(/\s+_cke_expando=".*?"/g, ''));
                this.contents = s;
                this.bookmarks = t && t.createBookmarks2(true);
            },
            m = /\b(?:href|src|name)="[^"]*?"/gi;
        l.prototype = {
            equals: function (r, s) {
                var t = this.contents,
                    u = r.contents;
                if (c && (b.ie7Compat || b.ie6Compat)) {
                    t = t.replace(m, '');
                    u = u.replace(m, '');
                }
                if (t != u) return false;
                if (s) return true;
                var v = this.bookmarks,
                    w = r.bookmarks;
                if (v || w) {
                    if (!v || !w || v.length != w.length) return false;
                    for (var x = 0; x < v.length; x++) {
                        var y = v[x],
                            z = w[x];
                        if (y.startOffset != z.startOffset || y.endOffset != z.endOffset || !e.arrayCompare(y.start, z.start) || !e.arrayCompare(y.end, z.end)) return false;
                    }
                }
                return true;
            }
        };

        function n(r) {
            this.editor = r;
            this.reset();
        };
        var o = {
            8: 1,
            46: 1
        },
            p = {
                16: 1,
                17: 1,
                18: 1
            },
            q = {
                37: 1,
                38: 1,
                39: 1,
                40: 1
            };
        n.prototype = {
            type: function (r) {
                var s = r && r.data.getKey(),
                    t = s in p,
                    u = s in o,
                    v = this.lastKeystroke in o,
                    w = u && s == this.lastKeystroke,
                    x = s in q,
                    y = this.lastKeystroke in q,
                    z = !u && !x,
                    A = u && !w,
                    B = !(t || this.typing) || z && (v || y);
                if (B || A) {
                    var C = new l(this.editor);
                    e.setTimeout(function () {
                        var E = this;
                        var D = E.editor.getSnapshot();
                        if (c) D = D.replace(/\s+_cke_expando=".*?"/g, '');
                        if (C.contents != D) {
                            E.typing = true;
                            if (!E.save(false, C, false)) E.snapshots.splice(E.index + 1, E.snapshots.length - E.index - 1);
                            E.hasUndo = true;
                            E.hasRedo = false;
                            E.typesCount = 1;
                            E.modifiersCount = 1;
                            E.onChange();
                        }
                    }, 0, this);
                }
                this.lastKeystroke = s;
                if (u) {
                    this.typesCount = 0;
                    this.modifiersCount++;
                    if (this.modifiersCount > 25) {
                        this.save(false, null, false);
                        this.modifiersCount = 1;
                    }
                } else if (!x) {
                    this.modifiersCount = 0;
                    this.typesCount++;
                    if (this.typesCount > 25) {
                        this.save(false, null, false);
                        this.typesCount = 1;
                    }
                }
            },
            reset: function () {
                var r = this;
                r.lastKeystroke = 0;
                r.snapshots = [];
                r.index = -1;
                r.limit = r.editor.config.undoStackSize;
                r.currentImage = null;
                r.hasUndo = false;
                r.hasRedo = false;
                r.resetType();
            },
            resetType: function () {
                var r = this;
                r.typing = false;
                delete r.lastKeystroke;
                r.typesCount = 0;
                r.modifiersCount = 0;
            },
            fireChange: function () {
                var r = this;
                r.hasUndo = !! r.getNextImage(true);
                r.hasRedo = !! r.getNextImage(false);
                r.resetType();
                r.onChange();
            },
            save: function (r, s, t) {
                var v = this;
                var u = v.snapshots;
                if (!s) s = new l(v.editor);
                if (s.contents === false) return false;
                if (v.currentImage && s.equals(v.currentImage, r)) return false;
                u.splice(v.index + 1, u.length - v.index - 1);
                if (u.length == v.limit) u.shift();
                v.index = u.push(s) - 1;
                v.currentImage = s;
                if (t !== false) v.fireChange();
                return true;
            },
            restoreImage: function (r) {
                var t = this;
                t.editor.loadSnapshot(r.contents);
                if (r.bookmarks) t.editor.getSelection().selectBookmarks(r.bookmarks);
                else if (c) {
                    var s = t.editor.document.getBody().$.createTextRange();
                    s.collapse(true);
                    s.select();
                }
                t.index = r.index;
                t.update();
                t.fireChange();
            },
            getNextImage: function (r) {
                var w = this;
                var s = w.snapshots,
                    t = w.currentImage,
                    u, v;
                if (t) if (r) for (v = w.index - 1; v >= 0; v--) {
                    u = s[v];
                    if (!t.equals(u, true)) {
                        u.index = v;
                        return u;
                    }
                } else for (v = w.index + 1; v < s.length; v++) {
                    u = s[v];
                    if (!t.equals(u, true)) {
                        u.index = v;
                        return u;
                    }
                }
                return null;
            },
            redoable: function () {
                return this.enabled && this.hasRedo;
            },
            undoable: function () {
                return this.enabled && this.hasUndo;
            },
            undo: function () {
                var s = this;
                if (s.undoable()) {
                    s.save(true);
                    var r = s.getNextImage(true);
                    if (r) return s.restoreImage(r), true;
                }
                return false;
            },
            redo: function () {
                var s = this;
                if (s.redoable()) {
                    s.save(true);
                    if (s.redoable()) {
                        var r = s.getNextImage(false);
                        if (r) return s.restoreImage(r), true;
                    }
                }
                return false;
            },
            update: function () {
                var r = this;
                r.snapshots.splice(r.index, 1, r.currentImage = new l(r.editor));
            }
        };
    })();
    i.undoStackSize = 20;
    (function () {
        var l = {
            table: 1,
            pre: 1
        },
            m = /\s*<(p|div|address|h\d|center)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\1>)?\s*(?=$|<\/body>)/gi;

        function n(x) {
            if (this.mode == 'wysiwyg') {
                this.focus();
                this.fire('saveSnapshot');
                var y = this.getSelection(),
                    z = x.data;
                if (this.dataProcessor) z = this.dataProcessor.toHtml(z);
                if (c) {
                    var A = y.isLocked;
                    if (A) y.unlock();
                    var B = y.getNative();
                    if (B.type == 'Control') B.clear();
                    B.createRange().pasteHTML(z);
                    if (A) this.getSelection().lock();
                } else this.document.$.execCommand('inserthtml', false, z);
                e.setTimeout(function () {
                    this.fire('saveSnapshot');
                }, 0, this);
            }
        };

        function o(x) {
            if (this.mode == 'wysiwyg') {
                this.focus();
                this.fire('saveSnapshot');
                var y = x.data,
                    z = y.getName(),
                    A = f.$block[z],
                    B = this.getSelection(),
                    C = B.getRanges(),
                    D = B.isLocked;
                if (D) B.unlock();
                var E, F, G, H;
                for (var I = C.length - 1; I >= 0; I--) {
                    E = C[I];
                    E.deleteContents();
                    F = !I && y || y.clone(true);
                    var J, K;
                    if (A) while ((J = E.getCommonAncestor(false, true)) && (K = f[J.getName()]) && !(K && K[z])) {
                        if (J.getName() in f.span) E.splitElement(J);
                        else if (E.checkStartOfBlock() && E.checkEndOfBlock()) {
                            E.setStartBefore(J);
                            E.collapse(true);
                            J.remove();
                        } else E.splitBlock();
                    }
                    E.insertNode(F);
                    if (!G) G = F;
                }
                E.moveToPosition(G, 4);
                var L = G.getNextSourceNode(true);
                if (L && L.type == 1) E.moveToElementEditStart(L);
                B.selectRanges([E]);
                if (D) this.getSelection().lock();
                e.setTimeout(function () {
                    this.fire('saveSnapshot');
                }, 0, this);
            }
        };

        function p(x) {
            if (!x.checkDirty()) setTimeout(function () {
                x.resetDirty();
            });
        };
        var q = d.walker.whitespaces(true),
            r = d.walker.bookmark(false, true);

        function s(x) {
            return q(x) && r(x);
        };

        function t(x) {
            return x.type == 3 && e.trim(x.getText()).match(/^(?:&nbsp;|\xa0)$/);
        };

        function u(x) {
            if (x.isLocked) {
                x.unlock();
                setTimeout(function () {
                    x.lock();
                }, 0);
            }
        };

        function v(x) {
            return x.getOuterHtml().match(m);
        };
        q = d.walker.whitespaces(true);

        function w(x) {
            var y = x.editor,
                z = x.data.path,
                A = z.blockLimit,
                B = x.data.selection,
                C = B.getRanges()[0],
                D = y.document.getBody(),
                E = y.config.enterMode;
            if (E != 2 && C.collapsed && A.getName() == 'body' && !z.block) {
                y.fire('updateSnapshot');
                p(y);
                c && u(B);
                var F = C.fixBlock(true, y.config.enterMode == 3 ? 'div' : 'p');
                if (c) {
                    var G = F.getFirst(s);
                    G && t(G) && G.remove();
                }
                if (v(F)) {
                    var H = F.getPrevious(q),
                        I = F.getNext(q);
                    if (H && H.getName && !(H.getName() in l) && v(H) && C.moveToElementEditStart(H) || I && I.getName && !(I.getName() in l) && v(I) && C.moveToElementEditStart(I)) F.remove();
                }
                C.select();
                if (!c) y.selectionChange();
            }
            var J = new d.range(y.document),
                K = new d.walker(J);
            J.selectNodeContents(D);
            K.evaluator = function (M) {
                return M.type == 1 && M.getName() in l;
            };
            K.guard = function (M, N) {
                return !(M.type == 3 && q(M) || N);
            };
            if (K.previous()) {
                y.fire('updateSnapshot');
                p(y);
                c && u(B);
                var L;
                if (E != 2) L = D.append(new h(E == 1 ? 'p' : 'div'));
                else L = D;
                if (!c) L.appendBogus();
            }
        };
        j.add('wysiwygarea', {
            requires: ['editingblock'],
            init: function (x) {
                var y = x.config.enterMode != 2 ? x.config.enterMode == 3 ? 'div' : 'p' : false,
                    z = x.lang.editorTitle.replace('%1', x.name),
                    A;
                x.on('editingBlockReady', function () {
                    var G, H, I, J, K, L, M = b.isCustomDomain(),
                        N = function (Q) {
                            if (H) H.remove();
                            var R = 'document.open();' + (M ? 'document.domain="' + document.domain + '";' : '') + 'document.close();';
                            H = h.createFromHtml('<iframe style="width:100%;height:100%" frameBorder="0" title="' + z + '"' + ' src="' + (c ? 'javascript:void(function(){' + encodeURIComponent(R) + '}())' : '') + '"' + ' tabIndex="' + (b.webkit ? -1 : x.tabIndex) + '"' + ' allowTransparency="true"' + '></iframe>');
                            H.on('load', function (S) {
                                K = 1;
                                S.removeListener();
                                var T = H.getFrameDocument().$;
                                T.open('text/html', 'replace');
                                T.write(Q);
                                T.close();
                            });
                            G.append(H);
                        };
                    A = e.addFunction(P);
                    var O = '<script id="cke_actscrpt" type="text/javascript" cke_temp="1">' + (M ? 'document.domain="' + document.domain + '";' : '') + 'window.parent.CKEDITOR.tools.callFunction( ' + A + ', window );' + '</script>';

                    function P(Q) {
                        if (!K) return;
                        K = 0;
                        x.fire('ariaWidget', H);
                        var R = Q.document,
                            S = R.body,
                            T = R.getElementById('cke_actscrpt');
                        T.parentNode.removeChild(T);
                        S.spellcheck = !x.config.disableNativeSpellChecker;
                        if (c) {
                            S.hideFocus = true;
                            S.disabled = true;
                            S.contentEditable = true;
                            S.removeAttribute('disabled');
                        } else setTimeout(function () {
                            if (b.gecko && b.version >= 10900 || b.opera) R.$.body.contentEditable = true;
                            else if (b.webkit) R.$.body.parentNode.contentEditable = true;
                            else R.$.designMode = 'on';
                        }, 0);
                        if (b.gecko && !S.childNodes.length) setTimeout(function () {
                            p(x);
                            var X = R.$.createEvent('KeyEvents');
                            X.initKeyEvent('keypress', true, true, Q.$, false, false, false, false, 0, 32);
                            R.$.dispatchEvent(X);
                            R.createElement('br', {
                                attributes: {
                                    _moz_editor_bogus_node: 'TRUE',
                                    _moz_dirty: ''
                                }
                            }).replace(R.getBody().getFirst());
                            var Y = new d.range(R);
                            Y.setStartAt(new h(S), 1);
                            Y.select();
                        }, 0);
                        try {
                            R.execCommand('enableObjectResizing', false, !x.config.disableObjectResizing);
                        } catch (X) {}
                        try {
                            R.execCommand('enableInlineTableEditing', false, !x.config.disableNativeTableHandles);
                        } catch (Y) {}
                        Q = x.window = new d.window(Q);
                        R = x.document = new g(R);
                        R.on('dblclick', function (Z) {
                            var aa = Z.data.getTarget(),
                                ab = {
                                    element: aa,
                                    dialog: ''
                                };
                            x.fire('doubleclick', ab);
                            ab.dialog && x.openDialog(ab.dialog);
                        });
                        if (!(c || b.opera)) R.on('mousedown', function (Z) {
                            var aa = Z.data.getTarget();
                            if (aa.is('img', 'hr', 'input', 'textarea', 'select')) x.getSelection().selectElement(aa);
                        });
                        if (b.webkit) {
                            R.on('click', function (Z) {
                                if (Z.data.getTarget().is('input', 'select')) Z.data.preventDefault();
                            });
                            R.on('mouseup', function (Z) {
                                if (Z.data.getTarget().is('input', 'textarea')) Z.data.preventDefault();
                            });
                        }
                        if (c && R.$.compatMode == 'CSS1Compat' || b.gecko || b.opera) {
                            var U = R.getDocumentElement();
                            U.on('mousedown', function (Z) {
                                if (Z.data.getTarget().equals(U)) {
                                    if (b.gecko && b.version >= 10900) E();
                                    F.focus();
                                }
                            });
                        }
                        Q.on('blur', function () {
                            x.focusManager.blur();
                        });
                        Q.on('focus', function () {
                            var Z = x.document;
                            if (b.gecko && b.version >= 10900) E();
                            else if (b.opera) Z.getBody().focus();
                            else if (b.webkit) {
                                var aa = x.getSelection(),
                                    ab = aa.getType(),
                                    ac = ab != 1 && aa.getRanges()[0];
                                Z.getDocumentElement().focus();
                                ac && ac.select();
                            }
                            x.focusManager.focus();
                        });
                        var V = x.keystrokeHandler;
                        if (V) V.attach(R);
                        if (c) {
                            R.getDocumentElement().addClass(R.$.compatMode);
                            R.on('keydown', function (Z) {
                                var aa = Z.data.getKeystroke();
                                if (aa in {
                                    8: 1,
                                    46: 1
                                }) {
                                    var ab = x.getSelection(),
                                        ac = ab.getSelectedElement();
                                    if (ac) {
                                        x.fire('saveSnapshot');
                                        var ad = ab.getRanges()[0].createBookmark();
                                        ac.remove();
                                        ab.selectBookmarks([ad]);
                                        x.fire('saveSnapshot');
                                        Z.data.preventDefault();
                                    }
                                }
                            });
                            if (R.$.compatMode == 'CSS1Compat') {
                                var W = {
                                    33: 1,
                                    34: 1
                                };
                                R.on('keydown', function (Z) {
                                    if (Z.data.getKeystroke() in W) setTimeout(function () {
                                        x.getSelection().scrollIntoView();
                                    }, 0);
                                });
                            }
                        }
                        if (x.contextMenu) x.contextMenu.addTarget(R, x.config.browserContextMenuOnCtrl !== false);
                        setTimeout(function () {
                            x.fire('contentDom');
                            if (L) {
                                x.mode = 'wysiwyg';
                                x.fire('mode');
                                L = false;
                            }
                            I = false;
                            if (J) {
                                x.focus();
                                J = false;
                            }
                            setTimeout(function () {
                                x.fire('dataReady');
                            }, 0);
                            if (c) setTimeout(function () {
                                if (x.document) {
                                    var Z = x.document.$.body;
                                    Z.runtimeStyle.marginBottom = '0px';
                                    Z.runtimeStyle.marginBottom = '';
                                }
                            }, 1000);
                        }, 0);
                    };
                    x.addMode('wysiwyg', {
                        load: function (Q, R, S) {
                            G = Q;
                            if (c && b.quirks) Q.setStyle('position', 'relative');
                            x.mayBeDirty = true;
                            L = true;
                            if (S) this.loadSnapshotData(R);
                            else this.loadData(R);
                        },
                        loadData: function (Q) {
                            I = true;
                            var R = x.config,
                                S = R.fullPage,
                                T = R.docType,
                                U = '<style type="text/css" cke_temp="1">' + x._.styles.join('\n') + '</style>';
                            !S && (U = e.buildStyleHtml(x.config.contentsCss) + U);
                            var V = R.baseHref ? '<base href="' + R.baseHref + '" cke_temp="1" />' : '';
                            if (S) Q = Q.replace(/<!DOCTYPE[^>]*>/i, function (W) {
                                x.docType = T = W;
                                return '';
                            });
                            if (x.dataProcessor) Q = x.dataProcessor.toHtml(Q, y);
                            if (S) {
                                if (!/<body[\s|>]/.test(Q)) Q = '<body>' + Q;
                                if (!/<html[\s|>]/.test(Q)) Q = '<html>' + Q + '</html>';
                                if (!/<head[\s|>]/.test(Q)) Q = Q.replace(/<html[^>]*>/, '$&<head><title></title></head>');
                                else if (!/<title[\s|>]/.test(Q)) Q = Q.replace(/<head[^>]*>/, '$&<title></title>');
                                V && (Q = Q.replace(/<head>/, '$&' + V));
                                Q = Q.replace(/<\/head\s*>/, U + '$&');
                                Q = T + Q;
                            } else Q = R.docType + '<html dir="' + R.contentsLangDirection + '"' + ' lang="' + (R.contentsLanguage || x.langCode) + '">' + '<head>' + '<title>' + z + '</title>' + V + U + '</head>' + '<body' + (R.bodyId ? ' id="' + R.bodyId + '"' : '') + (R.bodyClass ? ' class="' + R.bodyClass + '"' : '') + '>' + Q + '</html>';
                            Q += O;
                            this.onDispose();
                            N(Q);
                        },
                        getData: function () {
                            var Q = x.config,
                                R = Q.fullPage,
                                S = R && x.docType,
                                T = H.getFrameDocument(),
                                U = R ? T.getDocumentElement().getOuterHtml() : T.getBody().getHtml();
                            if (x.dataProcessor) U = x.dataProcessor.toDataFormat(U, y);
                            if (Q.ignoreEmptyParagraph) U = U.replace(m, '');
                            if (S) U = S + '\n' + U;
                            return U;
                        },
                        getSnapshotData: function () {
                            return H.getFrameDocument().getBody().getHtml();
                        },
                        loadSnapshotData: function (Q) {
                            H.getFrameDocument().getBody().setHtml(Q);
                        },
                        onDispose: function () {
                            if (!x.document) return;
                            x.document.getDocumentElement().clearCustomData();
                            x.document.getBody().clearCustomData();
                            x.window.clearCustomData();
                            x.document.clearCustomData();
                            H.clearCustomData();
                        },
                        unload: function (Q) {
                            this.onDispose();
                            x.window = x.document = H = G = J = null;
                            x.fire('contentDomUnload');
                        },
                        focus: function () {
                            if (I) J = true;
                            else if (x.window) {
                                x.window.focus();
                                x.selectionChange();
                            }
                        }
                    });
                    x.on('insertHtml', n, null, null, 20);
                    x.on('insertElement', o, null, null, 20);
                    x.on('selectionChange', w, null, null, 1);
                });
                var B;
                x.on('contentDom', function () {
                    var G = x.document.getElementsByTag('title').getItem(0);
                    G.setAttribute('_cke_title', x.document.$.title);
                    x.document.$.title = z;
                });
                if (b.ie8Compat) {
                    x.addCss('html.CSS1Compat [contenteditable=false]{ min-height:0 !important;}');
                    var C = [];
                    for (var D in f.$removeEmpty) C.push('html.CSS1Compat ' + D + '[contenteditable=false]');
                    x.addCss(C.join(',') + '{ display:inline-block;}');
                }
                function E(G) {
                    e.tryThese(function () {
                        x.document.$.designMode = 'on';
                        setTimeout(function () {
                            x.document.$.designMode = 'off';
                            x.document.getBody().focus();
                        }, 50);
                    }, function () {
                        x.document.$.designMode = 'off';
                        var H = x.document.getBody();
                        H.setAttribute('contentEditable', false);
                        H.setAttribute('contentEditable', true);
                        !G && E(1);
                    });
                };
                if (b.gecko || c || b.opera) {
                    var F;
                    x.on('uiReady', function () {
                        F = x.container.append(h.createFromHtml('<span tabindex="-1" style="position:absolute; left:-10000" role="presentation"></span>'));
                        F.on('focus', function () {
                            x.focus();
                        });
                    });
                    x.on('destroy', function () {
                        e.removeFunction(A);
                        F.clearCustomData();
                    });
                }
                x.on('insertElement', function (G) {
                    var H = G.data;
                    if (H.type = 1 && (H.is('input') || H.is('textarea'))) H.setAttribute('contentEditable', false);
                });
            }
        });
        if (b.gecko)(function () {
            var x = document.body;
            if (!x) window.addEventListener('load', arguments.callee, false);
            else {
                var y = x.getAttribute('onpageshow');
                x.setAttribute('onpageshow', (y ? y + ';' : '') + 'event.persisted && (function(){' + 'var allInstances = CKEDITOR.instances, editor, doc;' + 'for ( var i in allInstances )' + '{' + '\teditor = allInstances[ i ];' + '\tdoc = editor.document;' + '\tif ( doc )' + '\t{' + '\t\tdoc.$.designMode = "off";' + '\t\tdoc.$.designMode = "on";' + '\t}' + '}' + '})();');
            }
        })();
    })();
    i.disableObjectResizing = false;
    i.disableNativeTableHandles = true;
    i.disableNativeSpellChecker = true;
    i.ignoreEmptyParagraph = true;
    j.add('wsc', {
        requires: ['dialog'],
        init: function (l) {
            var m = 'checkspell',
                n = l.addCommand(m, new a.dialogCommand(m));
            n.modes = {
                wysiwyg: !b.opera && document.domain == window.location.hostname
            };
            l.ui.addButton('SpellChecker', {
                label: l.lang.spellCheck.toolbar,
                command: m
            });
            a.dialog.add(m, this.path + 'dialogs/wsc.js');
        }
    });
    i.wsc_customerId = i.wsc_customerId || '1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk';
    i.wsc_customLoaderScript = i.wsc_customLoaderScript || null;
    a.DIALOG_RESIZE_NONE = 0;
    a.DIALOG_RESIZE_WIDTH = 1;
    a.DIALOG_RESIZE_HEIGHT = 2;
    a.DIALOG_RESIZE_BOTH = 3;
    (function () {
        function l(M) {
            return !!this._.tabs[M][0].$.offsetHeight;
        };

        function m() {
            var Q = this;
            var M = Q._.currentTabId,
                N = Q._.tabIdList.length,
                O = e.indexOf(Q._.tabIdList, M) + N;
            for (var P = O - 1; P > O - N; P--) {
                if (l.call(Q, Q._.tabIdList[P % N])) return Q._.tabIdList[P % N];
            }
            return null;
        };

        function n() {
            var Q = this;
            var M = Q._.currentTabId,
                N = Q._.tabIdList.length,
                O = e.indexOf(Q._.tabIdList, M);
            for (var P = O + 1; P < O + N; P++) {
                if (l.call(Q, Q._.tabIdList[P % N])) return Q._.tabIdList[P % N];
            }
            return null;
        };
        a.dialog = function (M, N) {
            var O = a.dialog._.dialogDefinitions[N];
            O = e.extend(O(M), p);
            O = e.clone(O);
            O = new t(this, O);
            var P = a.document,
                Q = M.theme.buildDialog(M);
            this._ = {
                editor: M,
                element: Q.element,
                name: N,
                contentSize: {
                    width: 0,
                    height: 0
                },
                size: {
                    width: 0,
                    height: 0
                },
                updateSize: false,
                contents: {},
                buttons: {},
                accessKeyMap: {},
                tabs: {},
                tabIdList: [],
                currentTabId: null,
                currentTabIndex: null,
                pageCount: 0,
                lastTab: null,
                tabBarMode: false,
                focusList: [],
                currentFocusIndex: 0,
                hasFocus: false
            };
            this.parts = Q.parts;
            e.setTimeout(function () {
                M.fire('ariaWidget', this.parts.contents);
            }, 0, this);
            this.parts.dialog.setStyles({
                position: b.ie6Compat ? 'absolute' : 'fixed',
                top: 0,
                left: 0,
                visibility: 'hidden'
            });
            a.event.call(this);
            this.definition = O = a.fire('dialogDefinition', {
                name: N,
                definition: O
            }, M).definition;
            if (O.onLoad) this.on('load', O.onLoad);
            if (O.onShow) this.on('show', O.onShow);
            if (O.onHide) this.on('hide', O.onHide);
            if (O.onOk) this.on('ok', function (ac) {
                if (O.onOk.call(this, ac) === false) ac.data.hide = false;
            });
            if (O.onCancel) this.on('cancel', function (ac) {
                if (O.onCancel.call(this, ac) === false) ac.data.hide = false;
            });
            var R = this,
                S = function (ac) {
                    var ad = R._.contents,
                        ae = false;
                    for (var af in ad) for (var ag in ad[af]) {
                        ae = ac.call(this, ad[af][ag]);
                        if (ae) return;
                    }
                };
            this.on('ok', function (ac) {
                S(function (ad) {
                    if (ad.validate) {
                        var ae = ad.validate(this);
                        if (typeof ae == 'string') {
                            alert(ae);
                            ae = false;
                        }
                        if (ae === false) {
                            if (ad.select) ad.select();
                            else ad.focus();
                            ac.data.hide = false;
                            ac.stop();
                            return true;
                        }
                    }
                });
            }, this, null, 0);
            this.on('cancel', function (ac) {
                S(function (ad) {
                    if (ad.isChanged()) {
                        if (!confirm(M.lang.common.confirmCancel)) ac.data.hide = false;
                        return true;
                    }
                });
            }, this, null, 0);
            this.parts.close.on('click', function (ac) {
                if (this.fire('cancel', {
                    hide: true
                }).hide !== false) this.hide();
                ac.data.preventDefault();
            }, this);

            function T() {
                var ac = R._.focusList;
                ac.sort(function (af, ag) {
                    if (af.tabIndex != ag.tabIndex) return ag.tabIndex - af.tabIndex;
                    else return af.focusIndex - ag.focusIndex;
                });
                var ad = ac.length;
                for (var ae = 0; ae < ad; ae++) ac[ae].focusIndex = ae;
            };

            function U(ac) {
                var ad = R._.focusList,
                    ae = ac ? 1 : -1;
                if (ad.length < 1) return;
                var af = R._.currentFocusIndex;
                try {
                    ad[af].getInputElement().$.blur();
                } catch (ai) {}
                var ag = (af + ae + ad.length) % ad.length,
                    ah = ag;
                while (!ad[ah].isFocusable()) {
                    ah = (ah + ae + ad.length) % ad.length;
                    if (ah == ag) break;
                }
                ad[ah].focus();
                if (ad[ah].type == 'text') ad[ah].select();
            };
            this.changeFocus = U;
            var V;

            function W(ac) {
                var ah = this;
                if (R != a.dialog._.currentTop) return;
                var ad = ac.data.getKeystroke(),
                    ae = M.lang.dir == 'rtl';
                V = 0;
                if (ad == 9 || ad == 2000 + 9) {
                    var af = ad == 2000 + 9;
                    if (R._.tabBarMode) {
                        var ag = af ? m.call(R) : n.call(R);
                        R.selectPage(ag);
                        R._.tabs[ag][0].focus();
                    } else U(!af);
                    V = 1;
                } else if (ad == 4000 + 121 && !R._.tabBarMode && R.getPageCount() > 1) {
                    R._.tabBarMode = true;
                    R._.tabs[R._.currentTabId][0].focus();
                    V = 1;
                } else if ((ad == 37 || ad == 39) && R._.tabBarMode) {
                    ag = ad == (ae ? 39 : 37) ? m.call(R) : n.call(R);
                    R.selectPage(ag);
                    R._.tabs[ag][0].focus();
                    V = 1;
                } else if ((ad == 13 || ad == 32) && R._.tabBarMode) {
                    ah.selectPage(ah._.currentTabId);
                    ah._.tabBarMode = false;
                    ah._.currentFocusIndex = -1;
                    U(true);
                    V = 1;
                }
                if (V) {
                    ac.stop();
                    ac.data.preventDefault();
                }
            };

            function X(ac) {
                V && ac.data.preventDefault();
            };
            var Y = this._.element;
            this.on('show', function () {
                Y.on('keydown', W, this, null, 0);
                if (b.opera || b.gecko && b.mac) Y.on('keypress', X, this);
            });
            this.on('hide', function () {
                Y.removeListener('keydown', W);
                if (b.opera || b.gecko && b.mac) Y.removeListener('keypress', X);
            });
            this.on('iframeAdded', function (ac) {
                var ad = new g(ac.data.iframe.$.contentWindow.document);
                ad.on('keydown', W, this, null, 0);
            });
            this.on('show', function () {
                var ag = this;
                T();
                if (M.config.dialog_startupFocusTab && R._.tabIdList.length > 1) {
                    R._.tabBarMode = true;
                    R._.tabs[R._.currentTabId][0].focus();
                } else if (!ag._.hasFocus) {
                    ag._.currentFocusIndex = -1;
                    if (O.onFocus) {
                        var ac = O.onFocus.call(ag);
                        ac && ac.focus();
                    } else U(true);
                    if (ag._.editor.mode == 'wysiwyg' && c) {
                        var ad = M.document.$.selection,
                            ae = ad.createRange();
                        if (ae) if (ae.parentElement && ae.parentElement().ownerDocument == M.document.$ || ae.item && ae.item(0).ownerDocument == M.document.$) {
                            var af = document.body.createTextRange();
                            af.moveToElementText(ag.getElement().getFirst().$);
                            af.collapse(true);
                            af.select();
                        }
                    }
                }
            }, this, null, 4294967295);
            if (b.ie6Compat) this.on('load', function (ac) {
                var ad = this.getElement(),
                    ae = ad.getFirst();
                ae.remove();
                ae.appendTo(ad);
            }, this);
            v(this);
            w(this);
            new d.text(O.title, a.document).appendTo(this.parts.title);
            for (var Z = 0; Z < O.contents.length; Z++) this.addPage(O.contents[Z]);
            this.parts.tabs.on('click', function (ac) {
                var af = this;
                var ad = ac.data.getTarget();
                if (ad.hasClass('cke_dialog_tab')) {
                    var ae = ad.$.id;
                    af.selectPage(ae.substr(0, ae.lastIndexOf('_')));
                    if (af._.tabBarMode) {
                        af._.tabBarMode = false;
                        af._.currentFocusIndex = -1;
                        U(true);
                    }
                    ac.data.preventDefault();
                }
            }, this);
            var aa = [],
                ab = a.dialog._.uiElementBuilders.hbox.build(this, {
                    type: 'hbox',
                    className: 'cke_dialog_footer_buttons',
                    widths: [],
                    children: O.buttons
                }, aa).getChild();
            this.parts.footer.setHtml(aa.join(''));
            for (Z = 0; Z < ab.length; Z++) this._.buttons[ab[Z].id] = ab[Z];
        };

        function o(M, N, O) {
            this.element = N;
            this.focusIndex = O;
            this.tabIndex = 0;
            this.isFocusable = function () {
                return !N.getAttribute('disabled') && N.isVisible();
            };
            this.focus = function () {
                M._.currentFocusIndex = this.focusIndex;
                this.element.focus();
            };
            N.on('keydown', function (P) {
                if (P.data.getKeystroke() in {
                    32: 1,
                    13: 1
                }) this.fire('click');
            });
            N.on('focus', function () {
                this.fire('mouseover');
            });
            N.on('blur', function () {
                this.fire('mouseout');
            });
        };
        a.dialog.prototype = {
            destroy: function () {
                this.hide();
                this._.element.remove();
            },
            resize: (function () {
                return function (M, N) {
                    var O = this;
                    if (O._.contentSize && O._.contentSize.width == M && O._.contentSize.height == N) return;
                    a.dialog.fire('resize', {
                        dialog: O,
                        skin: O._.editor.skinName,
                        width: M,
                        height: N
                    }, O._.editor);
                    O._.contentSize = {
                        width: M,
                        height: N
                    };
                    O._.updateSize = true;
                };
            })(),
            getSize: function () {
                var O = this;
                if (!O._.updateSize) return O._.size;
                var M = O._.element.getFirst(),
                    N = O._.size = {
                        width: M.$.offsetWidth || 0,
                        height: M.$.offsetHeight || 0
                    };
                O._.updateSize = !N.width || !N.height;
                return N;
            },
            move: (function () {
                var M;
                return function (N, O) {
                    var R = this;
                    var P = R._.element.getFirst();
                    if (M === undefined) M = P.getComputedStyle('position') == 'fixed';
                    if (M && R._.position && R._.position.x == N && R._.position.y == O) return;
                    R._.position = {
                        x: N,
                        y: O
                    };
                    if (!M) {
                        var Q = a.document.getWindow().getScrollPosition();
                        N += Q.x;
                        O += Q.y;
                    }
                    P.setStyles({
                        left: (N > 0 ? N : 0) + 'px',
                        top: (O > 0 ? O : 0) + 'px'
                    });
                };
            })(),
            getPosition: function () {
                return e.extend({}, this._.position);
            },
            show: function () {
                var M = this._.editor;
                if (M.mode == 'wysiwyg' && c) {
                    var N = M.getSelection();
                    N && N.lock();
                }
                var O = this._.element,
                    P = this.definition;
                if (!(O.getParent() && O.getParent().equals(a.document.getBody()))) O.appendTo(a.document.getBody());
                else O.setStyle('display', 'block');
                if (b.gecko && b.version < 10900) {
                    var Q = this.parts.dialog;
                    Q.setStyle('position', 'absolute');
                    setTimeout(function () {
                        Q.setStyle('position', 'fixed');
                    }, 0);
                }
                this.resize(P.minWidth, P.minHeight);
                this.selectPage(this.definition.contents[0].id);
                this.reset();
                if (a.dialog._.currentZIndex === null) a.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex;
                this._.element.getFirst().setStyle('z-index', a.dialog._.currentZIndex += 10);
                if (a.dialog._.currentTop === null) {
                    a.dialog._.currentTop = this;
                    this._.parentDialog = null;
                    A(this._.editor);
                    O.on('keydown', E);
                    O.on(b.opera ? 'keypress' : 'keyup', F);
                    for (var R in {
                        keyup: 1,
                        keydown: 1,
                        keypress: 1
                    }) O.on(R, L);
                } else {
                    this._.parentDialog = a.dialog._.currentTop;
                    var S = this._.parentDialog.getElement().getFirst();
                    S.$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2);
                    a.dialog._.currentTop = this;
                }
                G(this, this, '\x1b', null, function () {
                    this.getButton('cancel') && this.getButton('cancel').click();
                });
                this._.hasFocus = false;
                e.setTimeout(function () {
                    var T = a.document.getWindow().getViewPaneSize(),
                        U = this.getSize();
                    this.move((T.width - P.minWidth) / 2, (T.height - U.height) / 2);
                    this.parts.dialog.setStyle('visibility', '');
                    this.fireOnce('load', {});
                    this.fire('show', {});
                    this._.editor.fire('dialogShow', this);
                    this.foreach(function (V) {
                        V.setInitValue && V.setInitValue();
                    });
                }, 100, this);
            },
            foreach: function (M) {
                var P = this;
                for (var N in P._.contents) for (var O in P._.contents[N]) M(P._.contents[N][O]);
                return P;
            },
            reset: (function () {
                var M = function (N) {
                        if (N.reset) N.reset();
                    };
                return function () {
                    this.foreach(M);
                    return this;
                };
            })(),
            setupContent: function () {
                var M = arguments;
                this.foreach(function (N) {
                    if (N.setup) N.setup.apply(N, M);
                });
            },
            commitContent: function () {
                var M = arguments;
                this.foreach(function (N) {
                    if (N.commit) N.commit.apply(N, M);
                });
            },
            hide: function () {
                if (!this.parts.dialog.isVisible()) return;
                this.fire('hide', {});
                this._.editor.fire('dialogHide', this);
                var M = this._.element;
                M.setStyle('display', 'none');
                this.parts.dialog.setStyle('visibility', 'hidden');
                H(this);
                while (a.dialog._.currentTop != this) a.dialog._.currentTop.hide();
                if (!this._.parentDialog) B();
                else {
                    var N = this._.parentDialog.getElement().getFirst();
                    N.setStyle('z-index', parseInt(N.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2));
                }
                a.dialog._.currentTop = this._.parentDialog;
                if (!this._.parentDialog) {
                    a.dialog._.currentZIndex = null;
                    M.removeListener('keydown', E);
                    M.removeListener(b.opera ? 'keypress' : 'keyup', F);
                    for (var O in {
                        keyup: 1,
                        keydown: 1,
                        keypress: 1
                    }) M.removeListener(O, L);
                    var P = this._.editor;
                    P.focus();
                    if (P.mode == 'wysiwyg' && c) {
                        var Q = P.getSelection();
                        Q && Q.unlock(true);
                    }
                } else a.dialog._.currentZIndex -= 10;
                delete this._.parentDialog;
                this.foreach(function (R) {
                    R.resetInitValue && R.resetInitValue();
                });
            },
            addPage: function (M) {
                var Y = this;
                var N = [],
                    O = M.label ? ' title="' + e.htmlEncode(M.label) + '"' : '',
                    P = M.elements,
                    Q = a.dialog._.uiElementBuilders.vbox.build(Y, {
                        type: 'vbox',
                        className: 'cke_dialog_page_contents',
                        children: M.elements,
                        expand: !! M.expand,
                        padding: M.padding,
                        style: M.style || 'width: 100%; height: 100%;'
                    }, N),
                    R = h.createFromHtml(N.join(''));
                R.setAttribute('role', 'tabpanel');
                var S = b,
                    T = M.id + '_' + e.getNextNumber(),
                    U = h.createFromHtml(['<a class="cke_dialog_tab"', Y._.pageCount > 0 ? ' cke_last' : 'cke_first', O, !! M.hidden ? ' style="display:none"' : '', ' id="', T, '"', S.gecko && S.version >= 10900 && !S.hc ? '' : ' href="javascript:void(0)"', ' tabIndex="-1"', ' hidefocus="true"', ' role="tab">', M.label, '</a>'].join(''));
                R.setAttribute('aria-labelledby', T);
                Y._.tabs[M.id] = [U, R];
                Y._.tabIdList.push(M.id);
                !M.hidden && Y._.pageCount++;
                Y._.lastTab = U;
                Y.updateStyle();
                var V = Y._.contents[M.id] = {},
                    W, X = Q.getChild();
                while (W = X.shift()) {
                    V[W.id] = W;
                    if (typeof W.getChild == 'function') X.push.apply(X, W.getChild());
                }
                R.setAttribute('name', M.id);
                R.appendTo(Y.parts.contents);
                U.unselectable();
                Y.parts.tabs.append(U);
                if (M.accessKey) {
                    G(Y, Y, 'CTRL+' + M.accessKey, J, I);
                    Y._.accessKeyMap['CTRL+' + M.accessKey] = M.id;
                }
            },
            selectPage: function (M) {
                var R = this;
                for (var N in R._.tabs) {
                    var O = R._.tabs[N][0],
                        P = R._.tabs[N][1];
                    if (N != M) {
                        O.removeClass('cke_dialog_tab_selected');
                        P.hide();
                    }
                    P.setAttribute('aria-hidden', N != M);
                }
                var Q = R._.tabs[M];
                Q[0].addClass('cke_dialog_tab_selected');
                Q[1].show();
                R._.currentTabId = M;
                R._.currentTabIndex = e.indexOf(R._.tabIdList, M);
            },
            updateStyle: function () {
                this.parts.dialog[(this._.pageCount === 1 ? 'add' : 'remove') + 'Class']('cke_single_page');
            },
            hidePage: function (M) {
                var O = this;
                var N = O._.tabs[M] && O._.tabs[M][0];
                if (!N || O._.pageCount == 1) return;
                else if (M == O._.currentTabId) O.selectPage(m.call(O));
                N.hide();
                O._.pageCount--;
                O.updateStyle();
            },
            showPage: function (M) {
                var O = this;
                var N = O._.tabs[M] && O._.tabs[M][0];
                if (!N) return;
                N.show();
                O._.pageCount++;
                O.updateStyle();
            },
            getElement: function () {
                return this._.element;
            },
            getName: function () {
                return this._.name;
            },
            getContentElement: function (M, N) {
                var O = this._.contents[M];
                return O && O[N];
            },
            getValueOf: function (M, N) {
                return this.getContentElement(M, N).getValue();
            },
            setValueOf: function (M, N, O) {
                return this.getContentElement(M, N).setValue(O);
            },
            getButton: function (M) {
                return this._.buttons[M];
            },
            click: function (M) {
                return this._.buttons[M].click();
            },
            disableButton: function (M) {
                return this._.buttons[M].disable();
            },
            enableButton: function (M) {
                return this._.buttons[M].enable();
            },
            getPageCount: function () {
                return this._.pageCount;
            },
            getParentEditor: function () {
                return this._.editor;
            },
            getSelectedElement: function () {
                return this.getParentEditor().getSelection().getSelectedElement();
            },
            addFocusable: function (M, N) {
                var P = this;
                if (typeof N == 'undefined') {
                    N = P._.focusList.length;
                    P._.focusList.push(new o(P, M, N));
                } else {
                    P._.focusList.splice(N, 0, new o(P, M, N));
                    for (var O = N + 1; O < P._.focusList.length; O++) P._.focusList[O].focusIndex++;
                }
            }
        };
        e.extend(a.dialog, {
            add: function (M, N) {
                if (!this._.dialogDefinitions[M] || typeof N == 'function') this._.dialogDefinitions[M] = N;
            },
            exists: function (M) {
                return !!this._.dialogDefinitions[M];
            },
            getCurrent: function () {
                return a.dialog._.currentTop;
            },
            okButton: (function () {
                var M = function (N, O) {
                        O = O || {};
                        return e.extend({
                            id: 'ok',
                            type: 'button',
                            label: N.lang.common.ok,
                            'class': 'cke_dialog_ui_button_ok',
                            onClick: function (P) {
                                var Q = P.data.dialog;
                                if (Q.fire('ok', {
                                    hide: true
                                }).hide !== false) Q.hide();
                            }
                        }, O, true);
                    };
                M.type = 'button';
                M.override = function (N) {
                    return e.extend(function (O) {
                        return M(O, N);
                    }, {
                        type: 'button'
                    }, true);
                };
                return M;
            })(),
            cancelButton: (function () {
                var M = function (N, O) {
                        O = O || {};
                        return e.extend({
                            id: 'cancel',
                            type: 'button',
                            label: N.lang.common.cancel,
                            'class': 'cke_dialog_ui_button_cancel',
                            onClick: function (P) {
                                var Q = P.data.dialog;
                                if (Q.fire('cancel', {
                                    hide: true
                                }).hide !== false) Q.hide();
                            }
                        }, O, true);
                    };
                M.type = 'button';
                M.override = function (N) {
                    return e.extend(function (O) {
                        return M(O, N);
                    }, {
                        type: 'button'
                    }, true);
                };
                return M;
            })(),
            addUIElement: function (M, N) {
                this._.uiElementBuilders[M] = N;
            }
        });
        a.dialog._ = {
            uiElementBuilders: {},
            dialogDefinitions: {},
            currentTop: null,
            currentZIndex: null
        };
        a.event.implementOn(a.dialog);
        a.event.implementOn(a.dialog.prototype, true);
        var p = {
            resizable: 3,
            minWidth: 600,
            minHeight: 400,
            buttons: [a.dialog.okButton, a.dialog.cancelButton]
        };
        b.mac && p.buttons.reverse();
        var q = function (M, N, O) {
                for (var P = 0, Q; Q = M[P]; P++) {
                    if (Q.id == N) return Q;
                    if (O && Q[O]) {
                        var R = q(Q[O], N, O);
                        if (R) return R;
                    }
                }
                return null;
            },
            r = function (M, N, O, P, Q) {
                if (O) {
                    for (var R = 0, S; S = M[R]; R++) {
                        if (S.id == O) {
                            M.splice(R, 0, N);
                            return N;
                        }
                        if (P && S[P]) {
                            var T = r(S[P], N, O, P, true);
                            if (T) return T;
                        }
                    }
                    if (Q) return null;
                }
                M.push(N);
                return N;
            },
            s = function (M, N, O) {
                for (var P = 0, Q; Q = M[P]; P++) {
                    if (Q.id == N) return M.splice(P, 1);
                    if (O && Q[O]) {
                        var R = s(Q[O], N, O);
                        if (R) return R;
                    }
                }
                return null;
            },
            t = function (M, N) {
                this.dialog = M;
                var O = N.contents;
                for (var P = 0, Q; Q = O[P]; P++) O[P] = new u(M, Q);
                e.extend(this, N);
            };
        t.prototype = {
            getContents: function (M) {
                return q(this.contents, M);
            },
            getButton: function (M) {
                return q(this.buttons, M);
            },
            addContents: function (M, N) {
                return r(this.contents, M, N);
            },
            addButton: function (M, N) {
                return r(this.buttons, M, N);
            },
            removeContents: function (M) {
                s(this.contents, M);
            },
            removeButton: function (M) {
                s(this.buttons, M);
            }
        };

        function u(M, N) {
            this._ = {
                dialog: M
            };
            e.extend(this, N);
        };
        u.prototype = {
            get: function (M) {
                return q(this.elements, M, 'children');
            },
            add: function (M, N) {
                return r(this.elements, M, N, 'children');
            },
            remove: function (M) {
                s(this.elements, M, 'children');
            }
        };

        function v(M) {
            var N = null,
                O = null,
                P = M.getElement().getFirst(),
                Q = M.getParentEditor(),
                R = Q.config.dialog_magnetDistance,
                S = Q.skin.margins || [0, 0, 0, 0];
            if (typeof R == 'undefined') R = 20;

            function T(V) {
                var W = M.getSize(),
                    X = a.document.getWindow().getViewPaneSize(),
                    Y = V.data.$.screenX,
                    Z = V.data.$.screenY,
                    aa = Y - N.x,
                    ab = Z - N.y,
                    ac, ad;
                N = {
                    x: Y,
                    y: Z
                };
                O.x += aa;
                O.y += ab;
                if (O.x + S[3] < R) ac = -S[3];
                else if (O.x - S[1] > X.width - W.width - R) ac = X.width - W.width + S[1];
                else ac = O.x;
                if (O.y + S[0] < R) ad = -S[0];
                else if (O.y - S[2] > X.height - W.height - R) ad = X.height - W.height + S[2];
                else ad = O.y;
                M.move(ac, ad);
                V.data.preventDefault();
            };

            function U(V) {
                a.document.removeListener('mousemove', T);
                a.document.removeListener('mouseup', U);
                if (b.ie6Compat) {
                    var W = z.getChild(0).getFrameDocument();
                    W.removeListener('mousemove', T);
                    W.removeListener('mouseup', U);
                }
            };
            M.parts.title.on('mousedown', function (V) {
                M._.updateSize = true;
                N = {
                    x: V.data.$.screenX,
                    y: V.data.$.screenY
                };
                a.document.on('mousemove', T);
                a.document.on('mouseup', U);
                O = M.getPosition();
                if (b.ie6Compat) {
                    var W = z.getChild(0).getFrameDocument();
                    W.on('mousemove', T);
                    W.on('mouseup', U);
                }
                V.data.preventDefault();
            }, M);
        };

        function w(M) {
            var N = M.definition,
                O = N.minWidth || 0,
                P = N.minHeight || 0,
                Q = N.resizable,
                R = M.getParentEditor().skin.margins || [0, 0, 0, 0];

            function S(ad, ae) {
                ad.y += ae;
            };

            function T(ad, ae) {
                ad.x2 += ae;
            };

            function U(ad, ae) {
                ad.y2 += ae;
            };

            function V(ad, ae) {
                ad.x += ae;
            };
            var W = null,
                X = null,
                Y = M._.editor.config.magnetDistance,
                Z = ['tl', 't', 'tr', 'l', 'r', 'bl', 'b', 'br'];

            function aa(ad) {
                var ae = ad.listenerData.part,
                    af = M.getSize();
                X = M.getPosition();
                e.extend(X, {
                    x2: X.x + af.width,
                    y2: X.y + af.height
                });
                W = {
                    x: ad.data.$.screenX,
                    y: ad.data.$.screenY
                };
                a.document.on('mousemove', ab, M, {
                    part: ae
                });
                a.document.on('mouseup', ac, M, {
                    part: ae
                });
                if (b.ie6Compat) {
                    var ag = z.getChild(0).getFrameDocument();
                    ag.on('mousemove', ab, M, {
                        part: ae
                    });
                    ag.on('mouseup', ac, M, {
                        part: ae
                    });
                }
                ad.data.preventDefault();
            };

            function ab(ad) {
                var ae = ad.data.$.screenX,
                    af = ad.data.$.screenY,
                    ag = ae - W.x,
                    ah = af - W.y,
                    ai = a.document.getWindow().getViewPaneSize(),
                    aj = ad.listenerData.part;
                if (aj.search('t') != -1) S(X, ah);
                if (aj.search('l') != -1) V(X, ag);
                if (aj.search('b') != -1) U(X, ah);
                if (aj.search('r') != -1) T(X, ag);
                W = {
                    x: ae,
                    y: af
                };
                var ak, al, am, an;
                if (X.x + R[3] < Y) ak = -R[3];
                else if (aj.search('l') != -1 && X.x2 - X.x < O + Y) ak = X.x2 - O;
                else ak = X.x;
                if (X.y + R[0] < Y) al = -R[0];
                else if (aj.search('t') != -1 && X.y2 - X.y < P + Y) al = X.y2 - P;
                else al = X.y;
                if (X.x2 - R[1] > ai.width - Y) am = ai.width + R[1];
                else if (aj.search('r') != -1 && X.x2 - X.x < O + Y) am = X.x + O;
                else am = X.x2;
                if (X.y2 - R[2] > ai.height - Y) an = ai.height + R[2];
                else if (aj.search('b') != -1 && X.y2 - X.y < P + Y) an = X.y + P;
                else an = X.y2;
                M.move(ak, al);
                M.resize(am - ak, an - al);
                ad.data.preventDefault();
            };

            function ac(ad) {
                a.document.removeListener('mouseup', ac);
                a.document.removeListener('mousemove', ab);
                if (b.ie6Compat) {
                    var ae = z.getChild(0).getFrameDocument();
                    ae.removeListener('mouseup', ac);
                    ae.removeListener('mousemove', ab);
                }
            };
        };
        var x, y = {},
            z;

        function A(M) {
            var N = a.document.getWindow(),
                O = M.config.dialog_backgroundCoverColor || 'white',
                P = M.config.dialog_backgroundCoverOpacity,
                Q = M.config.baseFloatZIndex,
                R = e.genKey(O, P, Q),
                S = y[R];
            if (!S) {
                var T = ['<div style="position: ', b.ie6Compat ? 'absolute' : 'fixed', '; z-index: ', Q, '; top: 0px; left: 0px; ', !b.ie6Compat ? 'background-color: ' + O : '', '" class="cke_dialog_background_cover">'];
                if (b.ie6Compat) {
                    var U = b.isCustomDomain(),
                        V = "<html><body style=\\'background-color:" + O + ";\\'></body></html>";
                    T.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:');
                    T.push('void((function(){document.open();' + (U ? "document.domain='" + document.domain + "';" : '') + "document.write( '" + V + "' );" + 'document.close();' + '})())');
                    T.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>');
                }
                T.push('</div>');
                S = h.createFromHtml(T.join(''));
                S.setOpacity(P != undefined ? P : 0.5);
                S.appendTo(a.document.getBody());
                y[R] = S;
            } else S.show();
            z = S;
            var W = function () {
                    var Z = N.getViewPaneSize();
                    S.setStyles({
                        width: Z.width + 'px',
                        height: Z.height + 'px'
                    });
                },
                X = function () {
                    var Z = N.getScrollPosition(),
                        aa = a.dialog._.currentTop;
                    S.setStyles({
                        left: Z.x + 'px',
                        top: Z.y + 'px'
                    });
                    do {
                        var ab = aa.getPosition();
                        aa.move(ab.x, ab.y);
                    } while (aa = aa._.parentDialog)
                };
            x = W;
            N.on('resize', W);
            W();
            if (b.ie6Compat) {
                var Y = function () {
                        X();
                        arguments.callee.prevScrollHandler.apply(this, arguments);
                    };
                N.$.setTimeout(function () {
                    Y.prevScrollHandler = window.onscroll || (function () {});
                    window.onscroll = Y;
                }, 0);
                X();
            }
        };

        function B() {
            if (!z) return;
            var M = a.document.getWindow();
            z.hide();
            M.removeListener('resize', x);
            if (b.ie6Compat) M.$.setTimeout(function () {
                var N = window.onscroll && window.onscroll.prevScrollHandler;
                window.onscroll = N || null;
            }, 0);
            x = null;
        };

        function C() {
            for (var M in y) y[M].remove();
            y = {};
        };
        var D = {},
            E = function (M) {
                var N = M.data.$.ctrlKey || M.data.$.metaKey,
                    O = M.data.$.altKey,
                    P = M.data.$.shiftKey,
                    Q = String.fromCharCode(M.data.$.keyCode),
                    R = D[(N ? 'CTRL+' : '') + (O ? 'ALT+' : '') + (P ? 'SHIFT+' : '') + Q];
                if (!R || !R.length) return;
                R = R[R.length - 1];
                R.keydown && R.keydown.call(R.uiElement, R.dialog, R.key);
                M.data.preventDefault();
            },
            F = function (M) {
                var N = M.data.$.ctrlKey || M.data.$.metaKey,
                    O = M.data.$.altKey,
                    P = M.data.$.shiftKey,
                    Q = String.fromCharCode(M.data.$.keyCode),
                    R = D[(N ? 'CTRL+' : '') + (O ? 'ALT+' : '') + (P ? 'SHIFT+' : '') + Q];
                if (!R || !R.length) return;
                R = R[R.length - 1];
                if (R.keyup) {
                    R.keyup.call(R.uiElement, R.dialog, R.key);
                    M.data.preventDefault();
                }
            },
            G = function (M, N, O, P, Q) {
                var R = D[O] || (D[O] = []);
                R.push({
                    uiElement: M,
                    dialog: N,
                    key: O,
                    keyup: Q || M.accessKeyUp,
                    keydown: P || M.accessKeyDown
                });
            },
            H = function (M) {
                for (var N in D) {
                    var O = D[N];
                    for (var P = O.length - 1; P >= 0; P--) {
                        if (O[P].dialog == M || O[P].uiElement == M) O.splice(P, 1);
                    }
                    if (O.length === 0) delete D[N];
                }
            },
            I = function (M, N) {
                if (M._.accessKeyMap[N]) M.selectPage(M._.accessKeyMap[N]);
            },
            J = function (M, N) {},
            K = {
                27: 1,
                13: 1
            },
            L = function (M) {
                if (M.data.getKeystroke() in K) M.data.stopPropagation();
            };
        (function () {
            k.dialog = {
                uiElement: function (M, N, O, P, Q, R, S) {
                    if (arguments.length < 4) return;
                    var T = (P.call ? P(N) : P) || 'div',
                        U = ['<', T, ' '],
                        V = (Q && Q.call ? Q(N) : Q) || {},
                        W = (R && R.call ? R(N) : R) || {},
                        X = (S && S.call ? S.call(this, M, N) : S) || '',
                        Y = this.domId = W.id || e.getNextNumber() + '_uiElement',
                        Z = this.id = N.id,
                        aa;
                    W.id = Y;
                    var ab = {};
                    if (N.type) ab['cke_dialog_ui_' + N.type] = 1;
                    if (N.className) ab[N.className] = 1;
                    var ac = W['class'] && W['class'].split ? W['class'].split(' ') : [];
                    for (aa = 0; aa < ac.length; aa++) {
                        if (ac[aa]) ab[ac[aa]] = 1;
                    }
                    var ad = [];
                    for (aa in ab) ad.push(aa);
                    W['class'] = ad.join(' ');
                    if (N.title) W.title = N.title;
                    var ae = (N.style || '').split(';');
                    for (aa in V) ae.push(aa + ':' + V[aa]);
                    if (N.hidden) ae.push('display:none');
                    for (aa = ae.length - 1; aa >= 0; aa--) {
                        if (ae[aa] === '') ae.splice(aa, 1);
                    }
                    if (ae.length > 0) W.style = (W.style ? W.style + '; ' : '') + ae.join('; ');
                    for (aa in W) U.push(aa + '="' + e.htmlEncode(W[aa]) + '" ');
                    U.push('>', X, '</', T, '>');
                    O.push(U.join(''));
                    (this._ || (this._ = {})).dialog = M;
                    if (typeof N.isChanged == 'boolean') this.isChanged = function () {
                        return N.isChanged;
                    };
                    if (typeof N.isChanged == 'function') this.isChanged = N.isChanged;
                    a.event.implementOn(this);
                    this.registerEvents(N);
                    if (this.accessKeyUp && this.accessKeyDown && N.accessKey) G(this, M, 'CTRL+' + N.accessKey);
                    var af = this;
                    M.on('load', function () {
                        if (af.getInputElement()) af.getInputElement().on('focus', function () {
                            M._.tabBarMode = false;
                            M._.hasFocus = true;
                            af.fire('focus');
                        }, af);
                    });
                    if (this.keyboardFocusable) {
                        this.tabIndex = N.tabIndex || 0;
                        this.focusIndex = M._.focusList.push(this) - 1;
                        this.on('focus', function () {
                            M._.currentFocusIndex = af.focusIndex;
                        });
                    }
                    e.extend(this, N);
                },
                hbox: function (M, N, O, P, Q) {
                    if (arguments.length < 4) return;
                    this._ || (this._ = {});
                    var R = this._.children = N,
                        S = Q && Q.widths || null,
                        T = Q && Q.height || null,
                        U = {},
                        V, W = function () {
                            var Y = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                            for (V = 0; V < O.length; V++) {
                                var Z = 'cke_dialog_ui_hbox_child',
                                    aa = [];
                                if (V === 0) Z = 'cke_dialog_ui_hbox_first';
                                if (V == O.length - 1) Z = 'cke_dialog_ui_hbox_last';
                                Y.push('<td class="', Z, '" role="presentation" ');
                                if (S) {
                                    if (S[V]) aa.push('width:' + e.cssLength(S[V]));
                                } else aa.push('width:' + Math.floor(100 / O.length) + '%');
                                if (T) aa.push('height:' + e.cssLength(T));
                                if (Q && Q.padding != undefined) aa.push('padding:' + e.cssLength(Q.padding));
                                if (aa.length > 0) Y.push('style="' + aa.join('; ') + '" ');
                                Y.push('>', O[V], '</td>');
                            }
                            Y.push('</tr></tbody>');
                            return Y.join('');
                        },
                        X = {
                            role: 'presentation'
                        };
                    Q && Q.align && (X.align = Q.align);
                    k.dialog.uiElement.call(this, M, Q || {
                        type: 'hbox'
                    }, P, 'table', U, X, W);
                },
                vbox: function (M, N, O, P, Q) {
                    if (arguments.length < 3) return;
                    this._ || (this._ = {});
                    var R = this._.children = N,
                        S = Q && Q.width || null,
                        T = Q && Q.heights || null,
                        U = function () {
                            var V = ['<table role="presentation" cellspacing="0" border="0" '];
                            V.push('style="');
                            if (Q && Q.expand) V.push('height:100%;');
                            V.push('width:' + e.cssLength(S || '100%'), ';');
                            V.push('"');
                            V.push('align="', e.htmlEncode(Q && Q.align || (M.getParentEditor().lang.dir == 'ltr' ? 'left' : 'right')), '" ');
                            V.push('><tbody>');
                            for (var W = 0; W < O.length; W++) {
                                var X = [];
                                V.push('<tr><td role="presentation" ');
                                if (S) X.push('width:' + e.cssLength(S || '100%'));
                                if (T) X.push('height:' + e.cssLength(T[W]));
                                else if (Q && Q.expand) X.push('height:' + Math.floor(100 / O.length) + '%');
                                if (Q && Q.padding != undefined) X.push('padding:' + e.cssLength(Q.padding));
                                if (X.length > 0) V.push('style="', X.join('; '), '" ');
                                V.push(' class="cke_dialog_ui_vbox_child">', O[W], '</td></tr>');
                            }
                            V.push('</tbody></table>');
                            return V.join('');
                        };
                    k.dialog.uiElement.call(this, M, Q || {
                        type: 'vbox'
                    }, P, 'div', null, {
                        role: 'presentation'
                    }, U);
                }
            };
        })();
        k.dialog.uiElement.prototype = {
            getElement: function () {
                return a.document.getById(this.domId);
            },
            getInputElement: function () {
                return this.getElement();
            },
            getDialog: function () {
                return this._.dialog;
            },
            setValue: function (M) {
                this.getInputElement().setValue(M);
                this.fire('change', {
                    value: M
                });
                return this;
            },
            getValue: function () {
                return this.getInputElement().getValue();
            },
            isChanged: function () {
                return false;
            },
            selectParentTab: function () {
                var P = this;
                var M = P.getInputElement(),
                    N = M,
                    O;
                while ((N = N.getParent()) && N.$.className.search('cke_dialog_page_contents') == -1) {}
                if (!N) return P;
                O = N.getAttribute('name');
                if (P._.dialog._.currentTabId != O) P._.dialog.selectPage(O);
                return P;
            },
            focus: function () {
                this.selectParentTab().getInputElement().focus();
                return this;
            },
            registerEvents: function (M) {
                var N = /^on([A-Z]\w+)/,
                    O, P = function (R, S, T, U) {
                        S.on('load', function () {
                            R.getInputElement().on(T, U, R);
                        });
                    };
                for (var Q in M) {
                    if (!(O = Q.match(N))) continue;
                    if (this.eventProcessors[Q]) this.eventProcessors[Q].call(this, this._.dialog, M[Q]);
                    else P(this, this._.dialog, O[1].toLowerCase(), M[Q]);
                }
                return this;
            },
            eventProcessors: {
                onLoad: function (M, N) {
                    M.on('load', N, this);
                },
                onShow: function (M, N) {
                    M.on('show', N, this);
                },
                onHide: function (M, N) {
                    M.on('hide', N, this);
                }
            },
            accessKeyDown: function (M, N) {
                this.focus();
            },
            accessKeyUp: function (M, N) {},
            disable: function () {
                var M = this.getInputElement();
                M.setAttribute('disabled', 'true');
                M.addClass('cke_disabled');
            },
            enable: function () {
                var M = this.getInputElement();
                M.removeAttribute('disabled');
                M.removeClass('cke_disabled');
            },
            isEnabled: function () {
                return !this.getInputElement().getAttribute('disabled');
            },
            isVisible: function () {
                return this.getInputElement().isVisible();
            },
            isFocusable: function () {
                if (!this.isEnabled() || !this.isVisible()) return false;
                return true;
            }
        };
        k.dialog.hbox.prototype = e.extend(new k.dialog.uiElement(), {
            getChild: function (M) {
                var N = this;
                if (arguments.length < 1) return N._.children.concat();
                if (!M.splice) M = [M];
                if (M.length < 2) return N._.children[M[0]];
                else return N._.children[M[0]] && N._.children[M[0]].getChild ? N._.children[M[0]].getChild(M.slice(1, M.length)) : null;
            }
        }, true);
        k.dialog.vbox.prototype = new k.dialog.hbox();
        (function () {
            var M = {
                build: function (N, O, P) {
                    var Q = O.children,
                        R, S = [],
                        T = [];
                    for (var U = 0; U < Q.length && (R = Q[U]); U++) {
                        var V = [];
                        S.push(V);
                        T.push(a.dialog._.uiElementBuilders[R.type].build(N, R, V));
                    }
                    return new k.dialog[O.type](N, T, S, P, O);
                }
            };
            a.dialog.addUIElement('hbox', M);
            a.dialog.addUIElement('vbox', M);
        })();
        a.dialogCommand = function (M) {
            this.dialogName = M;
        };
        a.dialogCommand.prototype = {
            exec: function (M) {
                M.openDialog(this.dialogName);
            },
            canUndo: false,
            editorFocus: c || b.webkit
        };
        (function () {
            var M = /^([a]|[^a])+$/,
                N = /^\d*$/,
                O = /^\d*(?:\.\d+)?$/;
            a.VALIDATE_OR = 1;
            a.VALIDATE_AND = 2;
            a.dialog.validate = {
                functions: function () {
                    return function () {
                        var V = this;
                        var P = V && V.getValue ? V.getValue() : arguments[0],
                            Q = undefined,
                            R = 2,
                            S = [],
                            T;
                        for (T = 0; T < arguments.length; T++) {
                            if (typeof arguments[T] == 'function') S.push(arguments[T]);
                            else break;
                        }
                        if (T < arguments.length && typeof arguments[T] == 'string') {
                            Q = arguments[T];
                            T++;
                        }
                        if (T < arguments.length && typeof arguments[T] == 'number') R = arguments[T];
                        var U = R == 2 ? true : false;
                        for (T = 0; T < S.length; T++) {
                            if (R == 2) U = U && S[T](P);
                            else U = U || S[T](P);
                        }
                        if (!U) {
                            if (Q !== undefined) alert(Q);
                            if (V && (V.select || V.focus)) V.select || V.focus();
                            return false;
                        }
                        return true;
                    };
                },
                regex: function (P, Q) {
                    return function () {
                        var S = this;
                        var R = S && S.getValue ? S.getValue() : arguments[0];
                        if (!P.test(R)) {
                            if (Q !== undefined) alert(Q);
                            if (S && (S.select || S.focus)) if (S.select) S.select();
                            else S.focus();
                            return false;
                        }
                        return true;
                    };
                },
                notEmpty: function (P) {
                    return this.regex(M, P);
                },
                integer: function (P) {
                    return this.regex(N, P);
                },
                number: function (P) {
                    return this.regex(O, P);
                },
                equals: function (P, Q) {
                    return this.functions(function (R) {
                        return R == P;
                    }, Q);
                },
                notEqual: function (P, Q) {
                    return this.functions(function (R) {
                        return R != P;
                    }, Q);
                }
            };
            a.on('instanceDestroyed', function (P) {
                if (e.isEmpty(a.instances)) {
                    var Q;
                    while (Q = a.dialog._.currentTop) Q.hide();
                    C();
                }
                var R = P.editor._.storedDialogs;
                for (var S in R) R[S].destroy();
            });
        })();
    })();
    e.extend(a.editor.prototype, {
        openDialog: function (l, m) {
            var n = a.dialog._.dialogDefinitions[l],
                o = this.skin.dialog;
            if (typeof n == 'function' && o._isLoaded) {
                var p = this._.storedDialogs || (this._.storedDialogs = {}),
                    q = p[l] || (p[l] = new a.dialog(this, l));
                m && m.call(q, q);
                q.show();
                return q;
            } else if (n == 'failed') throw new Error('[CKEDITOR.dialog.openDialog] Dialog "' + l + '" failed when loading definition.');
            var r = a.document.getBody(),
                s = r.$.style.cursor,
                t = this;
            r.setStyle('cursor', 'wait');

            function u(w) {
                var x = a.dialog._.dialogDefinitions[l],
                    y = t.skin.dialog;
                if (!y._isLoaded || v && typeof w == 'undefined') return;
                if (typeof x != 'function') a.dialog._.dialogDefinitions[l] = 'failed';
                t.openDialog(l, m);
                r.setStyle('cursor', s);
            };
            if (typeof n == 'string') {
                var v = 1;
                a.scriptLoader.load(a.getUrl(n), u);
            }
            a.skins.load(this, 'dialog', u);
            return null;
        }
    });
    j.add('dialog', {
        requires: ['dialogui']
    });
    j.add('styles', {
        requires: ['selection']
    });
    a.editor.prototype.attachStyleStateChange = function (l, m) {
        var n = this._.styleStateChangeCallbacks;
        if (!n) {
            n = this._.styleStateChangeCallbacks = [];
            this.on('selectionChange', function (o) {
                for (var p = 0; p < n.length; p++) {
                    var q = n[p],
                        r = q.style.checkActive(o.data.path) ? 1 : 2;
                    if (q.state !== r) {
                        q.fn.call(this, r);
                        q.state !== r;
                    }
                }
            });
        }
        n.push({
            style: l,
            fn: m
        });
    };
    a.STYLE_BLOCK = 1;
    a.STYLE_INLINE = 2;
    a.STYLE_OBJECT = 3;
    (function () {
        var l = {
            address: 1,
            div: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            p: 1,
            pre: 1
        },
            m = {
                a: 1,
                embed: 1,
                hr: 1,
                img: 1,
                li: 1,
                object: 1,
                ol: 1,
                table: 1,
                td: 1,
                tr: 1,
                th: 1,
                ul: 1,
                dl: 1,
                dt: 1,
                dd: 1,
                form: 1
            },
            n = /\s*(?:;\s*|$)/;
        a.style = function (N, O) {
            if (O) {
                N = e.clone(N);
                F(N.attributes, O);
                F(N.styles, O);
            }
            var P = this.element = (N.element || '*').toLowerCase();
            this.type = P == '#' || l[P] ? 1 : m[P] ? 3 : 2;
            this._ = {
                definition: N
            };
        };
        a.style.prototype = {
            apply: function (N) {
                M.call(this, N, false);
            },
            remove: function (N) {
                M.call(this, N, true);
            },
            applyToRange: function (N) {
                var O = this;
                return (O.applyToRange = O.type == 2 ? o : O.type == 1 ? r : O.type == 3 ? q : null).call(O, N);
            },
            removeFromRange: function (N) {
                return (this.removeFromRange = this.type == 2 ? p : null).call(this, N);
            },
            applyToObject: function (N) {
                D(N, this);
            },
            checkActive: function (N) {
                var R = this;
                switch (R.type) {
                case 1:
                    return R.checkElementRemovable(N.block || N.blockLimit, true);
                case 3:
                case 2:
                    var O = N.elements;
                    for (var P = 0, Q; P < O.length; P++) {
                        Q = O[P];
                        if (R.type == 2 && (Q == N.block || Q == N.blockLimit)) continue;
                        if (R.type == 3 && !(Q.getName() in m)) continue;
                        if (R.checkElementRemovable(Q, true)) return true;
                    }
                }
                return false;
            },
            checkApplicable: function (N) {
                switch (this.type) {
                case 2:
                case 1:
                    break;
                case 3:
                    return N.lastElement.getAscendant(this.element, true);
                }
                return true;
            },
            checkElementRemovable: function (N, O) {
                if (!N) return false;
                var P = this._.definition,
                    Q;
                if (N.getName() == this.element) {
                    if (!O && !N.hasAttributes()) return true;
                    Q = G(P);
                    if (Q._length) {
                        for (var R in Q) {
                            if (R == '_length') continue;
                            var S = N.getAttribute(R) || '';
                            if (R == 'style' ? L(Q[R], J(S, false)) : Q[R] == S) {
                                if (!O) return true;
                            } else if (O) return false;
                        }
                        if (O) return true;
                    } else return true;
                }
                var T = H(this)[N.getName()];
                if (T) {
                    if (!(Q = T.attributes)) return true;
                    for (var U = 0; U < Q.length; U++) {
                        R = Q[U][0];
                        var V = N.getAttribute(R);
                        if (V) {
                            var W = Q[U][1];
                            if (W === null || typeof W == 'string' && V == W || W.test(V)) return true;
                        }
                    }
                }
                return false;
            },
            buildPreview: function () {
                var N = this._.definition,
                    O = [],
                    P = N.element;
                if (P == 'bdo') P = 'span';
                O = ['<', P];
                var Q = N.attributes;
                if (Q) for (var R in Q) O.push(' ', R, '="', Q[R], '"');
                var S = a.style.getStyleText(N);
                if (S) O.push(' style="', S, '"');
                O.push('>', N.name, '</', P, '>');
                return O.join('');
            }
        };
        a.style.getStyleText = function (N) {
            var O = N._ST;
            if (O) return O;
            O = N.styles;
            var P = N.attributes && N.attributes.style || '',
                Q = '';
            if (P.length) P = P.replace(n, ';');
            for (var R in O) {
                var S = O[R],
                    T = (R + ':' + S).replace(n, ';');
                if (S == 'inherit') Q += T;
                else P += T;
            }
            if (P.length) P = J(P);
            P += Q;
            return N._ST = P;
        };

        function o(N) {
            var ak = this;
            var O = N.document;
            if (N.collapsed) {
                var P = C(ak, O);
                N.insertNode(P);
                N.moveToPosition(P, 2);
                return;
            }
            var Q = ak.element,
                R = ak._.definition,
                S, T = f[Q] || (S = true, f.span),
                U = N.createBookmark();
            N.enlarge(1);
            N.trim();
            var V = N.createBookmark(),
                W = V.startNode,
                X = V.endNode,
                Y = W,
                Z;
            while (Y) {
                var aa = false;
                if (Y.equals(X)) {
                    Y = null;
                    aa = true;
                } else {
                    var ab = Y.type,
                        ac = ab == 1 ? Y.getName() : null;
                    if (ac && Y.getAttribute('_fck_bookmark')) {
                        Y = Y.getNextSourceNode(true);
                        continue;
                    }
                    if (!ac || T[ac] && (Y.getPosition(X) | 4 | 0 | 8) == 4 + 0 + 8 && (!R.childRule || R.childRule(Y))) {
                        var ad = Y.getParent();
                        if (ad && ((ad.getDtd() || f.span)[Q] || S) && (!R.parentRule || R.parentRule(ad))) {
                            if (!Z && (!ac || !f.$removeEmpty[ac] || (Y.getPosition(X) | 4 | 0 | 8) == 4 + 0 + 8)) {
                                Z = new d.range(O);
                                Z.setStartBefore(Y);
                            }
                            if (ab == 3 || ab == 1 && !Y.getChildCount()) {
                                var ae = Y,
                                    af;
                                while (!ae.$.nextSibling && (af = ae.getParent(), T[af.getName()]) && (af.getPosition(W) | 2 | 0 | 8) == 2 + 0 + 8 && (!R.childRule || R.childRule(af))) ae = af;
                                Z.setEndAfter(ae);
                                if (!ae.$.nextSibling) aa = true;
                            }
                        } else aa = true;
                    } else aa = true;
                    Y = Y.getNextSourceNode();
                }
                if (aa && Z && !Z.collapsed) {
                    var ag = C(ak, O),
                        ah = Z.getCommonAncestor();
                    while (ag && ah) {
                        if (ah.getName() == Q) {
                            for (var ai in R.attributes) {
                                if (ag.getAttribute(ai) == ah.getAttribute(ai)) ag.removeAttribute(ai);
                            }
                            for (var aj in R.styles) {
                                if (ag.getStyle(aj) == ah.getStyle(aj)) ag.removeStyle(aj);
                            }
                            if (!ag.hasAttributes()) {
                                ag = null;
                                break;
                            }
                        }
                        ah = ah.getParent();
                    }
                    if (ag) {
                        Z.extractContents().appendTo(ag);
                        z(ak, ag);
                        Z.insertNode(ag);
                        ag.mergeSiblings();
                        if (!c) ag.$.normalize();
                    }
                    Z = null;
                }
            }
            W.remove();
            X.remove();
            N.moveToBookmark(U);
            N.shrink(2);
        };

        function p(N) {
            N.enlarge(1);
            var O = N.createBookmark(),
                P = O.startNode;
            if (N.collapsed) {
                var Q = new d.elementPath(P.getParent()),
                    R;
                for (var S = 0, T; S < Q.elements.length && (T = Q.elements[S]); S++) {
                    if (T == Q.block || T == Q.blockLimit) break;
                    if (this.checkElementRemovable(T)) {
                        var U = N.checkBoundaryOfElement(T, 2),
                            V = !U && N.checkBoundaryOfElement(T, 1);
                        if (V || U) {
                            R = T;
                            R.match = V ? 'start' : 'end';
                        } else {
                            T.mergeSiblings();
                            y(this, T);
                        }
                    }
                }
                if (R) {
                    var W = P;
                    for (S = 0; true; S++) {
                        var X = Q.elements[S];
                        if (X.equals(R)) break;
                        else if (X.match) continue;
                        else X = X.clone();
                        X.append(W);
                        W = X;
                    }
                    W[R.match == 'start' ? 'insertBefore' : 'insertAfter'](R);
                }
            } else {
                var Y = O.endNode,
                    Z = this;

                function aa() {
                    var ad = new d.elementPath(P.getParent()),
                        ae = new d.elementPath(Y.getParent()),
                        af = null,
                        ag = null;
                    for (var ah = 0; ah < ad.elements.length; ah++) {
                        var ai = ad.elements[ah];
                        if (ai == ad.block || ai == ad.blockLimit) break;
                        if (Z.checkElementRemovable(ai)) af = ai;
                    }
                    for (ah = 0; ah < ae.elements.length; ah++) {
                        ai = ae.elements[ah];
                        if (ai == ae.block || ai == ae.blockLimit) break;
                        if (Z.checkElementRemovable(ai)) ag = ai;
                    }
                    if (ag) Y.breakParent(ag);
                    if (af) P.breakParent(af);
                };
                aa();
                var ab = P.getNext();
                while (!ab.equals(Y)) {
                    var ac = ab.getNextSourceNode();
                    if (ab.type == 1 && this.checkElementRemovable(ab)) {
                        if (ab.getName() == this.element) y(this, ab);
                        else A(ab, H(this)[ab.getName()]);
                        if (ac.type == 1 && ac.contains(P)) {
                            aa();
                            ac = P.getNext();
                        }
                    }
                    ab = ac;
                }
            }
            N.moveToBookmark(O);
        };

        function q(N) {
            var O = N.getCommonAncestor(true, true),
                P = O.getAscendant(this.element, true);
            P && D(P, this);
        };

        function r(N) {
            var O = N.createBookmark(true),
                P = N.createIterator();
            P.enforceRealBlocks = true;
            if (this._.enterMode) P.enlargeBr = this._.enterMode != 2;
            var Q, R = N.document,
                S;
            while (Q = P.getNextParagraph()) {
                var T = C(this, R);
                s(Q, T);
            }
            N.moveToBookmark(O);
        };

        function s(N, O) {
            var P = O.is('pre'),
                Q = N.is('pre'),
                R = P && !Q,
                S = !P && Q;
            if (R) O = x(N, O);
            else if (S) O = w(u(N), O);
            else N.moveChildren(O);
            O.replace(N);
            if (P) t(O);
        };

        function t(N) {
            var O;
            if (!((O = N.getPreviousSourceNode(true, 1)) && O.is && O.is('pre'))) return;
            var P = v(O.getHtml(), /\n$/, '') + '\n\n' + v(N.getHtml(), /^\n/, '');
            if (c) N.$.outerHTML = '<pre>' + P + '</pre>';
            else N.setHtml(P);
            O.remove();
        };

        function u(N) {
            var O = /(\S\s*)\n(?:\s|(<span[^>]+_fck_bookmark.*?\/span>))*\n(?!$)/gi,
                P = N.getName(),
                Q = v(N.getOuterHtml(), O, function (S, T, U) {
                    return T + '</pre>' + U + '<pre>';
                }),
                R = [];
            Q.replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (S, T) {
                R.push(T);
            });
            return R;
        };

        function v(N, O, P) {
            var Q = '',
                R = '';
            N = N.replace(/(^<span[^>]+_fck_bookmark.*?\/span>)|(<span[^>]+_fck_bookmark.*?\/span>$)/gi, function (S, T, U) {
                T && (Q = T);
                U && (R = U);
                return '';
            });
            return Q + N.replace(O, P) + R;
        };

        function w(N, O) {
            var P = new d.documentFragment(O.getDocument());
            for (var Q = 0; Q < N.length; Q++) {
                var R = N[Q];
                R = R.replace(/(\r\n|\r)/g, '\n');
                R = v(R, /^[ \t]*\n/, '');
                R = v(R, /\n$/, '');
                R = v(R, /^[ \t]+|[ \t]+$/g, function (T, U, V) {
                    if (T.length == 1) return '&nbsp;';
                    else if (!U) return e.repeat('&nbsp;', T.length - 1) + ' ';
                    else return ' ' + e.repeat('&nbsp;', T.length - 1);
                });
                R = R.replace(/\n/g, '<br>');
                R = R.replace(/[ \t]{2,}/g, function (T) {
                    return e.repeat('&nbsp;', T.length - 1) + ' ';
                });
                var S = O.clone();
                S.setHtml(R);
                P.append(S);
            }
            return P;
        };

        function x(N, O) {
            var P = N.getHtml();
            P = v(P, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, '');
            P = P.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, '$1');
            P = P.replace(/([ \t\n\r]+|&nbsp;)/g, ' ');
            P = P.replace(/<br\b[^>]*>/gi, '\n');
            if (c) {
                var Q = N.getDocument().createElement('div');
                Q.append(O);
                O.$.outerHTML = '<pre>' + P + '</pre>';
                O = Q.getFirst().remove();
            } else O.setHtml(P);
            return O;
        };

        function y(N, O) {
            var P = N._.definition,
                Q = e.extend({}, P.attributes, H(N)[O.getName()]),
                R = P.styles,
                S = e.isEmpty(Q) && e.isEmpty(R);
            for (var T in Q) {
                if ((T == 'class' || N._.definition.fullMatch) && O.getAttribute(T) != I(T, Q[T])) continue;
                S = O.hasAttribute(T);
                O.removeAttribute(T);
            }
            for (var U in R) {
                if (N._.definition.fullMatch && O.getStyle(U) != I(U, R[U], true)) continue;
                S = S || !! O.getStyle(U);
                O.removeStyle(U);
            }
            S && B(O);
        };

        function z(N, O) {
            var P = N._.definition,
                Q = P.attributes,
                R = P.styles,
                S = H(N),
                T = O.getElementsByTag(N.element);
            for (var U = T.count(); --U >= 0;) y(N, T.getItem(U));
            for (var V in S) {
                if (V != N.element) {
                    T = O.getElementsByTag(V);
                    for (U = T.count() - 1; U >= 0; U--) {
                        var W = T.getItem(U);
                        A(W, S[V]);
                    }
                }
            }
        };

        function A(N, O) {
            var P = O && O.attributes;
            if (P) for (var Q = 0; Q < P.length; Q++) {
                var R = P[Q][0],
                    S;
                if (S = N.getAttribute(R)) {
                    var T = P[Q][1];
                    if (T === null || T.test && T.test(S) || typeof T == 'string' && S == T) N.removeAttribute(R);
                }
            }
            B(N);
        };

        function B(N) {
            if (!N.hasAttributes()) {
                var O = N.getFirst(),
                    P = N.getLast();
                N.remove(true);
                if (O) {
                    O.type == 1 && O.mergeSiblings();
                    if (P && !O.equals(P) && P.type == 1) P.mergeSiblings();
                }
            }
        };

        function C(N, O) {
            var P, Q = N._.definition,
                R = N.element;
            if (R == '*') R = 'span';
            P = new h(R, O);
            return D(P, N);
        };

        function D(N, O) {
            var P = O._.definition,
                Q = P.attributes,
                R = a.style.getStyleText(P);
            if (Q) for (var S in Q) N.setAttribute(S, Q[S]);
            if (R) N.setAttribute('style', R);
            return N;
        };
        var E = /#\((.+?)\)/g;

        function F(N, O) {
            for (var P in N) N[P] = N[P].replace(E, function (Q, R) {
                return O[R];
            });
        };

        function G(N) {
            var O = N._AC;
            if (O) return O;
            O = {};
            var P = 0,
                Q = N.attributes;
            if (Q) for (var R in Q) {
                P++;
                O[R] = Q[R];
            }
            var S = a.style.getStyleText(N);
            if (S) {
                if (!O.style) P++;
                O.style = S;
            }
            O._length = P;
            return N._AC = O;
        };

        function H(N) {
            if (N._.overrides) return N._.overrides;
            var O = N._.overrides = {},
                P = N._.definition.overrides;
            if (P) {
                if (!e.isArray(P)) P = [P];
                for (var Q = 0; Q < P.length; Q++) {
                    var R = P[Q],
                        S, T, U;
                    if (typeof R == 'string') S = R.toLowerCase();
                    else {
                        S = R.element ? R.element.toLowerCase() : N.element;
                        U = R.attributes;
                    }
                    T = O[S] || (O[S] = {});
                    if (U) {
                        var V = T.attributes = T.attributes || [];
                        for (var W in U) V.push([W.toLowerCase(), U[W]]);
                    }
                }
            }
            return O;
        };

        function I(N, O, P) {
            var Q = new h('span');
            Q[P ? 'setStyle' : 'setAttribute'](N, O);
            return Q[P ? 'getStyle' : 'getAttribute'](N);
        };

        function J(N, O) {
            var P;
            if (O !== false) {
                var Q = new h('span');
                Q.setAttribute('style', N);
                P = Q.getAttribute('style') || '';
            } else P = N;
            return P.replace(/\s*([;:])\s*/, '$1').replace(/([^\s;])$/, '$1;').replace(/,\s+/g, ',').toLowerCase();
        };

        function K(N) {
            var O = {};
            N.replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (P, Q, R) {
                O[Q] = R;
            });
            return O;
        };

        function L(N, O) {
            typeof N == 'string' && (N = K(N));
            typeof O == 'string' && (O = K(O));
            for (var P in N) {
                if (!(P in O && (O[P] == N[P] || N[P] == 'inherit' || O[P] == 'inherit'))) return false;
            }
            return true;
        };

        function M(N, O) {
            var P = N.getSelection(),
                Q = P.getRanges(),
                R = O ? this.removeFromRange : this.applyToRange;
            for (var S = 0; S < Q.length; S++) R.call(this, Q[S]);
            P.selectRanges(Q);
        };
    })();
    a.styleCommand = function (l) {
        this.style = l;
    };
    a.styleCommand.prototype.exec = function (l) {
        var n = this;
        l.focus();
        var m = l.document;
        if (m) if (n.state == 2) n.style.apply(m);
        else if (n.state == 1) n.style.remove(m);
        return !!m;
    };
    a.stylesSet = new a.resourceManager('', 'stylesSet');
    a.addStylesSet = e.bind(a.stylesSet.add, a.stylesSet);
    a.loadStylesSet = function (l, m, n) {
        a.stylesSet.addExternal(l, m, '');
        a.stylesSet.load(l, n);
    };
    a.editor.prototype.getStylesSet = function (l) {
        if (!this._.stylesDefinitions) {
            var m = this,
                n = m.config.stylesCombo_stylesSet || m.config.stylesSet || 'default';
            if (n instanceof Array) {
                m._.stylesDefinitions = n;
                l(n);
                return;
            }
            var o = n.split(':'),
                p = o[0],
                q = o[1],
                r = j.registered.styles.path;
            a.stylesSet.addExternal(p, q ? o.slice(1).join(':') : r + 'styles/' + p + '.js', '');
            a.stylesSet.load(p, function (s) {
                m._.stylesDefinitions = s[p];
                l(m._.stylesDefinitions);
            });
        } else l(this._.stylesDefinitions);
    };
    j.add('domiterator');
    (function () {
        function l(o) {
            var p = this;
            if (arguments.length < 1) return;
            p.range = o;
            p.forceBrBreak = false;
            p.enlargeBr = true;
            p.enforceRealBlocks = false;
            p._ || (p._ = {});
        };
        var m = /^[\r\n\t ]+$/,
            n = d.walker.bookmark();
        l.prototype = {
            getNextParagraph: function (o) {
                var O = this;
                var p, q, r, s, t;
                if (!O._.lastNode) {
                    q = O.range.clone();
                    q.enlarge(O.forceBrBreak || !O.enlargeBr ? 3 : 2);
                    var u = new d.walker(q),
                        v = d.walker.bookmark(true, true);
                    u.evaluator = v;
                    O._.nextNode = u.next();
                    u = new d.walker(q);
                    u.evaluator = v;
                    var w = u.previous();
                    O._.lastNode = w.getNextSourceNode(true);
                    if (O._.lastNode && O._.lastNode.type == 3 && !e.trim(O._.lastNode.getText()) && O._.lastNode.getParent().isBlockBoundary()) {
                        var x = new d.range(q.document);
                        x.moveToPosition(O._.lastNode, 4);
                        if (x.checkEndOfBlock()) {
                            var y = new d.elementPath(x.endContainer),
                                z = y.block || y.blockLimit;
                            O._.lastNode = z.getNextSourceNode(true);
                        }
                    }
                    if (!O._.lastNode) {
                        O._.lastNode = O._.docEndMarker = q.document.createText('');
                        O._.lastNode.insertAfter(w);
                    }
                    q = null;
                }
                var A = O._.nextNode;
                w = O._.lastNode;
                O._.nextNode = null;
                while (A) {
                    var B = false,
                        C = A.type != 1,
                        D = false;
                    if (!C) {
                        var E = A.getName();
                        if (A.isBlockBoundary(O.forceBrBreak && {
                            br: 1
                        })) {
                            if (E == 'br') C = true;
                            else if (!q && !A.getChildCount() && E != 'hr') {
                                p = A;
                                r = A.equals(w);
                                break;
                            }
                            if (q) {
                                q.setEndAt(A, 3);
                                if (E != 'br') O._.nextNode = A;
                            }
                            B = true;
                        } else {
                            if (A.getFirst()) {
                                if (!q) {
                                    q = new d.range(O.range.document);
                                    q.setStartAt(A, 3);
                                }
                                A = A.getFirst();
                                continue;
                            }
                            C = true;
                        }
                    } else if (A.type == 3) if (m.test(A.getText())) C = false;
                    if (C && !q) {
                        q = new d.range(O.range.document);
                        q.setStartAt(A, 3);
                    }
                    r = (!B || C) && A.equals(w);
                    if (q && !B) while (!A.getNext() && !r) {
                        var F = A.getParent();
                        if (F.isBlockBoundary(O.forceBrBreak && {
                            br: 1
                        })) {
                            B = true;
                            r = r || F.equals(w);
                            break;
                        }
                        A = F;
                        C = true;
                        r = A.equals(w);
                        D = true;
                    }
                    if (C) q.setEndAt(A, 4);
                    A = A.getNextSourceNode(D, null, w);
                    r = !A;
                    if ((B || r) && q) {
                        var G = q.getBoundaryNodes(),
                            H = new d.elementPath(q.startContainer);
                        if (G.startNode.getParent().equals(H.blockLimit) && n(G.startNode) && n(G.endNode)) {
                            q = null;
                            O._.nextNode = null;
                        } else break;
                    }
                    if (r) break;
                }
                if (!p) {
                    if (!q) {
                        O._.docEndMarker && O._.docEndMarker.remove();
                        O._.nextNode = null;
                        return null;
                    }
                    H = new d.elementPath(q.startContainer);
                    var I = H.blockLimit,
                        J = {
                            div: 1,
                            th: 1,
                            td: 1
                        };
                    p = H.block;
                    if (!p && !O.enforceRealBlocks && J[I.getName()] && q.checkStartOfBlock() && q.checkEndOfBlock()) p = I;
                    else if (!p || O.enforceRealBlocks && p.getName() == 'li') {
                        p = O.range.document.createElement(o || 'p');
                        q.extractContents().appendTo(p);
                        p.trim();
                        q.insertNode(p);
                        s = t = true;
                    } else if (p.getName() != 'li') {
                        if (!q.checkStartOfBlock() || !q.checkEndOfBlock()) {
                            p = p.clone(false);
                            q.extractContents().appendTo(p);
                            p.trim();
                            var K = q.splitBlock();
                            s = !K.wasStartOfBlock;
                            t = !K.wasEndOfBlock;
                            q.insertNode(p);
                        }
                    } else if (!r) O._.nextNode = p.equals(w) ? null : q.getBoundaryNodes().endNode.getNextSourceNode(true, null, w);
                }
                if (s) {
                    var L = p.getPrevious();
                    if (L && L.type == 1) if (L.getName() == 'br') L.remove();
                    else if (L.getLast() && L.getLast().$.nodeName.toLowerCase() == 'br') L.getLast().remove();
                }
                if (t) {
                    var M = d.walker.bookmark(false, true),
                        N = p.getLast();
                    if (N && N.type == 1 && N.getName() == 'br') if (c || N.getPrevious(M) || N.getNext(M)) N.remove();
                }
                if (!O._.nextNode) O._.nextNode = r || p.equals(w) ? null : p.getNextSourceNode(true, null, w);
                return p;
            }
        };
        d.range.prototype.createIterator = function () {
            return new l(this);
        };
    })();
    j.add('panelbutton', {
        requires: ['button'],
        beforeInit: function (l) {
            l.ui.addHandler(4, k.panelButton.handler);
        }
    });
    a.UI_PANELBUTTON = 4;
    (function () {
        var l = function (m) {
                var o = this;
                var n = o._;
                if (n.state == 0) return;
                o.createPanel(m);
                if (n.on) {
                    n.panel.hide();
                    return;
                }
                n.panel.showBlock(o._.id, o.document.getById(o._.id), 4);
            };
        k.panelButton = e.createClass({
            base: k.button,
            $: function (m) {
                var o = this;
                var n = m.panel;
                delete m.panel;
                o.base(m);
                o.document = n && n.parent && n.parent.getDocument() || a.document;
                n.block = {
                    attributes: n.attributes
                };
                o.hasArrow = true;
                o.click = l;
                o._ = {
                    panelDefinition: n
                };
            },
            statics: {
                handler: {
                    create: function (m) {
                        return new k.panelButton(m);
                    }
                }
            },
            proto: {
                createPanel: function (m) {
                    var n = this._;
                    if (n.panel) return;
                    var o = this._.panelDefinition || {},
                        p = this._.panelDefinition.block,
                        q = o.parent || a.document.getBody(),
                        r = this._.panel = new k.floatPanel(m, q, o),
                        s = r.addBlock(n.id, p),
                        t = this;
                    r.onShow = function () {
                        if (t.className) this.element.getFirst().addClass(t.className + '_panel');
                        n.oldState = t._.state;
                        t.setState(1);
                        n.on = 1;
                        if (t.onOpen) t.onOpen();
                    };
                    r.onHide = function () {
                        if (t.className) this.element.getFirst().removeClass(t.className + '_panel');
                        t.setState(n.oldState);
                        n.on = 0;
                        if (t.onClose) t.onClose();
                    };
                    r.onEscape = function () {
                        r.hide();
                        t.document.getById(n.id).focus();
                    };
                    if (this.onBlock) this.onBlock(r, s);
                    s.onHide = function () {
                        n.on = 0;
                        t.setState(2);
                    };
                }
            }
        });
    })();
    j.add('floatpanel', {
        requires: ['panel']
    });
    (function () {
        var l = {},
            m = false;

        function n(o, p, q, r, s) {
            var t = p.getUniqueId() + '-' + q.getUniqueId() + '-' + o.skinName + '-' + o.lang.dir + (o.uiColor && '-' + o.uiColor || '') + (r.css && '-' + r.css || '') + (s && '-' + s || ''),
                u = l[t];
            if (!u) {
                u = l[t] = new k.panel(p, r);
                u.element = q.append(h.createFromHtml(u.renderHtml(o), p));
                u.element.setStyles({
                    display: 'none',
                    position: 'absolute'
                });
            }
            return u;
        };
        k.floatPanel = e.createClass({
            $: function (o, p, q, r) {
                q.forceIFrame = true;
                var s = p.getDocument(),
                    t = n(o, s, p, q, r || 0),
                    u = t.element,
                    v = u.getFirst().getFirst();
                this.element = u;
                this._ = {
                    panel: t,
                    parentElement: p,
                    definition: q,
                    document: s,
                    iframe: v,
                    children: [],
                    dir: o.lang.dir
                };
            },
            proto: {
                addBlock: function (o, p) {
                    return this._.panel.addBlock(o, p);
                },
                addListBlock: function (o, p) {
                    return this._.panel.addListBlock(o, p);
                },
                getBlock: function (o) {
                    return this._.panel.getBlock(o);
                },
                showBlock: function (o, p, q, r, s) {
                    var t = this._.panel,
                        u = t.showBlock(o);
                    this.allowBlur(false);
                    m = true;
                    var v = this.element,
                        w = this._.iframe,
                        x = this._.definition,
                        y = p.getDocumentPosition(v.getDocument()),
                        z = this._.dir == 'rtl',
                        A = y.x + (r || 0),
                        B = y.y + (s || 0);
                    if (z && (q == 1 || q == 4)) A += p.$.offsetWidth;
                    else if (!z && (q == 2 || q == 3)) A += p.$.offsetWidth - 1;
                    if (q == 3 || q == 4) B += p.$.offsetHeight - 1;
                    this._.panel._.offsetParentId = p.getId();
                    v.setStyles({
                        top: B + 'px',
                        left: '-3000px',
                        opacity: '0',
                        display: ''
                    });
                    v.getFirst().removeStyle('width');
                    if (!this._.blurSet) {
                        var C = c ? w : new d.window(w.$.contentWindow);
                        a.event.useCapture = true;
                        C.on('blur', function (D) {
                            var F = this;
                            if (!F.allowBlur()) return;
                            var E;
                            if (c && !F.allowBlur() || (E = D.data.getTarget()) && E.getName && E.getName() != 'iframe') return;
                            if (F.visible && !F._.activeChild && !m) F.hide();
                        }, this);
                        C.on('focus', function () {
                            this._.focused = true;
                            this.hideChild();
                            this.allowBlur(true);
                        }, this);
                        a.event.useCapture = false;
                        this._.blurSet = 1;
                    }
                    t.onEscape = e.bind(function (D) {
                        if (this.onEscape && this.onEscape(D) === false) return false;
                    }, this);
                    e.setTimeout(function () {
                        if (z) A -= v.$.offsetWidth;
                        var D = e.bind(function () {
                            var E = v.getFirst();
                            if (u.autoSize) {
                                var F = u.element.$;
                                if (b.gecko || b.opera) F = F.parentNode;
                                if (c) F = F.document.body;
                                var G = F.scrollWidth;
                                if (c && b.quirks && G > 0) G += (E.$.offsetWidth || 0) - (E.$.clientWidth || 0);
                                G += 4;
                                E.setStyle('width', G + 'px');
                                u.element.addClass('cke_frameLoaded');
                                var H = u.element.$.scrollHeight;
                                if (c && b.quirks && H > 0) H += (E.$.offsetHeight || 0) - (E.$.clientHeight || 0);
                                E.setStyle('height', H + 'px');
                                t._.currentBlock.element.setStyle('display', 'none').removeStyle('display');
                            } else E.removeStyle('height');
                            var I = t.element,
                                J = I.getWindow(),
                                K = J.getScrollPosition(),
                                L = J.getViewPaneSize(),
                                M = {
                                    height: I.$.offsetHeight,
                                    width: I.$.offsetWidth
                                };
                            if (z ? A < 0 : A + M.width > L.width + K.x) A += M.width * (z ? 1 : -1);
                            if (B + M.height > L.height + K.y) B -= M.height;
                            v.setStyles({
                                top: B + 'px',
                                left: A + 'px',
                                opacity: '1'
                            });
                        }, this);
                        t.isLoaded ? D() : t.onLoad = D;
                        e.setTimeout(function () {
                            w.$.contentWindow.focus();
                            this.allowBlur(true);
                        }, 0, this);
                    }, 0, this);
                    this.visible = 1;
                    if (this.onShow) this.onShow.call(this);
                    m = false;
                },
                hide: function () {
                    var o = this;
                    if (o.visible && (!o.onHide || o.onHide.call(o) !== true)) {
                        o.hideChild();
                        o.element.setStyle('display', 'none');
                        o.visible = 0;
                    }
                },
                allowBlur: function (o) {
                    var p = this._.panel;
                    if (o != undefined) p.allowBlur = o;
                    return p.allowBlur;
                },
                showAsChild: function (o, p, q, r, s, t) {
                    if (this._.activeChild == o && o._.panel._.offsetParentId == q.getId()) return;
                    this.hideChild();
                    o.onHide = e.bind(function () {
                        e.setTimeout(function () {
                            if (!this._.focused) this.hide();
                        }, 0, this);
                    }, this);
                    this._.activeChild = o;
                    this._.focused = false;
                    o.showBlock(p, q, r, s, t);
                    if (b.ie7Compat || b.ie8 && b.ie6Compat) setTimeout(function () {
                        o.element.getChild(0).$.style.cssText += '';
                    }, 100);
                },
                hideChild: function () {
                    var o = this._.activeChild;
                    if (o) {
                        delete o.onHide;
                        delete this._.activeChild;
                        o.hide();
                    }
                }
            }
        });
        a.on('instanceDestroyed', function () {
            var o = e.isEmpty(a.instances);
            for (var p in l) {
                var q = l[p];
                if (o) q.destroy();
                else q.element.hide();
            }
            o && (l = {});
        });
    })();
    j.add('menu', {
        beforeInit: function (l) {
            var m = l.config.menu_groups.split(','),
                n = l._.menuGroups = {},
                o = l._.menuItems = {};
            for (var p = 0; p < m.length; p++) n[m[p]] = p + 1;
            l.addMenuGroup = function (q, r) {
                n[q] = r || 100;
            };
            l.addMenuItem = function (q, r) {
                if (n[r.group]) o[q] = new a.menuItem(this, q, r);
            };
            l.addMenuItems = function (q) {
                for (var r in q) this.addMenuItem(r, q[r]);
            };
            l.getMenuItem = function (q) {
                return o[q];
            };
        },
        requires: ['floatpanel']
    });
    (function () {
        a.menu = e.createClass({
            $: function (m, n) {
                var q = this;
                n = q._.definition = n || {};
                q.id = 'cke_' + e.getNextNumber();
                q.editor = m;
                q.items = [];
                q._.level = n.level || 1;
                var o = e.extend({}, n.panel, {
                    css: m.skin.editor.css,
                    level: q._.level - 1,
                    block: {}
                }),
                    p = o.block.attributes = o.attributes || {};
                !p.role && (p.role = 'menu');
                q._.panelDefinition = o;
            },
            _: {
                showSubMenu: function (m) {
                    var u = this;
                    var n = u._.subMenu,
                        o = u.items[m],
                        p = o.getItems && o.getItems();
                    if (!p) {
                        u._.panel.hideChild();
                        return;
                    }
                    var q = u._.panel.getBlock(u.id);
                    q._.focusIndex = m;
                    if (n) n.removeAll();
                    else {
                        n = u._.subMenu = new a.menu(u.editor, e.extend({}, u._.definition, {
                            level: u._.level + 1
                        }, true));
                        n.parent = u;
                        n.onClick = e.bind(u.onClick, u);
                        n.onEscape = u.onEscape;
                    }
                    for (var r in p) {
                        var s = u.editor.getMenuItem(r);
                        if (s) {
                            s.state = p[r];
                            n.add(s);
                        }
                    }
                    var t = u._.panel.getBlock(u.id).element.getDocument().getById(u.id + String(m));
                    n.show(t, 2);
                }
            },
            proto: {
                add: function (m) {
                    if (!m.order) m.order = this.items.length;
                    this.items.push(m);
                },
                removeAll: function () {
                    this.items = [];
                },
                show: function (m, n, o, p) {
                    var q = this.items,
                        r = this.editor,
                        s = this._.panel,
                        t = this._.element;
                    if (!s) {
                        s = this._.panel = new k.floatPanel(this.editor, a.document.getBody(), this._.panelDefinition, this._.level);
                        s.onEscape = e.bind(function (C) {
                            if (this.onEscape && this.onEscape(C) === false) return false;
                        }, this);
                        s.onHide = e.bind(function () {
                            this.onHide && this.onHide();
                        }, this);
                        var u = s.addBlock(this.id, this._.panelDefinition.block);
                        u.autoSize = true;
                        var v = u.keys;
                        v[40] = 'next';
                        v[9] = 'next';
                        v[38] = 'prev';
                        v[2000 + 9] = 'prev';
                        v[32] = 'click';
                        v[r.lang.dir == 'rtl' ? 37 : 39] = 'click';
                        t = this._.element = u.element;
                        t.addClass(r.skinClass);
                        var w = t.getDocument();
                        w.getBody().setStyle('overflow', 'hidden');
                        w.getElementsByTag('html').getItem(0).setStyle('overflow', 'hidden');
                        this._.itemOverFn = e.addFunction(function (C) {
                            var D = this;
                            clearTimeout(D._.showSubTimeout);
                            D._.showSubTimeout = e.setTimeout(D._.showSubMenu, r.config.menu_subMenuDelay, D, [C]);
                        }, this);
                        this._.itemOutFn = e.addFunction(function (C) {
                            clearTimeout(this._.showSubTimeout);
                        }, this);
                        this._.itemClickFn = e.addFunction(function (C) {
                            var E = this;
                            var D = E.items[C];
                            if (D.state == 0) {
                                E.hide();
                                return;
                            }
                            if (D.getItems) E._.showSubMenu(C);
                            else E.onClick && E.onClick(D);
                        }, this);
                    }
                    l(q);
                    var x = ['<div class="cke_menu" role="presentation">'],
                        y = q.length,
                        z = y && q[0].group;
                    for (var A = 0; A < y; A++) {
                        var B = q[A];
                        if (z != B.group) {
                            x.push('<div class="cke_menuseparator" role="separator"></div>');
                            z = B.group;
                        }
                        B.render(this, A, x);
                    }
                    x.push('</div>');
                    t.setHtml(x.join(''));
                    if (this.parent) this.parent._.panel.showAsChild(s, this.id, m, n, o, p);
                    else s.showBlock(this.id, m, n, o, p);
                    r.fire('menuShow', [s]);
                },
                hide: function () {
                    this._.panel && this._.panel.hide();
                }
            }
        });

        function l(m) {
            m.sort(function (n, o) {
                if (n.group < o.group) return -1;
                else if (n.group > o.group) return 1;
                return n.order < o.order ? -1 : n.order > o.order ? 1 : 0;
            });
        };
    })();
    a.menuItem = e.createClass({
        $: function (l, m, n) {
            var o = this;
            e.extend(o, n, {
                order: 0,
                className: 'cke_button_' + m
            });
            o.group = l._.menuGroups[o.group];
            o.editor = l;
            o.name = m;
        },
        proto: {
            render: function (l, m, n) {
                var u = this;
                var o = l.id + String(m),
                    p = typeof u.state == 'undefined' ? 2 : u.state,
                    q = ' cke_' + (p == 1 ? 'on' : p == 0 ? 'disabled' : 'off'),
                    r = u.label;
                if (u.className) q += ' ' + u.className;
                var s = u.getItems;
                n.push('<span class="cke_menuitem"><a id="', o, '" class="', q, '" href="javascript:void(\'', (u.label || '').replace("'", ''), '\')" title="', u.label, '" tabindex="-1"_cke_focus=1 hidefocus="true" role="menuitem"' + (s ? 'aria-haspopup="true"' : '') + (p == 0 ? 'aria-disabled="true"' : '') + (p == 1 ? 'aria-pressed="true"' : ''));
                if (b.opera || b.gecko && b.mac) n.push(' onkeypress="return false;"');
                if (b.gecko) n.push(' onblur="this.style.cssText = this.style.cssText;"');
                var t = (u.iconOffset || 0) * -16;
                n.push(' onmouseover="CKEDITOR.tools.callFunction(', l._.itemOverFn, ',', m, ');" onmouseout="CKEDITOR.tools.callFunction(', l._.itemOutFn, ',', m, ');" onclick="CKEDITOR.tools.callFunction(', l._.itemClickFn, ',', m, '); return false;"><span class="cke_icon_wrapper"><span class="cke_icon"' + (u.icon ? ' style="background-image:url(' + a.getUrl(u.icon) + ');background-position:0 ' + t + 'px;"' : '') + '></span></span>' + '<span class="cke_label">');
                if (s) n.push('<span class="cke_menuarrow">', '<span>&#', u.editor.lang.dir == 'rtl' ? '9668' : '9658', ';</span>', '</span>');
                n.push(r, '</span></a></span>');
            }
        }
    });
    i.menu_subMenuDelay = 400;
    i.menu_groups = 'clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div';
    (function () {
        var l = function (n, o) {
                return n._.modes && n._.modes[o || n.mode];
            },
            m;
        j.add('editingblock', {
            init: function (n) {
                if (!n.config.editingBlock) return;
                n.on('themeSpace', function (o) {
                    if (o.data.space == 'contents') o.data.html += '<br>';
                });
                n.on('themeLoaded', function () {
                    n.fireOnce('editingBlockReady');
                });
                n.on('uiReady', function () {
                    n.setMode(n.config.startupMode);
                });
                n.on('afterSetData', function () {
                    if (!m) {
                        function o() {
                            m = true;
                            l(n).loadData(n.getData());
                            m = false;
                        };
                        if (n.mode) o();
                        else n.on('mode', function () {
                            o();
                            n.removeListener('mode', arguments.callee);
                        });
                    }
                });
                n.on('beforeGetData', function () {
                    if (!m && n.mode) {
                        m = true;
                        n.setData(l(n).getData());
                        m = false;
                    }
                });
                n.on('getSnapshot', function (o) {
                    if (n.mode) o.data = l(n).getSnapshotData();
                });
                n.on('loadSnapshot', function (o) {
                    if (n.mode) l(n).loadSnapshotData(o.data);
                });
                n.on('mode', function (o) {
                    o.removeListener();
                    b.webkit && n.container.on('focus', function () {
                        n.focus();
                    });
                    if (n.config.startupFocus) n.focus();
                    setTimeout(function () {
                        n.fireOnce('instanceReady');
                        a.fire('instanceReady', null, n);
                    });
                });
            }
        });
        a.editor.prototype.mode = '';
        a.editor.prototype.addMode = function (n, o) {
            o.name = n;
            (this._.modes || (this._.modes = {}))[n] = o;
        };
        a.editor.prototype.setMode = function (n) {
            var o, p = this.getThemeSpace('contents'),
                q = this.checkDirty();
            if (this.mode) {
                if (n == this.mode) return;
                this.fire('beforeModeUnload');
                var r = l(this);
                o = r.getData();
                r.unload(p);
                this.mode = '';
            }
            p.setHtml('');
            var s = l(this, n);
            if (!s) throw '[CKEDITOR.editor.setMode] Unknown mode "' + n + '".';
            if (!q) this.on('mode', function () {
                this.resetDirty();
                this.removeListener('mode', arguments.callee);
            });
            s.load(p, typeof o != 'string' ? this.getData() : o);
        };
        a.editor.prototype.focus = function () {
            var n = l(this);
            if (n) n.focus();
        };
    })();
    i.startupMode = 'wysiwyg';
    i.startupFocus = false;
    i.editingBlock = true;
    (function () {
        function l() {
            var v = this;
            try {
                var s = v.getSelection();
                if (!s) return;
                var t = s.getStartElement(),
                    u = new d.elementPath(t);
                if (!u.compare(v._.selectionPreviousPath)) {
                    v._.selectionPreviousPath = u;
                    v.fire('selectionChange', {
                        selection: s,
                        path: u,
                        element: t
                    });
                }
            } catch (w) {}
        };
        var m, n;

        function o() {
            n = true;
            if (m) return;
            p.call(this);
            m = e.setTimeout(p, 200, this);
        };

        function p() {
            m = null;
            if (n) {
                e.setTimeout(l, 0, this);
                n = false;
            }
        };
        var q = {
            modes: {
                wysiwyg: 1,
                source: 1
            },
            exec: function (s) {
                switch (s.mode) {
                case 'wysiwyg':
                    s.document.$.execCommand('SelectAll', false, null);
                    break;
                case 'source':
                    var t = s.textarea.$;
                    if (c) t.createTextRange().execCommand('SelectAll');
                    else {
                        t.selectionStart = 0;
                        t.selectionEnd = t.value.length;
                    }
                    t.focus();
                }
            },
            canUndo: false
        };
        j.add('selection', {
            init: function (s) {
                s.on('contentDom', function () {
                    var t = s.document,
                        u = t.getBody();
                    if (c) {
                        var v, w;
                        u.on('focusin', function (z) {
                            if (z.data.$.srcElement.nodeName != 'BODY') return;
                            if (v) {
                                try {
                                    v.select();
                                } catch (A) {}
                                v = null;
                            }
                        });
                        u.on('focus', function () {
                            w = true;
                            y();
                        });
                        u.on('beforedeactivate', function (z) {
                            if (z.data.$.toElement) return;
                            w = false;
                        });
                        if (c && b.version < 8) t.getWindow().on('blur', function (z) {
                            s.document.$.selection.empty();
                        });
                        u.on('mousedown', x);
                        u.on('mouseup', function () {
                            w = true;
                            setTimeout(function () {
                                y(true);
                            }, 0);
                        });
                        u.on('keydown', x);
                        u.on('keyup', function () {
                            w = true;
                            y();
                        });
                        t.on('selectionchange', y);

                        function x() {
                            w = false;
                        };

                        function y(z) {
                            if (w) {
                                var A = s.document,
                                    B = s.getSelection(),
                                    C = B && B.getNative();
                                if (z && C && C.type == 'None') if (!A.$.queryCommandEnabled('InsertImage')) {
                                    e.setTimeout(y, 50, this, true);
                                    return;
                                }
                                var D;
                                if (C && C.type == 'Text' && (D = C.createRange().parentElement().nodeName.toLowerCase()) && D in {
                                    input: 1,
                                    textarea: 1
                                }) return;
                                v = C && B.getRanges()[0];
                                o.call(s);
                            }
                        };
                    } else {
                        t.on('mouseup', o, s);
                        t.on('keyup', o, s);
                    }
                });
                s.addCommand('selectAll', q);
                s.ui.addButton('SelectAll', {
                    label: s.lang.selectAll,
                    command: 'selectAll'
                });
                s.selectionChange = o;
            }
        });
        a.editor.prototype.getSelection = function () {
            return this.document && this.document.getSelection();
        };
        a.editor.prototype.forceNextSelectionCheck = function () {
            delete this._.selectionPreviousPath;
        };
        g.prototype.getSelection = function () {
            var s = new d.selection(this);
            return !s || s.isInvalid ? null : s;
        };
        a.SELECTION_NONE = 1;
        a.SELECTION_TEXT = 2;
        a.SELECTION_ELEMENT = 3;
        d.selection = function (s) {
            var v = this;
            var t = s.getCustomData('cke_locked_selection');
            if (t) return t;
            v.document = s;
            v.isLocked = false;
            v._ = {
                cache: {}
            };
            if (c) {
                var u = v.getNative().createRange();
                if (!u || u.item && u.item(0).ownerDocument != v.document.$ || u.parentElement && u.parentElement().ownerDocument != v.document.$) v.isInvalid = true;
            }
            return v;
        };
        var r = {
            img: 1,
            hr: 1,
            li: 1,
            table: 1,
            tr: 1,
            td: 1,
            th: 1,
            embed: 1,
            object: 1,
            ol: 1,
            ul: 1,
            a: 1,
            input: 1,
            form: 1,
            select: 1,
            textarea: 1,
            button: 1,
            fieldset: 1,
            th: 1,
            thead: 1,
            tfoot: 1
        };
        d.selection.prototype = {
            getNative: c ?
            function () {
                return this._.cache.nativeSel || (this._.cache.nativeSel = this.document.$.selection);
            } : function () {
                return this._.cache.nativeSel || (this._.cache.nativeSel = this.document.getWindow().$.getSelection());
            },
            getType: c ?
            function () {
                var s = this._.cache;
                if (s.type) return s.type;
                var t = 1;
                try {
                    var u = this.getNative(),
                        v = u.type;
                    if (v == 'Text') t = 2;
                    if (v == 'Control') t = 3;
                    if (u.createRange().parentElement) t = 2;
                } catch (w) {}
                return s.type = t;
            } : function () {
                var s = this._.cache;
                if (s.type) return s.type;
                var t = 2,
                    u = this.getNative();
                if (!u) t = 1;
                else if (u.rangeCount == 1) {
                    var v = u.getRangeAt(0),
                        w = v.startContainer;
                    if (w == v.endContainer && w.nodeType == 1 && v.endOffset - v.startOffset == 1 && r[w.childNodes[v.startOffset].nodeName.toLowerCase()]) t = 3;
                }
                return s.type = t;
            },
            getRanges: c ? (function () {
                var s = function (t, u) {
                        t = t.duplicate();
                        t.collapse(u);
                        var v = t.parentElement(),
                            w = v.childNodes,
                            x;
                        for (var y = 0; y < w.length; y++) {
                            var z = w[y];
                            if (z.nodeType == 1) {
                                x = t.duplicate();
                                x.moveToElementText(z);
                                var A = x.compareEndPoints('StartToStart', t),
                                    B = x.compareEndPoints('EndToStart', t);
                                x.collapse();
                                if (A > 0) break;
                                else if (!A || B == 1 && A == -1) return {
                                    container: v,
                                    offset: y
                                };
                                else if (!B) return {
                                    container: v,
                                    offset: y + 1
                                };
                                x = null;
                            }
                        }
                        if (!x) {
                            x = t.duplicate();
                            x.moveToElementText(v);
                            x.collapse(false);
                        }
                        x.setEndPoint('StartToStart', t);
                        var C = x.text.replace(/(\r\n|\r)/g, '\n').length;
                        try {
                            while (C > 0) C -= w[--y].nodeValue.length;
                        } catch (D) {
                            C = 0;
                        }
                        if (C === 0) return {
                            container: v,
                            offset: y
                        };
                        else return {
                            container: w[y],
                            offset: -C
                        };
                    };
                return function () {
                    var E = this;
                    var t = E._.cache;
                    if (t.ranges) return t.ranges;
                    var u = E.getNative(),
                        v = u && u.createRange(),
                        w = E.getType(),
                        x;
                    if (!u) return [];
                    if (w == 2) {
                        x = new d.range(E.document);
                        var y = s(v, true);
                        x.setStart(new d.node(y.container), y.offset);
                        y = s(v);
                        x.setEnd(new d.node(y.container), y.offset);
                        return t.ranges = [x];
                    } else if (w == 3) {
                        var z = E._.cache.ranges = [];
                        for (var A = 0; A < v.length; A++) {
                            var B = v.item(A),
                                C = B.parentNode,
                                D = 0;
                            x = new d.range(E.document);
                            for (; D < C.childNodes.length && C.childNodes[D] != B; D++) {}
                            x.setStart(new d.node(C), D);
                            x.setEnd(new d.node(C), D + 1);
                            z.push(x);
                        }
                        return z;
                    }
                    return t.ranges = [];
                };
            })() : function () {
                var s = this._.cache;
                if (s.ranges) return s.ranges;
                var t = [],
                    u = this.getNative();
                if (!u) return [];
                for (var v = 0; v < u.rangeCount; v++) {
                    var w = u.getRangeAt(v),
                        x = new d.range(this.document);
                    x.setStart(new d.node(w.startContainer), w.startOffset);
                    x.setEnd(new d.node(w.endContainer), w.endOffset);
                    t.push(x);
                }
                return s.ranges = t;
            },
            getStartElement: function () {
                var z = this;
                var s = z._.cache;
                if (s.startElement !== undefined) return s.startElement;
                var t, u = z.getNative();
                switch (z.getType()) {
                case 3:
                    return z.getSelectedElement();
                case 2:
                    var v = z.getRanges()[0];
                    if (v) if (!v.collapsed) {
                        v.optimize();
                        for (;;) {
                            var w = v.startContainer,
                                x = v.startOffset;
                            if (x == (w.getChildCount ? w.getChildCount() : w.getLength()) && !w.isBlockBoundary()) v.setStartAfter(w);
                            else break;
                        }
                        t = v.startContainer;
                        if (t.type != 1) return t.getParent();
                        t = t.getChild(v.startOffset);
                        if (!t || t.type != 1) return v.startContainer;
                        var y = t.getFirst();
                        while (y && y.type == 1) {
                            t = y;
                            y = y.getFirst();
                        }
                        return t;
                    }
                    if (c) {
                        v = u.createRange();
                        v.collapse(true);
                        t = v.parentElement();
                    } else {
                        t = u.anchorNode;
                        if (t && t.nodeType != 1) t = t.parentNode;
                    }
                }
                return s.startElement = t ? new h(t) : null;
            },
            getSelectedElement: function () {
                var s = this._.cache;
                if (s.selectedElement !== undefined) return s.selectedElement;
                var t = this,
                    u = e.tryThese(function () {
                        return t.getNative().createRange().item(0);
                    }, function () {
                        var v = t.getRanges()[0],
                            w, x;
                        for (var y = 2; y && !((w = v.getEnclosedNode()) && w.type == 1 && r[w.getName()] && (x = w)); y--) v.shrink(1);
                        return x.$;
                    });
                return s.selectedElement = u ? new h(u) : null;
            },
            lock: function () {
                var s = this;
                s.getRanges();
                s.getStartElement();
                s.getSelectedElement();
                s._.cache.nativeSel = {};
                s.isLocked = true;
                s.document.setCustomData('cke_locked_selection', s);
            },
            unlock: function (s) {
                var x = this;
                var t = x.document,
                    u = t.getCustomData('cke_locked_selection');
                if (u) {
                    t.setCustomData('cke_locked_selection', null);
                    if (s) {
                        var v = u.getSelectedElement(),
                            w = !v && u.getRanges();
                        x.isLocked = false;
                        x.reset();
                        t.getBody().focus();
                        if (v) x.selectElement(v);
                        else x.selectRanges(w);
                    }
                }
                if (!u || !s) {
                    x.isLocked = false;
                    x.reset();
                }
            },
            reset: function () {
                this._.cache = {};
            },
            selectElement: function (s) {
                var v = this;
                if (v.isLocked) {
                    var t = new d.range(v.document);
                    t.setStartBefore(s);
                    t.setEndAfter(s);
                    v._.cache.selectedElement = s;
                    v._.cache.startElement = s;
                    v._.cache.ranges = [t];
                    v._.cache.type = 3;
                    return;
                }
                if (c) {
                    v.getNative().empty();
                    try {
                        t = v.document.$.body.createControlRange();
                        t.addElement(s.$);
                        t.select();
                    } catch (w) {
                        t = v.document.$.body.createTextRange();
                        t.moveToElementText(s.$);
                        t.select();
                    } finally {
                        v.document.fire('selectionchange');
                    }
                    v.reset();
                } else {
                    t = v.document.$.createRange();
                    t.selectNode(s.$);
                    var u = v.getNative();
                    u.removeAllRanges();
                    u.addRange(t);
                    v.reset();
                }
            },
            selectRanges: function (s) {
                var y = this;
                if (y.isLocked) {
                    y._.cache.selectedElement = null;
                    y._.cache.startElement = s[0].getTouchedStartNode();
                    y._.cache.ranges = s;
                    y._.cache.type = 2;
                    return;
                }
                if (c) {
                    if (s[0]) s[0].select();
                    y.reset();
                } else {
                    var t = y.getNative();
                    t.removeAllRanges();
                    for (var u = 0; u < s.length; u++) {
                        var v = s[u],
                            w = y.document.$.createRange(),
                            x = v.startContainer;
                        if (v.collapsed && b.gecko && b.version < 10900 && x.type == 1 && !x.getChildCount()) x.appendText('');
                        w.setStart(x.$, v.startOffset);
                        w.setEnd(v.endContainer.$, v.endOffset);
                        t.addRange(w);
                    }
                    y.reset();
                }
            },
            createBookmarks: function (s) {
                var t = [],
                    u = this.getRanges(),
                    v = u.length,
                    w;
                for (var x = 0; x < v; x++) {
                    t.push(w = u[x].createBookmark(s, true));
                    s = w.serializable;
                    var y = s ? this.document.getById(w.startNode) : w.startNode,
                        z = s ? this.document.getById(w.endNode) : w.endNode;
                    for (var A = x + 1; A < v; A++) {
                        var B = u[A],
                            C = B.startContainer,
                            D = B.endContainer;
                        C.equals(y.getParent()) && B.startOffset++;
                        C.equals(z.getParent()) && B.startOffset++;
                        D.equals(y.getParent()) && B.endOffset++;
                        D.equals(z.getParent()) && B.endOffset++;
                    }
                }
                return t;
            },
            createBookmarks2: function (s) {
                var t = [],
                    u = this.getRanges();
                for (var v = 0; v < u.length; v++) t.push(u[v].createBookmark2(s));
                return t;
            },
            selectBookmarks: function (s) {
                var t = [];
                for (var u = 0; u < s.length; u++) {
                    var v = new d.range(this.document);
                    v.moveToBookmark(s[u]);
                    t.push(v);
                }
                this.selectRanges(t);
                return this;
            },
            getCommonAncestor: function () {
                var s = this.getRanges(),
                    t = s[0].startContainer,
                    u = s[s.length - 1].endContainer;
                return t.getCommonAncestor(u);
            },
            scrollIntoView: function () {
                var s = this.getStartElement();
                s.scrollIntoView();
            }
        };
    })();
    (function () {
        var l = d.walker.whitespaces(true),
            m = /\ufeff|\u00a0/,
            n = {
                table: 1,
                tbody: 1,
                tr: 1
            };
        d.range.prototype.select = c ?
        function (o) {
            var y = this;
            var p = y.collapsed,
                q, r;
            if (y.startContainer.type == 1 && y.startContainer.getName() in n || y.endContainer.type == 1 && y.endContainer.getName() in n) y.shrink(1, true);
            var s = y.createBookmark(),
                t = s.startNode,
                u;
            if (!p) u = s.endNode;
            var v = y.document.$.body.createTextRange();
            v.moveToElementText(t.$);
            v.moveStart('character', 1);
            if (u) {
                var w = y.document.$.body.createTextRange();
                w.moveToElementText(u.$);
                v.setEndPoint('EndToEnd', w);
                v.moveEnd('character', -1);
            } else {
                var x = t.getNext(l);
                q = !(x && x.getText && x.getText().match(m)) && (o || !t.hasPrevious() || t.getPrevious().is && t.getPrevious().is('br'));
                r = y.document.createElement('span');
                r.setHtml('&#65279;');
                r.insertBefore(t);
                if (q) y.document.createText('\ufeff').insertBefore(t);
            }
            y.setStartBefore(t);
            t.remove();
            if (p) {
                if (q) {
                    v.moveStart('character', -1);
                    v.select();
                    y.document.$.selection.clear();
                } else v.select();
                y.moveToPosition(r, 3);
                r.remove();
            } else {
                y.setEndBefore(u);
                u.remove();
                v.select();
            }
            y.document.fire('selectionchange');
        } : function () {
            var r = this;
            var o = r.startContainer;
            if (r.collapsed && o.type == 1 && !o.getChildCount()) o.append(new d.text(''));
            var p = r.document.$.createRange();
            p.setStart(o.$, r.startOffset);
            try {
                p.setEnd(r.endContainer.$, r.endOffset);
            } catch (s) {
                if (s.toString().indexOf('NS_ERROR_ILLEGAL_VALUE') >= 0) {
                    r.collapse(true);
                    p.setEnd(r.endContainer.$, r.endOffset);
                } else throw s;
            }
            var q = r.document.getSelection().getNative();
            q.removeAllRanges();
            q.addRange(p);
        };
    })();
    (function () {
        var l = {
            elements: {
                $: function (m) {
                    var n = m.attributes,
                        o = n && n._cke_realelement,
                        p = o && new a.htmlParser.fragment.fromHtml(decodeURIComponent(o)),
                        q = p && p.children[0];
                    if (q && m.attributes._cke_resizable) {
                        var r = m.attributes.style;
                        if (r) {
                            var s = /(?:^|\s)width\s*:\s*(\d+)/i.exec(r),
                                t = s && s[1];
                            s = /(?:^|\s)height\s*:\s*(\d+)/i.exec(r);
                            var u = s && s[1];
                            if (t) q.attributes.width = t;
                            if (u) q.attributes.height = u;
                        }
                    }
                    return q;
                }
            }
        };
        j.add('fakeobjects', {
            requires: ['htmlwriter'],
            afterInit: function (m) {
                var n = m.dataProcessor,
                    o = n && n.htmlFilter;
                if (o) o.addRules(l);
            }
        });
    })();
    a.editor.prototype.createFakeElement = function (l, m, n, o) {
        var p = this.lang.fakeobjects,
            q = {
                'class': m,
                src: a.getUrl('images/spacer.gif'),
                _cke_realelement: encodeURIComponent(l.getOuterHtml()),
                _cke_real_node_type: l.type,
                alt: p[n] || p.unknown,
                align: l.getAttribute('align') || ''
            };
        if (n) q._cke_real_element_type = n;
        if (o) q._cke_resizable = o;
        return this.document.createElement('img', {
            attributes: q
        });
    };
    a.editor.prototype.createFakeParserElement = function (l, m, n, o) {
        var p = this.lang.fakeobjects,
            q, r = new a.htmlParser.basicWriter();
        l.writeHtml(r);
        q = r.getHtml();
        var s = {
            'class': m,
            src: a.getUrl('images/spacer.gif'),
            _cke_realelement: encodeURIComponent(q),
            _cke_real_node_type: l.type,
            alt: p[n] || p.unknown,
            align: l.attributes.align || ''
        };
        if (n) s._cke_real_element_type = n;
        if (o) s._cke_resizable = o;
        return new a.htmlParser.element('img', s);
    };
    a.editor.prototype.restoreRealElement = function (l) {
        if (l.getAttribute('_cke_real_node_type') != 1) return null;
        return h.createFromHtml(decodeURIComponent(l.getAttribute('_cke_realelement')), this.document);
    };
    j.add('richcombo', {
        requires: ['floatpanel', 'listblock', 'button'],
        beforeInit: function (l) {
            l.ui.addHandler(3, k.richCombo.handler);
        }
    });
    a.UI_RICHCOMBO = 3;
    k.richCombo = e.createClass({
        $: function (l) {
            var n = this;
            e.extend(n, l, {
                title: l.label,
                modes: {
                    wysiwyg: 1
                }
            });
            var m = n.panel || {};
            delete n.panel;
            n.id = e.getNextNumber();
            n.document = m && m.parent && m.parent.getDocument() || a.document;
            m.className = (m.className || '') + ' cke_rcombopanel';
            m.block = {
                multiSelect: m.multiSelect,
                attributes: m.attributes
            };
            n._ = {
                panelDefinition: m,
                items: {},
                state: 2
            };
        },
        statics: {
            handler: {
                create: function (l) {
                    return new k.richCombo(l);
                }
            }
        },
        proto: {
            renderHtml: function (l) {
                var m = [];
                this.render(l, m);
                return m.join('');
            },
            render: function (l, m) {
                var n = b,
                    o = 'cke_' + this.id,
                    p = e.addFunction(function (s) {
                        var v = this;
                        var t = v._;
                        if (t.state == 0) return;
                        v.createPanel(l);
                        if (t.on) {
                            t.panel.hide();
                            return;
                        }
                        if (!t.committed) {
                            t.list.commit();
                            t.committed = 1;
                        }
                        var u = v.getValue();
                        if (u) t.list.mark(u);
                        else t.list.unmarkAll();
                        t.panel.showBlock(v.id, new h(s), 4);
                    }, this),
                    q = {
                        id: o,
                        combo: this,
                        focus: function () {
                            var s = a.document.getById(o).getChild(1);
                            s.focus();
                        },
                        clickFn: p
                    };
                l.on('mode', function () {
                    this.setState(this.modes[l.mode] ? 2 : 0);
                }, this);
                var r = e.addFunction(function (s, t) {
                    s = new d.event(s);
                    var u = s.getKeystroke();
                    switch (u) {
                    case 13:
                    case 32:
                    case 40:
                        e.callFunction(p, t);
                        break;
                    default:
                        q.onkey(q, u);
                    }
                    s.preventDefault();
                });
                q.keyDownFn = r;
                m.push('<span class="cke_rcombo">', '<span id=', o);
                if (this.className) m.push(' class="', this.className, ' cke_off"');
                m.push('>', '<span id="' + o + '_label" class=cke_label>', this.label, '</span>', '<a hidefocus=true title="', this.title, '" tabindex="-1"', n.gecko && n.version >= 10900 && !n.hc ? '' : " href=\"javascript:void('" + this.label + "')\"", ' role="button" aria-labelledby="', o, '_label" aria-describedby="', o, '_text" aria-haspopup="true"');
                if (b.opera || b.gecko && b.mac) m.push(' onkeypress="return false;"');
                if (b.gecko) m.push(' onblur="this.style.cssText = this.style.cssText;"');
                m.push(' onkeydown="CKEDITOR.tools.callFunction( ', r, ', event, this );" onclick="CKEDITOR.tools.callFunction(', p, ', this); return false;"><span><span id="' + o + '_text" class="cke_text cke_inline_label">' + this.label + '</span>' + '</span>' + '<span class=cke_openbutton>' + (b.hc ? '<span>&#9660;</span>' : '') + '</span>' + '</a>' + '</span>' + '</span>');
                if (this.onRender) this.onRender();
                return q;
            },
            createPanel: function (l) {
                if (this._.panel) return;
                var m = this._.panelDefinition,
                    n = this._.panelDefinition.block,
                    o = m.parent || a.document.getBody(),
                    p = new k.floatPanel(l, o, m),
                    q = p.addListBlock(this.id, n),
                    r = this;
                p.onShow = function () {
                    if (r.className) this.element.getFirst().addClass(r.className + '_panel');
                    r.setState(1);
                    q.focus(!r.multiSelect && r.getValue());
                    r._.on = 1;
                    if (r.onOpen) r.onOpen();
                };
                p.onHide = function () {
                    if (r.className) this.element.getFirst().removeClass(r.className + '_panel');
                    r.setState(2);
                    r._.on = 0;
                    if (r.onClose) r.onClose();
                };
                p.onEscape = function () {
                    p.hide();
                    r.document.getById('cke_' + r.id).getFirst().getNext().focus();
                };
                q.onClick = function (s, t) {
                    r.document.getWindow().focus();
                    if (r.onClick) r.onClick.call(r, s, t);
                    if (t) r.setValue(s, r._.items[s]);
                    else r.setValue('');
                    p.hide();
                };
                this._.panel = p;
                this._.list = q;
                p.getBlock(this.id).onHide = function () {
                    r._.on = 0;
                    r.setState(2);
                };
                if (this.init) this.init();
            },
            setValue: function (l, m) {
                var o = this;
                o._.value = l;
                var n = o.document.getById('cke_' + o.id + '_text');
                if (!(l || m)) {
                    m = o.label;
                    n.addClass('cke_inline_label');
                } else n.removeClass('cke_inline_label');
                n.setHtml(typeof m != 'undefined' ? m : l);
            },
            getValue: function () {
                return this._.value || '';
            },
            unmarkAll: function () {
                this._.list.unmarkAll();
            },
            mark: function (l) {
                this._.list.mark(l);
            },
            hideItem: function (l) {
                this._.list.hideItem(l);
            },
            hideGroup: function (l) {
                this._.list.hideGroup(l);
            },
            showAll: function () {
                this._.list.showAll();
            },
            add: function (l, m, n) {
                this._.items[l] = n || l;
                this._.list.add(l, m, n);
            },
            startGroup: function (l) {
                this._.list.startGroup(l);
            },
            commit: function () {
                this._.list.commit();
            },
            setState: function (l) {
                var m = this;
                if (m._.state == l) return;
                m.document.getById('cke_' + m.id).setState(l);
                m._.state = l;
            }
        }
    });
    k.prototype.addRichCombo = function (l, m) {
        this.add(l, 3, m);
    };
    j.add('htmlwriter');
    a.htmlWriter = e.createClass({
        base: a.htmlParser.basicWriter,
        $: function () {
            var n = this;
            n.base();
            n.indentationChars = '\t';
            n.selfClosingEnd = ' />';
            n.lineBreakChars = '\n';
            n.forceSimpleAmpersand = false;
            n.sortAttributes = true;
            n._.indent = false;
            n._.indentation = '';
            n._.rules = {};
            var l = f;
            for (var m in e.extend({}, l.$nonBodyContent, l.$block, l.$listItem, l.$tableContent)) n.setRules(m, {
                indent: true,
                breakBeforeOpen: true,
                breakAfterOpen: true,
                breakBeforeClose: !l[m]['#'],
                breakAfterClose: true
            });
            n.setRules('br', {
                breakAfterOpen: true
            });
            n.setRules('title', {
                indent: false,
                breakAfterOpen: false
            });
            n.setRules('style', {
                indent: false,
                breakBeforeClose: true
            });
            n.setRules('pre', {
                indent: false
            });
        },
        proto: {
            openTag: function (l, m) {
                var o = this;
                var n = o._.rules[l];
                if (o._.indent) o.indentation();
                else if (n && n.breakBeforeOpen) {
                    o.lineBreak();
                    o.indentation();
                }
                o._.output.push('<', l);
            },
            openTagClose: function (l, m) {
                var o = this;
                var n = o._.rules[l];
                if (m) o._.output.push(o.selfClosingEnd);
                else {
                    o._.output.push('>');
                    if (n && n.indent) o._.indentation += o.indentationChars;
                }
                if (n && n.breakAfterOpen) o.lineBreak();
            },
            attribute: function (l, m) {
                if (typeof m == 'string') {
                    this.forceSimpleAmpersand && (m = m.replace(/&amp;/g, '&'));
                    m = e.htmlEncodeAttr(m);
                }
                this._.output.push(' ', l, '="', m, '"');
            },
            closeTag: function (l) {
                var n = this;
                var m = n._.rules[l];
                if (m && m.indent) n._.indentation = n._.indentation.substr(n.indentationChars.length);
                if (n._.indent) n.indentation();
                else if (m && m.breakBeforeClose) {
                    n.lineBreak();
                    n.indentation();
                }
                n._.output.push('</', l, '>');
                if (m && m.breakAfterClose) n.lineBreak();
            },
            text: function (l) {
                if (this._.indent) {
                    this.indentation();
                    l = e.ltrim(l);
                }
                this._.output.push(l);
            },
            comment: function (l) {
                if (this._.indent) this.indentation();
                this._.output.push('<!--', l, '-->');
            },
            lineBreak: function () {
                var l = this;
                if (l._.output.length > 0) l._.output.push(l.lineBreakChars);
                l._.indent = true;
            },
            indentation: function () {
                this._.output.push(this._.indentation);
                this._.indent = false;
            },
            setRules: function (l, m) {
                var n = this._.rules[l];
                if (n) e.extend(n, m, true);
                else this._.rules[l] = m;
            }
        }
    });
    j.add('menubutton', {
        requires: ['button', 'contextmenu'],
        beforeInit: function (l) {
            l.ui.addHandler(5, k.menuButton.handler);
        }
    });
    a.UI_MENUBUTTON = 5;
    (function () {
        var l = function (m) {
                var n = this._;
                if (n.state === 0) return;
                n.previousState = n.state;
                var o = n.menu;
                if (!o) {
                    o = n.menu = new j.contextMenu(m);
                    o.definition.panel.attributes['aria-label'] = m.lang.common.options;
                    o.onHide = e.bind(function () {
                        this.setState(n.previousState);
                    }, this);
                    if (this.onMenu) o.addListener(this.onMenu);
                }
                if (n.on) {
                    o.hide();
                    return;
                }
                this.setState(1);
                o.show(a.document.getById(this._.id), 4);
            };
        k.menuButton = e.createClass({
            base: k.button,
            $: function (m) {
                var n = m.panel;
                delete m.panel;
                this.base(m);
                this.hasArrow = true;
                this.click = l;
            },
            statics: {
                handler: {
                    create: function (m) {
                        return new k.menuButton(m);
                    }
                }
            }
        });
    })();
    j.add('dialogui');
    (function () {
        var l = function (t) {
                var w = this;
                w._ || (w._ = {});
                w._['default'] = w._.initValue = t['default'] || '';
                w._.required = t.required || false;
                var u = [w._];
                for (var v = 1; v < arguments.length; v++) u.push(arguments[v]);
                u.push(true);
                e.extend.apply(e, u);
                return w._;
            },
            m = {
                build: function (t, u, v) {
                    return new k.dialog.textInput(t, u, v);
                }
            },
            n = {
                build: function (t, u, v) {
                    return new k.dialog[u.type](t, u, v);
                }
            },
            o = {
                build: function (t, u, v) {
                    var w = u.children,
                        x, y = [],
                        z = [];
                    for (var A = 0; A < w.length && (x = w[A]); A++) {
                        var B = [];
                        y.push(B);
                        z.push(a.dialog._.uiElementBuilders[x.type].build(t, x, B));
                    }
                    return new k.dialog[u.type](t, z, y, v, u);
                }
            },
            p = {
                isChanged: function () {
                    return this.getValue() != this.getInitValue();
                },
                reset: function () {
                    this.setValue(this.getInitValue());
                },
                setInitValue: function () {
                    this._.initValue = this.getValue();
                },
                resetInitValue: function () {
                    this._.initValue = this._['default'];
                },
                getInitValue: function () {
                    return this._.initValue;
                }
            },
            q = e.extend({}, k.dialog.uiElement.prototype.eventProcessors, {
                onChange: function (t, u) {
                    if (!this._.domOnChangeRegistered) {
                        t.on('load', function () {
                            this.getInputElement().on('change', function () {
                                if (!t.parts.dialog.isVisible()) return;
                                this.fire('change', {
                                    value: this.getValue()
                                });
                            }, this);
                        }, this);
                        this._.domOnChangeRegistered = true;
                    }
                    this.on('change', u);
                }
            }, true),
            r = /^on([A-Z]\w+)/,
            s = function (t) {
                for (var u in t) {
                    if (r.test(u) || u == 'title' || u == 'type') delete t[u];
                }
                return t;
            };
        e.extend(k.dialog, {
            labeledElement: function (t, u, v, w) {
                if (arguments.length < 4) return;
                var x = l.call(this, u);
                x.labelId = e.getNextNumber() + '_label';
                var y = this._.children = [],
                    z = function () {
                        var A = [];
                        if (u.labelLayout != 'horizontal') A.push('<label class="cke_dialog_ui_labeled_label" ', ' id="' + x.labelId + '"', ' for="' + x.inputId + '"', ' style="' + u.labelStyle + '">', u.label, '</label>', '<div class="cke_dialog_ui_labeled_content" role="presentation">', w.call(this, t, u), '</div>');
                        else {
                            var B = {
                                type: 'hbox',
                                widths: u.widths,
                                padding: 0,
                                children: [{
                                    type: 'html',
                                    html: '<label class="cke_dialog_ui_labeled_label" id="' + x.labelId + '"' + ' for="' + x.inputId + '"' + ' style="' + u.labelStyle + '">' + e.htmlEncode(u.label) + '</span>'
                                }, {
                                    type: 'html',
                                    html: '<span class="cke_dialog_ui_labeled_content">' + w.call(this, t, u) + '</span>'
                                }]
                            };
                            a.dialog._.uiElementBuilders.hbox.build(t, B, A);
                        }
                        return A.join('');
                    };
                k.dialog.uiElement.call(this, t, u, v, 'div', null, {
                    role: 'presentation'
                }, z);
            },
            textInput: function (t, u, v) {
                if (arguments.length < 3) return;
                l.call(this, u);
                var w = this._.inputId = e.getNextNumber() + '_textInput',
                    x = {
                        'class': 'cke_dialog_ui_input_' + u.type,
                        id: w,
                        type: 'text'
                    },
                    y;
                if (u.validate) this.validate = u.validate;
                if (u.maxLength) x.maxlength = u.maxLength;
                if (u.size) x.size = u.size;
                var z = this,
                    A = false;
                t.on('load', function () {
                    z.getInputElement().on('keydown', function (C) {
                        if (C.data.getKeystroke() == 13) A = true;
                    });
                    z.getInputElement().on('keyup', function (C) {
                        if (C.data.getKeystroke() == 13 && A) {
                            t.getButton('ok') && setTimeout(function () {
                                t.getButton('ok').click();
                            }, 0);
                            A = false;
                        }
                    }, null, null, 1000);
                });
                var B = function () {
                        var C = ['<div class="cke_dialog_ui_input_', u.type, '" role="presentation"'];
                        if (u.width) C.push('style="width:' + u.width + '" ');
                        C.push('><input ');
                        x['aria-labelledby'] = this._.labelId;
                        this._.required && (x['aria-required'] = this._.required);
                        for (var D in x) C.push(D + '="' + x[D] + '" ');
                        C.push(' /></div>');
                        return C.join('');
                    };
                k.dialog.labeledElement.call(this, t, u, v, B);
            },
            textarea: function (t, u, v) {
                if (arguments.length < 3) return;
                l.call(this, u);
                var w = this,
                    x = this._.inputId = e.getNextNumber() + '_textarea',
                    y = {};
                if (u.validate) this.validate = u.validate;
                y.rows = u.rows || 5;
                y.cols = u.cols || 20;
                var z = function () {
                        y['aria-labelledby'] = this._.labelId;
                        this._.required && (y['aria-required'] = this._.required);
                        var A = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea class="cke_dialog_ui_input_textarea" id="', x, '" '];
                        for (var B in y) A.push(B + '="' + e.htmlEncode(y[B]) + '" ');
                        A.push('>', e.htmlEncode(w._['default']), '</textarea></div>');
                        return A.join('');
                    };
                k.dialog.labeledElement.call(this, t, u, v, z);
            },
            checkbox: function (t, u, v) {
                if (arguments.length < 3) return;
                var w = l.call(this, u, {
                    'default': !! u['default']
                });
                if (u.validate) this.validate = u.validate;
                var x = function () {
                        var y = e.extend({}, u, {
                            id: u.id ? u.id + '_checkbox' : e.getNextNumber() + '_checkbox'
                        }, true),
                            z = [],
                            A = e.getNextNumber() + '_label',
                            B = {
                                'class': 'cke_dialog_ui_checkbox_input',
                                type: 'checkbox',
                                'aria-labelledby': A
                            };
                        s(y);
                        if (u['default']) B.checked = 'checked';
                        w.checkbox = new k.dialog.uiElement(t, y, z, 'input', null, B);
                        z.push(' <label id="', A, '" for="', B.id, '">', e.htmlEncode(u.label), '</label>');
                        return z.join('');
                    };
                k.dialog.uiElement.call(this, t, u, v, 'span', null, null, x);
            },
            radio: function (t, u, v) {
                if (arguments.length < 3) return;
                l.call(this, u);
                if (!this._['default']) this._['default'] = this._.initValue = u.items[0][1];
                if (u.validate) this.validate = u.valdiate;
                var w = [],
                    x = this,
                    y = function () {
                        var z = [],
                            A = [],
                            B = {
                                'class': 'cke_dialog_ui_radio_item',
                                'aria-labelledby': this._.labelId
                            },
                            C = u.id ? u.id + '_radio' : e.getNextNumber() + '_radio';
                        for (var D = 0; D < u.items.length; D++) {
                            var E = u.items[D],
                                F = E[2] !== undefined ? E[2] : E[0],
                                G = E[1] !== undefined ? E[1] : E[0],
                                H = e.getNextNumber() + '_radio_input',
                                I = H + '_label',
                                J = e.extend({}, u, {
                                    id: H,
                                    title: null,
                                    type: null
                                }, true),
                                K = e.extend({}, J, {
                                    title: F
                                }, true),
                                L = {
                                    type: 'radio',
                                    'class': 'cke_dialog_ui_radio_input',
                                    name: C,
                                    value: G,
                                    'aria-labelledby': I
                                },
                                M = [];
                            if (x._['default'] == G) L.checked = 'checked';
                            s(J);
                            s(K);
                            w.push(new k.dialog.uiElement(t, J, M, 'input', null, L));
                            M.push(' ');
                            new k.dialog.uiElement(t, K, M, 'label', null, {
                                id: I,
                                'for': L.id
                            }, E[0]);
                            z.push(M.join(''));
                        }
                        new k.dialog.hbox(t, [], z, A);
                        return A.join('');
                    };
                k.dialog.labeledElement.call(this, t, u, v, y);
                this._.children = w;
            },
            button: function (t, u, v) {
                if (!arguments.length) return;
                if (typeof u == 'function') u = u(t.getParentEditor());
                l.call(this, u, {
                    disabled: u.disabled || false
                });
                a.event.implementOn(this);
                var w = this;
                t.on('load', function (z) {
                    var A = this.getElement();
                    (function () {
                        A.on('click', function (B) {
                            w.fire('click', {
                                dialog: w.getDialog()
                            });
                            B.data.preventDefault();
                        });
                        A.on('keydown', function (B) {
                            if (B.data.getKeystroke() in {
                                32: 1
                            }) {
                                w.click();
                                B.data.preventDefault();
                            }
                        });
                    })();
                    A.unselectable();
                }, this);
                var x = e.extend({}, u);
                delete x.style;
                var y = e.getNextNumber() + '_label';
                k.dialog.uiElement.call(this, t, x, v, 'a', null, {
                    style: u.style,
                    href: 'javascript:void(0)',
                    title: u.label,
                    hidefocus: 'true',
                    'class': u['class'],
                    role: 'button',
                    'aria-labelledby': y
                }, '<span id="' + y + '" class="cke_dialog_ui_button">' + e.htmlEncode(u.label) + '</span>');
            },
            select: function (t, u, v) {
                if (arguments.length < 3) return;
                var w = l.call(this, u);
                if (u.validate) this.validate = u.validate;
                w.inputId = e.getNextNumber() + '_select';
                var x = function () {
                        var y = e.extend({}, u, {
                            id: u.id ? u.id + '_select' : e.getNextNumber() + '_select'
                        }, true),
                            z = [],
                            A = [],
                            B = {
                                id: w.inputId,
                                'class': 'cke_dialog_ui_input_select',
                                'aria-labelledby': this._.labelId
                            };
                        if (u.size != undefined) B.size = u.size;
                        if (u.multiple != undefined) B.multiple = u.multiple;
                        s(y);
                        for (var C = 0, D; C < u.items.length && (D = u.items[C]); C++) A.push('<option value="', e.htmlEncode(D[1] !== undefined ? D[1] : D[0]), '" /> ', e.htmlEncode(D[0]));
                        w.select = new k.dialog.uiElement(t, y, z, 'select', null, B, A.join(''));
                        return z.join('');
                    };
                k.dialog.labeledElement.call(this, t, u, v, x);
            },
            file: function (t, u, v) {
                if (arguments.length < 3) return;
                if (u['default'] === undefined) u['default'] = '';
                var w = e.extend(l.call(this, u), {
                    definition: u,
                    buttons: []
                });
                if (u.validate) this.validate = u.validate;
                var x = function () {
                        w.frameId = e.getNextNumber() + '_fileInput';
                        var y = b.isCustomDomain(),
                            z = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" id="', w.frameId, '" title="', u.label, '" src="javascript:void('];
                        z.push(y ? "(function(){document.open();document.domain='" + document.domain + "';" + 'document.close();' + '})()' : '0');
                        z.push(')"></iframe>');
                        return z.join('');
                    };
                t.on('load', function () {
                    var y = a.document.getById(w.frameId),
                        z = y.getParent();
                    z.addClass('cke_dialog_ui_input_file');
                });
                k.dialog.labeledElement.call(this, t, u, v, x);
            },
            fileButton: function (t, u, v) {
                if (arguments.length < 3) return;
                var w = l.call(this, u),
                    x = this;
                if (u.validate) this.validate = u.validate;
                var y = e.extend({}, u),
                    z = y.onClick;
                y.className = (y.className ? y.className + ' ' : '') + 'cke_dialog_ui_button';
                y.onClick = function (A) {
                    var B = u['for'];
                    if (!z || z.call(this, A) !== false) {
                        t.getContentElement(B[0], B[1]).submit();
                        this.disable();
                    }
                };
                t.on('load', function () {
                    t.getContentElement(u['for'][0], u['for'][1])._.buttons.push(x);
                });
                k.dialog.button.call(this, t, y, v);
            },
            html: (function () {
                var t = /^\s*<[\w:]+\s+([^>]*)?>/,
                    u = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
                    v = /\/$/;
                return function (w, x, y) {
                    if (arguments.length < 3) return;
                    var z = [],
                        A, B = x.html,
                        C, D;
                    if (B.charAt(0) != '<') B = '<span>' + B + '</span>';
                    var E = x.focus;
                    if (E) {
                        var F = this.focus;
                        this.focus = function () {
                            F.call(this);
                            typeof E == 'function' && E.call(this);
                            this.fire('focus');
                        };
                        if (x.isFocusable) {
                            var G = this.isFocusable;
                            this.isFocusable = G;
                        }
                        this.keyboardFocusable = true;
                    }
                    k.dialog.uiElement.call(this, w, x, z, 'span', null, null, '');
                    A = z.join('');
                    C = A.match(t);
                    D = B.match(u) || ['', '', ''];
                    if (v.test(D[1])) {
                        D[1] = D[1].slice(0, -1);
                        D[2] = '/' + D[2];
                    }
                    y.push([D[1], ' ', C[1] || '', D[2]].join(''));
                };
            })(),
            fieldset: function (t, u, v, w, x) {
                var y = x.label,
                    z = function () {
                        var A = [];
                        y && A.push('<legend>' + y + '</legend>');
                        for (var B = 0; B < v.length; B++) A.push(v[B]);
                        return A.join('');
                    };
                this._ = {
                    children: u
                };
                k.dialog.uiElement.call(this, t, x, w, 'fieldset', null, null, z);
            }
        }, true);
        k.dialog.html.prototype = new k.dialog.uiElement();
        k.dialog.labeledElement.prototype = e.extend(new k.dialog.uiElement(), {
            setLabel: function (t) {
                var u = a.document.getById(this._.labelId);
                if (u.getChildCount() < 1) new d.text(t, a.document).appendTo(u);
                else u.getChild(0).$.nodeValue = t;
                return this;
            },
            getLabel: function () {
                var t = a.document.getById(this._.labelId);
                if (!t || t.getChildCount() < 1) return '';
                else return t.getChild(0).getText();
            },
            eventProcessors: q
        }, true);
        k.dialog.button.prototype = e.extend(new k.dialog.uiElement(), {
            click: function () {
                var t = this;
                if (!t._.disabled) return t.fire('click', {
                    dialog: t._.dialog
                });
                t.getElement().$.blur();
                return false;
            },
            enable: function () {
                this._.disabled = false;
                var t = this.getElement();
                t && t.removeClass('disabled');
            },
            disable: function () {
                this._.disabled = true;
                this.getElement().addClass('disabled');
            },
            isVisible: function () {
                return this.getElement().getFirst().isVisible();
            },
            isEnabled: function () {
                return !this._.disabled;
            },
            eventProcessors: e.extend({}, k.dialog.uiElement.prototype.eventProcessors, {
                onClick: function (t, u) {
                    this.on('click', u);
                }
            }, true),
            accessKeyUp: function () {
                this.click();
            },
            accessKeyDown: function () {
                this.focus();
            },
            keyboardFocusable: true
        }, true);
        k.dialog.textInput.prototype = e.extend(new k.dialog.labeledElement(), {
            getInputElement: function () {
                return a.document.getById(this._.inputId);
            },
            focus: function () {
                var t = this.selectParentTab();
                setTimeout(function () {
                    var u = t.getInputElement();
                    u && u.$.focus();
                }, 0);
            },
            select: function () {
                var t = this.selectParentTab();
                setTimeout(function () {
                    var u = t.getInputElement();
                    if (u) {
                        u.$.focus();
                        u.$.select();
                    }
                }, 0);
            },
            accessKeyUp: function () {
                this.select();
            },
            setValue: function (t) {
                !t && (t = '');
                return k.dialog.uiElement.prototype.setValue.call(this, t);
            },
            keyboardFocusable: true
        }, p, true);
        k.dialog.textarea.prototype = new k.dialog.textInput();
        k.dialog.select.prototype = e.extend(new k.dialog.labeledElement(), {
            getInputElement: function () {
                return this._.select.getElement();
            },
            add: function (t, u, v) {
                var w = new h('option', this.getDialog().getParentEditor().document),
                    x = this.getInputElement().$;
                w.$.text = t;
                w.$.value = u === undefined || u === null ? t : u;
                if (v === undefined || v === null) {
                    if (c) x.add(w.$);
                    else x.add(w.$, null);
                } else x.add(w.$, v);
                return this;
            },
            remove: function (t) {
                var u = this.getInputElement().$;
                u.remove(t);
                return this;
            },
            clear: function () {
                var t = this.getInputElement().$;
                while (t.length > 0) t.remove(0);
                return this;
            },
            keyboardFocusable: true
        }, p, true);
        k.dialog.checkbox.prototype = e.extend(new k.dialog.uiElement(), {
            getInputElement: function () {
                return this._.checkbox.getElement();
            },
            setValue: function (t) {
                this.getInputElement().$.checked = t;
                this.fire('change', {
                    value: t
                });
            },
            getValue: function () {
                return this.getInputElement().$.checked;
            },
            accessKeyUp: function () {
                this.setValue(!this.getValue());
            },
            eventProcessors: {
                onChange: function (t, u) {
                    if (!c) return q.onChange.apply(this, arguments);
                    else {
                        t.on('load', function () {
                            var v = this._.checkbox.getElement();
                            v.on('propertychange', function (w) {
                                w = w.data.$;
                                if (w.propertyName == 'checked') this.fire('change', {
                                    value: v.$.checked
                                });
                            }, this);
                        }, this);
                        this.on('change', u);
                    }
                    return null;
                }
            },
            keyboardFocusable: true
        }, p, true);
        k.dialog.radio.prototype = e.extend(new k.dialog.uiElement(), {
            setValue: function (t) {
                var u = this._.children,
                    v;
                for (var w = 0; w < u.length && (v = u[w]); w++) v.getElement().$.checked = v.getValue() == t;
                this.fire('change', {
                    value: t
                });
            },
            getValue: function () {
                var t = this._.children;
                for (var u = 0; u < t.length; u++) {
                    if (t[u].getElement().$.checked) return t[u].getValue();
                }
                return null;
            },
            accessKeyUp: function () {
                var t = this._.children,
                    u;
                for (u = 0; u < t.length; u++) {
                    if (t[u].getElement().$.checked) {
                        t[u].getElement().focus();
                        return;
                    }
                }
                t[0].getElement().focus();
            },
            eventProcessors: {
                onChange: function (t, u) {
                    if (!c) return q.onChange.apply(this, arguments);
                    else {
                        t.on('load', function () {
                            var v = this._.children,
                                w = this;
                            for (var x = 0; x < v.length; x++) {
                                var y = v[x].getElement();
                                y.on('propertychange', function (z) {
                                    z = z.data.$;
                                    if (z.propertyName == 'checked' && this.$.checked) w.fire('change', {
                                        value: this.getAttribute('value')
                                    });
                                });
                            }
                        }, this);
                        this.on('change', u);
                    }
                    return null;
                }
            },
            keyboardFocusable: true
        }, p, true);
        k.dialog.file.prototype = e.extend(new k.dialog.labeledElement(), p, {
            getInputElement: function () {
                var t = a.document.getById(this._.frameId).getFrameDocument();
                return t.$.forms.length > 0 ? new h(t.$.forms[0].elements[0]) : this.getElement();
            },
            submit: function () {
                this.getInputElement().getParent().$.submit();
                return this;
            },
            getAction: function (t) {
                return this.getInputElement().getParent().$.action;
            },
            reset: function () {
                var t = a.document.getById(this._.frameId),
                    u = t.getFrameDocument(),
                    v = this._.definition,
                    w = this._.buttons;

                function x() {
                    u.$.open();
                    if (b.isCustomDomain()) u.$.domain = document.domain;
                    var y = '';
                    if (v.size) y = v.size - (c ? 7 : 0);
                    u.$.write(['<html><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" action="', e.htmlEncode(v.action), '">', '<input type="file" name="', e.htmlEncode(v.id || 'cke_upload'), '" size="', e.htmlEncode(y > 0 ? y : ''), '" />', '</form>', '</body></html>'].join(''));
                    u.$.close();
                    for (var z = 0; z < w.length; z++) w[z].enable();
                };
                if (b.gecko) setTimeout(x, 500);
                else x();
            },
            getValue: function () {
                return '';
            },
            eventProcessors: q,
            keyboardFocusable: true
        }, true);
        k.dialog.fileButton.prototype = new k.dialog.button();
        k.dialog.fieldset.prototype = e.clone(k.dialog.hbox.prototype);
        a.dialog.addUIElement('text', m);
        a.dialog.addUIElement('password', m);
        a.dialog.addUIElement('textarea', n);
        a.dialog.addUIElement('checkbox', n);
        a.dialog.addUIElement('radio', n);
        a.dialog.addUIElement('button', n);
        a.dialog.addUIElement('select', n);
        a.dialog.addUIElement('file', n);
        a.dialog.addUIElement('fileButton', n);
        a.dialog.addUIElement('html', n);
        a.dialog.addUIElement('fieldset', o);
    })();
    j.add('panel', {
        beforeInit: function (l) {
            l.ui.addHandler(2, k.panel.handler);
        }
    });
    a.UI_PANEL = 2;
    k.panel = function (l, m) {
        var n = this;
        if (m) e.extend(n, m);
        e.extend(n, {
            className: '',
            css: []
        });
        n.id = e.getNextNumber();
        n.document = l;
        n._ = {
            blocks: {}
        };
    };
    k.panel.handler = {
        create: function (l) {
            return new k.panel(l);
        }
    };
    k.panel.prototype = {
        renderHtml: function (l) {
            var m = [];
            this.render(l, m);
            return m.join('');
        },
        render: function (l, m) {
            var o = this;
            var n = 'cke_' + o.id;
            m.push('<div class="', l.skinClass, '" lang="', l.langCode, '" role="presentation" style="display:none;z-index:' + (l.config.baseFloatZIndex + 1) + '">' + '<div' + ' id=', n, ' dir=', l.lang.dir, ' role="presentation" class="cke_panel cke_', l.lang.dir);
            if (o.className) m.push(' ', o.className);
            m.push('">');
            if (o.forceIFrame || o.css.length) {
                m.push('<iframe id="', n, '_frame" frameborder="0" role="application" src="javascript:void(');
                m.push(b.isCustomDomain() ? "(function(){document.open();document.domain='" + document.domain + "';" + 'document.close();' + '})()' : '0');
                m.push(')"></iframe>');
            }
            m.push('</div></div>');
            return n;
        },
        getHolderElement: function () {
            var l = this._.holder;
            if (!l) {
                if (this.forceIFrame || this.css.length) {
                    var m = this.document.getById('cke_' + this.id + '_frame'),
                        n = m.getParent(),
                        o = n.getAttribute('dir'),
                        p = n.getParent().getAttribute('class'),
                        q = n.getParent().getAttribute('lang'),
                        r = m.getFrameDocument();
                    r.$.open();
                    if (b.isCustomDomain()) r.$.domain = document.domain;
                    var s = e.addFunction(e.bind(function (u) {
                        this.isLoaded = true;
                        if (this.onLoad) this.onLoad();
                    }, this));
                    r.$.write('<!DOCTYPE html><html dir="' + o + '" class="' + p + '_container" lang="' + q + '">' + '<head>' + '<style>.' + p + '_container{visibility:hidden}</style>' + '</head>' + '<body class="cke_' + o + ' cke_panel_frame ' + b.cssClass + '" style="margin:0;padding:0"' + ' onload="( window.CKEDITOR || window.parent.CKEDITOR ).tools.callFunction(' + s + ');"></body>' + e.buildStyleHtml(this.css) + '</html>');
                    r.$.close();
                    var t = r.getWindow();
                    t.$.CKEDITOR = a;
                    r.on('keydown', function (u) {
                        var x = this;
                        var v = u.data.getKeystroke(),
                            w = x.document.getById('cke_' + x.id).getAttribute('dir');
                        if (x._.onKeyDown && x._.onKeyDown(v) === false) {
                            u.data.preventDefault();
                            return;
                        }
                        if (v == 27 || v == (w == 'rtl' ? 39 : 37)) if (x.onEscape && x.onEscape(v) === false) u.data.preventDefault();
                    }, this);
                    l = r.getBody();
                } else l = this.document.getById('cke_' + this.id);
                this._.holder = l;
            }
            return l;
        },
        addBlock: function (l, m) {
            var n = this;
            m = n._.blocks[l] = m instanceof k.panel.block ? m : new k.panel.block(n.getHolderElement(), m);
            if (!n._.currentBlock) n.showBlock(l);
            return m;
        },
        getBlock: function (l) {
            return this._.blocks[l];
        },
        showBlock: function (l) {
            var m = this._.blocks,
                n = m[l],
                o = this._.currentBlock,
                p = this.forceIFrame ? this.document.getById('cke_' + this.id + '_frame') : this._.holder;
            p.getParent().getParent().disableContextMenu();
            if (o) {
                p.removeAttributes(o.attributes);
                o.hide();
            }
            this._.currentBlock = n;
            p.setAttributes(n.attributes);
            a.fire('ariaWidget', p);
            n._.focusIndex = -1;
            this._.onKeyDown = n.onKeyDown && e.bind(n.onKeyDown, n);
            n.onMark = function (q) {
                p.setAttribute('aria-activedescendant', q.getId() + '_option');
            };
            n.onUnmark = function () {
                p.removeAttribute('aria-activedescendant');
            };
            n.show();
            return n;
        },
        destroy: function () {
            this.element && this.element.remove();
        }
    };
    k.panel.block = e.createClass({
        $: function (l, m) {
            var n = this;
            n.element = l.append(l.getDocument().createElement('div', {
                attributes: {
                    tabIndex: -1,
                    'class': 'cke_panel_block',
                    role: 'presentation'
                },
                styles: {
                    display: 'none'
                }
            }));
            if (m) e.extend(n, m);
            if (!n.attributes.title) n.attributes.title = n.attributes['aria-label'];
            n.keys = {};
            n._.focusIndex = -1;
            n.element.disableContextMenu();
        },
        _: {
            markItem: function (l) {
                var o = this;
                if (l == -1) return;
                var m = o.element.getElementsByTag('a'),
                    n = m.getItem(o._.focusIndex = l);
                if (b.webkit) n.getDocument().getWindow().focus();
                n.focus();
                o.onMark && o.onMark(n);
            }
        },
        proto: {
            show: function () {
                this.element.setStyle('display', '');
            },
            hide: function () {
                var l = this;
                if (!l.onHide || l.onHide.call(l) !== true) l.element.setStyle('display', 'none');
            },
            onKeyDown: function (l) {
                var q = this;
                var m = q.keys[l];
                switch (m) {
                case 'next':
                    var n = q._.focusIndex,
                        o = q.element.getElementsByTag('a'),
                        p;
                    while (p = o.getItem(++n)) {
                        if (p.getAttribute('_cke_focus') && p.$.offsetWidth) {
                            q._.focusIndex = n;
                            p.focus();
                            break;
                        }
                    }
                    return false;
                case 'prev':
                    n = q._.focusIndex;
                    o = q.element.getElementsByTag('a');
                    while (n > 0 && (p = o.getItem(--n))) {
                        if (p.getAttribute('_cke_focus') && p.$.offsetWidth) {
                            q._.focusIndex = n;
                            p.focus();
                            break;
                        }
                    }
                    return false;
                case 'click':
                    n = q._.focusIndex;
                    p = n >= 0 && q.element.getElementsByTag('a').getItem(n);
                    if (p) p.$.click ? p.$.click() : p.$.onclick();
                    return false;
                }
                return true;
            }
        }
    });
    j.add('listblock', {
        requires: ['panel'],
        onLoad: function () {
            k.panel.prototype.addListBlock = function (l, m) {
                return this.addBlock(l, new k.listBlock(this.getHolderElement(), m));
            };
            k.listBlock = e.createClass({
                base: k.panel.block,
                $: function (l, m) {
                    var p = this;
                    m = m || {};
                    var n = m.attributes || (m.attributes = {});
                    (p.multiSelect = !! m.multiSelect) && (n['aria-multiselectable'] = true);
                    !n.role && (n.role = 'listbox');
                    p.base.apply(p, arguments);
                    var o = p.keys;
                    o[40] = 'next';
                    o[9] = 'next';
                    o[38] = 'prev';
                    o[2000 + 9] = 'prev';
                    o[32] = 'click';
                    p._.pendingHtml = [];
                    p._.items = {};
                    p._.groups = {};
                },
                _: {
                    close: function () {
                        if (this._.started) {
                            this._.pendingHtml.push('</ul>');
                            delete this._.started;
                        }
                    },
                    getClick: function () {
                        if (!this._.click) this._.click = e.addFunction(function (l) {
                            var n = this;
                            var m = true;
                            if (n.multiSelect) m = n.toggle(l);
                            else n.mark(l);
                            if (n.onClick) n.onClick(l, m);
                        }, this);
                        return this._.click;
                    }
                },
                proto: {
                    add: function (l, m, n) {
                        var q = this;
                        var o = q._.pendingHtml,
                            p = 'cke_' + e.getNextNumber();
                        if (!q._.started) {
                            o.push('<ul role="presentation" class=cke_panel_list>');
                            q._.started = 1;
                            q._.size = q._.size || 0;
                        }
                        q._.items[l] = p;
                        o.push('<li id=', p, ' class=cke_panel_listItem><a id="', p, '_option" _cke_focus=1 hidefocus=true title="', n || l, '" href="javascript:void(\'', l, '\')" onclick="CKEDITOR.tools.callFunction(', q._.getClick(), ",'", l, "'); return false;\"", ' role="option" aria-posinset="' + ++q._.size + '">', m || l, '</a></li>');
                    },
                    startGroup: function (l) {
                        this._.close();
                        var m = 'cke_' + e.getNextNumber();
                        this._.groups[l] = m;
                        this._.pendingHtml.push('<h1 role="presentation" id=', m, ' class=cke_panel_grouptitle>', l, '</h1>');
                    },
                    commit: function () {
                        var o = this;
                        o._.close();
                        o.element.appendHtml(o._.pendingHtml.join(''));
                        var l = o._.items,
                            m = o.element.getDocument();
                        for (var n in l) m.getById(l[n] + '_option').setAttribute('aria-setsize', o._.size);
                        delete o._.size;
                        o._.pendingHtml = [];
                    },
                    toggle: function (l) {
                        var m = this.isMarked(l);
                        if (m) this.unmark(l);
                        else this.mark(l);
                        return !m;
                    },
                    hideGroup: function (l) {
                        var m = this.element.getDocument().getById(this._.groups[l]),
                            n = m && m.getNext();
                        if (m) {
                            m.setStyle('display', 'none');
                            if (n && n.getName() == 'ul') n.setStyle('display', 'none');
                        }
                    },
                    hideItem: function (l) {
                        this.element.getDocument().getById(this._.items[l]).setStyle('display', 'none');
                    },
                    showAll: function () {
                        var l = this._.items,
                            m = this._.groups,
                            n = this.element.getDocument();
                        for (var o in l) n.getById(l[o]).setStyle('display', '');
                        for (var p in m) {
                            var q = n.getById(m[p]),
                                r = q.getNext();
                            q.setStyle('display', '');
                            if (r && r.getName() == 'ul') r.setStyle('display', '');
                        }
                    },
                    mark: function (l) {
                        var o = this;
                        if (!o.multiSelect) o.unmarkAll();
                        var m = o._.items[l],
                            n = o.element.getDocument().getById(m);
                        n.addClass('cke_selected');
                        o.element.getDocument().getById(m + '_option').setAttribute('aria-selected', true);
                        o.element.setAttribute('aria-activedescendant', m + '_option');
                        o.onMark && o.onMark(n);
                    },
                    unmark: function (l) {
                        var m = this;
                        m.element.getDocument().getById(m._.items[l]).removeClass('cke_selected');
                        m.onUnmark && m.onUnmark(m._.items[l]);
                    },
                    unmarkAll: function () {
                        var o = this;
                        var l = o._.items,
                            m = o.element.getDocument();
                        for (var n in l) m.getById(l[n]).removeClass('cke_selected');
                        o.onUnmark && o.onUnmark();
                    },
                    isMarked: function (l) {
                        return this.element.getDocument().getById(this._.items[l]).hasClass('cke_selected');
                    },
                    focus: function (l) {
                        this._.focusIndex = -1;
                        if (l) {
                            var m = this.element.getDocument().getById(this._.items[l]).getFirst(),
                                n = this.element.getElementsByTag('a'),
                                o, p = -1;
                            while (o = n.getItem(++p)) {
                                if (o.equals(m)) {
                                    this._.focusIndex = p;
                                    break;
                                }
                            }
                            setTimeout(function () {
                                m.focus();
                            }, 0);
                        }
                    }
                }
            });
        }
    });
    a.themes.add('default', (function () {
        function l(m, n) {
            var o, p;
            p = m.config.sharedSpaces;
            p = p && p[n];
            p = p && a.document.getById(p);
            if (p) {
                var q = '<span class="cke_shared"><span class="' + m.skinClass + ' cke_editor_' + m.name + '">' + '<span class="' + b.cssClass + '">' + '<span class="cke_wrapper cke_' + m.lang.dir + '">' + '<span class="cke_editor">' + '<div class="cke_' + n + '">' + '</div></span></span></span></span></span>',
                    r = p.append(h.createFromHtml(q, p.getDocument()));
                if (p.getCustomData('cke_hasshared')) r.hide();
                else p.setCustomData('cke_hasshared', 1);
                o = r.getChild([0, 0, 0, 0]);
                m.on('focus', function () {
                    for (var s = 0, t, u = p.getChildren(); t = u.getItem(s); s++) {
                        if (t.type == 1 && !t.equals(r) && t.hasClass('cke_shared')) t.hide();
                    }
                    r.show();
                });
                m.on('destroy', function () {
                    r.remove();
                });
            }
            return o;
        };
        return {
            build: function (m, n) {
                var o = m.name,
                    p = m.element,
                    q = m.elementMode;
                if (!p || q == 0) return;
                if (q == 1) p.hide();
                var r = m.fire('themeSpace', {
                    space: 'top',
                    html: ''
                }).html,
                    s = m.fire('themeSpace', {
                        space: 'contents',
                        html: ''
                    }).html,
                    t = m.fireOnce('themeSpace', {
                        space: 'bottom',
                        html: ''
                    }).html,
                    u = s && m.config.height,
                    v = m.config.tabIndex || m.element.getAttribute('tabindex') || 0;
                if (!s) u = 'auto';
                else if (!isNaN(u)) u += 'px';
                var w = '',
                    x = m.config.width;
                if (x) {
                    if (!isNaN(x)) x += 'px';
                    w += 'width: ' + x + ';';
                }
                var y = r && l(m, 'top'),
                    z = l(m, 'bottom');
                y && (y.setHtml(r), r = '');
                z && (z.setHtml(t), t = '');
                var A = h.createFromHtml(['<span id="cke_', o, '" onmousedown="return false;" class="', m.skinClass, ' cke_editor_', o, '" dir="', m.lang.dir, '" title="', b.gecko ? ' ' : '', '" lang="', m.langCode, '"' + (b.webkit ? ' tabindex="' + v + '"' : '') + ' role="application"' + ' aria-labelledby="cke_', o, '_arialbl"' + (w ? ' style="' + w + '"' : '') + '>' + '<span id="cke_', o, '_arialbl" class="cke_voice_label">' + m.lang.editor + '</span>' + '<span class="', b.cssClass, '" role="presentation"><span class="cke_wrapper cke_', m.lang.dir, '" role="presentation"><table class="cke_editor" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr', r ? '' : ' style="display:none"', ' role="presentation"><td id="cke_top_', o, '" class="cke_top" role="presentation">', r, '</td></tr><tr', s ? '' : ' style="display:none"', ' role="presentation"><td id="cke_contents_', o, '" class="cke_contents" style="height:', u, '" role="presentation">', s, '</td></tr><tr', t ? '' : ' style="display:none"', ' role="presentation"><td id="cke_bottom_', o, '" class="cke_bottom" role="presentation">', t, '</td></tr></tbody></table><style>.', m.skinClass, '{visibility:hidden;}</style></span></span></span>'].join(''));
                A.getChild([1, 0, 0, 0, 0]).unselectable();
                A.getChild([1, 0, 0, 0, 2]).unselectable();
                if (q == 1) A.insertAfter(p);
                else p.append(A);
                m.container = A;
                A.disableContextMenu();
                m.fireOnce('themeLoaded');
                m.fireOnce('uiReady');
            },
            buildDialog: function (m) {
                var n = e.getNextNumber(),
                    o = h.createFromHtml(['<div class="cke_editor_' + m.name.replace('.', '\\.') + '_dialog cke_skin_', m.skinName, '" dir="', m.lang.dir, '" lang="', m.langCode, '" role="dialog" aria-labelledby="%title#"><table class="cke_dialog', ' ' + b.cssClass, ' cke_', m.lang.dir, '" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="%body" role="presentation"><div id="%title#" class="%title" role="presentation"></div><a id="%close_button#" class="%close_button" href="javascript:void(0)" title="' + m.lang.common.close + '" role="button"><span class="cke_label">X</span></a>' + '<div id="%tabs#" class="%tabs" role="tablist"></div>' + '<table class="%contents" role="presentation"><tr>' + '<td id="%contents#" class="%contents" role="presentation"></td>' + '</tr></table>' + '<div id="%footer#" class="%footer" role="presentation"></div>' + '</div>' + '<div id="%tl#" class="%tl"></div>' + '<div id="%tc#" class="%tc"></div>' + '<div id="%tr#" class="%tr"></div>' + '<div id="%ml#" class="%ml"></div>' + '<div id="%mr#" class="%mr"></div>' + '<div id="%bl#" class="%bl"></div>' + '<div id="%bc#" class="%bc"></div>' + '<div id="%br#" class="%br"></div>' + '</td></tr>' + '</table>', c ? '' : '<style>.cke_dialog{visibility:hidden;}</style>', '</div>'].join('').replace(/#/g, '_' + n).replace(/%/g, 'cke_dialog_')),
                    p = o.getChild([0, 0, 0, 0, 0]),
                    q = p.getChild(0),
                    r = p.getChild(1);
                q.unselectable();
                r.unselectable();
                return {
                    element: o,
                    parts: {
                        dialog: o.getChild(0),
                        title: q,
                        close: r,
                        tabs: p.getChild(2),
                        contents: p.getChild([3, 0, 0, 0]),
                        footer: p.getChild(4)
                    }
                };
            },
            destroy: function (m) {
                var n = m.container;
                n.clearCustomData();
                m.element.clearCustomData();
                if (c) {
                    n.setStyle('display', 'none');
                    var o = document.body.createTextRange();
                    o.moveToElementText(n.$);
                    try {
                        o.select();
                    } catch (p) {}
                }
                if (n) n.remove();
                if (m.elementMode == 1) m.element.show();
                delete m.element;
            }
        };
    })());
    a.editor.prototype.getThemeSpace = function (l) {
        var m = 'cke_' + l,
            n = this._[m] || (this._[m] = a.document.getById(m + '_' + this.name));
        return n;
    };
    a.editor.prototype.resize = function (l, m, n, o) {
        var p = /^\d+$/;
        if (p.test(l)) l += 'px';
        var q = this.container,
            r = a.document.getById('cke_contents_' + this.name),
            s = o ? q.getChild(1) : q;
        b.webkit && s.setStyle('display', 'none');
        s.setStyle('width', l);
        if (b.webkit) {
            s.$.offsetWidth;
            s.setStyle('display', '');
        }
        var t = n ? 0 : (s.$.offsetHeight || 0) - (r.$.clientHeight || 0);
        r.setStyle('height', Math.max(m - t, 0) + 'px');
        this.fire('resize');
    };
    a.editor.prototype.getResizable = function () {
        return this.container.getChild(1);
    };
})();