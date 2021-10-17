import { Avatar } from '@chakra-ui/avatar'
import { IconButton } from '@chakra-ui/button'
import { AddIcon } from '@chakra-ui/icons'
import { Box, Flex, Text } from '@chakra-ui/layout'

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
			<Box></Box>
			<Box></Box>
		</Box>
	)
}
