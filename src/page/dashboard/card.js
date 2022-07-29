/*


*/
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpring, useSprings, animated } from '@react-spring/web';
import { useDrag, useGesture } from '@use-gesture/react'

import styles from './card.module.scss';
import classNames from 'classnames';

const data = [
    {
        title: 'Average Rate',
        info: 'Base Group A',
        image: 'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        title: 'KF-21-001',
        info: 'First Intro',
        image: 'https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        title: 'KF-21-002',
        info: 'First Intro',
        image: 'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        title: 'KF-21-003',
        info: 'First Intro',
        image: 'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
]

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
    const index = useRef(0)
    const width = window.innerWidth - 96

    const [props, api] = useSprings(data.length, i => ({
        x: (i * width) + 48,
        scale: i === 0 ? 1 : 0.8,
        y: 0,
        //display: 'flex',
    }))
    //const [{ x, y, scale }, api] = useSpring(() => ({ x: 36, y: 0, scale: 1 }));

    const bind = useGesture({
        onDrag: ({ active, movement: [mx, my], direction: [xDir], cancel }) => {
            if (active && Math.abs(mx) > width / 2) {
                index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, data.length - 1)
                cancel()
            }
            api.start(i => {
                if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
                const x = (i - index.current) * width + (active ? mx + 48 : 48)
                const y = active ? my : 0
                const scale = i === index.current ? 1 : 0.8
                setCurrentIndex(index.current)
                return { x, y, scale, display: 'flex' }
            })
        }
    }, {
        drag: { axis: 'lock' }
    });

    /*const bind = useDrag(({ active, movement: [mx], direction: [xDir], cancel }) => {
        if (active && Math.abs(mx) > width / 2) {
            index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, data.length - 1)
            cancel()
        }
        api.start(i => {
            if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
            const x = (i - index.current) * width + (active ? mx + 48 : 48)
            const scale = i === index.current ? 1 : 0.8
            setCurrentIndex(index.current)
            return { x, scale, display: 'flex' }
        })
    })*/
    return (
        <section className={classNames(styles.container)}>
            <div className={styles.controller}>
                <div className={classNames(styles.type, type === 'list' && styles.active)}>
                    <button className={classNames(type === 'list' && styles.active)} onClick={() => { setType('list') }}>LIST</button>
                    <button className={classNames(type === 'grid' && styles.active)} onClick={() => { setType('grid') }}>GRID</button>
                </div>
            </div>
            <div className={styles.contents}>
                {props.map(({ x, y, display, scale }, i) => (
                    <animated.div className={classNames(styles.item)} {...bind()} key={i} style={{ display, x, y, scale }}>
                        <h3 className={styles.title}>{data[i].title}{currentIndex}</h3>
                        <div className={styles.itemBody}>{data[i].info}</div>
                    </animated.div>
                ))}
            </div>
        </section>
    );
}

export default App;
