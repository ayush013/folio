window.addEventListener('DOMContentLoaded', function () {

    //SCROLLTOP ON RELOAD
    setTimeout(() => {
        $(this).scrollTop(0);
    }, 0);

    //SMOOTHSCROLL ON LINKS
    $(document).on('click', 'a[href^="#"]', function (e) {
        e.preventDefault();
        $('.checkbox-toggle').prop('checked', false);
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });

    //GRAPHEMESCOPE
    var images = [
        "assets/bg/plants.jpg",
        "assets/bg/pattern2.jpg",
        "assets/bg/rose.jpg",
        "assets/bg/pattern1.jpg",
    ];
    var background = $("#background");
    var scope = new Graphemescope(background[0]);
    var index = 0;
    scope.ease = 0.05;
    scope.radiusFactor = 0.35;

    function changePicture() {
        scope.setImage(images[index]);
        index = (index + 1) % images.length;
    }

    setInterval(changePicture, 10000);
    changePicture();

    $(window).mousemove(function (event) {
        var factorx = event.pageX / $(window).width();
        var factory = event.pageY / $(window).height();

        scope.angleTarget = factorx * 0.5;
        scope.angleTarget = factory * 0.25;
        //  scope.zoomTarget = 1.0 + 0.25 * factory;
    });

    var resizeHandler = function () {
        background.height(2 * window.innerHeight);
        background.width(2 * window.innerWidth);
    };

    $(window).resize(resizeHandler);
    $(window).resize();
    $(window).click(changePicture);

    // TYPED JS
    var typed = new Typed('.main-typed', {
        strings: ["I design and develop things.", "I design and develop web apps.", "I design and develop UI/UX.", "I design and develop motion."],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 4000,
        loop: true,
    });


    // RELLAX

    var rellax = new Rellax('.rellax', { center: true });

    // SPLITTING AND SCROLLOUT ANIMS
    Splitting();
    ScrollOut({ targets: '.about-title', offset: 0, scope: ".about-section" });
    ScrollOut({ targets: '.skills-title', offset: 0, scope: ".skills-section" });
    ScrollOut({ targets: '.experience-title', offset: 0, scope: ".experience-section" });
    ScrollOut({ targets: '.contact-title', offset: 0, scope: ".contact-section" });
    ScrollOut({ targets: '.projects-title', offset: 0, scope: ".projects-section", once: true });
    ScrollOut({ targets: '.achievements-title', offset: 0, scope: ".achievements-section" });

    ScrollOut({ targets: '.img-enter', offset: 0, scope: ".contact-section" });

    // SVG DOM HOVER ACTIONS
    var skillsColorArray = ['#FFCA28', '#DE0031', '#F16529', '#29A9DF', '#FFB03A', '#CD6799',
        '#0ACF83', '#FDD231', '#FF7C00', '#26C9FF', '#FF2A63', '#F05033', '#D34A47', '#3DF0F0', '#D291FF'];

    skillsColorArray.forEach((color, index) => {
        document.getElementsByClassName('skill-svg')[index].addEventListener("mouseover", function () {
            var element = $('.skill-svg')[index].contentDocument.getElementsByClassName('fill');
            Array.from(element).forEach(path => {
                path.style.transition = '0.5s';
                path.style.fill = color;
                setTimeout(function () {
                    path.style.fill = "#ffffff";
                }, 500);
            });
        });
    });

    var socialColorArray = ['#367fd3', '#3C5A99', '#3EC6EA', '#8A45BE', '#E74D89', '#1769FF'];

    socialColorArray.forEach((color, index) => {
        document.getElementsByClassName('social-link')[index].addEventListener("mouseover", function () {
            var element = $('.social-svg')[index].contentDocument.getElementsByClassName('fill');
            Array.from(element).forEach(path => {
                path.style.transition = '0.5s';
                path.style.fill = color;
                setTimeout(function () {
                    path.style.fill = "#ffffff";
                }, 500);
            });
        });
    });

    // TILT
    $('.svg-tilt').tilt({
        maxTilt: 20,
        scale: 1.2,
        perspective: 500
    });


    // MUTATION OBSERVER FOR POSITION FIXED HACK
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutationRecord) {
            var transformX = new WebKitCSSMatrix($('#projects').css('-webkit-transform'))['e'];
            $('.sticky-title').css('transform', 'translateX(' + (-transformX) + 'px)');
        });
    });
    var target = document.getElementById('projects');


    // HORIZONTAL SCROLL
    var controller = new ScrollMagic.Controller();
    var tl = gsap.timeline();
    var elementWidth = document.getElementById('projects').offsetWidth;
    var width = window.innerWidth - elementWidth;
    var duration = elementWidth / window.innerHeight * 100;
    var official = duration + '%';
    tl.to('.projects-section', 5, { x: width, ease: Power0.easeNone });

    var scene1 = new ScrollMagic.Scene({
        triggerElement: '.projects-section',
        triggerHook: 0,
        duration: official,
    }).setPin('.projects-section')
        .setTween(tl)
        .addTo(controller)
        .on('enter', function (e) {
            observer.observe(target, { attributes: true, attributeFilter: ['style'] });
        })
        .on('leave', function (e) {
            observer.disconnect();
        });

    // LAZY LOADED RESOURCES
    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".dp-lazy"
    });

    var lazyLoadInstance2 = new LazyLoad({
        elements_selector: ".project-lazy"
    });

    // MAIN THREAD EXECUTION COMPLETE
    $('body').addClass('loaded');

});
