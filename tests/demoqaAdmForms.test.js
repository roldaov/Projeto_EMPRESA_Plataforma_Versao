const { test, expect } = require('@playwright/test');
const { DemoqaAdmFormsPage } = require('../pages/demoqaAdmFormsPage');
const { LoginPage } = require('../pages/loginPage');

test('Practice Form', async ({ page }) => {
    test.setTimeout(120000);
    const demoqaAdmFormsPage = new DemoqaAdmFormsPage(page);
    const loginPage = new LoginPage(page);
    const randomEmail = `user_${Date.now()}@mail.com`; // Gera um e-mail randômico
    const nomeArquivo = 'test.txt'; // Nome do arquivo a ser carregado

    console.log('Acessando a página de Login...');
    await loginPage.goToLoginPage();
    await page.waitForTimeout(5000);
    console.log('Verificando conexão...');
    await page.waitForLoadState('load');
    console.log('Conexão aparentemente estável.');
    await page.waitForTimeout(5000);

    console.log('Student Registration Form...');
    await demoqaAdmFormsPage.clicarMenuForms();
    await demoqaAdmFormsPage.clicarSubMenuPracticeForm();
    await demoqaAdmFormsPage.digitarName('Victor');
    await demoqaAdmFormsPage.digitarLastName('Valente');
    await demoqaAdmFormsPage.digitarEmail(randomEmail);
    await demoqaAdmFormsPage.clicarGender('Male');
    await demoqaAdmFormsPage.digitarMobile('11999999999');
    await page.waitForTimeout(5000);
    await demoqaAdmFormsPage.preencherDataNascimento('13 Jun 1992');
    await page.waitForTimeout(10000);
    await demoqaAdmFormsPage.preencherSubjects('Maths', 'Physics', 'Computer Science');
    await demoqaAdmFormsPage.clicarHobbies('Sports');
    await page.waitForTimeout(5000);
    await demoqaAdmFormsPage.selecionarImagem(nomeArquivo);
    await page.waitForTimeout(5000);
    await demoqaAdmFormsPage.digitarEnd('Rua Exemplo, 123, Bairro, Cidade, País');
    await demoqaAdmFormsPage.selecionarEstadoECidade('NCR', 'Delhi');
    await demoqaAdmFormsPage.clicarSubmit();
    await demoqaAdmFormsPage.validarMsgCadastroSucesso();
    await page.waitForTimeout(5000);
    await demoqaAdmFormsPage.clicarClose();
    await page.close();

});