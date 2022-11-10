/*


*/

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Layout, Header, Top, Card, ItemList, ItemDefect } from '../../components';

const App = () => {
    //const [state, seState] = useState(false);
    const navigate = useNavigate();
    const toggleNav = () => {
        navigate('edit', { state: { data: null, dataG: dataG, dataP: dataP } });
    };
    const [scrollTop, setScrollTop] = useState(true);

    const { id } = useParams();
    const [title, setTitle] = useState(null);

    const [dataG] = useState(
        {
            id: id,
            body: [
                {
                    label: 'Aircraft',
                    value: '220218-KFX-002',
                },
                {
                    label: 'Tail No',
                    value: '27-003',
                },
                {
                    label: 'Mission',
                    value: 'Basic Fighter Maneuver',
                },
                {
                    label: 'Date',
                    value: '16 May 2021',
                },
                {
                    label: 'Call-Sign',
                    value: 'Black Dog',
                },
                {
                    label: 'Flight Config',
                    value: 'SL01',
                },
                {
                    label: 'Area',
                    value: 'Instrument Navigation',
                }
            ]
        }
    );

    const [dataP] = useState(
        {
            id: id,
            body: [
                {
                    label: 'Take-Off',
                    value: '16:00:00',
                },
                {
                    label: 'Landing',
                    value: '17:00:00',
                },
                {
                    label: 'Breifing',
                    value: 'Basic Fighter Maneuver',
                },
                {
                    label: 'Front(Pilot)',
                    value: 'Thomas Cruise',
                },
                {
                    label: 'Rear(Co Pilot)',
                    value: 'Jack D',
                },
                {
                    label: 'RWY Controller',
                    value: 'Javis',
                },
                {
                    label: 'T/O AB',
                    value: '-',
                },
                {
                    label: 'L/D AB',
                    value: '-',
                },
                {
                    label: 'Tail No',
                    value: 'xxxx-05AV-5668',
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