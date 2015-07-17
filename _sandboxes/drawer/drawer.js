// calculate the percentage of drawer to show
// based on the display of the nav
$.fn.setDrawerHeight = function(navClass, seed) {
    seed = seed || 0;

    function newDrawerHeight(nav, drawer, top) {
        var show = nav - top,
            hidePercentage;

        hidePercentage = (show > 0) ? show/nav : (top >= 0) ? 0 : 1;
        return drawer - drawer * hidePercentage;
    }

    var nav = $(navClass).height(),
        drawerElem = this,
        drawer = drawerElem.height(),
        offset = $(navClass).offset().top;

    var top = $(window).scrollTop() + seed - offset;
    drawerElem.height(newDrawerHeight(nav, drawer, top));
    $(window).scroll(function() {
        var top = $(window).scrollTop() + seed - offset;
        drawerElem.height(newDrawerHeight(nav, drawer, top));
    });
};

$(document).ready(function() {
    $(".ScrollShow-rightDrawer3").setDrawerHeight(".ScrollShow-secondDrawer");
    $(".ScrollShow-rightDrawer2").setDrawerHeight(".ScrollShow-drawer");
    $(".ScrollShow-secondDrawer3").setDrawerHeight(".ScrollShow-notch");
    $(".ScrollShow-secondDrawer2").setDrawerHeight(".ScrollShow-cover");
    $(".ScrollShow-secondDrawer").setDrawerHeight(".ScrollShow-static");
    $(".ScrollShow-navColor").setDrawerHeight(".ScrollShow-nav", $(".ScrollShow-nav").height());
    $(".ScrollShow-notch").setDrawerHeight(".ScrollShow-nav");
    $(".ScrollShow-cover").setDrawerHeight(".ScrollShow-nav");
    $(".ScrollShow-drawer").setDrawerHeight(".ScrollShow-nav");
});
