export class Settings {
  static #workSettingApi: string = '';
  private static lsKey = 'baseApiUrl';

  static get workSettingApi(): string {
    if (!Settings.#workSettingApi) {
      Settings.#workSettingApi =
        localStorage.getItem(Settings.lsKey) || 'https://localhost:5001';
    }
    return Settings.#workSettingApi;
  }

  static set workSettingApi(value: string) {
    localStorage.setItem(Settings.lsKey, value);
    Settings.#workSettingApi = value;
  }
}
