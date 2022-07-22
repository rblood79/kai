/*


*/
import { useState, useEffect } from 'react';

import styles from './card.module.scss';
import classNames from 'classnames';


const App = () => {
    const [windowDimenion, detectHW] = useState({
        windWidth: window.innerWidth,
        windHeight: window.innerHeight,
    });
    /*const detectSize = () => {
        detectHW({
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        })
    }
    useEffect(() => {
        window.addEventListener('resize', detectSize)

        return () => {
            window.removeEventListener('resize', detectSize)
        }
    }, [windowDimenion])*/
    return (
        <section className={classNames(styles.container)} style={{ height: windowDimenion.windHeight - 120 }}>

            <div className={styles.controller}>
                <div className={classNames(styles.item, styles.active)}>list</div>
                <div className={classNames(styles.item)}>grid</div>
            </div>

            <div className={styles.contents}>

                <div className={classNames(styles.item, styles.active)}>
                    <h3 className={styles.title}>Average Rate</h3>
                </div>

                <div className={styles.item}>
                    <h3 className={styles.title}>KF-21-001</h3>
                </div>
                <div className={styles.item}>
                    <h3 className={styles.title}>KF-21-002</h3>
                </div>
                <div className={styles.item}>
                    <h3 className={styles.title}>KF-21-003</h3>
                </div>
            </div>
        </section>
    );
}

export default App;
