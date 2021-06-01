// Data movies
function dataMovies() {
    let dataMovies = [
        {
            id: "001",
            name: "Army of the death|Đội quân người chết",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "002",
            name: "Love, death and robot|Tình yêu, cái chết và người máy",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "003",
            name: "John Wick|Sát thủ John Wick",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "004",
            name: "Black mirror|Gương đen",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "005",
            name: "Academy Umbrella|Học viện cây dù",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "006",
            name: "Stranger things|Cậu bé mất tích",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "007",
            name: "Catch me if you can|Hãy bắt tôi nếu có thể",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "008",
            name: "Sense8|Siêu giác quan",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: true
        },
        {
            id: "009",
            name: "Liên minh công lý|Zack Snyder Justice League",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: true
        },
        {
            id: "010",
            name: "Altered carbon|Linh hồn đổi xác",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "011",
            name: "Lost in space|Lạc ngoài không gian",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "012",
            name: "The hobbit|Người hobbit: hành trình vô định",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "013",
            name: "Friends|Những người bạn",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "014",
            name: "Snowpiercer|Chuyến tàu băng giá",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "015",
            name: "Love and monster|Tình yêu và quái vật",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "016",
            name: "Pacific Rim|Pacific Rim: Vùng tối",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "017",
            name: "The witcher|Thợ săn quái vật",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "018",
            name: "Aquaman|Aquaman: Đế vương Atlantis",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "019",
            name: "Outside the wire|Vùng chiến sự hiểm nguy",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "020",
            name: "Bridgerton",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "021",
            name: "Bố già",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "022",
            name: "Thunder force|Bộ đôi sấm sét",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "023",
            name: "The Crown|Hoàng quyền",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "024",
            name: "Project power|Dự án siêu năng lực",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "025",
            name: "Ready player one|Đấu trường ảo",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "026",
            name: "The old guard|Những chiến binh bất tử",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: true
        },
        {
            id: "027",
            name: "Sinh tử luân hồi",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: true
        },
        {
            id: "028",
            name: "Tyler Rake nhiệm vụ giải cứu",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: true
        },
        {
            id: "029",
            name: "Bloodshot",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: true
        },
        {
            id: "030",
            name: "The martian|Người về từ sao Hỏa",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: true
        },
        {
            id: "031",
            name: "Prison break|Vượt ngục",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: true
        },
        {
            id: "032",
            name: "Dont f*ck with my cat|Đừng đùa với mèo",
            isMyList: false,
            isMovie: false,
            isComing: false
        },
        {
            id: "033",
            name: "Sherlock",
            isMyList: false,
            isMovie: false,
            isComing: false
        },
        {
            id: "034",
            name: "The Better call Saul|Hãy gọi cho Saul",
            isMyList: false,
            isMovie: false,
            isComing: false
        },
        {
            id: "035",
            name: "Breaking bad|Tập làm người xấu",
            isMyList: false,
            isMovie: false,
            isComing: false
        },
        {
            id: "036",
            name: "The House of cards|Ván bài chính trị",
            isMyList: false,
            isMovie: false,
            isComing: false
        },
        {
            id: "037",
            name: "Family guys",
            isMyList: false,
            isMovie: false,
            isComing: false
        },
        {
            id: "038",
            name: "Shawdow Hunter|Thợ săn bóng đêm",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "039",
            name: "Outlander|Người ngoại quốc",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "040",
            name: "The GodFather|Bố già",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "041",
            name: "Shadow and bone",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "042",
            name: "Transformer",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "043",
            name: "Shazam",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "044",
            name: "Jumanij",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "045",
            name: "Homunculus",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "046",
            name: "The dead don't die",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "047",
            name: "The Twilight|Chạng vạng",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "048",
            name: "Minions",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "049",
            name: "Người vô tội",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "050",
            name: "Bác sĩ tài hoa",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "051",
            name: "Lời hồi đáp 1988",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "052",
            name: "Báo động khẩn tình yêu hạ cánh",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "053",
            name: "Bóng ma anh quốc",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "054",
            name: "Gambit hậu",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "055",
            name: "Ngày mai hãy cưới",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "056",
            name: "Trạng quỳnh",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: false
        },
        {
            id: "057",
            name: "Ai đã giết Sara",
            isMyList: false,
            isMovie: true,
            isComing: true,
            isVip: false
        },
        {
            id: "058",
            name: "Thế giới khủng long",
            isMyList: false,
            isMovie: true,
            isComing: true,
            isVip: false
        },
        {
            id: "059",
            name: "Bí ẩn ngôi nhà kỳ quái",
            isMyList: false,
            isMovie: false,
            isComing: true,
            isVip: false
        },
        {
            id: "060",
            name: "Lỗi sợ",
            isMyList: false,
            isMovie: true,
            isComing: true,
            isVip: false
        },
        {
            id: "061",
            name: "X-men",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
        },
        {
            id: "062",
            name: "2012: Năm thảm họa",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: false
            
        },
        {
            id: "063",
            name: "Phi vụ triệu đô",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: true
        },
        {
            id: "064",
            name: "The Flash|Người hùng tia chớp",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: true
        },
        {
            id: "065",
            name: "Vụ nổ lớn",
            isMyList: false,
            isMovie: false,
            isComing: false,
            isVip: true
        },
        {
            id: "066",
            name: "Chúng ta",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: true
        },
        {
            id: "067",
            name: "King Kong",
            isMyList: false,
            isMovie: true,
            isComing: false,
            isVip: true
        },
    ]
    return dataMovies
}
// Chèn data vào session
addStorage()
function addStorage() {
    let data = dataMovies()
    let dataCurrent = sessionStorage.getItem("allMovies")
    if (!dataCurrent) {
        sessionStorage.setItem("allMovies", JSON.stringify(data))
    }
}
// Đăng nhập
function signIn(email, password) {
    if (email == "nam@gmail.com" && password == "278")
    {
        let account = {
            email: "nam278z01@gmail.com",
            password: "278",
            name: "Nam Nguyễn",
            isVip: true
        }
        sessionStorage.setItem("account", JSON.stringify(account))
        return true
    }
    else if (email == "namhai@gmail.com" && password == "278") {
        let account = {
            email: "nam278z01@gmail.com",
            password: "278",
            name: "Nam Nguyễn",
            isVip: false
        }
        sessionStorage.setItem("account", JSON.stringify(account))
        return true
    }
    else {
        return false
    }
    
}

let accountData = sessionStorage.getItem("account")
if (accountData) {
    $(".header__account > .signIn-register").remove()
    let signIn = `<div class="whenLogIn">
                                <div class="accountLogIn" onclick="window.location='./account.html'">
                                    <img src="./assets/img/image009.jpg" alt="">
                                    <span>Nguyễn Nam</span>
                                </div>
                                <div class="signOut">
                                    <i class='bx bx-log-out-circle bx-rotate-90'></i>
                                    <span>Đăng xuất</span>
                                </div>
                            </div>`
    $(".header__account").append(signIn)
}
else {
    $(".header__account > .whenLogIn").remove()
    let signOut = `<div class="signIn-register">
                                <button class="button btn-account__register">Đăng ký</button>
                                <button class="button btn-account__signIn">Đăng nhập</button>
                            </div>`
    $(".header__account").append(signOut)
}

$("#loginForm .btn--primary").click(function () {
    let email = $("#loginForm input[type=text]").val()
    let password = $("#loginForm input[type=password]").val()
    if (signIn(email, password)) {
        location.reload()
    }
})

$(".whenLogIn .signOut").click(function () {
    sessionStorage.setItem("account", "")
    location.reload()
})