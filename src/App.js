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
//import { useEffect, useState, useMemo } from 'react';


const App = () => {
  
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { transform: 'translate3d(100%,0,0)' },
    enter: { transform: 'translate3d(0%,0,0)' },
    leave: { transform: 'translate3d(-50%,0,0)' },
    config: {
      duration: 480,
      easing: easings.easeInOutQuart,
    },
    //onRest: () => {},
  })

  return (
    <div className="App">
      <div className='container'>
        {transitions((styles, item) => (
          <a.div style={styles}>
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

            </Routes>
          </a.div>
        ))}

      </div>
    </div>
  );
}

export default App;
/*
import { useTransition, a } from 'react-spring';
import { useLocation } from "react-router-dom";

import './App.scss';
import Router from './routes';

const App = () => {
  const location = useLocation();
  const transitions = useTransition(location, {
    from: { transform: 'translate3d(100%,0,0)', opacity: 0, },
    enter: { transform: 'translate3d(0%,0,0)', opacity: 1, },
    leave: { transform: 'translate3d(-100%,0,0)' },
    config: {
      duration: 3000,
    },
  })

  return (
    <div className="App">
      <div className='container'>
        {transitions((styles, item) => (
          <a.div style={styles}>
            <Router location={item} />
          </a.div>
        ))}

      </div>
    </div>
  );
}

export default App;

*/