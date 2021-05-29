$(document).ready(function () {
    var search = window.location.search
    const urlParams = new URLSearchParams(search)
    var search = urlParams.get('searchIp')
    searchMovie();
    function searchMovie() {
        var movies = sessionStorage.getItem("allMovies")
        var data = JSON.parse(movies)
        var content = ""
        for (const dt of data) {
            var re = new RegExp(search, "i")
            var nameArr = dt.name.split('|')
            var name = nameArr.join(" ")
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

            if (name.match(re) && search) {
                content += `<div class="row__img-link row__img-link-ge" data-movie="${dt.id}">
                                <div class="row__wrap ratioImg__wrap">
                                    <img src="./assets/img/image${dt.id}.jpg" alt="${dt.name}" class="row__img ratio__in">` + vip_name +
                    `</div>`
                    + row_name +
                    `</div>`
            }
        }

        if (!content) {
            content = `<p style="font-size: 1.6rem; color: var(--white-color-sc)">Không có kết quả khớp với yêu cầu \"${search}\" cần tìm của bạn.</p>`;
            $("#search").after(content)
        }
        else
            $("#search").append(content)
    }
});