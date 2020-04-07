var images = [
    "http://media-cache-ak0.pinimg.com/736x/5d/d8/41/5dd8416cbae27edeac61aa525a5df99d.jpg",
    "https://1.bp.blogspot.com/-FpxaoVBBxXs/T5aWaP2dMDI/AAAAAAAAAw8/qdaPYyuqSt8/s1600/spugnaepicinfame.jpg",
    "https://25.media.tumblr.com/tumblr_m9ls7nRTuR1rvqbato1_1280.jpg",
    "https://3.bp.blogspot.com/-SJAKrZTcqwI/T5kwYk71YCI/AAAAAAAAAxE/HNlX3i2-xwk/s1600/spugnabimbofango.jpg"
];


var container = $("#container");
var scope = new Graphemescope(container[0]);


var index = 0;

function changePicture() {
    scope.setImage(images[index]);
    index = (index + 1) % images.length;
};

setInterval(changePicture, 10000);
changePicture();

$(window).mousemove(function (event) {
    var factorx = event.pageX / $(window).width();
    var factory = event.pageY / $(window).height()

    scope.angleTarget = factorx;
    scope.zoomTarget = 1.0 + 0.5 * factory;
});


var resizeHandler = function () {
    container.height($(window).height());
    container.width($(window).width());
};

$(window).resize(resizeHandler);
$(window).resize();

container.click(changePicture);