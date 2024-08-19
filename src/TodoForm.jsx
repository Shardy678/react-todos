import { ListItem, TextField, InputAdornment, IconButton, Box } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add'

export default function TodoForm({addTodo}) {
    const [dueDate, setDueDate] = useState('')
    const [text,setText] = useState("")

    const handleTextChange = (e) => {
        setText(e.target.value)
    }
    
    const handleDateChange = (e) => {
        setDueDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo(text, dueDate)
        setText('')
        setDueDate('');
    }

    return (
        <ListItem>
            <form onSubmit={handleSubmit} style={{ width:'100%'}}>
                <TextField 
                id='outlined-basic' 
                value={text} 
                onChange={handleTextChange} 
                label="Add todo" 
                variant="outlined"
                fullWidth 
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="create todo"
                            edge="end"
                            type="submit"
                        >
                                <AddIcon/>
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                />
                <Box sx={{ mt: 2 }}>
                    <TextField
                        id="due-date"
                        type="date"
                        value={dueDate}
                        onChange={handleDateChange}
                        label="Due Date"
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                        fullWidth
                    />
                </Box>
            </form>
        </ListItem>
    )
}
