$(document).ready(function () {
    searchMovie();
    function searchMovie() {
        var getMovies = $(".row__img-link");
        var total = [];
        for (const movie of getMovies) {
            var movieDetail = movie.getElementsByTagName("img")[0];
            var src = movieDetail.getAttribute("src");
            var id = src.substr(src.length - 7, 3);
            var name = movieDetail.getAttribute("alt");
            var movieInfo = {
                nameM: name,
                idM: id
            }
            total.push(movieInfo);
        }
        // Xoa phan tu trùng
        var newTotal = [];
        newTotal.push(total[0]);
        var TtLength = total.length;
        for (var i = 0; i < TtLength; i++) {
            var newTtLength = newTotal.length;
            var totalN = total[i];
            let checkM = true;
            for (var j = 0; j < newTtLength; j++) {
                if (newTotal[j].idM === totalN.idM) {
                    checkM = false;
                }
            }
            if (checkM) newTotal.push(totalN)
        }
        sessionStorage.setItem("moviesSearch", JSON.stringify(newTotal));
    }
});