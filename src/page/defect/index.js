
import { Layout, Top } from '../../components';

const App = (props) => {
    return (
        <>
            <Top title={'Defect'} depth={1} />
            <Layout>
                Defect
            </Layout>
        </>
    );
}

export default App;

App.defaultProps = {

};