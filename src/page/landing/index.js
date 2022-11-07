
import styles from './index.module.scss';
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { userContext, } from '../../context';
const App = () => {
    const navigate = useNavigate();
    const { user } = useContext(userContext);
    useEffect(() => {
        !user ? navigate('/sign') : navigate('/dashboard')
    }, [])
    return (
        <div className={styles.container}>
            LANDING
        </div>
    );
}

export default App;

App.defaultProps = {

};