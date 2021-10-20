import {
	createUserWithEmailAndPassword,
	onAuthStateChanged
} from '@firebase/auth'
import { doc, setDoc } from '@firebase/firestore'
import * as React from 'react'
import { auth, db } from '.'

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)

	const signup = async ({ email, password, username }) => {
		try {
			const userCred = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const newUser = {
				id: userCred.user.uid,
			}
			await setDoc(doc(db, 'users', newUser.id), newUser)
		} catch (error) {
			throw error
		}
	}
	const signin = async () => {}
	const signout = async () => {}

	React.useEffect(() => {
		setIsLoading(true)
		const unsub = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user)
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
		<AuthContext.Provider value={{ user, isLoading, signup }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = React.useContext(AuthContext)
	if (!context) throw new Error('user context not provided!')
	return context
}
