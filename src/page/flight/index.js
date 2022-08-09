/*


*/

import classNames from 'classnames';
import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';

import Header from '../../components/header';
import { Outlet } from 'react-router-dom';

const App = () => {

    return (
        <>
            <Header title={'Flight No'} />
            <main className={styles.main}>
                <Outlet />
                {
                    /*<Routes>
                        <Route path="/" element={<List />} />
                        <Route path=":id" element={<Detail />} />
                    </Routes>*/
                }
            </main>
        </>
    );
}

export default App;
