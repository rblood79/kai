/*


*/
import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';

const App = () => {
    return (
        <main className={styles.container}>
            <section className={classNames(styles.section, styles.card)}>
                <div className={classNames(styles.header)}>
                    <h2 className={classNames(styles.title)}>Flight No</h2>
                </div>
                <div className={classNames(styles.body)}>contents</div>
            </section>

            {/*<section className={classNames(styles.section)}>
                <div className={classNames(styles.header)}>
                    <h2 className={classNames(styles.title)}>Flight No</h2>
                </div>
               <div className={classNames(styles.body)}>contents</div>
            </section>
            <section className={classNames(styles.section)}>
                <div className={classNames(styles.header)}>
                    <h2 className={classNames(styles.title)}>Defect</h2>
                </div>
               <div className={classNames(styles.body)}>contents</div>
            </section>
            <section className={classNames(styles.section)}>
                <div className={classNames(styles.header)}>
                    <h2 className={classNames(styles.title)}>Maintenance</h2>
                </div>
               <div className={classNames(styles.body)}>contents</div>
            </section>
            <section className={classNames(styles.section)}>
                <div className={classNames(styles.header)}>
                    <h2 className={classNames(styles.title)}>Consume</h2>
                </div>
               <div className={classNames(styles.body)}>contents</div>
    </section>*/}
        </main>
    );
}

export default App;
