
/*


*/
import React, { useEffect, useState } from 'react';
import { percentColor, gradient } from '../../util';

import Item from './item';

import aircraftFront from '../../images/aircraftFront@3x.png';
import styles from './itemOverview.module.scss';

const App = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        props.data && setData(props.data)
    }, [props.data])

    return (
        <section className={styles.overview}>
            <div className={styles.header}>

                <div className={styles.item}>
                    <span className={styles.title}>First Intro</span><span className={styles.text}>{data.intro}</span>
                </div>
                <span className={styles.baseIcon}><i className="ri-timer-2-line"></i></span>
                <div className={styles.item}>
                    <span className={styles.title}>Fuselage Time</span><span className={styles.text}>OH:{data.oh} / FH:{data.fh}</span>
                </div>
            </div>
            <div className={styles.body}>
                <img className={styles.aircraft} src={aircraftFront} alt='aircraft' style={{ filter: 'drop-shadow(0px 0px 56px ' + percentColor(props.data.rate) + ')' }} />
                <div className={styles.rate}>
                    <div className={styles.item}>
                        <span className={styles.title}>Behavior Rate</span>
                        <span className={styles.text} style={{ color: percentColor(data.rate) }}>
                            {Number(data.rate).toFixed(2).padStart(5,'0') + '%'}
                        </span>
                    </div>
                    <div className={styles.bar}>
                        <span className={styles.value} style={{ width: data.rate + '%', background: gradient(data.rate, 90) }} />
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Item label={'Aircraft Status'} value={data.status} valueColor={'var(--colorCard)'} height={26} />
                <Item label={'Maintenance date'} value={data.date} valueColor={'var(--colorCard)'} height={26} />
            </div>
        </section>
    )
}

export default React.memo(App);

App.defaultProps = {

};