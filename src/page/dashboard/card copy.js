/*


*/
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useScroll, useGesture } from '@use-gesture/react'

import styles from './card.module.scss';
import classNames from 'classnames';

/*const clamp = (value, clampAt = 30) => {
    if (value > 0) {
        return value > clampAt ? clampAt : value;
    } else {
        return value < -clampAt ? -clampAt : value;
    }
};*/
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

    const elementRef = useRef(null);
    const totalWidth = useRef(0);
    const slotWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const index = useRef(0);

    const [{ x }, set] = useSpring(() => ({ x: 36 }));

    const elementRefCallback = useCallback(
        (el) => {
            if (el != null) {
                elementRef.current = el;
                totalWidth.current = el.scrollWidth - el.getBoundingClientRect().width;
                slotWidth.current = el.getBoundingClientRect().width;
            }
        },
        [elementRef]
    );




    const getCurrentIndex = (currentIndex, increment) => {
        if (increment > 0) {
            return (currentIndex + 1) % elementRef.current.children.length;
        }
        return currentIndex === 0 ? elementRef.current.children.length - 1 : currentIndex - 1;
    }
    const nextSlide = () => {
        index.current = getCurrentIndex(index.current, 1);
        setCurrentIndex(index.current);
        set({
            x: index.current * -1 * slotWidth.current
        });
    }

    const previuousSlide = () => {
        index.current = getCurrentIndex(index.current, -1);
        setCurrentIndex(index.current);
        set({
            x: index.current * -1 * slotWidth.current
        });
    }

    const bind = useGesture({
        onDrag: ({ active, movement: [mx], direction: [xDir], cancel }) => {
            if (active && Math.abs(mx) > (slotWidth.current - 72) * 0.5) {
                index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, elementRef.current.children.length - 1);
                cancel();
            }
            set({
                x: index.current * -1 * (slotWidth.current - 72) + (active ? mx + 36 : 36)
            });
            setCurrentIndex(index.current);
        },
        /*onDrag:(state) =>{
            console.log(state)
        }*/
    });

    return (
        <section className={classNames(styles.container)} style={{ height: windowDimenion.windHeight - 118 }}>

            <div className={styles.controller}>
                <div className={classNames(styles.item, styles.active)}>list</div>
                <div className={classNames(styles.item)}>grid</div>
            </div>
            {/*<button onClick={previuousSlide}>prev</button>
            <button onClick={nextSlide}>next</button>*/}

            <animated.div className={styles.contents} ref={elementRefCallback} {...bind()} style={{
                transform: x.to(x => `translateX(${x}px)`)
            }}>
                <div className={classNames(styles.item, currentIndex === 0 && styles.active)}>
                    <div>
                        <h3 className={styles.title}>Average Rate</h3>
                        <div>aaaa</div>
                    </div>
                </div>

                <div className={classNames(styles.item, currentIndex === 1 && styles.active)}>
                    <h3 className={styles.title}>KF-21-001</h3>
                </div>

                <div className={classNames(styles.item, currentIndex === 2 && styles.active)}>
                    <h3 className={styles.title}>KF-21-002</h3>
                </div>

                <div className={classNames(styles.item, currentIndex === 3 && styles.active)}>
                    <h3 className={styles.title}>KF-21-003</h3>
                </div>

                <div className={classNames(styles.item, currentIndex === 4 && styles.active)}>
                    <h3 className={styles.title}>KF-21-004</h3>
                </div>

                <div className={classNames(styles.item, currentIndex === 5 && styles.active)}>
                    <h3 className={styles.title}>KF-21-005</h3>
                </div>
            </animated.div>
        </section>
    );
}

export default App;
