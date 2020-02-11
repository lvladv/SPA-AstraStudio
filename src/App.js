import React, { Component, Fragment } from "react";
import { Spiner } from "./components/spiner";
import Content from "./components/content";
import moment from "moment";

class App extends Component {
  state = {
    endsAt: "",
    tasks: [],
    close: false,
    content: false,
    timeNow: null
  };

  async fetchData() {
    const response = await fetch("http://sol-tst.herokuapp.com/api/v1/tasks/");
    const data = await response.json();
    this.setState({
      endsAt: data.endsAt,
      // первые три эллемента массива
      tasks: data.tasks.slice(0, 3),
      content: true,
      timeNow: null
    });
  }

  appClose = close => {
    this.setState({ close });
  };

  time = () => {
    this.setState({ timeNow: moment() });
  };

  componentDidMount() {
    this.fetchData();
    setInterval(() => {
      this.time();
    }, 1000);
  }

  render() {
    const { tasks, close, content, endsAt } = this.state;
    return (
      <div className="wrap">
        <div className="backgroundScreen">
          {close ? null : (
            <Fragment>
              {content ? (
                <Fragment>
                  <div className="header"> </div>
                  <Content
                    tasks={tasks}
                    appClose={this.appClose}
                    endsAt={endsAt}
                  />
                </Fragment>
              ) : (
                <Spiner />
              )}
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default App;
