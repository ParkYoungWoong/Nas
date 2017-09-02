(function (root, docs, $) {
  'use strict';

  var _hp = {};

  $(function () {
    init();
    initEvent();
  });

  function init() {
    _hp.slider = {};
  }

  function initEvent() {
    heropy();
    pluginBxSlider();
    pluginTweenMax();
  }

  function heropy() {
    HEROPY.init({
      // General Properties
      lockSelectEvent: true,  // select 기능 사용 여부
      throttleDuration: 200,  // 스크롤 속도 제어
      sectionSelector: '.section',  // 섹션들의 공통 선택자
      scrollDirection: 'vertical',  // 스크롤 방향 / 'horizontal'
      windowSplitRatio: 1 / 2,  // 섹션 체크 기준 화면 비율 / 스크롤할 때 화면의 어느 '비율' 지점에서 섹션의 변경 이벤트를 체크할 지 여부

      // General Methods
      onLoad: function () {},  // 화면이 준비되었을 때
      scrollEvent: function (scrollLocate) {},  // 스크롤할 때
      whenSectionChange: function (oldIndex, newIndex) {},  // 화면의 중심 섹션이 변경될 때
      resizeWindow: function (windowSize) {},  // 화면의 크기가 변경될 때

      // Nice Scroll
      niceScrollUse: true,  // 전역 jQuery Nice Scroll Plugin 사용 여부
      niceScrollBody: 'html',  // 전역 jQuery Nice Scroll Plugin 으로 적용할 대상
      niceScrollOptions: {  // 전역 jQuery Nice Scroll Plugin 옵션
        // NICE SCROLL: https://github.com/inuyaksa/jquery.nicescroll
        cursorcolor: "rgba(0,0,0,.75)",
        cursorwidth: 10,
        cursorborderradius: 0,
        cursorborder: "none",
        zindex: 999
      },

      // Images Preload
      imagePreloadUse: false,  // 전역 jQuery Image Preload Plugin 사용 여부
      imagePreloadSelector: 'body',  // 전역 jQuery Image Preload Plugin 으로 적용할 대상
      imagePreloadList: '',  // 전역 jQuery Image Preload Plugin 에서 사용할 이미지 목록 / img 폴더 안 / $ dir /b >list.txt
      // IMAGE PRELOAD: https://github.com/desandro/imagesloaded
      imagePreloadAlways: function (instance) {},
      imagePreloadDone: function (instance) {},
      imagePreloadFail: function () {},
      imagePreloadProgress: function (instance, image) {}
    });
  }

  function pluginBxSlider() {
    _hp.slider.s1 = $('selector').bxSlider({
      mode: 'horizontal', // 슬라이드 종류
      speed: 500, // 슬라이드 속도
      slideMargin: 0, // 슬라이드 사이 여백
      pager: true, // 페이지 번호
      pagerSelector: '', // 페이지 번호 선택자
      controls: false, // 이전/다음
      autoControls: false, // 시작/정지
      auto: true, // 자동 슬라이드
      pause: 4000, // 자동 슬라이드 시간
      minSlides: 1, // 최소 슬라이드 갯수
      maxSlides: 1, // 최대 슬라이드 갯수
      moveSlides: 0, // 한번에 움직일 슬라이드의 갯수
      slideWidth: 0, // 슬라이드 가로 너비
      onSliderLoad: function (currentIndex) {
      }, // 슬라이드 준비되면
      onSlideBefore: function ($slideElement, oldIndex, newIndex) {
      }, // 슬라이드 전환 직전
      onSlideAfter: function ($slideElement, oldIndex, newIndex) {
      } // 슬라이드 전환 직후
    });
  }

  function pluginRellax() {
    /**
     * RELLAX: https://github.com/dixonandmoe/rellax
     *
     * data-rellax-percentage="0.5"
     * data-rellax-speed="7"
     */
    new Rellax('.rellax');
  }

  function pluginTimeLineMax() {
    (function () {
      var tween = new TimelineMax({ repeat: -1 });
      var $o = $('.selector');
      tween
        .set($o.find('img'), { width: 35, marginTop: 20, marginLeft: 20 })
        .set($o, { opacity: 0 })
        .to($o.find('img'), 1, { width: 55, marginTop: 6, marginLeft: 6, ease: Power0.easeNone }, '-=1')
        .from($o, 1, { top: 170, left: 215, ease: Power0.easeNone });
    }())
  }

  function pluginTweenMax() {
    TweenMax.to($('.selector'), 2, { marginTop: 20, yoyo: true, repeat: -1, ease: Power1.easeInOut });
  }

}(window, document, jQuery));