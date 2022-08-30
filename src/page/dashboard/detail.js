/*


*/

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../../components/card';
import Item from '../../components/item/item';
import ItemFlight from '../../components/item/itemFlight';
import ItemDefect from '../../components/item/itemDefect';
import ItemMaintenance from '../../components/item/itemMaintenance';
import ItemConsume from '../../components/item/itemConsume';

import Overview from '../../components/item/itemOverview';




import Header from '../../components/header';
import styles from './detail.module.scss';
//import classNames from 'classnames';

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
            header: [
                {
                    title: 'Tail No',
                    text: '20-001',
                },
                {
                    title: 'Flight Date',
                    text: '24 March 2021',
                }
            ],
            body: [
                {
                    title: 'Plan',
                    to: '11:30:40',
                    ld: '11:30:00'
                },
                {
                    title: 'Actual',
                    to: '12:40:00',
                    ld: '12:30:00'
                }
            ]
        }
    );

    const [dataD] = useState(
        {
            id: '/defect',
            title: 'Defect',
            header: [
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
            body: [],
        }
    );

    const [dataM] = useState(
        {
            id: '/maintenance',
            title: 'Maintenance',
            header: [
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
            body: [
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
            header: [
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
            body: [
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
                <Overview
                    data={data}
                />
                <Card
                    rightText={'more'}
                    rightType={'button'}
                    header={Item}
                    body={ItemFlight}
                    data={dataF}
                />
                <Card
                    rightText={'more'}
                    rightType={'button'}
                    header={Item}
                    body={ItemDefect}
                    data={dataD}
                />
                <Card
                    rightText={'more'}
                    rightType={'button'}
                    header={Item}
                    body={ItemMaintenance}
                    data={dataM}
                />
                <Card
                    rightText={'more'}
                    rightType={'button'}
                    header={Item}
                    body={ItemConsume}
                    data={dataC}
                />
            </main>
        </>
    );
}

export default App;

App.defaultProps = {

};