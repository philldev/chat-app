import {
	createUserWithEmailAndPassword,
	onAuthStateChanged as fbAuthChanged,
	signInWithEmailAndPassword,
	signOut as fbSignOut
} from '@firebase/auth'
import { Timestamp } from '@firebase/firestore'
import { auth } from '../firebase'
import usersCollection from './user'

const Users = usersCollection()

export default function getAuth() {
	const onAuthStateChanged = (callback) => {
		return fbAuthChanged(auth, callback)
	}
	const signUp = async ({ email, password, username }) => {
		try {
			const userCred = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const newUser = {
				id: userCred.user.uid,
				username,
				email,
				createdAt: Timestamp.now(),
			}
			await Users.createUser(newUser)
		} catch (error) {
			throw error
		}
	}
	const signIn = async ({ email, password }) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
		} catch (error) {
			throw error
		}
	}
	const signOut = async () => {
		try {
			await fbSignOut(auth)
		} catch (error) {
			throw error
		}
	}

	return {
		onAuthStateChanged,
		signIn,
		signOut,
		signUp,
	}
}
