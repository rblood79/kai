
import gloval from '../../components/index.module.scss';
import styles from './index.module.scss';
import classNames from 'classnames';

const App = (props) => {
    return (
        <button className={classNames(styles.button)} style={{ background: props.background, color: props.color }} onClick={props.onClick}>{props.text}</button>
    );
}

export default App;

App.defaultProps = {
    background: '#e5e7eb',
};