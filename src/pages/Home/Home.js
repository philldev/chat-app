import { Box } from '@chakra-ui/layout'
import * as React from 'react'
import { ChatList } from '../../components/HomePage/ChatList'
import { HomeHeader } from '../../components/HomePage/HomeHeader'
import { NewChatButton } from '../../components/HomePage/NewChatButton'

export const HomePage = () => {
	return (
		<Box w='full' h='full'>
			<HomeHeader />
			<ChatList />
			<NewChatButton />
		</Box>
	)
}
