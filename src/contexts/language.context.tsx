import { createContext, useContext, useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/config/constants";
import {
  getStoredLanguage,
  Language,
  setCurrentLanguage,
  t,
} from "@/lib/i18n";

type LanguageProviderState = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: typeof t;
};

// Without a provider (e.g. the capture overlay window), use the saved language
const LanguageProviderContext = createContext<LanguageProviderState>({
  language: getStoredLanguage(),
  setLanguage: () => null,
  t,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  // Update the module-level language before children render
  setCurrentLanguage(language);

  // Keep all windows (overlay + dashboard) in sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.LANGUAGE) {
        setLanguageState(getStoredLanguage());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  const value = {
    language,
    setLanguage: (newLanguage: Language) => {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, newLanguage);
      setLanguageState(newLanguage);
    },
    t,
  };

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

/**
 * Remounts its children when the language changes, so every t() call
 * picks up the new language. Wrap the UI only, not the data providers.
 */
export const LanguageBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { language } = useContext(LanguageProviderContext);
  return (
    <div key={language} className="contents">
      {children}
    </div>
  );
};

export const useTranslation = () => useContext(LanguageProviderContext);
