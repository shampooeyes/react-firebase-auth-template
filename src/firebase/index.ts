import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FirebaseConfig } from "../../config";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
export const MainFirebaseApp = initializeApp(FirebaseConfig);

// const appCheck = initializeAppCheck(MainFirebaseApp, {
//     provider: new ReCaptchaV3Provider('6LfnQEkqAAAAAIUbTuPQMtPY8KGYE7phceFzJDxN'),
  
//     // Optional argument. If true, the SDK automatically refreshes App Check
//     // tokens as needed.
//     isTokenAutoRefreshEnabled: true
//   });

export const FirebaseAuth = getAuth(MainFirebaseApp);

export const FirebaseFirestore = getFirestore(MainFirebaseApp);

export const FirebaseAnalytics = getAnalytics(MainFirebaseApp);

