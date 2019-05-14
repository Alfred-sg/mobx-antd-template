import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer, inject } from "mobx-react";

import Todo from "./Todo";

@observer
@inject('todoList')
class TodoList extends React.Component {
  @observable newTodoTitle = "";

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          New Todo:
          <input
            type="text"
            value={this.newTodoTitle}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <hr />
        <ul>
          {this.props.todoList.todos.map(todo => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {this.props.todoList.unfinishedTodoCount}
      </div>
    );
  }

  @action
  handleInputChange = e => {
    this.newTodoTitle = e.target.value;
  };

  @action
  handleFormSubmit = e => {
    this.props.todoList.addTodo(this.newTodoTitle);
    this.newTodoTitle = "";
    e.preventDefault();
  };
}

export default TodoList;
