
/*


*/
import { ReactComponent as CloseIcon } from '../../images/close.svg';

import { useEffect } from 'react';
import { useGesture, useDrag } from '@use-gesture/react'
import { a, useSpring, useSprings, animated, config } from '@react-spring/web';

import {Button} from '../../components';
import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';

const items = ['save item', 'open item', 'share item', 'delete item', 'cancel']
const height = 72 + 80 + items.length * 70;

const App = (props) => {
    const [{ y }, api] = useSpring(() => ({ y: height }))
    const open = ({ canceled }) => {
        api.start({ y: 0, immediate: false, config: canceled ? config.default : config.stiff })
    }
    const close = (velocity = 0) => {
        api.start({ y: height, immediate: false, config: { ...config.stiff, velocity } })
        velocity > 0 && props.close(false)
    }

    const bind = useDrag(
        ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel, canceled }) => {
            if (my < -70) cancel()
            if (last) {
                my > height * 0.5 || (vy > 0.5 && dy > 0) ? close(vy) : open({ canceled })
            }
            else api.start({ y: my, immediate: true })
        },
        { from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
    )

    const display = y.to((py) => (py < height ? 'flex' : 'none'))

    const bgStyle = {
        display: y.to((py) => (py < height ? 'block' : 'none')),
        opacity: y.to([0, height], [0.6, 0], 'clamp')
    }

    useEffect(() => {
        props.state ? open('') : close();
    }, [props.state])

    return (
        <div className={styles.container}>
            <a.div className={styles.bg} style={bgStyle} onClick={() => props.close(false)} />
            <a.div className={styles.sheet} {...bind()} style={{
                y, display,
                //bottom: `calc(-100vh + ${height}px)`,
                height: `${height}px`
            }}>
                <header className={styles.header}>
                    <div className={styles.title}>{props.title}</div>
                    <div className={styles.right}>
                        <button className={styles.close} onClick={() => props.close(false)}>
                            <CloseIcon width={24} height={24} fill={'#141414'} />
                        </button>
                    </div>
                </header>
                <div className={styles.body}>
                    {props.children}
                </div>
                <footer className={styles.footer}>
                    <Button text={'Apply Btn'} background={'#0C90E7'} color={'#fff'} />
                </footer>
            </a.div>
        </div>
    )
}

export default App;

App.defaultProps = {

};