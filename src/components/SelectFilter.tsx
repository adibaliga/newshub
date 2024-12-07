interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

export function SelectFilter({
  value,
  onChange,
  options,
  placeholder,
}: SelectFilterProps) {
  return (
    <select
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
