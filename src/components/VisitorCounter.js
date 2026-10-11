// Visitor Counter UI Component
import { visitorCounterService } from '../services/visitorCounterService.js';

export function formatDisplayedVisitorCount(countStr) {
  return countStr.replace(/^0+(?=\d)/, '');
}

export function createVisitorCounter() {
  const container = document.createElement('div');
  container.className = 'visitor-counter';
  container.id = 'visitor-counter';
  container.setAttribute('aria-label', 'দর্শনার্থীর সংখ্যা');

  const label = document.createElement('span');
  label.className = 'visitor-counter-label';
  label.textContent = 'দর্শনার্থী #';

  const count = document.createElement('span');
  count.className = 'visitor-counter-value';
  count.setAttribute('aria-live', 'polite');
  count.textContent = '0';

  container.append(label, count);

  // Keep the displayed total synchronized with changes from every visitor.
  visitorCounterService.subscribeVisitorCount(
    countStr => {
      count.textContent = formatDisplayedVisitorCount(countStr);
    },
    () => {
      count.textContent = '0';
    }
  ).catch(error => {
    console.error('Unable to subscribe to visitor counter updates:', error);
    count.textContent = '0';
  });

  return container;
}
