

import React, { useContext } from 'react';
import { useSpring, animated, easings } from '@react-spring/web';
import { useNavigate } from "react-router-dom";
import context from '../../context';
import styles from './index.module.scss';

const App = (props) => {
    const navigate = useNavigate();
    const state = useContext(context);
    const data = [
        {
            link: '/flight',
            icon: 'ri-flight-takeoff-line',
            text: 'Flight List',
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
            text: 'Extenal Change',
        },
        {
            link: '/order',
            icon: 'ri-survey-line',
            text: 'Maintenance Order Flight',
        },
        {
            link: '/schedule',
            icon: 'ri-calendar-todo-line',
            text: 'Schedule Maintenance',
        },
        {
            link: '/tci',
            icon: 'ri-time-line',
            text: 'TCI Maintenance',
        },
        {
            link: '/loc',
            icon: 'ri-map-pin-2-line',
            text: 'A/C Loc & Status',
        },
        {
            link: '/sign',
            icon: 'ri-logout-box-r-line',
            text: 'Sign Out',
        },
    ]

    const { xyz } = useSpring({
        opacity: props.state ? 1 : 0,
        xyz: props.state ? [0, 0, 0] : [window.innerWidth, 0, 0],
        config: {
            duration: 480,
            easing: easings.easeInOutQuart,
        }
    });

    const item = (link, icon, text) => {
        return (
            <button className={styles.item} key={link} onClick={() => {
                link !== '/sign' ?
                    navigate(link) : state.setUser(null)
            }}>
                <i className={icon} />
                <span>{text}</span>
            </button>
        )
    }

    return (
        <animated.nav className={styles.container} style={{
            transform: xyz.to((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`),
        }}
        >
            <div className={styles.contents}>
                <div className={styles.user}>
                    <div className={styles.avatar}>
                        <i className="ri-user-line"></i>
                    </div>
                    <div className={styles.name}>
                        {state.user && state.user.name}
                    </div>
                </div>
                <div className={styles.list}>
                    {
                        data && data.map((d, i) => (
                            item(d.link, d.icon, d.text)
                        ))
                    }
                </div>
            </div>
        </animated.nav>
    );
}

export default React.memo(App);

App.defaultProps = {

};