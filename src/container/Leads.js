import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Button, Modal, Box, TextField, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, 
  Paper, CircularProgress, Alert, IconButton 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const API_URL = "https://crm-backend-4ad5.vercel.app/api/lead/leads";

export default function LeadsComponent() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newLead, setNewLead] = useState({
    name: '', email: '', status: 'New', notes: '', assignedTo: ''
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchLeads();
    } else {
      setError("Authentication token not found. Please login again.");
    }
  }, [token]);

  async function fetchLeads() {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(response.data);
    } catch (err) {
      setError(`Failed to load leads: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setNewLead({ ...newLead, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Authentication token missing. Please login again.");
      return;
    }

    try {
      if (editMode) {
        await axios.put(`${API_URL}/${selectedLead._id}`, newLead, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeads(leads.map(lead => lead._id === selectedLead._id ? newLead : lead));
      } else {
        const response = await axios.post(API_URL, newLead, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeads([...leads, response.data]);
      }
      setNewLead({ name: '', email: '', status: 'New', notes: '', assignedTo: '' });
      setOpen(false);
      setEditMode(false);
    } catch (err) {
      setError(`Failed to ${editMode ? 'update' : 'add'} lead: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEdit = (lead) => {
    setNewLead(lead);
    setSelectedLead(lead);
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!token) {
      setError("Authentication token missing. Please login again.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(leads.filter(lead => lead._id !== id));
    } catch (err) {
      setError(`Failed to delete lead: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <Button variant="contained" color="primary" className='text-white' onClick={() => { setOpen(true); setEditMode(false); }}>
          Add Lead
        </Button>
      </div>

      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1976d2' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Notes</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Assigned To</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leads.map((lead, index) => (
                <TableRow key={lead._id || index} sx={{ bgcolor: (index % 2 === 0 ? '#f5f5f5' : '#fff') }}>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.status}</TableCell>
                  <TableCell>{lead.notes}</TableCell>
                  <TableCell>{lead.assignedTo}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(lead)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(lead._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-title">
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', width: 400,
          bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 3
        }}>
          <h2 id="modal-title">{editMode ? 'Edit Lead' : 'Add New Lead'}</h2>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" label="Name" name="name" value={newLead.name} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Email" name="email" value={newLead.email} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Status" name="status" value={newLead.status} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Notes" name="notes" value={newLead.notes} onChange={handleChange} />
            <TextField fullWidth margin="normal" label="Assigned To" name="assignedTo" value={newLead.assignedTo} onChange={handleChange} required />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              {editMode ? 'Update Lead' : 'Save Lead'}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
