$(function () {
    new Herop();
});

var Herop = function () {
    this._init();
    this._initEvent();
};

Herop.prototype = {

    // INITIALIZE
    _init: function () {
        this._lockScroll = false;
        this._secPos = [];
        this.findingSection = false;  // set offset of the sections : Boolean
        this.$scrollBody = $('html');  // scroll selector: String
        this.throttleDuration = 400;  // scroll speed: Number
    },

    // EVENT
    _initEvent: function () {
        this._scroll();
        this._plugins();
        this.offsetOfEachSection();
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
        });
    },

    scrollEvent: function () {
        console.log('scroll..');
    },

    offsetOfEachSection: function () {
        if (this.findingSection) {
            $(window).load(function () {
                this._secPos = [
                    $('#sec1').offset().top,
                    $('#sec2').offset().top,
                    $('#sec3').offset().top,
                    $('#sec4').offset().top
                ];
                for (var i = 0; i < this._secPos.length; i++) {
                    console.log(this._secPos[i]);
                }
            });
        }
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
        var tween = new TimelineMax({repeat: -1});
        var $o = $('.selector');
        tween
            .set($o.find('img'), {width: 35, marginTop: 20, marginLeft: 20})
            .set($o, {opacity: 0})
            .to($o.find('img'), 1, {width: 55, marginTop: 6, marginLeft: 6, ease: Power0.easeNone}, '-=1')
            .from($o, 1, {top: 170, left: 215, ease: Power0.easeNone});
    }

};