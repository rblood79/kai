
import Header from '../../components/header';

const App = (props) => {
    return (
        <>
            <Header title={'Maintenance'} depth={1} />
            <main>
                <div>
                    Maintenance
                </div>
            </main>
        </>
    );
}

export default App;

App.defaultProps = {

};