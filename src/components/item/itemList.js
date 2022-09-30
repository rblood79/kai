
/*


*/
import { useEffect } from 'react';

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
        <div className={styles.container}>
            {props.icon && <span className={styles.baseIcon}><i className={props.icon}></i></span>}
            <div className={styles.list}>
                {listItems}
            </div>
        </div>
    )
}

export default App;

App.defaultProps = {
    height: 40,
    title: 'title',
    titleColor: 'var(--colorSecondary)',
    background: 'var(--colorCard)',
    icon: null,
};