/*


*/
import menuIcon from '../../images/menu.svg';
import closeIcon from '../../images/close.svg';
import filterIcon from '../../images/filter.svg';

import Nav from '../nav';

import { useLocation, useNavigate } from "react-router-dom";

import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';
//const cx = classNames.bind(styles);

const App = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <header className={classNames(styles.header)} style={{ 'background': props.background }}>

            {
                props.depth > 0 && <button className={classNames(gloval.button, styles.back)} onClick={() => navigate(-1)}><i className="ri-arrow-left-s-line"></i></button>
            }

            {
                props.depth > 1 && <button className={classNames(gloval.button, styles.home)} onClick={() => navigate('/dashboard')}><i className="ri-home-6-line"></i></button>

            }

            <div className={classNames(styles.location)}>
                <h1 className={classNames(styles.title)}>{props.title}</h1>
            </div>

            {
                props.depth === 0 &&
                <>
                    <button className={classNames(gloval.button, styles.notification, styles.active)} onClick={() => navigate('/notify')}><i className="ri-notification-line"></i></button>
                    <button className={classNames(gloval.button, styles.menu)} onClick={() => props.toggleNav()}>
                        <img src={props.navState ? closeIcon : menuIcon} />
                    </button>
                    <Nav navState={props.navState} />
                </>
            }

            {
                props.right &&
                <button className={classNames(gloval.button, styles.menu)} onClick={() => props.navState()}>
                    {
                        props.right === 'filter' ?
                            <img src={filterIcon} /> :
                            props.right === 'edit' ? <span className={styles.text}>edit</span> :
                                props.right === 'save' ? <span className={styles.text}>save</span> : null
                    }
                </button>
            }

        </header>
    );
}

export default App;

App.defaultProps = {

};
