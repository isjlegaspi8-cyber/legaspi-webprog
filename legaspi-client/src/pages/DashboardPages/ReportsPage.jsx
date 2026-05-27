import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { BarChart } from '@mui/x-charts/BarChart';

const ReportsPage = () => {
  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Box>
        <Typography variant="overline" sx={{ color: '#facc15', letterSpacing: '0.3em' }}>
          REPORTS
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 900, mt: 1 }}>
          Arena Insights
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>
          Track mission health, engagement, and victory distribution across the Team Pendragon roster.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ background: '#08101f', border: '1px solid rgba(250,204,21,0.16)', borderRadius: '2rem' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
                Monthly Wins
              </Typography>
              <BarChart
                series={[
                  { data: [12, 16, 14, 22, 19], label: 'Victories' },
                  { data: [4, 5, 7, 3, 6], label: 'Challenges' },
                ]}
                height={300}
                xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], scaleType: 'band' }]}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ background: '#08101f', border: '1px solid rgba(250,204,21,0.16)', borderRadius: '2rem' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 800 }}>
                Key Deliverables
              </Typography>
              {[
                'Mission analytics updated daily',
                'Loadout and team efficiency at 92%',
                'Battle heatmap available to commanders',
              ].map((text) => (
                <Chip
                  key={text}
                  label={text}
                  color="secondary"
                  sx={{
                    mb: 1,
                    background: 'rgba(192,132,252,0.12)',
                    color: '#e0d7ff',
                    borderRadius: '999px',
                    fontWeight: 700,
                  }}
                  fullWidth
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ background: '#08101f', border: '1px solid rgba(250,204,21,0.16)', borderRadius: '2rem', p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
          Tactical Summary
        </Typography>
        <Typography color="text.secondary">
          The Team Pendragon dashboard is now built to surface the same elite Beyblade X energy as the landing pages. Use the nav to drill into user metrics and live reports.
        </Typography>
      </Card>
    </Box>
  );
};

export default ReportsPage;
