/*


*/
import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import styles from './index.module.scss';

const App = (props) => {
    const words = props.label.split('');
    const Item = (props) => {
        const engNum = /^[a-zA-Z0-9]*$/;
        const ran = Math.round(Math.random() * (122 - 48)) + 48;
        const [num, setNum] = useState(0);
        const { textNum } = useSpring({
            from: { textNum: ran },
            to: async (next, cancel) => {
                await next({
                    textNum: Number(num),
                })
            },
            config: {
                duration: 960,
            },
        })
        useEffect(() => {
            setNum(props.active ? props.item.charCodeAt(0) : 0);
        }, [props.active, props.item])

        return (
            <animated.span style={{ color: props.color }}>
                {
                    textNum.to(num => {
                        const fixNum = num.toFixed(0)
                        return engNum.test(String.fromCharCode(fixNum)) ? String.fromCharCode(fixNum) : props.item
                    })
                }
            </animated.span>
        )
    }

    return (
        <div className={styles.container} >
            {
                words.map((item, index) => {
                    return <Item key={index} item={item} active={props.active} />;
                })
            }
        </div>
    );
}

export default React.memo(App);

App.defaultProps = {

};