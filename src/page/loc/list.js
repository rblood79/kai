
import { Layout, Top } from '../../components';

const App = (props) => {
    return (
        <>
            <Top title={'A/C Loc & Status'} depth={1} />
            <Layout>
                A/C Loc & Status
            </Layout>
        </>
    );
}

export default App;

App.defaultProps = {

};