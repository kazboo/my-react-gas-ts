import React from 'react';
import GasClient from './client/gas-client'
import DelayPaperContainer from './DelayPaperContainer';
import LoadingAnimation from './LoadingAnimation';
import ErrorInformation from './ErrorInformation';

interface DelayInfoProps {

}

interface State {
    error: ErrorResult;
    isLoaded: boolean;
    delayList: DelayInfo[];
}

interface DelayInfo {
    name: string;
    company: string;
}

interface GetDelayListResult {
    message: string;
    delayList: DelayInfo[];
}

interface ErrorResult {
    message: string;
}

class DelayInformation extends React.Component<DelayInfoProps, State> {
    constructor(props: DelayInfoProps) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        delayList: []
      };
    }
    
    componentDidMount() {

        GasClient.getDelayList(
            (result: GetDelayListResult) => {
                this.setState({
                    isLoaded: true,
                    delayList: result.delayList
                })
            },
            (result: ErrorResult) => {
                this.setState({
                    isLoaded: true,
                    error: result
                })
            }
        );
    }
  
    render() {
        const { error, isLoaded, delayList } = this.state;
        if (error) {
            return <ErrorInformation message={ error.message } />;

        } else if (!isLoaded) {
            return <LoadingAnimation />;

        } else if (delayList) {
            return <DelayPaperContainer delayList={ delayList } />;

        } else {
            return <div>遅延情報はありません。</div>;
        }
    }
}

export default DelayInformation;