window.addEventListener('scroll', function (e) {
    var nav = document.getElementById('mynav');
    var nav_mobile = document.getElementsByClassName('nav-mobile')[0];
    if (document.documentElement.scrollTop || document.body.scrollTop > window.innerHeight) {
        nav.classList.add('nav-colored');
        nav.classList.remove('nav-transparent');
    }
    else {
        nav.classList.add('nav-transparent');
        nav.classList.remove('nav-colored');
    }
});
$("#icon-search").click(function () {
    $("#search-wrap").css("display", "flex");
});
$("#search-tnof").click(function () {
    $("#search-wrap").css("display", "none");
});
$(".row__item-next").click(function () {
    $("#row__img-first").css("margin-left", "-205px");
})
$(".row__item-back").click(function () {
    $("#row__img-first").css("margin-left", "0");
})

