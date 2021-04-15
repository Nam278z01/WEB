window.addEventListener('scroll', function (e) {
    var nav = document.getElementById('mynav');
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
window.onclick = function (event) {
    var search = document.getElementById("search-wrap");
    if (event.target == search) {
        search.style.display = "none";
    }
}
