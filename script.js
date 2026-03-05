document.addEventListener('DOMContentLoaded', () => {

  const techData = {
    Frontend: [
      { name: 'HTML5', icon: 'file-code-2' },
      { name: 'CSS3', icon: 'palette' },
      { name: 'JavaScript', icon: 'file-json' },
      { name: 'React', icon: 'atom' },
      { name: 'Next.js', icon: 'triangle' },
      { name: 'Tailwind', icon: 'wind' }
    ],
    Languages: [
      { name: 'JavaScript', icon: 'file-json' },
      { name: 'TypeScript', icon: 'file-type-2' },
      { name: 'Python', icon: 'terminal' },
      { name: 'C++', icon: 'file-code' }
    ],
    Backend: [
      { name: 'Node.js', icon: 'server' },
      { name: 'Express', icon: 'database' },
      { name: 'Python', icon: 'terminal' },
      { name: 'REST APIs', icon: 'network' }
    ],
    Database: [
      { name: 'MongoDB', icon: 'database' },
      { name: 'PostgreSQL', icon: 'database' },
      { name: 'MySQL', icon: 'database' }
    ],
    Tools: [
      { name: 'Git', icon: 'git-branch' },
      { name: 'GitHub', icon: 'github' },
      { name: 'VS Code', icon: 'code' },
      { name: 'Docker', icon: 'box' },
      { name: 'Postman', icon: 'send' }
    ]
  };

  const categoriesContainer = document.getElementById('tech-categories');
  const iconsContainer = document.getElementById('tech-icons');

  if (categoriesContainer && iconsContainer) {
    let activeCategory = 'Frontend';

    function renderCategories() {
      categoriesContainer.innerHTML = '';
      Object.keys(techData).forEach(category => {
        const btn = document.createElement('div');
        btn.className = `tech-category-btn brutal-border brutal-shadow ${category === activeCategory ? 'active' : ''}`;
        btn.textContent = category;
        btn.onclick = () => {
          activeCategory = category;
          renderCategories();
          renderIcons();
        };
        categoriesContainer.appendChild(btn);
      });
    }

    function renderIcons() {
      iconsContainer.innerHTML = '';
      const items = techData[activeCategory];
      items.forEach((item, index) => {
        const box = document.createElement('div');
        box.className = 'tech-icon-box brutal-border brutal-shadow';
        box.style.animationDelay = `${index * 0.05}s`;
        
        box.innerHTML = `
          <i data-lucide="${item.icon}"></i>
          <span>${item.name}</span>
        `;
        iconsContainer.appendChild(box);
      });
      
      // Re-initialize lucide icons for newly added elements
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }

    renderCategories();
    renderIcons();
  }
});
