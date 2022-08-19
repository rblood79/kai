/*


*/
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import gloval from '../../components/index.module.scss';
import styles from './list.module.scss';
import classNames from 'classnames';


import Header from '../../components/header';

const App = (props) => {
    const navigate = useNavigate();
    const [navState, setNavState] = useState(false);
    const toggleNav = () => setNavState(!navState);
    return (
        <>
            <Header title={'Flight List'} depth={1} right={'filter'} navState={toggleNav} background={'#fff'} />
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.title}>
                        8 FIGHTERS WERE QUERIED<br />
                        DURING THIS<br />
                        PERIOD
                    </div>
                    <span className={styles.date}>25 JUNE 2020 - 19 OCTOBER 2021</span>
                </header>

                <div className={styles.list}>
                    <section className={styles.card}>
                        <div className={styles.header}>
                            <span className={styles.title}>220218-KFX-001</span>
                            <Link className={styles.more} to='40'>detail</Link>
                        </div>

                        <div className={styles.info}>
                            <div className={styles.item}>
                                <span className={styles.title}>Flight Date</span>
                                <span className={styles.text}>24 June 2022</span>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.title}>Tail No</span>
                                <span className={styles.text}>27-003</span>
                            </div>
                        </div>

                        <div className={styles.body}>
                            <span className={styles.baseIcon}><i className="ri-flight-takeoff-fill"></i></span>
                            <div className={classNames(styles.list, styles.row)}>
                                <div className={classNames(styles.item, styles.col, styles.left)}>
                                    <span className={styles.title}>Plan</span>
                                    <div className={styles.textGroup}>
                                        <span className={styles.text}>T/O 17:30:40</span>
                                        <span className={styles.text}>L/D 18:30:00</span>
                                    </div>
                                </div>
                                <div className={classNames(styles.item, styles.col, styles.right)}>
                                    <span className={styles.title}>Actual</span>
                                    <div className={styles.textGroup}>
                                        <span className={styles.text}>T/O 17:30:40</span>
                                        <span className={styles.text}>L/D 18:30:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.card}>
                        <div className={styles.header}>
                            <span className={styles.title}>220218-KFX-001</span>
                            <Link className={styles.more} to='45'>detail</Link>
                        </div>

                        <div className={styles.info}>
                            <div className={styles.item}>
                                <span className={styles.title}>Flight Date</span>
                                <span className={styles.text}>24 June 2022</span>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.title}>Tail No</span>
                                <span className={styles.text}>27-003</span>
                            </div>
                        </div>

                        <div className={styles.body}>
                            <span className={styles.baseIcon}><i className="ri-flight-takeoff-fill"></i></span>
                            <div className={classNames(styles.list, styles.row)}>
                                <div className={classNames(styles.item, styles.col, styles.left)}>
                                    <span className={styles.title}>Plan</span>
                                    <div className={styles.textGroup}>
                                        <span className={styles.text}>T/O 17:30:40</span>
                                        <span className={styles.text}>L/D 18:30:00</span>
                                    </div>
                                </div>
                                <div className={classNames(styles.item, styles.col, styles.right)}>
                                    <span className={styles.title}>Actual</span>
                                    <div className={styles.textGroup}>
                                        <span className={styles.text}>T/O 17:30:40</span>
                                        <span className={styles.text}>L/D 18:30:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.card}>
                        <div className={styles.header}>
                            <span className={styles.title}>220218-KFX-001</span>
                            <Link className={styles.more} to='45'>detail</Link>
                        </div>

                        <div className={styles.info}>
                            <div className={styles.item}>
                                <span className={styles.title}>Flight Date</span>
                                <span className={styles.text}>24 June 2022</span>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.title}>Tail No</span>
                                <span className={styles.text}>27-003</span>
                            </div>
                        </div>

                        <div className={styles.body}>
                            <span className={styles.baseIcon}><i className="ri-flight-takeoff-fill"></i></span>
                            <div className={classNames(styles.list, styles.row)}>
                                <div className={classNames(styles.item, styles.col, styles.left)}>
                                    <span className={styles.title}>Plan</span>
                                    <div className={styles.textGroup}>
                                        <span className={styles.text}>T/O 17:30:40</span>
                                        <span className={styles.text}>L/D 18:30:00</span>
                                    </div>
                                </div>
                                <div className={classNames(styles.item, styles.col, styles.right)}>
                                    <span className={styles.title}>Actual</span>
                                    <div className={styles.textGroup}>
                                        <span className={styles.text}>T/O 17:30:40</span>
                                        <span className={styles.text}>L/D 18:30:00</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/*
                    <div className={styles.list}>
                        <Link to='40'>link</Link>
                        <Link to='41'>link</Link>
                        <Link to='46'>link</Link>
                        <Link
                            to={{
                                pathname: "48",
                                state: { fromDashboard: true }
                            }}
                        >aaaa</Link>
                        <button onClick={() => navigate('15', { state: { id: 15, title: 'sabaoon' } })}>button</button>
                    </div>
                        */}
            </main>
        </>

    );
}

export default App;

App.defaultProps = {

};