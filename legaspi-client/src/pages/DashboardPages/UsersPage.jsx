import { useMemo, useState, useEffect } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../services/UserService';

const initialUserRows = [
  { _id: 1, firstName: 'Alicia', lastName: 'Reyes', username: 'alicia.reyes', email: 'alicia.reyes@example.com', role: 'Admin', gender: 'Female', type: 'Active', lastLogin: 'Today' },
  { _id: 2, firstName: 'Marco', lastName: 'Santos', username: 'marco.santos', email: 'marco.santos@example.com', role: 'Viewer', gender: 'Male', type: 'Active', lastLogin: 'Yesterday' },
  { _id: 3, firstName: 'Bianca', lastName: 'Cruz', username: 'bianca.cruz', email: 'bianca.cruz@example.com', role: 'Editor', gender: 'Female', type: 'Inactive', lastLogin: '2d ago' },
  { _id: 4, firstName: 'Nathan', lastName: 'Diaz', username: 'nathan.diaz', email: 'nathan.diaz@example.com', role: 'Viewer', gender: 'Male', type: 'Active', lastLogin: 'Today' },
  { _id: 5, firstName: 'Jasmine', lastName: 'Garcia', username: 'jasmine.garcia', email: 'jasmine.garcia@example.com', role: 'Editor', gender: 'Female', type: 'Inactive', lastLogin: '3d ago' },
];

const initialFormValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  contactNumber: '',
  age: '',
  role: 'Viewer',
  gender: 'Female',
  type: 'Active',
  password: '',
  confirmPassword: '',
};

const roleFilterOptions = ['All', 'Admin', 'Editor', 'Viewer', 'Support', 'Intern'];
const genderFilterOptions = ['All', 'Male', 'Female', 'Other'];
const statusFilterOptions = ['All', 'Active', 'Inactive'];

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
  password: (value, values, isEditing) => {
    if (isEditing && !value) return '';
    if (!value) return 'Password is required.';
    if (value.length < 8) return 'Password must be at least 8 characters.';
    return '';
  },
  confirmPassword: (value, values, isEditing) => {
    if (isEditing && !values.password && !value) return '';
    if (!value) return 'Confirm password is required.';
    if (values.password && value !== values.password) return 'Passwords do not match.';
    return '';
  },
};

