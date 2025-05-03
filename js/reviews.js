document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('reviewsWrapper');
    const slides = document.querySelectorAll('.review-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');

    let currentIndex = 0;
    let slidesToShow = getSlidesToShow();
    let totalSlides = slides.length;
    let visibleIndex = 0; // Track which slide is most visible

    // Create dots - one for each review
    function createDots() {
        dotsContainer.innerHTML = '';

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot', 'w-3', 'h-3', 'rounded-full', 'mx-1', 'focus:outline');
            if (i === visibleIndex) {
                dot.classList.add('bg-blue-600', 'active');
            } else {
                dot.classList.add('bg-gray-300');
            }
            dot.setAttribute('aria-label', `Go to review ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function getSlidesToShow() {
        if (window.innerWidth >= 1024) {
            return 3; // Large screens
        } else if (window.innerWidth >= 768) {
            return 2; // Medium screens
        } else {
            return 1; // Small screens
        }
    }

    function calculateVisibleIndex() {
        // Calculate which slide is most visible based on current position
        return Math.round(currentIndex * slidesToShow) % totalSlides;
    }

    function updateCarousel() {
        const slideWidth = 100 / slidesToShow;
        slides.forEach(slide => {
            slide.style.width = `${slideWidth}`;
        });

        // Calculate the translation value
        let translationValue;
        if (currentIndex >= Math.floor(totalSlides / slidesToShow)) {
            // We're at the end, show that last set of slides
            translationValue = -(Math.floor(totalSlides / slidesToShow) * 100);
        } else {
            translationValue = -currentIndex * 100;
        }

        carousel.style.transform = `translateX(${translationValue}%)`;

        // Update which slide is considered most visible
        visibleIndex = calculateVisibleIndex();

        // Update dots
        const dots = dotsContainer.querySelectorAll('.dot');

        dots.forEach((dot, index) => {
            if (index === visibleIndex) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-blue-600', 'active');
            } else {
                dot.classList.remove('bg-blue-600', 'active');
                dot.classList.add('bg-gray-300');
            }
        });
    }

    function goToSlide(index) {
        // Convert the slide index to the appropriate carousel position
        currentIndex = index / slidesToShow;
        visibleIndex = index;
        updateCarousel();

        // Add smooth transition effect
        carousel.style.transition  = 'transform 0.3s ease-in-out';
        setTimeout(() => {
            carousel.style.transition = '';
        }, 300);
    }

    function nextSlide() {
        visibleIndex = (visibleIndex + 1) % totalSlides;
        currentIndex = visibleIndex / slidesToShow;
        updateCarousel();

        // Add smooth transition effect
        carousel.style.transition  = 'transform 0.3s ease-in-out';
        setTimeout(() => {
            carousel.style.transition = '';
        }, 300);
    }

    function prevSlide() {
        visibleIndex = (visibleIndex - 1 + totalSlides) % totalSlides;
        currentIndex = visibleIndex / slidesToShow;
        updateCarousel();

        // Add smooth transition effect
        carousel.style.transition  = 'transform 0.3s ease-in-out';
        setTimeout(() => {
            carousel.style.transition = '';
        }, 300);
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        console.log('nextSlide')
        nextSlide();
    });
    prevBtn.addEventListener('click', prevSlide);

    // Handle window resize
    window.addEventListener('resize', () => {
        const nextSlidesToShow = getSlidesToShow();
        if (nextSlidesToShow !== slidesToShow) {
            slidesToShow = nextSlidesToShow;
            // Adjust current index to keep the same visible slide
            currentIndex = visibleIndex / slidesToShow;
            updateCarousel();
        }
    });

    // Initialize
    createDots();
    updateCarousel();

    // Auto-advance the carousel
    const autoAdvanceInterval = 3000; // 3 seconds
    let autoAdvanceTimer = setInterval(nextSlide, autoAdvanceInterval);

    // Pause auto-advance when user interacts with carousel
    const carouselContainer = document.getElementById('reviewCarousel');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoAdvanceTimer);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoAdvanceTimer = setInterval(nextSlide, autoAdvanceInterval);
    });

    // Also pause on touch devices
    carouselContainer.addEventListener('touchstart', () => {
        clearInterval(autoAdvanceTimer);
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
        autoAdvanceTimer = setInterval(nextSlide, autoAdvanceInterval);
    }, { passive: true });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            console.log('L pressed')
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            console.log('R pressed')
            nextSlide();
        }
    });
});