

import { useEffect, useState } from 'react';
import { numberPad } from '../../util';

import Item from './swipeItem';
import moment from 'moment';

import styles from './index.module.scss';


const App = (props) => {
    const [data, setData] = useState(
        {
            year: moment(props.value).format('YYYY'),
            month: moment(props.value).format('MM'),
            day: moment(props.value).format('DD'),
        }
    )
    const [year, setYear] = useState(['2022'])
    const [month] = useState(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'])
    const [day, setDay] = useState(['01']);

    const fnYear = (e) => {
        setData(prevState => ({ ...prevState, 'year': e }))
    }

    const fnMonth = (e) => {
        setData(prevState => ({ ...prevState, 'month': e }))
    }

    const fnDay = (e) => {
        setData(prevState => ({ ...prevState, 'day': e }))
    }

    useEffect(() => {
        const temp = [];
        for (let i = 0; i < moment(data.year + data.month).daysInMonth(); i++) {
            let num = i + 1;
            temp.push(numberPad(num, 2));
        }
        setDay(temp)
    }, [data.year, data.month])

    useEffect(() => {
        props.callBack(data)
    }, [data, props])

    useEffect(() => {
        const now = moment('2010'), temp = [];
        while (now.isSameOrBefore(moment())) {
            temp.push(now.format('YYYY'));
            now.add(1, 'y');
        }
        setYear(temp)
    }, [])

    return (
        <div className={styles.date}>
            <span className={styles.title}>Date</span>
            <Item data={month} set={data.month} callBack={fnMonth} />
            <Item data={day} set={data.day} callBack={fnDay} />
        </div>
    );
}

export default App;

App.defaultProps = {

};