/*


*/
import { useEffect, useState, useRef } from 'react';
import { useSprings, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react'

import { useOutletContext, Link } from 'react-router-dom';

import styles from './list.module.scss';
import classNames from 'classnames';

const data = [
    {
        id: 'total',
        title: 'Average Rate',
        info: 'Base Group A',
        rate: '78%',
        image: 'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        id:'001',
        title: 'KF-21-001',
        info: 'First Intro',
        rate: '89%',
        image: 'https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        id:'002',
        title: 'KF-21-002',
        info: 'First Intro',
        rate: '76%',
        image: 'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        id:'003',
        title: 'KF-21-003',
        info: 'First Intro',
        rate: '69%',
        image: 'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        id:'004',
        title: 'KF-21-004',
        info: 'First Intro',
        rate: '51%',
        image: 'https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
    {
        id:'005',
        title: 'KF-21-005',
        info: 'First Intro',
        rate: '44%',
        image: 'https://images.pexels.com/photos/4016596/pexels-photo-4016596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    },
]

const clamp = (value, lower, upper) => {
    if (value < lower) return lower;
    if (value > upper) return upper;
    return value;
}

const App = () => {
    const { type } = useOutletContext();

    const [currentIndex, setCurrentIndex] = useState(0);
    const index = useRef(0)
    const width = window.innerWidth - 96

    const [props, api] = useSprings(data.length, i => ({
        x: (i * width) + 48,
        y: 0,
        scale: i === 0 ? 1 : 0.8,
        //display: 'flex',
    }))

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

    useEffect(() => {
        
    },[])
    return (
        <section className={classNames(styles.container)}>
            {
                type === 'list' ?
                    <div className={styles.listContents}>
                        {props.map(({ x, y, display, scale }, i) => (
                            <animated.div className={classNames(styles.item)} {...bind()} key={i} style={{ display, x, scale }}>
                                <h3 className={styles.title}>{data[i].title}{currentIndex}</h3>
                                <div className={styles.itemBody}>{data[i].info}</div>
                                <Link to={data[i].id}>Detail View</Link>
                            </animated.div>
                        ))}
                    </div>
                    :
                    <div className={styles.gridContents}>
                        {props.map(({ x, y }, i) => (
                            <animated.div className={classNames(styles.item)} key={i}>
                                <h3 className={styles.title}>{data[i].title}{currentIndex}</h3>
                                <div className={styles.rate}>{data[i].rate}</div>
                                <Link to={data[i].id}>Detail</Link>
                            </animated.div>
                        ))}
                    </div>
            }
        </section>

    )
}

export default App;
