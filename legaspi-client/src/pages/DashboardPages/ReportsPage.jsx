import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';

const reportRows = [
  { id: 1, name: 'Monthly Output', category: 'Summary', status: 'Complete', period: 'Apr 2026', value: '$83K' },
  { id: 2, name: 'Category Share', category: 'Distribution', status: 'In Review', period: 'Apr 2026', value: '45%' },
  { id: 3, name: 'User Performance', category: 'Operations', status: 'Complete', period: 'Q2 2026', value: '92%' },
  { id: 4, name: 'Engagement Metrics', category: 'Engagement', status: 'Draft', period: 'Apr 2026', value: '68%' },
  { id: 5, name: 'Trend Analysis', category: 'Forecast', status: 'Complete', period: 'Q2 2026', value: 'Strong' },
  { id: 6, name: 'Resource Utilization', category: 'Operations', status: 'In Review', period: 'Apr 2026', value: '74%' },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 80 },
  { field: 'name', headerName: 'Report Name', width: 240 },
  { field: 'category', headerName: 'Category', width: 150 },
  {
    field: 'status',
    headerName: 'Status',
    width: 140,
    renderCell: (params) => {
      const color = params.value === 'Complete' ? '#22c55e' : params.value === 'In Review' ? '#f59e0b' : '#38bdf8';
      return (
        <Chip
          label={params.value}
          sx={{
            background: `${color}20`,
            color,
            fontWeight: 700,
            borderRadius: '999px',
            px: 1.5,
          }}
        />
      );
    },
  },
  { field: 'period', headerName: 'Period', width: 130 },
  { field: 'value', headerName: 'Result', width: 130 },
];

const ReportsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredRows = useMemo(
    () =>
      reportRows.filter((row) => {
        const searchMatch = [row.name, row.category, row.status, row.period, row.value]
          .join(' ')
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        const categoryMatch = categoryFilter === 'All' || row.category === categoryFilter;
        const statusMatch = statusFilter === 'All' || row.status === statusFilter;
        return searchMatch && categoryMatch && statusMatch;
      }),
    [searchValue, categoryFilter, statusFilter]
  );

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=1000,height=800');
    if (!printWindow) return;

    const filteredSummary = filteredRows
      .map(
        (row) => `
          <tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.category}</td>
            <td class="status status-${row.status === 'Complete' ? 'complete' : row.status === 'In Review' ? 'review' : 'draft'}">${row.status}</td>
            <td>${row.period}</td>
            <td>${row.value}</td>
          </tr>`
      )
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Reports Summary</title>
          <style>
            @page { margin: 24px; }
            body {
              font-family: Inter, Arial, sans-serif;
              background: #020617;
              color: #f8fafc;
              margin: 0;
              padding: 24px;
            }
            .page-shell {
              min-height: 100vh;
              background: radial-gradient(circle at top center, rgba(250,204,21,0.16), transparent 42%),
                          linear-gradient(135deg, rgba(250,204,21,0.12) 1px, transparent 1px 20px),
                          linear-gradient(45deg, rgba(255,255,255,0.04) 1px, transparent 1px 80px);
              padding: 22px;
              border-radius: 30px;
              border: 1px solid rgba(250,204,21,0.18);
            }
            .hero {
              border: 2px solid rgba(250,204,21,0.28);
              border-radius: 26px;
              background: rgba(15,23,42,0.92);
              box-shadow: 0 0 0 1px rgba(250,204,21,0.12), 0 20px 60px rgba(0,0,0,0.32);
              padding: 24px;
              margin-bottom: 24px;
            }
            .hero h1 {
              margin: 0;
              font-size: 2.4rem;
              letter-spacing: 0.12em;
              color: #facc15;
              text-transform: uppercase;
              text-shadow: 0 0 20px rgba(250,204,21,0.24);
            }
            .hero p {
              margin: 10px 0 0;
              color: #cbd5e1;
              line-height: 1.75;
            }
            .hero::after {
              content: 'PENDRAGON';
              display: block;
              margin-top: 14px;
              font-size: 0.85rem;
              letter-spacing: 0.32em;
              color: rgba(250,204,21,0.52);
            }
            .summary-card {
              background: rgba(255,255,255,0.03);
              border: 1px solid rgba(250,204,21,0.16);
              border-radius: 20px;
              padding: 20px;
              margin-bottom: 20px;
            }
            .summary-card h2 {
              color: #facc15;
              margin-bottom: 10px;
              font-size: 1.05rem;
              text-transform: uppercase;
              letter-spacing: 0.18em;
            }
            .summary-card p {
              margin: 6px 0;
              color: #e2e8f0;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 18px;
              background: rgba(255,255,255,0.02);
            }
            th, td {
              padding: 14px 12px;
              border: 1px solid rgba(250,204,21,0.12);
              text-align: left;
            }
            th {
              background: #111827;
              color: #facc15;
              font-weight: 700;
            }
            td {
              background: #0b1220;
              color: #e2e8f0;
            }
            tr:nth-child(even) td {
              background: #08101f;
            }
            .status-complete { color: #22c55e; font-weight: 700; }
            .status-review { color: #f59e0b; font-weight: 700; }
            .status-draft { color: #38bdf8; font-weight: 700; }
            @media print {
              body { margin: 0; padding: 0; }
              .page-shell { border: none; box-shadow: none; background: none; border-radius: 0; padding: 0; }
              .hero, .summary-card { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="page-shell">
            <div class="hero">
              <h1>Reports Summary</h1>
              <p>Styled with the Pendragon gold & black palette for a bold print layout that matches the Beyblade X theme.</p>
            </div>
            <div class="summary-card">
              <h2>Report Overview</h2>
              <p><strong>Reports Available:</strong> ${filteredRows.length}</p>
              <p><strong>Complete:</strong> ${reportRows.filter((row) => row.status === 'Complete').length}</p>
              <p><strong>Under Review:</strong> ${reportRows.filter((row) => row.status === 'In Review').length}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Report Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Period</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                ${filteredSummary}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Box>
        <Typography variant="overline" sx={{ color: '#facc15', letterSpacing: '0.3em' }}>
          REPORTS
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 900, mt: 1 }}>
          Reports Summary
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>
          Generate and preview report output, apply quick filters, and print a formatted summary for distribution.
        </Typography>
      </Box>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ background: '#08101f', border: '1px solid rgba(250,204,21,0.16)', borderRadius: '2rem', p: 2 }}>
            <CardContent sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
              <TextField
                fullWidth
                label="Search reports"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                sx={{ background: '#020617', borderRadius: '16px' }}
                inputProps={{ style: { color: '#f8fafc' } }}
                InputLabelProps={{ style: { color: '#94a3b8' } }}
              />
              <FormControl sx={{ minWidth: 160, background: '#020617', borderRadius: '16px' }}>
                <InputLabel sx={{ color: '#94a3b8' }}>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  sx={{ color: '#f8fafc' }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Summary">Summary</MenuItem>
                  <MenuItem value="Distribution">Distribution</MenuItem>
                  <MenuItem value="Operations">Operations</MenuItem>
                  <MenuItem value="Engagement">Engagement</MenuItem>
                  <MenuItem value="Forecast">Forecast</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 160, background: '#020617', borderRadius: '16px' }}>
                <InputLabel sx={{ color: '#94a3b8' }}>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(event) => setStatusFilter(event.target.value)}
                  sx={{ color: '#f8fafc' }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Complete">Complete</MenuItem>
                  <MenuItem value="In Review">In Review</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
          <Button
            variant="contained"
            onClick={handlePrint}
            sx={{ backgroundColor: '#facc15', color: '#020617', fontWeight: 700, borderRadius: '999px', px: 4, py: 1.5 }}
          >
            Print Summary
          </Button>
        </Grid>
      </Grid>

      <Box>
        <Card sx={{ background: '#08101f', border: '1px solid rgba(250,204,21,0.16)', borderRadius: '2rem' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: '#f8fafc', mb: 2, fontWeight: 700 }}>
              Report Overview
            </Typography>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ background: '#020617', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.75rem' }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
                      Reports Available
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1, fontWeight: 900, color: '#f8fafc' }}>
                      {filteredRows.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ background: '#020617', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.75rem' }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
                      Complete
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1, fontWeight: 900, color: '#f8fafc' }}>
                      {reportRows.filter((row) => row.status === 'Complete').length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ background: '#020617', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.75rem' }}>
                  <CardContent>
                    <Typography variant="subtitle2" sx={{ color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
                      Under review
                    </Typography>
                    <Typography variant="h4" sx={{ mt: 1, fontWeight: 900, color: '#f8fafc' }}>
                      {reportRows.filter((row) => row.status === 'In Review').length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ height: 460, width: '100%', '& .MuiDataGrid-root': { border: 'none' } }}>
              <DataGrid
                rows={filteredRows}
                columns={columns}
                initialState={{ pagination: { paginationModel: { pageSize: 6 } } }}
                pageSizeOptions={[6]}
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
    </Box>
  );
};

export default ReportsPage;
