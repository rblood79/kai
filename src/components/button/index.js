
import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';

const App = (props) => {
    return (
        <button className={classNames(styles.button, props.background, props.color)}>{props.text}</button>
    );
}

export default App;

App.defaultProps = {
    
};