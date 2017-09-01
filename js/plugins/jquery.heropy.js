var HEROPY = (function (root, docs, $) {
  'use strict';


  /**
   * Options
   * @type {{isNiceScroll: boolean, niceScrollBody: string, niceScrollOptions: {cursorcolor: string, cursorwidth: number, cursorborderradius: number, cursorborder: string, zindex: number}, lockSelectEvent: boolean, throttleDuration: number, scrollDirection: string, onLoad: onLoad, scrollEvent: scrollEvent, whenSectionChange: whenSectionChange}}
   * @private
   */


  var _optsAll = {

    // Properties
    isNiceScroll: true,  // 전역 jQuery Nice Scroll Plugin 사용 여부
    niceScrollBody: 'html',  // 전역 jQuery Nice Scroll Plugin 으로 적용할 대상
    niceScrollOptions: {  // 전역 jQuery Nice Scroll Plugin 옵션
      cursorcolor: "rgba(0,0,0,.75)",
      cursorwidth: 10,
      cursorborderradius: 0,
      cursorborder: "none",
      zindex: 999
    },
    lockSelectEvent: true,  // select 기능 사용 여부
    throttleDuration: 200,  // 스크롤 속도 제어
    sectionSelector: '.section',
    scrollDirection: 'vertical',

    // Methods
    onLoad: function () {
      console.info('WINDOW LOADING COMPLETED');
      return false;
    },
    scrollEvent: function (scrollLocate) {
      console.info('CURRENT SCROLL LOCATE: ' + scrollLocate);
      return true;
    },
    whenSectionChange: function () { return true; }
  };


  /**
   * Classes
   */


    // INITIALIZE
  var init = (function () {

    function init(options) {
      _optsAll = $.extend(_optsAll, options);

      _startNiceScroll();
      _lockSelectEvent();
      ThrottleScroll._scroll();
      OnLoad._windowLoad();
    }

    return init;
  }());


  // CLASS TOGGLE FUNCTION
  var ToggleFunction = (function () {

    // Private
    var _opts = {
      $this: null,
      $context: null,
      index: 0
    };

    function _checkMethodName(methods) {
      if (!methods.remove || !methods.add) {
        throw '메소드의 이름을 확인하세요! \n remove: function ($remove) {} \n add: function ($add) {}';
      }
    }

    function _toggleFunctionRemove(removeFunc) {
      removeFunc(
        this.$context.not(this.$context.eq(this.index))
      );
    }

    function _toggleFunctionAdd(addFunc) {
      addFunc(
        this.$context.eq(this.index)
      );
    }

    // Public
    function Toggle() {}

    Toggle.prototype = {
      toggle: function () {
        return {
          insertThis: function (_this) {
            _opts.$this = $(_this);
            _opts.index = _opts.$this.index();
            _opts.$context = _opts.$this.parent().children();

            return this;
          },

          insertIndex: function (index, context) {
            _opts.index = index;
            _opts.$context = $(context);

            return this;
          },

          toggleClass: function (className) {
            _opts.$context.removeClass(className).eq(_opts.index).addClass(className);
          },

          toggleFunction: function (methods) {
            _checkMethodName(methods);
            _toggleFunctionRemove(methods.remove);
            _toggleFunctionAdd(methods.add);
          }
        }
      }
    };

    return Toggle;

  }());


  // CLASS RANDOM
  var Random = (function () {

    function Random(min, max) {
      this.init(min, max);
    }

    Random.prototype = {
      init: function (min, max) {
        return min + max;
      }
    };

    return Random;
  }());


  // CLASS THROTTLE SCROLL
  var ThrottleScroll = (function () {

    var _lockScroll = false;
    var scrollLocate = 0;

    function _throttleScroll() {
      setInterval(function () {
        if (_lockScroll) {
          _lockScroll = false;
          _optsAll.scrollEvent(scrollLocate);
        }
      }, _optsAll.throttleDuration);
    }

    function _scroll() {
      _throttleScroll();

      var body = _optsAll.niceScrollBody === 'html' ? $(docs) : $(_optsAll.niceScrollBody);

      body.on('scroll', function () {
        _lockScroll = true;

        switch (_optsAll.scrollDirection) {
          case 'vertical':
            scrollLocate = $(this).scrollTop();
            break;
          case 'horizontal':
            scrollLocate = $(this).scrollLeft();
            break;
          default:
            throw '스크롤 방향을 정확하게 입력하세요!';
        }
      });
    }

    return {
      _scroll: _scroll
    }
  }());


  // CLASS WINDOW ON LOAD
  var OnLoad = (function () {

    function _addWindowLoadEvent(func) {  // 중복 로드(load) 처리
      let oldOnload = root.onload;
      if (typeof root.onload !== 'function') {
        if (docs.all && !docs.querySelector) {
          root.onload = func;
        } else {
          root.onload = func();
        }
      } else {
        root.onload = function () {
          if (oldOnload) oldOnload();
          func();
        }
      }
    }

    function _windowLoad() {
      _addWindowLoadEvent(function () {
        _optsAll.onLoad();
        Section._eachOffset();
      });
    }

    return {
      _windowLoad: _windowLoad
    }
  }());


  // CLASS SECTIONS
  var Section = (function () {

    var secOffsetArray = [];

    function _offsetOfEachSection() {
      $(_optsAll.sectionSelector).each(function (index) {
        var result = null;

        switch (_optsAll.scrollDirection) {
          case 'vertical':
            result = $(this).offset().top;
            break;
          case 'horizontal':
            result = $(this).offset().left;
            break;
        }

        secOffsetArray.push(result);
      });

      console.info('EACH SECTION: ' + secOffsetArray);
    }

    return {
      _eachOffset: _offsetOfEachSection
    }
  }());


  /**
   *
   * @private
   */


  // jQUERY NICE SCROLL
  function _startNiceScroll() {
    if (!_optsAll.isNiceScroll)
      return console.warn('현재 옵션은 jQuery Nice Scroll 플러그인을 동작시키지 않습니다.');

    $(_optsAll.niceScrollBody).niceScroll(_optsAll.niceScrollOptions);
  }


  // jQUERY NICE SCROLL STOP
  function _stopNiceScroll() {
    $(_optsAll.niceScrollBody).getNiceScroll().remove();
    $(_optsAll.niceScrollBody).css({ overflow: 'hidden' });
  }


  // LOCK SELECT EVENT
  function _lockSelectEvent() {
    if (!_optsAll.lockSelectEvent) return;

    // $('body').on({
    //   selectstart: function () { return false; },
    //   dragstart: function () { return false; }
    // });

    docs.body.onselectstart = function () {
      return false;
    }
  }


  /**
   * Returns
   */


  // RETURN
  return {
    init: init,
    toggle: new ToggleFunction().toggle,
    random: new Random().init,
    startNiceScroll: _startNiceScroll,
    stopNiceScroll: _stopNiceScroll,
  }

}(window, document, jQuery));