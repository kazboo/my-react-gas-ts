import 'date-fns';
import clsx from "clsx";
import React from 'react';
import {makeStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import isSameDay from "date-fns/isSameDay";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import isWithinInterval from "date-fns/isWithinInterval";

const useStyles = makeStyles(theme => ({
    dayWrapper: {
        position: "relative",
    },
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: "0 2px",
        color: "inherit",
    },
    customDayHighlight: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: "2px",
        right: "2px",
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "50%",
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled,
    },
    highlightNonCurrentMonthDay: {
        color: "#676767",
    },
    highlight: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    firstHighlight: {
        extend: "highlight",
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
    },
    endHighlight: {
        extend: "highlight",
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
    },
}));

function makeJSDateObject(date: Date) {
    return new Date(date.getTime());
}

interface Props {
    value: Date;
    onWeekDatePickerSelect: (date: Date) => void;
}

const WeekDatePicker: React.FC<Props> = (props) => {
    const classes = useStyles(props);
    // const [selectedDate, setSelectedDate] = React.useState(props.value);
    const selectedDate = props.value;
  
    function handleDateChange(date: Date) {
        // setSelectedDate(startOfWeek(makeJSDateObject(date)));
        props.onWeekDatePickerSelect(
            date ? startOfWeek(makeJSDateObject(date)) : null);
    }

    function formatWeekSelectLabel(date: Date, invalidLabel: string) {
      let dateClone = makeJSDateObject(date);
  
      return dateClone && isValid(dateClone)
        ? `Week of ${format(startOfWeek(dateClone), "MMM do")}`
        : invalidLabel;
    };

    function renderWrappedWeekDay(date: Date, selectedDate: Date, dayInCurrentMonth: boolean) {
        let dateClone = makeJSDateObject(date);
        let selectedDateClone = makeJSDateObject(selectedDate);

        const start = startOfWeek(selectedDateClone);
        const end = endOfWeek(selectedDateClone);

        const dayIsBetween = isWithinInterval(dateClone, { start, end });
        const isFirstDay = isSameDay(dateClone, start);
        const isLastDay = isSameDay(dateClone, end);

        const wrapperClassName = clsx({
            [classes.highlight]: dayIsBetween,
            [classes.firstHighlight]: isFirstDay,
            [classes.endHighlight]: isLastDay,
        });

        const dayClassName = clsx(classes.day, {
            [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
            [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
        });

        return (
            <div className={wrapperClassName}>
            <IconButton className={dayClassName}>
                <span> {format(dateClone, "d")} </span>
            </IconButton>
            </div>
        );
    };
  
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="dense"
                id="select-date-range"
                label="取得する期間"
                inputVariant="outlined"
                value={selectedDate}
                renderDay={renderWrappedWeekDay}
                labelFunc={formatWeekSelectLabel}
                onChange={handleDateChange}
                maxDate={endOfWeek(new Date())}
                helperText="今週までの週を選択することができます。"
                InputProps={{
                    readOnly: true,
                }}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    );
}

export default WeekDatePicker;