import waypoints from 'waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

import $ from 'jquery';

export default class StickyHeader {
  constructor() {
    let headerLinks = $('.primary-nav a');
    this.createHeaderWaypoint($('.site-header'), $('.large-hero__title'));
    this.createSectionWaypoints($('.page-section'), headerLinks);
    this.enableSmoothScroll(headerLinks)
    this.lazyImages = $('.lazyload');
    this.refreshWaypoints();
  }

  refreshWaypoints() {
    this.lazyImages.on('load', function() {
      Waypoint.refreshAll();
    });
  }

  enableSmoothScroll(links = []) {
    links.smoothScroll();
  }

  createHeaderWaypoint(header, trigger) {
    let headerClass = 'site-header--dark-bg';

    new Waypoint({
      element: trigger[0],
      handler: function(direction) {
        switch(direction) {
          case "down" :
            header.addClass(headerClass);
            break;
          case "up" :
            header.removeClass(headerClass);
            break;
        }
      }
    });
  }

  createSectionWaypoints(els = [], linkPool = []) {
    //console.log(els);
    els.each(function() {
      let currentSelector = this;
      new Waypoint({
        element: currentSelector,
        offset: '18%',
        handler: function(dir) {
          if ( 'down' === dir ) {
            let link = currentSelector.getAttribute('data-matching-link');
            linkPool.removeClass('active');
            $(link).addClass('active');
          }
        }
      });

      new Waypoint({
        element: currentSelector,
        offset: '-40%',
        handler: function(dir) {
          if ( 'up' === dir ) {
            let link = currentSelector.getAttribute('data-matching-link');
            linkPool.removeClass('active');
            $(link).addClass('active');
          }
        }
      });
    })
  }
}