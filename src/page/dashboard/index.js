/*


*/
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Bottom } from '../../components';
import styles from './index.module.scss';
import classNames from 'classnames';


const App = () => {
    const standalone = 'standalone' in window.navigator && window.navigator.standalone;

    const [type, setType] = useState('list');
    const [navState, setNavState] = useState(false);
    const toggleNav = () => setNavState(!navState);
    return (
        <>
            <Header title={'KF-21 LIS'} depth={0} state={navState} toggleNav={toggleNav} />
            <main className={styles.main} style={{}}>
                <div className={styles.tabController}>
                    <div className={classNames(styles.type, type === 'list' && styles.active)}>
                        <button className={classNames(type === 'list' && styles.active)} onClick={() => { setType('list') }}>LIST</button>
                        <button className={classNames(type === 'grid' && styles.active)} onClick={() => { setType('grid') }}>GRID</button>
                    </div>
                </div>
                <div className={styles.contents}>
                    <Outlet context={{ type }} />
                </div>
            </main>
            {standalone && <Bottom />}
        </>
    );
}

export default App;

App.defaultProps = {

};