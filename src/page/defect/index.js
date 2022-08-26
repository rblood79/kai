
import Header from '../../components/header';

const App = (props) => {
    return (
        <>
            <Header title={'Defect'} depth={1} />
            <main>
                <div>
                    Defect
                </div>
            </main>
        </>
    );
}

export default App;

App.defaultProps = {
    
};