
/*


*/
import aircraftFront from '../../images/aircraftFront@3x.png';
import aircraftSide from '../../images/aircraftLeft@3x.png';
import aircraftTop from '../../images/aircraftTop@3x.png';

import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Item from './item';

import styles from './itemDefect.module.scss';
import classNames from 'classnames';

const App = (props) => {

    useEffect(() => {
    }, [])

    return (
        <section className={styles.card}>

            <div className={styles.header}>
                <span className={styles.title}>{props.title}</span>
                <Link className={styles.more} to={props.id}>{props.rightText}</Link>
            </div>

            <div className={styles.info}>
                <Item title={'Cause'} text={props.cause} />
                <Item title={'Defect No'} text={props.no} />
                <Item title={'Defect Date'} text={props.date} />
            </div>

            <div className={styles.body}>
                <span className={styles.baseIcon}><i className="ri-tools-fill"></i></span>
                <div className={styles.list}>
                    <div className={classNames(styles.item, styles.image)}>
                        <img className={styles.aircraft} src={aircraftFront} alt='aircraft' />
                        <span className={styles.title}>Front</span>
                    </div>
                    <div className={classNames(styles.item, styles.image)}>
                        <img className={styles.aircraft} src={aircraftSide} alt='aircraft' />
                        <span className={styles.title}>Side</span>
                    </div>
                    <div className={classNames(styles.item, styles.image)}>
                        <img className={styles.aircraft} src={aircraftTop} alt='aircraft' />
                        <span className={styles.title}>Top</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default App;

App.defaultProps = {
    rightText: 'detail'
};