import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Flex, Text } from '@chakra-ui/layout'
import { useWindowWidth } from '@react-hook/window-size'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { ChatErrorType, useChat } from '../../context/ChatContext'
import { ChatRoomInfo } from './ChatRoomInfo'
import { ChatRoomSettings } from './ChatRoomSettings'

export const ChatHeader = () => {
	const { chat, error, isLoading } = useChat()
	const {
		isOpen: isChatSettingsOpen,
		onOpen: onChatSettingsOpen,
		onClose: onChatSettingsClose,
	} = useDisclosure()
	const wWidth = useWindowWidth()
	return (
		<Flex
			p='4'
			borderBottom='1px solid'
			borderColor='slate.500'
			justifyContent='space-between'
			alignItems='center'
			h='20'
		>
			{chat && (
				<>
					<ChatRoomInfo onChatRoomInfoClick={onChatSettingsOpen} />
					<ChatRoomSettings
						isOpen={isChatSettingsOpen}
						onClose={onChatSettingsClose}
					/>
				</>
			)}
			{error === ChatErrorType.notExist && <Text>Chat Room not found!</Text>}
			{!isLoading && wWidth <= 768 && (
				<Button as={Link} to='/'>
					Back
				</Button>
			)}
		</Flex>
	)
}
