
/*
* @date         : 2022-11-01
* @description  : app header
* @parameter    : title, comment
*/

import React from 'react';
import styles from './index.module.scss';

const Header = (props) => {
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

export default React.memo(Header);

Header.defaultProps = {

};