const { baseURL } = require('../playwright.config');
const { test, expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

    constructor(page) {
        this.page = page;
        this.username_text = page.locator("x");
        this.password_text = page.locator("x");
        this.login_button = page.locator("x");
        this.pagina_inicial = page.locator("x");
    }

    async login({username_text, password_text}) {
        const maxRetries = 3;
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                await this.page.goto('/');
                await this.username_text.type(username_text);
                await this.password_text.type(password_text);
                await this.login_button.click();

                await this.page.waitForTimeout(10000);

                await expect(this.pagina_inicial).toBeVisible();
                console.log('Login realizado com sucesso.');
                // Se chegou até aqui, deu certo
                return;
            } catch (error) {
                attempt++;
                if (this.page.isClosed()) {
                    console.error('Página fechada durante a tentativa de Login.');
                    throw new Error('Página fechada durante a tentativa de Login.');
                }
                if (attempt >= maxRetries) {
                    throw new Error(`login falhou após ${maxRetries} tentativas: ${error}`);
                }
                await this.page.waitForTimeout(1000);
            }
        }
    }

    async goToLoginPage() {
        await this.page.goto('/');
    }
 
}

