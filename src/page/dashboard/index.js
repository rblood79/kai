/*


*/
import { useState } from 'react';

import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';

import Header from '../../components/header';
import Nav from '../../components/nav';
import { Outlet } from 'react-router-dom';

const App = () => {
    const [type, setType] = useState('list');
    const [navState, setNavState] = useState(false);
    
    const toggleNav = () => setNavState(!navState);
    return (
        <>
            <Header title={'KF-21 LIS'} depth={0} navState={toggleNav}/>
            <main className={styles.main}>

                <div className={styles.tabController}>
                    <div className={classNames(styles.type, type === 'list' && styles.active)}>
                        <button className={classNames(type === 'list' && styles.active)} onClick={() => { setType('list') }}>LIST</button>
                        <button className={classNames(type === 'grid' && styles.active)} onClick={() => { setType('grid') }}>GRID</button>
                    </div>
                </div>

                <Outlet context={{ type }} />

                {
                    /*<section className={classNames(styles.section, styles.card)}>
                        <div className={classNames(styles.header)}>
                            <h2 className={classNames(styles.title)}>Flight No</h2>
                        </div>
                        <div className={classNames(styles.body)}>contents</div>
                    </section>
    
                    <section className={classNames(styles.section)}>
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
                    </section>*/
                }

            </main>
            <Nav navState={navState} />
        </>
    );
}

export default App;

App.defaultProps = {
    
};