import { createMuiTheme } from 'material-ui/styles'
import { fade } from 'material-ui/styles/colorManipulator'
import lightBlue from 'material-ui/colors/lightBlue'
import red from 'material-ui/colors/red'
import cyan from 'material-ui/colors/cyan'

export default createMuiTheme({
  palette: {
    primary: {
      light: lightBlue[300],
      main: lightBlue[500],
      dark: lightBlue[700],
      contrastText: '#fff'
    },
    secondary: {
      light: cyan[300],
      main: cyan[500],
      dark: cyan[700],
      contrastText: '#fff'
    },
    error: red,
    background: {
      default: '#fff'
    }
  },
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    button: {
      textTransform: 'none'
    }
  },
  overrides: {
    MuiButton: {
      raised: {
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.87)',
        '&:hover': {
          backgroundColor: fade('rgba(0, 0, 0, 0.87)', 0.08)
        }
      }
    },
    MuiInput: {
      underline: {
        '&:before': {
          backgroundColor: 'rgba(0, 0, 0, 0.32)'
        },
        '&:hover:not($disabled):before': {
          backgroundColor: 'rgba(0, 0, 0, 0.42)'
        }
      }
    }
  }
})