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

    /*const bind = useScroll(event => {
        console.log('aaa', slotWidth.current)
    });*/
    /*const bind = useGesture({
        onDrag: ({ offset: [x], down, direction: [xDir], cancel, distance, movement: [xMove] }) => {
            console.log('aaa', xMove)
        }
    })*/
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
        onDrag: ({ down, distance, velocity, delta: [xDelta], direction: [xDir], cancel }) => {
            console.log(distance[0] > slotWidth.current / 2)
            if (down && (distance[0] > slotWidth.current / 2 || velocity > 2)) {
                
                cancel();
                index.current = clamp(
                    index.current + (xDir > 0 ? -1 : 1),
                    0,
                    5
                );
                set({
                    x: index.current * -1 * slotWidth.current + (down ? (xDelta / slotWidth.current) * slotWidth.current : 0)
                });
                //console.log(x)
                setCurrentIndex(index.current);
            }else{
                //console.log('ssfes')
            }
        }
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
            <div className={styles.contents} ref={elementRefCallback} {...bind()} style={{
                display: "flex",
                transform: x.interpolate(x => `translate3d(${x}px,0,0)`)
            }}>

                <div className={classNames(styles.item, currentIndex === 0 && styles.active)}>
                    <h3 className={styles.title}>Average Rate</h3>
                </div>

                <div className={classNames(styles.item, currentIndex === 1 && styles.active)}>
                    <h3 className={styles.title}>KF-21-001</h3>
                </div>

                <div className={classNames(styles.item)}>
                    <h3 className={styles.title}>KF-21-002</h3>
                </div>

                <div className={classNames(styles.item)}>
                    <h3 className={styles.title}>KF-21-003</h3>
                </div>

                <div className={classNames(styles.item)}>
                    <h3 className={styles.title}>KF-21-004</h3>
                </div>

                <div className={classNames(styles.item)}>
                    <h3 className={styles.title}>KF-21-005</h3>
                </div>
            </div>
        </section>
    );
}

export default App;
