
import { useState, useEffect } from 'react';
import Button from '../button';
import _ from 'lodash';
import moment from 'moment';

import Sheet from '../sheet';

import classNames from 'classnames';
import styles from './index.module.scss';

import Date from './date';
import Time from './time';

const App = (props) => {

    const [navState, setNavState] = useState(false);
    const toggleNav = () => setNavState(!navState);

    const fnSelect = () => {
        console.log('fnSelect')
    }

    const textItem = () => {
        return (
            <input className={classNames(styles.input, props.required && styles.required, props.disabled && styles.disabled)}
                type="text"
                disabled={props.disabled}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => {
                    props.callBack((prevState) => {
                        return { ...prevState, [props.column]: e.target.value }
                    })
                }}
            />
        )
    }

    const findItem = () => {
        return (
            <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} >
                {props.value}
                <button className={styles.button} onClick={() => fnSelect()}>
                    <i className="ri-arrow-down-s-line" />
                </button>
            </div>
        )
    }

    
    const [date, setDate] = useState(props.value);
    const [time, setTime] = useState(props.value);

    const dateItem = () => {
        //console.log(props.value, moment(props.value).format('DD MMM YYYY, h:mm:ss'))
        //const [date, setDate] = useEffect(null);
        const callBack = (d, t) => {
            const temp = d.year + d.month + d.day + t.hour + t.min + t.sec;
            props.callBack((prevState) => {
                return { ...prevState, [props.column]: temp }
            })
            toggleNav();
        }
        return (
            <>
                <div className={styles.inputGroup}>
                    <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} onClick={toggleNav}>
                        {moment(props.value, 'YYYYMMDDHHmmss').format('YYYY/MM/DD')}
                        <i className="ri-calendar-2-line" />
                    </div>
                    <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} onClick={toggleNav}>
                        {moment(props.value, 'YYYYMMDDHHmmss').format('HH:mm:ss')}
                        <i className="ri-time-line" />
                    </div>
                </div>
                <Sheet title={props.label} state={navState} close={setNavState} type={'date'} apply={() => { callBack(date, time) }}>
                    {
                        <>
                            <Date type={'date'} callBack={setDate} data={props.value} state={navState} />
                            <Time type={'time'} callBack={setTime} data={props.value} state={navState} />
                        </>
                    }
                </Sheet>
            </>
        )
    }

    const dayItem = () => {

    }

    const timeItem = () => {

        const callBack = (t) => {
            const temp = t.hour + t.min + t.sec;
            props.callBack((prevState) => {
                return { ...prevState, [props.column]: temp }
            })
            toggleNav();
        }
        return (
            <>
                <div className={styles.inputGroup}>
                    <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} onClick={toggleNav}>
                        {moment(props.value, 'HHmmss').format('HH:mm:ss')}
                        <i className="ri-time-line" />
                    </div>
                </div>
                <Sheet title={props.label} state={navState} close={setNavState} type={'time'} apply={() => { callBack(time) }}>
                    {
                        <>
                            <Time type={'time'} callBack={setTime} data={props.value} state={navState} />
                        </>
                    }
                </Sheet>
            </>
        )
    }

    const selectItem = () => {

        const selectItem = _.find(props.data, { 'value': props.value })
        const callBack = (v) => {
            props.callBack((prevState) => {
                return { ...prevState, [props.column]: v }
            })
            toggleNav();
        }
        return (
            <>
                <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} onClick={toggleNav}>
                    {selectItem && selectItem.text}
                    <i className="ri-arrow-down-s-line" />
                </div>
                <Sheet title={props.label} state={navState} close={setNavState} type={'select'}>
                    <ul className={styles.select}>
                        {
                            props.data && props.data.map((item, index) => {
                                return (
                                    <li type={'list'} className={classNames(styles.selectList, props.value === item.value && styles.active)} key={index} onClick={() => { callBack(item.value) }}>
                                        {item.text}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Sheet>
            </>
        )
    }

    useEffect(() => {

    }, [])

    return (
        <div className={styles.form}>
            {
                props.label && <label className={styles.label}>{props.label}</label>
            }
            {
                props.type === 'find' ?
                    findItem() :
                    props.type === 'select' ?
                        selectItem() :
                        props.type === 'date' ?
                            dateItem() :
                            props.type === 'day' ?
                                dayItem() :
                                props.type === 'time' ?
                                    timeItem() : textItem()
            }
        </div>
    );
}

export default App;

App.defaultProps = {
    disabled: false,
    required: false,
};