document.querySelectorAll('.sidebar-submenu').forEach(e => {
    e.querySelector('.sidebar-menu-dropdown').onclick = (event) => {
        event.preventDefault();
        e.querySelector('.sidebar-menu-dropdown .dropdown-icon').classList.toggle('active')

        let dropdown_content = e.querySelector('.sidebar-menu-dropdown-content')
        let dropdown_content_list = dropdown_content.querySelectorAll('li')

        let active_height = dropdown_content_list[0].clientHeight * dropdown_content_list.length;

        dropdown_content.classList.toggle('active')

        dropdown_content.style.height = dropdown_content.classList.contains('active') ? active_height + 'px' : '0'

    }
})

// DARK MODE TOGGLE
let darkMode_toggle = document.querySelector('#darkmode-toggle')
darkMode_toggle.onclick = (e) => {
    e.preventDefault()
    document.querySelector('body').classList.toggle('dark')
    darkMode_toggle.querySelector('.darkmode-switch').classList.toggle('active')
}

//Thêm phim lẻ
let btnAddMovies = document.querySelector('#btn-add-movies')
let body = document.querySelector('body')
let modal = document.querySelector('.modal')

btnAddMovies.onclick = (e) => {
    body.style.overflow = 'hidden'
    modal.style.display = 'block'

    let content = `<div class="modal-overlay"></div>

        <div class="modal-body">
            <div id="modal-add-movies">
                <div class="modal-title">
                    <span>Thêm phim lẻ</span>
                    <div class="btn-quit">
                        <i class='bx bx-x-circle'></i>
                    </div>
                </div>
                <div class="modal-movies-content">
                    <div class="modal-movies-info">
                        <p class="modal-info-title">Mã phim</p>
                        <input type="text">
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">Tên phim</p>
                        <input type="text">
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">
                            <span>Thể loại</span>
                            <input type="text" placeholder="Tìm kiếm">
                        </p>
                        <ul>
                            <li class="modal-loai">
                                <input type="checkbox" id="genre-sci-fi">
                                <label for="genre-sci-fi">Khoa học viễn tưởng</label>
                            </li>
                            <li class="modal-loai">
                                <input type="checkbox" id="genre-fantasy">
                                <label for="genre-fantasy">Giả tưởng</label>
                            </li>
                            <li class="modal-loai">
                                <input type="checkbox" id="genre-sensational">
                                <label for="genre-sensational">Giật gân</label>
                            </li>
                            <li class="modal-loai">
                                <input type="checkbox" id="genre-thrilling">
                                <label for="genre-thrilling">Kinh dị</label>
                            </li>
                            <li class="modal-loai">
                                <input type="checkbox" id="genre-action">
                                <label for="genre-action">Hành động</label>
                            </li>
                            <li class="modal-loai">
                                <input type="checkbox" id="genre-funny">
                                <label for="genre-funny">Hài</label>
                            </li>
                            <li class="modal-loai">
                                <input type="checkbox" id="genre-stand-up-comedy">
                                <label for="genre-stand-up-comedy">Hài độc thoại</label>
                            </li>
                            <li class="modal-loai">
                                <input type="checkbox" id="genre-love">
                                <label for="genre-love">Lãng mạn</label>
                            </li>
                            <li class="modal-loai">
                                <input type="checkbox" id="genre-drama">
                                <label for="genre-drama">Phim chính kịch</label>
                            </li>
                            <li class="modal-loai">
                                <input type="checkbox" id="genre-documentary">
                                <label for="genre-documentary">Phim tài liệu</label>
                            </li>
                            <li class="modal-loai">
                                <input type="checkbox" id="genre-kid">
                                <label for="genre-kid">Trẻ em và gia đình</label>
                            </li>
                            <li class="modal-loai">
                                <input type="checkbox" id="genre-anime">
                                <label for="genre-anime">Anime</label>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">
                            <span>Nhà sản xuất</span>
                            <input type="text" placeholder="Tìm kiếm">
                        </p>
                        <ul>
                            <li class="modal-nsx">
                                <input type="checkbox" id="nsx1">
                                <label for="nsx1"></label>
                            </li>
                            <li class="modal-director">
                                <input type="checkbox" id="nsx2">
                                <label for="nsx2"></label>
                            </li>
                            <li class="modal-director">
                                <input type="checkbox" id="nsx3">
                                <label for="nsx3"></label>
                            </li>
                            <li class="modal-director">
                                <input type="checkbox" id="nsx4">
                                <label for="nsx4"></label>
                            </li>
                            <li class="modal-director">
                                <input type="checkbox" id="nsx5">
                                <label for="nsx5"></label>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">
                            <span>Diễn viên</span>
                            <input type="text" placeholder="Tìm kiếm">
                        </p>
                        <ul>
                            <li class="modal-actor">
                                <input type="checkbox" id="actor1">
                                <label for="actor1">Al Pacino</label>
                            </li>
                            <li class="modal-actor">
                                <input type="checkbox" id="actor2">
                                <label for="actor2">James Caan</label>
                            </li>
                            <li class="modal-actor">
                                <input type="checkbox" id="actor3">
                                <label for="actor3">Sandra Bullock</label>
                            </li>
                            <li class="modal-actor">
                                <input type="checkbox" id="actor4">
                                <label for="actor4">Michelle Borth</label>
                            </li>
                            <li class="modal-actor">
                                <input type="checkbox" id="actor5">
                                <label for="actor5">Mark Strong</label>
                            </li>
                            <li class="modal-actor">
                                <input type="checkbox" id="actor6">
                                <label for="actor6">Zachary Levi</label>
                            </li>
                            <li class="modal-actor">
                                <input type="checkbox" id="actor7">
                                <label for="actor7">Adrianne Palicki</label>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">
                            <span>Đạo diễn</span>
                            <input type="text" placeholder="Tìm kiếm">
                        </p>
                        <ul>
                            <li class="modal-director">
                                <input type="checkbox" id="director1">
                                <label for="director1">Francis Ford Coppola</label>
                            </li>
                            <li class="modal-director">
                                <input type="checkbox" id="director2">
                                <label for="director2">Chad Stahelski</label>
                            </li>
                            <li class="modal-director">
                                <input type="checkbox" id="director3">
                                <label for="director3">Michael Keaton</label>
                            </li>
                            <li class="modal-director">
                                <input type="checkbox" id="director4">
                                <label for="director4">Kyle Balda</label>
                            </li>
                            <li class="modal-director">
                                <input type="checkbox" id="director5">
                                <label for="director5">Pierre Coffin</label>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">Quốc gia</p>
                        <input type="text">
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">Ngày phát hành</p>
                        <input type="date">
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">Ảnh dọc</p>
                        <input type="file">
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">Ảnh ngang</p>
                        <input type="file">
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">Ảnh lớn</p>
                        <input type="file">
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">Ảnh tên phim</p>
                        <input type="file">
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">Video</p>
                        <input type="file">
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">Trailer</p>
                        <input type="file">
                    </div>
                    <div class="modal-movies-info">
                        <p class="modal-info-title">Mô tả</p>
                        <textarea></textarea>
                    </div>
                </div>
                <div class="modal-btn">
                    <button class="btn" id="btn-kill">Hủy</button>
                    <button class="btn btn-outline" id="btn-add">Thêm</button>
                </div>
            </div>
        </div>`
    modal.innerHTML = content

    let modalBody = modal.querySelector('.modal-body')

    let btnQuit = modalBody.querySelector('.btn-quit')
    let btnKill = modalBody.querySelector('#btn-kill')
    btnQuit.onclick = (e) => {
        body.style.overflow = 'auto'
        modal.style.display = 'none'
        modal.innerHTML = ""
    }
    btnKill.onclick = (e) => {
        body.style.overflow = 'auto'
        modal.style.display = 'none'
        modal.innerHTML = ""
    }

    modal.onclick = (e) => {
        if (e.target == modalBody) {
            body.style.overflow = 'auto'
            modal.style.display = 'none'
            modal.innerHTML = ""
        }
    }
    let btnAdd = modalBody.querySelector('#btn-add')
    btnAdd.onclick = (e) => {
        let pathVideo = modalBody.querySelector('.modal-movies-info:nth-last-child(2) > input[type="file"]').value
        let index = pathVideo.lastIndexOf(`\\`)
        pathVideo = pathVideo.slice(index)
    }
}
function addMovie(id, name, genres, actor, director, anhDoc, anhNgang, anhLon, anhTen, country, view, description, admin, nsx, trailer, date, pathVideo) {
    let content = `<div class="box-container">
                    <div class="box-movie">
                        <div class="box-wrap-img ratioImg__wrap">
                            <img src="../assets/img/${anhDoc}.jpg" class="box-img ratio__in">
                            <div class=box-btn>
                                <button class="btn bx bxs-edit" title="Sửa"></button>
                                <button class="btn bx bxs-x-square" title="Xóa"></button>
                            </div>
                        </div>
                    </div>
                    <div class="box-movie-content">
                        <table>
                            <tr>
                                <td>Mã phim</td>
                                <td>${id}</td>
                                <td>Đạo diễn</td>
                                <td${director}</td>
                            </tr>
                            <tr>
                                <td>Tên phim</td>
                                <td>${name}</td>
                                <td>Diễn viên</td>
                                <td>${actor}</td>
                            </tr>
                            <tr>
                                <td>Thể loại</td>
                                <td>Khoa Học - Viễn Tưởng, Hài Hước</td>
                                <td>Nhà sản xuất</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Quốc gia</td>
                                <td>Mỹ</td>
                                <td>Ngày phát hành</td>
                                <td>05-04-2019</td>
                            </tr>
                            <tr>

                                <td>Ảnh lớn</td>
                                <td>../asset/img/image_big043.jpg</td>
                                <td>Đường dẫn video</td>
                                <td>../asset/video/video043.mp4</td>
                            </tr>
                            <tr>
                                <td>Ảnh ngang</td>
                                <td>../asset/img/image043.jpg</td>
                                <td>Trailer</td>
                                <td>../asset/video/video043.mp4</td>
                            </tr>
                            <tr>
                                <td>Ảnh tên</td>
                                <td>../asset/img/image_name043.png</td>
                                <td>Ngày tải lên</td>
                                <td>02-02-2021</td>
                            </tr>
                            <tr>
                                <td>Lượt xem</td>
                                <td>532.023</td>
                                <td>Người tải lên</td>
                                <td>Nguyễn Nam</td>
                            </tr>
                            <tr>
                                <td>Mô tả</td>
                                <td colspan="3">Khi thiếu niên mồ côi bộc lộ trái tim chân thành, cậu có được khả năng
                                    biến thành một siêu anh hùng người lớn với nghĩa
                                    vụ bảo vệ thành phố trước những ác nhân tội lỗi.</td>
                            </tr>
                        </table>
                    </div>
                </div>`
    return content
}
