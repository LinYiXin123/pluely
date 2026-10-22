import { useTranslation } from "@/contexts";
import { Header, Button } from "@/components";
import { LANGUAGES } from "@/lib/i18n";

export const LanguageToggle = () => {
  const { language, setLanguage, t } = useTranslation();

  return (
    <div id="language" className="space-y-3">
      <Header
        title="Interface Language"
        description="Choose the language of menus, buttons and settings"
        isMainTitle
      />
      <div className="flex items-center gap-2">
        {LANGUAGES.map((lang) => (
          <Button
            key={lang.id}
            variant={language === lang.id ? "default" : "outline"}
            onClick={() => setLanguage(lang.id)}
          >
            {lang.name}
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground/70">
        {t(
          "AI responses keep their own language setting under Responses."
        )}
      </p>
    </div>
  );
};
