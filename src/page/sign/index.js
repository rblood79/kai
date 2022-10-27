import { useContext, useState } from 'react';
import styles from './index.module.scss';
import { Api, Input, Button } from '../../components';
import context from '../../context';

const App = () => {
    const standalone = 'standalone' in window.navigator && window.navigator.standalone;
    const state = useContext(context);

    const [params, setParams] = useState(
        {
            id: '',
            pw: '',
        }
    )
    const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const signIn = async (e) => {
        e.preventDefault();
        //console.log(params)
        try {
            const response = await Api({
                url: 'sign',
                method: 'get',
                params: params,
            });
            state.setUser(response.data)
        } catch (error) {
            state.setUser(
                {
                    id: 'tester',
                    name: 'Bryan Fury',
                    level: '45Level',
                    group: 'admin',
                }
            )
        }
    };

    const help = () => {
        console.log('help')
    }

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

            <form className={styles.main} style={{ paddingBottom: standalone ? '27px' : '0px' }} onSubmit={signIn}>
                <div className={styles.inputGroup}>
                    <Input placeholder={'ID'} value={params.id} column={'id'} onChange={setParams} />
                    <Input placeholder={'PASSWORD'} value={params.pw} column={'pw'} onChange={setParams} type={'password'} />
                </div>
                <Button text={'Sign In'} background={'var(--colorPrimary)'} color={'var(--colorBase)'} type={'submit'} />
            </form>
            <Button text={'Need help?'} background={'transparent'} color={'var(--colorLight)'} onClick={help} />

        </main>
    );
}

export default App;

App.defaultProps = {

};