
import { useEffect, useState } from 'react';
import { useSpring, animated, easings, config } from '@react-spring/web';

import styles from './index.module.scss';

const App = (props) => {
    useEffect(() => {

    }, []);
    
    const bgWidth = 100 / props.label.length;
    const [index, setIndex] = useState(0)
    const { transform } = useSpring(
        {
            transform: "translateX(" + (index * 100) + "%)",
            config: { duration: 600, easing: easings.easeInOutExpo },
        }
    )

    const Item = props.label.map((item, index) => {
        return (
            <button className={styles.item} key={index}
                onClick={() => {
                    setIndex(index);
                    props.onChange(item);
                }}>{item}</button>
        )
    });

    return (
        <div className={styles.container}>
            <div className={styles.contents}>
                <animated.span className={styles.bg} style={{ width: bgWidth + '%', transform }} />
                {Item}
            </div>
        </div>
    );
}

export default App;

App.defaultProps = {
    background: '#e5e7eb',
};