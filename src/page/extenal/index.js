
import Header from '../../components/header';

const App = (props) => {
    return (
        <>
            <Header title={'Extenal Change'} depth={1} />
            <main>
                <div>
                    extenal
                </div>
            </main>
        </>
    );
}

export default App;

App.defaultProps = {

};