
/*


*/
import { ReactComponent as CloseIcon } from '../../images/close.svg';

import React, { useEffect, useState } from 'react';
//import { useGesture, useDrag } from '@use-gesture/react'
import { a, useSpring, easings, config } from '@react-spring/web';
//util
import { bottomStatusHeight } from '../../util';
import { Button } from '../../components';
import styles from './index.module.scss';


const App = (props) => {
    /*const child = Children.toArray(props.children);
    const childList = Children.toArray(child[0].props.children)
    
    const topHeight = 72;
    const bottomHeight = props.apply ? 64 : 20;
    let childHeight = props.type === 'select' ? 40 : 20;

    childList.map(item => {
        childHeight += props.type === 'select' ? 56 : 81;
    })*/

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

    const open = ({ canceled }) => {
        setView(true)
        api.start({
            y: 0, immediate: false, config: { duration: 480, easing: easings.easeInOutQuart },
            onRest: () => {

            }
        })
    }

    const close = (velocity = 0) => {
        api.start({
            y: height, immediate: false, config: { ...config.stiff, velocity },
            onRest: () => {
                props.close(false)
                setView(false)
            },
        })
    }

    useEffect(() => {
        props.state ? open('') : close();
    }, [props.state])

    return (
        <>
            {
                view &&
                <a.div className={styles.container}>
                    <a.div className={styles.bg} style={bgStyle} onClick={() => close()} />
                    <a.div className={styles.sheet} style={{
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
                    </a.div>
                </a.div>
            }
        </>
    )
}

export default React.memo(App);

App.defaultProps = {
    type: 'text',
    gap: '20px',
};