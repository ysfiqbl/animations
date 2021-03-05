function Carousel() {}

Carousel.prototype.states = {
    currentTransitionStart: 0,
    currentTransitionEnd: -100,
    nextTransitionStart: 100,
    nextTransitionEnd: 0,
    previousTransitionStart: -100,
    previousTransitionEnd: 0,
    currentIndexStart: 0,
    previousIndexStart: -1,
    nextIndexStart: 1,
    animate: false,
    animationInitialize: true,
    progress: 0,            
    autoPlay: true,            
}

Carousel.prototype.indices = {
    currentIndex: 0,
    nextIndex: 1,
    previousIndex: -1,
}

Carousel.prototype.time = {
    start: performance.now(),
    total: 2000,
    animationInterval: 600,
    autoPlayInterval: 5000
};

Carousel.prototype.slideLeft = function(now)  {   
    if (Carousel.prototype.states.animationInitialize) {
        Carousel.prototype.states.animate = true;
        this.slides[Carousel.prototype.indices.currentIndex].classList.add('carousel-item-active');
        this.slides[Carousel.prototype.indices.nextIndex].classList.add('carousel-item-next');
        Carousel.prototype.states.animationInitialize = false;
        Carousel.prototype.time.animationStartTime = now;
    }

    if (Carousel.prototype.states.animate) {
        Carousel.prototype.states.progress = (now - Carousel.prototype.time.animationStartTime) / (Carousel.prototype.time.animationInterval);
        const currentSlidePosition = Carousel.prototype.states.progress * Carousel.prototype.states.currentTransitionEnd;
        const nextSlidePosition = (1 - Carousel.prototype.states.progress) * Carousel.prototype.states.nextTransitionStart;

        this.slides[Carousel.prototype.indices.currentIndex].style.transform = `translateX(${currentSlidePosition}%)`;
        this.slides[Carousel.prototype.indices.nextIndex].style.transform = `translateX(${nextSlidePosition}%)`;
    }

    if (Carousel.prototype.states.progress > 1) {
        Carousel.prototype.states.progress = 0;
        Carousel.prototype.time.start = now;
        Carousel.prototype.states.animate = false;

        let currentIndex = Carousel.prototype.indices.currentIndex;
        let nextIndex = Carousel.prototype.indices.nextIndex;
        let previousIndex = Carousel.prototype.indices.previousIndex;

        Carousel.prototype.indices.previousIndex = currentIndex;
        Carousel.prototype.indices.currentIndex = nextIndex;
        Carousel.prototype.indices.nextIndex = (this.slides.length - 1) == nextIndex ? 0 : (nextIndex + 1);

        if (previousIndex != - 1) {
            this.slides[previousIndex].classList.remove('carousel-item-prev');
            this.slides[previousIndex].style.transform = '';
        }

        this.slides[currentIndex].classList.add('carousel-item-prev');
        this.slides[currentIndex].classList.remove('carousel-item-active');

        this.slides[nextIndex].classList.add('carousel-item-active');
        this.slides[nextIndex].classList.remove('carousel-item-next');

        Carousel.prototype.states.animationInitialize = true;
        Carousel.prototype.states.autoPlay = true;
    } else {
        requestAnimationFrame(Carousel.prototype.slideLeft);
    } 
}

