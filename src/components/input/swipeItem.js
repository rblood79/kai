

import { useEffect, useState, useRef } from 'react';
import { useGesture } from '@use-gesture/react'
import { useSprings, animated, easings, config } from '@react-spring/web';

import _ from 'lodash';
import moment from 'moment';

import styles from './swipeItem.module.scss';

const clamp = (value, lower, upper) => {
    if (value < lower) return lower;
    if (value > upper) return upper;
    return value;
}


const height = 48;

const App = (props) => {
    const [data, setData] = useState(props.data)
    const [currentIndex, setCurrentIndex] = useState(0);
    const index = useRef(0)
    const [prop, api] = useSprings(data.length, i => ({
        y: i * height,
    }))

    const bind = useGesture({
        onDrag: ({ active, movement: [mx, my], direction: [xDir, yDir], cancel }) => {
            if (active && Math.abs(my) > height / 2) {
                index.current = clamp(index.current + (yDir > 0 ? -1 : 1), 0, data.length - 1)
                
                cancel()
            }
            api.start(i => {
                if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
                const y = (i - index.current) * height + (active ? my : 0)
                setCurrentIndex(index.current)
                return {
                    y, display: 'grid',
                }
            })
        }
    }, {
        drag: { axis: 'lock' }
    });


    useEffect(() => {
        props.callBack && props.callBack(data[currentIndex])
    }, [currentIndex])

    useEffect(() => {
        props.data && setData(props.data)
    }, [props])

    return (
        <div className={styles.container}>
            <ul className={styles.contents}>
                {
                    prop.map(({ x, y, display }, i) => (
                        <animated.li className={styles.item} {...bind()} key={i} style={{ display, y }}>
                            {data[i]}
                        </animated.li>
                    ))
                }
            </ul>
        </div>
    );
}

export default App;

App.defaultProps = {
    disabled: false,
    required: false,
};