// Tilt js animation
$(".tilt-effect").tilt({
    maxTilt: 4,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    speed: 500,
    transition: true,
});

// Client Slider
$(".owl-carousel").owlCarousel({
    loop: true,
    nav: false,
    items: 1,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    autoHeight: false,
    autoHeightClass: "owl-height",
});

// portfolio img effact
$(".main-img-box").each(function() {
    $(this)
        .on("mouseenter", function() {
            if ($(this).data("title")) {
                $(".dizme_tm_portfolio_titles").html($(this).data("title") + '<span class="work__cat">' + $(this).data("category") + "</span>");
                $(".dizme_tm_portfolio_titles").addClass("visible");
            }
            $(document).on("mousemove", function(e) {
                $(".dizme_tm_portfolio_titles").css({
                    left: e.clientX - 10,
                    top: e.clientY + 25,
                });
            });
        })
        .on("mouseleave", function() {
            $(".dizme_tm_portfolio_titles").removeClass("visible");
        });
});

// Navbar sticky and active
var navbar = document.querySelector("nav");
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".mobile-nav ul li");
window.onscroll = function() {
    if (window.pageYOffset > 80) {
        navbar.classList.add("stickyadd");
    } else {
        navbar.classList.remove("stickyadd");
    }

    var current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((li) => {
        li.classList.remove("active");
        if (li.classList.contains(current)) {
            li.classList.add("active");
        }
    });
};

// Menu Colleped
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

// Portfolio filter
$(window).on("load", function() {
    var $container = $(".work-filter");
    var $filter = $("#menu-filter");
    $container.isotope({
        filter: "*",
        layoutMode: "masonry",
        animationOptions: {
            duration: 750,
            easing: "linear",
        },
    });

    $filter.find("a").on("click", function() {
        var selector = $(this).attr("data-filter");
        $filter.find("a").removeClass("active");
        $(this).addClass("active");
        $container.isotope({
            filter: selector,
            animationOptions: {
                animationDuration: 750,
                easing: "linear",
                queue: false,
            },
        });
        return false;
    });
});

// Mouse pointer
var myCursor = $(".mouse-cursor");

if (myCursor.length) {
    if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
            t = document.querySelector(".cursor-outer");
        let n,
            i = 0,
            o = !1;
        (window.onmousemove = function(s) {
            o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), (e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), (n = s.clientY), (i = s.clientX);
        }),
        $("body").on("mouseenter", "a, .cursor-pointer", function() {
                e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
            }),
            $("body").on("mouseleave", "a, .cursor-pointer", function() {
                ($(this).is("a") && $(this).closest(".cursor-pointer").length) || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"));
            }),
            (e.style.visibility = "visible"),
            (t.style.visibility = "visible");
    }
}

// magnificPopup
$(".img-zoom").magnificPopup({
    type: "image",
    closeOnContentClick: true,
    mainClass: "mfp-fade",
    gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1],
    },
});

// preloader
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
var preloader = $("#preloader");

if (!isMobile) {
    setTimeout(function() {
        preloader.addClass("preloaded");
    }, 800);
    setTimeout(function() {
        preloader.remove();
    }, 2000);
} else {
    preloader.remove();
}

// Wow js
new WOW().init();

// Modal
function toggleModal(modalID) {
    document.getElementById(modalID).classList.toggle("hidden");
    document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
    document.getElementById(modalID).classList.toggle("flex");
    document.getElementById(modalID + "-backdrop").classList.toggle("flex");
}

function toggleModaltwo(modalIDtwo) {
    document.getElementById(modalIDtwo).classList.toggle("hidden");
    document.getElementById(modalIDtwo + "-backdrop").classList.toggle("hidden");
    document.getElementById(modalIDtwo).classList.toggle("flex");
    document.getElementById(modalIDtwo + "-backdrop").classList.toggle("flex");
}

function toggleModalthree(modalIDthree) {
    document.getElementById(modalIDthree).classList.toggle("hidden");
    document.getElementById(modalIDthree + "-backdrop").classList.toggle("hidden");
    document.getElementById(modalIDthree).classList.toggle("flex");
    document.getElementById(modalIDthree + "-backdrop").classList.toggle("flex");
}

function toggleModalfour(modalIDfour) {
    document.getElementById(modalIDfour).classList.toggle("hidden");
    document.getElementById(modalIDfour + "-backdrop").classList.toggle("hidden");
    document.getElementById(modalIDfour).classList.toggle("flex");
    document.getElementById(modalIDfour + "-backdrop").classList.toggle("flex");
}

// Blog Modal

function toggleModalblog(modalIDblog) {
    document.getElementById(modalIDblog).classList.toggle("hidden");
    document.getElementById(modalIDblog + "-backdrop").classList.toggle("hidden");
    document.getElementById(modalIDblog).classList.toggle("flex");
    document.getElementById(modalIDblog + "-backdrop").classList.toggle("flex");
}

function toggleModalblogtwo(modalIDblogtwo) {
    document.getElementById(modalIDblogtwo).classList.toggle("hidden");
    document.getElementById(modalIDblogtwo + "-backdrop").classList.toggle("hidden");
    document.getElementById(modalIDblogtwo).classList.toggle("flex");
    document.getElementById(modalIDblogtwo + "-backdrop").classList.toggle("flex");
}

function toggleModalblogthree(modalIDblogthree) {
    document.getElementById(modalIDblogthree).classList.toggle("hidden");
    document.getElementById(modalIDblogthree + "-backdrop").classList.toggle("hidden");
    document.getElementById(modalIDblogthree).classList.toggle("flex");
    document.getElementById(modalIDblogthree + "-backdrop").classList.toggle("flex");
}