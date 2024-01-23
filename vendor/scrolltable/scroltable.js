(function (e, r) {
  'use strict';

  function handleScroll() {
    var $element = r(this),
      $wrapper = $element.closest('.scroltable-wrapper'),
      $leftNav = $wrapper.children('.scroltable-nav-left'),
      $rightNav = $wrapper.children('.scroltable-nav-right'),
      $container = $wrapper.children('.scroltable-container'),
      scrollLeft = $container.scrollLeft();

    if ($container.width() < $element.outerWidth(!0)) {
      if (scrollLeft > 0) {
        $leftNav.finish().fadeIn();
      } else {
        $leftNav.finish().fadeOut();
      }

      if ($element.outerWidth(!0) - $container.width() > scrollLeft) {
        $rightNav.finish().fadeIn();
      } else {
        $rightNav.finish().fadeOut();
      }
    } else {
      $leftNav.finish().hide();
      $rightNav.finish().hide();
    }
  }

  function handleButtonClick() {
    var $button = r(this),
      $parent = $button.parent(),
      $container = $parent.children('.scroltable-container'),
      direction = $button.is('.scroltable-nav-left') ? -100 : 100,
      scrollLeft = $container.scrollLeft() + direction;

    $container.animate({ scrollLeft: scrollLeft }, 300, handleScroll.bind($container.children('.scroltable')[0]));
  }

  function handleResize() {
    scroltableInstances.each(handleScroll);
  }

  function initScroltable() {
    scroltableInstances = scroltableInstances ? scroltableInstances.add(this) : r(this);

    var $wrapper = r('<div class="scroltable-wrapper"></div>');
    var $leftNav = r('<div class="scroltable-nav scroltable-nav-left"></div>');
    var $rightNav = r('<div class="scroltable-nav scroltable-nav-right"></div>');
    var $container = r('<div class="scroltable-container"></div>');
    var $element = r(this).addClass('scroltable');

    $element.wrap($wrapper);
    $element.before($leftNav);
    $element.before($rightNav);
    $element.wrap($container);

    $element.closest('.scroltable-wrapper').children('.scroltable-nav').on('click', handleButtonClick);
    $element.closest('.scroltable-wrapper').children('.scroltable-container').on('scroll', handleScroll.bind(this));

    r(window).off('resize.scroltable-wrapper').on('resize.scroltable-wrapper', handleResize).trigger('resize.scroltable-wrapper');

    return this;
  }

  function destroyScroltable() {
    scroltableInstances = scroltableInstances.filter(
      function () {
        return this !== scroltableInstances;
      }.bind(this)
    );

    if (scroltableInstances.length < 1) {
      var $wrapper = r(this).closest('.scroltable-wrapper');
      $wrapper.children('.scroltable-nav').off().end().children('.scroltable-container').off().end().after(r(this).detach()).remove().end().removeClass('scroltable');
    }
  }

  var scroltableInstances;

  r.fn.scroltable = function (e) {
    return typeof e === 'string' ? (e === 'destroy' ? destroyScroltable.apply(this, Array.prototype.slice.call(arguments, 1)) : this) : initScroltable.apply(this, arguments);
  };
})(this, jQuery);
