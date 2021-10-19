import * as React from 'react'
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from '.'

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)

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
		<AuthContext.Provider value={{ user, isLoading }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = React.useContext(AuthContext)
	if (!context) throw new Error('user context not provided!')
	return context
}
