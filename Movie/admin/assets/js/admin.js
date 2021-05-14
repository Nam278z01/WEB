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
let darkmode_toggle = document.querySelector('#darkmode-toggle')
document.querySelector('body').classList.add('dark');
darkmode_toggle.querySelector('.darkmode-switch').classList.add('active')
darkmode_toggle.onclick = (e) => {
    e.preventDefault()
    document.querySelector('body').classList.toggle('dark')
    darkmode_toggle.querySelector('.darkmode-switch').classList.toggle('active')
}