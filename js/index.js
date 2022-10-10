document.addEventListener('DOMContentLoaded', function () {
  header()
  catalogSort()
})
$(window).on('load', function () {
  map()
})

function catalogSort() {
  const sortItem = '.catalog-sort__item'
  const sortItemActive = 'catalog-sort__item--active'

  if ($('.catalog-sort').length > 0) {
    const sortSlider = new Swiper('.catalog-sort .swiper', {
      spaceBetween: 10,
      slidesPerView: 'auto',
      freeMode: true,
      breakpoints: {
        767: {
          slidesPerView: 'auto',
          spaceBetween: 20
        }
      }
    })

    $(sortItem).on('click', function () {
      if (!$(this).hasClass(sortItemActive)) {
        $(this).siblings(sortItem).removeClass(sortItemActive)
        $(this).addClass(sortItemActive)
      }
    })
  }
}

function map() {
  if (document.querySelector('#map')) {
    ymaps.ready(mapInit)
  }
}

function mapInit() {
  let myMap
  myMap = new ymaps.Map('map', {
    center: [51.631882, 39.046945],
    zoom: 14,
    controls: []
  }, {
    suppressMapOpenBlock: true
  })
  const placemark = new ymaps.Placemark([51.631882, 39.046945], {}, {
    iconColor: '#616a38'
  })

  myMap.geoObjects.add(placemark)
  myMap.behaviors.disable('scrollZoom')
  if (window.innerWidth < 1025) {
    myMap.behaviors.disable('drag')
  }
}

function header() {
  const headerBlock = document.querySelector('.header')
  const burgerButton = document.querySelector('.header__burger-btn')

  for (const link of headerBlock.querySelectorAll('.header__menu-link')) {
    link.addEventListener('click', function () {
      headerBurgerClose()
    })
  }

  burgerButton.addEventListener('click', function () {
    $(this).hasClass('active') ? headerBurgerClose() : headerBurgerOpen()
  })
}

function headerBurgerOpen() {
  $('html').addClass('ov-hidden')
  $('.header__burger-btn').addClass('active')
  $('.header').addClass('header--open')
}
function headerBurgerClose() {
  $('.header__burger-btn').removeClass('active')
  $('.header').removeClass('header--open')
  $('html').removeClass('ov-hidden')
}

function getPopup(popup, source) {
  const popupSource = source || popup.data('src')
  const linkIndex = popup.index()

  Fancybox.show(
    [{
      src: popupSource,
      preload: false
    }],
    {
      mainClass: 'popup',
      parentEl: document.querySelector('.wrapper'),
      showClass: 'fancybox-fadeIn',
      hideClass: 'fancybox-fadeOut',
      hideScrollbar: true,
      touch: false,
      autoFocus: true,
      trapFocus: true,
      dragToClose: false,
      on: {
        done: (fancybox, slide) => {
          if (popupSource === '#object-popup') {
            tabs()
          }
        }
      }
    })
  Fancybox.defaults.ScrollLock = false
  return false
}

function tabs() {
  const tabsHead = '.tabs-head'

  if ($(tabsHead).length > 0) {
    const tabsNav = document.querySelector(tabsHead)

    const tabsHeadSlider = new Swiper(tabsNav.querySelector('.swiper'), {
      spaceBetween: 0,
      slidesPerView: 'auto',
      freeMode: true
    })
    const tabsMainSlider = new Swiper('.tabs-main .swiper', {
      spaceBetween: 0,
      autoHeight: true,
      slidesPerView: 1,
      thumbs: {
        swiper: tabsHeadSlider
      },
      on: {
        slideChange: function () {
          tabsHeadSlider.slideTo(this.activeIndex, 300)
        }
      }
    })
  }
}
