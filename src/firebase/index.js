// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDkP68mIgZuguI_MFLrk8UaQb5HHcgPdAI',
	authDomain: 'chat-app-d1018.firebaseapp.com',
	projectId: 'chat-app-d1018',
	storageBucket: 'chat-app-d1018.appspot.com',
	messagingSenderId: '878602494993',
	appId: '1:878602494993:web:f5e6f70fbdb3ffa5183db0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