Carousel.prototype.slideRight = function(now)  {
    if (Carousel.prototype.states.animationInitialize) {
        Carousel.prototype.states.animate = true;
        this.slides[Carousel.prototype.indices.currentIndex].classList.add('carousel-item-active');
        if (Carousel.prototype.indices.previousIndex == - 1) {
            Carousel.prototype.indices.previousIndex = this.slides.length - 1;
        }

        this.slides[Carousel.prototype.indices.previousIndex].classList.add('carousel-item-prev');
        Carousel.prototype.states.animationInitialize = false;
        Carousel.prototype.time.animationStartTime = now;
    }

    if (Carousel.prototype.states.animate) {              
        Carousel.prototype.states.progress = (now - Carousel.prototype.time.animationStartTime) / Carousel.prototype.time.animationInterval;
        const currentSlidePosition = -1 * Carousel.prototype.states.progress * Carousel.prototype.states.currentTransitionEnd;
        const previousSlidePosition = (1 - Carousel.prototype.states.progress) * Carousel.prototype.states.previousTransitionStart;
        this.slides[Carousel.prototype.indices.currentIndex].style.transform = `translateX(${currentSlidePosition}%)`;
        this.slides[Carousel.prototype.indices.previousIndex].style.transform = `translateX(${previousSlidePosition}%)`;
    }

    if (Carousel.prototype.states.progress > 1) {
        Carousel.prototype.states.progress = 0;                
        Carousel.prototype.time.start = now;
        Carousel.prototype.states.animate = false;

        let currentIndex = Carousel.prototype.indices.currentIndex;
        let nextIndex = Carousel.prototype.indices.nextIndex;
        let previousIndex = Carousel.prototype.indices.previousIndex;
        
        Carousel.prototype.indices.currentIndex = previousIndex;
        Carousel.prototype.indices.nextIndex = currentIndex;
        Carousel.prototype.indices.previousIndex = Carousel.prototype.indices.currentIndex == 0 ? (this.slides.length - 1) : previousIndex - 1;

        this.slides[currentIndex].classList.add('carousel-item-next');
        this.slides[currentIndex].classList.remove('carousel-item-active');

        this.slides[previousIndex].classList.add('carousel-item-active');
        this.slides[previousIndex].classList.remove('carousel-item-prev');

        this.slides[nextIndex].classList.remove('carousel-item-next');
        this.slides[nextIndex].style.transform = '';                

        Carousel.prototype.states.animationInitialize = true;
        Carousel.prototype.states.autoPlay = true;
    } else {
        requestAnimationFrame(Carousel.prototype.slideRight);
    } 
}

Carousel.prototype.tick = function(now) {
    if (!Carousel.prototype.states.autoPlay) return; // Exit if autoplay is false

    Carousel.prototype.time.elapsed = now - Carousel.prototype.time.start;
    const delay = 5000;
    const delta = 2000;

    if (Carousel.prototype.time.elapsed > delay) {
        Carousel.prototype.states.animate = true;
        if (Carousel.prototype.states.animationInitialize) {
            this.slides[Carousel.prototype.indices.currentIndex].classList.add('carousel-item-active');
            this.slides[Carousel.prototype.indices.nextIndex].classList.add('carousel-item-next');
            Carousel.prototype.states.animationInitialize = false;
            Carousel.prototype.time.animationStartTime = now;
        }
    }

    if (Carousel.prototype.states.animate) {               
        Carousel.prototype.states.progress = (now - Carousel.prototype.time.animationStartTime) / Carousel.prototype.time.animationInterval;
        const currentSlidePosition = Math.ceil(Carousel.prototype.states.progress * Carousel.prototype.states.currentTransitionEnd);
        let nextSlidePosition = Math.ceil((1 - Carousel.prototype.states.progress) * Carousel.prototype.states.nextTransitionStart);

        if (nextSlidePosition == -0) nextSlidePosition = 0;

        this.slides[Carousel.prototype.indices.currentIndex].style.transform = `translateX(${currentSlidePosition}%)`;
        this.slides[Carousel.prototype.indices.nextIndex].style.transform = `translateX(${nextSlidePosition}%)`;
    }

    if (Carousel.prototype.states.progress > 1) {
        Carousel.prototype.states.progress = 0;
        Carousel.prototype.time.start = now;
        Carousel.prototype.states.animate = false;

        let currentIndex = Carousel.prototype.indices.currentIndex;
        let nextIndex = Carousel.prototype.indices.nextIndex;
        let previousIndex = Carousel.prototype.indices.previousIndex;

        Carousel.prototype.indices.previousIndex = currentIndex;
        Carousel.prototype.indices.currentIndex = nextIndex;
        Carousel.prototype.indices.nextIndex = (this.slides.length - 1) == nextIndex ? 0 : (nextIndex + 1);

        if (previousIndex != - 1) {
            this.slides[previousIndex].classList.remove('carousel-item-prev');
            this.slides[previousIndex].style.transform = '';
        }

        this.slides[currentIndex].classList.add('carousel-item-prev');
        this.slides[currentIndex].classList.remove('carousel-item-active');

        this.slides[nextIndex].classList.add('carousel-item-active');
        this.slides[nextIndex].classList.remove('carousel-item-next');

        Carousel.prototype.states.animationInitialize = true;
    }

    requestAnimationFrame(Carousel.prototype.tick);
}
