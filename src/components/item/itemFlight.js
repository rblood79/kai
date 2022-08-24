
/*


*/
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Item from './item';

import styles from './itemFlight.module.scss';
import classNames from 'classnames';

const App = (props) => {

    const infoItems = props.info.map((item, index) => {
        return (
            <Item title={item.title} text={item.text} key={index}/>
        )
    });

    useEffect(() => {
    }, [])

    return (
        <section className={styles.card}>

            <div className={styles.header}>
                <span className={styles.title}>{props.title}</span>
                <Link className={styles.more} to={props.id}>{props.rightText}</Link>
            </div>

            <div className={styles.info}>
                {infoItems}
            </div>

            <div className={styles.body}>
                <span className={styles.baseIcon}><i className="ri-flight-takeoff-fill"></i></span>
                <div className={classNames(styles.list, styles.row)}>
                    <div className={classNames(styles.item, styles.col, styles.left)}>
                        <span className={styles.title}>Plan</span>
                        <div className={styles.textGroup}>
                            <span className={styles.text}>T/O: {props.planTO}</span>
                            <span className={styles.text}>L/D: {props.planLD}</span>
                        </div>
                    </div>
                    <div className={classNames(styles.item, styles.col, styles.right)}>
                        <span className={styles.title}>Actual</span>
                        <div className={styles.textGroup}>
                            <span className={styles.text}>T/O: {props.actualTO}</span>
                            <span className={styles.text}>L/D: {props.actualLD}</span>
                        </div>
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