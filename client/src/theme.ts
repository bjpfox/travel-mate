import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const theme = extendTheme({
    styles: {
      global: (props) => ({
        body: {
          bg: props.colorMode === 'dark' ? 'gray.900' : '#FDBFAF',
        },
      }),
    },
  });
  
  export default theme;