
/*


*/

import React, { useEffect, useState } from 'react';
//import { useGesture, useDrag } from '@use-gesture/react'
import { a, useSpring, easings, config } from '@react-spring/web';

import { Button } from '../../components';
import styles from './index.module.scss';


const App = (props) => {
    
    const [view, setView] = useState(false)
    const [o, api] = useSpring(() => ({ opacity: 1 }))

    const open = () => {
        setView(true)
        api.start({ opacity: 1, config: { duration: 480, easing: easings.easeInOutQuart }, })
    }

    const close = (velocity = 0) => {
        api.start({
            opacity: 0, config: { ...config.stiff, velocity },
            onRest: () => {
                //props.close(false)
                setView(false)
            },
        })
    }

    useEffect(() => {
        props.state ? open('') : close();
    }, [props.state, view])

    return (
        <>
            {
                view &&
                <a.div className={styles.container} style={o}>
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
                </a.div>
            }
        </>
    )
}

export default React.memo(App);

App.defaultProps = {

};