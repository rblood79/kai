import { useContext, useState } from 'react';
import { userContext } from '../../context';
import { useNavigate } from "react-router-dom";
import { Api, Input, Button, Encrypt, Decrypt } from '../../components';
import { bottomStatusHeight } from '../../util';

import styles from './index.module.scss';

const App = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(userContext);

    const [params, setParams] = useState(
        {
            id: '',
            pw: '',
        }
    )
    //const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
    //const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const response = await Api({
                //crpyto: true,
                url: 'sign',
                method: 'get',
                params: params,
            });
            setUser(Decrypt(response.data))
            navigate('/dashboard')
        } catch (error) {
            const fakeData = Encrypt({
                id: 'administrator',
                name: 'Bryan Fury',
                level: '45Level',
                group: 'admin',
            });
            setUser(Decrypt(fakeData))
            navigate('/dashboard')
        }
    };

    const help = () => {
        //const decrypted = Decrypt(encrypted);
    }

    return (
        <main className={styles.container} style={{ paddingBottom: Math.max(bottomStatusHeight, 16) }} >
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

            <form className={styles.main} onSubmit={signIn}>
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