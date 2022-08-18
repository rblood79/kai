
import styles from './index.module.scss';

const App = (props) => {
    return (
        <input className={styles.input} type="text" placeholder={props.placeholder}/>
    );
}

export default App;

App.defaultProps = {
    
};