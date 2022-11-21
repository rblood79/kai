
import React from 'react';
import styles from './index.module.scss';

const App = (props) => {
    return (
        <button
            className={styles.button}
            style={{
                width: props.width,
                height: props.height,
                background: props.background,
                borderRadius: props.radius,
                padding: props.padding,
                border: props.border,
                color: props.color
            }}
            type={props.type}
            onClick={props.onClick}>
            <span className={styles.label} style={{ color: props.color, fontSize: props.fontSize, }}>{props.label}</span>
            {props.children}
        </button>
    );
}

export default React.memo(App);

App.defaultProps = {
    background: 'var(--colorBase)',
};