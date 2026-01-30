'use strict';

const switcher = document.getElementById('themeToggle');

switcher.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');

  if (document.body.classList.contains('dark-theme')) {
    switcher.textContent = 'Claro';
  } else {
    switcher.textContent = 'Escuro';
  }
});