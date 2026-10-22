import { STORAGE_KEYS } from "@/config/constants";
import moment from "moment";
import "moment/locale/zh-cn";
import { zh } from "./zh";

export type Language = "en" | "zh";

// Language used until the user picks one in App Settings
export const DEFAULT_LANGUAGE: Language = "zh";

export const LANGUAGES: { id: Language; name: string }[] = [
  { id: "en", name: "English" },
  { id: "zh", name: "中文" },
];

// English text is the key; other languages map it to a translation
const DICTIONARIES: Record<Language, Record<string, string>> = {
  en: {},
  zh,
};

export const getStoredLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return stored === "en" ? "en" : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
};

const MOMENT_LOCALES: Record<Language, string> = { en: "en", zh: "zh-cn" };

let currentLanguage: Language = getStoredLanguage();
moment.locale(MOMENT_LOCALES[currentLanguage]);

export const getLanguage = () => currentLanguage;

export const setCurrentLanguage = (language: Language) => {
  currentLanguage = language;
  moment.locale(MOMENT_LOCALES[language]);
};

/**
 * Translate English UI text into the current language.
 * The LanguageProvider remounts the app when the language changes,
 * so t() can be called anywhere during render without a hook.
 */
export const t = (text: string, vars?: Record<string, string | number>) =>
  translate(currentLanguage, text, vars);

/**
 * Translate English UI text into the given language.
 * Falls back to the English text when no translation exists.
 * Placeholders like {name} are filled from vars.
 */
export const translate = (
  language: Language,
  text: string,
  vars?: Record<string, string | number>
) => {
  let result = DICTIONARIES[language][text] ?? text;
  if (vars) {
    for (const [key, value] of Object.entries(vars)) {
      result = result.split(`{${key}}`).join(String(value));
    }
  }
  return result;
};
