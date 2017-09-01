var TOGGLE = (function (root, docs, $) {
  'use strict';


  // Toggle Class
  function ToggleClass(index, selector, className) {
    this.init(index, selector, className);
  }

  ToggleClass.prototype = {
    init: function (index, selector, className) {
      this.i = index;
      this.$sel = selector;
      this.cn = className;

      this.initEvent();
    },
    initEvent: function () {
      this.toggleClass();
    },
    toggleClass: function () {
      this.$sel.removeClass(this.cn).eq(this.i).addClass(this.cn);
    }
  };


  // Toggle Function
  function ToggleFunction(index, selector, methods) {
    this.init(index, selector, methods);
  }

  ToggleFunction.prototype = {
    init: function (index, selector, methods) {
      this.i = index;
      this.$sel = selector;

      this.initEvent(methods);
    },
    initEvent: function (methods) {
      this.checkMethodName(methods);
      this.remove(methods.remove);
      this.add(methods.add);
    },
    checkMethodName: function (methods) {
      if (!methods.remove || !methods.add) {
        throw '메소드의 이름을 확인하세요! \n remove: function ($remove) {} \n add: function ($add) {}';
      }
    },
    remove: function (removeFunc) {
      removeFunc(
        this.$sel.not(this.$sel.eq(this.i))
      );
    },
    add: function (addFunc) {
      addFunc(
        this.$sel.eq(this.i)
      );
    }
  };


  // Insert this
  function InsertThis(_this) {
    if (!_this) {
      throw '메소드의 인자를 확인하세요! \n [this]'
    }
    this.init(_this);
  }

  InsertThis.prototype = {
    init: function (_this) {
      this.$this = $(_this);
      this.i = this.$this.index();
      this.$sel = this.$this.parent().children();
    },
    toggleClass: function (className) {
       new ToggleClass(this.i, this.$sel, className);
    },
    toggleFunction: function (methods) {
      new ToggleFunction(this.i, this.$sel, methods);
    }
  };


  // Insert Index
  function InsertIndex(index, selector) {
    if (!index || !selector) {
      throw '메소드의 인자를 확인하세요! \n [index, selector]'
    }
    this.init(index, selector);
  }

  InsertIndex.prototype = {
    init: function (index, selector) {
      this.i = index;
      this.$sel = $(selector);
    },
    toggleClass: function (className) {
      new ToggleClass(this.i, this.$sel, className);
    },
    toggleFunction: function (methods) {
      new ToggleFunction(this.i, this.$sel, methods);
    }
  };


  // Return
  return {
    insertThis: InsertThis,
    insertIndex: InsertIndex
  };

}(window, document, jQuery));