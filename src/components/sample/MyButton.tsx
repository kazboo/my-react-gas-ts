import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import MyIcon from './MyIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    }
}));

interface Props {
    color?: 'inherit' | 'primary' | 'secondary' | 'default';
    disableFocusRipple?: boolean;
    fullWidth?: boolean;
    href?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'text' | 'outlined' | 'contained';
    icon?: 'mail' | 'send';
}

const MyButton: React.FC<Props> = (props) => {
    const classes = useStyles(props);
    const [viewBtnIcon, setViewBtnIcon] = useState(null);

    return (
        <Button
            className={classes.button}
            color={props.color}
            disableFocusRipple={props.disableFocusRipple}
            fullWidth={props.fullWidth}
            href={props.href}
            size={props.size}
            variant={props.variant}
            onClick={() => setViewBtnIcon(!viewBtnIcon)}
            >
            {props.children}
            {
                viewBtnIcon ? (<MyIcon className={classes.rightIcon} icon={props.icon} />) : (<></>)
            }
        </Button>
    )
}

export default MyButton;