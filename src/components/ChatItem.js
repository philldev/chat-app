import { Avatar } from '@chakra-ui/avatar'
import { Box, Text } from '@chakra-ui/layout'

export const ChatItem = ({ chatName, chatAvatarURL }) => {
	return (
		<Box display='flex' p={4} cursor='pointer' _hover={{bg:'slate.200'}}>
			<Avatar name={chatName} src={chatAvatarURL} mr={4} />
			<Text fontSize='xl' fontWeight='bold'>{chatName}</Text>
		</Box>
	)
}
