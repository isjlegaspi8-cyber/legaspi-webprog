const fetch = global.fetch;
const run = async () => {
  const base = 'http://localhost:8000/api/users';
  const createPayload = {
    firstName: 'Temp',
    lastName: 'Admin',
    age: '30',
    gender: 'Other',
    contactNumber: '09171234567',
    email: 'temp_admin_test@example.com',
    username: 'tempadmin',
    password: 'TestPass123!',
    role: 'Admin',
  };

  const loginPayload = {
    email: 'temp_admin_test@example.com',
    password: 'TestPass123!',
  };

  const createRes = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(createPayload),
  });
  console.log('CREATE', createRes.status);
  console.log(await createRes.text());

  const loginRes = await fetch(`${base}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  });
  console.log('LOGIN', loginRes.status);
  console.log(await loginRes.text());
};

run().catch((err) => {
  console.error('ERROR', err);
  process.exit(1);
});
