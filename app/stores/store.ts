import { observable, action } from "mobx";
import { DropResult } from "react-beautiful-dnd";
import { Todo } from "../model";
class TodoStore {
  @observable todo: string = "";
  @observable todos: Todo[] = [];
  @observable completedTodos: Todo[] = [];
  @action setTodo = (todo: string) => {
    this.todo = todo;
  };

  @action setTodos = (todos: Todo[]) => {
    this.todos = todos;
  };

  @action setCompletedTodos = (completedTodos: Todo[]) => {
    this.completedTodos = completedTodos;
  };

  @action handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (this.todo) {
      this.todos.push({ id: Date.now(), todo: this.todo, isDone: false });
      this.todo = "";
    }
  };

  @action onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = this.todos;
    let complete = this.completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    this.completedTodos = complete;
    this.todos = active;
  };
}

const store = new TodoStore();
export default store;
