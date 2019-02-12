function toggleElement(e, t) {
    e ? $(t).children(".dropdown-container").stop(!0, !0).fadeIn("fast", function () {}) : $(t).children(".dropdown-container").stop(!0, !0).fadeOut("fast", function () {})
}
$(document).ready(function () {
    $(".mobile-button").on("click", function (e) {
        e.preventDefault(), $(".main-navigation li + li").stop(!0, !0).fadeToggle("fast", function () {})
    });
    var e, t;
    $(".achievement").on("click", function (t) {
        var n = this;
        e != this ? ($(e).next("tr.achieve-info").stop(!0, !0).fadeToggle("fast", function () {}), e = this) : e = null, $(n).next("tr.achieve-info").stop(!0, !0).fadeToggle("fast", function () {})
    }), $(".achieve-cat-header").on("click", function (e) {
        var n = this;
        t != this ? ($(t).next("tr.achieve-category").stop(!0, !0).fadeToggle("fast", function () {}), t = this) : t = null, $(n).next("tr.achieve-category").stop(!0, !0).fadeToggle("fast", function () {})
    }), $(window).width() > 650 ? ($("#about").hover(function (e) {
        e.preventDefault(), toggleElement("mouseenter" == e.type, this)
    }), $("#myuo").hover(function (e) {
        e.preventDefault(), toggleElement("mouseenter" == e.type, this)
    }), $("#events").hover(function (e) {
        e.preventDefault(), toggleElement("mouseenter" == e.type, this)
    }), $("#event-results").hover(function (e) {
        e.preventDefault(), toggleElement("mouseenter" == e.type, this)
    })) : ($(".myuoll-table").wrap('<div class="uoll-table-overflow"></div>'), $("#about > a").on("click", function (e) {
        e.preventDefault(), $("#about").children(".dropdown-container").stop(!0, !0).fadeToggle("fast", function () {})
    }), $("#myuo > a").on("click", function (e) {
        e.preventDefault(), $("#myuo").children(".dropdown-container").stop(!0, !0).fadeToggle("fast", function () {})
    }), $("#events > a").on("click", function (e) {
        e.preventDefault(), $("#events").children(".dropdown-container").stop(!0, !0).fadeToggle("fast", function () {})
    }), $("#event-results > a").on("click", function (e) {
        e.preventDefault(), $("#event-results").children(".dropdown-container").stop(!0, !0).fadeToggle("fast", function () {})
    }), $(".tournament-link").click(!1)), $("#private-character").find(".private").html("----");
    var s = $(".main-container").offset().top,
        c = function () {
            var e = $(window).scrollTop();
            e > s ? $(".main-container").addClass("fixed") : $(".main-container").removeClass("fixed")
        };
    c(), $(window).bind("load", function () {
        $(window).scroll(function () {
            c()
        })
    }), window.remodalGlobals = {
        namespace: "modal",
        defaults: {
            hashTracking: !0
        }
    }
});