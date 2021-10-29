import * as React from 'react'
import { chakra } from "@chakra-ui/system"
import { UsersIcon } from "../../../components/icons/users"
import { useAuth } from "../../../context/AuthContext"
import { collection, getDocs, limit, query, where } from '@firebase/firestore'
import { db } from '../../../firebase'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'

const UsersIconChakra = chakra(UsersIcon)

export const ChatItem = ({ chatName, chatAvatarURL, chatId, usersLastSeen, usersLength }) => {
	const { user } = useAuth()
	const [unreadMessage, setUnreadMessage] = React.useState(null)
	React.useEffect(() => {
		const getUnReadMessages = async () => {
			let userLastSeen = usersLastSeen[user.id]
			let q = query(
				collection(db, 'chats', chatId, 'messages'),
				where('createdAt', '>', userLastSeen),
				limit(10)
			)
			const querySnap = await getDocs(q)
			if (querySnap.size > 0) setUnreadMessage(querySnap.size)
		}
		getUnReadMessages()
	}, [user, chatId, usersLastSeen])
	return (
		<Box display='flex' p={4} cursor='pointer' _hover={{ bg: 'slate.200' }}>
			<Box position='relative' mr='4'>
				<Avatar borderRadius='4' name={chatName} src={chatAvatarURL} />
				{unreadMessage && (
					<Flex
						alignItems='center'
						justifyContent='center'
						position='absolute'
						right='-2'
						top='-2'
						borderRadius='50%'
						bg='red.400'
						w='4'
						h='4'
					>
						<Text fontSize='10px' lineHeight='var(--chakra-fontSizes-xs)'>
							{unreadMessage > 9 ? '9+' : unreadMessage}
						</Text>
					</Flex>
				)}
			</Box>
			<Box>
				<Text fontSize='xl' fontWeight='bold'>
					{chatName}
				</Text>
				<Flex alignItems='center'>
					<UsersIconChakra w='16px' h='16px' mr='2' />
					<Text fontSize='sm'>Users : {usersLength}</Text>
				</Flex>
			</Box>
		</Box>
	)
}