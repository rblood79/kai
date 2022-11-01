/*


*/
import aircraftSide from '../../images/aircraftLeft@2x.png';

import { useEffect, useState, useRef } from 'react';

import { useGesture } from '@use-gesture/react'
import { useSpring, useSprings, animated, easings } from '@react-spring/web';

import { useOutletContext, useNavigate, Link } from 'react-router-dom';

import { percentColor, gradient } from '../../util';

import { Api, Item, Chart, Button } from '../../components';
import styles from './list.module.scss';
import classNames from 'classnames';

const clamp = (value, lower, upper) => {
    if (value < lower) return lower;
    if (value > upper) return upper;
    return value;
}

const App = () => {
    //const location = useLocation();
    const navigate = useNavigate();
    const { type } = useOutletContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const index = useRef(0)
    const width = window.innerWidth - 96;

    const [data, setData] = useState([
        {
            "id": "total",
            "title": "Average rate",
            "base": "11 base camp",
            "rate": "84.04",
            "flight": "220218-658KFX",
            "defect": "Turbine defect"
        },
        {
            "id": "1",
            "title": "KF-21-001",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "rate": "82.60",
            "status": "At Maintenance",
            "date": "11 June 2021",


        },
        {
            "id": "2",
            "title": "KF-21-002",
            "intro": "23 July 2021",
            "oh": "2,125",
            "fh": "235",
            "rate": "18.02",
            "status": "At Maintenance",
            "date": "24 June 2021"
        },
    ])

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

    const ListItem = (props) => {
        const index = props.index;
        const color = percentColor(data[index].rate);
        const active = currentIndex === index && props.display !== 'none' ? true : false;

        const { val, width } = useSpring({
            to: { val: active ? Number(data[index].rate) : 0, width: active ? Number(data[index].rate) + '%' : '0%' },
            from: { val: 0, width: '0%' },
            config: { duration: 600, easing: easings.easeInOutExpo }
        })

        //console.log(active)

        return (
            <animated.div className={styles.item} {...bind()} style={{ display: props.display, x: props.x, scale: props.scale }}>
                <div className={styles.main} >
                    <div className={styles.title}><h3 className={styles.text}>{data[index].title}</h3><span className={styles.line} /></div>
                    <Item height={24} direction={'column'} align={'flex-start'} title={'First Intro'} textColor={'var(--colorBase)'} text={data[index].intro} />
                    <Item height={24} direction={'column'} align={'flex-start'} title={'Fuselage Time'} textColor={'var(--colorBase)'}
                        text={'OH:' + data[index].oh + ' / FH:' + data[index].fh}
                    />
                    <img className={styles.aircraft} src={aircraftSide} alt='aircraft' style={{ filter: 'drop-shadow(16px 0px 48px ' + color + ')' }} />
                    <div className={styles.rate}>
                        <span className={styles.title}>Behavior Rate</span>
                        <animated.span className={styles.text} style={{ color: percentColor(data[index].rate) }}>
                            {val.to(val => val.toFixed(2).padStart(5, '0') + '%')}
                        </animated.span>
                    </div>
                    <div className={styles.bar}>
                        <animated.span className={styles.value} style={{ width, background: gradient(data[index].rate, -90) }}></animated.span>
                    </div>
                </div>
                <animated.div className={styles.bottom} style={{ transform: props.ty.to((ty) => `translate3d(0, ${ty}px, 0)`) }}>
                    <Item height={24} title={'Aircraft Status'} textColor={'var(--colorBase)'} text={data[index].status} />
                    <Item height={24} title={'Maintenance Date'} textColor={'var(--colorBase)'} text={data[index].date} />
                </animated.div>
                <div className={styles.button} >
                    <Button width={38} height={38} radius={38} padding={0} background={'#fff'} color={'var(--colorPrimary)'} onClick={() => navigate(data[index].id)}>
                        <i className='ri-arrow-up-s-line' style={{ fontSize: 32 }}></i>
                    </Button>
                </div>
            </animated.div>
        )
    }

    const MainItem = (props) => {
        const index = props.index;
        const active = currentIndex === index && props.display !== 'none' ? true : false;
        const { val } = useSpring({
            from: { val: 0 },
            to: async (next, cancel) => {
                await next({ val: active ? Number(data[index].rate) : 0 })
            },
            config: { duration: 1600, easing: easings.easeInOutExpo, }
        })

        return (
            <animated.div className={styles.item} {...bind()} style={{ display: props.display, x: props.x, scale: props.scale }}>
                <div className={classNames(styles.main, styles.over)}>
                    <div className={styles.title}><h3 className={styles.text}>{data[index].title}</h3><span className={styles.line} /></div>
                    <Item height={24} direction={'column'} align={'flex-start'} title={data[index].base} textColor={'var(--colorPrimary)'} text={data.length + ' Air Fighter in this Unit'} />
                    <div className={styles.graph}>
                        <Chart type={'guage'} percent={data[index].rate} active={active} />
                    </div>
                    <div className={styles.rate}>
                        <span className={styles.title}>Behavior Rate</span>
                        <animated.span className={styles.text} style={{ color: percentColor(data[index].rate) }}>
                            {val.to(val => val.toFixed(2).padStart(5, '0') + '%')}
                        </animated.span>
                    </div>
                </div>
                <animated.div className={styles.bottom} style={{ transform: props.ty.to((ty) => `translate3d(0, ${ty}px, 0)`) }}>
                    <Item height={24} title={'Last Flight No'} textColor={'var(--colorBase)'} text={data[index].flight} />
                    <Item height={24} title={'Last Defect'} textColor={'var(--colorBase)'} text={data[index].defect} />
                </animated.div>
                <div className={styles.button} >
                    <Button width={38} height={38} radius={38} padding={0} background={'#fff'} color={'var(--colorPrimary)'} onClick={() => navigate(data[index].id)}>
                        <i className='ri-arrow-up-s-line' style={{ fontSize: 32 }}></i>
                    </Button>
                </div>

            </animated.div>
        )
    }

    useEffect(() => {
        onLoad();
    }, [])
    return (
        <section className={styles.container}>

            {
                data.length > 0 ?
                    type === 'LIST' ?
                        <div className={styles.listContents}>
                            {
                                props.length > 0 && props.map(({ x, y, display, scale, ty }, i) => (
                                    i !== 0 ? <ListItem key={i} x={x} scale={scale} display={display} ty={ty} index={i} /> : <MainItem key={i} x={x} scale={scale} display={display} ty={ty} index={i} />
                                ))
                            }
                        </div>
                        :
                        <div className={styles.gridContents}>
                            {
                                props.map(({ x, y }, i) => (
                                    <animated.div className={styles.item} key={i}>
                                        <h3 className={styles.title}>{data[i].title}</h3>
                                        <div className={styles.rate}>{data[i].rate}</div>
                                        <Link to={data[i].id}>Detail</Link>
                                    </animated.div>
                                ))
                            }
                        </div> :
                    <div>not Found Data</div>
            }
        </section>

    )
}

export default App;

App.defaultProps = {

};