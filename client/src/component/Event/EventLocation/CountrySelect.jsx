import Select from "react-select";

const CountrySelect = ({ countries, onChange }) => {
  const options = countries.map((c) => ({
    value: c.code,
    label: c.name,
  }));

  return (
    <Select
      options={options}
      onChange={(selected) => onChange(selected)}
      placeholder="Select a country..."
      isSearchable
    />
  );
};

export default CountrySelect;
