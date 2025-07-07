/*
Author       : themes_mountain
Template Name: Janemon - Personal Portfolio Template
Version      : 1.0
*/
(function($) {
    'use strict';

    jQuery(document).on('ready', function() {

        /*PRELOADER JS*/
        $(window).on('load', function() {
            $('.status').fadeOut();
            $('.preloader').delay(350).fadeOut('slow');
        });
        /*END PRELOADER JS*/

        /*START MENU JS*/
        function windowScroll() {
            const navbar = document.getElementById("navbar");
            if (
                document.body.scrollTop >= 50 ||
                document.documentElement.scrollTop >= 50
            ) {
                navbar.classList.add("nav-sticky");
            } else {
                navbar.classList.remove("nav-sticky");
            }
        }

        window.addEventListener('scroll', (ev) => {
            ev.preventDefault();
            windowScroll();
        })
        /*END MENU JS*/

        /*START PROGRESS BAR*/
        $('.progress-bar > span').each(function() {
            var $this = $(this);
            var width = $(this).data('percent');
            $this.css({
                'transition': 'width 2s'
            });

            setTimeout(function() {
                $this.appear(function() {
                    $this.css('width', width + '%');
                });
            }, 500);
        });
        /*END PROGRESS BAR*/

        /* START COUNTDOWN JS*/
        $('.counter_feature').on('inview', function(event, visible, visiblePartX, visiblePartY) {
            if (visible) {
                $(this).find('.counter-num').each(function() {
                    var $this = $(this);
                    $({
                        Counter: 0
                    }).animate({
                        Counter: $this.text()
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.ceil(this.Counter));
                        }
                    });
                });
                $(this).unbind('inview');
            }
        });
        /* END COUNTDOWN JS */

        /* START JQUERY LIGHTBOX*/
        jQuery('.lightbox').venobox({
            numeratio: true,
            infinigall: true
        });
        /* END JQUERY LIGHTBOX*/

        /* START MIX JS */
        $('.portfolio_item').mixItUp({

        });

    });

    /* START PARALLAX JS */
    (function() {

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        } else {
            $(window).stellar({
                horizontalScrolling: false,
                responsive: true
            });
        }

    }());
    /* END PARALLAX JS  */

    /*START WOW ANIMATION JS*/
    new WOW().init();
    /*END WOW ANIMATION JS*/

})(jQuery);