
/*
* @date         : 2022-11-01
* @description  : app tab
* @parameter    : label, background, padding
*/

import React, { useEffect, useState } from 'react';
import { useSpring, animated, easings } from '@react-spring/web';

import styles from './index.module.scss';

const App = (props) => {
    const bgWidth = 100 / props.label.length;
    const [active, setActive] = useState(0)

    const { transform } = useSpring(
        {
            transform: "translateX(" + (active * 100) + "%)",
            config: { duration: 480, easing: easings.easeInOutExpo },
        }
    )

    const Item = props.label.map((item, index) => {
        return (
            <button className={styles.item} key={index}
                onClick={() => {
                    setActive(index);
                    props.onChange(item);
                }}>{item}</button>
        )
    });

    useEffect(() => {
    }, []);

    return (
        <div className={styles.container} style={{ padding: props.padding }}>
            <div className={styles.contents} style={{ background: props.background }}>
                <div className={styles.list}>
                    <animated.span className={styles.bg} style={{ width: bgWidth + '%', transform }} />
                    {Item}
                </div>
            </div>
        </div>
    );
}

export default React.memo(App);

App.defaultProps = {
    margin: '0px',
    background: 'var(--colorSecondary)',
};