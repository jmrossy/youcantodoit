import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from './components/Nav';
import TodoList from './components/TodoList';
import SideBar from './components/SideBar';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Nav />
        <div className="list-container">
          <TodoList />
          <SideBar />
        </div>
      </div>
    );
  }
}

export default connect()(App);  
