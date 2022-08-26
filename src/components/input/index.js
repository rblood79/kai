
import classNames from 'classnames';
import styles from './index.module.scss';

const App = (props) => {
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
        return (
            <>
                <div className={classNames(styles.input, styles.rightButton, props.required && styles.required, props.disabled && styles.disabled)} >
                    {props.value}
                    <button className={styles.button} onClick={() => fnSelect()}>
                        <i className="ri-arrow-down-s-line" />
                    </button>
                </div>
                <div className={styles.list}>
                    list
                </div>
            </>
        )
    }

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