import { UserPreferences } from "../types";

interface PreferenceSectionProps {
  title: string;
  items: string[];
  preferencesKey: keyof UserPreferences;
  togglePreference: (key: keyof UserPreferences, value: string) => void;
  preferences: UserPreferences;
}

export const PreferenceSection = ({
  title,
  items,
  preferencesKey,
  togglePreference,
  preferences,
}: PreferenceSectionProps) => (
  <div className="w-full md:w-1/3">
    <h3 className="font-medium mb-3">{title}</h3>
    <div
      className={`space-y-2 ${
        preferencesKey === "authors" ? "max-h-52 overflow-y-auto" : ""
      }`}
    >
      {items.map((item) => (
        <label key={item} className="flex items-center">
          <input
            type="checkbox"
            checked={preferences[preferencesKey].includes(item)}
            onChange={() => togglePreference(preferencesKey, item)}
            className="rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2">{item}</span>
        </label>
      ))}
    </div>
  </div>
);
