import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150, editable: true },
  { field: 'lastName', headerName: 'Last name', width: 150, editable: true },
  { field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 180,
    valueGetter: (params) => `${params?.row?.firstName || ''} ${params?.row?.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: 'Melisandre', age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const statCards = [
  { title: 'Total Users', value: rows.length, subtitle: 'Active accounts' },
  {
    title: 'Average Age',
    value: (rows.reduce((sum, row) => sum + (row.age || 0), 0) / rows.filter((row) => row.age !== null).length).toFixed(1),
    subtitle: 'Demographic age',
  },
  { title: 'Open Tickets', value: 58, subtitle: 'Live issues' },
  { title: 'Response Time', value: '02:14', subtitle: 'Avg resolution' },
];

const barData = {
  series: [
    { data: [45, 65, 52, 78], label: 'Visits' },
    { data: [28, 34, 44, 61], label: 'Conversions' },
  ],
  categories: ['Jan', 'Feb', 'Mar', 'Apr'],
};

const pieData = [
  { id: 0, value: 38, label: 'Retention' },
  { id: 1, value: 27, label: 'Acquisition' },
  { id: 2, value: 20, label: 'Engagement' },
  { id: 3, value: 15, label: 'Operations' },
];

const DashboardPage = () => {
  return (
    <Box sx={{ color: '#f8fafc' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, letterSpacing: '0.05em' }}>
        Pendragon Analytics
      </Typography>
      <Typography variant="body1" sx={{ color: '#cbd5e1', mb: 4 }}>
        Real-time command center for users, trends, and operational health.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statCards.map((card) => (
          <Grid key={card.title} item xs={12} sm={6} md={3}>
            <Card sx={{ background: '#0b1222', border: '1px solid rgba(251,191,36,0.16)', borderRadius: '1.5rem' }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: '#fbbf24', mb: 1, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  {card.title}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  {card.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ background: '#0b1222', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.75rem' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#f8fafc', mb: 2, fontWeight: 700 }}>
                Monthly performance
              </Typography>
              <BarChart
                series={barData.series}
                xAxis={[{ data: barData.categories, scaleType: 'band', label: 'Month' }]}
                height={320}
                padding={{ left: 60, top: 24, right: 32, bottom: 48 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ background: '#0b1222', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.75rem' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#f8fafc', mb: 2, fontWeight: 700 }}>
                Traffic distribution
              </Typography>
              <PieChart series={[{ data: pieData }]} width={320} height={260} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ background: '#0b1222', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.75rem' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#f8fafc', mb: 2, fontWeight: 700 }}>
                User directory snapshot
              </Typography>
              <Box sx={{ height: 420, width: '100%', '& .MuiDataGrid-root': { border: 'none' } }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                  pageSizeOptions={[5]}
                  checkboxSelection
                  disableRowSelectionOnClick
                  sx={{
                    color: '#f8fafc',
                    '.MuiDataGrid-cell': { borderBottom: '1px solid rgba(148,163,184,0.12)' },
                    '.MuiDataGrid-columnHeaders': { background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.08)' },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ background: '#0b1222', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.75rem' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#f8fafc', mb: 2, fontWeight: 700 }}>
                Metro Manila command zone
              </Typography>
              <Box sx={{ height: 420, borderRadius: '1.5rem', overflow: 'hidden' }}>
                <MapContainer center={[14.6091, 121.0223]} zoom={13} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[14.6091, 121.0223]}>
                    <Popup>
                      National University - Manila <br />
                      M.F. Jhocson St, Sampaloc, Manila, 1008 Metro Manila, Philippines
                    </Popup>
                  </Marker>
                </MapContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
