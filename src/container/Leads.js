import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, CircularProgress } from '@mui/material';

const API_URL = "https://crm-backend-4ad5.vercel.app/api/lead/leads";

export default function useLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestPayload, setRequestPayload] = useState(null); // For debugging
  const [responseData, setResponseData] = useState(null); // For debugging
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '', 
    email: '', 
    status: 'New', // Default value
    notes: '', 
    assignedTo: '',
  });

  // Clear error when modal is opened/closed
  useEffect(() => {
    setError(null);
  }, [leadModalOpen]);

  // 🟢 Fetch Leads from API
  useEffect(() => {
    async function fetchLeads() {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        console.log("GET response:", response);
        setLeads(response.data);
      } catch (err) {
        console.error("Fetch error details:", {
          message: err.message,
          response: err.response,
          data: err.response?.data
        });
        setError(`Failed to load leads: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  // 🟢 Add New Lead with extensive debugging
  async function addLead() {
    setLoading(true);
    setError(null);
    setRequestPayload(null);
    setResponseData(null);
    
    try {
      // Check for empty required fields
      if (!newLead.name.trim()) {
        throw new Error("Name is required");
      }
      if (!newLead.email.trim()) {
        throw new Error("Email is required");
      }
      if (!newLead.status.trim()) {
        throw new Error("Status is required");
      }
      if (!newLead.assignedTo.trim()) {
        throw new Error("Assigned To is required");
      }

      // Format the payload based on what the API might be expecting
      const payload = {
        name: newLead.name.trim(),
        email: newLead.email.trim(),
        status: newLead.status.trim(),
        notes: newLead.notes.trim(),
        assignedTo: newLead.assignedTo.trim()
      };
      
      // Save a copy for debugging
      setRequestPayload(payload);
      console.log("Sending lead data:", payload);
      
      const response = await axios.post(API_URL, payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Success Response:", response);
      setResponseData(response.data);
      
      setLeads(prevLeads => [...prevLeads, response.data]);
      setNewLead({ 
        name: '', 
        email: '', 
        status: 'New', 
        notes: '', 
        assignedTo: '' 
      });
      setLeadModalOpen(false);
    } catch (err) {
      // Client-side validation errors
      if (!err.response) {
        setError(err.message);
        console.error("Client validation error:", err.message);
        return;
      }
      
      // Detailed server error logging
      console.error("Add lead error:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
        message: err.message
      });
      
      // Format a user-friendly error message
      let errorMessage = "Failed to add lead: ";
      
      if (err.response?.data?.message) {
        errorMessage += err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage += err.response.data.error;
      } else if (Object.keys(err.response?.data || {}).length > 0) {
        // If the API returns validation errors as an object
        const errors = Object.entries(err.response.data)
          .map(([field, msg]) => `${field}: ${msg}`)
          .join(', ');
        errorMessage += errors;
      } else {
        errorMessage += err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // 🟢 UI Component (Table + Modal)
  function LeadsComponent() {
    return (
      <>
        <h2 className="text-2xl font-bold mb-4">Lead Management</h2>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => setLeadModalOpen(true)} 
          sx={{ mb: 2 }}
          disabled={loading}
        >
          Add Lead
        </Button>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {/* Debug section - only shown when there's an error */}
        {error && requestPayload && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <details>
              <summary>Debug Info (Last Request)</summary>
              <pre>{JSON.stringify(requestPayload, null, 2)}</pre>
            </details>
          </Alert>
        )}

        {loading && !leadModalOpen ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {leads.length > 0 ? (
                  leads.map((lead, index) => (
                    <TableRow key={lead._id || index} sx={{ bgcolor: index % 2 === 0 ? '#f5f5f5' : '#fff' }}>
                      <TableCell>{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.status}</TableCell>
                      <TableCell>{lead.notes}</TableCell>
                      <TableCell>{lead.assignedTo}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No leads found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* 🟢 Add Lead Modal */}
        <Modal open={leadModalOpen} onClose={() => setLeadModalOpen(false)} aria-labelledby="modal-title">
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', width: 400,
            bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 3,
          }}>
            <h2 id="modal-title">Add New Lead</h2>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={(e) => { e.preventDefault(); addLead(); }}>
              <TextField 
                fullWidth 
                margin="normal" 
                label="Name" 
                name="name" 
                value={newLead.name} 
                onChange={(e) => setNewLead({ ...newLead, name: e.target.value })} 
                required 
                error={error && !newLead.name.trim()}
                helperText={error && !newLead.name.trim() ? "Name is required" : ""}
              />
              <TextField 
                fullWidth 
                margin="normal" 
                label="Email" 
                name="email" 
                type="email"
                value={newLead.email} 
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })} 
                required 
                error={error && !newLead.email.trim()}
                helperText={error && !newLead.email.trim() ? "Email is required" : ""}
              />
              <TextField 
                fullWidth 
                margin="normal" 
                label="Status" 
                name="status" 
                value={newLead.status} 
                onChange={(e) => setNewLead({ ...newLead, status: e.target.value })} 
                required 
                error={error && !newLead.status.trim()}
                helperText={error && !newLead.status.trim() ? "Status is required" : "e.g. New, Qualified, Contacted"}
              />
              <TextField 
                fullWidth 
                margin="normal" 
                label="Notes" 
                name="notes" 
                value={newLead.notes} 
                onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })} 
                multiline
                rows={2}
              />
              <TextField 
                fullWidth 
                margin="normal" 
                label="Assigned To" 
                name="assignedTo" 
                value={newLead.assignedTo} 
                onChange={(e) => setNewLead({ ...newLead, assignedTo: e.target.value })} 
                required 
                error={error && !newLead.assignedTo.trim()}
                helperText={error && !newLead.assignedTo.trim() ? "Assigned To is required" : ""}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Lead'}
              </Button>
            </form>
          </Box>
        </Modal>
      </>
    );
  }

  return { LeadsComponent };
}