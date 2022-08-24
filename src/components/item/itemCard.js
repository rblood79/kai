
/*


*/
import { useEffect } from 'react';

import Item from './item';

import styles from './itemCard.module.scss';

const App = (props) => {
    const listItems = props.data.map((item, index) => {
        return (
            <Item title={item.title} text={item.text} key={index}/>
        )
    });
    useEffect(() => {
    }, [])

    return (
        <section className={styles.card} style={{ background: props.background }}>
            <div className={styles.header}>
                <span className={styles.title} style={{ color: props.titleColor }}>{props.title}</span>
                <span className={styles.right}>{props.text}</span>
            </div>
            <div className={styles.body}>
                {props.icon && <span className={styles.baseIcon}><i className={props.icon}></i></span>}
                <div className={styles.list}>
                    {listItems}
                </div>
            </div>
        </section>
    )
}

export default App;

App.defaultProps = {
    height: 40,
    title: 'title',
    titleColor: '#141414',
    background: '#fff',
    icon: null,
};