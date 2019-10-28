(function () {
    'use strict';

    // load dependencies
    var animationControl = require('./animation-control.js');
    var bgMusic = 'bg';
    var fireMusic = 'fire';
    var horrifyMusic = 'horrify';
    // document.getElementById("marquee2").stop();
    // document.getElementById("marquee3").stop();
    // document.getElementById("marquee5").stop();
    
    function playAudio(id) {
        var x = document.getElementById(id);
        x.play();
    }

    function pauseAudio(id) {
        var x = document.getElementById(id);
        x.pause();
    }

    function setVolume(id, volumeToBeSet){
        var x = document.getElementById(id);
        x.volume = volumeToBeSet;
    }

    $(document).ready(function () {
        var $btnMusic = $('.btn-music');
        var $upArrow = $('.up-arrow');
        // background music control
        $btnMusic.click(function () {
            if ($('#bg').get(0).paused) {
                playAudio(bgMusic);
                $(this).removeClass('paused');
            } else {
                pauseAudio(bgMusic);
                $(this).addClass('paused');
            }
        });
        var currentActivePage = 1;
        // init Swiper
        new Swiper('.swiper-container', {
            mousewheelControl: true,
            effect: 'coverflow',    // slide, fade, coverflow or flip
            speed: 400,
            direction: 'vertical',
            fade: {
                crossFade: false
            },
            coverflow: {
                rotate: 100,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: false     // do disable shadows for better performance
            },
            flip: {
                limitRotation: true,
                slideShadows: false     // do disable shadows for better performance
            },
            onInit: function (swiper) {
                animationControl.initAnimationItems();  // get items ready for animations
                animationControl.playAnimation(swiper); // play animations of the first slide
            },
            onTransitionStart: function (swiper) {     // on the last slide, hide .btn-swipe
                if (swiper.activeIndex === swiper.slides.length - 1) {
                    $upArrow.hide();
                } else {
                    $upArrow.show();
                }
            },
            onTransitionEnd: function (swiper) {       // play animations of the current slide
                animationControl.playAnimation(swiper);
                if (document.getElementById("slide-4").style.zIndex == "1") {
                    setVolume(bgMusic, 0.1);
                    playAudio(fireMusic);
                }else{
                    pauseAudio(fireMusic);
                    if (document.getElementById("slide-5").style.zIndex == "1") {
                        setVolume(bgMusic, 0.1);
                        playAudio(horrifyMusic);
                    } else {
                        setVolume(bgMusic, 1);
                    }
                }
                if (document.getElementById("slide-1").style.zIndex == "1") {
                    $('#image2').css('left', '-100%');
                    $('#image1').stop(true, true).delay(500).animate({
                        opacity: "1.0",
                    }, 1300, function(){
                        $('#image1').stop(true, true).animate({
                            width: "200%",
                            marginTop: '25%',
                            marginLeft: '-50%',
                        }, 2000);
                    });
                }
                if (document.getElementById("slide-2").style.zIndex == "1"){
                    $('#image2').stop(true,true).animate({
                        left: "-30%",
                    }, 5000);
                    $('#image3').css('left', '0%');
                    $('#image1').css('opacity', '0.0');
                    $('#image1').css('width', '50%');
                    $('#image1').css('margin', '0 auto');
                    $('#image1').css('margin-top', '45%');
                }
                
                if (document.getElementById("slide-3").style.zIndex == "1") {
                    $('#image2').css('left', '-100%');
                    $('#image3').stop(true, true).delay(500).animate({
                        left: "-80%",
                    }, 5000);
                }
                if (document.getElementById("slide-4").style.zIndex == "1") {
                    $('#image3').css('left', '0%');
                    $('#image5').css('left', '0%');
                }
                
                if (document.getElementById("slide-5").style.zIndex == "1") {
                    $('#image5').stop(true, true).delay(500).animate({
                        left: "-90%"
                    }, 3500, function () {
                        $('#image5').stop(true, true).animate({
                            left: "0%"
                        }, 3500, function(){
                            $('#image5').stop(true, true).animate({
                                left: "-90%"
                            }, 3500, function () {
                                $('#image5').stop(true, true).animate({
                                    left: "0%"
                                }, 3500);
                            });
                        });
                    });
                }
                if (document.getElementById("slide-6").style.zIndex == "1") {
                    $('#image5').css('left', '0%');
                }
            },
            onTouchStart: function (swiper, event) {    // mobile devices don't allow audios to play automatically, it has to be triggered by a user event(click / touch).
                playAudio(bgMusic);
                if (document.getElementById("slide-3").style.zIndex == "1") {
                    setVolume(bgMusic, 0.2);
                    playAudio(fireMusic);
                } else {
                    if (document.getElementById("slide-4").style.zIndex == "1") {
                        setVolume(bgMusic, 0.2);
                        playAudio(horrifyMusic);
                    } else {
                        setVolume(bgMusic, 1);
                        pauseAudio(fireMusic);
                    }
                }
            },
            onTouchEnd: function(swiper, event){
                if (document.getElementById("slide-3").style.zIndex != "1"){
                    pauseAudio(fireMusic);
                }
            }
        });

        // hide loading animation since everything is ready
        $('.loading-overlay').slideUp();
    });
})();
