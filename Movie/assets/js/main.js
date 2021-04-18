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
        if (pos_body > 400) {
            $("#myVideo").get(0).pause();
        }
        else {
            $("#myVideo").get(0).play();
        }
    });

    setTimeout(function () {
        $(".header__video-img:first-child").hide();
        $("#myVideo").show();
        $("#myVideo").get(0).play();
        $(".header-btn-i:nth-child(2)").show();
    }, 3000);
    $(".header-btn-i:nth-child(2)").click(function (e) {
        $(this).hide();
        $(".header-btn-i:first-child").show();
        $("#myVideo").prop('muted', true);
    });
    $(".header-btn-i:nth-child(1)").click(function (e) {
        $(this).hide();
        $(".header-btn-i:nth-child(2)").show();
        $("#myVideo").prop('muted', false);
    });
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
    setInterval(function () {
        if ($("#myVideo").get(0).currentTime >= $("#myVideo").get(0).duration - 10) {
            $(".header-btn-i:last-child").show();
            $(".header-btn-i:first-child").hide();
            $(".header-btn-i:nth-child(2)").hide();
        }
        ;
    }, 10000)

    $("#icon-search").click(function () {
        $("#search-wrap").css("display", "flex");
    });
    $("#search-tnof").click(function () {
        $("#search-wrap").hide();
    });

    //Slider
    var margin_left = $(window).width() * 3 / 100;
    $(".row__item-next").click(function () {
        var parent = $(this).parent();
        var slide = $(this).parent().children(".row__img-link:nth-child(3)");
        if (margin_left <= 56 && margin_left > - 2400) {
            margin_left -= (213) * 2;
            slide.css("margin-left", margin_left.toString() + "px");
            
        }
    });
    
    // var back = parent.children(".row__item-back").show();
    // if (margin_left > 56) {
    //     back.click(function () {
    //         var back = $(this).parent().children(".row__img-link:nth-child(3)");
    //         console.log(next);
    //         margin_left -= (213) * 2;
    //         slide.css("margin-left", margin_left.toString() + "px");

    //     })
    // }
    $(window).on("load resize", function (e) {
        if (document.documentElement.clientWidth > 1024) {
            var myTimeout;
            var parent;
            var child;
            $(".row__img-link").mouseenter(function (e) {
                console.log([$(this)]);
                var left = $(this).offset().left + 'px';
                // var top = $(this).offset().top + 'px';
                // alert(top);
                parent = $(this).parent();
                child = parent.html();
                myTimeout = setTimeout(function () {
                    var addChild = `<div class="hover-movie" id="hover">
                <a href="#" class="hover-movie-link">
                    <img src="./assets/img/image1.jpg" alt="" class="hover-movie__img">
                    <video id="hover-movie__video">
                        <source src="./assets/video/armyofthedead.mp4" type="video/mp4">
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
                    $("#hover").css("left", left);
                    $("#myVideo").get(0).pause();
                    $("#hover-movie__video").get(0).currentTime = 0;
                    setTimeout(function () {
                        $(".hover-movie__img").hide();
                        $("#hover-movie__video").show();
                        $("#hover-movie__video").get(0).play();
                    }, 3000);
                }, 700);
            }).mouseleave(function () {
                clearTimeout(myTimeout);
                $("#hover").mouseleave(function () {
                    clearTimeout(myTimeout);
                    $(this).remove();
                });
            })
        };
    });
    // Hover film
});


