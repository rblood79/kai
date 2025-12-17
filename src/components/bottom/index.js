/*
* @date         : 2022-11-01
* @description  : app mode(바탕화면 바로가기)일때 bottom navigation
* @parameter    : none
*/

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useSpring, animated, easings } from '@react-spring/web';
import { bottomStatusHeight } from '../../util';

import styles from './index.module.scss';

const BottomNavigation = () => {
    const [navState, setNavState] = useState(false);
    const toggleNav = () => setNavState(!navState);

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
            text: 'Mnt',
        },
        {
            link: '/extenal',
            icon: 'ri-arrow-left-right-line',
            text: 'Extenal',
        },
        {
            link: '/order',
            icon: 'ri-survey-line',
            text: 'Order',
        },
        {
            link: '/schedule',
            icon: 'ri-calendar-todo-line',
            text: 'Schedule',
        },
        {
            link: '/tci',
            icon: 'ri-time-line',
            text: 'TCI',
        },
        {
            link: '/loc',
            icon: 'ri-map-pin-2-line',
            text: 'A/C Loc',
        },
    ]

/*
* @date         : 2022-11-01
* @description  : bottom button item
* @parameter    : link, icon, text
*/
    const item = (link, icon, text) => {
        return (
            <Link className={styles.item} to={link} key={link}>
                <i className={icon} />
                <span className={styles.label}>{text}</span>
            </Link>
        )
    }

    const navStyle = useSpring(
        {
            transform: navState ? "translateY(-56px)" : "translateY(0px)",
            config: { duration: 480, easing: easings.easeInOutExpo },
        }
    )

    const navPoint = useSpring(
        {
            transform: navState ? "translateY(10px)" : "translateY(0px)",
            config: { duration: 480, easing: easings.easeInOutExpo },
        }
    )

    return (
        <div className={styles.container}>
            <div className={styles.contents} style={{ marginBottom: bottomStatusHeight }}>
                <animated.nav className={styles.nav} style={navStyle}>
                    {
                        data && data.map((d, i) => (
                            item(d.link, d.icon, d.text)
                        ))
                    }
                </animated.nav>
                <button className={styles.switch} onClick={() => toggleNav()}>
                    <div className={styles.box}>
                        <animated.span className={styles.point} style={navPoint} />
                    </div>
                </button>
            </div>
        </div>
    );
}

export default React.memo(BottomNavigation);

BottomNavigation.defaultProps = {
    background: '#e5e7eb',
};