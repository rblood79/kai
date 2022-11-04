
/*


*/
import aircraftSide from '../../images/aircraftLeft@2x.png';

import React, { useEffect, useState, useMemo } from 'react';
import { useSpring, animated, easings } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';
import { Item, Chart, Button } from '../../components';
import { percentColor, gradient } from '../../util';
import styles from './itemDashboard.module.scss';

import classNames from 'classnames';

const App = (props) => {
    const navigate = useNavigate();
    const [data] = useState(props.data);
    const [active, setActive] = useState(false);
    const index = props.index;
    const color = percentColor(data.rate);
    /*const { val, width } = useSpring({
        from: { val: 0, width: '0%' },

        to: { val: active ? Number(data.rate) : 0, width: active ? Number(data.rate) + '%' : '0%' },
        config: { duration: index === 0 ? 1440 : 480, easing: easings.easeInOutExpo },
        delay: 120,
    })*/

    const { val, width } = useSpring({
        to: async (next, cancel) => {
            await next({
                val: active ? Number(data.rate) : 0,
                width: active ? Number(data.rate) + '%' : '0%'
            })
        },
        from: { val: 0, width: '0%' },
        config: { duration: index === 0 ? 1440 : 480, easing: easings.easeInOutExpo },
        delay: 220,
    })

    useMemo(() => {
        index === props.currentIndex && props.display !== 'none' ? setActive(true) : setActive(false)
    }, [index, props.currentIndex, props.display])

    useEffect(() => {
        //console.log(index, props.display.animation.to) 
    }, [])

    return (
        <>
            {
                props.type === 'LIST' ?
                    <animated.div {...props.bind()} className={styles.itemList} style={{ display: props.display, x: props.x, scale: props.scale }}>
                        {
                            index === 0 ?
                                <>
                                    <div className={classNames(styles.main, styles.total)}>
                                        <div className={styles.title}><h3 className={styles.text}>{data.title}</h3><span className={styles.line} /></div>
                                        <Item height={24} direction={'column'} align={'flex-start'} title={data.base} textColor={'var(--colorPrimary)'} text={data.unit + ' Air Fighter in this Unit'} />
                                        <Chart type={'guage'} data={data.rate} active={active} />
                                        <div className={styles.rate}>
                                            <span className={styles.title}>Behavior Rate</span>
                                            <animated.span className={styles.text} style={{ color: percentColor(data.rate) }}>
                                                {val.to(val => val.toFixed(2).padStart(5, '0') + '%')}
                                            </animated.span>
                                        </div>
                                    </div>
                                    <animated.div className={styles.bottom} style={{ transform: props.ty.to((ty) => `translateY(${ty}px)`) }}>
                                        <Item height={24} title={'Last Flight No'} textColor={'var(--colorBase)'} text={data.flight} />
                                        <Item height={24} title={'Last Defect'} textColor={'var(--colorBase)'} text={data.defect} />
                                    </animated.div>
                                </> :
                                <>
                                    <div className={styles.main} >
                                        <div className={styles.title}><h3 className={styles.text}>{data.title}</h3><span className={styles.line} /></div>
                                        <Item height={24} direction={'column'} align={'flex-start'} title={'First Intro'} textColor={'var(--colorBase)'} text={data.intro} />
                                        <Item height={24} direction={'column'} align={'flex-start'} title={'Fuselage Time'} textColor={'var(--colorBase)'}
                                            text={'OH:' + data.oh + ' / FH:' + data.fh}
                                        />
                                        <img className={styles.aircraft} src={aircraftSide} alt='aircraft' style={{ filter: 'drop-shadow(16px 0px 48px ' + color + ')' }} />
                                        <div className={styles.rate}>
                                            <span className={styles.title}>Behavior Rate</span>
                                            <animated.span className={styles.text} style={{ color: percentColor(data.rate) }}>
                                                {val.to(val => val.toFixed(2).padStart(5, '0') + '%')}
                                            </animated.span>
                                        </div>
                                        <div className={styles.bar}>
                                            <animated.span className={styles.value} style={{ width, background: gradient(data.rate, -90) }}></animated.span>
                                        </div>
                                    </div>
                                    <animated.div className={styles.bottom} style={{ transform: props.ty.to((ty) => `translateY(${ty}px)`) }}>
                                        <Item height={24} title={'Aircraft Status'} textColor={'var(--colorBase)'} text={data.status} />
                                        <Item height={24} title={'Maintenance Date'} textColor={'var(--colorBase)'} text={data.date} />
                                    </animated.div>
                                </>
                        }
                        <div className={styles.button} >
                            <Button width={38} height={38} radius={38} padding={0} background={'#fff'} color={'var(--colorPrimary)'} onClick={() => navigate(data.id)}>
                                <i className='ri-arrow-up-s-line' style={{ fontSize: 32 }}></i>
                            </Button>
                        </div>
                    </animated.div> :

                    <animated.div className={styles.itemGrid}>
                        <button className={styles.itemButton} onClick={() => { navigate(data.id) }}>
                            <div className={styles.main}>
                                <h3 className={styles.title}>{data.title}</h3>
                                <div className={styles.rate} style={{ color: percentColor(data.rate) }}>
                                    {data.rate}%
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                status
                            </div>
                        </button>
                    </animated.div>
            }
        </>

    )
}

export default React.memo(App);

App.defaultProps = {
};