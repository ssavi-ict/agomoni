// Credentials are loaded from .env (never committed to git)
const env = import.meta.env ?? {};
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.VITE_FIREBASE_DATABASE_URL,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
};

function hasValidDatabaseUrl(value) {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      (url.hostname.endsWith('.firebaseio.com') || url.hostname.endsWith('.firebasedatabase.app'));
  } catch {
    return false;
  }
}

let firebaseServicesPromise;

function getFirebaseServices() {
  if (!firebaseServicesPromise) {
    firebaseServicesPromise = Promise.all([
      import(/* @vite-ignore */ 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'),
      import(/* @vite-ignore */ 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js'),
    ]).then(([appModule, databaseModule]) => {
      const app = appModule.initializeApp(firebaseConfig);
      const database = databaseModule.getDatabase(app);
      return { database, ...databaseModule };
    });
  }

  return firebaseServicesPromise;
}

export class VisitorCounterService {
  async getVisitorCount() {
    throw new Error('getVisitorCount() must be implemented by concrete provider');
  }
}

export class FirebaseVisitorCounterService extends VisitorCounterService {
  constructor(gameId = 'agomoni26') {
    super();
    this.gameId = gameId;
  }

  async getVisitorCount() {
    if (!firebaseConfig.databaseURL) {
      console.error('Firebase visitor counter is disabled: configure VITE_FIREBASE_DATABASE_URL in the deployment environment.');
      return '000000';
    }

    if (!hasValidDatabaseUrl(firebaseConfig.databaseURL)) {
      console.error('Firebase visitor counter is disabled: VITE_FIREBASE_DATABASE_URL must be a valid Firebase Realtime Database URL.');
      return '000000';
    }

    try {
      const { database, ref, runTransaction } = await getFirebaseServices();
      const counterRef = ref(database, `games/${this.gameId}/visitor_count`);
      const result = await runTransaction(counterRef, (currentCount) =>
        typeof currentCount === 'number' && Number.isFinite(currentCount) ? currentCount + 1 : 1
      );

      if (!result.committed) {
        throw new Error('Firebase visitor counter transaction was not committed.');
      }

      return String(result.snapshot.val()).padStart(6, '0');
    } catch (error) {
      console.error('Firebase visitor counter error:', error);
      return '000000';
    }
  }
}

// Export instance pointing directly to agomoni26
export const visitorCounterService = new FirebaseVisitorCounterService('agomoni26');