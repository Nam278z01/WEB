const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let btnMenu = $('#sidebar .sidebar__brand i')
let sidebar = $("#sidebar")
let btnSlideMovie = $$('.slide-pick__item')
let slide = $('.content__slide-list')
let slideEntire = $('.content__slide')
let header = $('header')
let inputSearch = $('.search__container input')
let btnSearch = $('#header__search-form .btn')

const app = {
    currentIdx: 0,
    // Xử lý sự kiện
    handleEvent() {
        const _this = this;
        // Toggle sidebar nhỏ/lớn
        btnMenu.onclick = () => {
            sidebar.classList.toggle('small')
        }

        // Click để chuyển slide
        btnSlideMovie.forEach((ele, idx) => {
            ele.onclick = function () {
                if (!this.classList.contains('picked')) {
                    _this.removeClassOfBtnSlide()
                    this.classList.add('picked')
                    slide.style.transform = 'translateX(-' + 100 * idx + '%)'
                    currentIdx = idx
                }
            }
        })

        window.onscroll = () => {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                header.style.background = 'var(--nav-color)'
                inputSearch.style.background = 'var(--search-color)'
                btnSearch.style.background = 'var(--border-color)'
            }
            else {
                header.style.background = 'transparent'
                inputSearch.style.background = 'transparent'
                btnSearch.style.background = 'transparent'
            }
        }

        // Tự động chạy slide sau 5s
        let mySetInterval = setInterval(() => {
            _this.autoSlide()
        }, 5000)

        // Dừng slide khi mouseover lên toàn bộ silde
        slideEntire.onmouseover = () => {
            clearInterval(mySetInterval)
        }

        // Kích hoạt auto chạy slide khi mouseleave lên toàn bộ silde
        slideEntire.onmouseleave = () => {
            mySetInterval = setInterval(() => {
                _this.autoSlide()
            }, 5000)
        }

    },
    // Tự động chạy slide
    autoSlide() {
        this.currentIdx++
        if (this.currentIdx > btnSlideMovie.length - 1) {
            this.currentIdx = 0
        }
        this.removeClassOfBtnSlide()
        btnSlideMovie[this.currentIdx].classList.add('picked')
        slide.style.transform = 'translateX(-' + 100 * this.currentIdx + '%)'
    },
    // xóa class piked ở nút chọn chuyển slide
    removeClassOfBtnSlide() {
        btnSlideMovie.forEach((ele) => {
            ele.classList.remove('picked')
        })
    },
    start() {
        // Xử lý sự kiện
        this.handleEvent()
    }
}

app.start()
