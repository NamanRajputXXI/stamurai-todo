import React, { useRef } from "react";

interface props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="flex w-[95%] relative items-center"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="w-full rounded-[50px] transition py-5 px-[30px] text-[25px] border-none duration-200 focus:outline-none"
      />
      <button
        type="submit"
        className="absolute w-[50px] h-[50px] m-3 rounded-[50px] right-0 border-none bg-[#2f74c0] text-white transition-all duration-200 active:transform active:scale-80 active:shadow-md"
      >
        GO
      </button>
    </form>
  );
};

export default InputField;
