$(document).ready(function () {
    window.addEventListener('scroll', function (e) {
        var nav = document.getElementById('my-nav');
        var pos_body = $('html,body').scrollTop();
        if (pos_body > 50) {
            nav.classList.add('nav-colored');
            nav.classList.remove('nav-transparent');
        }
        else {
            nav.classList.add('nav-transparent');
            nav.classList.remove('nav-colored');
        }
        if ($(window).width() >= 1024) {
            if (pos_body > 400) {
                $("#myVideo").get(0).pause();
            }
            if (pos_body < 200){
                $("#myVideo").get(0).play();
            }
        }
        var search = $("#search-wrap");
        if (search.show()) {
            search.hide();
        }
    });
    //Search
    $("#icon-search").click(function () {
        $("#search-wrap").css("display", "flex");
        $("#searchForm > input").focus();
    });
    $("#search-tnof").click(function () {
        $("#search-wrap").hide();
    });
    $("#searchForm > input").keyup(function () {
        var text = $(this).val();
        if (text) {
            $("#btn-search-delete").css("visibility", "visible");
        }
        else {
            $("#btn-search-delete").css("visibility", "hidden");
        }
    })
    $("#btn-search-delete").click(function (e) {
        e.preventDefault();
        $("#searchForm > input").val("");
    })
    // Slide
    $(".row__container").hover(function () {
        var jump = 0;
        var margin = 0;
        var childNext = $(this).children(".row__item-next");
        var childBack = $(this).children(".row__item-back");
        var slide = $(this).children(".row__container-sc");
        //if (show >= -100) {
            childNext.css("transform", "translate(0)");
        //}
        //if (show < 0) {
            childBack.css("transform", "translate(0)");
        //}
        childNext.click(function () {
            if (jump >= -100) {
                jump -= 100;
                margin += $(window).width() * 6 / 100;
                slide.css("transform", "translateX(calc(" + margin + "px + " + jump + "%))");
            }
            // if (jump == -200) {
            //     childNext.hide();
            // }
        });
        childBack.click(function () {
            if (jump <= -100) {
                jump += 100;
                margin -= $(window).width() * 6 / 100;
                slide.css("transform", "translateX(calc(" + margin + "px + " + jump + "%))");
            }
            // if (jump == 0) {
            //     childBack.hide();
            // }
        });
    }, function () {
        var childNext = $(this).children(".row__item-next");
        var childBack = $(this).children(".row__item-back");
        childNext.css("transform", "translate(100%)");
        childBack.css("transform", "translate(-100%)");
    });

    if ($(window).width() >= 1024) {
        // show video header sau 3s
        setTimeout(function () {
            $(".header__video-img:first-child").hide();
            $("#myVideo").show();
            $("#myVideo").get(0).play();
            $(".header-btn-i:nth-child(2)").show();
        }, 3000);
        // Tat tieng video header
        $(".header-btn-i:nth-child(2)").click(function (e) {
            $(this).hide();
            $(".header-btn-i:first-child").show();
            $("#myVideo").prop('muted', true);
        });
        // Bat tieng video header
        $(".header-btn-i:nth-child(1)").click(function (e) {
            $(this).hide();
            $(".header-btn-i:nth-child(2)").show();
            $("#myVideo").prop('muted', false);
        });
        // Xem lai video header
        $(".header-btn-i:last-child").click(function (e) {
            $(this).hide();
            if ($("#myVideo").get(0).muted == true) {
                $(".header-btn-i:first-child").show();
            } else {
                $(".header-btn-i:nth-child(2)").show();
            }
            $("#myVideo").get(0).pause();
            $("#myVideo").get(0).currentTime = 0;
            $("#myVideo").get(0).play();

        });
        // Bat tat video hesder
        setInterval(function () {
            if ($("#myVideo").get(0).currentTime >= $("#myVideo").get(0).duration - 10) {
                $(".header-btn-i:last-child").show();
                $(".header-btn-i:first-child").hide();
                $(".header-btn-i:nth-child(2)").hide();
            }
            ;
        }, 10000)
        // hover phim
        var myTimeout;
        var myTimeout2;
        var parent;
        $(".row__img-link").mouseenter(function (e) {
            var hover = $("#hover");
            if (hover) {
                hover.remove();
            }
            var margin = $(window).width() * 3 / 100;
            var left = $(this).offset().left;
            parent = $(this).parent().parent();
            myTimeout = setTimeout(function () {
                var addChild = `<div class="hover-movie" id="hover">
                                    <a href="#" class="hover-movie-link">
                                        <img src="./assets/img/image_big1.jpg" alt="" class="hover-movie__img">
                                        <video id="hover-movie__video">
                                            <source src="./assets/video/video1.mp4" type="video/mp4">
                                        </video>
                                    </a>
                                    <img src="./assets/img/image_name1.png" alt="" class="hover-movie__video-name">
                                    <div class="hover-movie__button">
                                        <button class="button hover-movie__button--play" title="Xem ngay Daredevil">
                                            <i class="fas fa-play"></i>
                                            <span>Xem ngay</span>
                                        </button>
                                        <button class="button hover-movie__button--addlist" title="Thêm vào danh sách của tôi">
                                            <i class="fas fa-plus"></i>
                                            <span>Danh sách</span>
                                        </button>
                                        <button class="button hover-movie__button--moreinfo" href="#" title="Chi tiết Daredevil">
                                            <i class="fas fa-info-circle"></i>
                                            <span>Chi tiết</span>
                                        </button>
                                    </div>
                                </div>`;
                parent.after(addChild);
                $("#hover").css("top", "-30px");
                if (left < 50) {
                    $("#hover").css("left", margin + "px");
                    $("#hover").css("transform-origin", "left");
                } else if (left < $(window).width() - 300){
                    $("#hover").css("left", left-100 + "px");
                } else {
                    $("#hover").css("transform-origin", "right");
                    $("#hover").css("right", margin + "px");
                }
                $("#myVideo").get(0).pause();
                myTimeout2 = setTimeout(function () {
                    $(".hover-movie__img").hide();
                    $("#hover-movie__video").show();
                    $("#hover-movie__video").get(0).pause();
                    $("#hover-movie__video").get(0).currentTime = 0;
                    $("#hover-movie__video").get(0).play();
                }, 2000);
            }, 700);
        }).mouseleave(function () {
            clearTimeout(myTimeout);
            $("#hover").mouseleave(function () {
                clearTimeout(myTimeout2);
                $(this).remove();
            });
        });
    };
});


