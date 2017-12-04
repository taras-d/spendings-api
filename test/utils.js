
let testUserNum = 1;

const createTestUser = async api => {
  const data = {
    firstName: `Test ${testUserNum}`, lastName: `Test ${testUserNum}`,
    email: `test${testUserNum}@mail.com`, password: 'abc123'
  };

  await api.post('users', data);

  const loginRes = await api.post('authentication', {
    strategy: 'local', email: data.email, password: data.password
  });

  ++testUserNum;

  return loginRes.data;
};

module.exports = { createTestUser };