
import Guage from './guage';
import Pie from './pie';
import Bar from './bar';


const App = (props) => {

    return (
        <>
            {
                props.type === 'guage' ? <Guage {...props} /> :
                    props.type === 'pie' ? <Pie {...props} /> :
                        props.type === 'bar' && <Bar {...props} />
            }
        </>
    );
}

export default App;

App.defaultProps = {
};