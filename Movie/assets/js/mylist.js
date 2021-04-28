$(document).ready(function () {
    //hover general
    function hover_General() {
        var myTimeout;
        var myTimeout2;
        var parent;
        $(".row__img-link-ge").mouseenter(function (e) {
            var src = $(this).find(".row__img").attr("src");
            var number = src.charAt(src.length - 5);
            var hover = $("#hover");
            if (hover) {
                hover.remove();
            }
            var margin = $(window).width() * 3 / 100;
            var left = $(this).offset().left;
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
                    hoverAf.css("left", left - 111 + 37 + "px");
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
                $(this).remove();
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
    if ($(window).width() >= 1024) {
        hover_General();
    }
    // Search
    function searchMovie() {
        var getMovies = $(".row__img-link-ge");
        var input = $("#searchForm > input");
        var filter;
        input.keyup(function () {
            filter = $(this).val().trim();
            var countMovies = getMovies.length;
            var i;
            for (i = 0; i < countMovies; i++) {
                var name = getMovies[i].getElementsByTagName('span');
                var txtValue = name[0].innerHTML + " " + name[1].innerHTML;
                if (txtValue.toUpperCase().includes(filter.toUpperCase())) {
                    getMovies[i].style.display = "block";
                } else {
                    getMovies[i].style.display = "none";
                }
                // var movie = $(".row__img-link-ge:nth-child(" + i + ")");
                // console.log(movie);
            }
        });
    }
    searchMovie();
});