const UsersPage = () => {
  const [rows, setRows] = useState(initialUserRows);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');

  // Load users from API
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await fetchUsers();
      // Map API response to grid format if needed
      const mappedUsers = Array.isArray(data) ? data.map((u) => ({
        _id: u._id,
        id: u._id,
        firstName: u.firstName,
        lastName: u.lastName,
        username: u.username,
        email: u.email,
        role: u.role || 'Viewer',
        gender: u.gender || 'Other',
        type: u.type || 'Active',
        lastLogin: u.lastLogin || 'Unknown',
      })) : initialUserRows;
      setRows(mappedUsers);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Failed to load users. Using sample data.');
      setRows(initialUserRows);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setEditingUserId(null);
    setDialogOpen(true);
    setFormMessage('');
  };

  const handleEditUser = (row) => {
    setEditingUserId(row?.id ?? row?._id ?? null);
    setFormValues({
      firstName: row.firstName || '',
      lastName: row.lastName || '',
      username: row.username || '',
      email: row.email || '',
      contactNumber: row.contactNumber || '',
      age: row.age || '',
      role: row.role || 'Viewer',
      gender: row.gender || 'Female',
      type: row.type || 'Active',
      password: '',
      confirmPassword: '',
    });
    setFormErrors({});
    setFormMessage('');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingUserId(null);
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
        [field]: validationRules[field]?.(nextValue, nextValues, editingUserId != null) || '',
        ...(field === 'password'
          ? { confirmPassword: validationRules.confirmPassword(nextValues.confirmPassword, nextValues, editingUserId != null) }
          : {}),
      }));
      return nextValues;
    });
    setFormMessage('');
  };

  const handleSaveUser = async () => {
    const nextErrors = Object.keys(initialFormValues).reduce((acc, field) => {
      const error = validationRules[field]?.(formValues[field], formValues, editingUserId != null) || '';
      if (error) acc[field] = error;
      return acc;
    }, {});

    if (Object.keys(nextErrors).length) {
      setFormErrors(nextErrors);
      setFormMessage('Please fix the highlighted fields before saving.');
      return;
    }

    try {
      const payload = {
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        username: formValues.username.trim(),
        email: formValues.email.trim(),
        role: formValues.role,
        gender: formValues.gender,
        type: formValues.type,
      };

      if (editingUserId != null) {
        await updateUser(editingUserId, payload);
        setFormMessage('User updated successfully.');
      } else {
        payload.password = formValues.password;
        await createUser(payload);
        setFormMessage('New user added successfully.');
      }

      loadUsers();
      handleCloseDialog();
    } catch (err) {
      console.error('Error saving user:', err);
      setFormMessage('Error saving user: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleToggleStatus = (id) => {
    setRows((current) =>
      current.map((row) =>
        row.id === id ? { ...row, type: row.type === 'Active' ? 'Inactive' : 'Active' } : row
      )
    );
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(id);
      setFormMessage('User deleted successfully.');
      loadUsers();
      if (editingUserId === id) {
        handleCloseDialog();
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setFormMessage('Error deleting user: ' + (err.response?.data?.message || err.message));
    }
  };

  const isEditMode = editingUserId != null;

  const filteredRows = useMemo(
    () =>
      rows.filter((row) => {
        const query = searchValue.trim().toLowerCase();
        if (query) {
          const fullName = `${row.firstName} ${row.lastName}`.toLowerCase();
          if (
            !(
              fullName.includes(query) ||
              row.username.toLowerCase().includes(query) ||
              row.email.toLowerCase().includes(query)
            )
          ) {
            return false;
          }
        }

        const roleMatch = roleFilter === 'All' || row.role === roleFilter;
        const genderMatch = genderFilter === 'All' || row.gender === genderFilter;
        const statusMatch = statusFilter === 'All' || row.type === statusFilter;

        return roleMatch && genderMatch && statusMatch;
      }),
    [rows, searchValue, roleFilter, genderFilter, statusFilter]
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 80, valueGetter: (params) => params?.row?.id || params?.row?._id || '' },
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
      field: 'gender',
      headerName: 'Gender',
      width: 140,
      renderCell: (params) => {
        const gender = params?.row?.gender || '';
        const bg = gender === 'Male' ? '#0ea5e9' : gender === 'Female' ? '#ec4899' : '#94a3b8';
        return (
          <Chip
            label={gender}
            sx={{
              background: `${bg}20`,
              color: bg,
              fontWeight: 700,
              borderRadius: '999px',
              px: 1.5,
            }}
          />
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const active = params?.row?.type === 'Active';
        return (
          <Chip
            label={params?.row?.type || 'Unknown'}
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
              onClick={() => handleEditUser(row)}
            >
              Edit
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

      {error && <Alert severity="warning">{error}</Alert>}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      )}

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
            <FormControl sx={{ minWidth: 140 }} variant="filled">
              <InputLabel sx={{ color: '#94a3b8' }}>Role</InputLabel>
              <Select
                value={roleFilter}
                label="Role"
                onChange={(event) => setRoleFilter(event.target.value)}
                sx={{ background: '#0f172a', color: '#f8fafc' }}
              >
                {roleFilterOptions.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 140 }} variant="filled">
              <InputLabel sx={{ color: '#94a3b8' }}>Gender</InputLabel>
              <Select
                value={genderFilter}
                label="Gender"
                onChange={(event) => setGenderFilter(event.target.value)}
                sx={{ background: '#0f172a', color: '#f8fafc' }}
              >
                {genderFilterOptions.map((gender) => (
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 140 }} variant="filled">
              <InputLabel sx={{ color: '#94a3b8' }}>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(event) => setStatusFilter(event.target.value)}
                sx={{ background: '#0f172a', color: '#f8fafc' }}
              >
                {statusFilterOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleOpenDialog} sx={{ minWidth: 140, px: 4, py: 1.5 }}>
              Add User
            </Button>
          </Box>

          <Box sx={{ height: 520, width: '100%', '& .MuiDataGrid-root': { border: 'none' } }}>
            <DataGrid
              rows={filteredRows.map((row) => ({ ...row, id: row._id || row.id }))}
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
        <DialogTitle>{isEditMode ? 'Edit User' : 'Add User'}</DialogTitle>
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
                <InputLabel sx={{ color: '#94a3b8' }}>Gender</InputLabel>
                <Select value={formValues.gender} label="Gender" onChange={handleFieldChange('gender')} sx={{ color: '#f8fafc' }}>
                  {['Female', 'Male', 'Other'].map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                <Select value={formValues.type} label="Status" onChange={handleFieldChange('type')} sx={{ color: '#f8fafc' }}>
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
          <Button variant="contained" onClick={handleSaveUser}>
            {isEditMode ? 'Save Changes' : 'Save User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
