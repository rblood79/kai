
/*


*/
import aircraftSide from '../../images/aircraftLeft@2x.png';

import React, { useState, useMemo } from 'react';
import { animated } from '@react-spring/web';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Item, Chart, Button, ItemRate, Text } from '../../components';
import { percentColor } from '../../util';
import styles from './item.module.scss';

import classNames from 'classnames';

const App = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const { data, type, bind, index, currentIndex, spring } = useOutletContext();
    const color = percentColor(data.value);

    useMemo(() => {
        type === 'LIST' && index === currentIndex ? setActive(true) : setActive(false)
    }, [currentIndex, index, type])

    return (
        <>
            {
                type === 'LIST' ?
                    <animated.div {...bind()} className={styles.container}
                        style={{
                            display: spring.display, x: spring.x, scale: spring.scale,
                        }}>
                        {
                            index === 0 ?
                                <>
                                    <animated.div className={classNames(styles.main, styles.total)} >
                                        <div className={styles.title}>
                                            <h3 className={styles.text}>
                                                <Text label={data.label} active={active} width={'11px'} />
                                            </h3>
                                            <span className={styles.line} />
                                        </div>
                                        <Item height={24} direction={'column'} align={'flex-start'} label={data.base} valueColor={'var(--colorPrimary)'} value={data.unit + ' Air Fighter in this Unit'} />
                                        <Chart type={'guage'} data={data.value} active={active} />
                                        <ItemRate label={'Flight Rate'} num={data.value} active={active} bar={false} duration={960} />
                                    </animated.div>
                                    <animated.div className={styles.bottom} style={{ transform: spring.ty.to((ty) => `translateY(${ty}px)`) }}>
                                        <Item height={24} label={'Last Flight No'} value={data.flight} />
                                        <Item height={24} label={'Last Defect'} value={data.defect} />
                                    </animated.div>
                                </> :
                                <>
                                    <animated.div className={styles.main} >
                                        <div className={styles.title}>
                                            <h3 className={styles.text}>
                                                {data.label}
                                            </h3>
                                            <span className={styles.line} />
                                        </div>
                                        <div className={styles.itemGroup}>
                                            <Item height={24} direction={'column'} align={'flex-start'} label={'First Intro'} valueColor={'var(--colorBase)'} value={data.intro} />
                                            <Item height={24} direction={'column'} align={'flex-end'} label={'Fuselage Time'} valueColor={'var(--colorBase)'} value={'OH:' + data.oh + ' / FH:' + data.fh}/>
                                        </div>
                                        <animated.div className={styles.image} style={{ transform: spring.x.to((tx) => `translateX(${tx - 48}px)`) }}>
                                            <img className={styles.aircraft} src={aircraftSide} alt='aircraft' style={{ filter: 'drop-shadow(16px 0px 48px ' + color + ')' }} />
                                        </animated.div>

                                        <ItemRate label={'Availability Rate'} num={data.value} active={active} />
                                    </animated.div>
                                    <animated.div className={styles.bottom} style={{ transform: spring.ty.to((ty) => `translateY(${ty}px)`) }}>
                                        <Item height={24} label={'Aircraft Status'} value={data.status} />
                                        <Item height={24} label={'Maintenance Date'} value={data.date} />
                                    </animated.div>
                                </>
                        }
                        <div className={styles.button} >
                            <Button width={38} height={38} radius={38} padding={0} background={'var(--colorCard)'} color={'var(--colorPrimary)'} onClick={() => navigate(data.id)}>
                                <i className='ri-arrow-up-s-line' style={{ fontSize: 32 }}></i>
                            </Button>
                        </div>
                    </animated.div>
                    :
                    <>
                        {
                            index > 0 &&
                            <div className={styles.itemGrid} >
                                <button className={styles.itemButton} onClick={() => { navigate(data.id) }}>
                                    <div className={styles.main}>
                                        <div className={styles.title}>
                                            <h3 className={styles.text}>
                                                {data.label}
                                            </h3>
                                        </div>
                                        <ItemRate label={'Availability Rate'} num={data.value} active={true} type={type} />
                                    </div>
                                    <div className={styles.bottom}>
                                        {data.status}
                                    </div>
                                </button>
                            </div>
                        }
                    </>
            }
        </>

    )
}

export default React.memo(App);

App.defaultProps = {
};