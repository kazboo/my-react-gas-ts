import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core';
import {green, amber} from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from '@material-ui/core/Card';
import Snackbar from '@material-ui/core/Snackbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import GetReportIcon from '@material-ui/icons/SaveAlt';
import GenerateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WeekDatePicker from './WeekDatePicker';
import GasClient from '../../client/gas-client'
import {startOfWeek} from 'date-fns';

const txtVariant = 'outlined';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    textField: {
        marginTop: '10px',
        marginBottom: '10px',
    },
    divider: {
        marginBottom: '20px',
    }
}));

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

interface WorkingHour {
    date: string;
    actualWorkingHour: string;
}

interface GetWorkingHoursEvent extends React.FormEvent<HTMLInputElement> {
    target: HTMLInputElement;
}

interface SnackbarProps {
    className?: string;
    message?: string;
    onClose?: any;
    variant?: 'error' | 'warning' | 'info' | 'success';
}

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

function MySnackbarContentWrapper(props: SnackbarProps) {
    const classes = useStyles1(props);
    const { className, message, onClose, variant } = props;
    const Icon = variantIcon[variant];
  
    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
            <span id="client-snackbar" className={classes.message}>
                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                {message}
            </span>
            }
            action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                <CloseIcon className={classes.icon} />
            </IconButton>,
            ]}
        />
    );
}

interface Props { }

/**
 * TODO: 要リファクタ(コンポーネントの細分化)
 */
