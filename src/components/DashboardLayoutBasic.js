import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import useContacts from '../container/Contact'; // API call hook
import useLeads from '../container/Leads'; // Import the useLeads hook
import { Button, Modal, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const NAVIGATION = [
  { kind: 'header', title: 'Main items' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'orders', title: 'Contact Management', icon: <ShoppingCartIcon /> },
  { segment: 'leads', title: 'Lead Generation', icon: <BarChartIcon /> }, // Added Lead Generation
  { kind: 'divider' },
  { kind: 'header', title: 'Analytics' },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      { segment: 'sales', title: 'Sales', icon: <DescriptionIcon /> },
      { segment: 'traffic', title: 'Traffic', icon: <DescriptionIcon /> },
    ],
  },
  { segment: 'integrations', title: 'Integrations', icon: <LayersIcon /> },
];


const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);
  return React.useMemo(() => ({
    pathname, searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(String(path)),
  }), [pathname]);
}

export default function DashboardLayoutBasic(props) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const currentPage = router.pathname;
  const demoWindow = window ? window() : undefined;
  const { contacts, loading, error, addContact } = useContacts();
  const { LeadsComponent } = useLeads(); // Get the LeadsComponent from useLeads hook

  const [open, setOpen] = React.useState(false);
  const [newContact, setNewContact] = React.useState({
    name: '', email: '', phone: '', company: '', interactions: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContact(newContact);
      setNewContact({ name: '', email: '', phone: '', company: '', interactions: '' });
      handleClose();
    } catch (err) {
      console.error("Error adding contact:", err);
    }
  };

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout>
        <PageContainer>
          {currentPage === '/orders' && (
            <>
              <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
                Add Contact
              </Button>

              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: '#1976d2' }}>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Phone</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Company</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Interactions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contacts.map((contact, index) => (
                        <TableRow key={contact._id} sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333' : (index % 2 === 0 ? '#f5f5f5' : '#fff') }}>
                          <TableCell>{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.phone}</TableCell>
                          <TableCell>{contact.company}</TableCell>
                          <TableCell>{contact.interactions.join(', ')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}

          {/* Render LeadsComponent when on the leads page */}
          {currentPage === '/leads' && <LeadsComponent />}

          <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
            <Box sx={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)', width: 400,
              bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 3,
            }}>
              <h2 id="modal-title">Add New Contact</h2>
              <form onSubmit={handleSubmit}>
                <TextField fullWidth margin="normal" label="Name" name="name" value={newContact.name} onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Email" name="email" value={newContact.email} onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Phone" name="phone" value={newContact.phone} onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Company" name="company" value={newContact.company} onChange={handleChange} required />
                <TextField fullWidth margin="normal" label="Interactions (comma separated)" name="interactions" value={newContact.interactions} onChange={handleChange} required />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                  Save Contact
                </Button>
              </form>
            </Box>
          </Modal>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}