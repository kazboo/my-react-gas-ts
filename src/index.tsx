import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import teal from '@material-ui/core/colors/teal'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: teal
    },
    overrides: {
      MuiDrawer: {
          paper: {
              color: '#fff',
              background: 'linear-gradient(180deg, #009688 10%, #ff8f00 90%)'
          }
      }
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')
);
