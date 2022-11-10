
/*


*/
import React, { useEffect } from 'react';

import styles from './item.module.scss';

const App = (props) => {

    useEffect(() => {
    }, [])

    return (
        <div className={styles.item} style={{ height: props.direction === 'row' && props.height, flexDirection: props.direction, alignItems: props.align }}>
            <span className={styles.label} style={{ color: props.labelColor }}>{props.label}</span>
            <span className={styles.value} style={{ color: props.valueColor }}>{props.value}</span>
        </div>
    )
}

export default React.memo(App);

App.defaultProps = {
    height: 40,
    label: 'TITLE',
    value: 'TEXT',
    align: 'center',
    direction: 'row',
};