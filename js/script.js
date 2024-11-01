document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const audioControl = document.getElementById('audio-control');
    const audioIcon = document.getElementById('audio-icon');
    const backgroundAudio = document.getElementById('background-audio');
    const sections = document.querySelectorAll('.section');
    const letters = document.querySelectorAll('.celebration-title .letter');
    let scrollTimeout;

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    document.addEventListener("click", function(event) {
        if (navLinks.classList.contains("show") && !hamburgerMenu.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove("show");
        }
    });

    function tryPlayAudio() {
        backgroundAudio.play().catch(() => {
            document.body.addEventListener('touchstart', () => {
                backgroundAudio.play();
            }, { once: true });
        });
    }

    tryPlayAudio();

    audioIcon.addEventListener('click', () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play();
            audioIcon.classList.remove('fa-volume-mute');
            audioIcon.classList.add('fa-volume-up');
        } else {
            backgroundAudio.pause();
            audioIcon.classList.remove('fa-volume-up');
            audioIcon.classList.add('fa-volume-mute');
        }
    });

    const handleScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight * 0.75) {
                section.classList.add('visible');
            }
        });

        letters.forEach((letter, index) => {
            const letterTop = letter.getBoundingClientRect().top;
            if (letterTop < window.innerHeight * 0.75) {
                setTimeout(() => {
                    letter.classList.add('visible');
                }, index * 100);
            }
        });
    };

    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    window.addEventListener('scroll', throttle(handleScroll, 200));
    handleScroll();

    window.addEventListener('scroll', function() {
        audioControl.style.opacity = '1';
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            audioControl.style.opacity = '0';
        }, 2000);
    });

    scrollTimeout = setTimeout(() => {
        audioControl.style.opacity = '0';
    }, 2000);

    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        function playVideo() {
            heroVideo.setAttribute('playsinline', 'true');
            heroVideo.play().catch(() => {
                document.body.addEventListener('touchstart', () => {
                    heroVideo.play();
                }, { once: true });
            });
        }
        playVideo();
    }
});

