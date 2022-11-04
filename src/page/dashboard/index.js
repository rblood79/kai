/*


*/
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Top, Bottom, Tab } from '../../components';
import { standalone } from '../../util';

const App = () => {

    const [type, setType] = useState('LIST');
    const [state, setState] = useState(false);
    const toggleNav = () => setState(!state);
    return (
        <>
            <Top title={'KF-21 LIS'} depth={0} state={state} toggleNav={toggleNav} />
            <Layout height={'100%'} padding={'0px'} gap={'8px'} >
                <Tab label={["LIST", "GRID"]} padding={'0px 48px'} onChange={setType} />
                <Outlet context={{ type }} />
            </Layout>
            {standalone && <Bottom />}
        </>
    );
}

//export default App;
export default React.memo(App);

App.defaultProps = {
};