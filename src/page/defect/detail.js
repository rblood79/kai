/*


*/

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Layout, Header, Top, Card, ItemList, ItemDefect } from '../../components';

const App = () => {
    //const [state, seState] = useState(false);
    const navigate = useNavigate();
    const toggleNav = () => {
        navigate('edit', { state: { dataG: dataG, dataP: dataP } });
    };
    const [scrollTop, setScrollTop] = useState(true);

    const { id } = useParams();
    const [title, setTitle] = useState(null);

    const [dataG] = useState(
        {
            id: id,
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
                    title: 'Date',
                    text: '16 May 2021',
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

    useEffect(() => {
        setTitle('KF21-' + id + ' Defect info')
    }, [id])

    return (
        <>
            <Top title={title} depth={2} right={'edit'} state={toggleNav} background={'var(--colorCard)'} scrollTop={scrollTop} />
            <Layout scrollTop={setScrollTop}>
                <Header title={'THESE ARE THE DETAILS OF THE FIGHTER YOU REQUESTED'}
                    comment={
                        'LAST INFO OF 19 OCTOBER 2021'
                    }
                />
                <Card
                    background={'var(--colorPrimary)'}
                    titleColor={'var(--colorCard)'}
                    title={'State'}
                    rightText={'Not Editabled'}
                    line={false}
                >
                    <ItemDefect data={dataG} />
                </Card>
                <Card
                    title={'Info'}
                    line={false}
                >
                    <ItemList data={dataP.body} />
                </Card>
            </Layout>
        </>
    );
}

export default App;

App.defaultProps = {

};