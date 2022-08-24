


import { useSpring, animated, easings } from '@react-spring/web';
import { Link } from "react-router-dom";

import styles from './index.module.scss';

const myCallback = (animatedValue) => {
    //console.log("animation frame, animatedValue: ", animatedValue);
};

const App = (props) => {
    const data = [
        {
            link: '/flight',
            icon: 'ri-flight-takeoff-line',
            text: 'Flight List',
        },
        {
            link: '/defact',
            icon: 'ri-tools-line',
            text: 'Defact',
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
    ]

    const { opacity, xyz } = useSpring({
        opacity: props.state ? 1 : 0,
        xyz: props.state ? [0, 0, 0] : [window.innerWidth, 0, 0],
        onFrame: myCallback,
        config: {
            duration: 480,
            easing: easings.easeInOutQuart,
        }
    });

    const item = (link, icon, text) => {
        return (
            <Link className={styles.item} to={link} key={link}>
                <i className={icon} />
                <span>{text}</span>
            </Link>
        )
    }

    return (
        <animated.nav className={styles.container} style={{
            //opacity,
            transform: xyz.to((x, y, z) => `translate3d(${x}px, ${y}px, ${z}px)`),
        }}
        >
            <div className={styles.contents}>
                <div className={styles.user}>
                    <div className={styles.avatar}>
                        <i className="ri-user-line"></i>
                    </div>
                    <div className={styles.name}>
                        LEVEL 1, Bryan Fury
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

export default App;

App.defaultProps = {

};