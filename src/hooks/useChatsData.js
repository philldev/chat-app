import * as React from 'react'
import chatsCollection from '../api/chat'
import { useAuth } from '../context/AuthContext'

const Chats = chatsCollection()

export const useChatsData = () => {
	const { user } = useAuth()
	const [chats, setChats] = React.useState([])
	React.useEffect(() => {
		let mounted = true
		const getChats = async () => {
			try {
				const chatsFromDoc = await Chats.getUsersChats({ user })
				if (mounted) setChats(chatsFromDoc)
			} catch (error) {
				console.log(error.code)
			}
		}
		getChats()
		return () => {
			mounted = false
		}
	}, [user])

	return { chats }
}
