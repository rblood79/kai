/*


*/

import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import styles from './detail.module.scss';

import { Header, Input, Card, ItemList } from '../../components';

const App = (props) => {
    //const [state, seState] = useState(false);
    const location = useLocation();
    const { id } = useParams();
    const [title, setTitle] = useState(null);
    const [dataG, setDataG] = useState(null);

    const [data, setData] = useState(
        {
            front: 'xxs',
            takeoff: '17:00:00',
            landing: '17:00:00',
            briefing: 'abcdEfg',
        }
    );

    const frontData = [
        { id: '0', value: 'xxs', text: 'Jason Martin' },
        { id: '1', value: 'asd', text: 'Bryan Fury' },
        { id: '2', value: 'qwsd', text: 'Jin Kasama' },
        { id: '3', value: 'gefe', text: 'Lili' },
        { id: '4', value: 'sfes', text: 'Bob Wilson' },
    ]

    const toggleNav = () => {
        console.log('save', data)
    };

    useEffect(() => {
        setDataG(location.state.dataG)
        setTitle('KF21-' + id)
    }, [])

    return (
        <>
            <Header title={title} depth={2} right={'save'} state={toggleNav} background={'#fff'} />
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
                    background={'#FFCA00'}
                    titleColor={'#fff'}
                    title={'Geneal'}
                    rightText={'Not Editabled'}
                    icon={'ri-survey-line'}
                    body={ItemList}
                    data={dataG}
                />
                <Card icon={'ri-survey-line'} title={'Plan'}>
                    <Input label={'Take-Off'} required={true} value={data.takeoff} />
                    <Input label={'Landing'} required={true} value={data.landing} />
                    <Input label={'Briefing'} disabled={true} value={data.briefing} />
                    <Input label={'Front (Pilot)'} required={true} type={'select'} value={data.front} data={frontData} column={'front'} callBack={setData} />
                    <Input label={'Rear (Co Pilot)'} value={'Json Momoa'} />
                    <Input label={'RWY Controller'} value={'Javis'} />
                    <Input label={'FLT Controller'} value={'Siri'} />
                    <Input label={'T/O AB'} value={'18th Flight Wing'} />
                    <Input label={'L/D AB'} value={'18th Flight Wing'} />
                    <Input label={'Tail No'} value={'27-001'} />
                </Card>
            </main>
        </>
    );
}

export default App;

App.defaultProps = {

};