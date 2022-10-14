/*


*/
import React from 'react';
import styles from './index.module.scss';

const App = (props) => {
    return (
        <header className={styles.header}>
            <div className={styles.title}>
                {props.title}
            </div>
            <span className={styles.date}>
                {props.comment}
            </span>
        </header>
    );
}

export default React.memo(App);

App.defaultProps = {

};