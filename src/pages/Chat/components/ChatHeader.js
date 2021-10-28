import { Avatar } from "@chakra-ui/avatar"
import { Button } from "@chakra-ui/button"
import { CopyIcon } from "@chakra-ui/icons"
import { Box, Flex, Text } from "@chakra-ui/layout"
import { useToast } from "@chakra-ui/toast"
import { Link } from "react-router-dom"
import { ChatErrorType, useChat } from "../Chat"

export const ChatHeader = () => {
	const { chat, error } = useChat()
	const toast = useToast()
	const copyRoomIdToClipboard = () => {
		navigator.clipboard.writeText(chat?.id)
		toast({
			title: 'Room id copied',
			status: 'success',
			duration: 2000,
			isClosable: true,
		})
	}
	return (
		<Flex
			p='4'
			borderBottom='1px solid'
			borderColor='slate.500'
			justifyContent='space-between'
			alignItems='center'
		>
			{chat && (
				<Flex alignItems='center'>
					<Box as='button' mr='4'>
						<Avatar
							size='sm'
							name='chat'
							src={`https://avatars.dicebear.com/api/identicon/${chat?.name}.svg`}
						/>
					</Box>
					<Box>
						<Text color='slate.900' fontWeight='bold' fontSize='xl'>
							{chat?.name}
						</Text>
						<Text
							cursor='pointer'
							onClick={copyRoomIdToClipboard}
							title='Copy room id'
							color='slate.900'
							fontSize='sm'
						>
							Room ID : {chat?.id} <CopyIcon />
						</Text>
					</Box>
				</Flex>
			)}
			{error === ChatErrorType.notExist && <Text>Chat Room not found!</Text>}
			<Button as={Link} to='/' colorScheme='slate'>
				Back
			</Button>
		</Flex>
	)
}
