
import { Layout, Top } from '../../components';

const App = (props) => {
    return (
        <>
            <Top title={'Maintenance'} depth={1} />
            <Layout>
                Maintenance
            </Layout>
        </>
    );
}

export default App;

App.defaultProps = {

};