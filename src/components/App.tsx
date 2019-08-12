import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import SettingsIcon from "@material-ui/icons/Settings";
import Sample from './sample/App';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        // ...theme.mixins.toolbar ビルドが通らない(Unexpected token ...)ため、toolbarMixinsを作成して回避
    },
    toolbarMixins: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    menuButton: {
        marginRight: 36
    },
    hide: {
        display: "none"
    },
    drawerMenu: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1
        }
    }
}));

interface Props {

}

const App: React.FC<Props> = (props) => {
    const classes = useStyles(props);
    const [open, setOpen] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }
    
    return (
        <div className={classes.root}>
            <CssBaseline />

            {/* header */}
            <AppBar
                color="primary"
                position="fixed"
                className={clsx(classes.appBar, {
                  [classes.appBarShift]: open
                })}
                >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        className={clsx(classes.menuButton, {
                          [classes.hide]: open
                        })}
                        onClick={handleDrawerOpen}>
                        <MenuIcon htmlColor='#fff' />
                    </IconButton>
                    <Typography variant="h6" noWrap={true}>
                        Weekly Report
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* nav */}
            <Drawer
                variant="permanent"
                className={clsx(
                    classes.drawerMenu,
                    {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    }
                )}
                classes={{
                  paper: clsx(
                    {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    }
                  )
                }}
                open={open}>
                <div className={clsx(classes.toolbar, classes.toolbarMixins)}>
                    <IconButton
                        onClick={handleDrawerClose}>
                        <ChevronLeftIcon htmlColor='#fff' />
                    </IconButton>
                </div>

                <List>

                    <ListItem button={true} key="Generate">
                        <ListItemIcon>
                          <FileIcon htmlColor='#fff' />
                        </ListItemIcon>
                        <ListItemText primary="Generate" />
                    </ListItem>

                    <ListItem button={true} key="Settings">
                        <ListItemIcon>
                            <SettingsIcon htmlColor='#fff' />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>

                </List>

            </Drawer>

            {/* contents */}
            <main className={classes.content}>
                <div className={clsx(classes.toolbar, classes.toolbarMixins)} />
                <Typography paragraph={true}>
                    Main Content
                </Typography>
                <Sample />
            </main>

        </div>
    )
}

export default App;