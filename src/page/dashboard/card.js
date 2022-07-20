/*


*/
import styles from './card.module.scss';
import classNames from 'classnames';

const App = () => {
    return (
        <section className={styles.container}>
            <div className={styles.contents}>
                <div className={styles.item}>
                    AA
                </div>
                <div className={styles.item}>
                    BB
                </div>
                <div className={styles.item}>
                    CC
                </div>
                <div className={styles.item}>
                    DD
                </div>
            </div>
        </section>
    );
}

export default App;
