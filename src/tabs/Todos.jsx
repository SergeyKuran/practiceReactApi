import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  onFormSubmit = text => {
    const todo = { id: nanoid(), text };
    this.setState(({ todos }) => ({ todos: [...todos, todo] }));
  };

  handleDeleteTodo = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.filter(({ id }) => id !== todoId),
    }));
  };

  // mapTodos = ({ id, text }, idx) => (
  //   <GridItem key={id}>
  //     <Todo
  //       id={id}
  //       text={text}
  //       idx={idx}
  //       handleDeleteTodo={this.handleDeleteTodo}
  //     />
  //   </GridItem>
  // );

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onFormSubmit} />

        <Grid>
          {todos.map(({ id, text }, idx) => (
            <GridItem key={id}>
              <Todo
                id={id}
                text={text}
                idx={idx}
                handleDeleteTodo={this.handleDeleteTodo}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
