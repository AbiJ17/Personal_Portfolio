const workList = document.querySelector('.work-list');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorContainer = document.querySelector('.indicator-container');

let index = 0;
const totalProjects = document.querySelectorAll('.work').length;
let autoSlideInterval;

// Create indicators dynamically
for (let i = 0; i < totalProjects; i++) {
    const dot = document.createElement('div');
    dot.classList.add('indicator');
    if (i === 0) dot.classList.add('active'); // Make first one active initially
    dot.addEventListener('click', () => goToSlide(i));
    indicatorContainer.appendChild(dot);
}

const indicators = document.querySelectorAll('.indicator');

function updateSlide() {
    workList.style.transform = `translateX(-${index * 100}%)`;

    // Ensure the indicators update correctly
    indicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Function to restart auto-slide timer
function restartAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        index = (index + 1) % totalProjects;
        updateSlide();
    }, 5000);
}

// Function to go to a specific slide (when clicking an indicator)
function goToSlide(slideIndex) {
    index = slideIndex;
    updateSlide();
    restartAutoSlide();
}

// Event listeners for next/prev buttons
nextBtn.addEventListener('click', () => {
    index = (index + 1) % totalProjects;
    updateSlide();
    restartAutoSlide();
});

prevBtn.addEventListener('click', () => {
    index = (index - 1 + totalProjects) % totalProjects;
    updateSlide();
    restartAutoSlide();
});

// Start auto-slide initially
restartAutoSlide();

