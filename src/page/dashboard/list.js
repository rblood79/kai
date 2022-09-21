/*


*/
import aircraftSide from '../../images/aircraftLeft@2x.png';
import { ReactComponent as UpIcon } from '../../images/up.svg';

import { useEffect, useState, useRef } from 'react';

import { useGesture } from '@use-gesture/react'
import { useSprings, animated, easings, config, useSpringRef } from '@react-spring/web';

import { useOutletContext, useNavigate, Link } from 'react-router-dom';

import { percentColor, gradient } from '../../util';

import { Api, Item } from '../../components';
import styles from './list.module.scss';
import classNames from 'classnames';

const clamp = (value, lower, upper) => {
    if (value < lower) return lower;
    if (value > upper) return upper;
    return value;
}

const App = () => {
    const navigate = useNavigate();
    const { type } = useOutletContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const index = useRef(0)
    const width = window.innerWidth - 96;

    const [data, setData] = useState([])

    const onLoad = async () => {
        try {
            const response = await Api({
                //baseURL: state.url,
                url: 'dashboard',
                method: 'get',
                params: {},
            });
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [props, api] = useSprings(data.length, i => ({
        x: (i * width) + 48,
        y: 0,
        scale: i === 0 ? 1 : 0.8,
        ty: i === 0 ? -16 : -96,
        //display: 'flex',
    }))

    const bind = useGesture({
        onDrag: ({ active, movement: [mx, my], direction: [xDir], cancel }) => {
            if (active && Math.abs(mx) > width / 2) {
                index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, data.length - 1)
                cancel()
            }
            api.start(i => {
                if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
                const x = (i - index.current) * width + (active ? mx + 48 : 48)
                const y = active ? my : 0
                const scale = i === index.current ? 1 : 0.8
                const ty = i === index.current ? -16 : -96
                setCurrentIndex(index.current)
                return {
                    x, y, scale, display: 'grid', ty,
                    config: {
                        mass: 1,
                        tension: 210,
                        friction: 26,
                    }
                }
            })
        }
    }, {
        drag: { 
            axis: 'lock'
        }
    });

    
    const listItem = (x, y, display, scale, ty, i) => {
        const color = percentColor(data[i].rate);
        return (
            <animated.div className={classNames(styles.item)} {...bind()} key={i} style={{ display, x, scale }}>
                <div className={styles.main}>
                    <div className={styles.title}><h3 className={styles.text}>{data[i].title}</h3><span className={styles.line} /></div>
                    <Item height={24} direction={'column'} align={'flex-start'} title={'First Intro'} textColor={'#fff'} text={data[i].intro} />
                    <Item height={24} direction={'column'} align={'flex-start'} title={'Fuselage Time'} textColor={'#fff'}
                        text={'OH:' + data[i].oh + ' / FH:' + data[i].fh}
                    />
                    <img className={styles.aircraft} src={aircraftSide} alt='aircraft' style={{ filter: 'drop-shadow(16px 0px 48px ' + color + ')' }} />
                    <div className={styles.rate}>
                        <span className={styles.title}>Behavior Rate</span>
                        <span className={styles.text} style={{ color: percentColor(data[i].rate) }}>{data[i].rate + '%'}</span>
                    </div>
                    <div className={styles.bar}>
                        <span className={styles.value} style={{ width: data[i].rate + '%', background: gradient(data[i].rate, 90) }}></span>
                    </div>
                </div>
                <animated.div className={styles.bottom} style={{ transform: ty.to((ty) => `translate3d(0, ${ty}px, 0)`) }}>
                    <Item height={24} title={'Aircraft Status'} textColor={'#fff'} text={data[i].status} />
                    <Item height={24} title={'Maintenance Date'} textColor={'#fff'} text={data[i].date} />
                </animated.div>
                <button className={styles.button} onClick={() => navigate(data[i].id)}>
                    <UpIcon width={32} height={32} fill={'#2699fb'} />
                </button>
            </animated.div>
        )
    };

    const mainItem = (x, y, display, scale, ty, i) => {

        return (
            <animated.div className={classNames(styles.item)} {...bind()} key={i} style={{ display, x, scale }}>
                <div className={classNames(styles.main, styles.over)}>
                    <div className={styles.title}><h3 className={styles.text}>{data[i].title}</h3><span className={styles.line} /></div>
                    <Item height={24} direction={'column'} align={'flex-start'} title={data[i].base} textColor={'#0C90E7'} text={data.length + ' Air Fighter in this Unit'} />
                    <div className={styles.graph}>
                        Graph2
                    </div>
                    <div className={styles.rate}>
                        <span className={styles.title}>Behavior Rate</span>
                        <span className={styles.text} style={{ color: percentColor(data[i].rate) }}>{data[i].rate + '%'}</span>
                    </div>
                </div>
                <animated.div className={styles.bottom} style={{ transform: ty.to((ty) => `translate3d(0, ${ty}px, 0)`) }}>
                    <Item height={24} title={'Last Flight No'} textColor={'#fff'} text={data[i].flight} />
                    <Item height={24} title={'Last Defect'} textColor={'#fff'} text={data[i].defect} />
                </animated.div>
                <button className={styles.button} onClick={() => navigate(data[i].id)}>
                    <UpIcon width={32} height={32} fill={'#2699fb'} />
                </button>
            </animated.div>
        )
    }

    useEffect(() => {
        onLoad();
    }, [])
    return (
        <section className={classNames(styles.container)}>

            {
                data.length > 0 ?
                    type === 'list' ?
                        <>
                            <div className={styles.listContents}>
                                {
                                    props.map(({ x, y, display, scale, ty }, i) => (
                                        i !== 0 ? listItem(x, y, display, scale, ty, i) : mainItem(x, y, display, scale, ty, i)
                                    ))
                                }
                            </div>
                            <div className={styles.slideCount}>Active Slide: {currentIndex + 1 + ' / ' + data.length}</div>
                        </>
                        :
                        <div className={styles.gridContents}>
                            {props.map(({ x, y }, i) => (
                                <animated.div className={classNames(styles.item)} key={i}>
                                    <h3 className={styles.title}>{data[i].title}</h3>
                                    <div className={styles.rate}>{data[i].rate}</div>
                                    <Link to={data[i].id}>Detail</Link>
                                </animated.div>
                            ))}
                        </div> :
                    <div>not Found Data</div>
            }
        </section>

    )
}

export default App;

App.defaultProps = {

};