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
    var n = ["1v1_results", "2v2_results", "3v3_results", "ctf_results", "koth_results", "dd_results"];
    $("#view-results").change(function () {
        $("select option:selected").each(function () {
            var e = $(this).attr("value"); - 1 != $.inArray(e, n) && ("1v1_results" == $(this).attr("value") && ($(".results").hide(), $("#tourn1").fadeIn()), "2v2_results" == $(this).attr("value") && ($(".results").hide(), $("#tourn2").fadeIn()), "3v3_results" == $(this).attr("value") && ($(".results").hide(), $("#tourn3").fadeIn()), "ctf_results" == $(this).attr("value") && ($(".results").hide(), $("#ctfstats").fadeIn()), "koth_results" == $(this).attr("value") && ($(".results").hide(), $("#kothstats").fadeIn()), "dd_results" == $(this).attr("value") && ($(".results").hide(), $("#ddstats").fadeIn()))
        })
    }).change();
    var a = ["all-ach", "skill-ach", "pvm-ach", "event-ach", "explore-ach", "craft-ach"];
    $("#view-achieves").change(function () {
        $("select option:selected").each(function () {
            var e = $(this).attr("value");
            if (-1 != $.inArray(e, a))
                if ("all-ach" == e)
                    for (i = 0; i < a.length; i++) $("#" + a[i]).fadeIn();
                else {
                    for (i = 0; i < a.length; i++) $("#" + a[i]).hide();
                    $("#" + e).fadeIn()
                }
        })
    }).change(), $("#damageType").change(function () {
        $("select option:selected").each(function () {
            var e = $(this).attr("value");
            ("monster" == e || "player" == e) && ("monster" == e ? ($("#pvp-armor").hide(), $("#pvm-armor").fadeIn()) : "player" == e && ($("#pvm-armor").hide(), $("#pvp-armor").fadeIn()))
        })
    }).change();
    var o = ["swords", "macing", "fencing", "archery", "fists"];
    $("#weaponType").change(function () {
        $("select option:selected").each(function () {
            var e = $(this).attr("value");
            if (-1 != $.inArray(e, o)) {
                for (i = 0; i < o.length; i++) $("#" + o[i]).hide();
                $("#" + e).show()
            }
        })
    }).change();
    var r = ["category-mcat", "total-mcat", "undead-mcat", "animal-mcat", "dragonkind-mcat", "orcish-mcat", "humanoid-mcat", "elemental-mcat", "daemons-mcat", "plants-mcat", "spiderorsnake-mcat", "ophidian-mcat", "terathan-mcat", "boss-mcat", "special-mcat", "misc-mcat"];
    $("#view-monster-category").change(function () {
        $("select option:selected").each(function () {
            var e = $(this).attr("value");
            if (-1 != $.inArray(e, r)) {
                for (i = 0; i < r.length; i++) $("#" + r[i]).hide(), $("#" + r[i] + "-title").hide(), $("#" + r[i] + "-none").hide();
                $("#" + e).fadeIn(), $("#" + e + "-title").show(), $("#" + e + "-none").fadeIn()
            }
        })
    }).change();
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