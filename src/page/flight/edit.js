/*


*/

import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { Layout, Top, Input, Card, ItemList, Modal } from '../../components';

const App = (props) => {
    const navigate = useNavigate();
    const [navState, setNavState] = useState(false);
    const toggleNav = () => setNavState(!navState);
    const [scrollTop, setScrollTop] = useState(true);
    const location = useLocation();
    const { id } = useParams();
    const [title, setTitle] = useState(null);
    const [dataG, setDataG] = useState(null);

    const [params, setParams] = useState(
        {
            front: 'xxs',
            takeoff: '170000',
            landing: '180000',
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

    /*const toggleNav = () => {
        console.log('save', params)
    };*/

    //bottom sheet cancle
    const cancle = () => {
        toggleNav();
    }

    //bottom sheet apply
    const apply = () => {
        navigate('/flight/' + id);
    }

    useEffect(() => {
        setDataG(location.state.dataG)
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
                    icon={'ri-survey-line'}
                    body={ItemList}
                    data={dataG}
                />
                <Card icon={'ri-survey-line'} title={'Plan'} gap={48}>
                    <Input label={'Take-Off'} type={'time'} value={params.takeoff} column={'takeoff'} callBack={setParams} />
                    <Input label={'Landing'} type={'time'} value={params.landing} column={'landing'} callBack={setParams} />
                    <Input label={'Briefing'} disabled={true} value={params.briefing} />
                    <Input label={'Front (Pilot)'} required={true} type={'select'} value={params.front} data={frontData} column={'front'} callBack={setParams} />
                    <Input label={'Rear (Co Pilot)'} value={'Json Momoa'} />
                    <Input label={'RWY Controller'} value={'Javis'} />
                    <Input label={'FLT Controller'} value={'Siri'} />
                    <Input label={'T/O AB'} value={'18th Flight Wing'} />
                    <Input label={'L/D AB'} value={'18th Flight Wing'} />
                    <Input label={'Tail No'} value={'27-001'} />
                </Card>
            </Layout>

            <Modal title={'Save data'} height={'body'} state={navState} close={setNavState} cancel={cancle} apply={apply}>
                Are you sure you want to confirm "Documents"? All contents will be perminately destroyed.
            </Modal>
        </>
    );
}

export default App;

App.defaultProps = {

};