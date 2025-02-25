import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from '../models/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private languages: Array<Language>;
  languageSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('pt-BR');

  constructor() {
    this.languages = [
      {
        icon: 'fi fi-br',
        name: 'Português (BR)',
        value: 'pt-BR',
      },
      {
        icon: 'fi fi-us',
        name: 'English (US)',
        value: 'en-US',
      },
      {
        icon: "fi fi-es",
        name: "Español (ES)",
        value: "es-ES"
      },
      {
        icon: "fi fi-fr",
        name: "Français (FR)",
        value: "fr-FR"
      }
    ];
  }

  public get getLanguages() : Array<Language> {
    return this.languages;
  }
  
  public get getLanguagesValue() : Array<string> {
    const filteredLanguages = new Array<string>;
    this.languages.forEach((lang) => {
      filteredLanguages.push(lang.value)
    });
    return filteredLanguages;
  }
  
}
