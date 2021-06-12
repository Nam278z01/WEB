//var dùng trong for vẫn hoisting ra ngoài for, vậy nên nên dùng const/let trong for
let PaymentParent = $(".info-payment > table")
PaymentParent.html(`<tr>
                            <td>Tài khoản NMovies</td>
                            <td>Nguyễn Nam</td>
                        </tr>
                        <tr>
                            <td>Tên gói</td>
                            <td>
                                <p>01 Tháng</p>
                                <p>Tự động gia hạn hàng tháng</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Trị giá</td>
                            <td>65.000 đ</td>
                        </tr>
                        <tr>
                            <td>Giảm giá</td>
                            <td>0 đ</td>
                        </tr>
                        <tr>
                            <td>Ngày hiệu lực</td>
                            <td>11/06/2021</td>
                        </tr>
                        <tr>
                            <td>Sử dụng đến</td>
                            <td>Khi bạn hủy</td>
                        </tr>
                        <tr>
                            <td>Kỳ thanh toán tiếp theo</td>
                            <td>10/06/2021</td>
                        </tr>`)

let Payment = document.querySelectorAll(".info-payment > table tr")

let today = new Date()
let due = new Date()
due.setDate(due.getDate() + 30)
function checkTime(number) {
    if (number < 10)
        return "0" + number
    return number
}
Payment[4].querySelectorAll("td")[1].innerHTML = checkTime(today.getDate()) + "/" + checkTime((today.getMonth() + 1)) + "/" + today.getFullYear()
Payment[6].querySelectorAll("td")[1].innerHTML = checkTime(due.getDate()) + "/" + checkTime((due.getMonth() + 1)) + "/" + due.getFullYear()

let cards = document.querySelectorAll(".card")
cards.forEach(card => {
    card.onclick = function () {
        cards.forEach(cardSecond => {
            if (cardSecond.classList.contains("selected")) {
                cardSecond.classList.remove("selected")
            }
        })
        if (!this.classList.contains("selected")) {
            this.classList.add("selected")
            let nameVip = this.querySelector("h4").innerText
            let nameVipSecond = this.querySelector(".card-top > span").innerText
            let price = this.querySelector(".card-bottom > span").innerText

            if (!this.classList.contains("auto")) {
                PaymentParent.html(`<tr>
                                <td>Tài khoản NMovies</td>
                                <td>Nguyễn Nam</td>
                            </tr>
                            <tr>
                                <td>Tên gói</td>
                                <td>
                                    <p>01 Tháng</p>
                                    <p>Tự động gia hạn hàng tháng</p>
                                </td>
                            </tr>
                            <tr>
                                <td>Trị giá</td>
                                <td>65.000 đ</td>
                            </tr>
                            <tr>
                                <td>Giảm giá</td>
                                <td>0 đ</td>
                            </tr>
                            <tr>
                                <td>Ngày hiệu lực</td>
                                <td>11/06/2021</td>
                            </tr>
                            <tr>
                                <td>Sử dụng đến</td>
                                <td>10/06/2021</td>
                            </tr>`)
                
                Payment = document.querySelectorAll(".info-payment > table tr")
                let namePayment = Payment[1].querySelectorAll("td")[1]
                namePayment.querySelectorAll("p")[0].innerText = nameVip
                namePayment.querySelectorAll("p")[1].innerText = nameVipSecond

                Payment[2].querySelectorAll("td")[1].innerText = price

                document.querySelectorAll(".info-payment > .bill > span")[1].innerText = price

                let dateVip = card.getAttribute("data-date")
                let dueNew = new Date()
                dueNew.setDate(today.getDate() + Number(dateVip))
                Payment[5].querySelectorAll("td")[1].innerHTML = checkTime(dueNew.getDate()) + "/" + checkTime((dueNew.getMonth() + 1)) + "/" + dueNew.getFullYear()
            }
            else {
                PaymentParent.html(`<tr>
                            <td>Tài khoản NMovies</td>
                            <td>Nguyễn Nam</td>
                        </tr>
                        <tr>
                            <td>Tên gói</td>
                            <td>
                                <p>01 Tháng</p>
                                <p>Tự động gia hạn hàng tháng</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Trị giá</td>
                            <td>65.000 đ</td>
                        </tr>
                        <tr>
                            <td>Giảm giá</td>
                            <td>0 đ</td>
                        </tr>
                        <tr>
                            <td>Ngày hiệu lực</td>
                            <td>11/06/2021</td>
                        </tr>
                        <tr>
                            <td>Sử dụng đến</td>
                            <td>Khi bạn hủy</td>
                        </tr>
                        <tr>
                            <td>Kỳ thanh toán tiếp theo</td>
                            <td>10/06/2021</td>
                        </tr>`)
                
                Payment = document.querySelectorAll(".info-payment > table tr")
                let namePayment = Payment[1].querySelectorAll("td")[1]
                namePayment.querySelectorAll("p")[0].innerText = nameVip
                namePayment.querySelectorAll("p")[1].innerText = nameVipSecond

                Payment[2].querySelectorAll("td")[1].innerText = price

                document.querySelectorAll(".info-payment > .bill > span")[1].innerText = price

                let dateVip = card.getAttribute("data-date")
                let dueNew = new Date()
                dueNew.setDate(today.getDate() + Number(dateVip))
                Payment[6].querySelectorAll("td")[1].innerHTML = checkTime(dueNew.getDate()) + "/" + checkTime((dueNew.getMonth() + 1)) + "/" + dueNew.getFullYear()
            }
        }
    }
})

let cardsMethods = document.querySelectorAll(".card-method")
cardsMethods.forEach(card => {
    card.onclick = function () {
        cardsMethods.forEach(cardSecond => {
            if (cardSecond.classList.contains("selected")) {
                cardSecond.classList.remove("selected")
            }
        })
        if (!this.classList.contains("selected")) {
            this.classList.add("selected")
        }
        document.querySelector(".banking").style.display = "block"
    }
})

let cellsBanking = document.querySelectorAll(".cell")
cellsBanking.forEach(cell => {
    cell.onclick = function () {
        cellsBanking.forEach(cellSecond => {
            if (cellSecond.classList.contains("selected")) {
                cellSecond.classList.remove("selected")
            }
        })
        if (!this.classList.contains("selected")) {
            this.classList.add("selected")
        }
        document.querySelector(".last-note").style.display = "block"
        document.querySelector(".btn-payment").classList.remove("disable")
    }
})

let accountDataB = sessionStorage.getItem("account")
if (accountDataB) {
    $(".btn-payment").click(function () {
        if (!$(this).hasClass("disable")) {
            let account = JSON.parse(accountDataB)
            account.isVip = true
            sessionStorage.setItem("account", JSON.stringify(account))
        }
    })
} else {
    $(".btn-payment").click(function () {
        if (!$(this).hasClass("disable")) {
            $("#myModalSecond").css("display", "flex")
            $("body").css("overflow", "hidden")
            let notifyFrom = $("#addForm")
            notifyFrom.show()
            notifyFrom.find(".addForm-notify").text("Hãy đăng nhập thực hiện tính năng này")
        }
    })
    $("#myModalSecond").css("display", "flex")
    $("body").css("overflow", "hidden")
    let notifyFrom = $("#addForm")
    notifyFrom.show()
    notifyFrom.find(".addForm-notify").text("Hãy đăng nhập thực hiện tính năng này")
}