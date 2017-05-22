class Random {
  result(min, max, integer) {
    let int = integer || false;
    return int
      ? Math.floor(Math.random() * (max - min + 1)) + min
      : Math.random() * (max - min) + min;
  }
}

class ToggleFunction {
  toggleClassHandler($thisOrIndex, selector, functionOrClass) {
    let index = null;

    if ( typeof $thisOrIndex === 'object' ) index = $thisOrIndex.index();
    else if ( typeof $thisOrIndex === 'number' ) index = $thisOrIndex;
    else console.error('$this is not a normal value');

    // Add class
    if ( typeof functionOrClass === 'string' ) {
      $(selector).not($(selector).eq(index)).removeClass(functionOrClass);
      $(selector).eq(index).addClass(functionOrClass);
    }

    // Add function
    else if ( typeof functionOrClass === 'object' ) {
      if ( functionOrClass.removeFunction ) {
        functionOrClass.removeFunction($(selector).not($(selector).eq(index)));
      }
      if ( functionOrClass.addFunction ) {
        functionOrClass.addFunction( $(selector).eq(index) );
      }
    }

    // Error message
    else {
      console.error('This is the wrong data type. Use String or Object.');
    }
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
    this.sec = [];
    this.secPos = [];
    this.slider = {};
    this.random = new Random().result;
    this.toggleFunction = new ToggleFunction().toggleClassHandler;
    this.loadedImg = 0;
    this.plugin = {};
    this.oldSection = 0;
    this.currentSection = 0;


    this._initEvent();
  }

  // EVENT
  _initEvent() {
    this._imagesPreload();
    this._scroll();
    this._plugins();
    this._windowLoad();  // window load!
  }

  _plugins() {
    let _this = this;

    // NICE SCROLL: https://github.com/inuyaksa/jquery.nicescroll
    (function () {
      _this.$scrollBody.niceScroll({
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
    }());

    // BX SLIDER: http://bxslider.com/options
    (function () {

      _this.slider.s1 = $('selector').bxSlider({
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
    }());

    // TWEEN MAX: https://greensock.com/docs/#/HTML5/GSAP/
    (function () {
      _this.tweenAnimation();
      _this.timeLineAnimation();
    }());

    // RELLAX: https://github.com/dixonandmoe/rellax
    (function () {
      // let rellax = new Rellax('.rellax');
      // data-rellax-percentage="0.5"
      // data-rellax-speed="7"
    }());
  }

  _imagesPreload() {
    // img 폴더로 이동
    // dir /b >list.txt
    let images = ``; // Add here!
    let imagesArr = images.split('\n');
    let url = '';

    for (let i = 0; i < imagesArr.length; i++) {
      if (i >= imagesArr.length - 1) url = url.concat('url("img/' + imagesArr[i] + '");');
      else url = url.concat('url("img/' + imagesArr[i] + '"),');
    }
    $("#all_images").attr('style', 'background: ' + url);
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

  _createSectionArray(callback) {
    let length = $('section').length;

    for (let i = 0; i < length; i++) {
      this.sec.push('.sec' + (i+1));
    }
    callback(this, this.sec);
  }

  _offsetOfEachSection(_this, section) {
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

  _addWindowLoadEvent(func) {  // 중복 로드(load) 처리
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

  _imagesProgress(instance, image) {
    this.loadedImg++;

    let imgLength = instance.images.length;
    let progressPosition = (this.loadedImg / imgLength) * 100;

    $('#progress_bar').css({
      width: progressPosition + '%'
    });
  }

  _windowLoad() {
    let _this = this;

    // $(window).load({ ...
    this._addWindowLoadEvent(function () {

      // IMAGE PRELOAD: https://github.com/desandro/imagesloaded
      $('body').imagesLoaded()
        .always(function (instance) {
          console.log('all images loaded');
          $("#progress_bar").fadeOut(500);
          $("#container").animate({opacity: 1}, 500, function () {
            // $('body').css({ background: 'black' });
          });
        })
        .done(function (instance) {
          console.log('all images successfully loaded');
        })
        .fail(function () {
          console.log('all images loaded, at least one is broken');
        })
        .progress(function (instance, image) {
          let result = image.isLoaded ? 'loaded' : 'broken';
          if (result === 'broken') console.log('image is ' + result + ' for ' + image.img.src);
          _this._imagesProgress(instance, image);
        });

      _this._createSectionArray(_this._offsetOfEachSection);
      _this.onLoad();
    });
  }

  _checkCurrentSection() {
    for (let prop in this.secPos) {
      let index = parseInt(prop);

      if (this.scrollLocate >= this.secPos[index] && this.scrollLocate < this.secPos[index + 1]) {
        this._renewCurrentSection(index);
      }
    }
  }

  _renewCurrentSection(index) {
    if (this.currentSection !== index) {
      this.oldSection = this.currentSection;
      this.currentSection = index;
      this.whenSectionChange(this.oldSection, this.currentSection);
    }
  }

  onLoad() {
    console.info('WINDOW LOADING COMPLETED');

  }

  scrollEvent() {
    this._checkCurrentSection();
    console.log('CURRENT SCROLL: ' + this.scrollLocate);

  }

  whenSectionChange(oldIndex, newIndex) {

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

  tweenAnimation() {
    TweenMax.to($('.selector'), 2, { marginTop: 20, yoyo: true, repeat: -1, ease: Power1.easeInOut });
  }

}

// 객체 생성
$(() => { new Herop(); });