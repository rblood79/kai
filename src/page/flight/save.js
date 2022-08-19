/*


*/

import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import Header from '../../components/header';
import styles from './detail.module.scss';

const App = () => {
    const toggleNav = () => console.log('save');
    
    const { id } = useParams();
    const [title, setTitle] = useState(null);
    useEffect(() => {
        setTitle('KF21-000' + id)
    }, [])
    return (
        <>
            <Header title={title} depth={2} right={'save'} navState={toggleNav} background={'#fff'} />
            <main className={styles.main}>
                {title}--save
            </main>
        </>
    );
}

export default App;

App.defaultProps = {

};