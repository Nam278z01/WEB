const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let header = $('#header')
let btnSidebar = header.querySelector('.header__brand i')

let sidebar = $("#sidebar")
let btnMenu = sidebar.querySelector('.sidebar__brand i')

let slideEntire = $('.content__slide')
let slide = slideEntire.querySelector('.content__slide-list')
let slideItem = slide.querySelectorAll('.slide-list__item')
let btnSlideMovie = slideEntire.querySelectorAll('.slide-pick__item')
let lengthSlideItem = slideItem.length
slide.append(slideItem[0].cloneNode(true))
slide.prepend(slideItem[lengthSlideItem - 1].cloneNode(true))

let modal = $('#modal')
let modalBody = modal.querySelector('.modal__body')
let modalVideoPopup = modalBody.querySelector('.modal-body__video-popup')
let btnHideModal = modalVideoPopup.querySelector('.btn__hideModal')
let videoPopup = modalVideoPopup.querySelector('.modal-video-popup__container iframe')

let btnTrailer = $$('.btn__trailer')

const app = {
    currentIdx: 1,
    walk: 0,
    startX: 0,
    isDown: false,
    isRun: false,
    time1: new Date,
    time2: new Date,
    // Xử lý sự kiện
    handleEvent() {
        const _this = this

        // Toggle sidebar nhỏ/lớn
        btnMenu.onclick = () => {
            sidebar.classList.toggle('small')
        }

        // Scroll hiện header
        window.onscroll = () => {
            let posTop = $('html').scrollTop
            if (posTop >= 80) {
                header.classList.add('header-show')
            } else {
                header.classList.remove('header-show')
            }
        }

        // Click để chuyển slide
        btnSlideMovie.forEach((ele, idx) => {
            ele.onclick = function () {
                if (!this.classList.contains('picked')) {
                    _this.currentIdx = idx + 1
                    _this.moveSlide(_this.currentIdx)
                }
            }
        })

        // Tự động chạy slide sau 5s
        let mySetInterval = setInterval(() => {
            if (this.currentIdx == lengthSlideItem + 1) { //Bé transitionend ko chạy nên phải làm cái này ...
                this.currentIdx = 1
            }
            _this.moveSlide(_this.currentIdx + 1)
        }, 5000)

        // Dừng slide khi mouseover lên toàn bộ silde
        slideEntire.onmouseover = () => {
            clearInterval(mySetInterval)
            mySetInterval = undefined
        }

        // Kích hoạt auto chạy slide khi mouseleave lên toàn bộ silde
        slideEntire.onmouseleave = () => {
            if (mySetInterval == undefined) {
                mySetInterval = setInterval(() => {
                    if (this.currentIdx == lengthSlideItem + 1) {
                        this.currentIdx = 1
                    }
                    _this.moveSlide(_this.currentIdx + 1)
                }, 5000)
            }
        }

        // Xem trailer
        btnTrailer.forEach(ele => {
            ele.onclick = function () {
                videoPopup.src = this.getAttribute('data-iframe')
                modal.classList.add('show')
                modalVideoPopup.classList.add('show')
            }
        })

        // click vào overlay hoặc X thì ẩn modal
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
                if (!_this.isRun) {
                    _this.isDown = true
                    _this.time1 = new Date()
                    _this.walk = 0
                    _this.startX = e.clientX - slide.offsetLeft
                    slide.classList.remove('animation')
                }
                // slide.classList.remove('animation') Bật lên để bỏ độ trễ khi drag thì khi click transition đang chạy sẽ mất event transtionend (Đã xử lý bằng isRun)
            })
        })
        'mouseup touchend'.split(' ').forEach(ele => {
            slide.addEventListener(ele, () => {
                _this.isDown = false
                _this.time2 = new Date()
                _this.moveSlideWhenDrag(_this.walk)
                _this.moveSlide(_this.currentIdx)
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
                    _this.moveSlide(_this.currentIdx)
                }
                _this.isDown = false
            })
        })

        //Loop slide (Hình như transitionend ko hoạt động khi click vào cửa sổ khác (ko trong cửa sổ nó đang chạy))
        slide.ontransitionend = () => {
            if (_this.currentIdx == lengthSlideItem + 1) {
                _this.currentIdx = 1
                slide.classList.remove('animation')
                slide.style.transform = 'translateX(-' + 100 * _this.currentIdx + '%)'
            }
            if (_this.currentIdx == 0) {
                _this.currentIdx = lengthSlideItem
                slide.classList.remove('animation')
                slide.style.transform = 'translateX(-' + 100 * _this.currentIdx + '%)'
            }
            _this.removeClassOfBtnSlide()
            _this.isRun = false
        }
    },
    moveSlideWhenDrag(distance) {
        if ((distance > 40 && this.currentIdx < lengthSlideItem + 1) || (distance > 1 && this.timeSpan(this.time1, this.time2) < 250)) {
            this.currentIdx++
            this.isRun = true
        }
        if ((distance < -40 && this.currentIdx > 0) || (distance < -1 && this.timeSpan(this.time1, this.time2) < 250)) {
            this.currentIdx--
            this.isRun = true
        }
    },
    moveSlide(num) {
        this.currentIdx = num
        slide.classList.add('animation')
        slide.style.transform = 'translateX(-' + 100 * this.currentIdx + '%)'
    },
    // xóa class piked ở nút chọn chuyển slide
    removeClassOfBtnSlide() {
        btnSlideMovie.forEach(ele => {
            ele.classList.remove('picked')
        })
        btnSlideMovie[this.currentIdx - 1].classList.add('picked')
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


// Animation Hover Slide
let topSlide = $('#top-slide')
let slideListMovie = topSlide.querySelectorAll('.list-movie__slide-item')
let countSlide = slideListMovie.length
let eleInView = 6

slideListMovie.forEach(ele => {
    let myTimeOut
    ele.onmouseenter = () => {
        myTimeOut = setTimeout(() => {
            ele.classList.add('aniScale')
            ele.classList.add('show')
            if (ele.offsetLeft < ele.offsetWidth) {
                ele.classList.add('first')
                ele.classList.add('aniTranslateHalfRight')
                let leftThis = true
                slideListMovie.forEach(ele => {
                    if (!ele.classList.contains('aniScale')) {
                        if (!leftThis) {
                            ele.classList.add('aniTranslateRight')
                        }
                    } else {
                        leftThis = false
                    }
                })
            } else if (ele.offsetLeft < ele.offsetWidth * (eleInView - 1)) {
                let leftOfThis = true
                slideListMovie.forEach(ele => {
                    if (!ele.classList.contains('aniScale')) {
                        if (leftOfThis) {
                            ele.classList.add('aniTranslateHalfLeft')
                        } else {
                            ele.classList.add('aniTranslateHalfRight')
                        }
                    } else {
                        leftOfThis = false
                    }
                })
            } else {
                ele.classList.add('last')
                ele.classList.add('aniTranslateHalfLeft')
                let leftThis = false
                slideListMovie.forEach(ele => {
                    if (!ele.classList.contains('aniScale')) {
                        if (!leftThis) {
                            ele.classList.add('aniTranslateLeft')
                        }
                    } else {
                        leftThis = true
                    }
                })
            }
        }, 200)
    }
    ele.onmouseleave = () => {
        clearTimeout(myTimeOut)
        slideListMovie.forEach(ele => {
            'show aniScale first last aniTranslateHalfLeft aniTranslateHalfRight aniTranslateLeft aniTranslateRight'.split(' ').forEach(eleClass => {
                ele.classList.remove(eleClass)
            })
        })
    }
})

// Multiple slide
function Slide(options) {
    let currentIdx = 0

    let slideChildren = options.selector.children
    let btnNext = slideChildren[0]
    let btnPrev = slideChildren[1]
    let slide = slideChildren[2]

    let countEleSlide = slide.children[0].childElementCount
    let jump = (countEleSlide % 6) / 6 * 100

    let show = () => {
        if (countEleSlide >= eleInView) {
            if (currentIdx * eleInView < countEleSlide - eleInView) {
                btnNext.classList.add('btn--show')
            }
            if (currentIdx > 0) {
                btnPrev.classList.add('btn--show')
            }
        }
    }

    let hide = () => {
        btnNext.classList.remove('btn--show')
        btnPrev.classList.remove('btn--show')
    }

    options.selector.addEventListener('mouseenter', show)
    options.selector.addEventListener('mouseleave', hide)
    // Next slide
    btnNext.onclick = () => {
        if (currentIdx * eleInView < countEleSlide - eleInView) {
            if (countEleSlide - currentIdx * eleInView < 2 * eleInView) {
                moveSlide(++currentIdx, jump - 100)
            }
            else {
                moveSlide(++currentIdx, 0)
            }
        }
        if (currentIdx * eleInView >= countEleSlide - eleInView) {
            btnNext.classList.remove('btn--show')
        }
        btnPrev.classList.add('btn--show')
    }

    // Prev slide
    btnPrev.onclick = () => {
        if (currentIdx > 0) {
            if (currentIdx * eleInView - countEleSlide % eleInView < eleInView) {
                moveSlide(0, 0)
            }
            else {
                moveSlide(--currentIdx, jump - 100)
            }
        }
        if (currentIdx == 0) {
            btnPrev.classList.remove('btn--show')
        }
        btnNext.classList.add('btn--show')
    }

    // Move slide
    function moveSlide(index, percentJump) {
        slide.animate([
            { transform: `translateX(calc(${-100 * index - percentJump}% - ${4 * index}px))` }
        ], {
            duration: options.duration,
            fill: 'forwards'
        })
        currentIdx = index
    }
}

Slide({
    selector: topSlide,
    duration: 300
})


// ! Cấu trúc HTML slide
// <div id="tên slide" {bọc toàn bộ slide} {padding nó và overflow}>
//      button=next
//      button-prev
//      <div {bọc slide} {width: 100%}> {transform: translateX cái này}
//          <div {row cho tràn} (flex-shirk: 0) or white-space: nowrap>
//              <div {column} flex-shirk: 0 or (white-space: nowrap)></div>
//              <div {column}></div>
//          </div >
//      </div >
// </div >
