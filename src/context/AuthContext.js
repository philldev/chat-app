import * as React from 'react'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from '@firebase/auth'
import { doc, getDoc, setDoc } from '@firebase/firestore'
import { auth, db } from '../firebase'

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(true)

	const signup = async ({ email, password, username }) => {
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
				createdAt: new Date().toISOString(),
			}
			await setDoc(doc(db, 'users', newUser.id), newUser)
		} catch (error) {
			throw error
		}
	}
	const signin = async ({ email, password }) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
		} catch (error) {
			throw error
		}
	}

	const signout = async () => {
		await signOut(auth)
		setUser(null)
	}

	React.useEffect(() => {
		setIsLoading(true)
		const unsub = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const docRef = doc(db, 'users', user.uid)
				const docSnap = await getDoc(docRef)
				if (docSnap.exists()) {
					setUser(docSnap.data())
				}
				setIsLoading(false)
			} else {
				setIsLoading(false)
			}
		})
		return () => {
			unsub()
		}
	}, [])

	return (
		<AuthContext.Provider value={{ user, isLoading, signup, signout, signin }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = React.useContext(AuthContext)
	if (!context) throw new Error('user context not provided!')
	return context
}
