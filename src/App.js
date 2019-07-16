import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

import './App.css';


class App extends Component {
  constructor () {
    super();
    this.state = {
      monsters: [], 
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then (response => response.json())
    .then (users => this.setState({monsters: users}));
  }

  handleChange = e => this.setState({searchField: e.target.value});

  render () {
    const { monsters, searchField } = this.state;
    /* const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())); */
    const filteredMonstersName = monsters.map(monster => monster.name
        .toLowerCase()          
        .split(' ')
        .filter(monsterName => monsterName.startsWith(searchField.toLowerCase()))
        .join(' ')
    );

    const filteredMonsters = monsters.filter( monster => {
      for (let mon of filteredMonstersName){
        if (monster.name.toLowerCase().includes(mon) && mon.length > 0){          
          return monster;
        }               
      }
      return null 
    });

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox 
          placeholder='Search monsters...'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />        
      </div>
    )
  }
}

export default App;
