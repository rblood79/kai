
/*


*/
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Item from './item';

import { gradient } from '../../util'

import styles from './itemMaintenance.module.scss';

const App = (props) => {

    const listItems = props.data.map((item, index) => {
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
                    <span className={styles.value} style={{ width: item.value + '%', background: gradient(item.value, 90) }} />
                    <span className={styles.text}>{item.value}%</span>
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
                <Item title={'Content'} text={props.content} />
                <Item title={'Consume No'} text={props.no} />
                <Item title={'Consume Date'} text={props.date} />
            </div>
            <div className={styles.body}>
                <span className={styles.baseIcon}><i className="ri-shopping-bag-line"></i></span>
                <div className={styles.list}>
                    {listItems}
                </div>
            </div>
        </section>
    )
}

export default App;

App.defaultProps = {
    rightText: 'detail'
};