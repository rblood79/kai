/*


*/

import { useEffect, useState, useMemo, useRef } from 'react';

import { useGesture } from '@use-gesture/react'
import { useSprings } from '@react-spring/web';

import { Outlet, useOutletContext } from 'react-router-dom';

import { Api } from '../../components';

import styles from './list.module.scss';
import classNames from 'classnames';

const clamp = (value, lower, upper) => {
    if (value < lower) return lower;
    if (value > upper) return upper;
    return value;
}

const App = () => {
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
            "rate": "84.4",
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
        {
            "id": "4",
            "title": "KF-21-011",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "rate": "62.60",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "5",
            "title": "KF-21-001",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "rate": "82.60",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "6",
            "title": "KF-21-002",
            "intro": "23 July 2021",
            "oh": "2,125",
            "fh": "235",
            "rate": "18.02",
            "status": "At Maintenance",
            "date": "24 June 2021"
        },
        {
            "id": "7",
            "title": "KF-21-003",
            "intro": "18 October 2020",
            "oh": "4,825",
            "fh": "2695",
            "rate": "88.02",
            "status": "At Maintenance",
            "date": "17 June 2021"
        },
        {
            "id": "8",
            "title": "KF-21-011",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "rate": "62.60",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "9",
            "title": "KF-21-001",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "rate": "82.60",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "12",
            "title": "KF-21-002",
            "intro": "23 July 2021",
            "oh": "2,125",
            "fh": "235",
            "rate": "18.02",
            "status": "At Maintenance",
            "date": "24 June 2021"
        },
        {
            "id": "13",
            "title": "KF-21-003",
            "intro": "18 October 2020",
            "oh": "4,825",
            "fh": "2695",
            "rate": "88.02",
            "status": "At Maintenance",
            "date": "17 June 2021"
        },
        {
            "id": "14",
            "title": "KF-21-011",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "rate": "62.60",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "11",
            "title": "KF-21-001",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "rate": "82.60",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "22",
            "title": "KF-21-002",
            "intro": "23 July 2021",
            "oh": "2,125",
            "fh": "235",
            "rate": "18.02",
            "status": "At Maintenance",
            "date": "24 June 2021"
        },
        {
            "id": "253",
            "title": "KF-21-003",
            "intro": "18 October 2020",
            "oh": "4,825",
            "fh": "2695",
            "rate": "88.02",
            "status": "At Maintenance",
            "date": "17 June 2021"
        },
        {
            "id": "224",
            "title": "KF-21-011",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "rate": "62.60",
            "status": "At Maintenance",
            "date": "11 June 2021",
        },
        {
            "id": "122",
            "title": "KF-21-002",
            "intro": "23 July 2021",
            "oh": "2,125",
            "fh": "235",
            "rate": "18.02",
            "status": "At Maintenance",
            "date": "24 June 2021"
        },
        {
            "id": "123",
            "title": "KF-21-003",
            "intro": "18 October 2020",
            "oh": "4,825",
            "fh": "2695",
            "rate": "88.02",
            "status": "At Maintenance",
            "date": "17 June 2021"
        },
        {
            "id": "124",
            "title": "KF-21-011",
            "intro": "18 June 2020",
            "oh": "2,125",
            "fh": "235",
            "rate": "62.60",
            "status": "At Maintenance",
            "date": "11 June 2021",
        }
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

    const [springs, api] = useSprings(data.length, i => ({
        x: (i * width) + 48,
        y: 0,
        scale: i === 0 ? 1 : 0.8,
        ty: i === 0 ? -16 : -96,
        display: 'grid',
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
                //const display = i === index.current ? 'grid' : 'none'
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
        <section className={classNames(styles.container, type === 'LIST' ? styles.list : styles.grid)}>
            <div className={styles.contents}>
                {
                    springs.map((spring, index) => (
                        <Outlet context={{ bind, spring, data: data[index], type, index, currentIndex }} key={index} />
                    ))

                }
            </div>
        </section>

    )
}

export default App;

App.defaultProps = {

};