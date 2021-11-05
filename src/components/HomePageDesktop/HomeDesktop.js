import * as React from 'react'
import { Flex, Text } from '@chakra-ui/layout'
import { ChatProvider } from '../../context/ChatContext'
import { useHomeDesktop } from '../../context/HomeDesktopContext'
import { ChatHeader } from '../ChatHeader'
import { HomeHeader } from '../HomePage/HomeHeader'
import { NewChatButton } from '../HomePage/NewChatButton'
import { MessageInput } from '../MessageInput'
import { MessageList } from '../MessageList'
import { ChatListDesktop } from './ChatListDesktop'

export const HomeDesktop = () => {
	const { selectedChat: selectedChatId } = useHomeDesktop()
	return (
		<Flex w='full' h='full' overflowY='auto'>
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
				<Flex alignItems='center' justifyContent='center' flexGrow='1'>
					<Text>No Chat Selected</Text>
				</Flex>
			)}
		</Flex>
	)
}
