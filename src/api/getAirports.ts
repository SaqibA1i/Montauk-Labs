import { Airport } from "../components/AirportDistanceCalculator/types";

const getUSAirports = async (name: string): Promise<Airport[]> => {
  const resultIfNameSearched = await fetch(
    "https://api.api-ninjas.com/v1/airports?country=US&name=" + name,
    {
      headers: {
        "X-Api-Key": process.env.REACT_APP_API_KEY!,
      },
    }
  );
  return resultIfNameSearched.json();
};

export default getUSAirports;
