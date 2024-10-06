document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarItems = document.querySelector('.navbar-items');

    menuToggle.addEventListener('click', () => {
        navbarItems.classList.toggle('active');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            navbarItems.classList.remove('active');
        }
    });
});