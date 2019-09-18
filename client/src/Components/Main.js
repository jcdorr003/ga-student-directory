import React from 'react';
import {Route , Switch} from "react-router-dom"
import AllCohorts from "./AllCohorts"
import SingleCohort from "./SingleCohort"
import UpdateStudentForm from "./UpdateStudentForm"
import LogIn from "./LogIn"

import { showCohorts} from '../Services/api-helper.js'


class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cohorts: [],
      form: {
        name: '',
        linkedin: '',
        user_id: ''
      }
    }
  }

  handleChange = (e) => {
  const { name, value } = e.target;
  this.setState((prevState) => ({
    form: {
      ...prevState.form,
      [name]: value,
    }
  }));
  console.log("this is handle change", this.state.form)
  }


  getCohorts = async () => {
    const cohorts = await showCohorts();
    this.setState({ cohorts })
    await console.log(this.state.cohorts);
  };

  test = async (student) => {
    this.setState((prevState) => ({
      form: {
        name: student.name,
        linkedin: student.linkedin,
        user_id: student.user_id,
        id: student.id,
      }
  }))
}

updateStudent = async (e) => {
  e.preventDefault();
  const { id, ...data } = this.state.form;
  const student = await updateStudent(data, id);
}

  componentDidMount() {
    this.getCohorts();
  }


  render () {
    return(
      <div className="Main">
        <Switch>
          <Route path= "/allcohorts"
          render = {(props) => <AllCohorts
                          coh={this.state.cohorts}
                          /> } />
          <Route path= "/cohort/:id"
          render = {(props) => <SingleCohort {...props}
                                form={this.state.form}
                                handleChange={this.handleChange}
                          /> } />
          <Route path= "/edit/:id"
          render = {(props) => <UpdateStudentForm {...props}
                                handleChange= {this.handleChange}
                                test = {this.test}
                                form = {this.state.form}
                                handleSubmit={this.updateStudent}
                          /> } />

          <Route path= "/" component= {LogIn} />
        </Switch>
      </div>
    )
  }
}

export default Main;
