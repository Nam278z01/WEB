const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let header = $('header')
let sidebar = $("#sidebar")
let btnMenu = sidebar.querySelector('.sidebar__brand i')
let slideEntire = $('.content__slide')
let slide = slideEntire.querySelector('.content__slide-list')
let slideItem = slide.querySelectorAll('.slide-list__item')
let btnSlideMovie = slideEntire.querySelectorAll('.slide-pick__item')
let modal = $('#modal')
let modalBody = modal.querySelector('.modal__body')
let modalVideoPopup = modalBody.querySelector('.modal-body__video-popup')
let btnHideModal = modalVideoPopup.querySelector('.btn__hideModal')
let videoPopup = modalVideoPopup.querySelector('.modal-video-popup__container iframe')
let btnTrailer = $$('.btn__trailer')
slide.append(slideItem[0].cloneNode(true))
slide.prepend(slideItem[slideItem.length - 1].cloneNode(true))

const app = {
    currentIdx: 1,
    walk: 0,
    startX: 0,
    isDown: false,
    time1: new Date,
    time2: new Date,
    // Xử lý sự kiện
    handleEvent() {
        const _this = this

        // Toggle sidebar nhỏ/lớn
        btnMenu.onclick = () => {
            sidebar.classList.toggle('small')
        }

        // Click để chuyển slide
        btnSlideMovie.forEach((ele, idx) => {
            ele.onclick = function () {
                if (!this.classList.contains('picked')) {
                    _this.currentIdx = idx + 1
                    _this.removeClassOfBtnSlide()
                    slide.classList.add('animation')
                    slide.style.transform = 'translateX(-' + 100 * _this.currentIdx + '%)'
                }
            }
        })

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

        // Xem trailer
        btnTrailer.forEach(ele => {
            ele.onclick = function () {
                videoPopup.src = this.getAttribute('data-iframe')
                modal.classList.add('show')
                modalVideoPopup.classList.add('show')
            }
        })

        // click vào overlay thì ẩn modal
        window.onclick = e => {
            if (e.target.classList.contains('modal__body')) {
                modal.classList.remove('show')
                modalVideoPopup.classList.remove('show')
                videoPopup.src = ''
            }
        }
        btnHideModal.onclick = () => {
            modal.classList.remove('show')
            modalVideoPopup.classList.remove('show')
            videoPopup.src = ''
        }

        // Kéo slide
        'mousedown touchstart'.split(' ').forEach(ele => {
            slide.addEventListener(ele, e => {
                _this.isDown = true
                _this.time1 = new Date()
                _this.walk = 0
                _this.startX = e.clientX - slide.offsetLeft
                slide.classList.add('animation')
                slide.classList.add('stop')
            })
        })
        'mouseup touchend'.split(' ').forEach(ele => {
            slide.addEventListener(ele, () => {
                _this.isDown = false
                _this.time2 = new Date()
                _this.moveSlideWhenDrag(_this.walk)
                _this.removeClassOfBtnSlide()
                slide.style.transform = 'translateX(-' + 100 * _this.currentIdx + '%)'
                _this.loopSlide()
                slide.classList.remove('stop')
            })
        })
        'mousemove touchmove'.split(' ').forEach(ele => {
            slide.addEventListener(ele, e => {
                if (!_this.isDown) {
                    return
                } else {
                    e.preventDefault()
                    _this.walk = (_this.startX - e.clientX - slide.offsetLeft) / slide.offsetWidth * 100
                    slide.style.transform = 'translateX(' + (-(100 * _this.currentIdx + _this.walk)) + '%)'
                }
            })
        })
        'mouseleave touchcancel'.split(' ').forEach(ele => {
            slide.addEventListener(ele, () => {
                if (_this.isDown) {
                    time2 = new Date()
                    _this.moveSlideWhenDrag(_this.walk)
                    _this.removeClassOfBtnSlide()
                    slide.style.transform = 'translateX(-' + 100 * _this.currentIdx + '%)'
                }
                _this.isDown = false
                slide.classList.remove('stop')
            })
        })
    },
    moveSlideWhenDrag(distance) {
        if ((distance > 40 && this.currentIdx + 1 < btnSlideMovie.length + 2) || (distance > 0 && this.timeSpan(this.time1, this.time2) < 250)) {
            this.currentIdx++
        }
        if ((distance < -40 && this.currentIdx - 1 > -1) || (distance < 0 && this.timeSpan(this.time1, this.time2) < 250)) {
            this.currentIdx--
        }
        console.log(this.timeSpan(this.time1, this.time2))
    },
    // Tự động chạy slide
    autoSlide() {
        this.currentIdx++
        slide.classList.add('animation')
        slide.style.transform = 'translateX(-' + 100 * this.currentIdx + '%)'
        this.loopSlide()
        this.removeClassOfBtnSlide()
    },
    loopSlide() {
        slide.addEventListener('transitionend', () => {
            if (this.currentIdx == btnSlideMovie.length + 1) {
                this.currentIdx = 1
                slide.classList.remove('animation')
                slide.style.transform = 'translateX(-' + 100 * this.currentIdx + '%)'
            }
            if (this.currentIdx == 0) {
                this.currentIdx = btnSlideMovie.length
                slide.classList.remove('animation')
                slide.style.transform = 'translateX(-' + 100 * this.currentIdx + '%)'
            }
        })
    },
    // xóa class piked ở nút chọn chuyển slide
    removeClassOfBtnSlide() {
        btnSlideMovie.forEach(ele => {
            ele.classList.remove('picked')
        })
        let idx = this.currentIdx
        if (this.currentIdx == 0) {
            idx = 5
        } else if (this.currentIdx == 7) {
            idx = 0
        } else {
            idx--
        }
        btnSlideMovie[idx].classList.add('picked')
    },
    timeSpan(time1, time2) {
        return time2.getTime() - time1.getTime()
    },
    start() {
        // Xử lý sự kiện
        this.handleEvent()
    }
}

app.start()
