
/*


*/
import aircraftSide from '../../images/aircraftLeft@2x.png';

import React, { useState, useMemo } from 'react';
import { useSpring, animated, easings } from '@react-spring/web';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Item, Chart, Button } from '../../components';
import { percentColor, gradient } from '../../util';
import styles from './item.module.scss';

import classNames from 'classnames';

const App = (props) => {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const { data, type, bind, index, currentIndex, spring } = useOutletContext();
    const color = percentColor(data.value);

    const { listNum, width } = useSpring({
        from: { listNum: 0, width: '0%' },
        to: async (next, cancel) => {
            await next({
                listNum: active ? Number(data.value) : Number(0),
                width: active ? Number(data.value) + '%' : '0%'
            })
        },
        config: {
            duration: index === 0 ? 1440 : 480,
            easing: easings.easeInOutExpo
        },
        delay: 240,
    })

    const { gridNum } = useSpring({
        from: { gridNum: 0 },
        to: async (next, cancel) => {
            await next({
                gridNum: type === 'GRID' ? Number(data.value) : Number(0)
            })
        },
        config: {
            easing: easings.easeInOutExpo
        },
        delay: 0,
    })

    /*useMemo(() => {
        //index === currentIndex && spring.display !== 'none' ? setActive(true) : setActive(false)
        type === 'LIST' && index === currentIndex ? setActive(true) : setActive(false)
    }, [currentIndex, index, spring.display])*/

    useMemo(() => {
        type === 'LIST' && index === currentIndex ? setActive(true) : setActive(false)
    }, [currentIndex, index, type])

    return (
        <>
            {
                type === 'LIST' ?
                    <animated.div {...bind()} className={styles.itemList} style={{ display: spring.display, x: spring.x, scale: spring.scale }}>
                        {
                            index === 0 ?
                                <>
                                    <div className={classNames(styles.main, styles.total)}>
                                        <div className={styles.title}>
                                            <h3 className={styles.text}>
                                                {data.label}
                                            </h3>
                                            <span className={styles.line} />
                                        </div>
                                        <Item height={24} direction={'column'} align={'flex-start'} label={data.base} labelColor={'var(--colorPrimary)'} value={data.unit + ' Air Fighter in this Unit'} />
                                        <Chart type={'guage'} data={data.value} active={active} />
                                        <div className={styles.rate}>
                                            <span className={styles.title}>Behavior Rate</span>
                                            <animated.span className={styles.text} style={{ color: percentColor(data.value) }}>
                                                {
                                                    listNum.to(num => num.toFixed(2).padStart(5, '0') + '%')
                                                }
                                            </animated.span>
                                        </div>
                                    </div>
                                    <animated.div className={styles.bottom} style={{ transform: spring.ty.to((ty) => `translateY(${ty}px)`) }}>
                                        <Item height={24} label={'Last Flight No'} value={data.flight} valueColor={'var(--colorCard)'}/>
                                        <Item height={24} label={'Last Defect'} value={data.defect} valueColor={'var(--colorCard)'}/>
                                    </animated.div>
                                </> :
                                <>
                                    <div className={styles.main} >
                                        <div className={styles.title}><h3 className={styles.text}>{data.label}</h3><span className={styles.line} /></div>
                                        <Item height={24} direction={'column'} align={'flex-start'} label={'First Intro'} labelColor={'var(--colorBase)'} value={data.intro} />
                                        <Item height={24} direction={'column'} align={'flex-start'} label={'Fuselage Time'} labelColor={'var(--colorBase)'}
                                            value={'OH:' + data.oh + ' / FH:' + data.fh}
                                        />
                                        <img className={styles.aircraft} src={aircraftSide} alt='aircraft' style={{ filter: 'drop-shadow(16px 0px 48px ' + color + ')' }} />
                                        <div className={styles.rate}>
                                            <span className={styles.title}>Behavior Rate</span>
                                            <animated.span className={styles.text} style={{ color: percentColor(data.value) }}>
                                                {
                                                    listNum.to(num => num.toFixed(2).padStart(5, '0') + '%')
                                                }
                                            </animated.span>
                                        </div>
                                        <div className={styles.bar}>
                                            <animated.span className={styles.value} style={{ width, background: gradient(data.value, -90) }}></animated.span>
                                        </div>
                                    </div>
                                    <animated.div className={styles.bottom} style={{ transform: spring.ty.to((ty) => `translateY(${ty}px)`) }}>
                                        <Item height={24} label={'Aircraft Status'} value={data.status} valueColor={'var(--colorCard)'}/>
                                        <Item height={24} label={'Maintenance Date'} value={data.date} valueColor={'var(--colorCard)'}/>
                                    </animated.div>
                                </>
                        }
                        <div className={styles.button} >
                            <Button width={38} height={38} radius={38} padding={0} background={'#fff'} color={'var(--colorPrimary)'} onClick={() => navigate(data.id)}>
                                <i className='ri-arrow-up-s-line' style={{ fontSize: 32 }}></i>
                            </Button>
                        </div>
                    </animated.div>
                    :
                    <>
                        {
                            index > 0 &&
                            <animated.div className={styles.itemGrid}>
                                <button className={styles.itemButton} onClick={() => { navigate(data.id) }}>
                                    <div className={styles.main}>
                                        <div className={styles.title}><h3 className={styles.text}>{data.label}</h3></div>
                                        <div className={styles.rate}>
                                            <span className={styles.title}>Behavior Rate</span>
                                            <animated.span className={styles.text} style={{ color: percentColor(data.value) }}>
                                                {
                                                    gridNum.to(num => num.toFixed(2).padStart(5, '0') + '%')
                                                }
                                            </animated.span>
                                        </div>
                                    </div>
                                    <div className={styles.bottom}>
                                        {data.status}
                                    </div>
                                </button>
                            </animated.div>
                        }
                    </>
            }
        </>

    )
}

export default React.memo(App);

App.defaultProps = {
};