import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { DataGrid } from '@mui/x-data-grid';
import articles from '../../assets/styles/article-content';

const DashArticleListPage = () => {
  const [rows, setRows] = useState(
    articles.map((article, index) => ({
      id: index + 1,
      slug: article.name,
      title: article.title,
      paragraphs: article.content.length,
      preview: article.content[0],
      status: 'Active',
    }))
  );

  const handleToggleStatus = (id) => {
    setRows((current) =>
      current.map((row) =>
        row.id === id
          ? { ...row, status: row.status === 'Active' ? 'Disabled' : 'Active' }
          : row
      )
    );
  };

  const handleEdit = (slug) => {
    alert(`Edit article: ${slug}`);
  };

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'slug', headerName: 'Slug', width: 160 },
      { field: 'title', headerName: 'Title', width: 260 },
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
        width: 220,
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
            <Button variant="contained" sx={{ minWidth: 140, px: 4, py: 1.5 }} onClick={() => alert('Open article editor')}>
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
    </Box>
  );
};

export default DashArticleListPage;
