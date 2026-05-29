import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid } from '@mui/x-data-grid';

const initialUserRows = [
  { id: 1, firstName: 'Alicia', lastName: 'Reyes', username: 'alicia.reyes', email: 'alicia.reyes@example.com', role: 'Admin', status: 'Active', lastLogin: 'Today' },
  { id: 2, firstName: 'Marco', lastName: 'Santos', username: 'marco.santos', email: 'marco.santos@example.com', role: 'Viewer', status: 'Active', lastLogin: 'Yesterday' },
  { id: 3, firstName: 'Bianca', lastName: 'Cruz', username: 'bianca.cruz', email: 'bianca.cruz@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2d ago' },
  { id: 4, firstName: 'Nathan', lastName: 'Diaz', username: 'nathan.diaz', email: 'nathan.diaz@example.com', role: 'Viewer', status: 'Active', lastLogin: 'Today' },
  { id: 5, firstName: 'Jasmine', lastName: 'Garcia', username: 'jasmine.garcia', email: 'jasmine.garcia@example.com', role: 'Editor', status: 'Inactive', lastLogin: '3d ago' },
];

const initialFormValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  contactNumber: '',
  age: '',
  role: 'Viewer',
  status: 'Active',
  password: '',
  confirmPassword: '',
};

const validationRules = {
  firstName: (value) => (!value.trim() ? 'First name is required.' : ''),
  lastName: (value) => (!value.trim() ? 'Last name is required.' : ''),
  username: (value) => {
    if (!value.trim()) return 'Username is required.';
    if (value.includes(' ')) return 'Username must not contain spaces.';
    return '';
  },
  email: (value) => {
    if (!value.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
    return '';
  },
  contactNumber: (value) => {
    if (!value.trim()) return 'Contact number is required.';
    if (!/^\d{11}$/.test(value)) return 'Contact number must be exactly 11 digits.';
    return '';
  },
  age: (value) => {
    if (!value.trim()) return 'Age is required.';
    if (!/^\d+$/.test(value)) return 'Age must be a number only.';
    if (Number(value) <= 0) return 'Age must be greater than zero.';
    return '';
  },
  password: (value) => {
    if (!value) return 'Password is required.';
    if (value.length < 8) return 'Password must be at least 8 characters.';
    return '';
  },
  confirmPassword: (value, values) => {
    if (!value) return 'Confirm password is required.';
    if (value !== values.password) return 'Passwords do not match.';
    return '';
  },
};

const UsersPage = () => {
  const [rows, setRows] = useState(initialUserRows);
  const [searchValue, setSearchValue] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');

  const handleOpenDialog = () => {
    setDialogOpen(true);
    setFormMessage('');
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormValues(initialFormValues);
    setFormErrors({});
    setFormMessage('');
  };

  const handleFieldChange = (field) => (event) => {
    const nextValue = event.target.value;
    setFormValues((prev) => {
      const nextValues = { ...prev, [field]: nextValue };
      setFormErrors((current) => ({
        ...current,
        [field]: validationRules[field]?.(nextValue, nextValues) || '',
        ...(field === 'password'
          ? { confirmPassword: validationRules.confirmPassword(nextValues.confirmPassword, nextValues) }
          : {}),
      }));
      return nextValues;
    });
    setFormMessage('');
  };

  const handleAddUser = () => {
    const nextErrors = Object.keys(initialFormValues).reduce((acc, field) => {
      const error = validationRules[field]?.(formValues[field], formValues) || '';
      if (error) acc[field] = error;
      return acc;
    }, {});

    if (Object.keys(nextErrors).length) {
      setFormErrors(nextErrors);
      setFormMessage('Please fix the highlighted fields before saving.');
      return;
    }

    const nextId = rows.length ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    setRows((current) => [
      ...current,
      {
        id: nextId,
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        username: formValues.username.trim(),
        email: formValues.email.trim(),
        role: formValues.role,
        status: formValues.status,
        lastLogin: 'Just added',
      },
    ]);
    setFormValues(initialFormValues);
    setFormErrors({});
    setFormMessage('New user added successfully.');
    setDialogOpen(false);
  };

  const handleToggleStatus = (id) => {
    setRows((current) =>
      current.map((row) =>
        row.id === id ? { ...row, status: row.status === 'Active' ? 'Inactive' : 'Active' } : row
      )
    );
  };

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const query = searchValue.trim().toLowerCase();
        if (!query) return true;
        const fullName = `${row.firstName} ${row.lastName}`.toLowerCase();
        return (
          fullName.includes(query) ||
          row.username.toLowerCase().includes(query) ||
          row.email.toLowerCase().includes(query)
        );
      }),
    [rows, searchValue]
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 220,
      valueGetter: (params) => {
        const row = params?.row || {};
        return `${row.firstName || ''} ${row.lastName || ''}`.trim();
      },
    },
    { field: 'username', headerName: 'Username', width: 180 },
    { field: 'role', headerName: 'Role', width: 140 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const active = params.value === 'Active';
        return (
          <Chip
            label={params.value}
            sx={{
              background: `${active ? '#22c55e' : '#f59e0b'}20`,
              color: active ? '#22c55e' : '#f59e0b',
              fontWeight: 700,
              borderRadius: '999px',
              px: 1.5,
            }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const row = params?.row || {};
        return (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="outlined"
              sx={{ color: '#f8fafc', borderColor: '#94a3b8' }}
              onClick={() => alert(`Edit ${row.username || ''}`)}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="contained"
              color={row.status === 'Active' ? 'error' : 'success'}
              onClick={() => row.id != null && handleToggleStatus(row.id)}
            >
              {row.status === 'Active' ? 'Disable' : 'Activate'}
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Box>
        <Typography variant="overline" sx={{ color: '#facc15', letterSpacing: '0.3em' }}>
          USERS
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 900, mt: 1 }}>
          Team Member Directory
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>
          Review the current user roster, roles, and access status in a clean table designed for administration and monitoring.
        </Typography>
      </Box>

      <Card sx={{ background: '#08101f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.75rem' }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              mb: 3,
            }}
          >
            <TextField
              sx={{ flex: '1 1 420px' }}
              label="Search users"
              variant="filled"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              InputLabelProps={{ sx: { color: '#94a3b8' } }}
              InputProps={{ sx: { background: '#0f172a', color: '#f8fafc' } }}
            />
            <Button variant="contained" onClick={handleOpenDialog} sx={{ minWidth: 140, px: 4, py: 1.5 }}>
              Add User
            </Button>
          </Box>

          <Box sx={{ height: 520, width: '100%', '& .MuiDataGrid-root': { border: 'none' } }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              initialState={{ pagination: { paginationModel: { pageSize: 7 } } }}
              pageSizeOptions={[7]}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                color: '#f8fafc',
                '.MuiDataGrid-cell': { borderBottom: '1px solid rgba(148,163,184,0.12)' },
                '.MuiDataGrid-columnHeaders': { background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.08)' },
                '.MuiDataGrid-footerContainer': { borderTop: '1px solid rgba(255,255,255,0.08)' },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="filled"
                value={formValues.firstName}
                onChange={handleFieldChange('firstName')}
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#f8fafc0d' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="filled"
                value={formValues.lastName}
                onChange={handleFieldChange('lastName')}
                error={!!formErrors.lastName}
                helperText={formErrors.lastName}
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#f8fafc0d' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                variant="filled"
                value={formValues.username}
                onChange={handleFieldChange('username')}
                error={!!formErrors.username}
                helperText={formErrors.username}
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#f8fafc0d' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="filled"
                value={formValues.email}
                onChange={handleFieldChange('email')}
                error={!!formErrors.email}
                helperText={formErrors.email}
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#f8fafc0d' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contact Number"
                variant="filled"
                value={formValues.contactNumber}
                onChange={handleFieldChange('contactNumber')}
                error={!!formErrors.contactNumber}
                helperText={formErrors.contactNumber}
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#f8fafc0d' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                variant="filled"
                value={formValues.age}
                onChange={handleFieldChange('age')}
                error={!!formErrors.age}
                helperText={formErrors.age}
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#f8fafc0d' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="filled" sx={{ background: '#f8fafc0d' }}>
                <InputLabel sx={{ color: '#94a3b8' }}>Role</InputLabel>
                <Select value={formValues.role} label="Role" onChange={handleFieldChange('role')} sx={{ color: '#f8fafc' }}>
                  {['Admin', 'Editor', 'Viewer', 'Support', 'Intern'].map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="filled" sx={{ background: '#f8fafc0d' }}>
                <InputLabel sx={{ color: '#94a3b8' }}>Status</InputLabel>
                <Select value={formValues.status} label="Status" onChange={handleFieldChange('status')} sx={{ color: '#f8fafc' }}>
                  {['Active', 'Inactive'].map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="filled"
                value={formValues.password}
                onChange={handleFieldChange('password')}
                error={!!formErrors.password}
                helperText={formErrors.password}
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#f8fafc0d' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                variant="filled"
                value={formValues.confirmPassword}
                onChange={handleFieldChange('confirmPassword')}
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#f8fafc0d' } }}
              />
            </Grid>
          </Grid>
          {formMessage ? (
            <Typography color={formMessage.includes('successfully') ? 'success.main' : 'error.main'} sx={{ mt: 2 }}>
              {formMessage}
            </Typography>
          ) : null}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleAddUser}>
            Save User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
