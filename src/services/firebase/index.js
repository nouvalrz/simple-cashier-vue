import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
    // your application settings
    apiKey: "AIzaSyAtAjqe-2xD1kFA0PFn8I4wkcnsNdXniVk",
    authDomain: "kasir-niluh.firebaseapp.com",
    projectId: "kasir-niluh",
    storageBucket: "kasir-niluh.appspot.com",
    messagingSenderId: "530164548462",
    appId: "1:530164548462:web:33412878e56a0a0eaf777f",
    measurementId: "G-4SV5N28G4R"
})

// used for the firestore refs
export const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const inovicesRef = collection(db, 'invoices')
