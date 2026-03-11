document.addEventListener('DOMContentLoaded', () => {

  const techData = {
    Frontend: [
      { name: 'HTML5', icon: 'file-code-2' },
      { name: 'CSS3', icon: 'palette' },
      { name: 'JavaScript', icon: 'file-json' },
      { name: 'React', icon: 'atom' },
      { name: 'Next.js', icon: 'triangle' },
      { name: 'Tailwind', icon: 'wind' },
      { name: 'Material UI', icon: 'layout' }
    ],
    Languages: [
      { name: 'Python', icon: 'terminal' },
      { name: 'JavaScript', icon: 'file-json' },
      { name: 'TypeScript', icon: 'file-type-2' },
      { name: 'HTML', icon: 'file-code-2' },
      { name: 'CSS', icon: 'palette' },
      { name: 'C', icon: 'file-code' }
    ],
    Backend: [
      { name: 'Django', icon: 'server' },
      { name: 'Node.js', icon: 'server' },
      { name: 'Firebase', icon: 'flame' },
      { name: 'Supabase', icon: 'database' },
      { name: 'Clerk', icon: 'lock' },
      { name: 'Auth0', icon: 'shield' }
    ],
    Database: [
      { name: 'MySQL', icon: 'database' },
      { name: 'MongoDB', icon: 'database' },
      { name: 'Firebase', icon: 'flame' },
      { name: 'Supabase', icon: 'database' }
    ],
    AI: [
      { name: 'Google Gemini', icon: 'sparkles' },
      { name: 'LLaMA3', icon: 'brain' },
      { name: 'GROQ', icon: 'zap' },
      { name: 'OpenCV', icon: 'camera' },
      { name: 'Kaboom.js', icon: 'gamepad-2' }
    ],
    Tools: [
      { name: 'Git', icon: 'git-branch' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Vercel', icon: 'triangle' },
      { name: 'VS Code', icon: 'code' },
      { name: 'Canva', icon: 'image' },
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
