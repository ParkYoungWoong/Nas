class Random {
  result(min, max, integer) {
    let int = integer || false;
    return int
      ? Math.floor(Math.random() * (max - min + 1)) + min
      : Math.random() * (max - min) + min;
  }
}

class ThisToggleClass {
  toggleClassHandler($this, sel, cName) {
    let index = $this.index();

    $(sel).not($(sel).eq(index)).removeClass(cName);
    $(sel).eq(index).addClass(cName);
  }
}

class Herop {
  constructor() {
    this._lockScroll = false;
    this.throttleDuration = 200;  // 스크롤 파악 속도: Number
    this.$scrollBody = $('html');  // 스크롤 선택자: String
    this.scrollLocate = 0;
    this.findingSection = true;  // 섹션 위치 파악: Boolean
    this.scrollDirection = 'top';  // 스크롤 방향: String ['top', 'left']
    this.numberOfSection = 5;  // 섹션의 개수: Number, 각 섹션의 ID 를 `sec$` 로 설정하세요!
    this.sec = [];
    this.secPos = [];
    this.slider = {};
    this.random = new Random().result;
    this.toggleClass = new ThisToggleClass().toggleClassHandler;

    this._initEvent();
  }

  // EVENT
  _initEvent() {
    this._scroll();
    this._plugins();
    this.windowLoad();  // window load!
  }

  _plugins() {
    this.niceScroll();
    this.bxSlider();
    this.tweenMax();
  }

  _throttleScroll() {
    let _this = this;

    setInterval(function () {
      if (_this._lockScroll) {
        _this._lockScroll = false;
        _this.scrollEvent();
      }
    }, this.throttleDuration);
  }

  _scroll() {
    this._throttleScroll();

    let scrollBody = this.$scrollBody.selector === 'html' ? $(document) : this.$scrollBody;
    let _this = this;

    scrollBody.on('scroll', function () {
      _this._lockScroll = true;
      _this.scrollLocate = _this.scrollDirection === 'top' ? $(this).scrollTop() : $(this).scrollLeft();
    });
  }

  createSectionArray(callback) {
    for (let i = 0; i < this.numberOfSection; i++) {
      this.sec.push('#sec' + (i+1));
    }
    callback(this, this.sec);
  }

  offsetOfEachSection(_this, section) {
    if (_this.findingSection) {
      let _that = _this;
      let _result = null;

      section.forEach(function (item, index, array) {
        if ($(item).length !== 0) {
          switch (_that.scrollDirection) {
            case 'top':
              _result = $(item).offset().top;
              break;
            case 'left':
              _result = $(item).offset().left;
              break;
          }

          _that.secPos.push(_result);
        }
      });

      console.info('EACH SECTION: ' + _that.secPos);
    }
  }

  addWindowLoadEvent(func) {  // 중복 로드(load) 처리
    let oldonload = window.onload;
    if (typeof window.onload != 'function') {
      if (document.all && !document.querySelector) {
        window.onload = func;
      } else {
        window.onload = func();
      }
    } else {
      window.onload = function () {
        if (oldonload) {
          oldonload();
        }
        func();
      }
    }
  }

  windowLoad() {
    let _this = this;

    // $(window).load({ ...
    this.addWindowLoadEvent(function () {
      _this.createSectionArray(_this.offsetOfEachSection);
      console.info('WINDOW LOADING COMPLETED');
    });
  }

  scrollEvent() {
    console.log('CURRENT SCROLL: ' + this.scrollLocate);
  }

  niceScroll() {
    // Options: https://github.com/inuyaksa/jquery.nicescroll
    this.$scrollBody.niceScroll({
      cursorcolor: "black",
      cursorwidth: 10,
      scrollspeed: 60,
      cursorborderradius: 0,
      mousescrollstep: 40,
      background: "none",
      cursorborder: "none",
      autohidemode: true,
      boxzoom: false,
      zindex: 990
    });
  }

  bxSlider() {
    let _this = this;

    // Options: http://bxslider.com/options
    this.slider.s1 = $('selector').bxSlider({
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

  tweenMax() {
    // Documentation: https://greensock.com/docs/#/HTML5/GSAP/
    this.tweenAnimation();
    this.timeLineAnimation();
  }

  tweenAnimation() {
    TweenMax.to($('.selector'), 2, { marginTop: 20, yoyo: true, repeat: -1, ease: Power1.easeInOut });
  }

  timeLineAnimation() {
    // animation 1
    (function () {
      let tween = new TimelineMax({ repeat: -1 });
      let $o = $('.selector');
      tween
        .set($o.find('img'), { width: 35, marginTop: 20, marginLeft: 20 })
        .set($o, { opacity: 0 })
        .to($o.find('img'), 1, { width: 55, marginTop: 6, marginLeft: 6, ease: Power0.easeNone }, '-=1')
        .from($o, 1, { top: 170, left: 215, ease: Power0.easeNone });
    }());
  }

}

// 객체 생성
$(() => { new Herop(); });