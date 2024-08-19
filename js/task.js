document.addEventListener("DOMContentLoaded", function() {
    
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }

   
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
                    popup.style.top = `${targetOffset + (rect.height / 2) - (popup.offsetHeight / 2)}px`;
                    popup.style.left = `${window.scrollX + rect.left + (rect.width / 2) - (popup.offsetWidth / 2)}px`;
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
