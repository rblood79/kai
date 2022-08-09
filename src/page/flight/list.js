/*


*/

import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

const App = () => {

    return (
        <div className={styles.list}>
            <Link to='40'>link</Link>
            <Link to='41'>link</Link>
            <Link to='46'>link</Link>
        </div>
    );
}

export default App;
