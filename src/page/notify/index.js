
import { useState, useEffect, useMemo } from 'react';
import { Api, Top, Tab, Layout, ItemCollapse } from '../../components';
const App = (props) => {
    const [scrollTop, setScrollTop] = useState(true);
    const [tab, setTab] = useState('All');
    const [data, setData] = useState(
        [
            {
                id: '01',
                type: 'Notice',
                label: '2022 Notify',
                date: '20221010113022',
                comment: "commentThe MP could not be reached for comment.remarkHis controversial remarks about race were widely reported.statementIn a statement released earlier today, the team denied allegations of cheating.declarationThe sovereign made a formal declaration of war. observationShe makes some interesting observations about human nature in her book. commentaryI love that sports announcer's commentary - it's always so funny!"
            },
            {
                id: '02',
                type: 'Notice',
                label: 'The grid-template-rows CSS property defines the line names and track sizing functions of the',
                date: '20221001113022',
                comment: "statementIn a statement released earlier today, the team denied allegations of cheating.declarationThe sovereign made a formal declaration of war. observationShe makes some interesting observations about human nature in her book. commentaryI love that sports announcer's commentary - it's always so funny!"
            },
            {
                id: '03',
                type: 'User',
                label: 'that is written and official',
                date: '20220120125420',
                comment: "Members of Congress have to make a declaration of their business interests. As witnesses to the accident, we were asked to make written declarations of what we had seen"
            },
            {
                id: '04',
                type: 'User',
                label: 'that is written and official',
                date: '20210120125420',
                comment: "Members of Congress have to make a declaration of their business interests. As witnesses to the accident, we were asked to make written declarations of what we had seen"
            },
        ]
    )

    const filterData = useMemo(() => {
        return tab !== 'All' ? data.filter(item => tab === item.type) : data;
    }, [tab, data]);

    const [params] = useState(
        {
            range: '1M',
            sq: '4Q',
        }
    );

    const onLoad = async () => {
        try {
            const response = await Api({
                url: 'notify',
                method: 'get',
                params: params,
            });
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        onLoad();
    }, [])

    return (
        <>
            <Top title={'Notifycation'} depth={1} background={'var(--colorCard)'} scrollTop={scrollTop}/>
            <Layout scrollTop={setScrollTop}>
                <Tab label={["All", "Notice", "User"]} onChange={setTab} />
                {
                    data ?
                        filterData.map((item, index) =>
                            <ItemCollapse {...item} key={index} />
                        ) : <div>no Data</div>
                }
            </Layout>
        </>
    );
}

export default App;

App.defaultProps = {

};