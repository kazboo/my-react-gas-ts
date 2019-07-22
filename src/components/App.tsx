import React from 'react';
import Button from '@material-ui/core/Button';
import Delay from './Delay';

const App: React.FC = () => {
  return (
    <div>
        <h1>Hello World.</h1>
        <Button variant="contained" color="primary">
            Greeting.
        </Button>

        <div style={{padding: '10px'}}></div>

        <Delay />

    </div>
  )
};

export default App;