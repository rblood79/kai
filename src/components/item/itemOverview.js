
/*


*/
import { useEffect } from 'react';

import { percentColor, gradient } from '../../util';

import Item from './item';

import aircraftFront from '../../images/aircraftFront@3x.png';
import styles from './itemOverview.module.scss';

const App = (props) => {

    useEffect(() => {
    }, [])

    return (
        <section className={styles.overview}>
            <div className={styles.header}>

                <div className={styles.item}>
                    <span className={styles.title}>First Intro</span><span className={styles.text}>{props.intro}</span>
                </div>
                <span className={styles.baseIcon}><i className="ri-timer-2-line"></i></span>
                <div className={styles.item}>
                    <span className={styles.title}>Fuselage Time</span><span className={styles.text}>OH:{props.oh} / FH:{props.fh}</span>
                </div>
            </div>
            <div className={styles.body}>
                <img className={styles.aircraft} src={aircraftFront} alt='aircraft' style={{ filter: 'drop-shadow(0px 0px 56px ' + percentColor(props.rate) + ')' }} />
                <div className={styles.rate}>
                    <div className={styles.item}>
                        <span className={styles.title}>Behavior Rate</span><span className={styles.text} style={{ color: percentColor(props.rate) }}>{props.rate}</span>
                    </div>
                    <div className={styles.bar}>
                        <span className={styles.value} style={{ width: props.rate + '%', background: gradient(props.rate, 90) }} />
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <Item title={'Aircraft Status'} text={props.status} textColor={'#fff'} height={26} />
                <Item title={'Maintenance date'} text={props.maintenance} textColor={'#fff'} height={26} />
            </div>
        </section>
    )
}

export default App;

App.defaultProps = {

};