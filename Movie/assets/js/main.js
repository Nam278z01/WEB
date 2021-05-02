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
        hoverMovies();
        sliderGe($("#firstRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#topRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#secondRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#thirdRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#fourRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#fiveRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
        sliderGe($("#sixRow"), ".row__item-next", ".row__item-back", '.row__container-sc', ".row__img-link");
    }
    $(".header__video-name").on("webkitAnimationEnd", function () {
        $(this).css("transform", "scale(0.65)");
    });
    // Scroll nav
    var isStop = true;//Nếu cuộn dừng sẽ false
    var isPlay = true;//False cuộn sẽ ko chạy video --> hàm Hover_Video
    function scrollNav() {
        window.addEventListener('scroll', function (e) {
            const pos_body = $('html,body').scrollTop();
            const mVideo = $("#myVideo");
            const search = $("#search-wrap");
            if (pos_body > 400) {
                mVideo.get(0).pause();
                isStop = false;
            }
            if (pos_body < 200 && isPlay === true) {
                mVideo.get(0).play();
                isStop = true;
            }
            if (search.show()) {
                search.hide();
            }
        })
    }
    scrollNav();
    // ---------------
    const headerImg = $(".header__video-img")
    const headerVideo = $("#myVideo");
    const btnMute = $(".header-btn-i:first-child");
    const btnSound = $(".header-btn-i:nth-child(2)");
    const btnReplay = $(".header-btn-i:last-child");
    showVideo(headerImg, headerVideo, btnMute, btnSound, btnReplay, "imgActive");
    // ---------------
    //Bat tat video header
    setInterval(function () {
        if (headerVideo.get(0).currentTime >= headerVideo.get(0).duration - 13) {
            btnReplay.show();
            btnMute.hide();
            btnSound.hide();
            isPlay = false;
            headerImg.removeClass("imgActive");
            headerImg.removeClass("imgActiveSc");
            headerImg.show();
            headerVideo.get(0).pause();
            headerVideo.hide();
        }
    }, 10000);
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
    // Thêm vào mylist
    function addStorage() {
        $(".hover-movie__button--addlist").on('click', function (event) {
            var img = $(this).parent().parent().find(".hover-movie__img");
            var imgSrc = img.attr("src");
            var imgAlt = img.attr("alt");
            var number = imgSrc.substr(imgSrc.length - 7, 3);
            var movie = {
                src: number,
                alt: imgAlt 
            }
            var newMovie = "";
            var currentMyList = window.sessionStorage.getItem("movies");
            if (currentMyList) {
                newMovie = currentMyList + ',' + JSON.stringify(movie);
            } else {
                newMovie = JSON.stringify(movie);
            }
            window.sessionStorage.setItem("movies", newMovie);
        });
    }
    //hover phim
    function hoverMovies() {
        var myTimeout;
        var parent;
        var left;
        var width;
        var mySetInterVal;
        $(".row__img-link").mouseenter(function (e) {
            width = $(this).width();
            var image = $(this).find(".row__img")

            var src = image.attr("src");
            var number = src.substr(src.length - 7, 3);

            var checkMovie = image.attr("alt");
            var infoOne = checkMovie.split('|')[0];
            var infoSec = checkMovie.split('|')[2];
            var infoOther = infoOne == 0 ? `<div class="hover-movie__info">
                                                <span class="hm_info">2018</span>
                                                <span class="hm_info">1g 23p</span>
                                                <span class="hm_info">HD</span>
                                            </div>`
                                        : `<div class="hover-movie__info">
                                                <span class="hm_info">2018</span>
                                                <span class="hm_info">1 Mùa</span>
                                                <span class="hm_info">HD</span>
                                            </div>`;
            var btnAddRemove = infoSec == 0 ? `<button class="button hover-movie__button--addlist">
                                                    <i class="fas fa-plus"></i>
                                                    <span>Danh sách</span>
                                                </button>`
                : `<button class="button hover-movie__button--removelist">
                                                    <i class="fas fa-check"></i>
                                                    <span>Danh sách</span>
                                                </button>`;

            var hover = $("#hover");

            if (hover) {
                if (left < 50) {
                    hover.css("animation", "ZoomOut linear 0.15s");
                    hover.css("transform-origin", "0% 80%");

                } else if (left < $(window).width() - 300) {
                    hover.css("animation", "ZoomOut linear 0.15s");
                    hover.css("transform-origin", "50% 80%");

                } else {
                    hover.css("animation", "ZoomOut linear 0.15s");
                    hover.css("transform-origin", "100% 80%");
                }
                hover.on("webkitAnimationEnd", function () {
                    hover.remove();
                })
            }
            isPlay = false;
            var margin = $(window).width() * 3 / 100;
            left = $(this).offset().left;
            parent = $(this).parent().parent();
            myTimeout = setTimeout(function () {
                var addChild = `<div class="hover-movie" id="hover">
                                    <div class="hover-movie-link">
                                        <a href="#">
                                            <img src="./assets/img/image${number}.jpg" alt="${checkMovie}" class="hover-movie__img">
                                            <video id="hover-movie__video">
                                                <source src="./assets/video/video${number}.mp4" type="video/mp4">
                                            </video>
                                        </a>
                                        <img src="./assets/img/image_name${number}.png" alt="" class="hover-movie__video-name">
                                        <div class="hover-movie__btn">
                                            <button class="btn-icon hover-movie-btn-i fas fa-volume-mute"></button>
                                            <button class="btn-icon hover-movie-btn-i fas fa-volume-up"></button>
                                            <button class="btn-icon hover-movie-btn-i fas fa-undo"></button>
                                        </div>
                                    </div>
                                    <div class="hover-movie__button">
                                        <button class="button hover-movie__button--play">
                                            <i class="fas fa-play"></i>
                                            <span>Xem ngay</span>
                                        </button>`
                                            + btnAddRemove +
                                        `<button class="button hover-movie__button--moreinfo">
                                            <i class="fas fa-info-circle"></i>
                                            <span>Chi tiết</span>
                                        </button>
                                    </div>`
                                    +infoOther+
                                `</div>`;
                parent.after(addChild);
                var hoverAf = $("#hover");
                hoverAf.css("top", "-40px");
                if (left < 50) {
                    hoverAf.css("left", margin + "px");
                    hoverAf.css("transform-origin", "0% 80%");
                } else if (left < $(window).width() - 300) {
                    hoverAf.css("left", left - (400 - width) / 2 + "px");
                    hoverAf.css("transform-origin", "50% 80%");
                } else {
                    hoverAf.css("transform-origin", "100% 80%");
                    hoverAf.css("right", margin + "px");
                }
                $("#myVideo").get(0).pause();
                const hoverImg = $(".hover-movie__img");
                const hoverName = $(".hover-movie__video-name");
                const hoverVideo = $("#hover-movie__video");
                const btnHMute = $(".btn-icon.hover-movie-btn-i:first-child");
                const btnHSound = $(".btn-icon.hover-movie-btn-i:nth-child(2)");
                const btnHReplay = $(".btn-icon.hover-movie-btn-i:last-child");
                showVideo(hoverImg, hoverVideo, btnHMute, btnHSound, btnHReplay, "imgActiveHv", hoverName);
                mySetInterVal = setInterval(function () {
                    if (hoverVideo.get(0).currentTime >= hoverVideo.get(0).duration - 13) {
                        btnHReplay.show();
                        btnHMute.hide();
                        btnHSound.hide();
                        hoverImg.removeClass("imgActiveHv");
                        hoverImg.removeClass("imgActiveSc");
                        hoverImg.show();
                        hoverVideo.get(0).pause();
                        hoverVideo.hide();
                    }
                }, 10000);
            }, 800)
        }).mouseleave(function () {
            clearTimeout(myTimeout);
            clearInterval(mySetInterVal);
            isPlay = true;
            $("#hover").mouseenter(function () {
                isPlay = false;
            })
            $("#hover").mouseleave(function () {
                if (left < 50) {
                    $(this).css("animation", "ZoomOut linear 0.15s");
                    $(this).css("transform-origin", "0% 80%");
                } else if (left < $(window).width() - 300) {
                    $(this).css("animation", "ZoomOut linear 0.15s");
                    $(this).css("transform-origin", "50% 80%");
                } else {
                    $(this).css("animation", "ZoomOut linear 0.15s");
                    $(this).css("transform-origin", "100% 80%");
                }
                $(this).on("webkitAnimationEnd", function () {
                    $(this).remove();
                })
                isPlay = true;
                setTimeout(function () {
                    if (isStop) { //Nếu bị cuộn dừng sẽ tự động chạy lại video
                        $("#myVideo").get(0).play();
                    }
                }, 500);
            });
            addStorage();
        });
    }
    // hover hàng phim
    function hoverRowMovie(parent, button) {
        parent.hover(function () {
            button.css("transform", "translate(0)");
            button.css("display", "block");
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
        if(number < slideCount)
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
                console.log(slideWidth)

            }
            if (currentIdx >= slideCount - number) {
                setTimeout(() => {
                    $(this).hide();
                    slideRan.unbind();
                    hoverRowMovie(slideRan, childBtnBack);
                }, 400);
            }
            childBtnBack.css("transform", "translate(0)");
            childBtnBack.css("display", "block");
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
            childBtnNext.css("display", "block");
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
            alert("clm")
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
    })
    $(".button.button--moreinfo").click(function () {
        $("body").css("overflow", "hidden");
        $(".modal").show();
        sliderGe($("#recommendMovies"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
    })
    $(".row__img-link").click(function () {
        var src = $(this).find(".row__img").attr("src");
        var number = src.substr(src.length - 7, 3);
        $(".modal-movie__img").attr("src", "./assets/img/image_big" + number + ".jpg");
        $(".modal-movie__video-name").attr("src", "./assets/img/image_name" + number + ".png");
        $("#modal-movie__video").attr("src", "./assets/video/video" + number + ".mp4");
        $("body").css("overflow", "hidden");
        $(".modal").show();
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
});