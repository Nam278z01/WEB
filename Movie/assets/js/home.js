$(document).ready(function () {
    setTimeout(function () {
        $(".header__video-name").css("transform", "scale(0.6)");
    }, 6000)
    // Scroll nav
    var isStop = true;//Nếu cuộn dừng sẽ false
    var isPlay = true;//False cuộn sẽ ko chạy video --> hàm Hover_Video
    function scrollNav() {
        window.addEventListener('scroll', function (e) {
            const nav = document.getElementById('my-nav');
            const pos_body = $('html,body').scrollTop();
            const mVideo = $("#myVideo");
            const search = $("#search-wrap");
            // -----------
            if (pos_body > 50) {
                nav.style.backgroundColor = "var(--primary-color-fn)";
            }
            else {
                nav.style.backgroundColor = "transparent";
            }
            // -----------
            if (pos_body > 400) {
                mVideo.get(0).pause();
                isStop = false;
            }
            if (pos_body < 200 && isPlay === true) {
                mVideo.get(0).play();
                isStop = true;
            }
            // -----------
            if (search.show()) {
                search.hide();
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
    searchNav();
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
    // ---------------
    const headerImg = $(".header__video-img:first-child")
    const headerVideo = $("#myVideo");
    const btnMute = $(".header-btn-i:first-child");
    const btnSound = $(".header-btn-i:nth-child(2)");
    const btnReplay = $(".header-btn-i:last-child");
    function showVideo() {
        // -----------
        setTimeout(function () {
            headerImg.hide();
            headerVideo.show();
            headerVideo.get(0).play();
            btnSound.show();
        }, 3000);
        // Tat tieng video header
        btnSound.click(function (e) {
            $(this).hide();
            btnMute.show();
            headerVideo.prop('muted', true);
        });
        // Bat tieng video header
        btnMute.click(function (e) {
            $(this).hide();
            btnSound.show();
            headerVideo.prop('muted', false);
        });
        // Xem lai video header
        btnReplay.click(function (e) {
            $(this).hide();
            if (headerVideo.get(0).muted == true) {
                btnMute.show();
            } else {
                btnSound.show();
            }
            headerVideo.get(0).pause();
            headerVideo.get(0).currentTime = 0;
            headerVideo.get(0).play();
            isPlay = true;
            headerImg.hide();
            headerVideo.show();
        });
    }
    showVideo();
    function replayVideo() {
        // Bat tat video header
        setInterval(function () {
            if ($("#myVideo").get(0).currentTime >= $("#myVideo").get(0).duration - 10) {
                $(".header-btn-i:last-child").show();
                $(".header-btn-i:first-child").hide();
                $(".header-btn-i:nth-child(2)").hide();
                isPlay = false;
                headerImg.show();
                headerVideo.hide();
            }
        }, 10000);
    }
    replayVideo();
    //hover Home
    function hover_Home() {
        var myTimeout;
        var myTimeout2;
        var parent;
        $(".row__img-link").mouseenter(function (e) {
            var src = $(this).find(".row__img").attr("src");
            var number = src.charAt(src.length - 5);
            var hover = $("#hover");
            if (hover) {
                hover.remove();
            }
            isPlay = false;
            var margin = $(window).width() * 3 / 100;
            var left = $(this).offset().left;
            parent = $(this).parent().parent();
            myTimeout = setTimeout(function () {
                var addChild = `<div class="hover-movie" id="hover">
                                    <a href="#" class="hover-movie-link">
                                        <img src="./assets/img/image_big${number}.jpg" alt="" class="hover-movie__img">
                                        <video id="hover-movie__video">
                                            <source src="./assets/video/video1.mp4" type="video/mp4">
                                        </video>
                                        <img src="./assets/img/image_name${number}.png" alt="" class="hover-movie__video-name">
                                    </a>
                                    <div class="hover-movie__button">
                                        <button class="button hover-movie__button--play" title="Xem ngay Army of the dead">
                                            <i class="fas fa-play"></i>
                                            <span>Xem ngay</span>
                                        </button>
                                        <button class="button hover-movie__button--addlist" title="Thêm vào danh sách của tôi">
                                            <i class="fas fa-plus"></i>
                                            <span>Danh sách</span>
                                        </button>
                                        <button class="button hover-movie__button--moreinfo" href="#" title="Chi tiết Army of the dead">
                                            <i class="fas fa-info-circle"></i>
                                            <span>Chi tiết</span>
                                        </button>
                                    </div>
                                    <div class="hover-movie__info">
                                        <span class="hm_info">2018</span>
                                        <span class="hm_info">1g 23p</span>
                                        <span class="hm_info">HD</span>
                                    </div>
                                </div>`;
                parent.after(addChild);
                var hoverAf = $("#hover");
                hoverAf.css("top", "-55px");
                if (left < 50) {
                    hoverAf.css("left", margin + "px");
                    hoverAf.css("transform-origin", "left");
                } else if (left < $(window).width() - 300) {
                    hoverAf.css("left", left - 111 + 37 + "px");
                } else {
                    hoverAf.css("transform-origin", "right");
                    hoverAf.css("right", margin + "px");
                }
                $("#myVideo").get(0).pause();
                var hoverVideo = $("#hover-movie__video");
                myTimeout2 = setTimeout(function () {
                    $(".hover-movie__img").hide();
                    hoverVideo.show();
                    hoverVideo.get(0).play();
                }, 2000)
            }, 700)
        }).mouseleave(function () {
            clearTimeout(myTimeout);
            isPlay = true;
            $("#hover").mouseenter(function () {
                isPlay = false;
            })
            $("#hover").mouseleave(function () {
                clearTimeout(myTimeout2);
                $(this).remove();
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
    // -------------------
    function addStorage() {
        $(".hover-movie__button--addlist").on('click', function (event) {
            var movie = $(this).parent().parent().find(".hover-movie__img").attr("src");
            var number = movie.charAt(movie.length - 5);
            var newMovie = "";
            var currentMyList = window.sessionStorage.getItem("movies");
            if (sessionStorage.length > 1) {
                newMovie = currentMyList + ',' + JSON.stringify(number);
            } else {
                newMovie = JSON.stringify(number);
            }
            window.sessionStorage.setItem("movies", newMovie);
        });
    }
    //Only PC
    if ($(window).width() >= 1024) {
        hover_Home();
        //sliderHome();
        sliderGe($("#topRow"));
        sliderGe($("#secondRow"));
        sliderGe($("#thirdRow"));
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
    function sliderGe(slideRan, jump) {
        var childBtnNext = slideRan.children(".row__item-next"),
            childBtnBack = slideRan.children(".row__item-back");

        var slides = slideRan.children('.row__container-sc'),
            slide = slides.children(".row__img-link"),
            currentIdx = 0,
            marginSlide = 6,
            slideCount = slide.length,
            slideWidth = slide.width(),
            move = marginSlide + slideWidth;
        var newSlideWidth;
        var widthW = $(window).width();
        var number;
        if (widthW > 1023) {
            number = 5;
        } else if (widthW < 1024 && widthW > 739) {
            number = 4;
        } else if (widthW < 740 && widthW > 519) {
            number = 3;
        } else {
            number = 2;
        }

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
            widthW = $(window).width();
            if (widthW > 1023) {
                number = 5;
            } else if (widthW < 1024 && widthW > 739) {
                number = 4;
            } else if (widthW < 740 && widthW > 519) {
                number = 3;
            } else {
                number = 2;
            }
            newSlideWidth = slide.width();
            move = newSlideWidth + marginSlide;
            slides.css({ transition: '0s' })
            slides.css({ transform: 'translateX(calc(-' + move * currentIdx + 'px)' });
        });
    }
    // function sliderHome() {
    //     var childNext = $(".row__item-next"),
    //         childBack = $(".row__item-back");
        
    //     var slides,
    //         slide,
    //         currentIdx = 0,
    //         marginSlide = 6,
    //         slideCount,
    //         slideWidth,
    //         newSlideWidth,
    //         number,
    //         move;

    //     childNext.click(function () {
    //         var slidesClick = $(this).parent().children(".row__container-sc");
    //         slides = slidesClick;
    //         slide = slides.children(".row__img-link");
    //         slideCount = slide.length;
    //         slideWidth = slide.width();
    //         move = marginSlide + slideWidth;
    //         if (currentIdx <= slideCount - 6) {
    //             moveSlide(currentIdx + 1);
    //         }
    //     });

    //     childBack.click(function () {
    //         var slidesClick = $(this).parent().children(".row__container-sc");
    //         slides = slidesClick;
    //         slide = slides.children(".row__img-link");
    //         slideCount = slide.length;
    //         slideWidth = slide.width();
    //         if (currentIdx > 0) {
    //             moveSlide(currentIdx - 1);
    //         }
    //     });

    //     function moveSlide(index) {
    //         slides.css({ transition: 'all linear' })
    //         slides.css({ transition: '0.5s' })
    //         slides.css({ transform: 'translateX(calc(-' + move * index + 'px)' });
    //         currentIdx = index;
    //     }

    //     // Responsive slider
    //     $(window).resize(function () {
    //         newSlideWidth = slide.width();
    //         move = newSlideWidth + marginSlide;
    //         slides.css({ transition: '0s' })
    //         slides.css({ transform: 'translateX(calc(-' + move * currentIdx + 'px)' });
    //         console.log(move);
            
    //     });
    // }
    
    //console.log($(".row__container").get(0))
});