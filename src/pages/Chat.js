import { Avatar } from '@chakra-ui/avatar'
import { Button, IconButton } from '@chakra-ui/button'
import { AddIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/layout'

export const Chat = () => {
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
		</Box>
	)
}
