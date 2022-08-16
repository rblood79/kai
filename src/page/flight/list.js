/*


*/

import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';

import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/header';

const App = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <Header title={'Flight No'} depth={1} />
            <main className={styles.main}>
                <div>
                    8 FIGHTERS WERE QUERIED
                    DURING THIS
                    PERIOD
                </div>
                <div className={styles.list}>
                    <Link to='40'>link</Link>
                    <Link to='41'>link</Link>
                    <Link to='46'>link</Link>
                    <Link
                        to={{
                            pathname: "48",
                            state: { fromDashboard: true }
                        }}
                    >aaaa</Link>
                    <button onClick={() => navigate('15', { state: { id: 15, title: 'sabaoon' } })}>button</button>
                </div>
            </main>
        </>

    );
}

export default App;
