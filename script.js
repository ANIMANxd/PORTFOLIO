
document.addEventListener('DOMContentLoaded', function() {

    // --- Floating Elements for ALL Sections ---
    const sections = document.querySelectorAll('section'); // Select ALL section elements

    sections.forEach(heroSection => { // Now loop through each section
        if (heroSection) {
            const numElements = 30; // Number of floating elements per section
            for (let i = 0; i < numElements; i++) {
                const el = document.createElement('div');
                el.classList.add('floating-element');
                heroSection.appendChild(el);

                const size = Math.random() * 30 + 20; // Size between 20px and 50px
                const xPos = Math.random() * 100;
                const yPos = Math.random() * 100;
                const animDelay = Math.random() * 5; // Animation delay up to 5s
                const animDuration = Math.random() * 10 + 3; // Animation duration 15s to 25s

                el.style.width = `${size}px`;
                el.style.height = `${size}px`;
                el.style.left = `${xPos}%`;
                el.style.top = `${yPos}%`;
                el.style.animationDelay = `-${animDelay}s`; // Negative delay to start at different points
                el.style.animationDuration = `${animDuration}s`;
            }
        }
    });
    // --- End Floating Elements for Hero Background ---
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

    const projectData = {
        music: {
            title: 'LYDONIX - YouTube-Based Music Player',
            overview: 'LYDONIX is a web application designed to provide users with a seamless music streaming experience by leveraging YouTube as its primary content source. The platform allows users to search for and play music videos directly from YouTube while offering an intuitive and modern interface. In addition to standard playback controls, LYDONIX provides features such as volume management, track progress control, and a login system for a more personalized experience.',
            tech: ['HTML', 'CSS3', 'JavaScript', 'Youtube Data API v3'],
            liveLink: 'https://animanxd.github.io/Lydonix-Music-app/', // Replace with actual link
            githubLink: 'https://github.com/ANIMANxd/Lydonix-Music-app' // Replace with actual link
        },
        socialanalytics: {
            title: 'Social Media Analytics tool',
            overview: `The Social Metrics web application is an AI-powered tool designed to analyze and evaluate social media content. Built using AstraDB for efficient data management and LangFlow for AI-driven insights, the application provides sentiment analysis, trend detection, and content evaluation. It enables users to extract meaningful insights from social media platforms through an intuitive and interactive Streamlit interface.
                        The application leverages natural language processing (NLP) to identify patterns and trends, offering a streamlined way to interpret social media metrics. AstraDB ensures scalable and low-latency data storage, while LangFlow simplifies AI model deployment with low-code integration. Hosted on Streamlit, the web app is accessible and easy to deploy, making it a valuable tool for individuals and businesses looking to understand social media trends effectively.`,
            tech: ['Python', 'Streamlit', 'Langflow', 'AstraDB', 'OpenAI - API', ],
            liveLink: 'https://404brainnotfound-level-super-mind.streamlit.app//', // Replace with actual link
            githubLink: 'https://github.com/ANIMANxd/Social-Matrices' // Replace with actual link
        }

    };

    // Function to open modal and populate data
    function openProjectModal(projectKey) {
        const project = projectData[projectKey];

        if (project) {
            modalTitle.textContent = project.title;
            modalOverview.textContent = project.overview;

            
            modalTech.innerHTML = ''; 
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