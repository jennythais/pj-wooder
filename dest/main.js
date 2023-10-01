// Scroll
function changeBg() {
    const header = document.querySelector(".header");
    window.addEventListener("scroll", function () {
        const scrollY = window.scrollY;
        console.log(scrollY);
        const heightHeader = header.clientHeight;
        if (scrollY >= heightHeader) {
            header.classList.add("--bg-black");
        } else {
            header.classList.remove("--bg-black");
        }
    });
}
changeBg();
// Click language
function selectLang() {
    const lang = document.querySelector(".header__right-lang");
    const langItems = document.querySelectorAll(".header__right .select li");
    const langCurr = document.querySelector(".header__right .curr .curr__text");
    lang.addEventListener("click", (event) => {
        event.stopPropagation();
        lang.classList.toggle("active");
    });
    langItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            [langCurr.innerHTML, item.innerHTML] = [item.innerHTML, langCurr.innerHTML];
        });
    });
    document.addEventListener("click", () => {
        lang.classList.remove("active");
    });
}
selectLang();
// Back to top
function backToTop() {
    const showBtn = 1000;
    const btn = document.querySelector('.footer .btn');

    function handleScroll() {
        if (window.scrollY > showBtn) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Kiểm tra ban đầu

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: "smooth" })
    })
}
backToTop();

// Menu
function clickbtn() {
    const icon = document.querySelector(".header__right-btnmenu");
    const mobileNav = document.querySelector(".mobile__nav");
    const header = document.querySelector(".header");

    icon.addEventListener("click", function () {
        if (!icon.classList.contains("--active")) {
            header.classList.add("--none");
            icon.classList.add("--active");
            mobileNav.classList.add("--active-nav");
        } else {
            header.classList.remove("--none");
            icon.classList.remove("--active");
            mobileNav.classList.remove("--active-nav");
        }
    });
}
clickbtn();

// Play video
function playVideo() {
    const video = document.querySelectorAll(".scvideo__list .scvideo__list-item .video");
    const modal = document.querySelector(".popupvideo");
    const iFrame = document.querySelector(".popupvideo .popupvideo__inner .popupvideo__inner-iframe iframe");
    const close = document.querySelector(".popupvideo .popupvideo__inner .popupvideo__inner-iframe .popupvideo__inner-close");

    video.forEach(function (videos) {
        videos.addEventListener("click", function () {
            modal.classList.add("active");
            let dataID = videos.getAttribute("data-video-src");
            iFrame.setAttribute("src", `https://www.youtube.com/embed/${dataID}?autoplay=1`);
        });
    });

    const watchBtn = document.getElementById("watchBtn");
    watchBtn.addEventListener("click", function () {
        modal.classList.add("active");
        const videoId = 'EUhIIbiFrCs';
        iFrame.setAttribute("src", `https://www.youtube.com/embed/${videoId}?autoplay=1`);
    });

    function closeVideo() {
        modal.classList.remove("active");
        iFrame.setAttribute("src", "");
    }
    modal.addEventListener("click", function () {
        closeVideo();
    });
    close.addEventListener("click", function () {
        closeVideo();
    });
}
playVideo();

// Tabs
function tabs() {
    const tabs = document.querySelectorAll(".scnew__categories .tabs");
    const news = document.querySelectorAll(".scnews__wrap .scnew__postlist");
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            tabs.forEach((tab) => tab.classList.remove("--active-text"));
            tab.classList.add("--active-text");

            const dataTabs = tab.getAttribute("data-tab");

            news.forEach(function (newList) {
                newList.classList.remove("active");
            });
            document.querySelector(`.news-list-${dataTabs}`).classList.add("active");
        });
    });
}
tabs();

// Click nav to section for mobile
function menuOfNav() {
    const navLinks = document.querySelectorAll(".mobile__nav-menu li a");
    const mobileHide = document.querySelector('.mobile__nav');
    const headerHide = document.querySelector('.header');
    const menuHide = document.querySelector('.header__right-btnmenu');
    const headerHeight = document.querySelector('header').offsetHeight;

    navLinks.forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();

            const target = this.getAttribute("href").replace('#', '');
            const section = document.querySelector('.' + target);

            mobileHide.classList.remove('--active-nav');
            menuHide.classList.remove('--active');
            headerHide.classList.remove('--none');

            // Calculate the position to scroll to
            const position = section.offsetTop - headerHeight;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });
        })
    })

}
menuOfNav();


