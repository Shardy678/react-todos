import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { Box, Typography,ButtonGroup, Button }from "@mui/material"

const getInitialData = () => {
    const data = JSON.parse(localStorage.getItem("todos"))
    return data ? data : [];
}

export default function TodoList() {
    const [todos, setTodos] = useState(getInitialData);
    const [filter,setFilter] = useState('all')

useEffect(()=>{
    localStorage.setItem(
        'todos',JSON.stringify(todos)
    )
},[todos])

    const handleToggle = (id) => () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const removeTodo = (id) => {
        setTodos(prevTodos => {
            return prevTodos.filter(t => t.id !== id)
        })
    }

    const addTodo = (text, dueDate) => {
        setTodos(prevTodos => {
            return [...prevTodos,{text: text, id:crypto.randomUUID(),completed:false, dueDate: dueDate}]
        })
    }

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    }

    const handleEdit = (id, newText) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        );
        setTodos(updatedTodos);
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'active') return !todo.completed;
        return true; 
    })

    return (
        <Box sx={{
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center',
            m:3,
        }}>
            <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
            Todos
            </Typography>

            <ButtonGroup variant="contained" aria-label="text button group" sx={{ mb: 2 }}>
                <Button onClick={() => handleFilterChange('all')}>All</Button>
                <Button onClick={() => handleFilterChange('active')}>Active</Button>
                <Button onClick={() => handleFilterChange('completed')}>Completed</Button>
            </ButtonGroup>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {filteredTodos.map((todo) => (
                <TodoItem 
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggle(todo.id)}
                    removeTodo={() => removeTodo(todo.id)}
                    onEdit={handleEdit}
                />
            ))}
            <TodoForm addTodo={addTodo}/>
            </List>
        </Box>
        
    );
}
