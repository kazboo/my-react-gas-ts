import React from 'react';
import Grid from '@material-ui/core/Grid'
import DelayPaper from './DelayPaper'


interface DelayPaperContainerProps {
    delayList: DelayData[];
}

interface DelayData {
    name: string;
    company: string;
}

const DelayPaperContainer: React.FC<DelayPaperContainerProps> = (props) => {
    return (
        <div>
            <h2>遅延情報</h2>
            <Grid container spacing={ 3 }>
            {
                props.delayList.map(d => (
                    <Grid item xs={ 12 } md={ 6 } key={ d.name }>
                        <DelayPaper
                            name={ d.name }
                            company={ d.company } />
                    </Grid>
                ))
            }
            </Grid>
        </div>
    );
}

export default DelayPaperContainer;