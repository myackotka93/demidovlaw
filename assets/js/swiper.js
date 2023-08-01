const thumbnailSwiper = new Swiper('.slider-thumbnail', {
    spaceBetween: 4,
    slidesPerView: 4.5,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    loop: true,
    centeredSlides: true,
    centeredSlidesOffset: 2000,
    preloadImages: false,
    lazy: true,
    lazy: {
      loadPrevNext: true,
    },
    slideToClickedSlide: true,
    centeredSlidesBounds: true,
  });

const mainSwiper = new Swiper('.slider-main', {
    slidesPerView: 1.04, 
    spaceBetween: 16,
    loop: false,
    breakpoints: {
      750: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
      }
    },
    autoHeight: true,
    observeParents: true,
    observeChildren: true,   
    allowTouchMove: true,
    preloadImages: false,
    lazy: true,
    lazy: {
      loadPrevNext: true,
    },
  
    keyboard: {
      enabled: true,
    },
    thumbs: {
      swiper: thumbnailSwiper
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

const popupTriggers = document.querySelectorAll('.slide-main-button');
const popupContainer = document.querySelector('.modal-container');

popupTriggers.forEach(function(trigger) {
  trigger.addEventListener('click', function() {
    var popupId = trigger.dataset.popupId;

    var popup = document.getElementById(popupId);

    if (popup) {
      popupContainer.classList.add('visible');
      document.body.classList.add('popup-open');

      popupContainer.querySelectorAll('.modal-item').forEach(function(popupElement) {
        if (popupElement.id === popupId) {
          popupElement.style.display = 'block';
        } else {
          popupElement.style.display = 'none';
        }
      });
    }
  });
});

function closePopup() {
  popupContainer.classList.remove('visible');
  popupContainer.querySelectorAll('.modal-item').forEach(function(popupElement) {
    popupElement.style.display = 'none';
    document.body.classList.remove('popup-open');
  });
}

popupContainer.querySelectorAll('.modal-close').forEach(function(closeButton) {
  closeButton.addEventListener('click', function() {
    closePopup();
  });
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closePopup();
  }
});