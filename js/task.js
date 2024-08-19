document.addEventListener("DOMContentLoaded", function() {
    
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('nav ul li > a');

    hamburgerMenu.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });

   
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
});
document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const popup = document.getElementById('popup');

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();

        if (query) {
            const targetElement = document.querySelector(`[id="${query}"]`);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetElement.classList.add('highlight');

                searchInput.value = '';  
                searchButton.style.backgroundColor = 'rgb(255, 94, 94)'; 

                setTimeout(() => {
                    searchButton.style.backgroundColor = 'rgb(94, 174, 199)'; 
                }, 300);

                
                popup.classList.add('show');
                setTimeout(() => {
                    popup.classList.remove('show');
                }, 2000); 
            } else {
                alert('No matching content found.');
            }
        }
    }

    searchButton.addEventListener('click', function() {
        performSearch();
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            performSearch();
        }
    });
});
// Autoplay on hover (desktop)
const missionItems = document.querySelectorAll('.mission-item video');

missionItems.forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });

    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // Rewind the video
    });
});

// Autoplay on scroll into view (mobile)
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.play();
        } else {
            entry.target.pause();
            entry.target.currentTime = 0; // Rewind the video
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

missionItems.forEach(video => {
    observer.observe(video);
});






