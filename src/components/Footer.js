// Footer Component
import { createVisitorCounter } from './VisitorCounter.js';

export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'theatre-footer';

  const leftText = document.createElement('div');
  leftText.className = 'footer-credit';
  leftText.innerHTML = `<span>Agomoni - by Avik Sarkar</span>`;

  const rightCounter = createVisitorCounter();

  footer.appendChild(leftText);
  footer.appendChild(rightCounter);

  return footer;
}
