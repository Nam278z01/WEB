$(document).ready(function () {
    ClearArr()
    addList()

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
    }

    function addList() {
        ClearArr();
        var myNewList = "";
        var movies = sessionStorage.getItem("myList");
        if (movies) {
            var data = JSON.parse(movies);
            var quantity = data.length;
            for (var i = 0; i < quantity; i++) {
                let dateElement = data[i].name.split('|');
                let nameMovie = dateElement[1] ? dateElement[1] : dateElement[0]

                let detail = data[i].isMovie == false ? `<div class="row__name row__name-tvshow">
                                    <span>${nameMovie}</span>
                                    <div class="row__detail">
                                        <div class="row__detail-left">
                                            <span>2021</span>
                                            <span>1 Mùa</span>
                                        </div>
                                        <span class="btn-genres">Phim Bộ</span>
                                    </div>
                                </div>` : `<div class="row__name row__name-movies">
                                    <span>${nameMovie}</span>
                                    <div class="row__detail">
                                        <div class="row__detail-left">
                                            <span>2021</span>
                                            <span>90ph</span>
                                        </div>
                                        <span class="btn-genres">Phim Lẻ</span>
                                    </div>
                                </div>`;

                var myListItem = data[i].isVip == false ?
                    `<div class="row__img-link row__img-link-ge" data-movie="${data[i].id}">
                                            <div class="row__wrap ratioImg__wrap">
                                                <img src="./assets/img/image${data[i].id}.jpg" alt="" class="row__img ratio__in">
                                            </div>` + detail +
                    `</div>` :
                    `<div class="row__img-link row__img-link-ge" data-movie="${data[i].id}">
                                            <div class="row__wrap ratioImg__wrap">
                                                <img src="./assets/img/image${data[i].id}.jpg" alt="" class="row__img ratio__in">
                                                <img src="./assets/img/iconvip.png" alt="vip" class="movies-vip">
                                            </div>`+ detail +
                    `</div>`;
                myNewList += myListItem;
            }
        }
        $("#myList").append(myNewList);
    }

    // Xóa giá trị null trong session
    function ClearArr() {
        let movies = sessionStorage.getItem("myList");
        if (movies) {
            let data = JSON.parse(movies);
            let newMovies = data.filter(function (value) {
                return value != null;
            })
            window.sessionStorage.setItem("myList", JSON.stringify(newMovies));
        }
    }

    function addStorage(btn, dataNew, pos, idInput, RowLink) {
        btn.on('click', function () {
            let dataElement = dataNew[pos]

            let icon = $(this).children(".bx");

            if (!dataElement.isMyList) {
                icon.removeClass("bx-plus").addClass("bx-check");

                dataNew[pos].isMyList = true
                window.sessionStorage.setItem("allMovies", JSON.stringify(dataNew));

                var newMovie = [];
                let currentMyList = window.sessionStorage.getItem("myList");

                if (currentMyList) {
                    let check = true;
                    let data = JSON.parse(currentMyList);
                    let count = data.length;
                    for (var i = 0; i < count; i++) {
                        // Nếu có xóa thì chèn vào vùng bị xóa
                        if (!data[i]) {
                            data[i] = dataNew[pos];
                            check = false
                        }
                    }
                    // Nếu ko xóa thì cộng như bth
                    if (check) {
                        data.unshift(dataElement);
                    }
                    newMovie = data;
                } else {
                    newMovie.unshift(dataElement);
                }
                window.sessionStorage.setItem("myList", JSON.stringify(newMovie));

                if (RowLink) {
                    if (RowLink.parent().parent().is("#myListWrap")) {
                        RowLink.show();
                    }
                }
            }
            else {
                icon.removeClass("bx-check").addClass("bx-plus");

                dataNew[pos].isMyList = false
                window.sessionStorage.setItem("allMovies", JSON.stringify(dataNew));

                let currentMyList = window.sessionStorage.getItem("myList");
                let data = JSON.parse(currentMyList);

                let count = data.length;
                for (var i = 0; i < count; i++) {
                    if (data[i].id == idInput) {
                        delete data[i];
                        break;
                    }
                }
                window.sessionStorage.setItem("myList", JSON.stringify(data));

                if (RowLink) {
                    if (RowLink.parent().parent().is("#myListWrap")) {
                        RowLink.hide();
                    }
                }
            }
        });
    }

    function showVideo(headerVImg, headerVVideo, btnVMute, btnVSound, btnVReplay, addClassA, movieName) {
        headerVImg.addClass(addClassA);
        headerVVideo.hide();
        headerVVideo.get(0).pause();
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
        });
    }

    //hover phim
    function hoverMovies() {
        var myTimeout
        var parent
        var left
        var width
        var mySetInterVal
        var image
        $(".row__img-link-ge").mouseenter(function (e) {
            width = $(this).width();
            image = $(this).find(".row__img")
            let main = $(this)

            let data = sessionStorage.getItem("allMovies")
            let dataArr = JSON.parse(data)

            var id = $(this).attr("data-movie")
            let isMovie
            let isMyList
            let isComing
            let isVip

            let dataArrLength = dataArr.length
            let posElement
            for (let i = 0; i < dataArrLength; i++) {
                if (dataArr[i].id == id) {
                    isMovie = dataArr[i].isMovie
                    isMyList = dataArr[i].isMyList
                    isComing = dataArr[i].isComing
                    isVip = dataArr[i].isVip
                    posElement = i
                    break
                }
            }

            var infoOther = isMovie == true ? `<div class="hover-movie__info">
                                                <div>
                                                    <span class="hm_info">2021</span>
                                                    <span class="hm_info">90ph</span>
                                                </div>
                                                <div>
                                                    <span class="hm_info">Khoa học viễn tưởng</span>
                                                    <span class="hm_info">Hành động</span>
                                                </div>
                                            </div>`
                : `<div class="hover-movie__info">
                <div>
                    <span class="hm_info">2021</span>
                    <span class="hm_info">1 Mùa</span>
                </div>
                <div>
                                                    <span class="hm_info">Khoa học viễn tưởng</span>
                                                    <span class="hm_info">Hành động</span>
                                                </div>
                </div >`;


            var btnAddRemove = isMyList == false ? `<button class="button hover-movie__button--add-removeList">
                                                    <i class="bx bx-plus"></i>
                                                    <span>Danh sách</span>
                                                </button>`
                : `<button class="button hover-movie__button--add-removeList">
                                                    <i class="bx bx-check"></i>
                                                    <span>Danh sách</span>
                                                </button>`;

            var btn = `<button class="button hover-movie__button--play">
                                            <i class="bx bxs-right-arrow"></i>
                                            <span>Xem ngay</span>
                                        </button>` + btnAddRemove + `<button class="button hover-movie__button--moreinfo">
                                                                        <i class="bx bx-info-circle"></i>
                                                                        <span>Chi tiết</span>
                                                                     </button>`;
            if (isComing) {
                btn = `<button class="button hover-movie__button--remind">
                                            <i class="far fa-bell"></i>
                                            <span>Đặt lời nhắc</span>
                                        </button>` + `<button class="button hover-movie__button--moreinfo remind">
                                                                        <i class="bx bx-info-circle"></i>
                                                                        <span>Chi tiết</span>
                                                                     </button>`;
            }

            var hover = $("#hover");

            if (hover) {
                if (left < 50) {
                    hover.css("--scale", width / 400)
                    hover.css("animation", "ZoomOut linear 0.15s");
                    hover.css("transform-origin", "0%" + (image.height() / 225 * 100) + " %");
                } else if (left < $(window).width() - 300) {
                    hover.css("--scale", width / 400)
                    hover.css("animation", "ZoomOut linear 0.15s");
                    hover.css("transform-origin", "50% " + (image.height() / 225 * 100) + "%");
                } else {
                    hover.css("--scale", width / 400)
                    hover.css("animation", "ZoomOut linear 0.15s");
                    hover.css("transform-origin", "100%" + (image.height() / 225 * 100) + "%");
                }
                hover.on("webkitAnimationEnd", function () {
                    hover.remove();
                    // hover.css("transform", "scale(" + width / 400 + ")")
                })
            }

            var margin = $(window).width() * 3 / 100;
            left = $(this).offset().left;
            var top = $(this).offset().top - 190;
            parent = $(this).parent().parent();
            myTimeout = setTimeout(function () {
                var addChild = `<div class="hover-movie" id="hover">
                                    <div class="hover-movie-link ratio16-9__wrap">
                                        <a href="#">
                                            <img src="./assets/img/image${id}.jpg" alt="" class="hover-movie__img ratio__in">
                                            <video id="hover-movie__video" class="ratio__in">
                                                <source src="./assets/video/video${id}.mp4" type="video/mp4">
                                            </video>
                                        </a>
                                        <img src="./assets/img/image_name${id}.png" alt="" class="hover-movie__video-name">
                                        <div class="hover-movie__btn">
                                            <button class="btn-icon hover-movie-btn-i fas fa-volume-mute"></button>
                                            <button class="btn-icon hover-movie-btn-i fas fa-volume-up"></button>
                                            <button class="btn-icon hover-movie-btn-i fas fa-undo"></button>
                                        </div>
                                    </div>
                                    <div class="hover-movie__button">`+ btn +
                    `</div>`
                    + infoOther +
                    `</div>`;
                parent.after(addChild);

                showModalMoviesWhenClickDetail($(".hover-movie__button--moreinfo"), main)

                var hoverAf = $("#hover");

                if (left < 50) {
                    hoverAf.css("--growF", width / 400)
                    hoverAf.css("animation", "growth ease-in 0.2s")
                    hoverAf.css("left", margin + "px");
                    hoverAf.css("transform-origin", "0% " + (image.height() / 225 * 100) + "%");
                    hoverAf.css("top", top + "px");
                } else if (left < $(window).width() - 300) {
                    hoverAf.css("--growF", width / 400)
                    hoverAf.css("animation", "growth ease-in 0.2s")
                    hoverAf.css("left", left - (400 - width) / 2 + "px");
                    hoverAf.css("top", top + "px");
                    hoverAf.css("transform-origin", "50% " + (image.height() / 225 * 100) + "%");
                } else {
                    hoverAf.css("--growF", width / 400)
                    hoverAf.css("animation", "growth ease-in 0.2s")
                    hoverAf.css("transform-origin", "100% " + (image.height() / 225 * 100) + "%");
                    hoverAf.css("top", top + "px");
                    hoverAf.css("right", margin + "px");
                }

                const hoverImg = $(".hover-movie__img");
                const hoverName = $(".hover-movie__video-name");
                const hoverVideo = $("#hover-movie__video");
                const btnHMute = $(".btn-icon.hover-movie-btn-i:first-child");
                const btnHSound = $(".btn-icon.hover-movie-btn-i:nth-child(2)");
                const btnHReplay = $(".btn-icon.hover-movie-btn-i:last-child");
                showVideo(hoverImg, hoverVideo, btnHMute, btnHSound, btnHReplay, "imgActiveHv", hoverName);
                mySetInterVal = setInterval(function () {
                    if (hoverVideo.get(0).currentTime >= hoverVideo.get(0).duration - 10) {
                        btnHReplay.show();
                        btnHMute.hide();
                        btnHSound.hide();
                        if (hoverImg.hasClass("imgActive"))
                            hoverImg.removeClass("imgActive");
                        if (hoverImg.hasClass("imgActiveSc"))
                            hoverImg.removeClass("imgActiveSc");
                        if (hoverImg.hasClass("imgActiveHv"))
                            hoverImg.removeClass("imgActiveHv");
                        hoverImg.show();
                        hoverVideo.get(0).pause();
                        hoverVideo.hide();
                    }
                }, 10000);

                addStorage($(".hover-movie__button--add-removeList"), dataArr, posElement, id, main);

            }, 800)
        }).mouseleave(function () {
            clearTimeout(myTimeout);
            clearInterval(mySetInterVal);
            $("#hover").mouseleave(function () {
                if (left < 50) {
                    $(this).css("--scale", width / 400)
                    $(this).css("animation", "ZoomOut linear 0.15s");
                    $(this).css("transform-origin", "0%" + (image.height() / 225 * 100) + " %");
                } else if (left < $(window).width() - 300) {
                    $(this).css("--scale", width / 400)
                    $(this).css("animation", "ZoomOut linear 0.15s");
                    $(this).css("transform-origin", "50% " + (image.height() / 225 * 100) + "%");
                } else {
                    $(this).css("--scale", width / 400)
                    $(this).css("animation", "ZoomOut linear 0.15s");
                    $(this).css("transform-origin", "100%" + (image.height() / 225 * 100) + "%");
                }
                $(this).on("webkitAnimationEnd", function () {
                    $(this).remove();
                    // $(this).css("transform", "scale(" + width/400 + ")" )
                })
                ClearArr();
            });
        });
    }

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
    function hoverRowMovie(parent, button) {
        parent.hover(function () {
            button.css("transform", "translate(0)");
            button.css("display", "flex");
        }, function () {
            button.css("transform", "translate(-100%)");
            button.css("display", "none");
        });
    }

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

    function ShowWhenReset() {
        var getID = window.location.search;
        const urlParams = new URLSearchParams(getID);
        var getID = urlParams.get('movie');
        if (getID) {
            $(".row__img-link").each(function () {
                let number = $(this).attr("data-movie")
                if (number == getID) {
                    showModalMovies(getID, $(this))
                    return false
                }
            })
            isStopByModal = true;
        }
    }

    showModalMoviesWhenClickIMG()
    ShowWhenReset();
    selectSeason();

    function showModalMoviesWhenClickIMG() {
        $(".row__img-link").click(function () {
            isStopByModal = true;
            // Xóa nếu đã tồn tại modal
            let modal_movies = $(".modal__body .modal-movie");
            if (modal_movies.length > 0) {
                modal_movies.remove();
            }
            //isPlayModal = false;
            let video = $("#myVideo");
            if (video.length > 0)
                video.get(0).pause();
            // Tạo parameter
            let url = new URL(window.location.href);
            let number;
            number = $(this).attr("data-movie")
            url.searchParams.append("movie", number);
            window.history.pushState(null, null, url);
            // Lấy value của parameter
            let id = window.location.search;
            const urlParams = new URLSearchParams(id);
            id = urlParams.get('movie');
            showModalMovies(id, $(this));
        })
    }

    function showModalMoviesWhenClickDetail(btn, RowLink) {
        btn.click(function () {
            isStopByModal = true;
            // Xóa nếu đã tồn tại modal
            let modal_movies = $(".modal__body .modal-movie");
            if (modal_movies.length > 0) {
                modal_movies.remove();
            }
            //isPlayModal = false;
            let video = $("#myVideo");
            if (video.length > 0)
                video.get(0).pause();
            // Tạo parameter
            let url = new URL(window.location.href);
            let number;
            if (RowLink) {
                number = RowLink.attr("data-movie")
            }
            else {
                number = btn.attr("data-movie")
            }
            url.searchParams.append("movie", number);
            window.history.pushState(null, null, url);
            // Lấy value của parameter
            let id = window.location.search;
            const urlParams = new URLSearchParams(id);
            id = urlParams.get('movie');
            showModalMovies(id, RowLink);
        })
    }

    function showModalMovies(IdMovies, RowLink) {
        let data = sessionStorage.getItem("allMovies")
        let dataArr = JSON.parse(data)
        let dataWantToShow

        let dataArrLength = dataArr.length
        let posElement
        for (let i = 0; i < dataArrLength; i++) {
            if (dataArr[i].id == IdMovies) {
                dataWantToShow = dataArr[i]
                posElement = i
                break
            }
        }

        let btnAddOrRemove = dataWantToShow.isMyList == false ? `<button class="button modal-movie__button--add-remove">
                                                    <i class="bx bx-plus"></i>
                                                    <span>Danh sách</span>
                                                </button>` :
            `<button class="button modal-movie__button--add-remove">
                            <i class="bx bx-check"></i>
                            <span>Danh sách</span>
                        </button>`;

        let btn = `<button class="button modal-movie__button--play">
                            <i class="bx bxs-right-arrow"></i>
                            <span>Xem ngay</span>
                        </button>`+ btnAddOrRemove;

        if (dataWantToShow.isComing) {
            btn = `<button class="button modal-movie__button--remind">
                                            <i class="far fa-bell"></i>
                                            <span>Đặt lời nhắc</span>
                                        </button>`;
        }

        let episode = dataWantToShow.isMovie == true ? "" : `<div class="modal__movies-episodes">
                    <div class="modal__movies-ep-first">
                        <div class="movies-ep-title">
                            Danh sách tập
                        </div>
                        <div class="movies-ep-season">
                            <button class="button" id="movie-btn-seasons">
                                <span class="seasonCurrent">Mùa 1</span>
                                <span class="season-icon"></span>
                            </button>
                            <ul class="movies-menu-seasons">
                                <li class="movies-season">
                                    <span class="movies-season__name">Mùa 1</span>
                                    <span class="movies-season__ep">(7 tập)</span>
                                </li>
                                <li class="movies-season">
                                    <span class="movies-season__name">Mùa 2</span>
                                    <span class="movies-season__ep">(13 tập)</span>
                                </li>
                                <li class="movies-season">
                                    <span class="movies-season__name">Mùa 3</span>
                                    <span class="movies-season__ep">(13 tập)</span>
                                </li>
                                <li class="movies-season">
                                    <span class="movies-season__name">Mùa 4</span>
                                    <span class="movies-season__ep">(13 tập)</span>
                                </li>
                                <li class="movies-season">
                                    <span class="movies-season__name">Mùa 5</span>
                                    <span class="movies-season__ep">(16 tập)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal__movies-ep-second" id="episodeMovie">
                        <button
                            class="btn-icon fas fa-chevron-left row__item-back modal-recommend__item-back"></button>
                        <button
                            class="btn-icon fas fa-chevron-right row__item-next modal-recommend__item-next"></button>
                        <div class="modal-recommend__container-sc">
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                        <img src="./assets/img/image_season1_ep01_035.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="episode-movies__info episode__info">
                                        <p class="episode-name">[Mùa 1] Tập 1. Tập thử nghiệm</p>
                                        <div class="row__detail-left">
                                            <span>2021</span>
                                            <span>90ph</span>
                                        </div>
                                        <span class="episode__description">
                                            Bị chẩn đoán mắc ung thư phổi giai đoạn cuối, một giáo viên dạy hóa ở
                                            trường trung học phải viện đến cách chế biến và
                                            bán kẹo để nuôi gia đình.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                        <img src="./assets/img/image_season1_ep02_035.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="episode-movies__info episode__info">
                                        <p class="episode-name">[Mùa 1] Tập 2. Bí mật được giấu kín</p>
                                       <div class="row__detail-left">
                                            <span>2021</span>
                                            <span>90ph</span>
                                        </div>
                                        <span class="episode__description">
                                            Phi vụ buôn bán kẹo đầu tiên bị hủy bỏ khiến Walt và Jesse phải xử lý
                                            hai xác chết. Trong lúc đó, Skyler nghi ngờ
                                            chồng mình đang âm mưu làm chuyện xấu.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                        <img src="./assets/img/image_season1_ep03_035.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="episode-movies__info">
                                        <p class="episode-name">[Mùa 1] Tập 3. Lo liệu trót lọt</p>
                                        <div class="row__detail-left">
                                            <span>2021</span>
                                            <span>90ph</span>
                                        </div>
                                        <span class="episode__description">
                                            Khi Walt xử lý các rắc rối sót lại từ phi vụ buôn bán kẹo đầu tiên,
                                            Skyler suýt biết được sự thật về cuộc sống bí mật
                                            của ông.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                        <img src="./assets/img/image_season1_ep04_035.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="episode-movies__info">
                                        <p class="episode-name">[Mùa 1] Tập 4. Người đàn ông bị ung thư</p>
                                        <div class="row__detail-left">
                                            <span>2021</span>
                                            <span>90ph</span>
                                        </div>
                                        <span class="episode__description">
                                            Việc bị buộc tiết lộ bí mật về bệnh tình của mình khiến Walt đối mặt với
                                            vấn đề nan giải về cách chi trả một loạt phương
                                            pháp điều trị ung thư đắt đỏ.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                        <img src="./assets/img/image_season1_ep05_035.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="episode-movies__info">
                                        <p class="episode-name">[Mùa 1] Tập 5. Chất xám</p>
                                        <div class="row__detail-left">
                                            <span>2021</span>
                                            <span>90ph</span>
                                        </div>
                                        <span class="episode__description">
                                            Skyler tổ chức một buổi can thiệp để thuyết phục Walt chấp nhận đề nghị
                                            đầy hào phóng từ cộng sự nghiên cứu trước đây
                                            của ông về việc chi trả chi phí điều trị ung thư.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                        <img src="./assets/img/image_season1_ep06_035.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="episode-movies__info">
                                        <p class="episode-name">[Mùa 1] Tập 6. Một bộ chẳng có gì ư?</p>
                                        <div class="row__detail-left">
                                            <span>2021</span>
                                            <span>90ph</span>
                                        </div>
                                        <span class="episode__description">
                                            Khi những tác dụng phụ và chi phí điều trị gia tăng, Walt đòi Jesse tìm
                                            nhà buôn để mua kẹo của họ... điều này đẩy
                                            ông tới rắc rối.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                        <img src="./assets/img/image_season1_ep07_035.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="episode-movies__info">
                                        <p class="episode-name">[Mùa 1] Tập 7. Phi vụ phi bạo lực</p>
                                        <div class="row__detail-left">
                                            <span>2021</span>
                                            <span>90ph</span>
                                        </div>
                                        <span class="episode__description">
                                            Sau khi Jesse suýt mất mạng, Walt đồng ý sản xuất nhiều ma túy hơn nữa
                                            cho tay Tuco tàn nhẫn. Trong lúc đó, Skyler nghi
                                            ngờ em gái mình thó đồ.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;


        var infoLeftSecond;
        if (!dataWantToShow.isMovie) {
            if (dataWantToShow.isVip) {
                var infoLeftSecond = `<div class="info-left__second">
                                        <img src="./assets/img/iconvip.png" alt="vip" class="modal-movies-vip">
                                    <span>2021</span>
                                    <span>5 Mùa</span>
                                </div>`;
            }
            else {
                var infoLeftSecond = `<div class="info-left__second">
                                        <span>2021</span>
                                        <span>5 Mùa</span>
                                    </div>`;
            }
        }
        else {
            if (dataWantToShow.isVip) {
                var infoLeftSecond = `<div class="info-left__second">
                                        <img src="./assets/img/iconvip.png" alt="vip" class="modal-movies-vip">
                                    <span>2021</span>
                                    <span>180ph</span>
                                </div>`;
            }
            else {
                var infoLeftSecond = `<div class="info-left__second">
                                        <span>2021</span>
                                        <span>180ph</span>
                                    </div>`;
            }
        }

        var modalMovies = `<div class="modal-movie">
            <div class="modal-turnoff fas fa-times"></div>
            <div class="modal-movie__header">
                <div class="hover-movie-link modal-movie-link ratio16-9__wrap">
                    <img src="./assets/img/image_big${dataWantToShow.id}.jpg" alt="" class="modal-movie__img ratio__in">
                    <video id="modal-movie__video" class="ratio__in">
                        <source src="./assets/video/video${dataWantToShow.id}.mp4" type="video/mp4">
                    </video>
                </div>
                <div class="header-movie__content">
                    <img src="./assets/img/image_name${dataWantToShow.id}.png" alt="" class="modal-movie__video-name">
                    <div class="modal-movie__button">`
            + btn +
            `</div>
                </div>
                <div class="header-movie__btn">
                    <button class="btn-icon header-movie-btn-i fas fa-volume-mute"></button>
                    <button class="btn-icon header-movie-btn-i fas fa-volume-up"></button>
                    <button class="btn-icon header-movie-btn-i fas fa-undo"></button>
                </div>
            </div>
            <div class="modal-video-content">
                <div class="modal-video__info">
                    <div class="modal-video__info-left">
                        <div class="info-left__first">
                            <span class="info__views">532.632 lượt xem</span>
                            <div class="info__point-vote">
                                <span class="info__point">4.5</span>
                                <div class="info__vote">
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                    <i class="far fa-star"></i>
                                </div>
                            </div>
                        </div>`
            + infoLeftSecond +
            `<p class="info-left__main">
                            Một giáo viên dạy hóa ở trường trung học mắc bệnh ung thư bắt tay với một cựu học sinh
                            để bảo vệ tương lai của gia đình
                            bằng cách sản xuất và bán kẹo.
                        </p>
                    </div>
                    <div class="modal-video__info-right">
                        <div class="info-right__first">
                            <a href="#modal__comment" class="info-right-comment">
                                <i class="far fa-comment-dots"></i>
                                <span>Bình luận</span>
                            </a>
                            <div class="info-right-share">
                                <i class="far fa-share-square"></i>
                                <span>Chia sẻ</span>
                            </div>
                        </div>
                        <div class="info-right__actors">
                            <label for="" class="info-right-group">Diễn viên:</label>
                            <a href="#" class="info-right-link info-right__actor">Jason Momoa</a>,
                            <a href="#" class="info-right-link info-right__actor">Henry Cavill</a>,
                            <a href="#" class="info-right-link info-right__actor">Ray Fisher</a>,
                            <a href="#" class="info-right-link info-right__actor">Ezra Miller</a>,
                            <a href="#" class="info-right-link info-right__actor">Amy Adams</a>,
                            <a href="#" class="info-right-link info-right__actor">Ben Affleck</a>,
                            <a href="#" class="info-right-link info-right__actor">Jared Leto</a>,
                            <a href="#" class="info-right-link info-right__actor">Gal Gadot</a>
                        </div>
                        <div class="info-right__directors">
                            <label for="" class="info-right-group">Đạo diễn:</label>
                            <a href="#" class="info-right-link info-right__director">Zack Snyder</a>
                        </div>
                        <div class="info-right__genres">
                            <label for="" class="info-right-group">Thể loại:</label>
                            <a href="#" class="info-right-link info-right__genre">Khoa học viễn tưởng</a>,
                            <a href="#" class="info-right-link info-right__genre">Hành động</a>
                        </div>
                    </div>
                </div>`
            + episode +
            `<div class="modal-video__recommend">
                    <div class="modal-recommend__header">
                        <span>Đề xuất cho bạn</span>
                    </div>
                    <div class="modal-recommend__container" id="recommendMovies">
                        <button
                            class="btn-icon fas fa-chevron-left row__item-back modal-recommend__item-back"></button>
                        <button
                            class="btn-icon fas fa-chevron-right row__item-next modal-recommend__item-next"></button>
                        <div class="modal-recommend__container-sc">
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img">
                                        <img src="./assets/img/image_doc040.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="recommend-movies__info">
                                        <div class="recommend-movies__info-first">
                                            <div class="recommend-movies__info-first">
                                            <span>Bố già</span>
                                            <div class="row__detail">
                                                <div class="row__detail-left">
                                                    <span>2021</span>
                                                    <span>90ph</span>
                                                </div>
                                                <span class="btn-genres">Phim Lẻ</span>
                                            </div>
                                        </div>
                                        </div>
                                        <span>
                                            Khi bố già đứng đầu gia đình tội phạm có tổ chức suýt chết trong vụ ám
                                            sát, con trai út của ông đã đứng ra xử lý những
                                            kẻ nhúng tay vào âm mưu bất thành này.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img">
                                        <img src="./assets/img/image_doc041.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="recommend-movies__info">
                                        <div class="recommend-movies__info-first">
                                            <div class="recommend-movies__info-first">
                                            <span>Shadow and Bone</span>
                                            <div class="row__detail">
                                                <div class="row__detail-left">
                                                    <span>2021</span>
                                                    <span>90ph</span>
                                                </div>
                                                <span class="btn-genres">Phim Bộ</span>
                                            </div>
                                        </div>
                                        </div>
                                        <span>
                                            Các thế lực hắc ám mưu hại lính vẽ bản đồ mồ côi Alina Starkov khi cô
                                            cho thấy sức mạnh phi thường có thể thay đổi số
                                            phận của thế giới bị chiến tranh tàn phá.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img">
                                        <img src="./assets/img/image_doc042.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="recommend-movies__info">
                                        <div class="recommend-movies__info-first">
                                            <div class="recommend-movies__info-first">
                                            <span>Transformer</span>
                                            <div class="row__detail">
                                                <div class="row__detail-left">
                                                    <span>2021</span>
                                                    <span>90ph</span>
                                                </div>
                                                <span class="btn-genres">Phim Lẻ</span>
                                            </div>
                                        </div>
                                        </div>
                                        <span>
                                            Năm năm sau khi Chicago bị hủy diệt, con người quay lưng lại với tất cả
                                            robot. Nhưng một người cha đơn thân kiêm nhà
                                            phát minh đã phục hồi chú robot có thể cứu thế giới.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img">
                                        <img src="./assets/img/image_doc043.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="recommend-movies__info">
                                        <div class="recommend-movies__info-first">
                                            <div class="recommend-movies__info-first">
                                            <span>Shazam</span>
                                            <div class="row__detail">
                                                <div class="row__detail-left">
                                                    <span>2021</span>
                                                    <span>90ph</span>
                                                </div>
                                                <span class="btn-genres">Phim Lẻ</span>
                                            </div>
                                        </div>
                                        </div>
                                        <span>
                                            Khi thiếu niên mồ côi bộc lộ trái tim chân thành, cậu có được khả năng
                                            biến thành một siêu anh hùng người lớn với nghĩa
                                            vụ bảo vệ thành phố trước những ác nhân tội lỗi.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img">
                                        <img src="./assets/img/image_doc047.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="recommend-movies__info">
                                        <div class="recommend-movies__info-first">
                                            <div class="recommend-movies__info-first">
                                            <span>Chạng vạng</span>
                                            <div class="row__detail">
                                                <div class="row__detail-left">
                                                    <span>2021</span>
                                                    <span>90ph</span>
                                                </div>
                                                <span class="btn-genres">Phim Lẻ</span>
                                            </div>
                                        </div>
                                        </div>
                                        <span>
                                            Trong chương cuối của loạt phim cuốn hút này, Bella và Edward buộc phải
                                            bước vào cuộc đối đầu có khả năng thay đổi đại
                                            cục trước nhà Volturi vì cô con gái mới ra đời.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img">
                                        <img src="./assets/img/image_doc015.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="recommend-movies__info">
                                        <div class="recommend-movies__info-first">
                                           <div class="recommend-movies__info-first">
                                            <span>Tình yêu và quái vật</span>
                                            <div class="row__detail">
                                                <div class="row__detail-left">
                                                    <span>2021</span>
                                                    <span>90ph</span>
                                                </div>
                                                <span class="btn-genres">Phim Lẻ</span>
                                            </div>
                                        </div>
                                        </div>
                                        <span>
                                            Bảy năm kể từ ngày sống sót qua tận thế quái vật, Joel xui xẻo dễ mến
                                            rời khỏi hầm trú ẩn ấm cúng dưới lòng đất để tìm
                                            cách đoàn tụ với người yêu cũ.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img">
                                        <img src="./assets/img/image_doc045.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="recommend-movies__info">
                                        <div class="recommend-movies__info-first">
                                            <div class="recommend-movies__info-first">
                                            <span>Homuncolus</span>
                                            <div class="row__detail">
                                                <div class="row__detail-left">
                                                    <span>2021</span>
                                                    <span>90ph</span>
                                                </div>
                                                <span class="btn-genres">Phim Lẻ</span>
                                            </div>
                                        </div>
                                        </div>
                                        <span>
                                            Thật giả lẫn lộn khi người vô gia cư mất trí nhớ nọ tỉnh dậy sau một thủ
                                            thuật y tế thử nghiệm và có thể nhìn thấy những
                                            tổn thương sâu thẳm nhất trong mọi người.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img">
                                        <img src="./assets/img/image_doc046.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="recommend-movies__info">
                                        <div class="recommend-movies__info-first">
                                            <div class="recommend-movies__info-first">
                                            <span>The dead don't die</span>
                                            <div class="row__detail">
                                                <div class="row__detail-left">
                                                    <span>2021</span>
                                                    <span>90ph</span>
                                                </div>
                                                <span class="btn-genres">Phim Lẻ</span>
                                            </div>
                                        </div>
                                        </div>
                                        <span>
                                            Một sự kiện trong vũ trụ khiến người chết trỗi dậy ở thành phố
                                            Centerville vốn dĩ phẳng lặng. Cảnh sát trưởng và cấp
                                            dưới khó khăn kiểm soát tình hình.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img">
                                        <img src="./assets/img/image_doc048.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="recommend-movies__info">
                                        <div class="recommend-movies__info-first">
                                            <div class="recommend-movies__info-first">
                                            <span>Minions</span>
                                            <div class="row__detail">
                                                <div class="row__detail-left">
                                                    <span>2021</span>
                                                    <span>90ph</span>
                                                </div>
                                                <span class="btn-genres">Phim Lẻ</span>
                                            </div>
                                        </div>
                                        </div>
                                        <span>
                                            Phần tiền truyện này xoay quanh câu chuyện về lịch sử phụng sự ác nhân
                                            của các tay sai màu vàng chuối có ngôn ngữ nhí
                                            nhéo từ "Kẻ trộm mặt trăng".
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-recommend__img-link">
                                <div class="modal-recommend__wrap">
                                    <div class="modal-recommend__wrap-img">
                                        <img src="./assets/img/image_doc044.jpg" alt=""
                                            class="modal-recommend__img">
                                        <div class="modal-recommend__link">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                    <div class="recommend-movies__info">
                                        <div class="recommend-movies__info-first">
                                            <span>Jumanij</span>
                                            <div class="row__detail">
                                                <div class="row__detail-left">
                                                    <span>2021</span>
                                                    <span>90ph</span>
                                                </div>
                                                <span class="btn-genres">Phim Lẻ</span>
                                            </div>
                                        </div>
                                        <span>
                                            Bốn học sinh trung học bị kéo vào bối cảnh rừng rậm của 1 trò chơi điện
                                            tử và dấn thân vào cuộc phiêu lưu, sau khi bị
                                            biến thành những nhân vật trò chơi mà họ từng chọn.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-video__comment" id="modal__comment">
                    <div>
                        <span class="comment-title">Bình luận</span>
                    </div>
                    <div class="formComment">
                        <form class="myformComment">
                            <div class="myAvatar">
                                <i class="fas fa-user-tie"></i>
                            </div>
                            <div class="field">
                                <textarea id="commentArea" placeholder="Thêm bình luận..."></textarea>
                            </div>
                        </form>
                        <div class="comment-list">
                            <div class="comment-other">
                                <div class="comment-avatar">
                                    <i class="fas fa-user-tie"></i>
                                </div>
                                <div class="comment-content">
                                    <h4>Nam</h4>
                                    <p>Phim hay quá!</p>
                                </div>
                                <div class="comment-time">
                                    <span>50 phút trước</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        let body = $("body");
        let modalsc = $(".modal");
        let modalBody = $(".modal__body");

        modalBody.append(modalMovies);
        selectSeason();
        let modal_movies = $(".modal__body .modal-movie");
        body.css("overflow", "hidden");
        modalsc.show();
        modal_movies.show();
        modalBody.css('height', '100%');
        sliderGe($("#episodeMovie"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
        sliderGe($("#recommendMovies"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");

        const headerMImg = $(".modal-movie__img")
        const headerMVideo = $("#modal-movie__video");
        const btnMMute = $(".header-movie-btn-i:first-child");
        const btnMSound = $(".header-movie-btn-i:nth-child(2)");
        const btnMReplay = $(".header-movie-btn-i:last-child");
        showVideo(headerMImg, headerMVideo, btnMMute, btnMSound, btnMReplay, "imgActiveHv");

        var myInterval = setInterval(function () {
            if (headerMVideo.get(0).currentTime >= headerMVideo.get(0).duration - 10) {
                btnMReplay.show();
                btnMMute.hide();
                btnMSound.hide();
                headerMImg.show();
                headerMVideo.get(0).pause();
                headerMVideo.hide();
                if (headerMImg.hasClass("imgActive"))
                    headerMImg.removeClass("imgActive");
                if (headerMImg.hasClass("imgActiveSc"))
                    headerMImg.removeClass("imgActiveSc");
                if (headerMImg.hasClass("imgActiveHv"))
                    headerMImg.removeClass("imgActiveHv");
            }
        }, 10000);

        addStorage($(".modal-movie__button--add-remove"), dataArr, posElement, IdMovies, RowLink)
        // Modal
        const modal = $("#myModal");
        $(window).click(function (e) {
            if (e.target == modal.children(".modal__overlay").get(0) || e.target == modal.children(".modal__body").get(0)) {
                //isPlayModal = true
                body.css("overflow", "auto");
                modalsc.hide();
                modalBody.css('height', 'auto');
                modal_movies.remove();
                var url = window.location.href;
                if (url.indexOf("?") > 0) {
                    var updatedUri = url.substring(0, url.indexOf("?"));
                    // window.history.replaceState({}, document.title, updatedUri);
                    window.history.pushState({}, document.title, updatedUri);
                }
                clearInterval(myInterval);
            }
        })

        $(".modal-turnoff").click(function () {
            //isPlayModal = true
            body.css("overflow", "auto");
            modalsc.hide();
            modalBody.css('height', 'auto');
            modal_movies.remove();
            var url = window.location.href;
            if (url.indexOf("?") > 0) {
                var updatedUri = url.substring(0, url.indexOf("?"));
                // window.history.replaceState({}, document.title, updatedUri);
                window.history.pushState({}, document.title, updatedUri);
            }
            clearInterval(myInterval);
        })
    }
});