/**
    Head JS     The only script in your <HEAD>
    Copyright   Tero Piirainen (tipiirai)
    License     MIT / http://bit.ly/mit-license
    Version     0.96

    http://headjs.com
*/
(function(a) {
    function z() { d || (d = !0, s(e, function(a) { p(a) })) }

    function y(c, d) {
        var e = a.createElement("script");
        e.type = "text/" + (c.type || "javascript"), e.src = c.src || c, e.async = !1, e.onreadystatechange = e.onload = function() {
            var a = e.readyState;!d.done && (!a || /loaded|complete/.test(a)) && (d.done = !0, d()) }, (a.body || b).appendChild(e) }

    function x(a, b) {
        if (a.state == o) return b && b();
        if (a.state == n) return k.ready(a.name, b);
        if (a.state == m) return a.onpreload.push(function() { x(a, b) });
        a.state = n, y(a.url, function() { a.state = o, b && b(), s(g[a.name], function(a) { p(a) }), u() && d && s(g.ALL, function(a) { p(a) }) }) }

    function w(a, b) { a.state === undefined && (a.state = m, a.onpreload = [], y({ src: a.url, type: "cache" }, function() { v(a) })) }

    function v(a) { a.state = l, s(a.onpreload, function(a) { a.call() }) }

    function u(a) { a = a || h;
        var b;
        for (var c in a) {
            if (a.hasOwnProperty(c) && a[c].state != o) return !1;
            b = !0 }
        return b }

    function t(a) {
        return Object.prototype.toString.call(a) == "[object Function]" }

    function s(a, b) {
        if (!!a) { typeof a == "object" && (a = [].slice.call(a));
            for (var c = 0; c < a.length; c++) b.call(a, a[c], c) } }

    function r(a) {
        var b;
        if (typeof a == "object")
            for (var c in a) a[c] && (b = { name: c, url: a[c] });
        else b = { name: q(a), url: a };
        var d = h[b.name];
        if (d && d.url === b.url) return d;
        h[b.name] = b;
        return b }

    function q(a) {
        var b = a.split("/"),
            c = b[b.length - 1],
            d = c.indexOf("?");
        return d != -1 ? c.substring(0, d) : c }

    function p(a) { a._done || (a(), a._done = 1) }
    var b = a.documentElement,
        c, d, e = [],
        f = [],
        g = {},
        h = {},
        i = a.createElement("script").async === !0 || "MozAppearance" in a.documentElement.style || window.opera,
        j = window.head_conf && head_conf.head || "head",
        k = window[j] = window[j] || function() { k.ready.apply(null, arguments) },
        l = 1,
        m = 2,
        n = 3,
        o = 4;
    i ? k.js = function() {
        var a = arguments,
            b = a[a.length - 1],
            c = {};
        t(b) || (b = null), s(a, function(d, e) { d != b && (d = r(d), c[d.name] = d, x(d, b && e == a.length - 2 ? function() { u(c) && p(b) } : null)) });
        return k } : k.js = function() {
        var a = arguments,
            b = [].slice.call(a, 1),
            d = b[0];
        if (!c) { f.push(function() { k.js.apply(null, a) });
            return k }
        d ? (s(b, function(a) { t(a) || w(r(a)) }), x(r(a[0]), t(d) ? d : function() { k.js.apply(null, b) })) : x(r(a[0]));
        return k }, k.ready = function(b, c) {
        if (b == a) { d ? p(c) : e.push(c);
            return k }
        t(b) && (c = b, b = "ALL");
        if (typeof b != "string" || !t(c)) return k;
        var f = h[b];
        if (f && f.state == o || b == "ALL" && u() && d) { p(c);
            return k }
        var i = g[b];
        i ? i.push(c) : i = g[b] = [c];
        return k }, k.ready(a, function() { u() && s(g.ALL, function(a) { p(a) }), k.feature && k.feature("domloaded", !0) });
    if (window.addEventListener) a.addEventListener("DOMContentLoaded", z, !1), window.addEventListener("load", z, !1);
    else if (window.attachEvent) { a.attachEvent("onreadystatechange", function() { a.readyState === "complete" && z() });
        var A = 1;
        try { A = window.frameElement } catch (B) {}!A && b.doScroll && function() {
            try { b.doScroll("left"), z() } catch (a) { setTimeout(arguments.callee, 1);
                return } }(), window.attachEvent("onload", z) }!a.readyState && a.addEventListener && (a.readyState = "loading", a.addEventListener("DOMContentLoaded", handler = function() { a.removeEventListener("DOMContentLoaded", handler, !1), a.readyState = "complete" }, !1)), setTimeout(function() { c = !0, s(f, function(a) { a() }) }, 300) })(document)
