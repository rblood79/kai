
/*


*/
import { useEffect } from 'react';

import styles from './item.module.scss';

const App = (props) => {

    useEffect(() => {
    }, [])

    return (
        <div className={styles.item} style={{ height: props.height }}>
            <span className={styles.title} style={{ color: props.titleColor }}>{props.title}</span>
            <span className={styles.text} style={{ color: props.textColor }}>{props.text}</span>
        </div>
    )
}

export default App;

App.defaultProps = {
    height: 40,
    title: 'title',
    text: 'text',
    titleColor: '#b4b4b4',
    textColor: '#606060',
};