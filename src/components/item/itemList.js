
/*


*/
import React, { useEffect } from 'react';

import Item from './item';

import styles from './itemList.module.scss';

const App = (props) => {
    const listItems = props.data.map((item, index) => {
        return (
            <Item title={item.title} text={item.text} key={index} />
        )
    });
    useEffect(() => {
        
    }, [])

    return (
        <div className={props.box ? styles.container : styles.containerEmpty}>
            {props.icon && <span className={styles.baseIcon}><i className={props.icon}></i></span>}
            <div className={styles.list}>
                {props.data && listItems}
            </div>
        </div>
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