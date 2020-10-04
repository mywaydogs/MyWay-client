import React, { useEffect, useState } from 'react';
import './App.scss';
import Customers from './components/Customers/';
import Login from './components/Login';
import Register from './components/Register';
import Layout from './components/Layout';
import Modal from 'react-modal';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';
import Home from './components/Home';
import Project from './components/Project/';
import Button from './components/utils/Button';
import UserContext from './components/UserContext';
import withAuth from './components/utils/WithAuth';


Modal.setAppElement(document.getElementById('root'));

function InitDB() {
  return <Button value="אפס" onClick={() => axios.get('/initdb')} />
}

function App() {
  const [user, setUser] = useState({
    isAuthenticated: false,
    name: 'אורח'
  })

  useEffect(() => {
    axios.get('/api/auth/authenticate')
      .then(res => res.data)
      .then(({ firstName, lastName }) => {
        setUser({ isAuthenticated: true, name: `${firstName} ${lastName}` })
      })
      .catch(err => { })
  }, [])

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Layout>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/customers" component={withAuth(Customers)} />
            <Route path="/project/:id" component={withAuth(Project)} />
            <Route path="/initdb" component={withAuth(InitDB)} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Layout>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
