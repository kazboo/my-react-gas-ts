import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// class App extends React.Component {
//   render() {
//     return (
//       <div>Hello World.</div>
//     )
//   };
// };

const App: React.FC = () => {
  return (
    <div>
        <h1>Hello World.</h1>
        <Button variant="contained" color="primary">
            Greeting.
        </Button>

        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Paper>
                    <p>
                        Paper 1
                    </p>
                    <p>
                        hoge
                    </p>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper>
                    <p>
                        Paper 2
                    </p>
                    <p>
                        huga
                    </p>
                </Paper>
            </Grid>
        </Grid>
    </div>
  )
};

export default App;