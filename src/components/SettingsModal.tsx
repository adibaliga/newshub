import { X } from "lucide-react";
import { UserPreferences } from "../types";
import { categories, sources } from "../constants";
import { PreferenceSection } from "./PreferenceSection";

interface SettingsModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly preferences: UserPreferences;
  readonly onSavePreferences: (preferences: UserPreferences) => void;
  readonly authors: string[];
}

export function SettingsModal({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
  authors,
}: SettingsModalProps) {
  if (!isOpen) return null;

  const togglePreference = (key: keyof UserPreferences, value: string) => {
    const currentValues = preferences[key];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    onSavePreferences({ ...preferences, [key]: newValues });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl p-4 md:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Personalize Your Feed</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <PreferenceSection
            title="Preferred Sources"
            items={Object.values(sources)}
            preferencesKey="sources"
            togglePreference={togglePreference}
            preferences={preferences}
          />
          <PreferenceSection
            title="Preferred Categories"
            items={categories}
            preferencesKey="categories"
            togglePreference={togglePreference}
            preferences={preferences}
          />
          <PreferenceSection
            title="Preferred Authors"
            items={authors}
            preferencesKey="authors"
            togglePreference={togglePreference}
            preferences={preferences}
          />
        </div>
      </div>
    </div>
  );
}
