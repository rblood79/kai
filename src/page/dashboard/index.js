/*


*/
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Top, Bottom, Tab } from '../../components';

const App = () => {
    const standalone = 'standalone' in window.navigator && window.navigator.standalone;

    const [type, setType] = useState('LIST');
    const [state, setState] = useState(false);
    const toggleNav = () => setState(!state);
    return (
        <>
            <Top title={'KF-21 LIS'} depth={0} state={state} toggleNav={toggleNav} />
            <Layout height={'100%'} padding={'0px'} gap={'8px'} >
                <Tab label={["LIST", "GRID"]} margin={'0px 48px'} onChange={setType} />
                <Outlet context={{ type }} />
            </Layout>
            {standalone && <Bottom />}
        </>
    );
}

export default App;

App.defaultProps = {

};