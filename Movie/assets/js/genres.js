$(document).ready(function () {
    showMovies();
    function showMovies() {
        var movies = sessionStorage.getItem("allMovies")
        var data = JSON.parse(movies)
        var content = ""
        for (const dt of data) {
            var nameArr = dt.name.split('|')
            var row_name = ""
            var displayName = nameArr[1] ? nameArr[1] : nameArr[0];
            if (dt.isMovie) {
                row_name = ` <div class="row__name row__name-movies">
                                    <span>${displayName}</span>
                                    <div class="row__detail">
                                        <div class="row__detail-left">
                                            <span>2021</span>
                                            <span>90ph</span>
                                        </div>
                                        <span class="btn-genres">Phim Lẻ</span>
                                    </div>
                                </div>`
            }
            else {
                row_name = ` <div class="row__name row__name-tvshow">
                                    <span>${displayName}</span>
                                    <div class="row__detail">
                                        <div class="row__detail-left">
                                            <span>2021</span>
                                            <span>1 Mùa</span>
                                        </div>
                                        <span class="btn-genres">Phim Bộ</span>
                                    </div>
                                </div>`
            }

            let vip_name = "";
            if (dt.isVip) {
                vip_name = `<img src="./assets/img/iconvip.png" alt="vip" class="movies-vip">`
            }

            content += `<div class="row__img-link row__img-link-ge" data-movie="${dt.id}">
                            <div class="row__wrap ratioImg__wrap">
                                <img src="./assets/img/image${dt.id}.jpg" alt="${dt.name}" class="row__img ratio__in">` + vip_name +
                `</div>`
                + row_name +
                `</div>`
        }

        $("#genresRow").append(content)
    }

    $(".dropdown-toggle").click(function () {
        let dropdown = $(".dropdown-menu.active")
        for (const item of dropdown) {
            if ($(this).siblings(".dropdown-menu")[0] != item) {
                $(item).removeClass('active')
            }
        }
        $(this).siblings(".dropdown-menu")[0].classList.toggle('active')
    })

    // Sắp xếp .....
    let movies = $(".row__img-link-ge")
    let moviesSort = movies.slice(0).sort(function (a, b) {
        if ($(a).find(".row__name > span").text() < $(b).find(".row__name > span").text())
            return -1
        else if ($(a).find(".row__name > span").text() > $(b).find(".row__name > span").text())
            return 1
        else
            return 0
    })
    $('input[type=radio][name=sort]').change(function () {
        if (this.value == 'default') {
            $("#genresRow").append(movies)
            $(this).parent().parent().parent().find(".filter-value").text("Mặc định")
        }
        else if (this.value == 'az') {
            $("#genresRow").append(moviesSort)
            $(this).parent().parent().parent().find(".filter-value").text("Tên phim (a-z)")
        }
    });
    // Phân loại phim

    let moviesLoai = []
    $('input[type=checkbox][name=loai]').change(function () {
        let selectName = $(this).siblings("label").text()
        let selectedName = $(this).parent().parent().parent().find(".filter-value")
        if (this.checked) {
            moviesLoai.push(this.value)

            let moviesLength = moviesLoai.length
            if (moviesLength == 1) {
                selectedName.text(selectName)
            }
            else if (moviesLength == 0) {
                selectedName.text("Toàn bộ")
            }
            else {
                selectedName.text(moviesLength + " đã chọn")
            }
        }
        else {
            let value = this.value
            moviesLoai = moviesLoai.filter(function (movie) {
                return movie != value
            })

            let moviesLength = moviesLoai.length
            if (moviesLoai.length == 0) {
                selectedName.text("Toàn bộ")
            }
            else if (moviesLoai.length == 1) {
                if (moviesLoai[0] == 1)
                    selectedName.text("Phim lẻ")
                else if (moviesLoai[0] == 1)
                    selectedName.text("Phim bộ")
                else
                    selectedName.text("Vip")
            }
            else {
                selectedName.text(moviesLength + " đã chọn")
            }
        }

        let count = moviesLoai.length
        let movies = $(".row__img-link-ge")

        if (count == 0 || count == 3) {
            movies.show()
        }
        else {
            movies.hide()
            if (moviesLoai.indexOf("1") > -1) {
                movies.each(function () {
                    if ($(this).find('.row__name').hasClass("row__name-movies"))
                        $(this).show()
                })
            }
            if (moviesLoai.indexOf("3") > -1) {
                movies.each(function () {
                    if ($(this).find('.movies-vip').length > 0)
                        $(this).show()
                })
            }
            if (moviesLoai.indexOf("2") > -1) {
                movies.each(function () {
                    if ($(this).find('.row__name').hasClass("row__name-tvshow"))
                        $(this).show()
                })
            }
        }
    });
});