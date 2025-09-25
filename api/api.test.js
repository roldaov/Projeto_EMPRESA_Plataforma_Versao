const request = require('supertest');

let userName = `VictorV_${Date.now()}`;
let password = '@Test1234';
let userID;
let token;
let userResponse;

beforeAll(async () => {
  userResponse = await request('https://demoqa.com')
    .post('/Account/v1/User')
    .set('Content-Type', 'application/json')
    .send({
      userName: userName,
      password: password,
    });
});

describe('POST /Account/v1/User', () => {
  it('Deve validar usuário criado com sucesso, no beforeAll.', async () => {
    expect(userResponse.status).toBe(201);
    expect(userResponse.body.username).toBe(userName);
    expect(userResponse.body.userID).toBeDefined();
    userID = userResponse.body.userID; // Salva o userID para outros testes
  });
});

describe('POST /Account/v1/GenerateToken', () => {
  it('Deve gerar token com sucesso.', async () => {
    const response = await request('https://demoqa.com')
      .post('/Account/v1/GenerateToken')
      .set('Content-Type', 'application/json')
      .send({
        userName: userName,
        password: password,
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Success');
    expect(response.body.result).toBe('User authorized successfully.');
    expect(response.body.token).toBeDefined();
    token = response.body.token; // Salva o token para outros testes
  });
});

describe('POST /Account/v1/Authorized', () => {
  it('Deve retornar autorizado para usuário e senha válidos.', async () => {
    const response = await request('https://demoqa.com')
      .post('/Account/v1/Authorized')
      .set('Content-Type', 'application/json')
      .send({
        userName: userName,
        password: password,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(true); // A API retorna true no body se autorizado
  });
});

describe('GET /BookStore/v1/Books', () => {
  it('Deve listar os livros disponíveis.', async () => {
    const response = await request('https://demoqa.com')
      .get('/BookStore/v1/Books')
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.books).toBeDefined();
    expect(Array.isArray(response.body.books)).toBe(true);
    expect(response.body.books.length).toBeGreaterThan(0);
    expect(response.body.books[0]).toHaveProperty('title');
    expect(response.body.books[0]).toHaveProperty('author');
    expect(response.body.books[0]).toHaveProperty('isbn');
    expect(response.body.books[0]).toHaveProperty('publisher');
    expect(response.body.books[0]).toHaveProperty('pages');
    expect(response.body.books[0]).toHaveProperty('description');
    expect(response.body.books[0]).toHaveProperty('website');
  });
});

describe('POST /BookStore/v1/Books', () => {
  it('Deve alugar dois livros para o usuário criado.', async () => {
    const response = await request('https://demoqa.com')
      .post('/BookStore/v1/Books')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: userID,
        collectionOfIsbns: [
          { isbn: '9781449325862' },
          { isbn: '9781449331818' }
        ]
      });

    expect(response.status).toBe(201);
    expect(response.body.books).toBeDefined();
    expect(Array.isArray(response.body.books)).toBe(true);
    expect(response.body.books.length).toBe(2);
    expect(response.body.books[0]).toHaveProperty('isbn');
    expect(response.body.books[1]).toHaveProperty('isbn');
  });
});

describe('GET /Account/v1/User/{userID}', () => {
  it('Deve retornar os dados do usuário criado.', async () => {
    const response = await request('https://demoqa.com')
      .get(`/Account/v1/User/${userID}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.username).toBe(userName);
    expect(response.body.userId).toBe(userID);
    expect(response.body.books).toBeDefined();
    expect(Array.isArray(response.body.books)).toBe(true);  
    expect(response.body.books.length).toBe(2);
    expect(response.body.books[0]).toHaveProperty('isbn');
    expect(response.body.books[1]).toHaveProperty('isbn');
  });
});