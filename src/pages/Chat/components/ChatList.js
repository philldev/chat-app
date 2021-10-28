import { Avatar } from '@chakra-ui/avatar'
import { Flex, Text, VStack } from '@chakra-ui/layout'
import {
	collection, onSnapshot,
	orderBy,
	query
} from '@firebase/firestore'
import * as React from 'react'
import { useParams } from 'react-router'
import { db } from '../../../firebase'

export const ChatList = () => {
	const [messages, setMessages] = React.useState([])
	const { chatId } = useParams()
	React.useEffect(() => {
		const q = query(
			collection(db, 'chats', chatId, 'messages'),
			orderBy('createdAt', 'asc')
		)
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const messagesDocs = []
			querySnapshot.forEach((doc) => {
				messagesDocs.push(doc.data())
			})
			setMessages(messagesDocs)
		})
		return () => {
			unsubscribe()
		}
	}, [chatId])
	const ref = React.useRef(null)
	const gotoBottom = () => {
		const element = ref.current
		element.scrollIntoView()
	}

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
				/>
			))}
			<div ref={ref} />
		</VStack>
	)
}

const MessageItem = ({ username, avatarURL, message }) => {
	return (
		<Flex w='full' px='4'>
			<Avatar borderRadius='4' name='Dan Abrahmov' src={avatarURL} mr='4' />
			<VStack spacing='2' alignItems='start'>
				<Text fontWeight='bold'>{username}</Text>
				<Text p='2' bg='slate.200' borderRadius='lg'>
					{message}
				</Text>
			</VStack>
		</Flex>
	)
}
