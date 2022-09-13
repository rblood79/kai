/*


*/

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../../components/header';
import styles from './detail.module.scss';

import Card from '../../components/card';
import ItemList from '../../components/item/itemList';

const App = () => {
    //const [state, seState] = useState(false);
    const toggleNav = () => console.log('save');


    const { id } = useParams();
    const [title, setTitle] = useState(null);

    useEffect(() => {
        setTitle('KF21-000' + id)
    }, [])

    return (
        <>
            <Header title={title} depth={2} right={'save'} state={toggleNav} background={'#fff'} />
            <main className={styles.main}>
                <Card
                    icon={'ri-survey-line'}
                    title={'Plan'}
                >
                    input
                </Card>
            </main>
        </>
    );
}

export default App;

App.defaultProps = {

};