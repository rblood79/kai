
import React from 'react';
import styles from './index.module.scss';

const App = (props) => {
    return (
        <button
            className={styles.button}
            style={{
                width: props.width,
                height: props.height,
                fontSize: props.fontSize,
                background: props.background,
                color: props.color,
                borderRadius: props.radius,
                padding: props.padding,
                border: props.border,
            }}
            type={props.type}
            onClick={props.onClick}>
            {props.text}
            {props.children}
        </button>
    );
}

export default React.memo(App);

App.defaultProps = {
    background: '#e5e7eb',
};