import { Avatar } from '@chakra-ui/avatar'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { useChat } from '../context/ChatContext'
import { RoomChatId } from './RoomChatId'

export const ChatRoomInfo = ({ onChatRoomInfoClick }) => {
	const { chat } = useChat()
	return (
		<Flex alignItems='center'>
			<Box as='button' mr='4' onClick={onChatRoomInfoClick}>
				<Avatar
					size='sm'
					borderRadius='4'
					name='chat'
					src={`https://avatars.dicebear.com/api/identicon/${chat?.name}.svg`}
				/>
			</Box>
			<Box>
				<Text color='slate.900' fontWeight='bold' fontSize='xl'>
					{chat?.name}
				</Text>
				{chat?.id && <RoomChatId chatId={chat.id} />}
			</Box>
		</Flex>
	)
}
