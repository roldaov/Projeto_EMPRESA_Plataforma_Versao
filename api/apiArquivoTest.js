const request = require('supertest');

(async () => {
  const userName = `VictorV_${Date.now()}`;
  const password = '@Test1234';
  let userID;
  let token;

  console.log("Iniciando Testes:");
  
  console.log("-------------------");

  console.log("Criação de Usuário:");
  // Cria o usuário antes de gerar o token
  const createUserResponse = await request('https://demoqa.com')
    .post('/Account/v1/User')
    .set('Content-Type', 'application/json')
    .send({
      userName: userName,
      password: password,
    });

  console.log('Resposta da criação de usuário:', createUserResponse.body);

  if (createUserResponse.status !== 201) {
    console.error('Falha ao criar usuário:', createUserResponse.body);
    process.exit(1);
  }

  userID = createUserResponse.body.userID; // Salva o userID

  console.log("-------------------");

  console.log("Gerando Token:");
  // Gera o token
  const response = await request('https://demoqa.com')
    .post('/Account/v1/GenerateToken')
    .set('Content-Type', 'application/json')
    .send({
      userName: userName,
      password: password,
    });

  console.log('Resposta da geração de token:', response.body);

  if (response.status === 200 && response.body.token) {
    token = response.body.token; // Salva o token
    console.log('Token gerado com sucesso:', token);
  } else {
    console.error('Falha ao gerar token:', response.body);
    process.exit(1);
  }

  console.log("-------------------");

  console.log("Listando Livros:");
  // Lista os livros
  const responseBook = await request('https://demoqa.com')
    .get('/BookStore/v1/Books')
    .set('Content-Type', 'application/json');

  console.log('Status:', responseBook.status);
  console.log('Resposta completa:', responseBook.body);

  if (responseBook.status === 200 && responseBook.body.books && Array.isArray(responseBook.body.books)) {
    console.log('Quantidade de livros:', responseBook.body.books.length);
    if (responseBook.body.books.length > 0) {
      console.log('Primeiro livro:', responseBook.body.books[0]);
    }
  } else {
    console.error('Erro ao listar livros:', responseBook.body);
  }

  console.log("-------------------");

  console.log("Alugando Livros:");
  // Aluga dois livros para o usuário criado
  const responseAlugarLivros = await request('https://demoqa.com')
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

  console.log('Status do aluguel de livros:', responseAlugarLivros.status);
  console.log('Resposta do aluguel de livros:', responseAlugarLivros.body);

  if (responseAlugarLivros.status === 201) {
    console.log('Livros alugados com sucesso!');
  } else {
    console.error('Erro ao alugar livros:', responseAlugarLivros.body);
  }

  console.log("-------------------");

  console.log("Buscar Usuário:");
  // Busca o usuário pelo ID
  const responseUserId = await request('https://demoqa.com')
    .get(`/Account/v1/User/${userID}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json');

  console.log('Status:', responseUserId.status);
  console.log('Resposta completa:', responseUserId.body);

  if (responseUserId.status === 200) {
    console.log('Usuário encontrado:', responseUserId.body.username);
    console.log('Livros:', responseUserId.body.books);
  } else {
    console.error('Erro ao buscar usuário:', responseUserId.body);
  }

  console.log("-------------------");
  
  console.log("FIM DO TESTE.");

})();