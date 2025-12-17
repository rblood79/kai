
/*
* @date         : 2022-11-01
* @description  : app modal
* @parameter    : children
*/

import React, { useEffect, useState } from 'react';
import { animated, useSpring, easings } from '@react-spring/web';

import { Button } from '../../components';
import styles from './index.module.scss';


const Modal = (props) => {
    const [navState, setNavState] = useState(false);
    const [o, api] = useSpring(() => ({ opacity: 0 }))

    const open = () => {
        setNavState(true)
        api.start({
            opacity: 1, config: { duration: 480, easing: easings.easeInOutQuart },
        })
    }

    const close = () => {
        api.start({
            opacity: 0, config: { duration: 480, easing: easings.easeInOutQuart },
            onRest: () => {
                setNavState(false)
            },
        })
    }

    useEffect(() => {
        props.state ? open() : close();
    }, [props.state, navState])


    return (
        <>
            {
                navState &&
                <animated.div className={styles.container} style={o}>
                    <div className={styles.bg} />
                    <div className={styles.sheet} >
                        <header className={styles.header}>
                            <div className={styles.title}>{props.title}</div>
                        </header>
                        <div className={styles.body} >
                            {props.children}
                        </div>

                        <footer className={styles.footer}>
                            {props.cancel && <Button label={'Cancle'} background={'var(--colorBase)'} onClick={() => props.cancel()} />}
                            <Button label={'Confirm'} background={'var(--colorPrimary)'} color={'var(--colorCard)'} onClick={() => props.apply()} />
                        </footer>

                    </div>
                </animated.div>
            }
        </>
    )
}

export default React.memo(Modal);

Modal.defaultProps = {

};