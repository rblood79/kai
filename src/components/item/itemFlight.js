
/*


*/
import React, { useEffect, useState } from 'react';
//import { useNavigate, Link } from 'react-router-dom';

import styles from './itemFlight.module.scss';
import classNames from 'classnames';

const App = (props) => {
    const [data, setData] = useState([]);

    const listItem = data.map((item, index) => {
        return (
            <div className={classNames(styles.item, styles.col, index === 0 ? styles.left : styles.right)} key={index}>
                <span className={styles.title}>{item.title}</span>
                <div className={styles.textGroup}>
                    <span className={styles.text}>T/O: {item.to}</span>
                    <span className={styles.text}>L/D: {item.ld}</span>
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
            <div className={classNames(styles.list, styles.row)}>
                {listItem}
            </div>
        </div>
    )
}

export default React.memo(App);

App.defaultProps = {
    icon: 'ri-flight-takeoff-fill'
};