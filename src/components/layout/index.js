/*


*/
import React from 'react';
import styles from './index.module.scss';

const App = (props) => {
    return (
        <main className={styles.main} style={{ padding: props.padding }}>
            <div className={styles.body} style={{ height: props.height, gap: props.gap }}>
                {props.children}
            </div>
        </main>
    );
}

export default React.memo(App);

App.defaultProps = {
    padding: '16px 16px 48px 16px',
    gap: '48px',
    height: 'auto',
};