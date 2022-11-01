/*


*/
import React, { useEffect, useRef } from 'react';
import styles from './index.module.scss';

const App = (props) => {
    const target = useRef(null);
    const data = props.data;
    useEffect(() => {
        console.log(props.data)
        console.log(props.item.children)
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

export default React.memo(App);

App.defaultProps = {
    padding: '0px 16px 48px 16px',
    gap: '48px',
    height: 'auto',
};