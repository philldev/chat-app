import { Box, Text } from '@chakra-ui/layout'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { useChatsData } from '../../hooks/useChatsData'
import { ChatItem } from './ChatItem'

export const ChatList = () => {
	const { chats } = useChatsData()
	return (
		<Box flexGrow='1'>
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
