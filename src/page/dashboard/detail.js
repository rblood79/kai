/*


*/
import aircraftFront from '../../images/aircraftFront@3x.png';
import aircraftSide from '../../images/aircraftLeft@3x.png';
import aircraftTop from '../../images/aircraftTop@3x.png';

import { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

import Header from '../../components/header';
import styles from './detail.module.scss';
import classNames from 'classnames';

const App = () => {
    const { id } = useParams();
    const [title, setTitle] = useState(null)
    useEffect(() => {
        setTitle('KF21-' + id)
    }, [id])
    return (
        <>
            <Header title={title} backgroundColor={'#f8f8f8'} depth={1} />
            <main className={styles.main}>
                <section className={styles.overview}>
                    <div className={styles.header}>

                        <div className={styles.item}>
                            <span className={styles.title}>First Intro</span><span className={styles.text}>26 May 2020</span>
                        </div>
                        <span className={styles.baseIcon}><i className="ri-timer-2-line"></i></span>
                        <div className={styles.item}>
                            <span className={styles.title}>Fuselage Time</span><span className={styles.text}>OH:2,125 / FH:235</span>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <img className={styles.aircraft} src={aircraftFront} alt='aircraft' />
                        <div className={styles.rate}>
                            <div className={styles.item}>
                                <span className={styles.title}>Behavior Rate</span><span className={styles.text}>68%</span>
                            </div>
                            <div className={styles.bar}>
                                <span className={styles.value} style={{ width: '68%' }} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.item}>
                            <span className={styles.title}>Aircraft Status</span><span className={styles.text}>At Maintenance</span>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.title}>Maintenance date</span><span className={styles.text}>24 June 2022</span>
                        </div>
                    </div>
                </section>

                <section className={styles.card}>
                    <div className={styles.header}>
                        <span className={styles.title}>Flight No</span>
                        <Link className={styles.more} to='/flight'>more</Link>
                    </div>

                    <div className={styles.info}>
                        <div className={styles.item}>
                            <span className={styles.title}>Flight Date</span>
                            <span className={styles.text}>24 June 2022</span>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.title}>Tail No</span>
                            <span className={styles.text}>220218-KFX-001</span>
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
                        <span className={styles.title}>Defect</span>
                        <Link className={styles.more} to='/defect'>more</Link>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.item}>
                            <span className={styles.title}>Cause</span>
                            <span className={styles.text}>Turbine Lose</span>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.title}>Defect No</span>
                            <span className={styles.text}>2DX00004594XXF</span>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.title}>Defect Date</span>
                            <span className={styles.text}>26 AUG 2021</span>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <span className={styles.baseIcon}><i className="ri-tools-fill"></i></span>
                        <div className={styles.list}>
                            <div className={classNames(styles.item, styles.image)}>
                                <img className={styles.aircraft} src={aircraftFront} alt='aircraft' />
                                <span className={styles.title}>Front</span>
                            </div>
                            <div className={classNames(styles.item, styles.image)}>
                                <img className={styles.aircraft} src={aircraftSide} alt='aircraft' />
                                <span className={styles.title}>Side</span>
                            </div>
                            <div className={classNames(styles.item, styles.image)}>
                                <img className={styles.aircraft} src={aircraftTop} alt='aircraft' />
                                <span className={styles.title}>Top</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.card}>
                    <div className={styles.header}>
                        <span className={styles.title}>Maintenance</span>
                        <Link className={styles.more} to='/maintenance'>more</Link>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.item}>
                            <span className={styles.title}>Content</span>
                            <span className={styles.text}>Turbine Defect</span>
                        </div>
                        <div className={styles.item}>
                            <span className={styles.title}>Maintenance No</span>
                            <span className={styles.text}>2DX00004594XXF</span>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <span className={styles.baseIcon}><i className="ri-user-settings-line"></i></span>

                        <div className={styles.list}>
                        <div className={styles.itemGroup}>
                                <span className={styles.title}>EVERY 60 DAYS(I)</span>
                                <div className={styles.item}>
                                    <span className={styles.title}>Cycle</span>
                                    <span className={styles.text}>18SVM</span>
                                </div>
                                <div className={styles.item}>
                                    <span className={styles.title}>Date</span>
                                    <span className={styles.text}>24 MAY 2020</span>
                                </div>
                                <div className={styles.bar}>
                                    <span className={styles.value} style={{ width: '51%' }} />
                                    <span className={styles.text}>51%</span>
                                </div>
                            </div>

                            <div className={styles.itemGroup}>
                                <span className={styles.title}>EVERY 18 MONTHS(I)</span>
                                <div className={styles.item}>
                                    <span className={styles.title}>Cycle</span>
                                    <span className={styles.text}>18SVM</span>
                                </div>
                                <div className={styles.item}>
                                    <span className={styles.title}>Date</span>
                                    <span className={styles.text}>24 MAY 2020</span>
                                </div>
                                <div className={styles.bar}>
                                    <span className={styles.value} style={{ width: '86%' }} />
                                    <span className={styles.text}>86%</span>
                                </div>
                            </div>

                            <div className={styles.itemGroup}>
                                <span className={styles.title}>EVERY 36 MONTHS(I)</span>
                                <div className={styles.item}>
                                    <span className={styles.title}>Cycle</span>
                                    <span className={styles.text}>18SVM</span>
                                </div>
                                <div className={styles.item}>
                                    <span className={styles.title}>Date</span>
                                    <span className={styles.text}>24 MAY 2020</span>
                                </div>
                                <div className={styles.bar}>
                                    <span className={styles.value} style={{ width: '36%' }} />
                                    <span className={styles.text}>36%</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                <section className={styles.card}>
                    <div className={styles.header}>
                        <span className={styles.title}>Consume</span>
                        <Link className={styles.more} to='/consume'>more</Link>
                    </div>
                    <div className={styles.body}>
                        <span className={styles.baseIcon}><i className="ri-shopping-bag-line"></i></span>
                    </div>
                </section>

            </main>
        </>
    );
}

export default App;

App.defaultProps = {

};