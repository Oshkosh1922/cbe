document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const audioControl = document.getElementById('audio-control');
    const audioIcon = document.getElementById('audio-icon');
    const volumeControl = document.getElementById('volume-control');
    const backgroundAudio = document.getElementById('background-audio');
    const sections = document.querySelectorAll('.section');

    // Toggle the navigation menu on mobile
    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Only play audio after user interaction to comply with browser autoplay policies
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

    // Volume control for background audio
    volumeControl.addEventListener('input', (e) => {
        backgroundAudio.volume = e.target.value;
    });

    // Throttled scroll event to improve performance
    const handleScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight * 0.75) {
                section.classList.add('visible');
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

    console.log("JavaScript loaded and running!");
});
