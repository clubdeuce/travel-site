import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import $ from 'jquery';

let mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), {
  offset: "85%"
});
new RevealOnScroll($('.testimonial'), {
  offset: "60%"
});
new StickyHeader();