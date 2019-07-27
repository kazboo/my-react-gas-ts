import React from 'react';
import Paper from '@material-ui/core/Paper'

interface DelayPaperProps {
    name: string;
    company: string;
}

const DelayPaper: React.FC<DelayPaperProps> = (props) => {
    return (
        <Paper>
            <p style={{padding: '10px'}}>{ props.name }</p>
            <p style={{padding: '10px'}}>{ props.company }</p>
        </Paper>
    );
}

export default DelayPaper;