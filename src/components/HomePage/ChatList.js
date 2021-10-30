import * as React from 'react'
import chatsCollection from '../../api/chat'
import { Box, Text } from '@chakra-ui/layout'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ChatItem } from './ChatItem'

const Chats = chatsCollection()

export const ChatList = () => {
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
	return (
		<Box
		flexGrow='1'
		>
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
