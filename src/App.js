//import logo from './logo.svg';
import './App.scss';

import Dashboard from './page/dashboard';
import Header from './components/header';
import Footer from './components/footer';

const App = () => {
  return (
    <div className="App">
      <div className='container'>
        <Header />

        <Dashboard />

        {/*<Footer />*/}
      </div>
    </div>
  );
}

export default App;
