
/*


*/
import React, { useEffect } from 'react';

import styles from './item.module.scss';

const App = (props) => {

    useEffect(() => {
    }, [])

    return (
        <div className={styles.item} style={{ height: props.direction === 'row' && props.height, flexDirection: props.direction, alignItems: props.align }}>
            <span className={styles.title} style={{ color: props.titleColor }}>{props.title}</span>
            <span className={styles.text} style={{ color: props.textColor }}>{props.text}</span>
        </div>
    )
}

export default React.memo(App);

App.defaultProps = {
    height: 40,
    title: 'title',
    text: 'text',
    align: 'center',
    direction: 'row',
};