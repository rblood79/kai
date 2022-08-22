/*


*/

import { useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';

import Overview from '../../components/item/itemOverview';
import FlightNo from '../../components/item/itemFlight';
import Defect from '../../components/item/itemDefect';
import Maintenance from '../../components/item/itemMaintenance';
import Consume from '../../components/item/itemConsume';

import Header from '../../components/header';
import styles from './detail.module.scss';
import classNames from 'classnames';

const App = () => {
    const { id } = useParams();
    const [title, setTitle] = useState(null);

    const [data] = useState(
        {
            title: 'KF-21-001',
            intro: '26 May 2022',
            oh: '2,125',
            fh: '235',
            rate: 89,
            status: 'at Maintenance',
            maintenance: '24 June 2022'
        }
    );

    const [dataF] = useState(
        {
            id: '/flight',
            title: 'Flight No',
            date: '24 march 2021',
            no: '20-001',
            planTO: '11:30:40',
            planLD: '11:30:00',
            actualTO: '12:30:00',
            actualLD: '12:00:00',
        }
    );

    const [dataD] = useState(
        {
            id: '/defect',
            title: 'Defect',
            cause: 'Turbine Lose',
            no: '20-001',
            date: '28 June 2021',
        }
    );

    const [dataM] = useState(
        {
            id: '/maintenance',
            title: 'Maintenance',
            content: 'Turbine Defect',
            no: '20-001',
            date: '11 June 2021',
            data: [
                {
                    title: 'EVERY 60 DAYS(I)',
                    cycle: '18SVM',
                    date: '24 MAY 2021',
                    value: 18,
                },
                {
                    title: 'EVERY 18 MONTHS(I)',
                    cycle: '18SVM',
                    date: '24 MAY 2021',
                    value: 89,
                },
                {
                    title: 'EVERY 36 MONTHS(I)',
                    cycle: '18SVM',
                    date: '24 MAY 2021',
                    value: 66,
                }
            ]
        }
    );

    const [dataC] = useState(
        {
            id: '/consume',
            title: 'Consume',
            content: 'Turbine Change & Maintenance',
            no: '20-001',
            date: '11 June 2021',
            data: [
                {
                    title: 'EVERY 60 DAYS(I)',
                    cycle: '18SVM',
                    date: '24 MAY 2021',
                    value: 18,
                }
            ]
        }
    );

    useEffect(() => {
        setTitle('KF21-' + id)
    }, [id])
    return (
        <>
            <Header title={title} background={'#f8f8f8'} depth={1} />
            <main className={styles.main}>
                <Overview {...data} />
                <FlightNo {...dataF} rightText={'more'} />
                <Defect {...dataD} rightText={'more'} />
                <Maintenance {...dataM} rightText={'more'} />
                <Consume {...dataC} rightText={'more'} />
            </main>
        </>
    );
}

export default App;

App.defaultProps = {

};