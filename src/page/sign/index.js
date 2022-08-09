import { Link } from 'react-router-dom';
import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';

import { Input, Button } from '../../components';

const App = () => {
    return (
        <main className={styles.main}>
            <div className={styles.inputGroup}>
                <Input placeholder={'ID'}/>
                <Input placeholder={'PASSWORD'}/>
            </div>
            <Button text={'Sign In'} background={gloval.primary} color={gloval.normal} />
            <Link className={gloval.button} to='/dashboard'>Need help?</Link>
        </main>
    );
}

export default App;
