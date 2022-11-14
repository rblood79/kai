/*


*/

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import styles from './index.module.scss';
import classNames from 'classnames';

const App = (props) => {
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    return (
        <section className={classNames(styles.container, !props.outline && styles.none)} style={{ background: props.background }}>

            {props.title &&
                <div className={classNames(styles.head, props.line && styles.line)}>
                    <span className={styles.title} style={{ color: props.titleColor }}>{props.title && props.title}</span>
                    {props.rightType === 'text' && props.rightText && <span className={styles.text}>{props.rightText}</span>}
                    {props.rightType === 'button' && props.rightText &&
                        <Button
                            label={props.rightText}
                            background={props.rightBackground}
                            color={props.rightColor}
                            fontSize={'16px'}
                            width={'auto'}
                            height={'32px'}
                            radius={'48px'}
                            onClick={() => {
                                navigate(props.rightLink)
                            }}
                        />}

                </div>
            }
            {
                props.children &&
                <div className={props.line ? styles.childrenLine : styles.children} style={{ gap: props.gap, padding: props.padding }}>{props.children}</div>
            }
        </section>
    );
}

export default React.memo(App);

App.defaultProps = {
    //title: 'Title',
    rightType: 'text',
    rightText: null,
    rightLink: null,
    rightBackground: 'var(--colorPrimary)',
    rightColor: 'var(--colorCard)',
    gap: 48,
    line: true,
    outline: true,

};