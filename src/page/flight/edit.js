/*


*/

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Layout, Top, Input, Card, ItemList, Modal } from '../../components';

const App = (props) => {
    const navigate = useNavigate();
    const [navState, setNavState] = useState(false);
    const toggleNav = () => setNavState(!navState);
    const [scrollTop, setScrollTop] = useState(true);
    const { id } = useParams();
    const [title, setTitle] = useState(null);

    const [params, setParams] = useState(
        {
            front: 'xxs',
            takeoff: '170000',
            landing: '180000',
            briefing: 'abcdEfg',
            rear: 'Mike',
            rwy: 'Javis',
            flt: 'Siri',
            to:'18 wing',
            ld:'19 wing',
            tail: '001',
        }
    );

    const frontData = [
        { value: 'xxs', label: 'Jason Martin' },
        { value: 'asd', label: 'Bryan Fury' },
        { value: 'qwsd', label: 'Jin Kasama' },
        { value: 'gefe', label: 'Lili' },
        { value: 'sfes', label: 'Bob Wilson' },
    ]

    const tailData = [
        { value: '001', label: '27-001' },
        { value: '002', label: '27-002' },
        { value: '003', label: '27-003' },
        { value: '004', label: '27-004' },
        { value: '005', label: '27-005' },
    ]

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

    /*const toggleNav = () => {
        console.log('save', params)
    };*/

    //bottom sheet cancle
    const cancle = () => {
        toggleNav();
    }

    //bottom sheet apply
    const save = () => {
        console.log(params)
        navigate('/flight/' + id);
    }

    useEffect(() => {
        //setDataG(location.state.dataG)
        setTitle('KF21-' + id)
    }, [id])

    return (
        <>
            <Top title={title} depth={2} right={'save'} state={toggleNav} background={'var(--colorCard)'} scrollTop={scrollTop} />
            <Layout scrollTop={setScrollTop}>
                <Card
                    background={'var(--colorEditable)'}
                    titleColor={'var(--colorCard)'}
                    title={'Geneal'}
                    rightText={'Not Editabled'}
                    line={false}
                >
                    <ItemList data={dataG.body} icon={'ri-survey-line'} />
                </Card>
                <Card icon={'ri-survey-line'} title={'Plan'} gap={48} padding={'24px 0 0 0'}>
                    <Input label={'Take-Off'} type={'time'} value={params.takeoff} column={'takeoff'} onChange={setParams} />
                    <Input label={'Landing'} type={'time'} value={params.landing} column={'landing'} onChange={setParams} />
                    <Input label={'Briefing'} disabled={true} value={params.briefing} />
                    <Input label={'Front (Pilot)'} required={true} type={'select'} value={params.front} data={frontData} column={'front'} onChange={setParams} />
                    <Input label={'Rear (Co Pilot)'} value={params.rear} column={'rear'} onChange={setParams} />
                    <Input label={'RWY Controller'} value={params.rwy} column={'rwy'} onChange={setParams} />
                    <Input label={'FLT Controller'} value={params.flt} column={'flt'} onChange={setParams}/>
                    <Input label={'T/O AB'} value={params.to} column={'to'} onChange={setParams}/>
                    <Input label={'L/D AB'} value={params.ld} column={'ld'} onChange={setParams} />
                    <Input label={'Tail No'} type={'select'} value={params.tail} data={tailData} column={'tail'} onChange={setParams}/>
                </Card>
            </Layout>

            <Modal title={'Save data'} state={navState} cancel={cancle} apply={save}>
                Are you sure you want to confirm "Documents"? All contents will be perminately destroyed.
            </Modal>
        </>
    );
}

export default App;

App.defaultProps = {

};