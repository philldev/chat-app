import { Box, Text } from '@chakra-ui/layout'
import { collection, getDocs, query, where } from '@firebase/firestore'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../firebase'
import { ChatItem } from './ChatItem'

export const ChatList = () => {
	const { user } = useAuth()
	const [chats, setChats] = React.useState([])
	React.useEffect(() => {
		let mounted = true
		const getChats = async () => {
			const q = query(
				collection(db, 'chats'),
				where('usersId', 'array-contains', user.id)
			)
			const querySnap = await getDocs(q)
			let chatsFromDoc = []
			querySnap.forEach((d) => {
				chatsFromDoc = [...chatsFromDoc, d.data()]
			})
			if (mounted) setChats(chatsFromDoc)
		}
		getChats()
		return () => {
			mounted = false
		}
	}, [user.id])
	return (
		<Box>
			<Text p='4'>Welcome to Chat Rooms!</Text>
			{chats.map((chat, index) => (
				<Link key={index} to={`/chat/${chat.id}`}>
					<ChatItem
						chatId={chat.id}
						chatName={chat.name.toUpperCase()}
						chatAvatarURL={`https://avatars.dicebear.com/api/identicon/${chat.name}.svg`}
						usersLastSeen={chat.usersLastSeen}
						usersLength={chat.usersId.length}
					/>
				</Link>
			))}
		</Box>
	)
}