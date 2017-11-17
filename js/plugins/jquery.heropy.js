var HEROPY = (function (root, docs, $) {
  'use strict';


  /**
   *
   * @type {{lockSelectEvent: boolean, throttleDuration: number, sectionSelector: string, scrollDirection: string, windowSplitRatio: number, onLoad: onLoad, scrollEvent: scrollEvent, whenSectionChange: whenSectionChange, resizeWindow: resizeWindow, niceScrollUse: boolean, niceScrollBody: string, niceScrollOptions: {cursorcolor: string, cursorwidth: number, cursorborderradius: number, cursorborder: string, zindex: number}, imagePreloadUse: boolean, imagePreloadSelector: string, imagePreloadList: string, imagePreloadAlways: imagePreloadAlways, imagePreloadDone: imagePreloadDone, imagePreloadFail: imagePreloadFail, imagePreloadProgress: imagePreloadProgress}}
   * @private
   */


  var _optsAll = {

    // General Properties
    lockSelectEvent: true,  // select 기능 사용 여부
    throttleDuration: 200,  // 스크롤 속도 제어
    sectionSelector: '.section',  // 섹션들의 공통 선택자
    scrollDirection: 'vertical',  // 스크롤 방향
    windowSplitRatio: 1 / 2,  // 섹션 체크 기준 화면 비율 / 스크롤할 때 화면의 어느 '비율' 지점에서 섹션의 변경 이벤트를 체크할 지 여부

    // General Methods
    onLoad: function () { return true; },  // 화면이 준비되었을 때
    scrollEvent: function (scrollLocate) { return true; },  // 스크롤할 때
    whenSectionChange: function (oldIndex, newIndex) { return true; },  // 화면의 중심 섹션이 변경될 때
    resizeWindow: function (windowSize) { return true; },  // 화면의 크기가 변경될 때

    // Nice Scroll
    niceScrollUse: true,  // 전역 jQuery Nice Scroll Plugin 사용 여부
    niceScrollBody: 'html',  // 전역 jQuery Nice Scroll Plugin 으로 적용할 대상
    niceScrollOptions: {  // 전역 jQuery Nice Scroll Plugin 옵션
      // NICE SCROLL: https://github.com/inuyaksa/jquery.nicescroll
      cursorcolor: "rgba(0,0,0,.75)",
      cursorwidth: 10,
      cursorborderradius: 0,
      cursorborder: "none",
      zindex: 999,
      scrollspeed: 60,
      mousescrollstep: 40
    },

    // Images Preload
    imagePreloadUse: false,  // 전역 jQuery Image Preload Plugin 사용 여부
    imagePreloadSelector: 'body',  // 전역 jQuery Image Preload Plugin 으로 적용할 대상
    imagePreloadDirectory: 'img/',  // 전역 jQuery Image Preload Plugin 에서 검색할 이미지 폴더 경로
    imagePreloadList: '',  // 전역 jQuery Image Preload Plugin 에서 사용할 이미지 목록 / img 폴더 안 / $ dir /b >list.txt
    // IMAGE PRELOAD: https://github.com/desandro/imagesloaded
    imagePreloadAlways: function (instance) { return true; },
    imagePreloadDone: function (instance) { return true; },
    imagePreloadFail: function () { return true; },
    imagePreloadProgress: function (instance, image) { return true; }
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
      _optsAll.imagePreloadUse && ImagePreload._imagesPreload();  // `_optsAll.imagePreloadUse` 가 `true`일 때만 동작
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
        _opts.$context.not(_opts.$context.eq(_opts.index))
      );
    }

    function _toggleFunctionAdd(addFunc) {
      addFunc(
        _opts.$context.eq(_opts.index)
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


  // CLASS THROTTLE SCROLL
  var ThrottleScroll = (function () {

    var _lockScroll = false;
    var scrollLocate = 0;

    function _throttleScroll() {
      setInterval(function () {
        if (_lockScroll) {
          _lockScroll = false;
          _scrollEvent();
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

    function _scrollEvent() {
      console.info('CURRENT SCROLL LOCATE: ' + scrollLocate);

      _optsAll.scrollEvent(scrollLocate);
      Section._currentIndex(scrollLocate);
    }

    return {
      _scroll: _scroll
    }
  }());


  // CLASS WINDOW ONLOAD
  var OnLoad = (function () {

    function _addWindowLoadEvent(func) {  // 중복 로드(load) 처리
      var oldOnload = root.onload;
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
        _onLoad();
      });
    }

    function _onLoad() {
      console.info('WINDOW LOADING COMPLETED');

      _optsAll.onLoad();
      Section._eachOffset();
      Window._computedWindowSize();
      $(root).on('resize', Window._resizeHandler);
      _optsAll.imagePreloadUse && ImagePreload._imagesOnload();  // `_optsAll.imagePreloadUse` 가 `true`일 때만 동작
    }

    return {
      _windowLoad: _windowLoad
    }
  }());


  // CLASS SECTIONS
  var Section = (function () {

    var secOffsetArray = [];
    var oldSectionIndex = 0;
    var currentSectionIndex = 0;
    var prop = '';
    var index = 0;
    var computedScrollLocate = 0;

    function _offsetOfEachSection() {
      $(_optsAll.sectionSelector).each(function () {
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

      console.info('SECTION - LENGTH: ' + secOffsetArray.length + ', OFFSET: ' + secOffsetArray);

      return secOffsetArray;
    }

    function _checkCurrentSection(scrollLocate) {
      computedScrollLocate = scrollLocate + Window._sectionSplitRatio();
      for (prop in secOffsetArray) {
        index = parseInt(prop);

        // 일반 섹션일 때..
        if (computedScrollLocate >= secOffsetArray[index] && computedScrollLocate < secOffsetArray[index + 1]) {
          _renewCurrentSection(index);

        // 마지막 섹션일 때..
        } else if (computedScrollLocate >= secOffsetArray[index] && secOffsetArray[index + 1] === undefined) {
          _renewCurrentSection(index);
        }
      }
    }

    function _renewCurrentSection(index) {
      if (currentSectionIndex !== index) {
        oldSectionIndex = currentSectionIndex;
        currentSectionIndex = index;
        _whenSectionChange();
      }
    }

    function _whenSectionChange() {
      console.info('Section change - OLDSEC: ' + oldSectionIndex, 'NEWSEC: ' + currentSectionIndex);

      _optsAll.whenSectionChange(oldSectionIndex, currentSectionIndex);
    }

    return {
      _eachOffset: _offsetOfEachSection,
      _currentIndex: _checkCurrentSection,
      _whenSectionChange: _whenSectionChange
    }
  }());


  // CLASS WINDOW SIZE
  var Window = (function () {

    var windowSize = 0;
    var sectionSplitRatio = 0;

    function _computedWindowSize() {

      switch (_optsAll.scrollDirection) {
        case 'vertical':
          windowSize = $(root).height();
          break;
        case 'horizontal':
          windowSize = $(root).width();
          break;
      }

      console.info('WINDOW SIZE: ' + windowSize);

      _computedSectionSplitRatio();
    }

    function _computedSectionSplitRatio() {
      return sectionSplitRatio = windowSize * _optsAll.windowSplitRatio;
    }

    function _resizeHandler() {
      _computedWindowSize();
      _computedSectionSplitRatio();
      _optsAll.resizeWindow(windowSize);
    }

    return {
      _windowSize: windowSize,
      _sectionSplitRatio: _computedSectionSplitRatio,
      _computedWindowSize: _computedWindowSize,
      _resizeHandler: _resizeHandler
    }
  }());


  // IMAGE PRELOAD: https://github.com/desandro/imagesloaded
  var ImagePreload = (function () {

    // if (!_optsAll.imagePreloadUse) {
    //   return console.warn('현재 옵션은 Images Preload 플러그인을 동작시키지 않습니다.');
    // }

    var loadImageLength = 0;
    var instanceImageLength = 0;
    var progressPosition = 0;

    function _imagesPreload() {
      // img 폴더로 이동
      // dir /b >list.txt
      var images = _optsAll.imagePreloadList; // Add here!
      var imagesArr = images.split(' ');
      var imagesLength = imagesArr.length;
      var directory = _optsAll.imagePreloadDirectory;
      var url = '';
      var finishCode = '"),';

      for (var i = 0; i < imagesLength; i++) {
        if (i >= imagesArr.length - 1) {
          finishCode = '");';  // 마지막 이미지 끝 설정
        }

        url = url.concat('url("' + directory + imagesArr[i] + finishCode);
      }

      $("#all_images").attr('style', 'background: ' + url);
    }

    function _imagesProgress(instance, image) {
      loadImageLength++;

      instanceImageLength = instance.images.length;
      progressPosition = (loadImageLength / instanceImageLength) * 100;

      $('#progress_bar').css({
        width: progressPosition + '%'
      });
    }

    function _imagesOnload() {
      $(_optsAll.imagePreloadSelector).imagesLoaded()
        .always(function (instance) {
          always(instance);
        })
        .done(function (instance) {
          done(instance);
        })
        .fail(function () {
          fail();
        })
        .progress(function (instance, image) {
          progress(instance, image);
        });
    }

    function always(instance) {
      console.info('All images loaded');

      $("#progress_bar").fadeOut(500);
      $("#container").animate({opacity: 1}, 500, function () {
        // $('body').css({ background: 'black' });
      });

      _optsAll.imagePreloadAlways(instance);
    }

    function done(instance) {
      console.info('All images successfully loaded');

      _optsAll.imagePreloadDone(instance);
    }

    function fail() {
      console.info('All images loaded, at least one is broken');

      _optsAll.imagePreloadFail();
    }

    function progress(instance, image) {
      var result = image.isLoaded ? 'loaded' : 'broken';

      if (result === 'broken') {
        console.info('Image is ' + result + ' for ' + image.img.src);
      }

      _imagesProgress(instance, image);
      _optsAll.imagePreloadProgress(instance, image);
    }

    return {
      _imagesPreload: _imagesPreload,
      _imagesOnload: _imagesOnload
    }

  }());


  /**
   *
   * @private
   */


  // jQUERY NICE SCROLL START
  function _startNiceScroll() {
    if (!_optsAll.niceScrollUse) {
      return console.warn('현재 옵션은 jQuery Nice Scroll 플러그인을 동작시키지 않습니다.');
    }

    console.info('Start Nice Scroll!');
    $(_optsAll.niceScrollBody).niceScroll(_optsAll.niceScrollOptions);
  }


  // jQUERY NICE SCROLL STOP
  function _stopNiceScroll() {
    console.info('Stop Nice Scroll!');
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
    getOffsetEachSection: Section._eachOffset(),
    startNiceScroll: _startNiceScroll,
    stopNiceScroll: _stopNiceScroll
  }

}(window, document, jQuery));