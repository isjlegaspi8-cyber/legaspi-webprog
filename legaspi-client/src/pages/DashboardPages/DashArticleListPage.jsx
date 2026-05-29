import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import articles from '../../assets/styles/article-content';

const initialArticleValues = {
  id: null,
  slug: '',
  title: '',
  imageUrl: '',
  content: '',
  status: 'Active',
};

const DashArticleListPage = () => {
  const [rows, setRows] = useState(
    articles.map((article, index) => ({
      id: index + 1,
      slug: article.name,
      title: article.title,
      imageUrl: article.imageUrl || '',
      paragraphs: article.content.length,
      preview: article.content[0],
      status: 'Active',
      content: article.content.join('\n\n'),
    }))
  );
  const [editorValues, setEditorValues] = useState(initialArticleValues);
  const [editorOpen, setEditorOpen] = useState(false);

  const handleEditorClose = () => {
    setEditorOpen(false);
    setEditorValues(initialArticleValues);
  };

  const handleAddArticle = () => {
    setEditorValues(initialArticleValues);
    setEditorOpen(true);
  };

  const handleEdit = (slug) => {
    const article = rows.find((row) => row.slug === slug);
    if (!article) return;
    setEditorValues({
      id: article.id,
      slug: article.slug,
      title: article.title,
      imageUrl: article.imageUrl || '',
      content: article.content,
      status: article.status,
    });
    setEditorOpen(true);
  };

  const handleToggleStatus = (id) => {
    setRows((current) =>
      current.map((row) =>
        row.id === id
          ? { ...row, status: row.status === 'Active' ? 'Disabled' : 'Active' }
          : row
      )
    );
  };

  const handleEditorChange = (field) => (event) => {
    const value = event.target.value;
    setEditorValues((current) => ({ ...current, [field]: value }));
  };

  const handleSaveArticle = () => {
    if (!editorValues.slug.trim() || !editorValues.title.trim()) {
      return;
    }

    const paragraphs = editorValues.content
      .split(/\n{2,}|\r\n{2,}/)
      .filter((paragraph) => paragraph.trim().length > 0);
    const preview = paragraphs[0] || '';
    const nextRow = {
      id: editorValues.id || rows.length + 1,
      slug: editorValues.slug.trim().replace(/\s+/g, '-').toLowerCase(),
      title: editorValues.title.trim(),
      imageUrl: editorValues.imageUrl.trim(),
      paragraphs: paragraphs.length,
      preview,
      status: editorValues.status,
      content: editorValues.content,
    };

    setRows((current) => {
      if (editorValues.id) {
        return current.map((row) => (row.id === editorValues.id ? nextRow : row));
      }
      return [...current, nextRow];
    });

    handleEditorClose();
  };

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'slug', headerName: 'Slug', width: 160 },
      { field: 'title', headerName: 'Title', width: 260 },
      {
        field: 'imageUrl',
        headerName: 'Image URL',
        width: 240,
        renderCell: (params) => (
          <Typography
            variant="body2"
            sx={{ color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {params.value || 'No image set'}
          </Typography>
        ),
      },
      { field: 'paragraphs', headerName: 'Paragraphs', width: 140 },
      {
        field: 'preview',
        headerName: 'Preview',
        width: 340,
        renderCell: (params) => <Typography variant="body2">{params.value}</Typography>,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 120,
        renderCell: (params) => (
          <Chip
            label={params.value}
            color={params.value === 'Active' ? 'success' : 'warning'}
            size="small"
          />
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 260,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleEdit(params.row.slug)}
              sx={{ color: '#f8fafc', borderColor: '#94a3b8' }}
            >
              Edit
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleToggleStatus(params.row.id)}
              sx={{ backgroundColor: '#f59e0b' }}
            >
              {params.row.status === 'Active' ? 'Disable' : 'Enable'}
            </Button>
          </Box>
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Box>
        <Typography variant="overline" sx={{ color: '#facc15', letterSpacing: '0.3em' }}>
          ARTICLES
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 900, mt: 1 }}>
          Dash Article List
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>
          Manage published intelligence from the dashboard with quick controls for active status and article previews.
        </Typography>
      </Box>

      <Card sx={{ background: '#08101f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.75rem' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="h6" sx={{ color: '#f8fafc' }}>
              Article catalog
            </Typography>
            <Button variant="contained" sx={{ minWidth: 140, px: 4, py: 1.5 }} onClick={handleAddArticle}>
              Add Article
            </Button>
          </Box>
          <Box sx={{ height: 520, width: '100%', '& .MuiDataGrid-root': { border: 'none' } }}>
            <DataGrid
              rows={rows}
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

      <Dialog
        open={editorOpen}
        onClose={handleEditorClose}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { background: '#090c18', color: '#f8fafc' } }}
      >
        <DialogTitle sx={{ color: '#f8fafc' }}>
          {editorValues.id ? 'Edit Article' : 'Add Article'}
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Slug"
                variant="filled"
                value={editorValues.slug}
                onChange={handleEditorChange('slug')}
                helperText="Use hyphens only; this will be used in the public article URL."
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#0f172a', color: '#f8fafc' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                variant="filled"
                value={editorValues.title}
                onChange={handleEditorChange('title')}
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#0f172a', color: '#f8fafc' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                variant="filled"
                value={editorValues.imageUrl}
                onChange={handleEditorChange('imageUrl')}
                helperText="Optional image URL for the public article card."
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#0f172a', color: '#f8fafc' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Content paragraphs"
                variant="filled"
                value={editorValues.content}
                onChange={handleEditorChange('content')}
                multiline
                rows={8}
                helperText="Enter each paragraph on a new line."
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#0f172a', color: '#f8fafc' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Status"
                variant="filled"
                select
                value={editorValues.status}
                onChange={handleEditorChange('status')}
                InputLabelProps={{ sx: { color: '#94a3b8' } }}
                InputProps={{ sx: { background: '#0f172a', color: '#f8fafc' } }}
                SelectProps={{ native: true }}
              >
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleEditorClose} sx={{ color: '#cbd5e1' }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveArticle} sx={{ backgroundColor: '#f59e0b' }}>
            Save Article
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
