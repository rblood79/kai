

import { useEffect, useState } from 'react';
import { numberPad } from '../../util';

import moment from 'moment';
import Item from './swipeItem';

import styles from './index.module.scss';


const App = (props) => {
    const [data, setData] = useState(
        {
            year: '00',
            month: '00',
            day: '00',
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

    useEffect(() => {
        props.callBack(data)
    }, [data])

    
    useEffect(() => {
        const hour = [], min = [];
        for (let i = 0; i < 31; i++) {
            let num = i;
            num <= 23 && hour.push(numberPad(num, 2));
            min.push(numberPad(num, 2));
        }

        const now = moment('2010'), temp = [];
        while (now.isSameOrBefore(moment())) {
            temp.push(now.format('YYYY'));
            now.add(1, 'y');
        }

        setYear(temp)
        setMonth(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'])
        setDay(min)
    }, [])

    return (
        <div className={styles.date}>
            <span className={styles.title}>Time</span>
            <Item data={year} set={data.year} callBack={fnYear} />
            <Item data={month} set={data.month} callBack={fnMonth} />
            <Item data={day} set={data.day} callBack={fnDay} />
        </div>
    );
}

export default App;

App.defaultProps = {

};

/*


import { useEffect, useState } from 'react';
import { numberPad } from '../../util';

import moment from 'moment';
import Item from './swipeItem';

import styles from './index.module.scss';


const App = (props) => {
    const [data, setData] = useState(
        {
            year: '00',
            month: '00',
            day: '00',
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

    useEffect(() => {
        props.callBack(data)
    }, [data])

    useEffect(() => {
        const temp = [];
        for (let i = 0; i < moment(data.year + data.month).daysInMonth(); i++) {
            let num = i + 1;
            temp.push(numberPad(num, 2));
        }
        setDay(temp)
    }, [data.year, data.month])

    useEffect(() => {
        const now = moment('2010'), temp = [];
        while (now.isSameOrBefore(moment())) {
            temp.push(now.format('YYYY'));
            now.add(1, 'y');
        }

        setYear(temp)
        setMonth(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'])
    }, [])

    return (
        <div className={styles.date}>
            <span className={styles.title}>Time</span>
            <Item data={year} set={data.year} callBack={fnYear} />
            <Item data={month} set={data.month} callBack={fnMonth} />
            <Item data={day} set={data.day} callBack={fnDay} />
        </div>
    );
}

export default App;

App.defaultProps = {

};
*/