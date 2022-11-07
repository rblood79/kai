
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { userContext, } from '../../context';

import styles from './index.module.scss';

const App = () => {
    const navigate = useNavigate();
    const { user } = useContext(userContext);
    useEffect(() => {
        !user && navigate('/sign');
    }, [])

    return (
        <div className={styles.container}>
            No page found.
        </div>
    );
}

export default App;

App.defaultProps = {

};