import mapboxgl from "mapbox-gl";

export async function geocodificarEndereco(endereco: string) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    endereco
  )}.json?access_token=${mapboxgl.accessToken}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data.features || data.features.length === 0) return null;

  return data.features[0].center; // [lng, lat]
}
