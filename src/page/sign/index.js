import { useContext, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { Api, Input, Button } from '../../components';
import context from '../../context';

const App = () => {
    //const location = useLocation();
    //const navigate = useNavigate();
    const standalone = 'standalone' in window.navigator && window.navigator.standalone;
    const state = useContext(context);
    const { setUser } = state;
    const [params, setParams] = useState(
        {
            id: '',
            pw: '',
        }
    )
    const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const signIn = async () => {
        //console.log(params)
        try {
            const response = await Api({
                url: 'sign',
                method: 'get',
                params: params,
            });
            setUser(response.data)
        } catch (error) {
            setUser(
                {
                    id: 'tester',
                    name: 'Bryan Fury',
                    level: '45Level',
                    group: 'admin',
                }
            )
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleGroup}>
                    <span className={styles.title}>KF-21</span>
                    <div className={styles.sub}>
                        Logistics<br />
                        Information System
                    </div>
                </div>
                <span className={styles.subTitle}>Next-Generation Fighter</span>
            </div>

            <div className={styles.main} style={{ paddingBottom: standalone ? '27px' : '0px' }}>
                <div className={styles.inputGroup}>
                    <Input placeholder={'ID'} value={params.id} column={'id'} callBack={setParams} />
                    <Input placeholder={'PASSWORD'} value={params.pw} column={'pw'} callBack={setParams} type={'password'} />
                </div>
                <Button text={'Sign In'} background={'var(--colorPrimary)'} color={'var(--colorBase)'} onClick={signIn} />
                <Button text={'Need help?'} background={'transparent'} color={'var(--colorLight)'} onClick={() => { console.log('help') }} />
            </div>
        </main>
    );
}

export default App;

App.defaultProps = {

};