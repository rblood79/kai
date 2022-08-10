import styles from './index.module.scss';

import { Link } from "react-router-dom";

const App = (props) => {

    return (
        <div className={styles.container}>
            <div className={styles.user}>user info</div>
            <nav className={styles.list}>
                <Link className={styles.item} to='/flight'>Flight No</Link>
                <Link className={styles.item} to='/defact'>Defact</Link>
                <Link className={styles.item} to='/maintenance'>Maintenance</Link>
                <Link className={styles.item} to='/extenal'>Extenal Change</Link>
                <Link className={styles.item} to='/order'>Maintenance Order Flight</Link>
                <Link className={styles.item} to='/schedule'>Schedule Maintenance</Link>
                <Link className={styles.item} to='/tci'>TCI Maintenance</Link>
                <Link className={styles.item} to='/loc'>A/C Loc & Status</Link>
            </nav>
        </div>
    );
}

export default App;
