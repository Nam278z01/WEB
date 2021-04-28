$(document).ready(function () {
    // Search
    var search = window.location.search;
    const urlParams = new URLSearchParams(search);
    var search = urlParams.get('searchIp').trim('+');
    function searchMovie() {
        var movies = sessionStorage.getItem("moviesSe");
        var data = JSON.parse(movies);
        var content = "";
        for (const dt of data) {
            if (dt.nameM.toUpperCase().includes(search.toUpperCase())) {
                content += `<div class="row__img-link row__img-link-ge">
                                <div class="row__wrap">
                                    <img src="./assets/img/image${dt.idM}.jpg" alt="" class="row__img">
                                </div>
                            </div>`
            }
        }
        if (!content) {
            content = `<p style="font-size: 1.8rem; color: var(--white-color-sc)">Không có kết quả khớp với yêu cầu \"${search}\" cần tìm của bạn.</p>`;
            $("#search").after(content);
        }
        else
            $("#search").append(content);
    }
    searchMovie();
});