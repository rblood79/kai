
/*


*/
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Item from './item';

import { gradient } from '../../util'

import styles from './itemMaintenance.module.scss';

const App = (props) => {

    const infoItems = props.info.map((item, index) => {
        return (
            <Item title={item.title} text={item.text} key={index}/>
        )
    });

    const dataItems = props.data.map((item, index) => {
        return (
            <div className={styles.itemGroup} key={index}>
                <span className={styles.title}>{item.title}</span>
                <div className={styles.item}>
                    <span className={styles.title}>Cycle</span>
                    <span className={styles.text}>{item.cycle}</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.title}>Date</span>
                    <span className={styles.text}>{item.date}</span>
                </div>
                <div className={styles.bar}>
                    <span className={styles.value} style={{ width: item.text + '%', background: gradient(item.text, 90) }} />
                    <span className={styles.text}>{item.text}%</span>
                </div>
            </div>
        )
    });

    useEffect(() => {
        //console.log(props.data)
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
                <span className={styles.baseIcon}><i className="ri-user-settings-line"></i></span>
                <div className={styles.list}>
                    {dataItems}
                </div>
            </div>
        </section>
    )
}

export default App;

App.defaultProps = {
    rightText: 'detail'
};