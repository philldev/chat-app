import * as React from 'react'
import getAuth from '../api/auth'
import usersCollection from '../api/user'

const AuthContext = React.createContext()
const Auth = getAuth()
const Users = usersCollection()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(true)

	const signup = async ({ email, password, username }) => {
		try {
			Auth.signUp({ email, password, username })
		} catch (error) {
			throw error
		}
	}
	const signin = async ({ email, password }) => {
		try {
			await Auth.signIn({ email, password })
		} catch (error) {
			throw error
		}
	}

	const signout = async () => {
		await Auth.signOut()
		setUser(null)
	}

	React.useEffect(() => {
		setIsLoading(true)
		const unsub = Auth.onAuthStateChanged(async (user) => {
			if (user) {
				const userData = await Users.getUser(user.uid)
				if (userData) {
					setUser(userData)
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
