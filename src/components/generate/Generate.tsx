import React from 'react';
import {makeStyles} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import GetReportIcon from '@material-ui/icons/SaveAlt';
import GenerateIcon from '@material-ui/icons/Create';
import GasClient from '../../client/gas-client'

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    textField: {
        marginBottom: '10px',
        marginTop: '10px',
        fontSize: '0.5rem'
    }
}));

interface WorkingHour {
    date: string;
    workingHour: string;
}

interface GetWorkingHoursEvent extends React.FormEvent<HTMLInputElement> {
    target: HTMLInputElement;
}

interface Props { }

/**
 * TODO: 要リファクタ(コンポーネントの細分化)
 */
const Generate: React.FC<Props> = (props) => {
    const classes = useStyles(props);
    /** 勤務時間取得結果 */
    const [workingHours, setWorkingHours] = React.useState("");
    /** TODO: エラーメッセージの表示 */
    const [errorMsg, setErrorMsg] = React.useState("");
    /**　入力情報: 勤次郎ユーザ名 */
    const [kinjirouUserName, setkinjirouUserName] = React.useState("");
    /**　入力情報: 勤次郎パスワード */
    const [kinjirouPassword, setkinjirouPassword] = React.useState("");

    function parseWorkingHours(whs: WorkingHour[]) {
        if (!whs) {
            return "";
        }

        // parse
        const result: string = whs.map(w => `${w.date} : ${w.workingHour}\n`).join("");

        return result;
    }

    function getWorkingHours() {
        alert(`user:${kinjirouUserName}, pass:${kinjirouPassword}`);
        
        GasClient.getWorkingHours(
            kinjirouUserName,
            kinjirouPassword,
            (result: WorkingHour[]) => setWorkingHours(parseWorkingHours(result)),
            () => setErrorMsg("failed to get working hours.")
        );
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

    return (
        <>
            <h2>Genrate Weekly Report</h2>
            
            <Grid container={true} spacing={1}>

                {/* 週報 */}
                <Grid item={true} xs={12} md={6}>
                    <Card style={{ padding:'10px', height:'100%' }}>
                        <h4>週報</h4>
                        <TextField
                            id="input-vacation"
                            label="休暇の予定"
                            variant="outlined"
                            fullWidth={true}
                            multiline={true}
                            margin="dense"
                            rows={4}
                            className={classes.textField}
                        />
                        <TextField
                            id="input-plan"
                            label="今後の予定"
                            variant="outlined"
                            fullWidth={true}
                            multiline={true}
                            margin="dense"
                            rows={4}
                            className={classes.textField}
                        />
                        <TextField
                            id="input-progress"
                            label="作業状況"
                            variant="outlined"
                            fullWidth={true}
                            multiline={true}
                            margin="dense"
                            rows={4}
                            className={classes.textField}
                        />
                        <TextField
                            id="input-status"
                            label="体調面"
                            variant="outlined"
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
                            label="勤次郎ユーザー名"
                            autoComplete="username"
                            variant="outlined"
                            fullWidth={true}
                            margin="dense"
                            onChange={handleKinjiroUserNameTextFieldChange}
                            className={classes.textField}
                        />
                        <TextField
                            id="input-kinjirou-password"
                            label="パスワード"
                            variant="outlined"
                            type="password"
                            autoComplete="current-password"
                            fullWidth={true}
                            margin="dense"
                            onChange={handleKinjiroPasswordTextFieldChange}
                            className={classes.textField}
                        />
                        <div>
                            <Checkbox
                                defaultChecked
                                color="default"
                                value="remember"
                                inputProps={{
                                    'aria-label': 'checkbox with default color',
                                }}
                            />
                            remember
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={getWorkingHours}>
                            取得
                            <GetReportIcon className={classes.rightIcon} />
                        </Button>
                        <TextField
                            id="input-kinjirou-workinghours"
                            label="取得結果"
                            value={workingHours}
                            variant="outlined"
                            fullWidth={true}
                            margin="dense"
                            className={classes.textField}
                            multiline={true}
                            rows={7}
                            onChange={handleWorkingHoursTextFileldChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Card>
                </Grid>

                {/* 週報生成 */}
                <Grid item={true} xs={12} md={12}>
                    <Card style={{ padding:'10px', height:'100%' }}>
                        <Button variant="contained" color="primary" className={classes.button}>
                            生成
                            <GenerateIcon className={classes.rightIcon} />
                        </Button>
                        <TextField
                            id="input-generate-result"
                            label="生成結果"
                            variant="outlined"
                            fullWidth={true}
                            multiline={true}
                            margin="dense"
                            className={classes.textField}
                        />
                    </Card>
                </Grid>

            </Grid>
        </>
    );
}

export default Generate;