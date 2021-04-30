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
        hover_General();
    }
    //hover general
    function hover_General() {
        var myTimeout;
        var myTimeout2;
        var parent;
        var left;
        var width;
        $(".row__img-link-ge").mouseenter(function (e) {
            width = $(this).width();
            var src = $(this).find(".row__img").attr("src");
            var number = src.substr(src.length - 7, 3);
            var hover = $("#hover");
            if (hover) {
                if (left < 50) {
                    hover.css("animation", "ZoomOut linear 0.15s");
                    hover.css("transform-origin", "0% 71%");


                } else if (left < $(window).width() - 300) {
                    hover.css("animation", "ZoomOut linear 0.15s");
                    hover.css("transform-origin", "50% 83%");

                } else {
                    hover.css("animation", "ZoomOut linear 0.15s");
                    hover.css("transform-origin", "100% 71%");
                }
                hover.on("webkitAnimationEnd", function () {
                    hover.remove();
                })
            }
            var margin = $(window).width() * 3 / 100;
            left = $(this).offset().left;
            var top = $(this).offset().top - 190;
            parent = $(this).parent().parent();
            myTimeout = setTimeout(function () {
                var addChild = `<div class="hover-movie" id="hover">
                                    <a href="#" class="hover-movie-link">
                                        <img src="./assets/img/image${number}.jpg" alt="" class="hover-movie__img">
                                        <video id="hover-movie__video">
                                            <source src="./assets/video/video${number}.mp4" type="video/mp4">
                                        </video>
                                        <img src="./assets/img/image_name${number}.png" alt="" class="hover-movie__video-name">
                                    </a>
                                    <div class="hover-movie__button">
                                        <button class="button hover-movie__button--play" title="Xem ngay Army of the dead">
                                            <i class="fas fa-play"></i>
                                            <span>Xem ngay</span>
                                        </button>
                                        <button class="button hover-movie__button--removelist" title="Thêm vào danh sách của tôi">
                                            <i class="fas fa-check"></i>
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
                parent.append(addChild);
                var hoverAf = $("#hover");
                if (left < 50) {
                    hoverAf.css("left", margin + "px");
                    hoverAf.css("transform-origin", "left");
                    hoverAf.css("top", top + "px");
                } else if (left < $(window).width() - 300) {
                    hoverAf.css("left", left - (400-width)/2 + "px");
                    hoverAf.css("top", top + "px");
                } else {
                    hoverAf.css("transform-origin", "right");
                    hoverAf.css("top", top + "px");
                    hoverAf.css("right", margin + "px");
                }
                var hoverVideo = $("#hover-movie__video");
                myTimeout2 = setTimeout(function () {
                    $(".hover-movie__video-name").show();
                    $(".hover-movie__img").hide();
                    hoverVideo.show();
                    hoverVideo.get(0).play();
                }, 2000)
            }, 700);
        }).mouseleave(function () {
            clearTimeout(myTimeout);
            $("#hover").mouseleave(function () {
                clearTimeout(myTimeout2);
                if (left < 50) {
                    $(this).css("animation", "ZoomOut linear 0.15s");
                    $(this).css("transform-origin", "0% 71%");
                    // $(this).css("transform", "scale(0.65)");
                } else if (left < $(window).width() - 300) {
                    $(this).css("animation", "ZoomOut linear 0.15s");
                    $(this).css("transform-origin", "50% 71%");
                } else {
                    $(this).css("animation", "ZoomOut linear 0.15s");
                    $(this).css("transform-origin", "100% 71%");
                }
                $(this).on("webkitAnimationEnd", function () {
                    $(this).remove();
                })
            });
        });
    }
    //Only PC
    function addList() {
        var myNewList = "";
        var movies = sessionStorage.getItem("movies");
        var moviesArr = "[" + movies + "]";
        var data = JSON.parse(moviesArr);
        var quantity = data.length;
        if (quantity > 1) {
            for (var i = 0; i < quantity; i++) {
                var myListItem = `<div class="row__img-link row__img-link-ge">
                                        <div class="row__wrap">
                                            <a href="#" class="">
                                                <img src="./assets/img/image${data[i]}.jpg" alt="" class="row__img">
                                            </a>
                                        </div>
                                  </div>`;
                myNewList += myListItem;
            }
        }        
        $("#myList").append(myNewList);
    }
    addList();
});