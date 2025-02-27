import { Component } from 'react';

import { Routes, Route } from "react-router-dom";

import AppInfo from '../components/app-info/app-info';
import SearchPanel from '../components/serch-panel/search-panel';
import AppFilter from '../components/app-filter/app-filter';
import EmployeesList from '../components/employees-list/employees-list';
import EmployeesAddForm from '../components/employees-add-form/employees-add-form';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [
          { name: "John", salary: 800, increase: false, id: 1, like: true },
          { name: "Alex", salary: 3000, increase: true, id: 2, like: false },
          { name: "Carl", salary: 2500, increase: false, id: 3, like: false },
        ],
        term: "",
        filter: ''
      }
      this.maxId = 4;
    }
  
    deleteItem = (id) => {
      this.setState(({ data }) => {
        return {
          data: data.filter(item => item.id !== id)
        }
      })
    }
  
    addItem = (name, salary) => {
      const newItem = {
        name,
        salary,
        increase: false,
        like: false,
        id: this.maxId++
      }
      this.setState(({ data }) => {
        const newArr = [...data, newItem];
        return {
          data: newArr
        }
      })
    }
  
    onToggleProp = (id, prop) => {
  
      this.setState(({ data }) => ({
        data: data.map(item => {
          if (item.id === id) {
            return { ...item, [prop]: !item[prop] }
          }
          return item;
        })
      }))
    }
  
    searchEmp = (items, term) => {
      if (term.length === 0) {
        return items;
      }
      return items.filter(item => {
        return item.name.indexOf(term) > -1
      })
    }
  
    onUpdateSearch = (term) => {
      this.setState({ term });
    }
  
    filterPost = (items, filter) => {
      switch (filter) {
        case 'like':
          return items.filter(item => item.like);
        case 'moreThen1000':
          return items.filter(item => item.salary > 1000);
        default:
          return items;
      }
    }
  
    onFilterSelect = (filter) => {
      this.setState({ filter });
    }
  
    render() {
      const { data, term, filter } = this.state;
  
      const employees = this.state.data.length;
      const increased = this.state.data.filter(item => item.increase).length;
      const visibleData = this.filterPost(this.searchEmp(data, term), filter);
  
      return (

        
          <div className="app">
            <AppInfo employees={employees} increased={increased} />
  
            <div className="search-panel">
              <SearchPanel onUpdateSearch={this.onUpdateSearch} />
              <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
            </div>
            <EmployeesList
              data={visibleData}
              onDelete={this.deleteItem}
              onToggleProp={this.onToggleProp}
            />
            <EmployeesAddForm
              onAdd={this.addItem} />
          </div>
        
  
      );
    }
  }

  export default Home;
  