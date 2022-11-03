/*


*/

import { useEffect, useState, useMemo, useRef } from 'react';

import { useGesture } from '@use-gesture/react'
import { useSprings } from '@react-spring/web';

import { useOutletContext, useNavigate } from 'react-router-dom';

import { Api, ItemDashboard } from '../../components';
import styles from './list.module.scss';

const clamp = (value, lower, upper) => {
    if (value < lower) return lower;
    if (value > upper) return upper;
    return value;
}

const App = () => {
    const navigate = useNavigate();
    const { type } = useOutletContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const index = useRef(0)
    const width = window.innerWidth - 96;

    const [data, setData] = useState([
        {
            "id": "total",
            "title": "Average rate",
            "base": "11 base camp",
            "unit": "12",
            "rate": "84.04",
            "flight": "220218-658KFX",
            "defect": "Turbine defect"
        },
        {
            "id": "1",
            "title": "KF-21-001",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "rate": "82.60",
            "status": "At Maintenance",
            "date": "11 June 2021",


        },
        {
            "id": "2",
            "title": "KF-21-002",
            "intro": "23 July 2021",
            "oh": "2,125",
            "fh": "235",
            "rate": "18.02",
            "status": "At Maintenance",
            "date": "24 June 2021"
        },
        {
            "id": "3",
            "title": "KF-21-003",
            "intro": "18 October 2020",
            "oh": "4,825",
            "fh": "2695",
            "rate": "88.02",
            "status": "At Maintenance",
            "date": "17 June 2021"
        },
    ])

    const onLoad = async () => {
        try {
            const response = await Api({
                //baseURL: state.url,
                url: 'dashboard',
                method: 'get',
                params: {},
            });
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [props, api] = useSprings(data.length, i => ({
        x: (i * width) + 48,
        y: 0,
        scale: i === 0 ? 1 : 0.8,
        ty: i === 0 ? -16 : -96,
        //display: 'flex',
    }))

    const bind = useGesture({
        onDrag: ({ active, movement: [mx, my], direction: [xDir], cancel }) => {
            if (active && Math.abs(mx) > width / 2) {
                index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, data.length - 1)
                cancel()
                setCurrentIndex(index.current)
            }
            api.start(i => {
                if (i < index.current - 1 || i > index.current + 1) return { display: 'none' }
                const x = (i - index.current) * width + (active ? mx + 48 : 48)
                const y = active ? my : 0
                const scale = i === index.current ? 1 : 0.8
                const ty = i === index.current ? -16 : -96
                //setCurrentIndex(index.current)
                return {
                    x, y, scale, display: 'grid', ty,
                    config: {
                        mass: 1,
                        tension: 210,
                        friction: 26,
                    }
                }
            })
        }
    }, {
        drag: {
            axis: 'lock'
        }
    });

    const filterData = useMemo(() => {
        return type !== 'LIST' ? data.filter(item => item.id !== 'total') : data;
    }, [type, data]);

    useEffect(() => {
        onLoad();
    }, [])
    return (
        <section className={styles.container}>

            {
                data.length > 0 ?
                    type === 'LIST' ?
                        <div className={styles.listContents}>
                            {
                                props.length > 0 && props.map((prop, i) => (
                                    <ItemDashboard {...prop} bind={bind} data={data[i]} index={i} currentIndex={currentIndex} key={i} />
                                ))
                            }
                        </div>
                        :
                        <div className={styles.gridContents}>
                            {
                                filterData.map((item, index) => {
                                    return (
                                        <div className={styles.item} key={index}>
                                            <button onClick={() => { navigate(item.id) }}>
                                                <h3 className={styles.title}>{item.title}</h3>
                                                <div className={styles.rate}>{item.rate}</div>
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div> :
                    <div>not Found Data</div>
            }
        </section>

    )
}

export default App;

App.defaultProps = {

};