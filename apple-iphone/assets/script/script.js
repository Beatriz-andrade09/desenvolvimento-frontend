const iphoneOptions = document.querySelector('.iphone-options');
const infoIphone = document.querySelector('.text-iphone');
const backgroundIphone = document.querySelector('.option-iphone');

const colorInfo = {
    black: {
        text: 'iPhone 16 Pro Max de 6,9 polegadas2 e iPhone 16 Pro de 6,3 polegadas2 em quatro cores',
        imgSrc: 'assets/images/black.jpg'
    },
    white: {
        text: 'iPhone 16 Pro Max de 6,9 polegadas2 e iPhone 16 Pro de 6,3 polegadas2 em titânio branco',
        imgSrc: 'assets/images/white.jpg'
    },
    gray: {
        text: 'iPhone 16 Pro Max de 6,9 polegadas2 e iPhone 16 Pro de 6,3 polegadas2 em titânio natural',
        imgSrc: 'assets/images/gray.jpg'
    },
    golden: {
        text: 'iPhone 16 Pro Max de 6,9 polegadas2 e iPhone 16 Pro de 6,3 polegadas2 em titânio-deserto',
        imgSrc: 'assets/images/golden.jpg'
    },
    all_colors: {
        text: 'iPhone 16 Pro de 6,3 polegadas2 em quatro cores',
        imgSrc: 'assets/images/all_colors.jpg'
    }
};

function removeActiveClass() {
    const activeButtons = document.querySelectorAll('.iphone-options button.active');
    activeButtons.forEach(button => {
        button.classList.remove('active', 'active-option');
    });
}

function updateColor(button) {
    const buttonClass = button.className;
    button.classList.add('active', 'active-option');

    if (colorInfo[buttonClass]) {
        infoIphone.textContent = colorInfo[buttonClass].text;
        backgroundIphone.setAttribute('src', colorInfo[buttonClass].imgSrc);
    }
}

iphoneOptions.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        removeActiveClass();
        updateColor(event.target);
    }
});


iphoneOptions.addEventListener('keydown', function(event) {
    const buttons = Array.from(iphoneOptions.querySelectorAll('button'));
    const activeButton = iphoneOptions.querySelector('button.active');
    let currentIndex = buttons.indexOf(activeButton);

    if (event.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % buttons.length;
    } else if (event.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    }

    if (currentIndex >= 0) {
        removeActiveClass();
        buttons[currentIndex].focus();
        updateColor(buttons[currentIndex]);
    }
});


const menuMobile = document.querySelector('.menu-mobile');
const menuContainer = document.querySelector('.menu-container');
const mainContainer = document.querySelector('.container');

menuMobile.addEventListener('click', function() {
    menuContainer.classList.toggle('active');
    menuMobile.classList.toggle('active');

    if (!menuContainer.classList.contains('active')) {
        mainContainer.classList.toggle('hidden');
    } else {
        setTimeout(() => {
            mainContainer.classList.toggle('hidden');
        }, 1300);
    }
});
