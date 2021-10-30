import { Avatar } from '@chakra-ui/avatar'
import { Flex, Text, VStack } from '@chakra-ui/layout'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import * as React from 'react'
import chatsCollection from '../../api/chat'
import { useChat } from '../../context/ChatContext'

dayjs.extend(calendar)

const Chats = chatsCollection()

export const MessageList = () => {
	const [messages, setMessages] = React.useState([])
	const {chatId} = useChat()
	const ref = React.useRef(null)
	const gotoBottom = () => {
		const element = ref.current
		element.scrollIntoView()
	}
	React.useEffect(() => {
		const unsubscribe = Chats.onMessagesSnapshot(
			(messagesData) => {
				setMessages(messagesData)
			},
			{ chatId }
		)
		return () => {
			unsubscribe()
		}
	}, [chatId])
	React.useEffect(() => {
		if (messages.length > 0) gotoBottom()
	}, [messages])
	return (
		<VStack flexGrow='1' spacing='4' py='4' overflowY='auto'>
			{messages?.map((m, index) => (
				<MessageItem
					key={index}
					username={m?.from}
					avatarURL={`https://avatars.dicebear.com/api/identicon/${m?.from}.svg`}
					message={m?.content}
					createdAt={m?.createdAt}
				/>
			))}
			<div ref={ref} />
		</VStack>
	)
}

const MessageItem = ({ username, avatarURL, message, createdAt }) => {
	return (
		<Flex w='full' px='4'>
			<Avatar borderRadius='4' name='Dan Abrahmov' src={avatarURL} mr='4' />
			<VStack spacing='1' alignItems='start'>
				<Flex alignItems='center'>
					<Text fontWeight='bold' mr='2'>
						{username}
					</Text>
					<Text fontSize='10px' color='slate.800'>
						{dayjs().calendar(dayjs(createdAt))}
					</Text>
				</Flex>
				<Text>{message}</Text>
			</VStack>
		</Flex>
	)
}
