import { Flex } from '@chakra-ui/layout'
import { useWindowWidth } from '@react-hook/window-size'
import * as React from 'react'
import { useHistory, useParams } from 'react-router'
import { ChatHeader } from '../../components/ChatHeader'
import { MessageInput } from '../../components/MessageInput'
import { MessageList } from '../../components/MessageList'
import { ChatProvider } from '../../context/ChatContext'

export const Chat = () => {
	const { chatId } = useParams()
	const wWidth = useWindowWidth()
	const history = useHistory()
	React.useEffect(() => {
		if (wWidth > 768) {
			history.push('/', { chatId })
		}
	}, [wWidth, chatId, history])
	if (wWidth > 768) return null
	return (
		<Flex w='full' h='full' flexDir='column' overflowY='auto'>
			<ChatProvider chatId={chatId}>
				<ChatHeader />
				<MessageList />
				<MessageInput />
			</ChatProvider>
		</Flex>
	)
}
