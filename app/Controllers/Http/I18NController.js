"use strict";

const Antl = use("Antl");
const Formats = use("Antl/Formats");

const jsEn = require("../../../resources/locales/en/en.json");
const jsEs = require("../../../resources/locales/es/es.json");
const availableLanguages = {
  es: jsEs,
  en: jsEn,
};

class I18NController {
  async getLanguage({ params, request, response }) {
    //let message = Antl.formatMessage("messages.greeting");
    //let message = Antl.formatMessage('messages.test2');
    response.type("application/json");
    //const language = request.qs.lang;
    const language = params.lang;
    //let uax2 = Antl.formatRelative('messages');
    
    response.json(this.getLanguageByParams(language));
  }
  async getText({ params, request, response }) {
    //let message = Antl.formatMessage("messages.greeting");
    //let message = Antl.formatMessage('messages.test2');
    response.type("application/json");
    const {lang, txt} = params;
    let message = Antl.formatMessage("messages.greeting");
    
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
