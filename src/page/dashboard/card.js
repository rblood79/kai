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
        <section className={classNames(styles.container)} style={{ height: windowDimenion.windHeight - 112 }}>
            <div className={styles.contents}>
                
                <div className={styles.item}>
                    <h3>Average Rate</h3>
                </div>

                <div className={styles.item}>
                    BB
                </div>
                <div className={styles.item}>
                    CC
                </div>
                <div className={styles.item}>
                    DD
                </div>
            </div>
        </section>
    );
}

export default App;
