// Project data
const projects = [
    {
        id: 1,
        title: 'Music Web App',
        description: 'A full-featured online shopping platform with cart and payment integration.',
        category: 'web',
        tags: ['React', 'Node.js', 'MongoDB'],
        overview: 'A comprehensive music streaming platform built with modern web technologies.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com'
    },
    {
        id: 2,
        title: 'Social Media Analytics Tool',
        description: 'Mobile application for tracking workouts and maintaining fitness goals.',
        category: 'web',
        tags: ['React', 'Python', 'Data Analysis'],
        overview: 'Advanced analytics dashboard for social media performance tracking.',
        techStack: ['React', 'Python', 'FastAPI', 'PostgreSQL'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com'
    },
    {
        id: 3,
        title: 'Brand Identity Design',
        description: 'Complete brand identity design including logo, guidelines, and assets.',
        category: 'design',
        tags: ['Branding', 'UI/UX', 'Design'],
        overview: 'Comprehensive brand identity system for a tech startup.',
        techStack: ['Figma', 'Adobe CC', 'Sketch'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com'
    }
];

// DOM Elements
const filterButtons = document.querySelectorAll('.filter-btn');
const projectGrid = document.querySelector('.project-grid');
const modal = document.querySelector('.project-modal');
const modalContent = modal.querySelector('.modal-content');
const closeModal = modal.querySelector('.close-modal');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    renderProjects('all');
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            const category = button.getAttribute('data-filter');
            renderProjects(category);
        });
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // Close modal with close button
    closeModal.addEventListener('click', closeProjectModal);

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

// Render projects based on filter
function renderProjects(category) {
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);

    projectGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card" data-category="${project.category}">
            <div class="project-image">
                <img src="images/${project.id}.jpg" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <button class="project-link" data-project-id="${project.id}">
                    View Project
                </button>
            </div>
        </div>
    `).join('');

    // Add click listeners to new project cards
    document.querySelectorAll('.project-link').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = parseInt(button.getAttribute('data-project-id'));
            const project = projects.find(p => p.id === projectId);
            openProjectModal(project);
        });
    });
}

// Open project modal
function openProjectModal(project) {
    modalContent.innerHTML = `
        <span class="close-modal">&times;</span>
        <div class="modal-header">
            <h2>${project.title}</h2>
            <div class="project-tags">
                ${project.tags.map(tag => `
                    <span class="project-tag">${tag}</span>
                `).join('')}
            </div>
        </div>
        <div class="modal-body">
            <div class="info-section">
                <h3>Overview</h3>
                <p>${project.overview}</p>
            </div>
            <div class="info-section">
                <h3>Technologies Used</h3>
                <ul class="tech-stack">
                    ${project.techStack.map(tech => `
                        <li>${tech}</li>
                    `).join('')}
                </ul>
            </div>
            <div class="info-section">
                <h3>Links</h3>
                <div class="project-links">
                    <a id="live-link" href="${project.liveUrl}" target="_blank">Live Demo</a>
                    <a id="github-link" href="${project.githubUrl}" target="_blank">GitHub Repo</a>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Add event listener to new close button
    modalContent.querySelector('.close-modal').addEventListener('click', closeProjectModal);
}

// Close project modal
function closeProjectModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});