
import { Layout, Top } from '../../components';

const App = (props) => {
    return (
        <>
            <Top title={'Schedule Maintenance'} depth={1} />
            <Layout>
                schedule
            </Layout>
        </>
    );
}

export default App;

App.defaultProps = {

};