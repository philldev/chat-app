import { CopyIcon } from '@chakra-ui/icons'
import { Text } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'

export const RoomChatId = ({ chatId }) => {
	const toast = useToast()
	const copyRoomIdToClipboard = () => {
		navigator.clipboard.writeText(chatId)
		toast({
			title: 'Room id copied',
			status: 'success',
			duration: 2000,
			isClosable: true,
		})
	}
	return (
		<Text
			cursor='pointer'
			onClick={copyRoomIdToClipboard}
			title='Copy room id'
			color='slate.900'
			fontSize='sm'
		>
			Room ID : {chatId} <CopyIcon />
		</Text>
	)
}
