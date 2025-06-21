document.addEventListener('DOMContentLoaded', () => {
    const settingsToggleBtn = document.getElementById('settings-toggle-btn');
    const settingsPanel = document.getElementById('settings-panel');
    const themeBtn = document.getElementById('theme-btn');
    const fontIncreaseBtn = document.getElementById('font-increase-btn');
    const fontDecreaseBtn = document.getElementById('font-decrease-btn');
    const progressBar = document.getElementById('progress-bar');
    const themeIcon = document.getElementById('theme-icon');
    const navLinks = document.querySelectorAll('.nav-link'); // Keep for keyboard nav

    const sunIcon = `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:currentColor;"><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7z M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3 S10.35,9,12,9z M2,12c0,0.55,0.45,1,1,1h1c0.55,0,1-0.45,1-1s-0.45-1-1-1H3C2.45,11,2,11.45,2,12z M19,11h-1c-0.55,0-1,0.45-1,1 s0.45,1,1,1h1c0.55,0,1-0.45,1-1S19.55,11,19,11z M11,19v1c0,0.55,0.45,1,1,1s1-0.45,1-1v-1c0-0.55-0.45-1-1-1S11,18.45,11,19z M11,2v1c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M5.99,4.58c-0.39-0.39-1.02-0.39-1.41,0 c-0.39,0.39-0.39,1.02,0,1.41l0.71,0.71c0.39,0.39,1.02,0.39,1.41,0s0.39-1.02,0-1.41L5.99,4.58z M16.89,16.18 c-0.39-0.39-1.02-0.39-1.41,0c-0.39,0.39-0.39,1.02,0,1.41l0.71,0.71c0.39,0.39,1.02,0.39,1.41,0c0.39-0.39,0.39-1.02,0-1.41 L16.89,16.18z M18.3,5.99c0.39-0.39,0.39-1.02,0-1.41c-0.39-0.39-1.02-0.39-1.41,0l-0.71,0.71c-0.39,0.39-0.39,1.02,0,1.41 s1.02,0.39,1.41,0L18.3,5.99z M6.7,18.3c-0.39,0.39-0.39,1.02,0,1.41c0.39,0.39,1.02,0.39,1.41,0l0.71-0.71 c0.39-0.39,0.39-1.02,0-1.41s-1.02-0.39-1.41,0L6.7,18.3z"/></svg>`;
    const moonIcon = `<svg viewBox="0 0 24 24" style="width:14px; height:14px; fill:currentColor;"><path d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9S16.97,3,12,3z M12,19c-3.86,0-7-3.14-7-7s3.14-7,7-7s7,3.14,7,7 S15.86,19,12,19z M12,5v14c-3.86,0-7-3.14-7-7S8.14,5,12,5z"/></svg>`;

    let currentFontSize = 16;
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        themeIcon.innerHTML = theme === 'dark' ? moonIcon : sunIcon;
        localStorage.setItem('theme', theme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }
    
    function applyFontSize(size) {
        document.documentElement.style.setProperty('--font-size-base', `${size}px`);
        currentFontSize = size;
        localStorage.setItem('fontSize', size);
    }

    function updateProgressBar() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollHeight <= clientHeight) {
            progressBar.style.width = '0%';
            return;
        }
        const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    }

    function handleKeyboardNav(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const activeLink = document.querySelector('.nav-link.active');
        const linksArray = Array.from(navLinks);
        let currentIndex = linksArray.findIndex(link => link === activeLink);
        
        // If no link is active, keyboard nav can start from the first one.
        if (currentIndex === -1 && (e.key === 'j' || e.key === 'ArrowDown')) {
            linksArray[0].click();
            return;
        }
        if (currentIndex === -1) return;


        if (e.key === 'k' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + linksArray.length) % linksArray.length;
            linksArray[prevIndex].click();
        } else if (e.key === 'j' || e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % linksArray.length;
            linksArray[nextIndex].click();
        }
    }
    
    // Initializations
    settingsToggleBtn.addEventListener('click', () => settingsPanel.classList.toggle('visible'));
    document.addEventListener('click', (e) => {
        if (!settingsPanel.contains(e.target) && !settingsToggleBtn.contains(e.target)) {
            settingsPanel.classList.remove('visible');
        }
    });

    themeBtn.addEventListener('click', toggleTheme);
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    const savedFontSize = parseFloat(localStorage.getItem('fontSize'));
    if (savedFontSize) {
        applyFontSize(savedFontSize);
    }
    fontIncreaseBtn.addEventListener('click', () => applyFontSize(Math.min(currentFontSize + 1, 22)));
    fontDecreaseBtn.addEventListener('click', () => applyFontSize(Math.max(currentFontSize - 1, 14)));

    window.addEventListener('scroll', updateProgressBar);
    document.addEventListener('keydown', handleKeyboardNav);

    // Initial call to set progress bar correctly on page load
    updateProgressBar();
}); 