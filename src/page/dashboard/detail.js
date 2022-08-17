/*


*/
import aircraftFront from '../../images/aircraftFront@3x.png';

import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import Header from '../../components/header';
import styles from './detail.module.scss';

const App = () => {
    const { id } = useParams();
    const [title, setTitle] = useState(null)
    useEffect(() => {
        setTitle('KF21-' + id)
    }, [])
    return (
        <>
            <Header title={title} backgroundColor={'#f8f8f8'} depth={1} />
            <main className={styles.main}>
                <section className={styles.overview}>
                    <div className={styles.header}>

                        <div className={styles.label}>
                            <span className={styles.title}>First Intro</span><span className={styles.value}>26 May 2020</span>
                        </div>
                        <span className={styles.base}><i className="ri-timer-2-line"></i></span>
                        <div className={styles.label}>
                            <span className={styles.title}>Fuselage Time</span><span className={styles.value}>OH:2,125 / FH:235</span>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <img className={styles.aircraft} src={aircraftFront} />
                        <div className={styles.rate}>
                            <div className={styles.label}>
                                <span className={styles.title}>Behavior Rate</span><span className={styles.value}>68%</span>
                            </div>
                            <div className={styles.bar}>
                                <span className={styles.value} style={{ width: '68%' }} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.label}>
                            <span className={styles.title}>Aircraft Status</span><span className={styles.value}>At Maintenance</span>
                        </div>
                        <div className={styles.label}>
                            <span className={styles.title}>Maintenance date</span><span className={styles.value}>24 June 2022</span>
                        </div>
                    </div>
                </section>

                <section className={styles.card}>
                    <div className={styles.header}>
                        Flight No
                    </div>
                    <div className={styles.body}>
                        Plan
                    </div>
                </section>

                <section className={styles.card}>
                    <div className={styles.header}>
                        Defect
                    </div>
                    <div className={styles.body}>

                    </div>
                </section>

                <section className={styles.card}>
                    <div className={styles.header}>
                        Maintenance
                    </div>
                    <div className={styles.body}>

                    </div>
                </section>

            </main>
        </>
    );
}

export default App;
