import React, { useEffect, useState } from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }

    const storedCompletedTodos = localStorage.getItem("completedTodos");
    if (storedCompletedTodos) {
      setCompletedTodos(JSON.parse(storedCompletedTodos));
    }
  }, []);

  // Save todos to local storage whenever todos or completedTodos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos]);

  return (
    <div className="flex items-start justify-between mt-10 md:w-[95%] w-[85%] md:flex-row gap-10 flex-col">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`rounded-md flex flex-col md:w-[47.5%] w-[95%] p-[15px] ${
              snapshot.isDraggingOver ? "bg-[#00DDEC]" : "bg-blue-400"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="md:text-[30px] text-[20px] text-white">
              Active Tasks
            </span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={todos}
                todo={todo}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`rounded-md flex flex-col w-[47.5%] p-[15px] ${
              snapshot.isDraggingOver ? "bg-[#FF2614]" : "bg-[#FF6750]"
            }`}
          >
            <span className="md:text-[30px] text-[20px] text-white">
              Completed Tasks
            </span>
            {completedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={completedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
