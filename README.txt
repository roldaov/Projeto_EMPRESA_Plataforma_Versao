-----------------

Instalações:

1. Instalar VS Code Atualizado;
2. Clonar o projeto, abrir via VS code;
3. Pela IDE em Extensions, instalar MCP (Model Context Protocol) github copilot, instalar MCP (Model Context Protocol) github copilot chat e realizar login, em search acima na IDE, instalar Biblioteca playwright test for vscode "checando" a instalação do framework node.js, todos atualizados;
4. Instalar na máquina a versão mais atualizada do node.js;
5. Comandos para executar, apenas uma vez, em cada projeto/pasta, npm install e npx playwright install e npm install jest supertest;
6. Verifique o script de teste no "package.json", se não existir, adicione ou ajuste para garantir que o comando "npm test" execute o Jest;
"scripts": {
  "test": "jest"
}
7. Nome do arquivo de execução, SEMPRE utilizar, exemplo "api.test.js", para o Jest reconhecer automaticamente, para testes API backend e para testes WEB frontend;
8. Depois de tudo instalado, se for criar um novo projeto/pasta, usar o comando, npm init playwright@latest, dentro desse projeto/pasta.

-----------------

Comandos:

Comandos para instalar o projeto local (Node.JS e Playwright e Outra Biblioteca):
npm install
npx playwright install
npm install jest supertest

Comandos para abrir a interface do Playwright (Testes FrontEnd):
npx playwright test NomeDoArquivo.test.js --ui (Executar todos os testes do arquivo "NomeDoArquivo.test.js", com a interface do passo a passo)
npx playwright test NomeDoContainer --ui (Executar todos os arquivos do container "NomeDoContainer", com a interface do passo a passo)
 
Comandos para executar testes (Testes FrontEnd) (O primeiro executa todos testes do arquivo sem interface, Segundo apenas o teste específico do arquivo sem interface, Terceiro executa testes tipo @ sem interface):
npx playwright test NomeDoArquivo.test.js
npx playwright test -g "Exemplo Aprovar boleta simples"
npx playwright test --grep "@MVP"

Comandos para executar testes em API (Testes BackEnd):
npm test (Executa todos os testes, funcionalidades/cenários, com a extensão ".test.js")
npm test -- api/api.test.js (Executa todos os testes, funcionalidades/cenários, do container/arquivo específico, com a extensão ".test.js")
node api/apiArquivoTest.js (Executa todos os testes, funcionalidades/cenários, do container/arquivo específico, sem a extensão ".test.js").

-----------------

Código relevante exemplos:

INÍCIO TELA
const { expect } = require('@playwright/test');
const { time } = require('console');

class Exemplo {
    constructor(page) {
        this.page = page;
    }

USAR XPATH EM TODOS NA TELA
    async clicarEmAlgo() {
	const clicarEmAlgo = this.page.locator(".select__option").first();
	await clicarEmAlgo.waitFor({ state: 'visible', timeout: 5000 });
	return clicarEmAlgo.click();
    }

    async validarAlgo() {
	const validarAlgo = this.page.locator(".select__option").first();
	await validarAlgo.waitFor({ state: 'visible', timeout: 5000 });
	return expect(validarAlgo).toBeVisible();
    }

    async digitarOuSelecionar(parametro) {
	const digitarOuSelecionar = this.page.locator("horaFim-Input").first();
	await digitarOuSelecionar.waitFor({ state: 'visible', timeout: 5000 });
	return digitarOuSelecionar.type(parametro);
    }

TIME NA TELA
	await this.page.waitForTimeout(5000);

FINAL NA TELA
} (fecha a classe)

module.exports = { Exemplo }; ("exportar a classe")

--

INICIANDO TESTES EXEMPLOS
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { RFQPage } = require('../pages/rfqPage');

// Usuários de teste
const usuario1 = {
    codEmpresa: '1582',
    username_text: 'externo.stevao+1@abc.com.br',
    password_text: 'Teste@00',
    accessKey: '111222'
};
const usuario2 = {
    codEmpresa: '1583',
    username_text: 'externo.stevao+2@abc.com.br',
    password_text: 'Teste@00',
    accessKey: '111222'
};

test('Nome do Teste', async ({ page }) => {
    test.setTimeout(240000);
    const login = new LoginPage(page);
    const rfq = new RFQPage(page);

    console.log('Iniciando login...');
    // Login com usuario1
    await login.beforeLogin(usuario1);

    await page.waitForSelector('[data-testid="loading"]', { state: 'hidden' });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(5000);

    console.log('Iniciando testes...');
    await rfq.clicarPrimeiroEscolherCotacao();
    await rfq.ValidarPosiçãoCompra();
    await rfq.selecionarCarimbo('EN');
    await rfq.inserirOutroFaturamento('4');
    await page.close();

});

-----------------

Informações:

TODOS da biblioteca Playwright
page = classe
expect = classe
locator = método
type = método
fill = método
click = método
press = método
toBeVisible = método

Inserir = type ou fill
Selecionar = type ou fill
Clicar = click ou press
Validar = expect e toBeVisible.

-----------------

Informações:

Rodando via pipeline ou IDE local:
Através do arquivo playwright.config.js (informações parametrizadas), irá sempre apresentar log/relatório, vídeo/print apenas se falhar, timeout máximo, mas se o elemento for apresentado antes, vai executar normalmente, headless true ou false, tamanho da página, e navegadores.
Se tiver no código, informações de log (console.log('Sucesso'); ou console.error('Falha');) irá apresentar no terminal, se tiver informações de print específico (Chamar o container "utils" > arquivo "screenshotUtils.js"), irá apresentar a imagem na pasta do projeto e
outros "times" no código, utilizando, "test.setTimeout(120000);" (timeout máximo do test), "await page.waitForTimeout(5000);" (pausa antes de executar o próximo), "timeout: 5000" (timeout máximo do método).

-----------------
