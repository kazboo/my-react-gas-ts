import React from 'react';

interface ErrorInformationProps {
    message: string;
}

const ErrorInformation: React.FC<ErrorInformationProps> = (props) => {
    const { message } = props;
    return (
        <div>
            { message }
        </div>
    );
}

export default ErrorInformation;