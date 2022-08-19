/*


*/

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