import * as React from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { Flex } from '@chakra-ui/layout'
import { ProfileDialog } from './ProfileDialog'
import { SearchBox } from './SearchBox'
import { UserInfo } from './UserInfo'

export const HomeHeader = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<>
			<Flex
				p='4'
				borderBottom='1px solid'
				borderColor='slate.500'
				justifyContent='space-between'
			>
				<UserInfo onClick={onOpen} />
				<SearchBox />
			</Flex>
			<ProfileDialog {...{ isOpen, onClose }} />
		</>
	)
}
