
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
            <animated.button className={styles.item} key={index}
                onClick={() => {
                    setActive(index);
                    props.onChange(item);
                }}>{item}</animated.button>
        )
    });

    useEffect(() => {
    }, []);

    return (
        <div className={styles.container} style={{ margin: props.margin }}>
            <div className={styles.contents}>
                <animated.span className={styles.bg} style={{ width: bgWidth + '%', transform }} />
                {Item}
            </div>
        </div>
    );
}

export default React.memo(App);

App.defaultProps = {
    margin: '0px',
};