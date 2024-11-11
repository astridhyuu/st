//importa el webdriver de selenium
import { Builder } from 'selenium-webdriver'

export default class ConfigAutomaticTest {
  constructor() {}

  static async initConfig() {
    // se configura que debe esperar que se ejecute el navegador google chrome.
    return await new Builder().forBrowser('firefox').build()
  }
}
