import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get, runTransaction } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkFXJ-2nankK4Bib1doqaFcHmweZnNaqk",
  authDomain: "cracktech-ext.firebaseapp.com",
  databaseURL: "https://cracktech-ext-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cracktech-ext",
  storageBucket: "cracktech-ext.firebasestorage.app",
  messagingSenderId: "259670715226",
  appId: "1:259670715226:web:bd19df5311b8eb61f12163",
  measurementId: "G-ZS662YT2YD"
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