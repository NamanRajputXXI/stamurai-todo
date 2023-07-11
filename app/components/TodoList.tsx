import React from "react";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
}

const TodoList: React.FC<props> = ({
  todos,
  setTodos,
  CompletedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className=" flex items-start justify-between mt-10 md:w-[95%] w-[85%] md:flex-row gap-10 flex-col">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`rounded-md flex flex-col md:w-[47.5%] w-[95%] p-[15px] bg-blue-400 ${
              snapshot.isDraggingOver ? "bg-[#00DDEC]" : ""
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
            className={`rounded-md flex flex-col w-[47.5%] p-[15px] bg-blue-400  ${
              snapshot.isDraggingOver ? "bg-[#FF2614]" : "bg-[#FF6750]"
            }`}
          >
            <span className="md:text-[30px] text-[20px] text-white">
              Completed Tasks
            </span>
            {CompletedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todos={CompletedTodos}
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
