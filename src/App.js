import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "./configs/routes";
import "./App.css";

class App extends Component {
  // onChange = e => {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // };

  // onSubmit = e => {
  //   e.preventDefault();
  //   let { name } = this.state;
  //   console.log(`${name} Data Success`);
  // };

  render() {
    return (
      <Router basename="/web-client">
        <div> learn react</div>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact
              render={(props) => (
                <route.component {...props} {...route.props} />
              )}
            />
          ))}
        </Switch>
      </Router>

      // <div className="hello">
      //   {names.map((name, index) => (
      //     <Hello key={index} name={name} />
      //   ))}
      //   <Counter />
      // </div>

      //     <form onSubmit={this.onSubmit}>
      //       <label>
      //         Name :
      //         <input
      //           value={this.state.name}
      //           type="text"
      //           name="name"
      //           onChange={this.onChange}
      //         />
      //       </label>
      //       <input type="submit" name="submit" />
      //     </form>
    );
  }
}

export default App;
