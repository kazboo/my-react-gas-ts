import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import GasClient from '../client/gas-client';

const useStyles = makeStyles(theme => ({
    typography: {
        padding: theme.spacing(2),
    },
    avatar: {
        margin: 1,
    },
    icon: {
        color: '#fff'
    }
}));
  
interface Account {
    email: string;
}

interface Props { }

const AccountButton: React.FC<Props> = (props) => {
    const classes = useStyles(props);

    const [userEmail, setUserEmail] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        GasClient.getAccount(
            (result: Account) => setUserEmail(result.email),
            // 取得できない場合、空をセット。
            () => setUserEmail("")
        );
    });
    
    function handleClick(event: any) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    return (
        <>
            <Button
                variant="text"
                aria-describedby={id}
                onClick={handleClick}>
                <Avatar className={classes.avatar}>{userEmail ? userEmail.toUpperCase().charAt(0) : ""}</Avatar>
                <ArrowDropDownIcon className={classes.icon} />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>{userEmail}</Typography>
            </Popover>
        </>
    );
}

export default AccountButton;