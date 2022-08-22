
import { useEffect } from 'react';

import ItemF from '../item/itemFlight';
import ItemD from '../item/itemDefect';
import ItemM from '../item/itemMaintenance';

import styles from './index.module.scss';

const App = (props) => {

    useEffect(() => {
    }, [props.data])

    const listItems = props.data.map(item => {
        return (
            props.type === 'F' ? 
            <ItemF {...item} key={item.id} /> : 
            props.type === 'D' ? 
            <ItemD {...item} key={item.id} /> :
            props.type === 'M' ? 
            <ItemM {...item} key={item.id} /> :
            null
        )
    });

    return (
        <div className={styles.list}>
            {listItems}
        </div>
    )
}

export default App;

App.defaultProps = {

};