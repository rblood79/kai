
import React from 'react';
import styles from './index.module.scss';

const App = (props) => {
    return (
        <button className={styles.button} style={{ background: props.background, color: props.color }} onClick={props.onClick}>{props.text}</button>
    );
}

export default React.memo(App);

App.defaultProps = {
    background: '#e5e7eb',
};