import { Box, Text } from '@chakra-ui/layout'
import * as React from 'react'
import { useHomeDesktop } from '../../context/HomeDesktopContext'
import { useChatsData } from '../../hooks/useChatsData'
import { ChatItem } from '../HomePage/ChatItem'

export const ChatListDesktop = () => {
	const { chats } = useChatsData()
	const { selectChat, selectedChat } = useHomeDesktop()
	return (
		<Box flexGrow='1'>
			<Text p='4'>Welcome to Chat Rooms!</Text>
			{chats.map((chat, index) => (
				<Box
					as='button'
					w='full'
					textAlign='left'
					key={index}
					onClick={() => selectChat(chat.id)}
				>
					<ChatItem
						selected={selectedChat === chat.id}
						chatId={chat.id}
						chatName={chat.name.toUpperCase()}
						chatAvatarURL={`https://avatars.dicebear.com/api/identicon/${chat.name}.svg`}
						usersLastSeen={chat.usersLastSeen}
						usersLength={chat.usersId.length}
					/>
				</Box>
			))}
		</Box>
	)
}
