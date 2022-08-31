/*


*/
import aircraftSide from '../../images/aircraftLeft@3x.png';

import { useEffect, useState, useRef } from 'react';

import { useGesture } from '@use-gesture/react'
import { useSprings, animated, easings, config } from '@react-spring/web';

import { useOutletContext, useNavigate, Link } from 'react-router-dom';

import { percentColor, gradient } from '../../util';

import Item from '../../components/item/item';
import styles from './list.module.scss';
import classNames from 'classnames';

const data = [
    {
        id: 'total',
        title: 'Average Rate',
        intro: '18 June 2021',
        oh: '2,125',
        fh: '235',
        rate: '96',
        status: 'At Maintenance',
        date: '18 June 2021',
    },
    {
        id: '001',
        title: 'KF-21-001',
        intro: '18 June 2020',
        oh: '2,125',
        fh: '235',
        rate: '82',
        status: 'At Maintenance',
        date: '11 June 2021',
    },
    {
        id: '002',
        title: 'KF-21-002',
        intro: '23 July 2021',
        oh: '2,125',
        fh: '235',
        rate: '18',
        status: 'At Maintenance',
        date: '24 June 2021',
    },
    {
        id: '003',
        title: 'KF-21-003',
        intro: 'First Intro',
        oh: '2,125',
        fh: '235',
        rate: '43',
        status: 'At Maintenance',
        date: '04 June 2021',
    },
    {
        id: '004',
        title: 'KF-21-004',
        intro: 'First Intro',
        oh: '2,125',
        fh: '235',
        rate: '79',
        status: 'At Maintenance',
        date: '17 June 2021',
    },
    {
        id: '005',
        title: 'KF-21-005',
        intro: 'First Intro',
        oh: '2,125',
        fh: '235',
        rate: '44',
        status: 'At Maintenance',
        date: '24 June 2021',
    },
]

const clamp = (value, lower, upper) => {
    if (value < lower) return lower;
    if (value > upper) return upper;
    return value;
}

const App = () => {
    const { type } = useOutletContext();
    const navigate = useNavigate();
    //const [currentIndex, setCurrentIndex] = useState(0);
    const index = useRef(0)
    const width = window.innerWidth - 96

    const [props, api] = useSprings(data.length, i => ({
        x: (i * width) + 48,
        y: 0,
        scale: i === 0 ? 1 : 0.8,
        //ty: i === 0 ? -16 : -96,
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
                //const ty = i === index.current ? -16 : -96
                //setCurrentIndex(index.current)
                return {
                    x, y, scale, display: 'flex',
                    /*config: {
                        mass: 1, 
                        tension: 270, 
                        friction: 26,
                    }*/
                }
            })
        }
    }, {
        drag: { axis: 'lock' }
    });

    useEffect(() => {

    }, [])
    return (
        <section className={classNames(styles.container)}>
            {
                type === 'list' ?
                    <div className={styles.listContents}>
                        {props.map(({ x, y, display, scale }, i) => (
                            <animated.div className={classNames(styles.item)} {...bind()} key={i} style={{ display, x, scale }}>
                                <div className={styles.main}>
                                    <div className={styles.header}>
                                        <h3 className={styles.title}>{data[i].title}</h3>
                                        <Item height={24} direction={'column'} align={'flex-start'} title={'First Intro'} textColor={'#0C90E7'} text={data[i].intro} />
                                        <Item height={24} direction={'column'} align={'flex-start'} title={'Fuselage Time'} textColor={'#0C90E7'}
                                            text={'OH:' + data[i].oh + ' / FH:' + data[i].fh}
                                        />
                                    </div>
                                    <div className={styles.body}>
                                        <img className={styles.aircraft} src={aircraftSide} alt='aircraft' style={{ filter: 'drop-shadow(0px 0px 56px ' + percentColor(data[i].rate) + ')' }} />
                                    </div>
                                    <div className={styles.footer}>
                                        <div className={styles.rate}>
                                            <span className={styles.title}>Behavior Rate</span>
                                            <span className={styles.text} style={{ color: percentColor(data[i].rate) }}>{data[i].rate + '%'}</span>
                                        </div>
                                        <div className={styles.bar}>
                                            <span className={styles.value} style={{ width: data[i].rate + '%', background: gradient(data[i].rate, 90) }}></span>
                                        </div>
                                    </div>

                                    <button className={styles.button} onClick={() => navigate(data[i].id)}><i className="ri-arrow-up-s-line"></i></button>
                                </div>
                                {/*<div className={styles.bottom} style={{transform: ty.to((ty) => `translate3d(0, ${ty}px, 0)`)}}>
                                <div className={styles.bottom}>
                                    <Item height={24} title={'Aircraft Status'} textColor={'#fff'} text={data[i].status} />
                                    <Item height={24} title={'Maintenance Date'} textColor={'#fff'} text={data[i].date} />
                                </div>*/}
                            </animated.div>
                        ))}
                    </div>
                    :
                    <div className={styles.gridContents}>
                        {props.map(({ x, y }, i) => (
                            <animated.div className={classNames(styles.item)} key={i}>
                                <h3 className={styles.title}>{data[i].title}</h3>
                                <div className={styles.rate}>{data[i].rate}</div>
                                <Link to={data[i].id}>Detail</Link>
                            </animated.div>
                        ))}
                    </div>
            }
        </section>

    )
}

export default App;

App.defaultProps = {

};