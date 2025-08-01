import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, TextField, Button, List, ListItem, ListItemText,
  Checkbox, IconButton, Snackbar, Paper, Typography, Select, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MuiAlert from '@mui/material/Alert';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/todos`;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function App({ toggleTheme, mode }) {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Load todos from backend
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setTodos(res.data))
      .catch(err => showSnackbar('Failed to load todos', err));
  }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      if (editId) {
        const res = await axios.put(`${API_URL}/${editId}`, { text });
        setTodos(todos.map(todo => (todo._id === editId ? res.data : todo)));
        showSnackbar('Todo updated');
        setEditId(null);
      } else {
        const res = await axios.post(API_URL, { text });
        setTodos([...todos, res.data]);
        showSnackbar('Todo added');
      }
      setText('');
    } catch (err) {
      showSnackbar('Error saving todo', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
      showSnackbar('Todo deleted');
    } catch {
      showSnackbar('Error deleting', 'error');
    }
  };

  const handleToggle = async (id) => {
    const todo = todos.find(t => t._id === id);
    try {
      const res = await axios.put(`${API_URL}/${id}`, { done: !todo.done });
      setTodos(todos.map(t => t._id === id ? res.data : t));
    } catch {
      showSnackbar('Error updating status', 'error');
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 3, mt: 4, background: mode === 'dark' ? '#121212' : '#fff' }}>
        <Typography variant="h4" align="center" gutterBottom>Todo List</Typography>

        <Button
          variant="outlined"
          onClick={toggleTheme}
          sx={{ float: 'right', mb: 2 }}
        >
          {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <TextField
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            label={editId ? 'Edit Todo' : 'New Todo'}
          />
          <Button type="submit" variant="contained">{editId ? 'Update' : 'Add'}</Button>
        </form>

        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>

        <List>
          {filteredTodos.map(todo => (
            <ListItem
              key={todo._id}
              secondaryAction={
                <>
                  <IconButton onClick={() => { setEditId(todo._id); setText(todo.text); }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(todo._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
            >
              <Checkbox checked={todo.done} onChange={() => handleToggle(todo._id)} />
              <ListItemText
                primary={todo.text}
                style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}
