'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////////////////////////////
// Btn Scrolling 
btnScrollTo.addEventListener('click',function(e) {

// Old Method 
// const s1coords = section1.getBoundingClientRect();
// console.log(s1coords);

// console.log(e.target.getBoundingClientRect());
// console.log('Current scroll (X/Y)', 
// window.pageXOffset,
// window.pageYOffset);

// console.log('height/width viewport',
// document.documentElement.clientHeight,
// document.documentElement.clientWidth
// );
// // Old Way 

// window.scrollTo(
//  s1coords.left + pageXOffset , 
//  s1coords.top + pageYOffset
// );

// window.scrollTo({
// left: s1coords.left + pageXOffset , 
// top: s1coords.top + pageYOffset,
// behavior:'smooth',
// });
// New Method 
section1.scrollIntoView({behavior:'smooth'});

});
//////////////////////////////////
//////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//   e.preventDefault();
//   const id = this.getAttribute('href');
//   document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// });

document.querySelector('.nav__links')
.addEventListener('click',function(e){
  e.preventDefault();

  // Matching startegy
  if (e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
/////////////////////
//Tabbed Component
tabsContainer.addEventListener('click',function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Gaurd clause  
  if(!clicked) return;
  // Remove Tab 
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate Tab 
  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
.classList.add('operations__content--active');
});
////////////////////////////
// Menu fade animation
const handleHover = function(e){
if(e.target.classList.contains('nav__link')){
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');

  siblings.forEach(el => {
    if (el !== link)
     el.style.opacity = this;
  });
  logo.style.opacity = this ;
}
};
//  Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/////////////////////////////
// Sticky naviagtaion
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll',function() {
// if (this.window.scrollY > initialCoords.top)
//  nav.classList.add('sticky');
// else 
//  nav.classList.remove('sticky');
// })

// Sticky navigation: Intersection Observer API
// INTERSECTION OBSEVER

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function(entries) {
const [entry]  = entries;

  if(!entry.isIntersecting) 
  nav.classList.add('sticky');
  else 
  nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root:null,
  threshold:0,
  rootMargin:  `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal Section 
const allSections = document.querySelectorAll
('.section');

const revealSection = function (entries,observer) {
  const [entry] = entries;
  
  // Gaurd clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver
(revealSection,{
  root:null,
  threshold:0.15,
});

allSections.forEach(function (section) {
 sectionObserver.observe(section); 
//  section.classList.add('section--hidden');
});

//////////////////////
// IMG reveling 
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries,observer) {
const [entry] = entries;

 if (!entry.isIntersecting) return;

//  replacing src to dataset src 
 entry.target.src = entry.target.dataset.src;

 entry.target.addEventListener('load',function () {
  entry.target.classList.remove('lazy-img');
 });

observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0, 
  rootMargin: '200px', 
});
imgTargets.forEach(img => imgObserver.observe(img));

////////////////////
// Slider Section

const slider = function() {
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
// const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length;

// function
const createDots = function() {
  slides.forEach(function(_,i) {
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};

const activateDot = function(slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  
document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

const goToSlide = function(slide) {
slides.forEach((s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`)
)};
// -100%, 0%, 100%, 200%


// next slide
const nextSlide = function() {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    }else {
      curSlide++;
    };
    goToSlide(curSlide);
    activateDot(curSlide);
}
// prevSlide
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};
const init = function() {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();
btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function (e) {

  if(e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click',function(e) {
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
};
slider();

// lifecycle

document.addEventListener('DOMContentLoaded',
function(e) {
  console.log('HTML parse and Dom tree built!');
});

window.addEventListener('load',
function(e) {
  console.log('Page fully loaded',e);
});

// window.addEventListener('beforeunload', function(e){
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
// Event Handler
// const h1 = document.querySelector('h1');

// const alerth1 = function(e) {
//   // e.preventDefault();
//   // alert('addEventlistenr: You Properly Raed Heading Nice!');
// };
// h1.addEventListener('mouseenter',alerth1);

// setTimeout(
// () => h1.removeEventListener('mouseenter', alerth1),3000); 


//////////////////////////////////
// console.log(document.body);

// const header = document.querySelector('header');

// const allSections = document.querySelector('section');
// console.log(allSections);

// const allButtons = document.getElementsByTagName('button');
// const para = document.querySelector('p');
// console.log(para);

// const Buttons = document.getElementsByClassName('btn');
// console.log(allButtons);
// console.log(Buttons);

// const message = document.createElement('div'); 
// message.classList.add('cookie-message');
// // message.textContent = 'We use cockie to improve functionality and anaylitic';
// // Create HTML 

// message.innerHTML = 'We use Cookied for improved functionality and anaylitic <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); //Before header
// header.append(message); //After header

// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete Element 
// document.querySelector('.btn--close-cookie').addEventListener('click',function() {
//   // message.remove(); 
//   message.parentElement.removeChild(message); //Another method
// });
//////////////////////////////
// Attribute Style And Classes 
// message.style.backgroundColor = '#37383d'; 
// message.style.width = '120%'; 

// console.log(message.style.backgroundColor);
// console.log(message.style.color);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 30 +'px';

// document.documentElement.style.setProperty('--color-primary','orangered');

// Attribute

// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Beautifull minimalist logo';

// // Non- Standard

// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data Attribute
// // console.log(logo.dataset.versionNumber);

// // Classes 
// logo.classList.add('c','j');
// logo.classList.remove('c','j');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// // Don't Use 
// logo.className = 'Rashid'

// popogation bubbling etc
// const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
// `rgb(${randomInt(0, 225)},${randomInt(0, 225)}, ${randomInt(0, 225)})`; 


// document.querySelector('.nav__link')
// .addEventListener('click',function(e) {
//  this.style.backgroundColor = randomColor();
//  console.log(e.target,e.currentTarget);
//   console.log('LINK');

//   // stop Propogation
//   e.stopPropagation();
// });

// document.querySelector('.nav__links')
// .addEventListener('click',function(e) {
//  this.style.backgroundColor = randomColor();
//   console.log('CONTAINER');

// });

// document.querySelector('.nav')
// .addEventListener('click',function(e) {
//  this.style.backgroundColor = randomColor();
//   console.log('NAV');

// });

// Traverssing 

// const h1 = document.querySelector('h1');

// // Going Downward : children
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going Upnward : Parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = ' var( --gradient-secondary)';

// h1.closest('h1').style.background ='var(--gradient-primary)';

// // Going Upnward : Sibling

// console.log(h1.nextElementSibling);
// console.log(h1.previousElementSibling);

// console.log(h1.nextSibling);
// console.log(h1.previousSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el){
// if(el !== h1) el.style.transform = 'scale (0.3)'
// });