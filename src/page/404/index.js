
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { userContext, } from '../../context';
import { Layout, Button } from '../../components';

import styles from './index.module.scss';

const App = () => {
    const navigate = useNavigate();
    const { user } = useContext(userContext);
    useEffect(() => {
        !user && navigate('/sign');
    }, [])

    return (
        <Layout height={'100%'} padding={'16px'}>
            <div className={styles.container}>
                <div className={styles.contents}>
                    <span className={styles.title}>404</span>
                    <span className={styles.comment}>Sorry... Page not found.</span>
                </div>
                <div className={styles.footer}>
                    <Button text={'Back'} onClick={() => { navigate(-1) }} />
                    <Button text={'Home'} background={'var(--colorPrimary)'} color={'var(--colorCard)'} onClick={() => { navigate('/') }} />
                </div>
            </div>
        </Layout>
    );
}

export default App;

App.defaultProps = {

};