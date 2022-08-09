/*


*/
import { useLocation, useNavigate} from "react-router-dom";

import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';
//const cx = classNames.bind(styles);

const App = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    //console.log(location)
    return (
        <header className={classNames(styles.header)}>
            {
                location.pathname !== '/dashboard' &&
                <>
                    <button className={classNames(gloval.button, styles.back)} onClick={() => navigate(-1)}><i className="ri-arrow-left-s-line"></i></button>
                    <button className={classNames(gloval.button, styles.home)} onClick={() => navigate('/dashboard')}><i className="ri-home-6-line"></i></button>
                </>
            }

            <div className={classNames(styles.location)}>
                <h1 className={classNames(styles.title)}>KF-21 LIS</h1>
            </div>
            {
                location.pathname === '/dashboard' &&
                <>
                    <button className={classNames(gloval.button, styles.notification, styles.active)}><i className="ri-notification-line"></i></button>
                    <button className={classNames(gloval.button, styles.menu)}><i className="ri-menu-line"></i></button>
                </>
            }
            
        </header>
    );
}

export default App;
