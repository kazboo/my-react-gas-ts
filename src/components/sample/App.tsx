import React from 'react';
import Button from './MyButton';
import Space from './Space';
import DelayInformation from './DelayInformation';
import BookInformation from './BookInformation';

const App: React.FC = () => {
  return (
    <div>
        <h1>Hello World.</h1>
        
        <Button variant="contained" color="primary" icon="mail">
            mail
        </Button>

        <Button variant="contained" color="primary" icon="send">
            send
        </Button>

        <Space />

        <DelayInformation />

        <BookInformation />

    </div>
  )
};

export default App;