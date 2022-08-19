/*


*/

import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import Header from '../../components/header';
import styles from './detail.module.scss';

const App = () => {
    const [navState, setNavState] = useState(false);
    const toggleNav = () => console.log('edit');
    
    const { id } = useParams();
    const [title, setTitle] = useState(null);
    useEffect(() => {
        setTitle('KF21-000' + id)
    }, [])
    return (
        <>
            <Header title={title} depth={2} right={'edit'} navState={toggleNav} background={'#fff'} />
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.title}>
                        THESE ARE THE<br />
                        DETAILS OF THE FIGHTER<br />
                        YOU REQUESTED
                    </div>
                    <span className={styles.date}>LAST INFO OF 19 OCTOBER 2021</span>
                </header>
            </main>
        </>
    );
}

export default App;

App.defaultProps = {

};