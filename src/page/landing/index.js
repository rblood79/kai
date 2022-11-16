
import styles from './index.module.scss';
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { Layout } from '../../components';
import { userContext, } from '../../context';
const App = () => {
    const navigate = useNavigate();
    const { user } = useContext(userContext);
    useEffect(() => {
        !user ? navigate('/sign') : navigate('/dashboard')
    }, [])
    return (
        <Layout height={'100%'} padding={'0px'}>
            <div className={styles.container}>
                <div className={styles.contents}>
                    <span className={styles.title}>KF-21 LIS Ready</span>
                </div>
            </div>
        </Layout>
    );
}

export default App;

App.defaultProps = {

};