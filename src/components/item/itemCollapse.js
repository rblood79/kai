
/*


*/
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import styles from './itemCollapse.module.scss';

const ItemCollapse = (props) => {
    const [state, setState] = useState(false);
    useEffect(() => {

    }, [])

    return (
        <div className={classNames(styles.item, state && styles.active)} onClick={() => setState(!state)}>
            <div className={styles.icon}><i className={props.type === 'Notice' ? 'ri-notification-line' : 'ri-mail-line'} /></div>
            <div className={styles.label}>{props.label}</div>
            <div className={styles.comment}>{props.comment}</div>
            <div className={styles.date}>
                {
                    //moment(props.date, 'YYYYMMDDHHmmss').format('YYYY/MM/DD - HH:mm:ss')
                    moment(props.date, 'YYYYMMDDHHmmss').fromNow()
                }
            </div>
        </div>
    )
}

export default React.memo(ItemCollapse);

ItemCollapse.defaultProps = {
    label: 'TITLE',
    type: 'Notice',
    comment: 'Memo',
};