/*


*/
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { List } from '../../components';

import gloval from '../../components/index.module.scss';
import styles from './list.module.scss';
import classNames from 'classnames';


import Header from '../../components/header';

const App = (props) => {
    const navigate = useNavigate();
    const [navState, setNavState] = useState(false);
    const toggleNav = () => setNavState(!navState);
    const [data, setData] = useState([])

    useEffect(() => {
        setData(
            [
                {
                    id: '001',
                    title: '220218-KFX-001',
                    date: '24 June 2022',
                    no: '27-003',
                    planTO: '17:30:40',
                    planLD: '18:30:00',
                    actualTO: '17:30:00',
                    actualLD: '18:00:00',
                },
                {
                    id: '002',
                    title: '210218-KFX-002',
                    date: '18 July 2022',
                    no: '20-001',
                    planTO: '11:30:40',
                    planLD: '11:30:00',
                    actualTO: '12:30:00',
                    actualLD: '12:00:00',
                },
                {
                    id: '003',
                    title: '220224-KFX-003',
                    date: '06 march 2021',
                    no: '20-001',
                    planTO: '11:30:40',
                    planLD: '11:30:00',
                    actualTO: '12:30:00',
                    actualLD: '12:00:00',
                }
            ]
        )
    }, [])

    return (
        <>
            <Header title={'Flight List'} depth={1} right={'filter'} navState={toggleNav} background={'#fff'} />
            <main className={styles.main}>
                
                <header className={styles.header}>
                    <div className={styles.title}>
                        {data && data.length} FIGHTERS WERE QUERIED<br />
                        DURING THIS<br />
                        PERIOD
                    </div>
                    <span className={styles.date}>25 JUNE 2020 - 19 OCTOBER 2021</span>
                </header>

                <List data={data} type={'F'}/>

                {/*
                    <div className={styles.list}>
                        <Link to='46'>link</Link>
                        <Link
                            to={{
                                pathname: "48",
                                state: { fromDashboard: true }
                            }}
                        >aaaa</Link>
                        <button onClick={() => navigate('15', { state: { id: 15, title: 'sabaoon' } })}>button</button>
                    </div>
                        */}
            </main>
        </>

    );
}

export default App;

App.defaultProps = {

};