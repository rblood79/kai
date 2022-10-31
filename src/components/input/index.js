
import React, { useState, useEffect } from 'react';
//import Button from '../button';
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
                autoComplete={props.autoComplete}
                disabled={props.disabled}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => {
                    props.onChange((prevState) => {
                        return { ...prevState, [props.column]: e.target.value }
                    })
                }}
            />
        )
    }

    const passItem = () => {
        return (
            <input className={classNames(styles.input, props.required && styles.required, props.disabled && styles.disabled)}
                type="password"
                autoComplete={props.autoComplete}
                disabled={props.disabled}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => {
                    props.onChange((prevState) => {
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
        const defFormat = 'YYYYMMDDHHmmss';

        const callBack = (d, t) => {
            const temp = d.year + d.month + d.day + t.hour + t.min + t.sec;
            props.onChange((prevState) => {
                return { ...prevState, [props.column]: temp }
            })
            toggleNav();
        }
        return (
            <>
                <div className={styles.inputGroup}>
                    <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} onClick={toggleNav}>
                        {moment(props.value, defFormat).format('YYYY/MM/DD')}
                        <i className="ri-calendar-2-line" />
                    </div>
                    <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} onClick={toggleNav}>
                        {moment(props.value, defFormat).format('HH:mm:ss')}
                        <i className="ri-time-line" />
                    </div>
                </div>
                <Sheet title={props.label} state={navState} close={setNavState} type={'date'} apply={() => { callBack(date, time) }}>
                    {
                        <>
                            <Date type={'date'} format={defFormat} callBack={setDate} data={props.value} state={navState} />
                            <Time type={'time'} format={defFormat} callBack={setTime} data={props.value} state={navState} />
                        </>
                    }
                </Sheet>
            </>
        )
    }

    const dayItem = () => {

    }

    const timeItem = () => {

        const defFormat = 'HHmmss';

        const callBack = (t) => {
            const temp = t.hour + t.min + t.sec;
            props.onChange((prevState) => {
                return { ...prevState, [props.column]: temp }
            })
            toggleNav();
        }

        return (
            <>
                <div className={styles.inputGroup}>
                    <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} onClick={toggleNav}>
                        {moment(props.value, defFormat).format('HH:mm:ss')}
                        <i className="ri-time-line" />
                    </div>
                </div>
                <Sheet title={props.label} state={navState} close={setNavState} type={'time'} apply={() => { callBack(time) }}>
                    {
                        <>
                            <Time type={'time'} format={defFormat} callBack={setTime} data={props.value} state={navState} />
                        </>
                    }
                </Sheet>
            </>
        )
    }

    const selectItem = () => {

        const selectItem = _.find(props.data, { 'value': props.value })
        const callBack = (v) => {
            props.onChange((prevState) => {
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

    const checkItem = () => {
        //console.log(props.value, typeof(props.value))
        const tempArray = !props.value ? [] : props.value;
        
        const callBack = (v, c) => {
            if(c){
                tempArray.push(v)
            }else{
                const idx = tempArray.indexOf(v)
                tempArray.splice(idx, 1)
            }

            props.onChange((prevState) => {
                console.log(tempArray)
                return { ...prevState, [props.column]: tempArray}
            })
        }
        return (
            <div className={styles.radio} style={{ gridTemplateColumns: 'repeat(' + props.columns + ', 1fr)' }}>
                {
                    props.data && props.data.map((item, index) => {
                        return (
                            <div key={index} className={styles.item}>
                                <input type='checkbox' name={props.label} id={props.label + item.value} value={item.value}
                                    
                                    //checked={props.value && props.value.indexOf(item.value) > -1}
                                    onChange={(e) => {
                                        callBack(e.target.value, e.target.checked)
                                    }}
                                />
                                <label htmlFor={props.label + item.value}>{item.text}</label>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const radioItem = () => {
        const callBack = (v) => {
            props.onChange((prevState) => {
                return { ...prevState, [props.column]: v }
            })
        }

        return (
            <div className={styles.radio} style={{ gridTemplateColumns: 'repeat(' + props.columns + ', 1fr)' }}>
                {
                    props.data && props.data.map((item, index) => {
                        return (
                            <div key={index} className={styles.item}>
                                <input type='radio' name={props.label} id={props.label + item.value} value={item.value}
                                    checked={item.value === props.value}
                                    onChange={(e) => {
                                        callBack(e.target.value)
                                    }}
                                />
                                <label htmlFor={props.label + item.value}>{item.text}</label>
                            </div>
                        )
                    })
                }
            </div>
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
                props.type === 'checkbox' ?
                    checkItem() :
                    props.type === 'radio' ?
                        radioItem() :
                        props.type === 'find' ?
                            findItem() :
                            props.type === 'select' ?
                                selectItem() :
                                props.type === 'date' ?
                                    dateItem() :
                                    props.type === 'day' ?
                                        dayItem() :
                                        props.type === 'time' ?
                                            timeItem() :
                                            props.type === 'password' ?
                                                passItem() : textItem()
            }
        </div>
    );
}

export default React.memo(App);

App.defaultProps = {
    disabled: false,
    required: false,
    autoComplete: "off",
    columns: 2,
};