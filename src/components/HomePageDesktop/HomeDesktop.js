import { Box, Flex } from '@chakra-ui/layout'
import * as React from 'react'
import { ChatProvider } from '../../context/ChatContext'
import { useHomeDesktop } from '../../context/HomeDesktopContext'
import { ChatHeader } from '../ChatPage/ChatHeader'
import { MessageInput } from '../ChatPage/MessageInput'
import { MessageList } from '../ChatPage/MessageList'
import { HomeHeader } from '../HomePage/HomeHeader'
import { NewChatButton } from '../HomePage/NewChatButton'
import { ChatListDesktop } from './ChatListDesktop'

export const HomeDesktop = () => {
	const { selectedChat: selectedChatId } = useHomeDesktop()
	return (
		<Flex w='full' h='full'>
			<Flex
				flexDir='column'
				borderRightColor='slate.500'
				borderRightWidth='1px'
				borderRightStyle='solid'
				minW='35%'
				maxW='35%'
				h='full'
				justifySelf='flex-start'
			>
				<HomeHeader />
				<ChatListDesktop />
				<NewChatButton />
			</Flex>
			{selectedChatId ? (
				<Flex w='full' h='full' flexDir='column' overflowY='auto'>
					<ChatProvider chatId={selectedChatId}>
						<ChatHeader />
						<MessageList />
						<MessageInput />
					</ChatProvider>
				</Flex>
			) : (
				<Box>b</Box>
			)}
		</Flex>
	)
}
