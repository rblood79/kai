
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
    const fnDate = () => {
        console.log('fnDate')
    }
    const fnTime = () => {
        console.log('fnTime')
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

    /*const dateItem = () => {
        return (
            <div className={styles.inputGroup}>
                <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} >
                    {typeof (props.value) === 'object' && props.value.length > 1 ? props.value[0] : props.value}
                    <button className={styles.button} onClick={() => fnDate()}>
                        <i className="ri-calendar-2-line" />
                    </button>
                </div>
                {typeof (props.value) === 'object' && props.value.length > 1 && (
                    <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} >
                        {props.value[1]}
                        <button className={styles.button} onClick={() => fnDate()}>
                            <i className="ri-calendar-2-line" />
                        </button>
                    </div>
                )}
            </div>
        )
    }

    const timeItem = () => {
        const callBack = (v) => {
            props.callBack((prevState) => {
                return { ...prevState, [props.column]: v }
            })
            toggleNav();
        }
        return (
            <>
                <div className={styles.inputGroup}>
                    <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} onClick={toggleNav}>
                        {typeof (props.value) === 'object' && props.value.length > 1 ? props.value[0] : props.value}
                        <i className="ri-time-line" />
                    </div>
                    {typeof (props.value) === 'object' && props.value.length > 1 && (
                        <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} >
                            {props.value[1]}
                            <button className={styles.button} onClick={toggleNav}>
                                <i className="ri-time-line" />
                            </button>
                        </div>
                    )}
                </div>
                <Sheet title={props.label} state={navState} close={setNavState}>
                    {
                        <div>TIME</div>
                    }
                </Sheet>
            </>
        )
    }*/

    const [date, setDate] = useState(props.value);
    const [time, setTime] = useState(props.value);

    const dateItem = () => {
        //console.log(props.value, moment(props.value).format('DD MMM YYYY, h:mm:ss'))
        //const [date, setDate] = useEffect(null);


        const callBack = (d, t) => {
            const temp = d.year + d.month + d.day + t.hour + t.min + t.sec;//moment(d.year + d.month + d.day + t.hour + t.min + t.sec, 'YYYYMMDDHHmmss');
            props.callBack((prevState) => {
                return { ...prevState, [props.column]: temp }
            })
            toggleNav();
        }
        return (
            <>
                <div className={styles.inputGroup}>
                    <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} onClick={toggleNav}>
                        {props.value}
                        <i className="ri-calendar-2-line" />
                    </div>
                    <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} onClick={toggleNav}>
                        {props.value}
                        <i className="ri-time-line" />
                    </div>
                </div>
                <Sheet title={props.label} state={navState} close={setNavState}>
                    {
                        <>
                            <Date type={'date'} callBack={setDate} data={props.value} state={navState} />
                            <Time type={'time'} callBack={setTime} data={props.value} state={navState} />
                            <Button text={'Apply'} onClick={() => { callBack(date, time) }} />
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
                <Sheet title={props.label} state={navState} close={setNavState}>
                    {
                        props.data && props.data.map((item, index) => {
                            return (
                                <div className={classNames(styles.selectList, props.value === item.value && styles.active)} key={index} onClick={() => { callBack(item.value) }}>
                                    {item.text}
                                </div>
                            )
                        })
                    }
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
                            dateItem() : textItem()
            }
        </div>
    );
}

export default App;

App.defaultProps = {
    disabled: false,
    required: false,
};