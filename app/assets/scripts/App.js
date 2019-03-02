import MobileMenu from './modules/mobile-menu';
import RevealOnScroll from './modules/reveal-on-scroll';
import $ from 'jquery';

let mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), {
  offset: "85%"
});
new RevealOnScroll($('.testimonial'), {
  offset: "60%"
});