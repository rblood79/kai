/*


*/

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Layout, Header, Top, Card, ItemList, ItemDefect, Chart } from '../../components';

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
                    id: '001',
                    label: 'left wing',
                    value: 'fail',
                    date: '2022-01-18',
                    point: 'A'
                },
                {
                    id: '002',
                    label: 'right wing',
                    value: 'fail123',
                    date: '2022-01-16',
                    point: 'B'
                },
                {
                    id: '003',
                    label: 'left engine',
                    value: 'stop',
                    date: '2022-02-08',
                    point: 'C'
                },
                {
                    id: '004',
                    label: 'right engine',
                    value: 'stop123',
                    date: '2021-02-08',
                    point: 'D'
                },
                {
                    id: '005',
                    label: 'radar',
                    value: 'not found',
                    date: '2022-02-08',
                    point: 'E'
                },
                {
                    id: '006',
                    label: 'radar',
                    value: 'missing',
                    date: '2022-02-08',
                    point: 'E'
                },
            ]
        }
    );

    const [dataP] = useState(
        {
            id: id,
            body: [
                {
                    label: 'State',
                    value: 'Compleate',
                },
                {
                    label: 'Start',
                    value: '2022.10.15 / 16:00:00',
                },
                {
                    label: 'End',
                    value: '2022.10.17 / 16:00:00',
                },
                {
                    label: 'mechanic',
                    value: 'Jason Jr',
                },
                {
                    label: 'engineer',
                    value: 'Thomas Cruise',
                },

            ]
        }
    );

    const dataC = [
        { label: "Radar", value: 2 },
        { label: "Engine", value: 4 },
        { label: "Gear", value: 6 },
        { label: "Wing", value: 18 },
        { label: "Body", value: 3 },
        { label: "Under", value: 4 },
    ]

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
                    title={'State'}
                    rightText={'Not Editabled'}
                    line={false}
                >
                    <ItemDefect data={dataG} />
                </Card>
                <Card>
                    <Card
                        title={'Data Chart'}
                        gap={8}
                        outline={false}
                    >
                        <Chart height={200} type={'bar'} data={dataC} active={true} />
                    </Card>

                    <Card
                        title={'Info'}
                        line={false}
                        outline={false}
                    >
                        <ItemList data={dataP.body} />
                    </Card>
                </Card>
            </Layout>
        </>
    );
}

export default App;

App.defaultProps = {

};