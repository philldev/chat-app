import * as React from 'react'
import { Box } from '@chakra-ui/layout'
import { ChatList } from './components/ChatList'
import { HomeHeader } from './components/HomeHeader'
import { NewChatButton } from './components/NewChatButton'

export const HomePage = () => {
	return (
		<Box w='full' h='full'>
			<HomeHeader />
			<ChatList />
			<NewChatButton />
		</Box>
	)
}


