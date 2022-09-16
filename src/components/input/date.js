

import { useEffect, useState, useRef } from 'react';
import { numberPad } from '../../util';

import Item from './swipeItem';
import _ from 'lodash';
import moment from 'moment';

import styles from './index.module.scss';


const App = (props) => {
    const [date, setDate] = useState(
        {
            year: '2020',
            month: '01',
            day: '01',
        }
    )
    const [year, setYear] = useState([2020])
    const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    const [day, setDay] = useState(['01', '02', '03']);

    const fnYear = (e) => {
        setDate(prevState => ({ ...prevState, 'year': e }))
    }

    const fnMonth = (e) => {
        setDate(prevState => ({ ...prevState, 'month': e }))
    }

    const fnDay = (e) => {
        setDate(prevState => ({ ...prevState, 'day': e }))
    }
    
    useEffect(() => {
        const dates = [];
        for (let i = 0; i < moment(date.year + date.month).daysInMonth(); i++) {
            let num = i + 1;
            dates.push(numberPad(num, 2));
        }
        setDay(dates)

    }, [date])

    useEffect(() => {
        const now = moment('2000'), dates = [];
        while (now.isSameOrBefore(moment())) {
            dates.push(now.format('YYYY'));
            now.add(1, 'y');
        }
        setYear(dates)
        //setYear(_.sortBy(dates).reverse())
    }, [])

    return (
        <div className={styles.date}>
            <span className={styles.title}>Date</span><Item data={year} callBack={fnYear} /><Item data={month} callBack={fnMonth} /><Item data={day} callBack={fnDay}/>
        </div>
    );
}

export default App;

App.defaultProps = {
    year: '2020',
    month: '01',
    day: '01'
};