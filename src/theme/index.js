import { extendTheme } from '@chakra-ui/react'
import { slateDark } from '@radix-ui/colors'

export const appTheme = extendTheme({
	colors: {
		slate: {
			50: slateDark.slate1,
			100: slateDark.slate2,
			200: slateDark.slate3,
			300: slateDark.slate4,
			400: slateDark.slate5,
			500: slateDark.slate6,
			600: slateDark.slate7,
			700: slateDark.slate9,
			800: slateDark.slate10,
			900: slateDark.slate11,
		},
	},
})
