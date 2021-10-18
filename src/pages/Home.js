import { Avatar } from '@chakra-ui/avatar'
import { Button, IconButton } from '@chakra-ui/button'
import { AddIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { ChatItem } from '../components/ChatItem'
import { Divider } from "@chakra-ui/react"

export const HomePage = () => {
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
					<Text color='slate.900' fontWeight='bold' >Dan Abrahmov</Text>
				</Flex>
				<IconButton
					size='lg'
					title='New Chat'
					colorScheme='slate'
					aria-label='Search database'
					icon={<AddIcon />}
				/>
			</Flex>
			<Box>
				{new Array(4).fill('').map((_, index) => (
					<>
					<ChatItem chatName={'test'} chatAvatarURL={`https://avatars.dicebear.com/api/identicon/${index}.svg`} />
					</>
				))}
			</Box>
			<Box position='fixed' bottom='0' left='0' w='100%'>
					<Button colorScheme='slate' w='full' py='8' borderRadius='0' outline='none' boxShadow='none !important'>New Chat</Button>
			</Box>
		</Box>
	)
}
