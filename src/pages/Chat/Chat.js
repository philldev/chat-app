import * as React from 'react'
import { Flex } from '@chakra-ui/layout'
import { ChatPageProvider } from '../../context/ChatPageContext'
import { ChatHeader } from './components/ChatHeader'
import { ChatList } from './components/ChatList'
import { MessageInput } from './components/MessageInput'



export const Chat = () => {
	return (
		<Flex w='full' h='full' flexDir='column' overflowY='auto'>
			<ChatPageProvider>
				<ChatHeader />
				<ChatList />
				<MessageInput />
			</ChatPageProvider>
		</Flex>
	)
}
