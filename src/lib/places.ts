import { Client } from "@googlemaps/google-maps-services-js";

// TODO: use custom dataset vector db instead of google places
export const getPlaces = async (location: string) => {
  const client = new Client({});
  const result = await client.textSearch({
    params: {
      query: location,
      key: process.env.PLACES_API_KEY!,
      location: { lat: 29.643946, lng: -82.355659 }, // search near University of Florida, Gainesville
    },
  });

  return result.data.results.map((r) => {
    return {
      name: r.name,
      address: r.formatted_address,
      location: r.geometry?.location,
    };
  });
};
