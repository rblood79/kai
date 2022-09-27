
/*


*/
import { ReactComponent as CloseIcon } from '../../images/close.svg';

import { useEffect, useState, Children } from 'react';
//import { useGesture, useDrag } from '@use-gesture/react'
import { a, useSpring, easings, config } from '@react-spring/web';

import { Button } from '../../components';
import styles from './index.module.scss';


const App = (props) => {
    //console.log('type', props.type)
    const child = Children.toArray(props.children);
    const childList = Children.toArray(child[0].props.children)
    const topHeight = 72;
    const bottomHeight = props.apply ? 64 : 20;

    let childHeight = props.type === 'select' ? 40 : 20;
    
    childList.map(item => {
        childHeight += props.type === 'select' ? 56 : 81;
    })

    console.log('childHeight:', childHeight)

    const [view, setView] = useState(false)

    const [height, setHeight] = useState(
        props.height === 'full' ? window.innerHeight :
            props.height === 'body' ? window.innerHeight - 56 :
                Math.min(topHeight + childHeight + bottomHeight, window.innerHeight - 128)
    )
    //console.log(window.innerHeight, 'h: ', height)
    const [{ y }, api] = useSpring(() => ({ y: height }))
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

    const display = y.to((py) => (py < height ? 'flex' : 'none'))

    const bgStyle = {
        display: y.to((py) => (py < height ? 'block' : 'none')),
        opacity: y.to([0, height], [0.6, 0], 'clamp')
    }

    useEffect(() => {
        props.state ? open('') : close();
    }, [props.state])

    /*useEffect(() => {
        const child = Children.toArray(props.children);
        const childList = Children.toArray(child[0].props.children)
        console.log(childList[0])
    }, [props.children])*/

    return (
        <>
            {
                view &&
                <a.div className={styles.container}>
                    <a.div className={styles.bg} style={bgStyle} onClick={() => close()} />
                    <a.div className={styles.sheet} style={{
                        y, display, height: `${height}px`
                    }}>
                        <header className={styles.header}>
                            <div className={styles.title}>{props.title}</div>
                            <div className={styles.right}>
                                <button className={styles.close} onClick={() => close()}>
                                    <CloseIcon width={24} height={24} fill={'#141414'} />
                                </button>
                            </div>
                        </header>
                        <div className={styles.body} >
                            {props.children}
                        </div>
                        {
                            props.apply && <footer className={styles.footer}>
                                {props.cancel && <Button text={'Reset'} onClick={() => props.cancel()} />}
                                <Button text={'Apply'} background={'#0C90E7'} color={'#fff'} onClick={() => props.apply()} />
                            </footer>
                        }
                    </a.div>
                </a.div>
            }
        </>
    )
}

export default App;

App.defaultProps = {

};