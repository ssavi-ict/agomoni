// Entry Point for Agomoni
import './styles/main.css';
import './styles/shell.css';
import './styles/stages.css';
import './styles/intro.css';
import { createGameShell } from './components/GameShell.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  if (app) {
    app.appendChild(createGameShell());
  }
});
