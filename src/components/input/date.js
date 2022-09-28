
import { useEffect, useState } from 'react';
import { numberPad } from '../../util';

import moment from 'moment';
import Item from './swipeItem';

import styles from './index.module.scss';


const App = (props) => {
    const [data, setData] = useState(
        {
            year: moment(props.data, props.format).format('YYYY'),
            month: moment(props.data, props.format).format('MM'),
            day: moment(props.data, props.format).format('DD'),
        }
    )
    const [year, setYear] = useState([])
    const [month, setMonth] = useState([])
    const [day, setDay] = useState([]);

    const fnYear = (e) => {
        setData(prevState => ({ ...prevState, 'year': e }))
    }

    const fnMonth = (e) => {
        setData(prevState => ({ ...prevState, 'month': e }))
    }

    const fnDay = (e) => {
        setData(prevState => ({ ...prevState, 'day': e }))
    }

    const getDay = () => {
        const temp = [];
        for (let i = 0; i < moment(data.year + data.month).daysInMonth(); i++) {
            let num = i + 1;
            temp.push(numberPad(num, 2));
        }
        return temp;
    }

    useEffect(() => {
        props.callBack(data)
    }, [data])

    useEffect(() => {
        setDay(getDay)
    }, [data.year, data.month])

    /*useEffect(() => {
        async function fetchAndSetUser() {
            const data = await getDay();
            setDay(data);
        }
        fetchAndSetUser();

    }, [data.year, data.month]);*/


    useEffect(() => {
        const now = moment('2010'), temp = [];
        while (now.isSameOrBefore(moment())) {
            temp.push(now.format('YYYY'));
            now.add(1, 'y');
        }

        setYear(temp)
        setMonth(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'])
        setDay(getDay())
    }, [])

    return (
        <div className={styles.picker}>
            <span className={styles.title}>Date</span>
            <Item data={year} set={data.year} callBack={fnYear} />
            <Item data={month} set={data.month} callBack={fnMonth} />
            <Item data={day} set={data.day} callBack={fnDay} />
        </div>
    );
}

export default App;

App.defaultProps = {

};