//import logo from './logo.svg';
import { useTransition, a, easings } from 'react-spring';
import { useLocation, Routes, Route } from "react-router-dom";


import './App.scss';
import NotFound from './page/404';
import Sign from './page/sign';
import Notifycation from './page/notify';
//dashboard
import Dashboard from './page/dashboard';
import DashboardList from './page/dashboard/list';
import DashboardDetail from './page/dashboard/detail';
//flight
import Flight from './page/flight';
import FlightList from './page/flight/list';
import FlightDetail from './page/flight/detail';
import FlightEdit from './page/flight/edit';
//defect
import Defect from './page/defect';

//maintenance
import Maintenance from './page/maintenance';

//extenal
import Extenal from './page/extenal';

//order
import Order from './page/order';

//schedule
import Schedule from './page/schedule';

//tci
import Tci from './page/tci';

//loc
import Loc from './page/loc';

//import { useEffect, useState, useMemo } from 'react';


const App = () => {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { transform: 'translate3d(100%,0,0)' },
    enter: { transform: 'translate3d(0%,0,0)' },
    leave: { transform: 'translate3d(-50%,0,0)' },
    config: {
      duration: 0, //480,
      easing: easings.easeInOutQuart,
    },
    //onRest: () => {},
  })

  return (
    <div className="App">
      <div className='container'>
        {transitions((styles, item) => (
          <a.div className='contents' style={styles}>
            <Routes location={item}>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Sign />} />

              <Route path="notify" element={<Notifycation />} />

              <Route path="dashboard" element={<Dashboard />} >
                <Route path="" element={<DashboardList />} />
              </Route>
              <Route path="dashboard/:id" element={<DashboardDetail />} />

              <Route path="flight" element={<Flight />}>
                <Route path="" element={<FlightList />} />
                <Route path=":id" element={<FlightDetail />} />
                <Route path=":id/edit" element={<FlightEdit />} />
              </Route>

              <Route path="defect" element={<Defect />}>
              </Route>

              <Route path="maintenance" element={<Maintenance />}>
              </Route>

              <Route path="extenal" element={<Extenal />}>
              </Route>

              <Route path="order" element={<Order />}>
              </Route>

              <Route path="schedule" element={<Schedule />}>
              </Route>

              <Route path="tci" element={<Tci />}>
              </Route>

              <Route path="loc" element={<Loc />}>
              </Route>

            </Routes>
          </a.div>
        ))}
        
      </div>
    </div>
  );
}

export default App;
