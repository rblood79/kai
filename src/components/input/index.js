
import styles from './index.module.scss';

const App = (props) => {
    return (
        <div className={styles.form}>
            {
                props.label && <label className={styles.label}>{props.label}</label>
            }
            <input className={styles.input} type="text" placeholder={props.placeholder} />
        </div>
    );
}

export default App;

App.defaultProps = {

};