import * as React from 'react'
import chatsCollection from '../../api/chat'
import { Avatar } from '@chakra-ui/avatar'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'
import { useAuth } from '../../context/AuthContext'
import { UsersIcon } from '../icons/users'

const UsersIconChakra = chakra(UsersIcon)
const Chats = chatsCollection()

export const ChatItem = ({
	chatName,
	chatAvatarURL,
	chatId,
	usersLastSeen,
	usersLength,
	selected,
}) => {
	const { user } = useAuth()
	const [unreadMessageCount, setUnreadMessageCount] = React.useState(null)
	React.useEffect(() => {
		const getUnReadMessagesCount = async () => {
			try {
				let count = await Chats.getUnReadMessagesCount({
					chatId,
					chatUsersLastSeen: usersLastSeen,
					user,
				})
				if (count > 0) {
					setUnreadMessageCount(count)
				}
			} catch (error) {
				console.log(error)
			}
		}
		getUnReadMessagesCount()
	}, [user, chatId, usersLastSeen])
	return (
		<Box
			display='flex'
			p={4}
			cursor='pointer'
			bg={selected ? 'slate.200' : undefined}
			_hover={{ bg: 'slate.200' }}
		>
			<Box position='relative' mr='4'>
				<Avatar borderRadius='4' name={chatName} src={chatAvatarURL} />
				{unreadMessageCount && (
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
							{unreadMessageCount > 9 ? '9+' : unreadMessageCount}
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
