import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { Input, Button } from '../../components';

const App = () => {
    const navigate = useNavigate();
    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>
                    KF-21 LIS
                </div>
            </div>

            <div className={styles.main}>
                <div className={styles.inputGroup}>
                    <Input placeholder={'ID'} />
                    <Input placeholder={'PASSWORD'} />
                </div>
                <Button text={'Sign In'} background={'#0C90E7'} color={'#fff'} onClick={() => { navigate('/dashboard') }} />
                <Button text={'Need help?'} color={'#939393'} onClick={() => { console.log('help') }} />
            </div>
        </main>
    );
}

export default App;

App.defaultProps = {

};