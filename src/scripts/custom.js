window.addEventListener('DOMContentLoaded', function () {

    var images = [
        "https://images.pexels.com/photos/1936299/pexels-photo-1936299.jpeg?crop=entropy&cs=srgb&dl=screen-web-design-developing-codes-1936299.jpg&fit=crop&fm=jpg&h=853&w=1280",
        "https://images.pexels.com/photos/2505693/pexels-photo-2505693.jpeg?crop=entropy&cs=srgb&dl=blue-and-red-plants-2505693.jpg&fit=crop&fm=jpg&h=1706&w=1280",
        "https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg?crop=entropy&cs=srgb&dl=blue-and-brown-milky-way-galaxy-2694037.jpg&fit=crop&fm=jpg&h=719&w=1280",
        "https://images.pexels.com/photos/2304895/pexels-photo-2304895.jpeg?crop=entropy&cs=srgb&dl=lighted-tower-beside-building-2304895.jpg&fit=crop&fm=jpg&h=1600&w=1280"
    ];
    var background = $("#background");
    var scope = new Graphemescope(background[0]);
    var index = 0;
    scope.ease = 0.05;
    scope.radiusFactor = 0.8;

    function changePicture() {
        scope.setImage(images[index]);
        index = (index + 1) % images.length;
    };

    setInterval(changePicture, 10000);
    changePicture();

    $(window).mousemove(function (event) {
        var factorx = event.pageX / $(window).width();
        var factory = event.pageY / $(window).height()

        scope.angleTarget = factorx * 0.25;
        scope.zoomTarget = 1.0 + 0.5 * factory;
    });

    var resizeHandler = function () {
        background.height($(window).height());
        background.width($(window).width());
    };

    $(window).resize(resizeHandler);
    $(window).resize();
    $(window).click(changePicture);

});


window.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('.main-typed', {
        strings: ["I design and develop things.", "I design and develop web apps.", "I design and develop UI/UX.", "I design and develop motion."],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 4000,
        loop: true,
    });
});


window.addEventListener('DOMContentLoaded', function () {
    var scroll = new LocomotiveScroll({
        smooth: true
    });
});
