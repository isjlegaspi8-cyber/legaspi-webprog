import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

const players = [
  { name: 'Chrome Ryugu', role: 'Ace Striker', status: 'Online' },
  { name: 'Shiguru Nanairo', role: 'Tactical Master', status: 'Ready' },
  { name: 'Jaxon Cross', role: 'Legendary Captain', status: 'Active' },
  { name: 'Nova Kaito', role: 'Blitz Support', status: 'Standby' },
];

const UsersPage = () => {
  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      <Box>
        <Typography variant="overline" sx={{ color: '#facc15', letterSpacing: '0.3em' }}>
          USER ROSTER
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 900, mt: 1 }}>
          Elite Team Members
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 680 }}>
          A quick view of the active roster, roles, and readiness status for Team Pendragon.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {players.map((player) => (
          <Grid item xs={12} sm={6} md={3} key={player.name}>
            <Card sx={{ background: '#08101f', border: '1px solid rgba(250,204,21,0.16)', borderRadius: '2rem' }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: '#94a3b8', letterSpacing: '0.25em' }}>
                  {player.role.toUpperCase()}
                </Typography>
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 800, color: '#f8fafc' }}>
                  {player.name}
                </Typography>
                <Chip
                  label={player.status}
                  sx={{ mt: 2, background: 'rgba(250,204,21,0.15)', color: '#facc15', fontWeight: 700, borderRadius: '999px' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ background: '#08101f', border: '1px solid rgba(250,204,21,0.16)', borderRadius: '2rem', p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 800 }}>
          Player Pulse
        </Typography>
        <Typography color="text.secondary">
          All Team Pendragon members are tuned to the Beyblade X system, ready for rank battles, strategy sessions, and arena control.
        </Typography>
      </Card>
    </Box>
  );
};

export default UsersPage;
