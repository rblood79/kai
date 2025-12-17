
/*
* @date         : 2022-11-01
* @description  : app list
* @parameter    : not used
*/

import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';

const List = (props) => {
    const target = useRef(null);
    const data = props.data;
    useEffect(() => {
    }, []);

    return (
        <main className={styles.container} ref={target}>
            {
                data.map((item, index) => {
                    return (
                        <props.item key={index} />
                    )
                })
            }

        </main>
    );
}

export default React.memo(List);

List.defaultProps = {
    padding: '0px 16px 48px 16px',
    gap: '48px',
    height: 'auto',
};