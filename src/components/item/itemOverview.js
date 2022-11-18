
/*


*/
import React, { useEffect } from 'react';
import { percentColor } from '../../util';

import Item from './item';
import ItemRate from './itemRate';

import aircraftFront from '../../images/aircraftFront@3x.png';
import styles from './itemOverview.module.scss';

const App = (props) => {
    useEffect(() => {
    }, [])

    return (
        <section className={styles.overview}>
            <div className={styles.header}>

                <div className={styles.item}>
                    <span className={styles.title}>First Intro</span><span className={styles.text}>{props.data.intro}</span>
                </div>
                <span className={styles.baseIcon}><i className="ri-timer-2-line"></i></span>
                <div className={styles.item}>
                    <span className={styles.title}>Fuselage Time</span><span className={styles.text}>OH:{props.data.oh} / FH:{props.data.fh}</span>
                </div>
            </div>
            <div className={styles.body}>
                <img className={styles.aircraft} src={aircraftFront} alt='aircraft' style={{ filter: 'drop-shadow(0px 0px 56px ' + percentColor(props.data.rate) + ')' }} />
                <ItemRate num={props.data.rate} active={true} row={true} />
            </div>
            <div className={styles.footer}>
                <Item label={'Aircraft Status'} value={props.data.status} valueColor={'var(--colorCard)'} height={26} />
                <Item label={'Maintenance date'} value={props.data.date} valueColor={'var(--colorCard)'} height={26} />
            </div>
        </section>
    )
}

export default React.memo(App);

App.defaultProps = {

};