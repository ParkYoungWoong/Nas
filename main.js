$(function () {
    new Herop();
});

var Herop = function () {
    this._lockScroll = false;
    this.throttleDuration = 400;  // 스크롤 파악 속도: Number
    this.$scrollBody = $('html');  // 스크롤 선택자: String
    this.scrollDirection = 'top';  // 스크롤 방향: String ['top', 'left']
    this.findingSection = true;  // 섹션 위치 파악: Boolean
    this.sec = ['#sec1', '#sec2', '#sec3', '#sec4'];  // 섹션 선택자: Array
    this.secPos = [];
    this.scrollLocate = 0;

    this._initEvent();
};

Herop.prototype = {

    // EVENT
    _initEvent: function () {
        this._scroll();
        this._plugins();
        this.windowLoad();  // window load!
    },

    _plugins: function () {
        this.niceScroll();
        this.bxSlider();
        this.tweenMax();
    },

    _throttleScroll: function () {
        var _this = this;

        setInterval(function () {
            if (_this._lockScroll) {
                _this._lockScroll = false;
                _this.scrollEvent();
            }
        }, this.throttleDuration);
    },

    _scroll: function () {
        this._throttleScroll();

        var scrollBody = this.$scrollBody.selector === 'html' ? $(document) : this.$scrollBody;
        var _this = this;

        scrollBody.on('scroll', function () {
            _this._lockScroll = true;
            _this.scrollLocate = _this.scrollDirection === 'top' ? $(this).scrollTop() : $(this).scrollLeft();
        });
    },

    offsetOfEachSection: function () {
        if (this.findingSection) {
            var _this = this;
            var _result = null;

            this.sec.forEach(function (item, index, array) {
                if (!$(item).length === 0) {
                    switch (_this.scrollDirection) {
                        case 'top':
                            _result = $(item).offset().top;
                            break;
                        case 'left':
                            _result = $(item).offset().left;
                            break;
                    }

                    _this.secPos.push(_result);
                }
            });
        }
    },

    addWindowLoadEvent: function (func) {  // 중복 로드(load) 처리
        var oldonload = window.onload;
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
    },

    windowLoad: function () {
        var _this = this;

        // $(window).load({ ...
        this.addWindowLoadEvent(function () {
            _this.offsetOfEachSection();

        });
    },

    niceScroll: function () {
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
    },

    bxSlider: function () {
        // Options: http://bxslider.com/options
        $('#selector').bxSlider({
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
    },

    tweenMax: function () {
        // Documentation: https://greensock.com/docs/#/HTML5/GSAP/
        this.tweenAnimation();
        this.timeLineAnimation();
    },

    tweenAnimation: function () {
        TweenMax.to($('.selector'), 2, {marginTop: 20, yoyo: true, repeat: -1, ease: Power1.easeInOut});
    },

    timeLineAnimation: function () {
        // animation 1
        (function () {
            var tween = new TimelineMax({repeat: -1});
            var $o = $('.selector');
            tween
                .set($o.find('img'), {width: 35, marginTop: 20, marginLeft: 20})
                .set($o, {opacity: 0})
                .to($o.find('img'), 1, {width: 55, marginTop: 6, marginLeft: 6, ease: Power0.easeNone}, '-=1')
                .from($o, 1, {top: 170, left: 215, ease: Power0.easeNone});
        }());
    },

    scrollEvent: function () {
        console.log(this.scrollLocate);
    }

};
