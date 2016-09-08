$(document).ready(function () {
    var herop = new Herop();
});

var Herop = function () {
    this.init();
    this.initEvent();
};

// INIT
Herop.prototype.init = function () {
    this.didScroll = false;
    this.$scroll = $(window);
};

// INIT EVENT
Herop.prototype.initEvent = function () {
    this.scrollLock();
    this.scroll();
    this.plugins();
};

// PLUGINS
Herop.prototype.plugins = function () {
    
};

Herop.prototype.scrollLock = function () {
    var that = this;
    setInterval(function () {
        if (that.didScroll) {
            that.didScroll = false;
            that.scrollEvent();
        }
    }, 500);
};

Herop.prototype.scroll = function () {
    var that = this;
    that.$scroll.on('scroll', function () {
        that.didScroll = true;
    });
};

Herop.prototype.scrollEvent = function () {
    console.log('didScroll');
};