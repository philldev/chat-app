import * as React from 'react'
import { Flex } from '@chakra-ui/layout'
import { ChatPageProvider } from '../../context/ChatPageContext'
import { ChatHeader } from '../../components/ChatPage/ChatHeader'
import { MessageList } from '../../components/ChatPage/MessageList'
import { MessageInput } from '../../components/ChatPage/MessageInput'



export const Chat = () => {
	return (
		<Flex w='full' h='full' flexDir='column' overflowY='auto'>
			<ChatPageProvider>
				<ChatHeader />
				<MessageList />
				<MessageInput />
			</ChatPageProvider>
		</Flex>
	)
}
