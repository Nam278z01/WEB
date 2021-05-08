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
        sliderGe($("#newRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#topRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#dramaRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#sci-fiRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#awardRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#popularRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#actionRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#vipRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#comingRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#myRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
    }
    
    // hover hàng phim
    function hoverRowMovie(parent, button) {
        parent.hover(function () {
            button.css("transform", "translate(0)");
            button.css("display", "flex");
        }, function () {
            button.css("transform", "translate(-100%)");
            button.css("display", "none");
        });
    }
    
    //Slider
    function sliderGe(slideRan, slBtnNext, slBtnBack, slChSlides, slChSlide) {
        var childBtnNext = slideRan.children(slBtnNext),
            childBtnBack = slideRan.children(slBtnBack);

        var slides = slideRan.children(slChSlides),
            slide = slides.children(slChSlide),
            currentIdx = 0,
            marginSlide = 6,
            slideCount = slide.length,
            slideWidth = slide.width(),
            move = marginSlide + slideWidth;
        var newSlideWidth;
        var widthW = slideRan.parent().width();
        var number;
        if (widthW > 1024) {
            number = 5;
        } else if (widthW < 1025 && widthW > 739) {
            number = 4;
        } else if (widthW < 740 && widthW > 519) {
            number = 3;
        } else {
            number = 2;
        }
        if (number < slideCount)
            hoverRowMovie(slideRan, childBtnNext);

        childBtnNext.click(function () {
            if (currentIdx < (slideCount - number)) {
                // Nếu số phim còn lại nhỏ hơn lượt lướt chuẩn
                if (slideCount - currentIdx - number < number) {
                    moveSlide(slideCount - number);
                }
                else {
                    moveSlide(currentIdx + number);
                }
            }
            if (currentIdx >= slideCount - number) {
                setTimeout(() => {
                    $(this).hide();
                    slideRan.unbind();
                    hoverRowMovie(slideRan, childBtnBack);
                }, 400);
            }
            childBtnBack.css("transform", "translate(0)");
            childBtnBack.css("display", "flex");
            hoverRowMovie(slideRan, childBtnBack);

        });

        childBtnBack.click(function () {
            if (currentIdx > 0) {
                if (currentIdx < number) {
                    moveSlide(0);
                } else {
                    moveSlide(currentIdx - number);
                }
            }
            if (currentIdx <= 0) {
                setTimeout(() => {
                    $(this).hide();
                    slideRan.unbind();
                    hoverRowMovie(slideRan, childBtnNext);
                }, 400);
            }
            childBtnNext.css("transform", "translate(0)");
            childBtnNext.css("display", "flex");
            hoverRowMovie(slideRan, childBtnNext);
        });

        function moveSlide(index) {
            slides.css({ transition: 'all linear' })
            slides.css({ transition: '0.5s' })
            slides.css({ transform: 'translateX(calc(-' + move * index + 'px)' });
            currentIdx = index;
        }
        // Responsive slider
        $(window).resize(function () {
            widthW = slideRan.parent().width();
            if (widthW > 1024) {
                number = 5;
            } else if (widthW < 1025 && widthW > 739) {
                number = 4;
            } else if (widthW < 740 && widthW > 519) {
                number = 3;
            } else {
                number = 2;
            }
            if (slideCount - currentIdx - number > 0)
                hoverRowMovie(slideRan, childBtnNext);
            else {
                slideRan.unbind();
                if (currentIdx != 0)
                    hoverRowMovie(slideRan, childBtnBack);
            }
            newSlideWidth = slide.width();
            move = newSlideWidth + marginSlide;
            slides.css({ transition: '0s' })
            slides.css({ transform: 'translateX(calc(-' + move * currentIdx + 'px)' });
        });
    }
    // Modal
    var modal = document.getElementById(".modal");
    $(window).click(function (e) {
        if (e.target == modal) {
            $("body").css("overflow", "auto");
            $(".modal").hide();
            $("#myVideo").get(0).play();
        }
    })
    $(".modal-turnoff").click(function () {
        $("body").css("overflow", "auto");
        $(".modal").hide();
        // $("#myVideo").get(0).play();
        $("#modal-movie__video").get(0).pause();
        $(".modal__body").css('height', 'auto');
        $(".modal-movie").hide();
    })
    $(".button.button--moreinfo").click(function () {
        $("body").css("overflow", "hidden");
        $(".modal").show();
        $(".modal-movie").show();
        $(".modal__body").css("height", "100%");
        sliderGe($("#episodeMovie"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
        sliderGe($("#recommendMovies"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
    })
    $(".row__img-link").click(function () {
        var src = $(this).find(".row__img").attr("src");
        var number = src.substr(src.length - 7, 3);
        var url = new URL(window.location.href);
        url.pathname = './watch.html'
        url.searchParams.append("movie", number);
        window.location.href = url.href;
        var src = $(this).find(".row__img").attr("src");
        var number = src.substr(src.length - 7, 3);
        url.searchParams.append("movie", number);
        $(".modal-movie__img").attr("src", "./assets/img/image_big" + number + ".jpg");
        $(".modal-movie__video-name").attr("src", "./assets/img/image_name" + number + ".png");
        $("#modal-movie__video").attr("src", "./assets/video/video" + number + ".mp4");
        $("body").css("overflow", "hidden");
        $(".modal").show();
        $(".modal-movie").show();
        $(".modal__body").css('height', '100%');
        sliderGe($("#episodeMovie"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
        sliderGe($("#recommendMovies"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
        $("#myVideo").get(0).pause();
        const headerMImg = $(".modal-movie__img")
        const headerMVideo = $("#modal-movie__video");
        console.log(headerMVideo)
        const btnMMute = $(".header-movie-btn-i:first-child");
        const btnMSound = $(".header-movie-btn-i:nth-child(2)");
        const btnMReplay = $(".header-movie-btn-i:last-child");
        headerMVideo.get(0).play();
        showVideo(headerMImg, headerMVideo, btnMMute, btnMSound, btnMReplay, "imgActive")
    })
    // Chọn tập
    selectSeason()
    function selectSeason() {
        checkSeason = true;
        $("#movie-btn-seasons").click(function () {
            checkSeason = !checkSeason;
            $(".movies-menu-seasons").slideToggle();
            if (!checkSeason)
                $(".season-icon").after().css("transform", "rotate(180deg)")
            else
                $(".season-icon").after().css("transform", "rotate(0deg)")
        })
    }
    $(".modal-turnoff").click(function () {
        $("body").css("overflow", "auto");
        $(".modal").hide();
        // $("#myVideo").get(0).play();
        $("#modal-movie__video").get(0).pause();
        $(".modal__body").css('height', 'auto');
        $(".modal-movie").hide();
        var url = window.location.href;
        if (url.indexOf("?") > 0) {
            var updatedUri = url.substring(0, url.indexOf("?"));
            window.history.replaceState({}, document.title, updatedUri);
        }
    })

    // Search
    function Movie() {

        $(".row__img-link").click(function () {
            var url = new URL(window.location.href);
            var src = $(this).find(".row__img").attr("src");
            var number = src.substr(src.length - 7, 3);
            url.searchParams.append("movie", number);
            window.history.pushState(null, null, url);
            var search = window.location.search;
            const urlParams = new URLSearchParams(search);
            var search = urlParams.get('movie');
            $(".modal-movie__img").attr("src", "./assets/img/image_big" + search + ".jpg");
            $(".modal-movie__video-name").attr("src", "./assets/img/image_name" + search + ".png");
            $("#modal-movie__video").attr("src", "./assets/video/video" + search + ".mp4");
            $("body").css("overflow", "hidden");
            $(".modal").show();
            $(".modal-movie").show();
            $(".modal__body").css('height', '100%');
            sliderGe($("#episodeMovie"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
            sliderGe($("#recommendMovies"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
            $("#myVideo").get(0).pause();
            const headerMImg = $(".modal-movie__img")
            const headerMVideo = $("#modal-movie__video");
            console.log(headerMVideo)
            const btnMMute = $(".header-movie-btn-i:first-child");
            const btnMSound = $(".header-movie-btn-i:nth-child(2)");
            const btnMReplay = $(".header-movie-btn-i:last-child");
            headerMVideo.get(0).play();
            showVideo(headerMImg, headerMVideo, btnMMute, btnMSound, btnMReplay, "imgActive")
        })

    }
    Movie();
    var search = window.location.search;
    const urlParams = new URLSearchParams(search);
    var search = urlParams.get('movie');
    if (search) {
        $(".modal-movie__img").attr("src", "./assets/img/image_big" + search + ".jpg");
        $(".modal-movie__video-name").attr("src", "./assets/img/image_name" + search + ".png");
        $("#modal-movie__video").attr("src", "./assets/video/video" + search + ".mp4");
        $("body").css("overflow", "hidden");
        $(".modal").show();
        $(".modal-movie").show();
        $(".modal__body").css('height', '100%');
        sliderGe($("#episodeMovie"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
        sliderGe($("#recommendMovies"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
        $("#myVideo").get(0).pause();
        const headerMImg = $(".modal-movie__img")
        const headerMVideo = $("#modal-movie__video");
        console.log(headerMVideo)
        const btnMMute = $(".header-movie-btn-i:first-child");
        const btnMSound = $(".header-movie-btn-i:nth-child(2)");
        const btnMReplay = $(".header-movie-btn-i:last-child");
        headerMVideo.get(0).play();
        showVideo(headerMImg, headerMVideo, btnMMute, btnMSound, btnMReplay, "imgActive")
    }
    showVideo(headerImg, headerVideo, btnMute, btnSound, btnReplay, "imgActive");
    // ---------------
    //Bat tat video header
    function showVideo(headerVImg, headerVVideo, btnVMute, btnVSound, btnVReplay, addClassA, movieName) {
        headerVImg.addClass(addClassA);
        headerVImg.on("webkitAnimationEnd", function () {
            if (movieName) {
                movieName.show();
            }
            headerVImg.hide();
            headerVVideo.show();
            headerVVideo.get(0).play();
            btnVSound.show();
        });
        // -----------
        // Tat tieng video header
        btnVSound.click(function (e) {
            $(this).hide();
            btnVMute.show();
            headerVVideo.prop('muted', true);
        });
        // Bat tieng video header
        btnVMute.click(function (e) {
            $(this).hide();
            btnVSound.show();
            headerVVideo.prop('muted', false);
        });
        // Xem lai video header
        btnVReplay.click(function (e) {
            headerVImg.addClass("imgActiveSc");
            $(this).hide();
            if (headerVVideo.get(0).muted == true) {
                btnVMute.show();
            } else {
                btnVSound.show();
            }
            headerVVideo.get(0).currentTime = 0;
            isPlay = true;
        });
    }

});