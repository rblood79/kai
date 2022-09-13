/*


*/
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import styles from './index.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';



const App = (props) => {
    //const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const headerItems = () => data.header.map((item, index) => {
        return (
            <props.header key={index} title={item.title} text={item.type !== 'date' ? item.text : moment(item.text).format('DD MMM YYYY')} />
        )
    });

    useEffect(() => {
        if (props.data !== 'undefined' && props.data !== null) {
            setData(props.data)
        }

    }, [props.data]);

    return (
        <section className={classNames(styles.container)} style={{ background: props.background }}>
            <div className={styles.head}>
                <span className={styles.title} style={{ color: props.titleColor }}>{props.title}</span>
                {props.rightType === 'text' && props.rightText && <span className={styles.text}>{props.rightText}</span>}
                {props.rightType === 'button' && props.rightText && <button className={styles.button} onClick={() => { navigate(props.rightLink) }}>{props.rightText}</button>}
            </div>
            {data &&
                <>
                    {
                        data.header &&
                        <div className={styles.header}>
                            {headerItems()}
                        </div>
                    }

                    {
                        data.body &&
                        <props.body data={data.body} icon={props.icon} />
                    }
                </>
            }
            {props.children && props.children}
        </section>
    );
}

export default App;

App.defaultProps = {
    title: 'Title',
    rightType: 'text',
    rightText: null,
    rightLink: null,
};