/*


*/
import React, { useEffect, useCallback, useRef } from 'react';
import styles from './index.module.scss';

const App = (props) => {
    const target = useRef(null);

    const onScroll = useCallback((event) => {
        event.target.scrollTop < 56 ? props.scrollTop(true) : props.scrollTop(false)
    }, [props]);

    useEffect(() => {
        props.scrollTop && target.current.addEventListener("scroll", onScroll);
        return () => {
            target.current && target.current.removeEventListener("scroll", onScroll);
        };

    }, [target, props.scrollTop, onScroll]);

    return (
        <main className={styles.main} style={{ padding: props.padding }} ref={target}>
            <div className={styles.body} style={{ height: props.height, gap: props.gap }}  >
                {props.children}
            </div>
        </main>
    );
}

export default React.memo(App);

App.defaultProps = {
    padding: '0px 16px 48px 16px',
    gap: '48px',
    height: 'auto',
};