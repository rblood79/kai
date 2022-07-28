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

    const elementRef = useRef(null);
    const totalWidth = useRef(0);
    const slotWidth = useRef(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const index = useRef(0);

    const [{ x, y }, set] = useSpring(() => ({ x: 36, y :0 }));

    const elementRefCallback = useCallback(
        (el) => {
            if (el != null) {
                elementRef.current = el;
                totalWidth.current = el.scrollWidth - el.getBoundingClientRect().width;
                slotWidth.current = el.getBoundingClientRect().width;
                console.log(slotWidth.current)
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
            x: index.current * -1 * (slotWidth.current - 96)
        });
    }

    const previuousSlide = () => {
        index.current = getCurrentIndex(index.current, -1);
        setCurrentIndex(index.current);
        set({
            x: index.current * -1 * (slotWidth.current - 96)
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

    const bind2 = useDrag(({ down, movement: [mx, my] }) => {
        set.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
    })

    return (
        <section className={classNames(styles.container)} style={{ height: windowDimenion.windHeight - 118 }}>

            <div className={styles.controller}>
                <div className={classNames(styles.type, type === 'list' && styles.active)}>
                    <button className={classNames(type === 'list' && styles.active)} onClick={() => { setType('list') }}>LIST</button>
                    <button className={classNames(type === 'grid' && styles.active)} onClick={() => { setType('grid') }}>GRID</button>
                </div>
            </div>
            {/*<button onClick={previuousSlide}>prev</button>
            <button onClick={nextSlide}>next</button>*/}

            <animated.div className={styles.contents} {...bind2()} style={{ x }} >

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
                        <h3 className={styles.title}>KF-21-011</h3>
                        <div className={styles.itemBody}>aaaa</div>
                    </div>
                </div>

                <div className={classNames(styles.item, currentIndex === 4 && styles.active)}>
                    <div className={styles.itemWrap}>
                        <h3 className={styles.title}>KF-21-012</h3>
                        <div className={styles.itemBody}>aaaa</div>
                    </div>
                </div>

                <div className={classNames(styles.item, currentIndex === 5 && styles.active)}>
                    <div className={styles.itemWrap}>
                        <h3 className={styles.title}>KF-21-014</h3>
                        <div className={styles.itemBody}>aaaa</div>
                    </div>
                </div>
            </animated.div>
        </section>
    );
}

export default App;
