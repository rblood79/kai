
/*
* @date         : 2022-11-01
* @description  : app top
* @parameter    : title
*/

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as MenuIcon } from '../../images/menu.svg';
import { ReactComponent as CloseIcon } from '../../images/close.svg';
import { ReactComponent as FilterIcon } from '../../images/filter.svg';

import Aside from '../aside';
//import Text from '../text';
import styles from './index.module.scss';
import classNames from 'classnames';

const App = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [state, setState] = useState(false);

    useEffect(() => {
    }, [])
    return (
        <header className={classNames(styles.header, !props.scrollTop && styles.active)} style={{ 'background': props.scrollTop ? 'transparent' : props.background }}>

            {
                props.depth > 0 &&
                <button className={styles.back}
                    onClick={() => {
                        navigate(-1)
                    }}><i className="ri-arrow-left-line"></i>
                </button>
            }

            {
                props.depth > 1 && <button className={styles.home} onClick={() => navigate('/dashboard')}><i className="ri-home-6-line"></i></button>

            }

            <div className={classNames(styles.location)}>
                <h1 className={classNames(styles.title, location.pathname === '/dashboard' && styles.active)}>
                    {props.title && props.title}
                </h1>
            </div>

            {
                props.depth === 0 &&
                <>
                    <button className={classNames(styles.notification, styles.active)}
                        onClick={() => navigate('/notify')}
                    >
                        <i className="ri-notification-line"></i>
                    </button>
                    <button className={classNames(styles.menu)} onClick={() => setState(!state)}>
                        {
                            state ? <CloseIcon width={24} height={24} fill={'var(--colorBase)'} /> : <MenuIcon width={24} height={24} fill={'var(--colorText)'} />
                        }
                    </button>
                    <Aside state={state} />
                </>
            }

            {
                props.right &&
                <button className={styles.menu} onClick={props.state}>
                    {
                        props.right === 'filter' ?
                            <FilterIcon width={24} height={24} fill={'var(--colorText)'} /> :
                            props.right === 'edit' ? <span className={styles.text}>edit</span> :
                                props.right === 'save' ? <span className={styles.text}>save</span> : null
                    }
                </button>
            }
        </header>
    );
}

//export default App;
export default React.memo(App);

App.defaultProps = {
    scrollTop: true,
    background: 'transparent',
};
