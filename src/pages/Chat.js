import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Box, Flex, Text, VStack } from '@chakra-ui/layout'

export const Chat = () => {
	return (
		<Flex w='full' h='full' flexDir='column' overflowY='auto'>
			<ChatHeader />
			<VStack flexGrow='1' spacing='4' py='2' overflowY='auto'>
				<MessageItem
					username='Dan Abrahmov'
					avatarURL='https://bit.ly/dan-abramov'
					message={`
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				`}
				/>
			</VStack>
			<MessageInput />
		</Flex>
	)
}

const MessageItem = ({ username, avatarURL, message }) => {
	return (
		<Flex w='full' px='4'>
			<Avatar name='Dan Abrahmov' src={avatarURL} mr='4' />
			<VStack spacing='2' alignItems='start'>
				<Text fontWeight='bold'>{username}</Text>
				<Text p='2' bg='slate.200' borderRadius='lg'>{message}</Text>
			</VStack>
		</Flex>
	)
}

const ChatHeader = () => {
	return (
		<Flex
			p='4'
			borderBottom='1px solid'
			borderColor='slate.500'
			justifyContent='space-between'
		>
			<Flex alignItems='center'>
				<Box as='button' mr='4'>
					<Avatar
						size='md'
						name='chat'
						src='https://avatars.dicebear.com/api/identicon/1.svg'
					/>
				</Box>
				<Text color='slate.900' fontWeight='bold'>
					Chat 1
				</Text>
			</Flex>
			<Button colorScheme='slate'>Leave</Button>
		</Flex>
	)
}

const MessageInput = () => {
	return (
		<Box display='flex'>
			<Input
				placeholder='type your message'
				py='8'
				border='none'
				bg='slate.300'
				borderRadius='0'
				_focus={{ border: 'none' }}
			/>
			<Button
				colorScheme='slate'
				py='8'
				px='8'
				borderRadius='0'
				outline='none'
				boxShadow='none !important'
			>
				Send
			</Button>
		</Box>
	)
}
