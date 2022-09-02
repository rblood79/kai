
import { useState, useEffect } from 'react';

import Sheet from '../sheet';

import classNames from 'classnames';
import styles from './index.module.scss';

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

    const dateItem = () => {
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
        return (
            <div className={styles.inputGroup}>
                <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} >
                    {typeof (props.value) === 'object' && props.value.length > 1 ? props.value[0] : props.value}
                    <button className={styles.button} onClick={() => fnTime()}>
                        <i className="ri-time-line" />
                    </button>
                </div>
                {typeof (props.value) === 'object' && props.value.length > 1 && (
                    <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} >
                        {props.value[1]}
                        <button className={styles.button} onClick={() => fnTime()}>
                            <i className="ri-time-line" />
                        </button>
                    </div>
                )}
            </div>
        )
    }

    const selectItem = () => {
        const callBack = (v) => {
            props.callBack((prevState) => {
                return { ...prevState, [props.column]: v }
            })
            toggleNav();
        }
        return (
            <>
                <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} >
                    {props.value}
                    <button className={styles.button} onClick={toggleNav}>
                        <i className="ri-arrow-down-s-line" />
                    </button>
                </div>
                <Sheet title={props.label} state={navState} close={setNavState}>
                    {
                        props.data && props.data.map((item, index) => {
                            return (
                                <div key={index} onClick={() => { callBack(item.value) }}>{item.text}</div>
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
                            dateItem() :
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