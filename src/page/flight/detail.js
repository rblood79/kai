/*


*/

import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import Header from '../../components/header';
import styles from './detail.module.scss';

const App = () => {
    const { id } = useParams();
    const [title, setTitle] = useState(null)
    useEffect(() => {
        setTitle('KF21-000' + id)
    }, [])
    return (
        <>
            <Header title={title} depth={2} />
            <main className={styles.main}>
                <div className={styles.detail}>
                    detail
                </div>
            </main>
        </>
    );
}

export default App;

App.defaultProps = {
    
};