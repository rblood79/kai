
/*


*/
import { useEffect, useState } from 'react';

import { gradient } from '../../util'

import styles from './itemMaintenance.module.scss';

const App = (props) => {
    const [data, setData] = useState([]);

    const listItem = data.map((item, index) => {
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
        setData(props.data)
    }, [])

    return (
        <div className={styles.container}>
            <span className={styles.baseIcon}><i className={props.icon}></i></span>
            <div className={styles.list}>{
                listItem
            }
            </div>
        </div>
    )
}

export default App;

App.defaultProps = {
    icon: 'ri-user-settings-line'
};