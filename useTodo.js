import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

export const useTodo = () => {

    const initialState = [
        {
            id: new Date().getTime(),
            description: "Recolectar igos",
            done: false,
        },
        {
            id: new Date().getTime() * 3,
            description: "Recolectar manzanas",
            done: true
        }
 
    ]
    const init =() =>{
        return JSON.parse( localStorage.getItem('todos')) || [];
    }
    const [todos, dispatch] = useReducer(todoReducer, initialState, init)


    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos));
      },[todos])
      
      const handleNewTodo =(todo) =>{
          const action = {
              type: '[TODO] Add Todo',
              payload: todo
          }
  
          dispatch(action);
      }
  
      const handleDeleteTodo =(id) =>{
        dispatch({
          type:'[TODO] Remove Todo',
          payload: id
        });
      }
  
      const handleToggleTodo = (id) =>{
          dispatch({
              type:'[TODO] Toggle Todo',
              payload: id
            }); 
      }

      const todosCount = () =>{
       return todos.length
      }

      const pendingsTodosCount =() =>{
        return todos.filter(todo => !todo.done).length
      }
    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount,
        pendingsTodosCount 
    };
};

