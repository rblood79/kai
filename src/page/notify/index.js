
import { useEffect, useState } from 'react';
import { Api, Header, Tab, ItemCollapse } from '../../components';
import styles from './index.module.scss';
const App = (props) => {
    const [tab, setTab] = useState('All');
    const [filterData, setFilterData] = useState([]);
    const [data, setData] = useState(
        [
            {
                id: '01',
                type: 'Notice',
                title: '2022 Notify',
                date: '20221010113022',
                comment: "commentThe MP could not be reached for comment.remarkHis controversial remarks about race were widely reported.statementIn a statement released earlier today, the team denied allegations of cheating.declarationThe sovereign made a formal declaration of war. observationShe makes some interesting observations about human nature in her book. commentaryI love that sports announcer's commentary - it's always so funny!"
            },
            {
                id: '02',
                type: 'Notice',
                title: 'The grid-template-rows CSS property defines the line names and track sizing functions of the',
                date: '20221001113022',
                comment: "statementIn a statement released earlier today, the team denied allegations of cheating.declarationThe sovereign made a formal declaration of war. observationShe makes some interesting observations about human nature in her book. commentaryI love that sports announcer's commentary - it's always so funny!"
            },
            {
                id: '03',
                type: 'User',
                title: 'that is written and official',
                date: '20220120125420',
                comment: "Members of Congress have to make a declaration of their business interests. As witnesses to the accident, we were asked to make written declarations of what we had seen"
            },
            {
                id: '04',
                type: 'User',
                title: 'that is written and official',
                date: '20210120125420',
                comment: "Members of Congress have to make a declaration of their business interests. As witnesses to the accident, we were asked to make written declarations of what we had seen"
            },
        ]
    )

    
    useEffect(() => {
        const result = tab !== 'All' ? data.filter(item => tab === item.type) : data;
        setFilterData(result);
    }, [data, tab]);

    return (
        <>
            <Header title={'Notifycation'} depth={1} />
            <main className={styles.main}>
                <Tab label={["All", "Notice", "User"]} onChange={setTab} />
                <div className={styles.body}>
                    {
                        filterData ?
                            filterData.map((item, index) =>
                                <ItemCollapse {...item} key={index} />
                            ) : <div>no Data</div>
                    }
                </div>
            </main>
        </>
    );
}

export default App;

App.defaultProps = {

};