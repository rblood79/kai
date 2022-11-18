
/*


*/

import React, { useState, useEffect } from 'react';
import { useSpring, animated, easings } from '@react-spring/web';
import { percentColor, gradient } from '../../util';
import styles from './itemRate.module.scss';

import classNames from 'classnames';

const App = (props) => {
    const [num, setNum] = useState(0);

    const { listNum, width } = useSpring({
        from: { listNum: 0, width: '0%' },
        to: async (next, cancel) => {
            await next({
                listNum: Number(num),
                width: Number(num) + '%'
            })
        },
        config: {
            duration: props.duration,
            easing: easings.easeInOutExpo
        },
    })

    useEffect(() => {
        setNum(props.active ? props.num : 0);
    }, [props.active, props.num])

    useEffect(() => {
        //console.log(props)
    }, [])

    return (
        <>
            {
                props.bar && <div className={classNames(styles.bar, props.type === 'GRID' && styles.grid)}>
                    <animated.span className={styles.value} style={{ width, background: gradient(num, -90) }} />
                </div>
            }
            <div className={classNames(styles.rate, props.type === 'GRID' && styles.grid, props.row && styles.row)}>
                <span className={styles.title}>Behavior Rate</span>
                <animated.span className={styles.text} style={{ color: percentColor(num) }}>
                    {
                        listNum.to(num => num.toFixed(2).padStart(5, '0') + '%')
                    }
                </animated.span>
            </div>

        </>
    )
}

export default React.memo(App);

App.defaultProps = {
    duration: 480,
    bar: true,
    row: false,
};