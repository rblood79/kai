/*


*/
import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';
//const cx = classNames.bind(styles);

const App = () => {
    return (
        <header className={classNames(styles.header)}>
            <button className={classNames(gloval.button, styles.home)}><i className="ri-home-6-line"></i></button>
            <div className={classNames(styles.location)}>
                <h1 className={classNames(styles.title)}>KF-21 LIS</h1>
            </div>
            <button className={classNames(gloval.button, styles.notification, styles.active)}><i className="ri-notification-line"></i></button>
            <button className={classNames(gloval.button, styles.menu)}><i className="ri-menu-line"></i></button>
        </header>
    );
}

export default App;
