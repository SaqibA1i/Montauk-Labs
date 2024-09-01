import { Button, Input, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AirportInput from "./AirportInput";
import { Airport } from "./types";
import haversine from "haversine-distance";

const AirportDistanceCalculator = () => {
  const [airport1, setAirport1] = useState<Airport | null>(null);
  const [airport2, setAirport2] = useState<Airport | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    setDistance(null);
  }, [airport1, airport2]);

  const calculateDistance = async () => {
    const distance =
      haversine(
        {
          latitude: Number(airport1?.latitude),
          longitude: Number(airport1?.longitude),
        },
        {
          latitude: Number(airport2?.latitude),
          longitude: Number(airport2?.longitude),
        }
      ) / 1000;
    setDistance(distance);
  };
  return (
    <Stack
      direction="column"
      spacing={5}
      maxWidth="500px"
      margin="0 auto"
      paddingTop="100px"
    >
      <h1>Haversine Airport Distance Calculator</h1>
      <Stack direction="row" spacing={2}>
        <AirportInput placeholder="Airport 1" onSelect={setAirport1} />
        <AirportInput placeholder="Airport 2" onSelect={setAirport2} />
      </Stack>
      <Button
        variant="contained"
        disabled={!airport1 || !airport2}
        onClick={calculateDistance}
      >
        Calculate
      </Button>
      {distance && (
        <p>
          Distance from <b>{airport1?.name}</b> to <b>{airport2?.name}</b> is{" "}
          <b>{Math.floor(distance)} km</b>
        </p>
      )}
    </Stack>
  );
};

export default AirportDistanceCalculator;
