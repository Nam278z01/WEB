$(document).ready(function () {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {

    }
    else {
        navMobile();
    }
    // Scroll
    function scrollNav() {
        window.addEventListener('scroll', function (e) {
            const nav = document.getElementById('my-nav');
            if (nav) {
                const pos_body = $('html,body').scrollTop();
                // -----------
                if (pos_body > 50) {
                    nav.style.backgroundColor = "#101010";
                }
                else {
                    nav.style.backgroundColor = "transparent";
                }
            }
        })
    }
    scrollNav();
    // Search
    function searchNav() {
        const iconSearch = $("#icon-search");
        const formSearch = $("#search-wrap");
        const inputSearch = $("#searchForm > input");
        const turnoffSe = $("#search-tnof");
        const deleteVl = $("#btn-search-delete");
        // ------------
        iconSearch.click(function () {
            formSearch.css("display", "flex");
            inputSearch.focus();
        })
        // ------------
        turnoffSe.click(function () {
            formSearch.hide();
        })
        // ------------
        inputSearch.keyup(function () {
            let inputValues = $(this).val();
            if (inputValues) {
                deleteVl.css("visibility", "visible");
            } else {
                deleteVl.css("visibility", "hidden");
            }
        })
        // ------------
        deleteVl.click(function (event) {
            event.preventDefault();
            inputSearch.val("");
            $(this).css("visibility", "hidden");
        });
    };
    searchNav()
    // Nav mobile
    function navMobile() {
        var isDown = false;
        var startX;
        var scrollLeft;
        const navMb = $(".nav-mobile-menu");
        // ------------
        navMb.mousedown(function (e) {
            isDown = true;
            startX = e.pageX;
            scrollLeft = navMb.scrollLeft();
        });
        // ------------
        navMb.mouseleave(function (e) {
            isDown = false;
        });
        // ------------
        navMb.mouseup(function (e) {
            isDown = false;
        });
        // ------------
        navMb.mousemove(function (e) {
            if (!isDown) {
                return
            }
            e.preventDefault();
            const x = e.pageX;
            const walk = startX - x;
            navMb.scrollLeft(walk + scrollLeft);
        });
    };
    ResLog();
    function ResLog() {
        const modal = $("#myModal");
        const btnRes = $(".btn-account__register");
        const btnLog = $(".btn-account__signIn");
        const formRes = $("#registerForm");
        const formLog = $("#loginForm");
        const back = $(".auth-form__controls-back");
        const btnSwitch = $(".auth-form__switch-btn");
        var body = $("body");
        var check = true;
        btnRes.click(function () {
            modal.css("display", "flex");
            formRes.show();
            check = false;
            body.css("overflow", "hidden");
        })
        btnLog.click(function () {
            modal.css("display", "flex");
            formLog.show();
            body.css("overflow", "hidden");
        })
        back.click(function () {
            modal.css("display", "none");
            formRes.hide();
            formLog.hide();
            check = true;
            body.css("overflow", "auto");
        })
        $(window).click(function (e) {
            if (e.target == modal.children(".modal__overlay").get(0) || e.target == modal.children(".modal__body").get(0)) {
                modal.hide();
                formRes.hide();
                formLog.hide();
                body.css("overflow", "auto");
            }
        })
        btnSwitch.click(function () {
            check = !check;
            if (formRes.show() && check == true) {
                formRes.hide();
                formLog.show();
            }
            if (formLog.show() && check == false) {
                formLog.hide();
                formRes.show();
            }
        })
    }
});