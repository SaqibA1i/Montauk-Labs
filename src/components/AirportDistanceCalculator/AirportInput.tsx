import { Autocomplete, debounce, Input, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Airport } from "./types";
import getUSAirports from "../../api/getAirports";

type Props = {
  placeholder: string;
  onSelect: (airport: Airport) => void;
};
const AirportInput = ({ placeholder, onSelect }: Props) => {
  const [options, setOptions] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(false);

  const search = (value: string) => {
    setLoading(true);
    getUSAirports(value).then((data) => {
      console.log(value, data);
      setOptions(data);
      setLoading(false);
    });
  };

  const debouncedResults = useMemo(() => {
    return debounce(search, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.clear();
    };
  });

  return (
    <Autocomplete
      options={options}
      id="clear-on-escape"
      fullWidth
      getOptionLabel={(option) => option.icao + " - " + option.name}
      groupBy={(option) => option.region}
      clearOnEscape
      onChange={(event, value) => {
        onSelect(value!);
      }}
      onInputChange={(_event, value) => {
        debouncedResults(value);
      }}
      loading={loading}
      loadingText="Loading..."
      noOptionsText={"Start typing to search"}
      renderInput={(params) => (
        <TextField {...params} label={placeholder} variant="standard" />
      )}
    />
  );
};

export default AirportInput;
