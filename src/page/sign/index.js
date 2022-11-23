import { useContext, useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { userContext } from '../../context';
import { Api, Layout, Input, Button, Modal, Encrypt, Decrypt } from '../../components';
import { bottomStatusHeight } from '../../util';

import styles from './index.module.scss';

const App = () => {
    //const navigate = useNavigate();
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
        } catch (error) {
            //modalStateSet(error)
            setUser(Decrypt(fakeData))
        }
    };

    const help = () => {
        const helpData = {
            code: 'Can I Help You',
            message: 'To find your ID and password, contact the person in charge or check them on your desktop.'
        }
        modalStateSet(helpData)
    }

    const fakeData = Encrypt({
        id: 'administrator',
        name: 'Bryan Fury',
        level: '45Level',
        group: 'admin',
    });

    const [modalState, modalStateSet] = useState(false);
    const modalSet = () => {
        modalStateSet(false)
    }

    const [num, setNum] = useState(0);

    const { ty, opacity } = useSpring({
        from: { ty: 100, opacity: 0 },
        to: async (next, cancel) => {
            await next({
                ty: Number(num),
                opacity: 1,
            })
        },
        delay: 120,
    })

    useEffect(() => {
        setNum(0)
    }, [])

    return (
        <>
            <Layout height={'100%'} padding={'0px'}>

                <div className={styles.container} >
                    <animated.div className={styles.header} style={{opacity}}>
                        <div className={styles.titleGroup}>
                            <span className={styles.title}>
                                KF-21
                            </span>
                            <div className={styles.sub}>
                                Logistics<br />
                                Information System
                            </div>
                        </div>
                        <span className={styles.subTitle}>
                            Next-Generation Fighter
                        </span>
                    </animated.div>
                    <animated.div className={styles.main} style={{ paddingBottom: bottomStatusHeight, opacity, transform: ty.to((ty) => `translateY(${ty}%)`) }}>
                        <form className={styles.form} onSubmit={signIn}>
                            <div className={styles.inputGroup}>
                                <Input placeholder={'ID'} value={params.id} column={'id'} onChange={setParams} />
                                <Input placeholder={'PASSWORD'} value={params.pw} column={'pw'} onChange={setParams} type={'password'} />
                            </div>
                            <Button label={'Sign in'} background={'var(--colorPrimary)'} color={'var(--colorBase)'} type={'submit'} />
                        </form>
                        <Button label={'Need help?'} background={'transparent'} color={'var(--colorLight)'} onClick={help} />
                    </animated.div>
                </div>

            </Layout>

            <Modal title={modalState.code} state={modalState} apply={modalSet}>
                {modalState.message}
            </Modal>
        </>
    );
}

export default App;

App.defaultProps = {

};