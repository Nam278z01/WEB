$(document).ready(function () {
    loadMovies()

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
            if (currentScrollTop < movieH.outerHeight()) {
                $("#my-nav-watch").hide();
            } else {
                if(windowWidth < 740)
                    $("#my-nav-watch").css("display", "block");
                else
                    $("#my-nav-watch").css("display", "flex");
            }
            const search = $("#search-wrap");
            search.hide();
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
   
    function selectSeasonShow() {
        $(".movies-season").click(function () {
            if (!$(this).hasClass("active")) {
                let season = $(this).children(".movies-season__name").text()
                $(".movies-season").removeClass("active")
                $(this).addClass("active")
                $(".movies-menu-seasons").slideToggle();
                $("#movie-btn-seasons > .seasonCurrent").text(season)

                let numberSeason = season.substring(season.length - 2, season.length)

                let selectSeason = `.modal__movies-ep-second:nth-child(${Number(numberSeason) + 1})`
                $(".modal__movies-ep-second").addClass("disable")
                $(selectSeason).removeClass("disable")
            }
        })
    }

    function loadMovies() {
        let getId = window.location.search
        const urlParams = new URLSearchParams(getId)
        let idMovie = urlParams.get('movie')
        let idSeason = urlParams.get('season')
        let idEpisode = urlParams.get('ep')

        let dataMovie = sessionStorage.getItem('allMovies')
        let dataMovieArr = JSON.parse(dataMovie)

        let selectedMovie
        for (const dt of dataMovieArr) {
            if (dt.id == idMovie) {
                selectedMovie = dt
            }
        }
        if (!selectedMovie) {
            return false
        }

        let infoOne = ""
        let infoSecond = ""
        if (!selectedMovie.isMovie) {
            infoOne = `<div class="movie-current">
                        <span class="movie-current-season">
                            Mùa ${idSeason}
                        </span>
                        <span class="movie-current-episode">
                            Tập ${idEpisode}
                        </span>
                    </div>`
            
            infoSecond = `<div class="modal__movies-episodes">
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
                                    <li class="movies-season active">
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
                            <button class="btn-icon fas fa-chevron-left row__item-back modal-recommend__item-back"></button>
                            <button class="btn-icon fas fa-chevron-right row__item-next modal-recommend__item-next"></button>
                            <div class="modal-recommend__container-sc">
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season1_ep01_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info episode__info">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season1_ep02_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info episode__info">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season1_ep03_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season1_ep04_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season1_ep05_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season1_ep06_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season1_ep07_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
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
                        <div class="modal__movies-ep-second" id="episodeMovie2">
                            <button class="btn-icon fas fa-chevron-left row__item-back modal-recommend__item-back"></button>
                            <button class="btn-icon fas fa-chevron-right row__item-next modal-recommend__item-next"></button>
                            <div class="modal-recommend__container-sc">
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep01_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info episode__info">
                                            <p class="episode-name">[Mùa 2] Tập 1. Seven Thirty-Seven</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                                Walt and Jesse realize how dire their situation is. They must come up with a plan to kill Tuco before Tuco kills them
                                                first.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep02_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info episode__info">
                                            <p class="episode-name">[Mùa 2] Tập 2. Grilled</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                                Walt's disappearance is met with investigation by both his wife and Hank, as Tuco Salamanca intends to leave town with
                                                his kidnapped cooks.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep03_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
                                            <p class="episode-name">[Mùa 2] Tập 3. Bit by a Dead Bee</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                                Walt and Jesse try to come up with alibis for their disappearances.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep04_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
                                            <p class="episode-name">[Mùa 2] Tập 4. Down</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                                Skyler keeps mysteriously leaving without talking to Walt. Jesse's parents throw him out of his own house.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep05_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
                                            <p class="episode-name">[Mùa 2] Tập 5. Breakage</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                                Walt and Jesse decide to start their own little empire with the help of Jesse's friends: Skinny Pete, Combo, and Badger.
                                                Meanwhile, Hank tries to pull himself together after his encounter with Tuco.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep06_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
                                            <p class="episode-name">[Mùa 2] Tập 6. Peekaboo</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                                After Skinny Pete gets ripped off, Walt makes Jesse go get the money. Meanwhile, Walt's cover story on how Elliott and
                                                Gretchen are paying for his medical treatment is on the verge of collapsing.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep07_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
                                            <p class="episode-name">[Mùa 2] Tập 7. Negro y Azul</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                                Rumor is spreading that Jesse killed the man that ripped Skinny Pete off. Walt uses this to his advantage on expanding
                                                their territory. Meanwhile, Hank has been promoted to the El Paso office. But it's not all he hoped it would be.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep08_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
                                            <p class="episode-name">[Mùa 2] Tập 8. Better Call Saul</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                                Badger is caught by the DEA. Walt and Jesse hire the best criminal lawyer in town, Saul Goodman.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep09_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
                                            <p class="episode-name">[Mùa 2] Tập 9. 4 Days Out</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                                Walt and Jesse become stranded out in the middle of the desert after cooking more crystal.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep10_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
                                            <p class="episode-name">[Mùa 2] Tập 10. Over</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                            Walt's cancer has greatly improved. Time to celebrate. Meanwhile Jesse tries to meet his new girlfriend's father.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep11_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
                                            <p class="episode-name">[Mùa 2] Tập 11. Mandala</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                                Walt and Jesse's little empire begins to crumble. Saul tries to set them up with a mysterious distributor.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep12_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
                                            <p class="episode-name">[Mùa 2] Tập 12. Phoenix</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                                Walt and Skyler have a baby girl. Now that Jesse is hooked on heroin, Walt refuses to give him his money until he gets
                                                clean. Meanwhile, as an excuse for his money, Walt decides to donate the money to himself through his son's new website.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img modal-episode__wrap-img">
                                            <img src="./assets/img/image_season2_ep13_035.jpg" alt="" class="modal-recommend__img">
                                            <div class="modal-recommend__link">
                                                <i class="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div class="recommend-movies__info">
                                            <p class="episode-name">[Mùa 2] Tập 13. ABQ</p>
                                            <div class="row__detail-left">
                                                <span>2021</span>
                                                <span>90ph</span>
                                            </div>
                                            <span class="episode__description">
                                                Walt's lies have pushed Skyler to her limit. She leaves with the kids. Meanwhile, Jesse blames himself for Jane's death
                                                and goes into rehab.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
        }

        let infoVip = ""
        if (selectedMovie.isVip) {
            let account = sessionStorage.getItem('account')
            if (account) {
                account = JSON.parse(account)
                if (account.isVip) {
                    infoVip = `<img src="./assets/img/iconvip.png" alt="vip" class="modal-movies-vip"></img>`
                }
                else {
                    return false
                }
            }
            else {
                return false
            }
        }

        let content =` <div class="watch-movie">
                <div class="watch-movie-area">
                    <div class="watch-movie__header">
                        <video id="my-video-watch" class="ratio__in-watch" controls poster="./assets/img/image_big${selectedMovie.id}.jpg">
                            <source src="./assets/video/video${selectedMovie.id}.mp4">
                        </video>
                    </div>
                </div>
                <div class="movie-name-watch">
                    <img src="./assets/img/image_name${selectedMovie.id}.png" alt="" class="img-name-watch">
                    <div class="movie-current">`
            + infoOne +
                    `</div>
                </div>
                <div class="watch-video-content">
                    <div class="modal-video__info">
                        <div class="modal-video__info-left">
                            <div class="info-left__first">
                                <span class="info__views">532.632 lượt xem</span>
                                <div class="info__point-vote">
                                    <span class="info__point">4.0</span>
                                    <div class="info__vote">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="far fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="info-left__second">`
            + infoVip +
                                `<span>2008</span>
                                <span>5 Mùa</span>
                            </div>
                            <p class="info-left__main">
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
                    + infoSecond +
                    `<div class="modal-video__recommend">
                        <div class="modal-recommend__header">
                            <span>Đề xuất cho bạn</span>
                        </div>
                        <div class="modal-recommend__container" id="recommendMovies">
                            <button class="btn-icon fas fa-chevron-left row__item-back modal-recommend__item-back"></button>
                            <button class="btn-icon fas fa-chevron-right row__item-next modal-recommend__item-next"></button>
                            <div class="modal-recommend__container-sc">
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img" onclick="window.location='./watch.html?movie=040'">
                                            <img src="./assets/img/image_doc040.jpg" alt="" class="modal-recommend__img">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img" onclick="window.location='./watch.html?movie=041&season=1&ep=01'">
                                            <img src="./assets/img/image_doc041.jpg" alt="" class="modal-recommend__img">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img" onclick="window.location='./watch.html?movie=042'">
                                            <img src="./assets/img/image_doc042.jpg" alt="" class="modal-recommend__img">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img" onclick="window.location='./watch.html?movie=043'">
                                            <img src="./assets/img/image_doc043.jpg" alt="" class="modal-recommend__img">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img" onclick="window.location='./watch.html?movie=047'">
                                            <img src="./assets/img/image_doc047.jpg" alt="" class="modal-recommend__img">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img" onclick="window.location='./watch.html?movie=015'">
                                            <img src="./assets/img/image_doc015.jpg" alt="" class="modal-recommend__img">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img" onclick="window.location='./watch.html?movie=045'">
                                            <img src="./assets/img/image_doc045.jpg" alt="" class="modal-recommend__img">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img" onclick="window.location='./watch.html?movie=046'">
                                            <img src="./assets/img/image_doc046.jpg" alt="" class="modal-recommend__img">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img" onclick="window.location='./watch.html?movie=048'">
                                            <img src="./assets/img/image_doc048.jpg" alt="" class="modal-recommend__img">
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
                                <div class="modal-recommend__img-link watch-link">
                                    <div class="modal-recommend__wrap">
                                        <div class="modal-recommend__wrap-img" onclick="window.location='./watch.html?movie=044'">
                                            <img src="./assets/img/image_doc044.jpg" alt="" class="modal-recommend__img">
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
            </div>`
        
        $("#contentWatch").prepend(content)

        //Chèn link movies
        let seasonQuatity = $(".modal__movies-ep-second").length
        for (let i = 0; i < seasonQuatity; i++) {
            $(`.modal__movies-ep-second:nth-child(${Number(i) + 2}) .modal-recommend__wrap-img`).each(function (index) {
                let indexNew
                if (index < 9) {
                    indexNew = "0" + (index + 1)
                }
                else {
                    indexNew = index + 1
                }
                $(this).click(function () {
                    if (!$(this).parent().parent(".modal-recommend__img-link.watch-link").hasClass("active")) {
                        let url = new URL(window.location.href)
                        url.searchParams.set('season', (Number(i) + 1).toString())
                        url.searchParams.set('ep', indexNew.toString())
                        window.history.replaceState(null, null, url)
                        $(".watch-link").removeClass("active")
                        let selectM = `.modal__movies-ep-second:nth-child(${Number(i) + 2}) .watch-link:nth-child(${index + 1})`
                        $(selectM).addClass("active")
                        $('body,html').animate({
                            scrollTop: 0
                        })
                        $("#my-video-watch").attr('src', './assets/video/video' + idMovie + '.mp4')
                        $("#my-video-watch").get(0).play()
                        $(".movie-current-season").text("Mùa " + (Number(i) + 1).toString())
                        $(".movie-current-episode").text("Tập " + indexNew.toString())
                    }
                })
            })

        }

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
            sliderGe($("#episodeMovie2"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
            sliderGe($("#recommendMovies"), ".row__item-next", ".row__item-back", ".modal-recommend__container-sc", ".modal-recommend__img-link");
        }

        if (!selectedMovie.isMovie) {
            let select = `.modal__movies-ep-second:nth-child(${Number(idSeason) + 1}) .watch-link:nth-child(${idEpisode})`
            let selectSeason = `.modal__movies-ep-second:nth-child(${Number(idSeason) + 1})`
            $(select).addClass("active")
            $(".modal__movies-ep-second").addClass("disable")
            $(selectSeason).removeClass("disable")
            $("#movie-btn-seasons > .seasonCurrent").text("Mùa " + idSeason)
            $(".movies-season").removeClass("active")
            $(`.movies-season:nth-child(${idSeason})`).addClass("active")
    
            selectSeasonShow()        
        }

        let myVideoWaych = $("#my-video-watch")[0]

        let seletedMovieNew = {
            "id": selectedMovie.id,
            "name": selectedMovie.name,
            "isMyList": selectedMovie.isMyList,
            "isMovie": selectedMovie.isMovie,
            "isVip": selectedMovie.isVip,
            "currentTime": 0,
            "percent": 0,
            "timeleft": myVideoWaych.duration
        }
        let moviesWatched = sessionStorage.getItem('watch')
        let moviesWatchedNew = []
        if (moviesWatched) {
            let moviesWatchedArr = JSON.parse(moviesWatched)

            let check = true
            moviesWatchedArr.forEach(element => {
                if (element.id == selectedMovie.id) {
                    myVideoWaych.currentTime = element.currentTime
                    check = false
                    return false
                }
            })
            if (check) {
                moviesWatchedArr.push(seletedMovieNew)
            }
            moviesWatchedNew = moviesWatchedArr
        }
        else {
            moviesWatchedNew.push(seletedMovieNew)
        }
        sessionStorage.setItem('watch', JSON.stringify(moviesWatchedNew))

        let currentTime
        setInterval(function () {
            currentTime = Math.floor(myVideoWaych.currentTime)
            moviesWatchedNew.forEach(function (element) {
                if (element.id == selectedMovie.id) {
                    element.currentTime = currentTime
                    element.percent = Math.ceil(currentTime / myVideoWaych.duration * 100)
                    element.timeleft = myVideoWaych.duration - currentTime
                }
            })
            sessionStorage.setItem('watch', JSON.stringify(moviesWatchedNew))
        }, 1000)

    }
   
});