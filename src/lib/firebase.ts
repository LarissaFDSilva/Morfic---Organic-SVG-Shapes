import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getRemoteConfig } from 'firebase/remote-config';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const remoteConfig = typeof window !== 'undefined' ? getRemoteConfig(app) : null;

if (remoteConfig) {
  remoteConfig.settings.minimumFetchIntervalMillis = 3600000; // 1 hour
  remoteConfig.defaultConfig = {
    welcome_message: "Bem-vindo ao Morfic!",
    primary_color: "#3B82F6"
  };
}
