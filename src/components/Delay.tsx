import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress'

interface ErrorResult {
    message: string;
}

interface DelayInfo {
    name: string;
    company: string;
}

interface State {
    error: ErrorResult;
    isLoaded: boolean;
    delayList: DelayInfo[];
}

interface DelayProps {

}

class Delay extends React.Component<DelayProps, State> {
    constructor(props: DelayProps) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        delayList: []
      };
    }
  
    componentDidMount() {
        fetch("https://tetsudo.rti-giken.jp/free/delay.json", {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => response.json())
        .then(
            result => {
                this.setState({
                    isLoaded: true,
                    delayList: result
                });
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
  
    render() {
        const { error, isLoaded, delayList } = this.state;
        if (error) {
            return (
                <div>
                    Error: { error.message }
                </div>
            );

        } else if (!isLoaded) {
            return (
                <div>
                    <CircularProgress disableShrink />
                </div>
            );

        } else if (delayList) {
            return (
                <div>
                    <h2>遅延情報</h2>

                    <Grid container spacing={ 3 }>
                    {
                        delayList.map(delay => (
                            <Grid item xs={ 12 } md={ 6 } key={ delay.name }>
                                <Paper>
                                    <p style={{padding: '10px'}}>{ delay.name }</p>
                                    <p style={{padding: '10px'}}>{ delay.company }</p>
                                </Paper>
                            </Grid>
                        ))
                    }
                    </Grid>
                </div>
            );

        } else {
            return (
                <div>
                    遅延情報はありません。
                </div>
            );
            
        }
    }
}

export default Delay;