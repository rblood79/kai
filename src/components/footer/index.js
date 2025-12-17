
/*
* @date         : 2022-11-01
* @description  : app bottom
* @parameter    : not used
*/

import React from 'react';
import styles from './index.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footer}>copyright KF-21 LIS</footer>
    );
}

export default React.memo(Footer);

Footer.defaultProps = {

};