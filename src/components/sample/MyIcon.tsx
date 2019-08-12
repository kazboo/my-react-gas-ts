import React from 'react';
import MailIcon from '@material-ui/icons/Mail';
import SendIcon from '@material-ui/icons/Send';

interface Props {
    icon: string;
    className?: string;
}

const MyIcon:React.FC<Props> = (props) => {
    switch(props.icon) {
        case "mail" :
            return (
                <MailIcon className={props.className} />
            );
        case "send" :
            return (
                <SendIcon className={props.className} />
            );
        default :
            return (
                <div>default</div>
            );
    }
}

export default MyIcon;