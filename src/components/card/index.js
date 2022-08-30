/*


*/
import { useNavigate} from 'react-router-dom';

import styles from './index.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';



const App = (props) => {
    //const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const headerItems = () => data.header.map((item, index) => {
        return (
            <props.header key={index} title={item.title} text={item.text} />
        )
    });

    useEffect(() => {
        if (props.data !== 'undefined' && props.data !== null) {
            setData(props.data)
        }

    }, [props.data]);

    return (
        <section className={classNames(styles.container)} style={{ background: props.background }}>
            {data && <>
                <div className={styles.head}>
                    <span className={styles.title} style={{ color: props.titleColor }}>{data.title && data.title}</span>
                    {props.rightType === 'text' && props.rightText && <span className={styles.text}>{props.rightText}</span>}
                    {props.rightType === 'button' && props.rightText && <button className={styles.button} onClick={() => { navigate(data.id) }}>{props.rightText}</button>}
                    
                </div>
                {data.header && <div className={styles.header}>{headerItems()}</div>}

                {data.body && <props.body data={data.body} icon={props.icon}/>}

            </>
            }
        </section>
    );
}

export default App;

App.defaultProps = {
    rightText: null,
    rightType: 'text',
};