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
            planTO: '11:30:40',
            planLD: '11:30:00',
            actualTO: '12:30:00',
            actualLD: '12:00:00',
            info:[
                {
                    title: 'Tail No',
                    text: '20-001',
                },
                {
                    title: 'Flight Date',
                    text: '24 March 2021',
                }
            ],
        }
    );

    const [dataD] = useState(
        {
            id: '/defect',
            title: 'Defect',
            info:[
                {
                    title: 'Cause',
                    text: 'Turbine Lose',
                },
                {
                    title: 'Defect No',
                    text: '20-001',
                },
                {
                    title: 'Defect Date',
                    text: '28 June 2021',
                }
            ],
            data: [],
        }
    );

    const [dataM] = useState(
        {
            id: '/maintenance',
            title: 'Maintenance',
            info:[
                {
                    title: 'Cause',
                    text: 'Turbine Defect',
                },
                {
                    title: 'Maintenance No',
                    text: '20-001',
                },
                {
                    title: 'Maintenance Date',
                    text: '28 June 2021',
                }
            ],
            data: [
                {
                    title: 'EVERY 60 DAYS(I)',
                    cycle: '18SVM',
                    date: '24 MAY 2021',
                    text: 18,
                },
                {
                    title: 'EVERY 18 MONTHS(I)',
                    cycle: '18SVM',
                    date: '24 MAY 2021',
                    text: 89,
                },
                {
                    title: 'EVERY 36 MONTHS(I)',
                    cycle: '18SVM',
                    date: '24 MAY 2021',
                    text: 66,
                }
            ]
        }
    );

    const [dataC] = useState(
        {
            id: '/consume',
            title: 'Consume',
            info:[
                {
                    title: 'Content',
                    text: 'Turbine Change & Maintenance',
                },
                {
                    title: 'Consume No',
                    text: '20-001',
                },
                {
                    title: 'Consume Date',
                    text: '28 June 2021',
                }
            ],
            data: [
                {
                    title: 'EVERY 60 DAYS(I)',
                    cycle: '18SVM',
                    date: '24 MAY 2021',
                    text: 18,
                }
            ]
        }
    );

    useEffect(() => {
        setTitle('KF21-' + id)
    }, [id]);
    
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