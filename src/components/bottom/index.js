
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import styles from './index.module.scss';

const App = (props) => {
    const data = [
        {
            link: '/flight',
            icon: 'ri-flight-takeoff-line',
            text: 'Flight',
        },
        {
            link: '/defect',
            icon: 'ri-tools-line',
            text: 'Defect',
        },
        {
            link: '/maintenance',
            icon: 'ri-user-settings-line',
            text: 'Maintenance',
        },
        {
            link: '/extenal',
            icon: 'ri-arrow-left-right-line',
            text: 'Extenal',
        },
        {
            link: '/schedule',
            icon: 'ri-calendar-todo-line',
            text: 'Schedule',
        },
    ]

    const item = (link, icon, text) => {
        return (
            <Link className={styles.item} to={link} key={link}>
                <i className={icon} />
                <span className={styles.label}>{text}</span>
            </Link>
        )
    }
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                {
                    data && data.map((d, i) => (
                        item(d.link, d.icon, d.text)
                    ))
                }
            </nav>
        </div>
    );
}

export default App;

App.defaultProps = {
    background: '#e5e7eb',
};