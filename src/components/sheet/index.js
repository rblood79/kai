
/*
* @date         : 2022-11-01
* @description  : app sheet
* @parameter    : children, gap
*/

import { ReactComponent as CloseIcon } from '../../images/close.svg';

import React, { useEffect, useState } from 'react';
import { animated, useSpring, easings } from '@react-spring/web';
//util
import { bottomStatusHeight } from '../../util';
import { Button } from '../../components';
import styles from './index.module.scss';


const App = (props) => {
    const [view, setView] = useState(false)
    
    const [height] = useState(
        props.height === 'full' ? window.innerHeight :
            props.height === 'body' ? window.innerHeight - 56 :
                window.innerHeight - 128
    )

    const [{ y }, api] = useSpring(() => ({ y: height }))
    const display = y.to((py) => (py < height ? 'flex' : 'none'))

    const bgStyle = {
        display: y.to((py) => (py < height ? 'block' : 'none')),
        opacity: y.to([0, height], [0.48, 0], 'clamp')
    }

    const open = () => {
        setView(true)
        api.start({
            y: 0, immediate: false, config: { duration: 480, easing: easings.easeInOutQuart },
        })
    }

    const close = () => {
        api.start({
            y: height, immediate: false, config: { duration: 480, easing: easings.easeInOutQuart },
            onRest: () => {
                props.close(false)
                setView(false)
            },
        })
    }

    useEffect(() => {
        props.state ? open() : close();
    }, [props.state])

    return (
        <>
            {
                view &&
                <animated.div className={styles.container}>
                    <animated.div className={styles.bg} style={bgStyle} onClick={() => close()} />
                    <animated.div className={styles.sheet} style={{
                        y, display, height: !props.height ? 'auto' : `${height}px`
                    }}>
                        <header className={styles.header}>
                            <div className={styles.title}>{props.title}</div>
                            <div className={styles.right}>
                                <button className={styles.close} onClick={() => close()}>
                                    <CloseIcon width={24} height={24} fill={'var(--colorSecondary)'} />
                                </button>
                            </div>
                        </header>
                        <div className={styles.body} style={{ gap: props.gap }}>
                            {props.children}
                        </div>
                        {
                            props.apply &&
                            <footer className={styles.footer} style={{ marginBottom: bottomStatusHeight }}>
                                {props.cancel && <Button label={'Reset'} onClick={() => props.cancel()} />}
                                <Button label={'Apply'} background={'var(--colorPrimary)'} color={'var(--colorCard)'} onClick={() => props.apply()} />
                            </footer>
                        }
                    </animated.div>
                </animated.div>
            }
        </>
    )
}

export default React.memo(App);

App.defaultProps = {
    type: 'text',
    gap: '20px',
};