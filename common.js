$(function () {
    var herop = new Herop();
});

var Herop = function () {
    this._init();
    this._initEvent();
};

// INIT
Herop.prototype._init = function () {
    this._lockScroll = false;
    this._$scrollBody = $(window);
};

// INIT EVENT
Herop.prototype._initEvent = function () {
    this._throttleScroll();
    this.scroll();
    this.plugins();
};

// PLUGINS
Herop.prototype.plugins = function () {

};

Herop.prototype._throttleScroll = function () {
    var that = this;
    setInterval(function () {
        if (that._lockScroll) {
            that._lockScroll = false;
            that.scrollEvent();
        }
    }, 500);
};

Herop.prototype.scroll = function () {
    var that = this;
    that._$scrollBody.on('scroll', function () {
        that._lockScroll = true;
    });
};

Herop.prototype.scrollEvent = function () {
    // command...
};