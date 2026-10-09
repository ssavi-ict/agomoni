import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get, runTransaction } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Credentials are loaded from .env (never committed to git)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export class VisitorCounterService {
  async getVisitorCount() {
    throw new Error('getVisitorCount() must be implemented by concrete provider');
  }
}

export class FirebaseVisitorCounterService extends VisitorCounterService {
  constructor(gameId = 'agomoni26') {
    super();
    // Dynamically targets games/agomoni26/visitor_count
    this.counterRef = ref(db, `games/${gameId}/visitor_count`);
    this.sessionKey = `visited_${gameId}`;
  }

  async getVisitorCount() {
    try {
      const hasVisited = sessionStorage.getItem(this.sessionKey);

      if (!hasVisited) {
        const transactionResult = await runTransaction(this.counterRef, (currentCount) => {
          return (currentCount || 0) + 1;
        });

        sessionStorage.setItem(this.sessionKey, 'true');
        const count = transactionResult.snapshot.val();
        return String(count).padStart(6, '0');
      } else {
        const snapshot = await get(this.counterRef);
        const count = snapshot.exists() ? snapshot.val() : 0;
        return String(count).padStart(6, '0');
      }
    } catch (error) {
      console.error('Firebase visitor counter error:', error);
      return '000000';
    }
  }
}

// Export instance pointing directly to agomoni26
export const visitorCounterService = new FirebaseVisitorCounterService('agomoni26');