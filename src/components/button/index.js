
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
                borderRadius: props.radius
            }}
            onClick={props.onClick}>
            {props.text}
        </button>
    );
}

export default React.memo(App);

App.defaultProps = {
    background: '#e5e7eb',
};