
/*


*/
import { ReactComponent as CloseIcon } from '../../images/close.svg';

import { useEffect, useState, Children } from 'react';
//import { useGesture, useDrag } from '@use-gesture/react'
import { a, useSpring, easings, config } from '@react-spring/web';

import { Button } from '../../components';
import styles from './index.module.scss';


const App = (props) => {
    
    const [view, setView] = useState(false)
    const [o, api] = useSpring(() => ({ opacity: 1 }))

    const open = ({ canceled }) => {
        setView(true)
        api.start({ opacity: 1, config: { duration: 480, easing: easings.easeInOutQuart }, })
    }

    const close = (velocity = 0) => {
        api.start({
            opacity: 0, config: { ...config.stiff, velocity },
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
                            {props.cancel && <Button text={'Cancle'} onClick={() => props.cancel()} />}
                            <Button text={'Confirm'} background={'var(--colorSecondary)'} color={'var(--colorCard)'} onClick={() => props.apply()} />
                        </footer>

                    </div>
                </a.div>
            }
        </>
    )
}

export default App;

App.defaultProps = {

};