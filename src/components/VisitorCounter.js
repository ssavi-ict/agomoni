// Visitor Counter UI Component
import { visitorCounterService } from '../services/visitorCounterService.js';

export function createVisitorCounter() {
  const container = document.createElement('div');
  container.className = 'visitor-counter';
  container.id = 'visitor-counter';
  container.textContent = 'Visitors: 000000';

  // Load count asynchronously through the abstracted service
  visitorCounterService.getVisitorCount()
    .then(countStr => {
      container.textContent = `Visitors: ${countStr}`;
    })
    .catch(() => {
      container.textContent = 'Visitors: 000000';
    });

  return container;
}
