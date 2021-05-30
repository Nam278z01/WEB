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
                    nav.style.backgroundColor = "var(--nav-color)";
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
        const modalSecond = $("#myModalSecond")
        const btnRes = $(".btn-account__register");
        const btnLog = $(".btn-account__signIn");
        const formRes = $("#registerForm");
        const formLog = $("#loginForm");
        const back = $(".auth-form__controls-back, .addForm-btn__cancel");
        const btnSwitch = $(".auth-form__switch-btn");
        const btnLoginAdd = $(".addForm-btn__Login");
        var body = $("body");
        var check = true;
        btnRes.click(function () {
            modalSecond.css("display", "flex");
            formRes.show();
            check = false;
            body.css("overflow", "hidden");
        })
        btnLog.click(function () {
            modalSecond.css("display", "flex");
            formLog.show();
            body.css("overflow", "hidden");
        })
        back.click(function () {
            modalSecond.css("display", "none");
            formRes.hide();
            formLog.hide();
            check = true;
            let modalModal = $(".modal__body .modal-movie");
            if (modalModal.length > 0) {
                body.css("overflow", "hidden");
            }
            else {
                body.css("overflow", "auto");
            }
        })
        $(window).click(function (e) {
            if (e.target == modalSecond.children(".modal__overlaySecond").get(0) || e.target == modalSecond.children(".modal__bodySecond").get(0)) {
                modalSecond.hide();
                formRes.hide();
                formLog.hide();
                let modalModal = $(".modal__body .modal-movie");
                if (modalModal.length > 0) {
                    body.css("overflow", "hidden");
                }
                else {
                    body.css("overflow", "auto");
                }
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
        btnLoginAdd.click(function () {
            $("#addForm").hide()
            formLog.show()
        })
    }

    displayName()
    function displayName() {
        let btn = document.querySelector('.btn-toggle-display');
        btn.classList.add('active');
        let row_name = document.querySelectorAll('.row__name');
        btn.onclick = () => {
            btn.classList.toggle('active');
            row_name.forEach(row => {
                row.classList.toggle('disable');
            })
        }
    }

    lightMode()
    function lightMode() {
        let btn = document.querySelector('.btn-toggle-lightmode');
        btn.onclick = () => {
            btn.classList.toggle('active');
            document.querySelector('body').classList.toggle('light')
        }
    }
});
