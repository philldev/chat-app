import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Box, Flex, Text } from '@chakra-ui/layout'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../firebase/AuthContext'

export const HomePage = () => {
	const { signout } = useAuth()
	return (
		<Box w='full' h='full'>
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
							name='Dan Abrahmov'
							src='https://bit.ly/dan-abramov'
						/>
					</Box>
					<Text color='slate.900' fontWeight='bold'>
						Dan Abrahmov
					</Text>
				</Flex>
				<Button colorScheme='slate' onClick={signout}>
					Sign Out
				</Button>
			</Flex>
			<Box>
				{new Array(4).fill('').map((_, index) => (
					<Link key={index} to={`/chat/${index}`}>
						<ChatItem
							chatName={'test'}
							chatAvatarURL={`https://avatars.dicebear.com/api/identicon/${index}.svg`}
						/>
					</Link>
				))}
			</Box>
			<Box position='fixed' bottom='0' left='0' w='100%'>
				<Button
					colorScheme='slate'
					w='full'
					py='8'
					borderRadius='0'
					outline='none'
					boxShadow='none !important'
				>
					New Chat
				</Button>
			</Box>
		</Box>
	)
}

const ChatItem = ({ chatName, chatAvatarURL }) => {
	return (
		<Box display='flex' p={4} cursor='pointer' _hover={{ bg: 'slate.200' }}>
			<Avatar name={chatName} src={chatAvatarURL} mr={4} />
			<Text fontSize='xl' fontWeight='bold'>
				{chatName}
			</Text>
		</Box>
	)
}
