"use strict";

const Antl = use("Antl");
const Formats = use("Antl/Formats");

const enLanguageJson = require("../../../resources/locales/en/enLanguage.json");
const esLanguageJson = require("../../../resources/locales/es/esLanguage.json");
const availableLanguages = {
  es: esLanguageJson,
  en: enLanguageJson,
};

class I18NController {
  async getLanguage({ params, request, response }) {
    const language = params.lang;
    if (!params.lang) {
      response.status(400).send("Language Bad Request missing param language");
    }
    const message = this.getLanguageByParams(language);
    if (!message) {
      response.status(204).send("Language ket or language not found");
    }
    response.json(message);
  }

  async getText({ params, request, response }) {
    response.type("application/json");
    const { langUsed, txtSearched } = params;
    if (!langUsed || !txtSearched) {
      response.status(400).send("Language Bad Request missing param language");
    }
    var search = `${langUsed}Language.${txtSearched}`;
    try {
      var message = Antl.forLocale(langUsed).formatMessage(search);
    } catch (error) {
      response.status(204).send("Language ket or language not found");
    }

    response.json(message);
  }

  /**
   *
   * @param {string} selectedLanguage
   * @returns JSON Language
   */
  getLanguageByParams(selectedLanguage) {
    return availableLanguages[selectedLanguage];
  }
}

module.exports = I18NController;
