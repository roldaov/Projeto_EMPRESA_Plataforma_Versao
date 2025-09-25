class Screenshot {
  
    constructor(page) {
      this.page = page;
    }
  
    async takeScreenshot(nome) {
      await this.page.screenshot({ path: `${nome}.png` });
    }

  }
  
  module.exports = { Screenshot };