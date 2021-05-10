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
        sliderGe($("#episodeMovie"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
        sliderGe($("#recommendMovies"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
    }

    // Scroll
    scrollNav();
    function scrollNav() {
        var windowWidth = window.innerWidth;
        $(window).resize(function () {
            windowWidth = window.innerWidth;
        })
        $(window).scroll(function () {
            var movieH = $(".watch-movie__header");
            var currentScrollTop = $(this).scrollTop();
            console.log(movieH.outerHeight())
            if (currentScrollTop < movieH.outerHeight()) {
                $("#my-nav-watch").hide();
            } else {
                if(windowWidth < 740)
                    $("#my-nav-watch").css("display", "block");
                else
                    $("#my-nav-watch").css("display", "flex");
            }
        });
        
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
});