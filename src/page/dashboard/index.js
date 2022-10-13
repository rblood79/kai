/*


*/
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Bottom, Tab } from '../../components';
import styles from './index.module.scss';

const App = () => {
    const standalone = 'standalone' in window.navigator && window.navigator.standalone;

    const [type, setType] = useState('LIST');
    const [state, setState] = useState(false);
    const toggleNav = () => setState(!state);
    return (
        <>
            <Header title={'KF-21 LIS'} depth={0} state={state} toggleNav={toggleNav} />
            <main className={styles.main} style={{ overflow: 'hidden' }}>

                <div className={styles.controller}>
                    <Tab label={["LIST", "GRID"]} onChange={setType} />
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