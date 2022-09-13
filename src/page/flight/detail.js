/*


*/

import { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';

import Header from '../../components/header';
import styles from './detail.module.scss';

import Card from '../../components/card';
import ItemList from '../../components/item/itemList';

const App = () => {
    //const [state, seState] = useState(false);
    const navigate = useNavigate(); 
    const toggleNav = () => {
        navigate('edit')
    };


    const { id } = useParams();
    const [title, setTitle] = useState(null);

    const [dataG] = useState(
        {
            id: id,
            title: 'Geneal',
            text: '16 May 2021',
            body: [
                {
                    title: 'Aircraft',
                    text: '220218-KFX-002',
                },
                {
                    title: 'Tail No',
                    text: '27-003',
                },
                {
                    title: 'Mission',
                    text: 'Basic Fighter Maneuver',
                },
                {
                    title: 'Call-Sign',
                    text: 'Black Dog',
                },
                {
                    title: 'Flight Config',
                    text: 'SL01',
                },
                {
                    title: 'Area',
                    text: 'Instrument Navigation',
                }
            ]
        }
    );

    const [dataP] = useState(
        {
            id: id,
            title: 'Plan',
            text: 'Actual',
            body: [
                {
                    title: 'Take-Off',
                    text: '16:00:00',
                },
                {
                    title: 'Landing',
                    text: '17:00:00',
                },
                {
                    title: 'Breifing',
                    text: 'Basic Fighter Maneuver',
                },
                {
                    title: 'Front(Pilot)',
                    text: 'Thomas Cruise',
                },
                {
                    title: 'Rear(Co Pilot)',
                    text: 'Jack D',
                },
                {
                    title: 'RWY Controller',
                    text: 'Javis',
                },
                {
                    title: 'T/O AB',
                    text: '-',
                },
                {
                    title: 'L/D AB',
                    text: '-',
                },
                {
                    title: 'Tail No',
                    text: 'xxxx-05AV-5668',
                }
            ]
        }
    );

    const [dataA] = useState(
        {
            id: id,
            title: 'Actual',
            text: 'Plan',
            body: [
                {
                    title: 'Take-Off',
                    text: '17:00:00',
                },
                {
                    title: 'Landing',
                    text: '18:00:00',
                },
                {
                    title: 'Breifing',
                    text: 'Basic Fighter Maneuver',
                },
                {
                    title: 'Front(Pilot)',
                    text: 'Thomas Cruise',
                },
                {
                    title: 'Rear(Co Pilot)',
                    text: 'Jack D',
                },
                {
                    title: 'RWY Controller',
                    text: 'Javis',
                },
                {
                    title: 'T/O AB',
                    text: '-',
                },
                {
                    title: 'L/D AB',
                    text: '-',
                },
                {
                    title: 'Tail No',
                    text: 'xxxx-05AV-5668',
                }
            ]
        }
    );

    useEffect(() => {
        setTitle('KF21-000' + id)
    }, [])

    return (
        <>
            <Header title={title} depth={2} right={'edit'} state={toggleNav} background={'#fff'} />
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.title}>
                        THESE ARE THE<br />
                        DETAILS OF THE FIGHTER<br />
                        YOU REQUESTED
                    </div>
                    <span className={styles.date}>LAST INFO OF 19 OCTOBER 2021</span>
                </header>
                <Card
                    background={'#0C90E7'}
                    titleColor={'#fff'}
                    rightText={'Not Editabled'}
                    icon={'ri-survey-line'}
                    body={ItemList}
                    data={dataG}
                />
                <Card
                    icon={'ri-pencil-ruler-2-line'}
                    body={ItemList}
                    data={dataP}
                />
                <Card
                    icon={'ri-play-fill'}
                    body={ItemList}
                    data={dataA}
                />
            </main>
        </>
    );
}

export default App;

App.defaultProps = {

};