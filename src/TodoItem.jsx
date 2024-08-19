import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TextField, Typography, Box, Button } from '@mui/material';
import { useState } from 'react';

export default function TodoItem({ todo, onToggle, removeTodo, onEdit }) {
    const [isEditing,setIsEditing] = useState(false)
    const [editText,setEditText] = useState(todo.text)

    const handleEditChange = (e) => {
        setEditText(e.target.value)
    }

    const handleSaveEdit = () => {
        onEdit(todo.id,editText)
        setIsEditing(false)
    }
    
    const handleCancelEdit = () => {
        setEditText(todo.text)
        setIsEditing(false)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSaveEdit()
        }
    }

    const handleCheckboxClick = (e) => {
        if (isEditing) {
            e.stopPropagation()
        } else {
            onToggle()
        }
    }
    
    const labelId = `checkbox-list-label-${todo.id}`;

    return (
        <ListItem
            key={todo.id}
            secondaryAction={
                <Box>
                    <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(!isEditing)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="comments" onClick={removeTodo}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
                
            }
            disablePadding
        >
            <ListItemButton
                onClick={handleCheckboxClick}
                dense
            >
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={todo.completed}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                {isEditing ? (
                    <Box>
                        <TextField style={{mb:2}} autoFocus variant='standard' value={editText} onChange={handleEditChange} onKeyDown={handleKeyDown}/>
                        <Box sx={{mt:1}}>
                            <Button onClick={handleSaveEdit} variant="contained" size="small">Save</Button>
                            <Button onClick={handleCancelEdit} variant="outlined" size="small" sx={{ ml: 1 }}>Cancel</Button>
                        </Box>
                    </Box>
                    
                ) : (
                    <Box>
                        <ListItemText id={labelId} primary={todo.text} />
                {todo.dueDate && (
                    <Typography variant='body2' color='textSecondary'>
                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </Typography>
                )}
                    </Box>
                )}
                
            </ListItemButton>
        </ListItem>
    );
}
