const { expect } = require('@playwright/test');
const { time } = require('console');

class DemoqaAdmFormsPage {
   
    constructor(page) {
        this.page = page;
		this.path = require('path');
    }

    async clicarMenuForms() {
	    const clicarMenuForms = this.page.locator("//div[@class='card mt-4 top-card'][contains(.,'Forms')]").first();
	    await clicarMenuForms.waitFor({ state: 'visible', timeout: 5000 });
	    return clicarMenuForms.click();
    }

    async clicarSubMenuPracticeForm() {
	    const clicarSubMenuPracticeForm = this.page.locator("//span[@class='text'][contains(.,'Practice Form')]").first();
	    await clicarSubMenuPracticeForm.waitFor({ state: 'visible', timeout: 5000 });
	    return clicarSubMenuPracticeForm.click();
    }

	async digitarName(name) {
	    const digitarName = this.page.locator("//input[contains(@placeholder,'First Name')]").first();
	    await digitarName.waitFor({ state: 'visible', timeout: 5000 });
	    return digitarName.type(name);
    }

	async digitarLastName(lastName) {
	    const digitarLastName = this.page.locator("//input[contains(@placeholder,'Last Name')]").first();
	    await digitarLastName.waitFor({ state: 'visible', timeout: 5000 });
	    return digitarLastName.type(lastName);
    }

	async digitarEmail(email) {
	    const digitarEmail = this.page.locator("//input[contains(@placeholder,'name@example.com')]").first();
	    await digitarEmail.waitFor({ state: 'visible', timeout: 5000 });
	    return digitarEmail.type(email);
    }

	async clicarGender(gender) {
	    const clicarGender = this.page.locator(`//label[contains(.,'${gender}')]`).first();
	    await clicarGender.waitFor({ state: 'visible', timeout: 5000 });
	    return clicarGender.click();
    }

	async digitarMobile(tel) {
	    const digitarMobile = this.page.locator("//input[@placeholder='Mobile Number']").first();
	    await digitarMobile.waitFor({ state: 'visible', timeout: 5000 });
	    return digitarMobile.type(tel);
    }

	async preencherDataNascimento(dataNasc) {
  		const preencherDataNascimento = this.page.locator('#dateOfBirthInput');
  		await preencherDataNascimento.waitFor({ state: 'visible', timeout: 5000 });
		return preencherDataNascimento.evaluate((el, value) => el.value = value, dataNasc);
	}

	async preencherSubjects(...subjects) {
  		const campoSubjects = this.page.locator('#subjectsInput');
  		await campoSubjects.waitFor({ state: 'visible', timeout: 5000 });
  		for (const subject of subjects) {
    	await campoSubjects.fill(subject);
    	await this.page.keyboard.press('Enter');
  		}
	}

	async clicarHobbies(hobbies) {
	    const clicarGender = this.page.locator(`//label[contains(.,'${hobbies}')]`).first();
	    await clicarGender.waitFor({ state: 'visible', timeout: 5000 });
	    return clicarGender.click();
    }

	async selecionarImagem(nomeArquivo) {
  		const inputImagem = this.page.locator('#uploadPicture');
  		await inputImagem.waitFor({ state: 'visible', timeout: 5000 });
 		const caminhoCompleto = this.path.resolve(__dirname, '../resources', nomeArquivo);
  		await inputImagem.setInputFiles(caminhoCompleto);
	}

	async digitarEnd(endereco) {
	    const digitarEnd = this.page.locator("//textarea[contains(@placeholder,'Current Address')]").first();
	    await digitarEnd.waitFor({ state: 'visible', timeout: 5000 });
	    return digitarEnd.type(endereco);
    }

	async selecionarEstadoECidade(estado, cidade) {
  		// Seleciona o campo de Estado
  		const campoEstado = this.page.locator('#state');
  		await campoEstado.click();
  		await this.page.locator(`div[id^='react-select-3-option']:has-text("${estado}")`).click();
  		// Seleciona o campo de Cidade
  		const campoCidade = this.page.locator('#city');
  		await campoCidade.click();
  		await this.page.locator(`div[id^='react-select-4-option']:has-text("${cidade}")`).click();
	}

	async clicarSubmit() {
	    const clicarSubmit = this.page.locator("//button[@type='submit'][contains(.,'Submit')]").first();
	    await clicarSubmit.waitFor({ state: 'visible', timeout: 5000 });
	    return clicarSubmit.click();
    }

    async validarMsgCadastroSucesso() {
	    const validarMsgCadastroSucesso = this.page.locator("//div[@class='modal-title h4'][contains(.,'Thanks for submitting the form')]").first();
	    await validarMsgCadastroSucesso.waitFor({ state: 'visible', timeout: 5000 });
	    return expect(validarMsgCadastroSucesso).toBeVisible();
    }

    async clicarClose() {
	    const clicarClose = this.page.locator("//button[@type='button'][contains(.,'Close')]").first();
	    await clicarClose.waitFor({ state: 'visible', timeout: 5000 });
		await clicarClose.scrollIntoViewIfNeeded();
		await this.page.waitForTimeout(500);
	    return clicarClose.click({ force: true });
    }

}

module.exports = { DemoqaAdmFormsPage };

