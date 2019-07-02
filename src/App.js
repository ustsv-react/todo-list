import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], inputText: "", curIndex: 0, filter: "all" };
  }

  handleInput = e => {
    this.setState({ inputText: e.target.value });
  };

  handleAdd = e => {
    e.preventDefault();
    this.setState({ todos: [...this.state.todos,
      { text: this.state.inputText, completed: false, id: this.state.curIndex }],
    curIndex: this.state.curIndex + 1, inputText: "" });
  };

  handleFilter = name => {
    this.setState({filter: name});
  }

  handleFlip = id => {
    this.setState({ todos: this.state.todos.map((todo) => {
      if (id === todo.id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      } else {
        return todo;
      }
    })});
  }

  render() {
    const { inputText, todos, filter } = this.state;
    const buttonArray = ["all", "active", "completed"];
    console.log(this.state);
    return (
      <div>
        <form onSubmit={this.handleAdd}>
          <input value={inputText} onChange={this.handleInput}/>
          <button type="submit">Add a todo</button>
        </form>

        <ul>
          {todos.filter((todo) => {
            if (filter === "all") {
              return todo;
            } else if (filter === "active") {
              return !todo.completed;
            } else {
              return todo.completed;
            }
          }).map((todo, index) => {
            const { completed, id } = todo;
            return (
                <li
                  key={id}
                  onClick={() => this.handleFlip(id)}
                  className={`todo-item${completed ? " line-through" : ""}`}
                >
                  {todo.text}
                </li>
              );
          })}
        </ul>

        {
          buttonArray.map((button, index) => {
            return (
              <button
                onClick={() => this.handleFilter(button)}
                disabled={button === filter}
              >
                {button}
              </button>
            );
          })
        }
      </div>
    );
  }
}

export default App;
