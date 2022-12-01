/*


*/

import { useState, useRef} from 'react';

import { useGesture } from '@use-gesture/react';
import { useSprings } from '@react-spring/web';

import { Outlet, useOutletContext } from 'react-router-dom';

import { standalone } from '../../util';

import styles from './list.module.scss';
import classNames from 'classnames';

const clamp = (value, lower, upper) => {
    if (value < lower) return lower;
    if (value > upper) return upper;
    return value;
}

const App = () => {
    const index = useRef(0)
    const width = window.innerWidth - 96;

    const { type, data } = useOutletContext();
    const [currentIndex, setCurrentIndex] = useState(0);

    const [springs, api] = useSprings(data.length, i => ({
        x: (i * width) + 48,
        //y: 0,
        act: i === 0 ? 1 : 0,
        display: 'grid',
    }))

    const bind = useGesture({
        onDrag: ({ active, movement: [mx, my], direction: [xDir], cancel }) => {
            if (active && Math.abs(mx) > width / 2) {
                index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, data.length - 1)
                cancel()
                setCurrentIndex(index.current)
            }
            api.start(i => {
                if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
                const x = (i - index.current) * width + (active ? mx + 48 : 48)
                //const y = mx
                const act = i === index.current ? 1 : 0
                return {
                    x, act, display: 'grid',
                    config: {
                        mass: 1,
                        tension: 210,
                        friction: 26,
                    }
                }
            })
        }
    }, {
        drag: {
            //axis: 'lock'
        }
    });

    return (
        <>
            <section className={classNames(styles.container, type === 'LIST' ? styles.list : styles.grid)}>
                {
                    type === 'LIST' && index.current > 0 ? null : <span className={classNames(styles.copyright, standalone && styles.standalone)} />
                }
                <div className={styles.contents}>
                    {
                        springs.map((spring, index) => (
                            <Outlet context={{ bind, spring, data: data[index], type, index, currentIndex }} key={index} />
                        ))
                    }
                </div>



            </section>
        </>
    )
}

export default App;

App.defaultProps = {

};