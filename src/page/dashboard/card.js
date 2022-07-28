/*


*/
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useDrag, useGesture } from '@use-gesture/react'

import styles from './card.module.scss';
import classNames from 'classnames';


const clamp = (value, lower, upper) => {
    if (value < lower) return lower;
    if (value > upper) return upper;
    return value;
}

const App = () => {
    const [windowDimenion, detectHW] = useState({
        windWidth: window.innerWidth,
        windHeight: window.innerHeight,
    });
    const [type, setType] = useState('list');

    const [currentIndex, setCurrentIndex] = useState(0);
    const index = useRef(0);

    const [{ x, y }, api] = useSpring(() => ({ x: 36, y: 0 }));

    /*const bind = useGesture({
        onDrag: ({ active, movement: [mx, my], direction: [xDir], cancel }) => {
            if (active && Math.abs(mx) > (windowDimenion.windWidth - 72) * 0.5) {
                index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, 6);
                cancel()
            }
            api.start({ 
                x: index.current * -1 * (windowDimenion.windWidth - 72) + (active ? mx + 36 : 36),
                y: active ? my : 0
            })

            setCurrentIndex(index.current);
        },
    });*/

    const bind = useDrag(
        ({ active, movement: [mx, my], direction: [xDir], cancel }) => {
            if (active && Math.abs(mx) > (windowDimenion.windWidth - 72) * 0.5) {
                index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, 6);
                cancel()
            }
            api.start({
                x: index.current * -1 * (windowDimenion.windWidth - 72) + (active ? mx + 36 : 36),
                y: active ? my : 0
            })
            setCurrentIndex(index.current);
        },
        { axis: 'lock' }
    )

    return (
        <section className={classNames(styles.container)} style={{ height: windowDimenion.windHeight - 118 }}>

            <div className={styles.controller}>
                <div className={classNames(styles.type, type === 'list' && styles.active)}>
                    <button className={classNames(type === 'list' && styles.active)} onClick={() => { setType('list') }}>LIST</button>
                    <button className={classNames(type === 'grid' && styles.active)} onClick={() => { setType('grid') }}>GRID</button>
                </div>
            </div>

            <animated.div className={styles.contents} {...bind()} style={{ x, y }} >

                <div className={classNames(styles.item, currentIndex === 0 && styles.active)}>
                    <div className={styles.itemWrap}>
                        <h3 className={styles.title}>Average Rate</h3>
                        <div className={styles.itemBody}>Base Group A</div>
                    </div>
                </div>

                <div className={classNames(styles.item, currentIndex === 1 && styles.active)}>
                    <div className={styles.itemWrap}>
                        <h3 className={styles.title}>KF-21-001</h3>
                        <div className={styles.itemBody}>First Intro</div>
                    </div>
                </div>

                <div className={classNames(styles.item, currentIndex === 2 && styles.active)}>
                    <div className={styles.itemWrap}>
                        <h3 className={styles.title}>KF-21-002</h3>
                        <div className={styles.itemBody}>aaaa</div>
                    </div>
                </div>

                <div className={classNames(styles.item, currentIndex === 3 && styles.active)}>
                    <div className={styles.itemWrap}>
                        <h3 className={styles.title}>KF-21-003</h3>
                        <div className={styles.itemBody}>aaaa</div>
                    </div>
                </div>

                <div className={classNames(styles.item, currentIndex === 4 && styles.active)}>
                    <div className={styles.itemWrap}>
                        <h3 className={styles.title}>KF-21-004</h3>
                        <div className={styles.itemBody}>aaaa</div>
                    </div>
                </div>

                <div className={classNames(styles.item, currentIndex === 5 && styles.active)}>
                    <div className={styles.itemWrap}>
                        <h3 className={styles.title}>KF-21-005</h3>
                        <div className={styles.itemBody}>aaaa</div>
                    </div>
                </div>
            </animated.div>
        </section>
    );
}

export default App;
