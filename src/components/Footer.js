// Footer Component
import { createVisitorCounter } from './VisitorCounter.js';

export function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'theatre-footer';

  const leftText = document.createElement('div');
  leftText.className = 'footer-credit';
  leftText.innerHTML = `<span class="footer-credit-line"><span class="footer-credit-title">Agomoni</span><span class="footer-credit-byline">by</span><a href="https://www.facebook.com/ssavi.cou" target="_blank" rel="noopener noreferrer">Avik Sarkar</a></span>`;

  const rightCounter = createVisitorCounter();

  footer.appendChild(leftText);
  footer.appendChild(rightCounter);

  return footer;
}
