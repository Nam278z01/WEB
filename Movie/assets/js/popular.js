$(document).ready(function () {
    DeleteMoviesIsML();
    addList();
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

    //hover phim
    function hoverMovies() {
        var myTimeout;
        var parent;
        var left;
        var width;
        var mySetInterVal;
        var image;
        $(".row__img-link").mouseenter(function (e) {
            width = $(this).width();
            image = $(this).find(".row__img")

            var src = image.attr("src");
            var number = src.substr(src.length - 7, 3);

            var checkMovie = image.attr("alt");
            var infoOne = checkMovie.split('|')[0];
            var infoSec = checkMovie.split('|')[2];
            var infoOther = infoOne == 0 ? `<div class="hover-movie__info">
                                                <span class="hm_info">2018</span>
                                                <span class="hm_info">3g 54p</span>
                                                <span class="hm_info">HD</span>
                                            </div>`
                : `<div class="hover-movie__info">
                                                <span class="hm_info">2018</span>
                                                <span class="hm_info">1 Mùa</span>
                                                <span class="hm_info">HD</span>
                                            </div>`;
            var btnAddRemove = infoSec == 0 ? `<button class="button hover-movie__button--add-removeList">
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
            if ($(this).parent().parent()[0] == $("#comingRow")[0]) {
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
            var margin = $(window).width() * 3 / 100;
            left = $(this).offset().left;
            parent = $(this).parent().parent();
            myTimeout = setTimeout(function () {
                var addChild = `<div class="hover-movie" id="hover">
                                    <div class="hover-movie-link ratio16-9__wrap">
                                        <a href="#">
                                            <img src="./assets/img/image${number}.jpg" alt="${checkMovie}" class="hover-movie__img ratio__in">
                                            <video id="hover-movie__video" class="ratio__in">
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
                                    <div class="hover-movie__button">`
                                        
                    + btn +
                    
                                    `</div>`
                    + infoOther +
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
                ClearArr();
            });
            addStorage(image, $(this));
        });
    }
    // Thêm vào myList
    function addStorage(ImgMovie, RowLink) {
        $(".hover-movie__button--add-removeList").on('click', function () {
            var src = ImgMovie.attr("src");
            var number = src.substr(src.length - 7, 3);
            var checkMovie = ImgMovie.attr("alt");
            var infoOne = checkMovie.split('|')[0];
            var infoSec = checkMovie.split('|')[1];
            var infoThird = checkMovie.split('|')[2];
            var infoFour = checkMovie.split('|')[3];
            var icon = $(this).children(".bx");
            if (infoThird == "0") {
                icon.removeClass("bx-plus").addClass("bx-check");
                ImgMovie.attr("alt", infoOne + "|" + infoSec + "|" + 1 + "|" + infoFour);
                var newImgAlt = infoOne + "|" + infoSec + "|" + "1" + "|" + infoFour;
                var movie = {
                    src: number,
                    alt: newImgAlt
                }
                var newMovie = [];
                var currentMyList = window.sessionStorage.getItem("movies");

                if (currentMyList) {
                    // var data = JSON.parse(currentMyList);
                    // data.push(movie);
                    // newMovie = data;
                    let check = true;
                    var data = JSON.parse(currentMyList);
                    let count = data.length;
                    for (var i = 0; i < count; i++) {
                        // Nếu có xóa như bên mylist
                        if (!data[i]) {
                            data[i] = movie;
                            check = false
                        }
                    }
                    // Nếu ko xóa thì cộng như bth
                    if (check) {
                        var data = JSON.parse(currentMyList);
                        data.push(movie);
                    }
                    newMovie = data;
                } else {
                    newMovie.push(movie);
                }
                window.sessionStorage.setItem("movies", JSON.stringify(newMovie));

                if (RowLink.parent().parent()[0] == $("#myRow")[0]) {
                    $("#myListRow").show();
                    RowLink.show();
                }
            }
            else {
                icon.removeClass("bx-check").addClass("bx-plus");
                ImgMovie.attr("alt", infoOne + "|" + infoSec + "|" + 0 + "|" + infoFour);
                var moviesRemove = sessionStorage.getItem("movies");
                var moviesArr = JSON.parse(moviesRemove);
                // var newMovies = moviesArr.filter(function (value) {
                //     return value.src != number;
                // })
                let count = moviesArr.length;
                for (var i = 0; i < count; i++) {
                    if (moviesArr[i].src == number) {
                        delete moviesArr[i];
                        break;
                    }
                }
                // window.sessionStorage.setItem("movies", JSON.stringify(newMovies));
                window.sessionStorage.setItem("movies", JSON.stringify(moviesArr));
                if (RowLink.parent().parent()[0] == $("#myRow")[0]) {
                    RowLink.hide();
                }
            }
        });
    }
    function DeleteMoviesIsML() {
        var AllMovies = $(".row__img-link");
        for (const movie of AllMovies) {
            let movieCT = movie.getElementsByClassName("row__img")[0];
            let src = movieCT.src;
            var number = src.substr(src.length - 7, 3);
            var myMovies = sessionStorage.getItem("movies");
            var myMoviesArr = JSON.parse(myMovies);
            if (myMoviesArr) {
                for (const myMovie of myMoviesArr) {
                    if (number == myMovie.src) {
                        movie.remove();
                        break;
                    }
                }
            }
        }
    }
    function addList() {
        ClearArr();
        var myNewList = "";
        var movies = sessionStorage.getItem("movies");
        if (movies) {
            var data = JSON.parse(movies);
            var quantity = data.length;
            if (quantity > 0) {
                $("#myListRow").show()
                for (var i = 0; i < quantity; i++) {
                    var myListItem = data[i].alt.split('|')[1] == 0 ?
                        `<div class="row__img-link">
                                                <div class="row__wrap ratioImg__wrap">
                                                    <img src="./assets/img/image${data[i].src}.jpg" alt="${data[i].alt}" class="row__img ratio__in">
                                                </div>
                                            </div>` :
                        `<div class="row__img-link">
                                                <div class="row__wrap ratioImg__wrap">
                                                    <img src="./assets/img/image${data[i].src}.jpg" alt="${data[i].alt}" class="row__img ratio__in">
                                                    <img src="./assets/img/iconvip.png" alt="vip" class="movies-vip">
                                                </div>
                                            </div>`;
                    myNewList += myListItem;
                }
            }
            $("#myRow > .row__container-sc").html(myNewList);
        }
    }
    function ClearArr() {
        let movies = sessionStorage.getItem("movies");
        if (movies) {
            let data = JSON.parse(movies);
            let newMovies = data.filter(function (value) {
                return value != null;
            })
            window.sessionStorage.setItem("movies", JSON.stringify(newMovies));
        }
    }
});