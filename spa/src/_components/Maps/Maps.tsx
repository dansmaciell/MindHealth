import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { buscarUnidadesSaude } from "../services/demas.ts"; 

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: [-47.8825, -15.7942], 
      zoom: 11, 
    });

    map.on("load", () => setIsMapLoaded(true));
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;

        mapRef.current!.flyTo({
          center: [longitude, latitude],
          zoom: 13,
        });

        new mapboxgl.Marker({ color: "#00BFFF" })
          .setLngLat([longitude, latitude])
          .setPopup(
            new mapboxgl.Popup().setHTML(
              `<b>Você está aqui</b><br/>Precisão: ${Math.round(accuracy)}m`
            )
          )
          .addTo(mapRef.current!);
      },
      (err) => console.warn("Usuário negou localização ou erro:", err)
    );
  }, [isMapLoaded]);

  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    async function carregarUnidades() {
      try {
        console.log("Iniciando busca de unidades...");
        const response = await buscarUnidadesSaude();
        
        const unidades = response.data || response || []; 
        
        console.log("Unidades recebidas:", unidades.length);

        unidades.forEach((u: any) => {
          
          if (!u.latitude || !u.longitude || u.latitude === 0) {
              return; 
          }

          
          new mapboxgl.Marker({ color: "red" })
            .setLngLat([u.longitude, u.latitude]) 
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <div style="color: #333; font-family: sans-serif; padding: 5px;">
                    <h3 style="margin: 0 0 5px; font-size: 14px;">${u.nome}</h3>
                    <p style="margin: 0; font-size: 12px;">${u.endereco}</p>
                    ${u.telefone ? `<p style="margin: 5px 0 0; font-size: 11px;">📞 ${u.telefone}</p>` : ''}
                </div>
              `)
            )
            .addTo(mapRef.current!);
        });

      } catch (err) {
        console.error("Erro ao carregar pinos:", err);
      }
    }

    carregarUnidades();
  }, [isMapLoaded]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
