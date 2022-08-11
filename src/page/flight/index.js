/*


*/

import classNames from 'classnames';
import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';

import { Outlet } from 'react-router-dom';

const App = () => {

    return (
        <Outlet />
    );
}

export default App;

/*<Routes>
            <Route path="/" element={<List />} />
            <Route path=":id" element={<Detail />} />
        </Routes>*/