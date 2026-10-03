// Visitor Counter Service Abstraction

export class VisitorCounterService {
  /**
   * Retrieves the current visitor count formatted as a zero-padded string.
   * @returns {Promise<string>}
   */
  async getVisitorCount() {
    throw new Error('getVisitorCount() must be implemented by concrete provider');
  }
}

/**
 * Placeholder implementation of VisitorCounterService.
 * Does not make external network requests and does not use Firebase credentials.
 * Future Firebase / cloud function implementation can replace this seamlessly.
 */
export class PlaceholderVisitorCounterService extends VisitorCounterService {
  constructor(initialCount = 108) {
    super();
    this.initialCount = initialCount;
  }

  async getVisitorCount() {
    // Standard 6-digit zero padded format: "000000"
    // Using a subtle local offset for a warm, alive feeling without fake network calls
    try {
      let count = this.initialCount;
      const stored = localStorage.getItem('agomoni-visitor-placeholder');
      if (stored) {
        count = parseInt(stored, 10);
      } else {
        localStorage.setItem('agomoni-visitor-placeholder', count.toString());
      }
      return String(count).padStart(6, '0');
    } catch (e) {
      return String(this.initialCount).padStart(6, '0');
    }
  }
}

// Default export instance used by UI components
export const visitorCounterService = new PlaceholderVisitorCounterService(1284);
