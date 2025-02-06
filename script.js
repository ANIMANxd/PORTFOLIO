document.addEventListener('DOMContentLoaded', function() {

    // Navigation Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Scroll Animation for Elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Dynamic copyright year (Moved to top to ensure it runs)
    document.querySelector('footer .copyright').textContent = `\u00A9 ${new Date().getFullYear()} Aniruddha Bhide. All rights reserved.`;

    // Theme Toggle Functionality (Moved to top for readability)
    const themeCheckbox = document.getElementById('theme-checkbox');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }

    if (themeCheckbox) {
        const storedTheme = localStorage.getItem('theme') || 'light';
        setTheme(storedTheme);
        themeCheckbox.checked = storedTheme === 'dark';
        themeCheckbox.addEventListener('change', toggleTheme);
    }

    // --- Project Filtering & Modal Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.querySelector('.project-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    const modalTitle = document.getElementById('modal-title');
    const modalOverview = document.getElementById('modal-overview');
    const modalTech = document.getElementById('modal-tech');
    const liveLink = document.getElementById('live-link');
    const githubLink = document.getElementById('github-link');

    const projectData = { // Store project details.  *Important:  Matching the data-project attribute in HTML.*
        music: {
            title: 'Music Web App',
            overview: 'A dynamic music streaming app with playlists, user accounts, and artist profiles.',
            tech: ['React', 'Node.js', 'Express', 'MongoDB'],
            liveLink: 'https://example.com/music-app', // Replace with actual link
            githubLink: 'https://github.com/yourusername/music-app' // Replace with actual link
        },
        fitness: {
            title: 'Social Media Analytics tool',
            overview: 'A fitness tracker providing workout logging, goal setting, and progress visualization.',
            tech: ['Flutter', 'Firebase', 'Dart'],
            liveLink: 'https://example.com/fitness-app', // Replace with actual link
            githubLink: 'https://github.com/yourusername/fitness-app' // Replace with actual link
        }

    };

    // Function to open modal and populate data
    function openProjectModal(projectKey) {
        const project = projectData[projectKey];

        if (project) {
            modalTitle.textContent = project.title;
            modalOverview.textContent = project.overview;

            // Clear existing tech list and populate with new tech
            modalTech.innerHTML = ''; // Clear previous list items
            project.tech.forEach(tech => {
                const li = document.createElement('li');
                li.textContent = tech;
                modalTech.appendChild(li);
            });

            liveLink.href = project.liveLink;
            githubLink.href = project.githubLink;
            projectModal.classList.add('active');
        } else {
            console.warn(`Project data not found for key: ${projectKey}`);
        }
    }

    // Event Listeners

    // Project Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active state on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter project cards
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block'; // Or remove 'none' if previously hidden
                    observer.observe(card); // Re-observe for animations
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Open Project Modal
    projectCards.forEach(card => {
        const viewButton = card.querySelector('.project-link');
        viewButton.addEventListener('click', function() {
            const projectKey = this.dataset.project;
            openProjectModal(projectKey);
        });
    });


    // Close Project Modal
    closeModalBtn.addEventListener('click', () => {
        projectModal.classList.remove('active');
    });

    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove('active');
        }
    });

    // --- End Project Filtering & Modal Logic ---

    // Add scroll-triggered animations for project cards
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Add hover effect for nav links
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.transform = 'translateY(-2px)';
        });

        link.addEventListener('mouseout', () => {
            link.style.transform = 'translateY(0)';
        });
    });

});