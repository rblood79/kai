
/*


*/
import aircraftFront from '../../images/aircraftFront@3x.png';
import aircraftSide from '../../images/aircraftLeft@3x.png';
import aircraftTop from '../../images/aircraftTop@3x.png';

import React, { useEffect } from 'react';


import styles from './itemDefect.module.scss';
import classNames from 'classnames';

const App = (props) => {

    useEffect(() => {
    }, [])

    return (
        <div className={styles.container}>
            <span className={styles.baseIcon}><i className={props.icon}></i></span>
            <div className={styles.list}>
                <div className={classNames(styles.item, styles.image)}>
                    <img className={styles.aircraft} src={aircraftFront} alt='aircraft' />
                    <span className={styles.title}>Front</span>
                </div>
                <div className={classNames(styles.item, styles.image)}>
                    <img className={styles.aircraft} src={aircraftSide} alt='aircraft' />
                    <span className={styles.title}>Side</span>
                </div>
                <div className={classNames(styles.item, styles.image)}>
                    <img className={styles.aircraft} src={aircraftTop} alt='aircraft' />
                    <span className={styles.title}>Top</span>
                </div>
            </div>
        </div>
    )
}

export default React.memo(App);

App.defaultProps = {
    icon: 'ri-tools-fill'
};