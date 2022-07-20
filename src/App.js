//import logo from './logo.svg';
import './App.scss';

import Dashboard from './page/dashboard';
import Header from './page/header';
import Footer from './page/footer';

const App = () => {
  return (
    <div className="App">
      <div className='container'>
        <Header />

        <Dashboard />

        <Footer />
      </div>
    </div>
  );
}

export default App;
