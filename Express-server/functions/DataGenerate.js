import { fakerRU, faker } from '@faker-js/faker';
var language;

class functionDataGenerate {

  choiceLanguage(lang) {
    switch (lang) {
      case "en":
        language = faker;
        break;
      case "ru":
        language = fakerRU;
        break;
      default:
        language = faker;
        break;
    }
  }

  numberBigInt() {return language.string.uuid();}
  internetEmail() {return language.internet.email();}
  locationCountry() {return language.location.country();} 
}

export default functionDataGenerate;