window.addEventListener('DOMContentLoaded', function () {

    // IS DESKTOP CHECK

    const isDesktop = (typeof window.orientation === "undefined") && (navigator.userAgent.indexOf('IEMobile') === -1);

    // SPLITTING

    Splitting();

    // SCROLLTRIGGER REGISTER
    gsap.registerPlugin(ScrollTrigger);


    // TITLE REVEAL DEFINITION

    const titleGSAP = ({ targetTitle, targetSection }) => {

        const scrollTimeline = gsap.timeline({
            ease: Back.easeIn
        });

        scrollTimeline.fromTo(targetTitle, 0.5,
            { y: 30, opacity: 0, stagger: 0.1 },
            { y: 0, opacity: 1, stagger: 0.1 }
        );

        ScrollTrigger.create({
            trigger: targetSection,
            start: "top bottom",
            animation: scrollTimeline
        });

    }

    // TEMPLATING FOR PROJECTS SECTION

    const projectTemplate = document.getElementById('projects-template');
    const projectNode = document.importNode(projectTemplate.content, true);

    // PROGRESS BAR

    $(window).scroll(() => {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("progress").style.width = scrolled + "%";
    })


    // HORIZONTAL SCROLL FOR PROJECTS SECTION ON DESKTOP

    if (isDesktop) {

        $('.projects-section-mobile').css('display', 'none');
        $('.projects-section').attr('id', 'projects');
        $('.horizontal-container').append(projectNode);

        titleGSAP({ targetTitle: '.projects-title .char', targetSection: ".projects-section" });

        // MUTATION OBSERVER FOR POSITION FIXED HACK
        let observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutationRecord) {
                let transformX = new WebKitCSSMatrix($('#projects').css('-webkit-transform')).e;
                $('.sticky-title').css('transform', 'translateX(' + (-transformX) + 'px)');
            });
        });

        const target = document.getElementById('projects');

        const tl = gsap.timeline();
        const elementWidth = document.getElementById('projects').offsetWidth;
        const width = window.innerWidth - elementWidth;
        const duration = elementWidth / window.innerHeight * 100;
        const official = duration + '%';
        tl.to('.projects-section', 5, { x: width, ease: Power0.easeNone });

        ScrollTrigger.create({
            trigger: ".projects-section",
            start: "top top",
            end: official,
            scrub: 0,
            pin: true,
            animation: tl,
            onEnter: () => observer.observe(target, { attributes: true, attributeFilter: ['style'] }),
            onEnterBack: () => observer.observe(target, { attributes: true, attributeFilter: ['style'] }),
            onLeave: () => observer.disconnect()
        });

    } else {
        // CAROUSEL PROJECTS CONTAINER FOR MOBILE
        $('.projects-section').css('display', 'none');
        $('.projects-section-mobile').attr('id', 'projects');
        $('.project-carousel').append(projectNode);

        titleGSAP({ targetTitle: '.projects-title .char', targetSection: ".projects-section-mobile" });

        $('.project-carousel').owlCarousel({
            loop: true,
            margin: 0,
            items: 1,
            autoplay: true,
            dots: false
        });
    }


    // TEMPLATING FOR ACHIEVEMENTS SECTION

    const achievementTemplate = document.getElementById('achievements-template');
    const achievementNode = document.importNode(achievementTemplate.content, true);


    // ACHIEVEMENTS SECTION BASED ON DEVICE 

    if (isDesktop) {

        $('.achievements-section-mobile').css('display', 'none');
        $('.achievements-section').attr('id', 'achievements');

        const achievement = achievementNode.querySelectorAll('.achievement');

        Array.from($('.achievements-block .col-md-4')).forEach(function (col, index) {
            for (let i = 0; i < 5; i++) {
                col.append(achievement[5 * index + i]);
            }
        });

        titleGSAP({ targetTitle: '.achievements-title .char', targetSection: ".achievements-section" });

    } else {
        // CAROUSEL ACHIEVEMENTS CONTAINER FOR MOBILE
        $('.achievements-section').css('display', 'none');
        $('.achievements-section-mobile').attr('id', 'achievements');
        $('.achievements-section-mobile').addClass('achievements-section');
        $('.achievement-carousel').append(achievementNode);

        titleGSAP({ targetTitle: '.achievements-title .char', targetSection: ".achievements-section-mobile" });

        let achievementOwl = $('.achievement-carousel');

        achievementOwl.owlCarousel({
            loop: true,
            margin: 0,
            items: 1,
            autoplay: true,
            dots: false,
            autoHeight: true
        });
    }

    // TIMELINE ACCORDING TO DEVICE 

    if (!isDesktop || (window.innerWidth < 767)) {
        $('.timeline object').attr('data', 'assets/timeline_mobile.svg');
    } else {
        $('.timeline object').attr('data', 'assets/timeline.svg');
    }


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

    // TYPED JS
    new Typed('.main-typed', {
        strings: ["modern frontend applications.", "dynamic user experiences", "motion on web."],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 4000,
        loop: true
    });


    // TITLE REVEAL INVOCATION

    [{ targetTitle: '.about-title .char', targetSection: ".about-section" },
    { targetTitle: '.skills-title .char', targetSection: ".skills-section" },
    { targetTitle: '.experience-title .char', targetSection: ".experience-section" },
    { targetTitle: '.contact-title .char', targetSection: ".contact-section" },
    ].forEach(el => {
        titleGSAP(el);
    })

    // SVG DOM HOVER ACTIONS

    function svgHoverFill(colorArray, hoverElClass, targetSvg) {
        colorArray.forEach((color, index) => {
            document.getElementsByClassName(hoverElClass)[index].addEventListener("mouseover", function () {
                const element = $(targetSvg)[index].contentDocument.getElementsByClassName('fill');
                Array.from(element).forEach(path => {
                    path.style.transition = '0.5s';
                    path.style.fill = color;
                    setTimeout(function () {
                        path.style.fill = "#ffffff";
                    }, 500);
                });
            }, { passive: true });
        });
    }

    const skillsColorArray = ['#FFCA28', '#DE0031', '#F16529', '#29A9DF', '#FFB03A', '#CD6799',
        '#0ACF83', '#FDD231', '#FF7C00', '#26C9FF', '#FF2A63', '#F05033', '#D34A47', '#3DF0F0', '#D291FF', "#8AC640"];

    const socialColorArray = ['#367fd3', '#3C5A99', '#3EC6EA', '#8A45BE', '#E74D89', '#1769FF', '#EEEEEE'];

    svgHoverFill(skillsColorArray, 'svg-tilt', '.skill-svg');
    svgHoverFill(socialColorArray, 'social-link', '.social-svg');


    // TILT

    $('.svg-tilt').universalTilt({
        settings: {
            max: 20,
            scale: 1.2,
            perspective: 500
        }
    });

    $('.dp-tilt').universalTilt({
        settings: {
            max: 20,
            base: 'window',
            perspective: 500
        }
    });


    // LAZY LOADED RESOURCES

    new LazyLoad({ elements_selector: ".dp-lazy" });

    new LazyLoad({ elements_selector: ".project-lazy" });

    // CUSTOM CURSOR
    if (isDesktop) {

        const cursor = $(".cursor");
        const follower = $(".cursor-follower");

        let posX = 0;
        let posY = 0;

        let mouseX = 0;
        let mouseY = 0;

        gsap.to({}, 0.005, {
            repeat: -1,
            onRepeat: function () {
                posX += (mouseX - posX) / 9;
                posY += (mouseY - posY) / 9;

                gsap.set(follower, {
                    css: {
                        left: posX - 12,
                        top: posY - 12
                    }
                });

                gsap.set(cursor, {
                    css: {
                        left: mouseX,
                        top: mouseY
                    }
                });
            }
        });

        $(document).on("mousemove", function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        $(".link").on("mouseenter", function () {
            cursor.addClass("active");
            follower.addClass("active");
        });
        $(".link").on("mouseleave", function () {
            cursor.removeClass("active");
            follower.removeClass("active");
        });

    } else {
        $(".cursor").css('display', 'none');
        $(".cursor-follower").css('display', 'none');
    }

    // MAIN THREAD EXECUTION COMPLETE
    $('body').addClass('loaded');

});
