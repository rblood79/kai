
import { useEffect, useState } from 'react';
import { Api, Header, Tab } from '../../components';
import styles from './index.module.scss';
const App = (props) => {
    const [tab, setTab] = useState('Notice');

    useEffect(() => {
        console.log('tab', tab)
    }, [tab]);

    return (
        <>
            <Header title={'Notifycation'} depth={1} />
            <main className={styles.main}>
                <Tab label={["Notice", "User", "Other"]} onChange={setTab} />
                <div>
                    notifycation
                </div>
            </main>
        </>
    );
}

export default App;

App.defaultProps = {

};