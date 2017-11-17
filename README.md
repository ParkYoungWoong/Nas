# HEROPY 
 
## [DEMO](https://parkyoungwoong.github.io/mainJS-HEROPY/)

## Call the JavaScript

```html
<link rel="stylesheet" href="css/mainJS.css">

<script src="js/lib/jquery.min.js"></script>
<script src="js/lib/jquery.easing.min.js"></script>
<script src="js/lib/modernizr.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js"></script>
<script src="js/lib/vue.js"></script>

<script src="js/plugins/prefixfree.min.js"></script>
<script src="js/plugins/TweenMax.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/plugins/ScrollToPlugin.min.js"></script>
<script src="js/plugins/imagesloaded.pkgd.min.js"></script>
<script src="js/plugins/rellax.min.js"></script>

<script src="js/plugins/jquery.nicescroll.min.js"></script>
<script src="js/plugins/jquery.bxslider.min.js"></script>
<script src="js/plugins/jquery.heropy.js"></script>

<script src="js/main.js"></script>
```

## Options

### Init Options

```js
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
    zindex: 999,
    scrollspeed: 60,
    mousescrollstep: 40
  },
  
  // Images Preload
  imagePreloadUse: false,  // 전역 jQuery Image Preload Plugin 사용 여부
  imagePreloadSelector: 'body',  // 전역 jQuery Image Preload Plugin 으로 적용할 대상
  imagePreloadDirectory: 'img/',  // 전역 jQuery Image Preload Plugin 에서 검색할 이미지 폴더 경로
  imagePreloadList: '',  // 전역 jQuery Image Preload Plugin 에서 사용할 이미지 목록 / img 폴더 안 / $ dir /b >list.txt / MS Word / 바꾸기 / ^p
  // IMAGE PRELOAD: https://github.com/desandro/imagesloaded
  imagePreloadAlways: function (instance) {},
  imagePreloadDone: function (instance) {},
  imagePreloadFail: function () {},
  imagePreloadProgress: function (instance, image) {}
});
```

### Public Methods

#### `HEROPY.toggle()`

```js
/**
* 토글 함수를 시작합니다.
* @param - 없음
*/
HEROPY.toggle();


// TARGETING METHODS
/**
* 대상 내에서 이벤트 타겟을 처리
* @param {object} $this - 이벤트 타겟  
*/
HEROPY.toggle().insertThis(this);

/**
* 일반적으로 대상의 밖에서 이벤트 타겟의 인덱스 번호와 콘텐스트로 처리
* @param {number} index - 이벤트 타겟의 인덱스 번호
* @param {string} context - 이벤트 타겟이 속한 콘텍스트(선택자)
*/
HEROPY.toggle().insertIndex(index, context);


// FUNCTIONS METHODS
/**
* 클래스 이름으로 토글
* @param {string} className - 토글할 클래스 이름
*/
HEROPY.toggle().TARGETING_METHOD().toggleClass(className);

/**
* 기능(함수)으로 토글 
* @param {object} method - 토글할 기능 객체
* @method remove - 기능 제거하기
* @param {object} $remove - 기능을 제거할 대상
* @method add - 기능 추가하기
* @param {object} - 기능을 추가할 대상
*/
HEROPY.toggle().TARGETING_METHOD().toggleFunction(methods);

// Example
HEROPY.toggle().TARGETING_METHOD().toggleFunction({
  remove: function ($remove) {
    $remove.hide();  
  },
  add: function ($add) {
    $add.show();
  }
});
```

#### Nice Scroll Methods

```js
HEROPY.startNiceScroll();  // 전역 Nice Scroll Plugin 시작하기 / 기본으로 실행되어 있습니다
HEROPY.stopNiceScroll();  // 전역 Nice Scroll Plugin 정지하기
```

#### Section Properties

```js
/**
* 섹션의 `offset` 값을 배열로 반환 
* @type {Array}
*/
console.log(
  HEROPY.getOffsetEachSection
);
```