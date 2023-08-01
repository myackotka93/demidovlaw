require('./loader');

var vh = window.innerHeight * 0.01;
const links = ['header', 'about', 'team', 'actions', 'footer'].reverse();
document.documentElement.style.setProperty('--vh', `${vh}px`);


function visitHeader() {
  lockScroll = false;
}

function visitContent() {
  document.body.classList.add('scrolled');
}

function checkLinkActive() {
  for (let link of links) {
    const element = document.getElementById(link);
    if (window.scrollY >= element.offsetTop - (window.innerHeight / 1.5)) {
      $('a.links').removeClass('active');
      $('a.link-' + link).addClass('active');
      break;
    }
  }
}

if (window.scrollY >= 100) {
  visitContent();
}

checkLinkActive();

window.addEventListener('scroll', function (event) {
  if (window.scrollY >= 100) {
    visitContent();
  } else {
    document.body.classList.remove('scrolled');
    visitHeader();
  }

  checkLinkActive();
});


function toggleAbout(but) {
  var anhor = but.dataset.anhor;
  var activeTab = document.querySelector('.about-info-switch .tab.active');
  var buttons = document.querySelectorAll('.about-info-buttons button');
  var tabs = document.querySelectorAll('.about-info-switch .tab');

  if (activeTab.id == anhor) {
    return;
  }

  for (let button of buttons) {
    if (button == but) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  }

  for (let tab of tabs) {
    if (tab.id == anhor) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  }
}

window.toggleAbout = toggleAbout;

var collapseBlock = '.help-collapse-block';

function initCollapse() {
  var $bodies = $(collapseBlock + '-body');

  $bodies.each(function (index, body) {
    body.dataset.height = $(body).children(collapseBlock + '-body-content').height() + 30;
    body.style.height = 0;
    body.style.opacity = 1;
  });
}


function collapseHelp(self) {
  var $parent = $(self).parent();
  var $body = $parent.children(collapseBlock + '-body');

  $body.animate({height: $parent.hasClass('active') ? 0 : $body[0].dataset.height + 'px'});
  $parent.toggleClass('active');

  $parent.parent().children(collapseBlock).each(function (index, block) {
    if (block != $parent[0]) {
      $(block).removeClass('active');
      $(block).children(collapseBlock + '-body').animate({height: 0});
    }
  });
}
window.collapseHelp = collapseHelp;

$(function () {
  initCollapse();
});

var swiper = new Swiper('.swiper-help', {
  slidesPerView: 'auto',
  spaceBetween: 0,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

if (window.innerWidth <= 1100) {
  var swiper2 = new Swiper('.swiper-clients', {
    slidesPerView: 'auto',
    spaceBetween: 0,
    pagination: {
      el: '.swiper-pagination',
    }
  });
}

let 

var header = document.getElementsByTagName('header')[0];

function openMenu() {
  header.classList.add('open');
}
function closeMenu() {
  header.classList.remove('open');
}
window.openMenu = openMenu;
window.closeMenu = closeMenu;

var modal = document.getElementById('modal');

function openModal() {
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '17px';
  modal.classList.add('open');
}

function closeModal() {
  document.body.style.overflow = 'visible';
  document.body.style.paddingRight = '0';
  modal.classList.remove('open');
}
window.openModal = openModal;
window.closeModal = closeModal;

var buttonsDefault = document.querySelectorAll('button.default-button');

for (let b of buttonsDefault) {
  b.addEventListener('click', () => {
    openModal();
  });
}


const {MDCTextField} = require("@material/textfield");
const {MDCFormField} = require("@material/form-field");

const fields = document.querySelectorAll('.mdc-text-field');
const forms = document.querySelectorAll('.mdc-form-field');


const anhors = document.querySelectorAll('a.animate');

for (const a of anhors) {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    closeMenu();
    animateScrollTo(document.getElementById(a.href.split('/').slice(-1)[0].slice(1)).offsetTop - 80);
  })
}


for (const field of fields) {
  new MDCTextField(field);
}

for (const field of forms) {
  new MDCFormField(field);
}


$("#text_field_phone").mask("+7 (999) 999-99-99");

var iframe = document.getElementById('vimeo');

iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
var player = new Vimeo.Player(iframe);

player.setMuted(true);

setTimeout(() => {
  player.play().then(function () { });
}, 100);


function arrayToObject(array) {
  const object = {};

  array.forEach(a => {
    object[a.name] = a.value
  });

  return object;
}

window.checkReg = (form) => {
  $.ajax({
    url: '/mail.php',
    method: 'post',
    data: arrayToObject($(form).serializeArray()),
    success: (c) => {
      if (c == 'Успешно') {
        $('.modal-body-content').html(`
          <h3 class="finish">Заявка отправлена!</h3>
          <p>Я свяжусь с Вами в кратчайшие сроки</p>
        `)
      } else {
        $('.modal-body-content').html(`
          <h3 class="finish">Что-то пошло не так</h3>
        `)
      }
    },
    error: (error) => {
      console.log(error)
    }
  })
  return false;
}




