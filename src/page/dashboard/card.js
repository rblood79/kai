/*


*/
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, animated, a } from '@react-spring/web';
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
function clamp(value, lower, upper) {
    if (value < lower) return lower;
    if (value > upper) return upper;
    console.log('//', value)
    return value;
}
const App = () => {
    const elementRef = useRef(null);
    const totalWidth = useRef(0);
    const slotWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const index = useRef(0);

    const [{ x }, set] = useSpring(() => ({ x: 0 }));

    const elementRefCallback = useCallback(
        (el) => {
            if (el != null) {
                console.log(el.scrollWidth, el.getBoundingClientRect().width)
                elementRef.current = el;
                totalWidth.current = el.scrollWidth - el.getBoundingClientRect().width;
                slotWidth.current = el.getBoundingClientRect().width;
            }
        },
        [elementRef]
    );


    const [windowDimenion, detectHW] = useState({
        windWidth: window.innerWidth,
        windHeight: window.innerHeight,
    });

    function getCurrentIndex(currentIndex, increment) {
        if (increment > 0) {
            return (currentIndex + 1) % 6;
        }
        return currentIndex === 0 ? 5 : currentIndex - 1;
    }
    function nextSlide() {
        index.current = getCurrentIndex(index.current, 1);
        setCurrentIndex(index.current);
        set({
            x: index.current * -1 * slotWidth.current
        });
    }

    function previuousSlide() {
        index.current = getCurrentIndex(index.current, -1);
        setCurrentIndex(index.current);
        set({
            x: index.current * -1 * slotWidth.current
        });
    }

    const bind = useGesture({
        onDrag: ({ down, distance, velocity, delta: [xDelta, yDelta], direction: [xDir], cancel }) => {
            if (down && (distance[0] > slotWidth.current * 0.5 || velocity > 2)) {
                cancel();
                index.current = clamp(
                    index.current + (xDir > 0 ? -1 : 1),
                    0,
                    5
                );
            }
            console.log(x)
            set({
                x: index.current * -1 * slotWidth.current + (down ? (xDelta * 10 / slotWidth.current) * slotWidth.current : 0)
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
            <div>{currentIndex}</div>
            <button onClick={previuousSlide}>Previous</button>
            <button onClick={nextSlide}>Next</button>

            <animated.div className={styles.contents} ref={elementRefCallback} {...bind()} style={{
                //display: "flex",
                transform: x.to(x => `translateX(${x}px)`)
            }}>

                <div className={classNames(styles.item, currentIndex === 0 && styles.active)}>
                    <h3 className={styles.title}>Average Rate</h3>
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