const Generate: React.FC<Props> = (props) => {
    const classes = useStyles(props);
    /** 勤務時間取得結果 */
    const [workingHours, setWorkingHours] = React.useState("");
    /** 入力情報: 勤次郎ユーザ名 */
    const [kinjirouUserName, setkinjirouUserName] = React.useState("");
    /** 入力情報: 勤次郎パスワード */
    const [kinjirouPassword, setkinjirouPassword] = React.useState("");
    /** 取得する期間 */
    const [selectedDate, setSelectedDate] = React.useState(startOfWeek(new Date()));
    /** 取得ボタンのローディング */
    const [kinjirouLoading, setKinjirouLoading] = React.useState(false);
    const [snackbarOpen, setSnakberOpen] = React.useState(false);
    const [snackbarVariant, setSnakberVariant] = React.useState(null);
    const [resultMessage, setResultMessage] = React.useState(null);

    function parseWorkingHours(whs: WorkingHour[]) {
        if (!whs) {
            return "";
        }

        const result: string = whs.map(w => `${w.date} : ${w.actualWorkingHour}\n`).join("");

        return result;
    }

    function handleWorkingHoursClick() {
        if (!kinjirouLoading) {
            // ローディングの表示を有効に
            setKinjirouLoading(true);

            GasClient.getWorkingHours(
                kinjirouUserName,
                kinjirouPassword,
                selectedDate ? selectedDate.toLocaleDateString() : null,
                (result: WorkingHour[]) => {
                    // ローディングの表示を無効に
                    setKinjirouLoading(false);
                    // スナックバーの表示
                    setSnakberOpen(true);
                    setSnakberVariant("success");
                    setResultMessage("勤務時間の取得に成功しました。");
                    // 取得結果の表示
                    setWorkingHours(parseWorkingHours(result));
                },
                () => {
                    // ローディングの表示を無効に
                    setKinjirouLoading(false);
                    // スナックバーの表示
                    setSnakberOpen(true);
                    setSnakberVariant("error");
                    setResultMessage("勤務時間の取得に失敗しました。");
                }
            );
        }
    }

    const handleWorkingHoursTextFileldChange = (event: GetWorkingHoursEvent) => {
        setWorkingHours(event.target.value);
    };
    
    const handleKinjiroUserNameTextFieldChange = (event: GetWorkingHoursEvent) => {
        setkinjirouUserName(event.target.value);
    };

    const handleKinjiroPasswordTextFieldChange = (event: GetWorkingHoursEvent) => {
        setkinjirouPassword(event.target.value);
    };

    const handleDateRangeChange = (date: Date) => {
        setSelectedDate(date);
    }
  
    const handleSnackbarClose = (event: any, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnakberOpen(false);
    }

    return (
        <>
            <h2>Generate</h2>
            
            <Grid container={true} spacing={1}>

                {/* 週報 */}
                <Grid item={true} xs={12} md={6}>
                    <Card style={{ padding:'10px', height:'100%' }}>
                        <h4>週報</h4>
                        <TextField
                            id="input-vacation"
                            label="休暇の予定"
                            variant={txtVariant}
                            fullWidth={true}
                            multiline={true}
                            margin="dense"
                            rows={4}
                            className={classes.textField}
                        />
                        <TextField
                            id="input-plan"
                            label="今後の予定"
                            variant={txtVariant}
                            fullWidth={true}
                            multiline={true}
                            margin="dense"
                            rows={4}
                            className={classes.textField}
                        />
                        <TextField
                            id="input-progress"
                            label="作業状況"
                            variant={txtVariant}
                            fullWidth={true}
                            multiline={true}
                            margin="dense"
                            rows={4}
                            className={classes.textField}
                        />
                        <TextField
                            id="input-status"
                            label="体調面"
                            variant={txtVariant}
                            fullWidth={true}
                            multiline={true}
                            margin="dense"
                            rows={4}
                            className={classes.textField}
                        />
                    </Card>
                </Grid>

                {/* 週計 */}
                <Grid item={true} xs={12} md={6}>
                    <Card style={{ padding:'10px', height:'100%' }}>
                        <h4>週計</h4>
                        <TextField
                            id="input-kinjirou-user"
                            label="勤次郎のユーザー名"
                            required={true}
                            autoComplete="username"
                            variant={txtVariant}
                            fullWidth={true}
                            margin="dense"
                            onChange={handleKinjiroUserNameTextFieldChange}
                            className={classes.textField}
                        />
                        <TextField
                            id="input-kinjirou-password"
                            label="勤次郎のパスワード"
                            required={true}
                            variant={txtVariant}
                            fullWidth={true}
                            type="password"
                            autoComplete="current-password"
                            margin="dense"
                            onChange={handleKinjiroPasswordTextFieldChange}
                            className={classes.textField}
                        />
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="checkbox-remember"
                                        defaultChecked
                                        color="default"
                                        value="remember"
                                    />
                                }
                                label="remember" />
                        </div>

                        <Divider
                            className={classes.divider}/>

                        <WeekDatePicker
                            value={selectedDate}
                            onWeekDatePickerSelect={handleDateRangeChange} />

                        <div style={{textAlign:'right'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                disabled={kinjirouLoading}
                                onClick={handleWorkingHoursClick}>
                                取得
                                <GetReportIcon className={classes.rightIcon} />
                                {kinjirouLoading && <CircularProgress
                                    size={24}
                                    className={classes.buttonProgress}
                                />}
                            </Button>
                        </div>

                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            open={snackbarOpen}
                            autoHideDuration={6000}
                            onClose={handleSnackbarClose}
                        >
                            <MySnackbarContentWrapper
                                onClose={handleSnackbarClose}
                                variant={!snackbarVariant ? "info" : snackbarVariant}
                                message={resultMessage}
                            />
                        </Snackbar>

                        <TextField
                            id="input-kinjirou-workinghours"
                            label="取得結果"
                            value={workingHours}
                            variant={txtVariant}
                            fullWidth={true}
                            margin="dense"
                            className={classes.textField}
                            multiline={true}
                            rows={7}
                            // 制御コンポーネント。これがないと取得結果をフィルインした後、テキストエリアに入力できない。
                            onChange={handleWorkingHoursTextFileldChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Card>
                </Grid>

                {/* 週報生成 */}
                <Grid item={true} xs={12} md={12}>
                    <Card style={{ padding:'10px', height:'100%' }}>
                        <div style={{textAlign:'right'}}>
                            <Button variant="contained" color="primary" className={classes.button}>
                                生成
                                <GenerateIcon className={classes.rightIcon} />
                            </Button>
                        </div>
                        <TextField
                            id="input-generate-result"
                            label="生成結果"
                            variant={txtVariant}
                            fullWidth={true}
                            multiline={true}
                            margin="dense"
                            className={classes.textField}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Card>
                </Grid>

            </Grid>
        </>
    );
}

export default Generate;