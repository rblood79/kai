/*


*/

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';

const App = (props) => {
    //const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    return (
        <section className={styles.container} style={{ background: props.background }}>
            <div className={styles.head}>
                <span className={styles.title} style={{ color: props.titleColor }}>{props.title}</span>
                {props.rightType === 'text' && props.rightText && <span className={styles.text}>{props.rightText}</span>}
                {props.rightType === 'button' && props.rightText && <button className={styles.button}
                    onClick={() => {
                        navigate(props.rightLink, { state: { data: null } })
                    }}>
                    {props.rightText}
                </button>}
            </div>
            {
                props.children &&
                <div className={props.line ? styles.childrenLine : styles.children} style={{ gap: props.gap, padding: props.padding }}>{props.children}</div>
            }
        </section>
    );
}

export default React.memo(App);

App.defaultProps = {
    title: 'Title',
    rightType: 'text',
    rightText: null,
    rightLink: null,
    gap: 48,
    line: true,
};