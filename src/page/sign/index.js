import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { Input, Button } from '../../components';

const App = () => {
    const navigate = useNavigate();
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

            <div className={styles.main}>
                <div className={styles.inputGroup}>
                    <Input placeholder={'ID'} />
                    <Input placeholder={'PASSWORD'} />
                </div>
                <Button text={'Sign In'} background={'var(--colorSecondary)'} color={'var(--colorPrimary)'} onClick={() => {
                    navigate('/dashboard', {
                        state: {
                            data: null,
                        },
                    })
                }} />
                <Button text={'Need help?'} background={'transparent'} color={'var(--colorMid)'} onClick={() => { console.log('help') }} />
            </div>
        </main>
    );
}

export default App;

App.defaultProps = {

};