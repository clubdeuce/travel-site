import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';
import $ from 'jquery';

let mobileMenu = new MobileMenu();
new RevealOnScroll($('.feature-item'), {
  offset: "85%"
});
new RevealOnScroll($('.testimonial'), {
  offset: "60%"
});
var stickyHeader = new StickyHeader();
var modal = new Modal();