// Scroll to section
let listSection = [];
function menu() {
    let menus = document.querySelectorAll('.header__menu li a');
    let heightHeader = document.querySelector('header').offsetHeight;

    // Tạo danh sách các phần tử section
    listSection = Array.from(document.querySelectorAll('section'));

    menus.forEach(function (element, index) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            let href = element.getAttribute('href').replace('#', '');
            let section = document.querySelector('.' + href);

            // Loại bỏ lớp 'active' khỏi tất cả các phần tử menu
            menus.forEach((menuElement) => menuElement.classList.remove('active'));
            element.classList.add('active');

            let position = section.offsetTop;
            window.scrollTo({
                top: position - heightHeader,
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', function (e) {
        let positionScroll = window.pageYOffset;

        menus.forEach((menuElement) => menuElement.classList.remove('active'));
        listSection.forEach(function (section, index) {
            let sectionTop = section.offsetTop;
            let sectionBottom = sectionTop + section.offsetHeight;

            if (positionScroll >= sectionTop - heightHeader && positionScroll < sectionBottom - heightHeader) {
                let sectionClass = section.className.split(' ')[0];
                let menuElement = document.querySelector('a[href="#' + sectionClass + '"]');

                if (menuElement) {
                    menuElement.classList.add('active');
                }
            }
        });
    });
}
menu();

// progcess bar
function progressBar() {
    const progressBar = document.querySelector('.progress__bar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = progress + '%';
}
window.addEventListener('scroll', progressBar);


// Slider Hero
function handleSlider() {
    var slider = document.querySelector('.slider__item-wrap');
    var flktySlider = new Flickity(slider, {
        // options
        cellAlign: 'left',
        contain: true,
        draggable: '>1',
        prevNextButtons: false,
        wrapAround: true,
        // pageDots: false,
        on: {
            ready: function () {
                handleDots();
            },
            change: function (index) {
                console.log('Slide changed to' + index);
                handlePaging(index)
            }
        }
    });

    // Control
    let btnPrev = document.querySelector('.btn.--control.--prev')
    btnNext = document.querySelector('.btn.--control.--next')

    btnPrev.addEventListener('click', function () {
        flktySlider.previous(true)
    })

    btnNext.addEventListener('click', function () {
        flktySlider.next(true)
    })

    // Dots
    function handleDots() {
        let dotSlider = document.querySelector('.flickity-page-dots')
        dotSliderBottom = document.querySelector('.slider__bottom-pages');

        dotSliderBottom.appendChild(dotSlider);
    }

    //Paging
    function handlePaging(index) {
        let numberPage = document.querySelector('.slider__bottom-pages .number .number__current')
        numberPage.innerHTML = (index + 1).toString().padStart(2, 0)
    }

}
handleSlider()

// Galarry
function galarry() {
    Fancybox.bind('[data-fancybox]', {
        infinite: true,
        keyboard: {
            Escape: "close",
            Delete: "close",
            Backspace: "close",
            PageUp: "next",
            PageDown: "prev",
            ArrowUp: "prev",
            ArrowDown: "next",
            ArrowRight: "next",
            ArrowLeft: "prev",
        },
        loop: false,
        Thumbs: {
            type: "classic"
        },
        dragToClose: false,
    });
}
galarry();

window.addEventListener('load', function () {
    function handleCarousel() {
        var elem = document.querySelector('.sccarousel__list');
        var processBar = document.querySelector('.sccarousel__processbar-process');
        var carousel = new Flickity(elem, {
            // options
            cellAlign: 'left',
            contain: true,
            draggable: '>1',
            prevNextButtons: false,
            wrapAround: true,
            autoPlay: true,
        });
        carousel.on('change', function (index) {
            var slideWidth = 100 / carousel.cells.length;
            var progressWidth = slideWidth * (index + 1);
            processBar.style.width = progressWidth + '%';
        });
    }
    handleCarousel()
})

function initLoading() {
    let loadCount = 0;
    let img = document.querySelectorAll('img').length;
    let container = document.querySelector('body');
    let imgLoaded = imagesLoaded(container);

    imgLoaded.on('progress', (instance) => {
        loadCount++;
        let percent = Math.floor((loadCount / img) * 100);
        handleLoading(percent);
    }).on('always', (instance) => {
        console.log('always');
    }).on('fail', (instance) => {
        console.log('fail');
    }).on('done', (instance) => {
        console.log('done');
        hideLoading();
    });
    function handleLoading(percent) {
        const progress = document.querySelector('.loading__inner-progress');
        const loadingPercent = document.querySelector('.loading__percent');
        progress.style.width = `${percent}%`;
        loadingPercent.innerHTML = `${percent}%`;
    }
    function hideLoading() {
        const loading = document.querySelector('.loading');
        const body = document.querySelector('body');
        loading.classList.add('--is-loaded');
        body.classList.remove('--disable-scroll');
    }
}
initLoading();
