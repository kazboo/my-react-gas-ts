import React from 'react';
import Button from '@material-ui/core/Button';
import Space from './Space';
import DelayInformation from './DelayInformation';

const App: React.FC = () => {
  return (
    <div>
        <h1>Hello World.</h1>
        
        <Button variant="contained" color="primary">
            Greeting.
        </Button>

        <Space />

        <DelayInformation />

    </div>
  )
};

export default App;