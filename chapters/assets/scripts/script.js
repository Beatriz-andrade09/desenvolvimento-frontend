function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');

    const menuItems = menu.querySelectorAll('li');

    menuItems.forEach(item => {
        if (item.classList.contains('mobile-hidden')) {
            item.classList.remove('active');
            item.style.display = "none"; 
        }
    });
}

function resetMenu() {
    const menu = document.querySelector('.menu');
    const menuItems = menu.querySelectorAll('li');

    menuItems.forEach(item => {
        item.classList.remove('active');
        item.style.display = ""; 
    });

    menu.classList.remove('active');
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        resetMenu(); 
    }
});
