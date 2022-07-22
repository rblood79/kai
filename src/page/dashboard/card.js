/*


*/
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useScroll } from "react-use-gesture";

import styles from './card.module.scss';
import classNames from 'classnames';

const clamp = (value, clampAt = 30) => {
    if (value > 0) {
        return value > clampAt ? clampAt : value;
    } else {
        return value < -clampAt ? -clampAt : value;
    }
};

const App = () => {
    const [windowDimenion, detectHW] = useState({
        windWidth: window.innerWidth,
        windHeight: window.innerHeight,
    });


    const [style, set] = useSpring(() => ({
        transform: "perspective(1000px) rotateY(0deg)"
    }));

    const bind = useScroll(event => {
        //console.log(event)
        set({
            transform: `perspective(500px) rotateY(${event.scrolling ? clamp(event.delta[0]) : 0
                }deg)`
        });
    });

    return (
        <section className={classNames(styles.container)} style={{ height: windowDimenion.windHeight - 118 }}>

            <div className={styles.controller}>
                <div className={classNames(styles.item, styles.active)}>list</div>
                <div className={classNames(styles.item)}>grid</div>
            </div>

            <div className={styles.contents} {...bind()}>

                <animated.div style={style} className={classNames(styles.item, styles.active)}>
                    <h3 className={styles.title}>Average Rate</h3>
                </animated.div>

                <animated.div style={style} className={classNames(styles.item)}>
                    <h3 className={styles.title}>KF-21-001</h3>
                </animated.div>

                <animated.div  style={style} className={classNames(styles.item)}>
                    <h3 className={styles.title}>KF-21-002</h3>
                </animated.div>

                <animated.div  style={style} className={classNames(styles.item)}>
                    <h3 className={styles.title}>KF-21-003</h3>
                </animated.div>

                <animated.div  style={style} className={classNames(styles.item)}>
                    <h3 className={styles.title}>KF-21-004</h3>
                </animated.div>

                <animated.div  style={style} className={classNames(styles.item)}>
                    <h3 className={styles.title}>KF-21-005</h3>
                </animated.div>
            </div>
        </section>
    );
}

export default App;
