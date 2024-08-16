import { ListItem, TextField, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import Create from '@mui/icons-material/Create'

export default function TodoForm({addTodo}) {
    const [text,setText] = useState("")
    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo(text)
        setText('')
    }
    return (
        <ListItem>
            <form onSubmit={handleSubmit}>
                <TextField 
                id='outlined-basic' 
                value={text} 
                onChange={handleChange} 
                label="Add todo" 
                variant="outlined" 
                InputProps={{
                    endAdornment:
                    <InputAdornment position="end">
                    <IconButton
                    aria-label="create todo"
                    edge="end"
                    type="submit"
                    >
                    <Create/>
                    </IconButton>
                </InputAdornment>
                }}/>
            </form>
        </ListItem>
    )
}
