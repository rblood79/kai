
/*


*/
import React, { useEffect, useCallback } from 'react';

import Item from './item';

import styles from './itemList.module.scss';

const App = (props) => {

    const List = useCallback(
        () => props.data && props.data.map((item, index) => {
            return (<Item title={item.title} text={item.text} key={index} />)
        }),
        [props.data],
    );

    useEffect(() => {

    }, [])

    return (
        <>
            {
                props.data &&
                <div className={props.box ? styles.container : styles.containerEmpty}>
                    {props.icon && <span className={styles.baseIcon}><i className={props.icon}></i></span>}
                    <div className={styles.list}>
                        {<List />}
                    </div>
                </div>

            }
        </>

    )
}

export default React.memo(App);

App.defaultProps = {
    height: 40,
    title: 'title',
    titleColor: 'var(--colorSecondary)',
    background: 'var(--colorCard)',
    icon: null,
    box: true,
};