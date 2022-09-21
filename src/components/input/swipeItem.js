

import { useEffect, useState, useRef } from 'react';
import { useGesture } from '@use-gesture/react'
import { useSprings, animated, a } from '@react-spring/web';

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



    useEffect(() => {
        console.log(data)
    }, [])


    return (
        <div className={styles.container}>
            <ul className={styles.contents}>
                {
                    data.map(i => (
                        <li className={styles.item} key={i} >
                            {i}
                        </li>
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