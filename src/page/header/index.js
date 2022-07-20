/*


*/
import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';
//const cx = classNames.bind(styles);

const App = () => {
    return (
        <header className={classNames(styles.header)}>
            <div className={classNames(styles.navLeft)}>
                <button className={classNames(gloval.button, styles.button)}><i className="ri-home-6-line"></i></button>
            </div>
            <div className={classNames(styles.location)}>
                <h1 className={classNames(styles.title)}>KF-21 LIS</h1>
            </div>
            <div className={classNames(styles.navRight)}>
                <button className={classNames(gloval.button)}><i className="ri-notification-line"></i></button>
                <button className={classNames(gloval.button)}><i className="ri-menu-line"></i></button>
            </div>
        </header>
    );
}

export default App;
