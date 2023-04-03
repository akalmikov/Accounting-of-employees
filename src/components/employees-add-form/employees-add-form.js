import { Component } from 'react';

import './employees-add-form.css';


class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.name.lenght < 3 || !this.state.salary) return;
        this.props.onAdd(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: ''
        })
    }

    render() {
        const {name, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Add a new employee</h3>
                <form className="add-form d-flex"
                    onSubmit = {this.onSubmit}>
                    <input 
                        name="name"
                        value={name}
                        onChange={this.onValueChange} 
                        type="text"
                        className="form-control new-post-label"
                        placeholder="What's his name?"/>
                    <input 
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange} 
                        type="number"
                        className="form-control new-post-label"
                        placeholder="Salary($)" />
                    <button type="submit" 
                        className="btn btn-outline-light">Add</button>
                </form>
            </div>
        )
    }
    
}

export default EmployeesAddForm;