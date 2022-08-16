/*


*/

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
                        First
                    </div>
                    <div className={styles.body}>

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
