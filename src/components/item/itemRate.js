
/*


*/

import React, { useState, useEffect } from 'react';
import { useSpring, animated, easings } from '@react-spring/web';
import { percentColor, gradient } from '../../util';
import styles from './itemRate.module.scss';

import classNames from 'classnames';

const App = (props) => {
    const [def, setDef] = useState(false);
    const [num, setNum] = useState(0);
    const { listNum, width } = useSpring({
        from: { listNum: 0, width: '0%' },
        to: async (next, cancel) => {
            await next({
                listNum: Number(num),
                width: Number(num) + '%',
            })
        },
        config: {
            duration: props.duration,
            easing: easings.easeInOutExpo
        },
        delay: props.delay,
        onStart: () => {
            setDef(true)
        },
    })

    useEffect(() => {
        setNum(props.active ? props.num : 0);
        setDef(false)
    }, [props.active, props.num])

    return (
        <>
            {
                props.duration > 0 ?
                    <>
                        {
                            props.bar && <div className={classNames(styles.bar, props.type === 'GRID' && styles.grid)}>
                                <animated.span className={styles.value} style={{ width, background: gradient(num, -90) }} />
                            </div>
                        }
                        <div className={classNames(styles.rate, props.type === 'GRID' && styles.grid, props.row && styles.row)}>
                            <span className={styles.title}>{props.label}</span>
                            <animated.span className={styles.text} style={{ color: percentColor(num) }}>
                                {
                                    def ?
                                        listNum.to(num => num.toFixed(2).padStart(5, '0') + '%') :
                                        '00.00%'
                                }
                            </animated.span>
                        </div>
                    </> :

                    <>
                        {
                            props.bar && <div className={classNames(styles.bar, props.type === 'GRID' && styles.grid)}>
                                <span className={styles.value} style={{ width: Number(num) + '%', background: gradient(num, -90) }} />
                            </div>
                        }
                        <div className={classNames(styles.rate, props.type === 'GRID' && styles.grid, props.row && styles.row)}>
                            <span className={styles.title}>{props.label}</span>
                            <span className={styles.text} style={{ color: percentColor(num) }}>
                                {Number(num).toFixed(2).padStart(5, '0') + '%'}
                            </span>
                        </div>
                    </>
            }
        </>
    )
}

export default React.memo(App);

App.defaultProps = {
    label: 'label',
    duration: 480,
    delay: 240,
    bar: true,
    row: false,
};