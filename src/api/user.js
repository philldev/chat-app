import { doc, getDoc, setDoc } from '@firebase/firestore'
import { db } from '../firebase'

const USERS_COLLECTION = 'users'

export default function usersCollection() {
	
	const getUser = async (userId) => {
		const docRef = doc(db, USERS_COLLECTION, userId)
		try {
			const docSnap = await getDoc(docRef)
			if (docSnap.exists()) {
				return docSnap.data()
			} else {
				return null
			}
		} catch (error) {
			throw error
		}
	}

	const createUser = async (user) => {
		try {
			await setDoc(doc(db, USERS_COLLECTION, user.id), user)
		} catch (error) {
			throw error
		}
	}

	return {
		getUser,
		createUser,
	}
}
