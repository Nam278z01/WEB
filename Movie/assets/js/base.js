$(document).ready(function () {
    // Scroll
    function scrollNav() {
        window.addEventListener('scroll', function (e) {
            const nav = document.getElementById('my-nav');
            const pos_body = $('html,body').scrollTop();
            // -----------
            if (pos_body > 50) {
                nav.style.backgroundColor = "var(--primary-color-fn)";
            }
            else {
                nav.style.backgroundColor = "transparent";
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
            if (inputSearch) {
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
        })
    }
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
        })
    }
    navMobile();
});