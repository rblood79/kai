
import { Layout, Top } from '../../components';

const App = (props) => {
    return (
        <>
            <Top title={'Extenal Change'} depth={1} />
            <Layout>
                extenal
            </Layout>
        </>
    );
}

export default App;

App.defaultProps = {

};