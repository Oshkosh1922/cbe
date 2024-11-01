
document.addEventListener("DOMContentLoaded", function() {
    
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
    document.addEventListener("click", function(event) {
        const navLinks = document.getElementById("nav-links");
        const hamburgerMenu = document.getElementById("hamburger-menu");

        if (navLinks.classList.contains("show") && !hamburgerMenu.contains(event.target) && !navLinks.contains(event.target)) {
            navLinks.classList.remove("show");
        }
    });

   
    const navItems = document.querySelectorAll('nav ul li > a');

    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            const parentLi = event.target.parentElement;
            const dropdown = parentLi.querySelector('.dropdown');

            if (dropdown) {
                event.preventDefault();
                dropdown.classList.toggle('show');

               
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherDropdown = otherItem.parentElement.querySelector('.dropdown');
                        if (otherDropdown && otherDropdown.classList.contains('show')) {
                            otherDropdown.classList.remove('show');
                        }
                    }
                });
            }
        });
    });

   
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

   
    const missionItems = document.querySelectorAll('.mission-item');
    missionItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.classList.add('hover');
        });
        item.addEventListener('mouseout', () => {
            item.classList.remove('hover');
        });
    });

    
    const elementsToShow = document.querySelectorAll('.mission-item, .mission-title, .mission-description');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function loop() {
        elementsToShow.forEach((element) => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });

        window.requestAnimationFrame(loop);
    }

    loop();

    
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const popup = document.getElementById('popup');

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();

        if (query) {
            const targetElement = document.querySelector(`[id="${query}"]`);

            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const targetOffset = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);

                window.scrollTo({
                    top: targetOffset,
                    behavior: 'smooth'
                });

                targetElement.classList.add('highlight');

                searchInput.value = '';
                searchButton.style.backgroundColor = 'rgb(255, 94, 94)';

                setTimeout(() => {
                    searchButton.style.backgroundColor = 'rgb(94, 174, 199)';
                }, 300);

                if (popup) {
                    const targetImage = targetElement.querySelector('.mission-image, .mission-video');
                    const targetText = targetElement.querySelector('.mission-text');

                    if (targetImage && targetText) {
                        const imageRect = targetImage.getBoundingClientRect();
                        const textRect = targetText.getBoundingClientRect();
                        
                        popup.style.top = `${window.scrollY + textRect.top + textRect.height + 10}px`;
                        popup.style.left = `${window.scrollX + imageRect.left + (imageRect.width / 2) - (popup.offsetWidth / 2)}px`;
                    } else {
                        popup.style.top = `${targetOffset}px`; 
                        popup.style.left = `${window.scrollX + rect.left + (rect.width / 2) - (popup.offsetWidth / 2)}px`;
                    }

                    popup.classList.add('show');
                    setTimeout(() => {
                        popup.classList.remove('show');
                    }, 3500);
                }
            } else {
                alert('No matching content found.');
            }
        }
    }

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            performSearch();
        });

        searchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch();
            }
        });
    }

   
    const missionVideos = document.querySelectorAll('.mission-item video');

    missionVideos.forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.play();
        });

        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
                entry.target.currentTime = 0;
            }
        });
    }

    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

    missionVideos.forEach(video => {
        observer.observe(video);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const scrollToTopButton = document.getElementById("scroll-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollToTopButton.style.display = "block";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

   
});

document.addEventListener("DOMContentLoaded", function() {
    const submissionLinks = document.querySelectorAll('.submission-link');

    submissionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.href;
            window.open(url, '_blank');
            localStorage.setItem('scrollPosition', window.scrollY);
        });
    });

    const savedPosition = localStorage.getItem('scrollPosition');
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        localStorage.removeItem('scrollPosition');
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const videoLinks = document.querySelectorAll('.video-submission-link');

    videoLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const popup = document.createElement('div');
            popup.className = 'video-popup';
            popup.textContent = 'Video Submission';
            document.body.appendChild(popup);

            const rect = link.getBoundingClientRect();
            popup.style.left = `${rect.left + window.scrollX}px`;
            popup.style.top = `${rect.top + window.scrollY - popup.offsetHeight - 5}px`;

            link.addEventListener('mouseleave', function() {
                document.body.removeChild(popup);
            });
        });
    });
});



  
