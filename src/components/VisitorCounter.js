// Visitor Counter UI Component
import { visitorCounterService } from '../services/visitorCounterService.js';

export function createVisitorCounter() {
  const container = document.createElement('div');
  container.className = 'visitor-counter';
  container.id = 'visitor-counter';
  container.textContent = 'Visitors: 000000';

  // Keep the displayed total synchronized with changes from every visitor.
  visitorCounterService.subscribeVisitorCount(
    countStr => {
      container.textContent = `Visitors: ${countStr}`;
    },
    () => {
      container.textContent = 'Visitors: 000000';
    }
  ).catch(error => {
    console.error('Unable to subscribe to visitor counter updates:', error);
    container.textContent = 'Visitors: 000000';
  });

  return container;
}
