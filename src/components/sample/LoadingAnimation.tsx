import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingAnimation: React.FC = ()=> {
    return (
        <div>
            <CircularProgress disableShrink />
        </div>
    );
}

export default LoadingAnimation;