
/*


*/
import React, { useEffect, useState } from 'react';
import { gradient } from '../../util'

import styles from './itemMaintenance.module.scss';

const ItemMaintenance = (props) => {
    const [data, setData] = useState([]);

    const listItem = data && data.map((item, index) => {
        return (
            <div className={styles.itemGroup} key={index}>
                <span className={styles.label}>{item.label}</span>
                <div className={styles.item}>
                    <span className={styles.label}>Cycle</span>
                    <span className={styles.text}>{item.cycle}</span>
                </div>
                <div className={styles.item}>
                    <span className={styles.label}>Date</span>
                    <span className={styles.text}>{item.date}</span>
                </div>

                <div className={styles.bar}>
                    <span className={styles.value} style={{ width: item.value + '%', background: gradient(item.value, props.gradientAngle) }} />
                    <span className={styles.text}>{item.value}%</span>
                </div>
            </div>
        )
    });

    useEffect(() => {
        props.data && setData(props.data)
    }, [props.data])

    return (
        <>
            {
                data &&
                <div className={styles.container}>
                    <span className={styles.baseIcon}><i className={props.icon}></i></span>
                    <div className={styles.list}>{
                        listItem
                    }
                    </div>
                </div>
            }
        </>

    )
}

export default React.memo(ItemMaintenance);

ItemMaintenance.defaultProps = {
    icon: 'ri-user-settings-line',
    gradientAngle: -90,
};