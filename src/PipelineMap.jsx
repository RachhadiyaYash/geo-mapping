import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Tooltip,
} from "react-leaflet";

import { customIcon, SubzoneEndIcon, zoneEndIcon } from "./Icon";
import "leaflet/dist/leaflet.css";

const PipelineMap = ({ mainline, zoneline, subzoneline }) => {
  const [mapView, setMapView] = useState("street");

  const gujaratBounds = [
    [20.0, 68.0],
    [24.7, 74.3],
  ];

  const renderPipelineLine = (line, lineColor) => (
    <Polyline
      positions={line.coordinates.map((coord) => [coord.lat, coord.lng])}
      color={lineColor}
    >
      <Tooltip>{line.line_name || "Pipeline"}</Tooltip>
    </Polyline>
  );

  return (
    <div className="container mx-auto my-5 border p-5 border-black">
      {/* Toggle Button */}
      <div className="mb-3">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() =>
            setMapView((prevView) =>
              prevView === "street" ? "satellite" : "street"
            )
          }
        >
          Switch to {mapView === "street" ? "Satellite" : "Street"} View
        </button>
      </div>

      <MapContainer
        center={[22.2587, 71.1924]}
        zoom={8}
        style={{ height: "100vh", width: "100%" }}
        maxBounds={gujaratBounds}
        maxBoundsViscosity={1.0}
      >
        {mapView === "street" ? (
          <TileLayer
            key={mapView === "street" ? "street" : "satellite"}
            url={
              mapView === "street"
                ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                : "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            }
            attribution={
              mapView === "street"
                ? '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                : '&copy; <a href="https://www.esri.com/en-us/home">Esri</a>'
            }
          />
        ) : (
          <TileLayer
            key="satellite"
            url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}"
            attribution='&copy; CNES, Distribution Airbus DS, &copy; Airbus DS, &copy; PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            ext="jpg"
            maxZoom={20}
          />
        )}

        {mainline && (
          <>
            {renderPipelineLine(
              mainline,
              mainline.isActive ? "green" : mainline.line_color
            )}
            {mainline.coordinates.length > 0 && (
              <Marker
                position={[
                  mainline.coordinates[mainline.coordinates.length - 1].lat,
                  mainline.coordinates[mainline.coordinates.length - 1].lng,
                ]}
                icon={customIcon("red")}
              />
            )}
          </>
        )}

        {zoneline &&
          zoneline.map((zone, index) => (
            <React.Fragment key={index}>
              {renderPipelineLine(
                zone,
                zone.isActive ? "green" : zone.line_color
              )}

              {zone.coordinates.length > 0 && (
                <Marker
                  position={[
                    zone.coordinates[zone.coordinates.length - 1].lat,
                    zone.coordinates[zone.coordinates.length - 1].lng,
                  ]}
                  icon={zoneEndIcon()}
                />
              )}
            </React.Fragment>
          ))}

        {subzoneline &&
          subzoneline.map((subzone, index) => (
            <React.Fragment key={index}>
              {renderPipelineLine(
                subzone,
                subzone.isActive ? "green" : subzone.line_color
              )}
              <Marker
                position={[
                  subzone.coordinates[subzone.coordinates.length - 1].lat,
                  subzone.coordinates[subzone.coordinates.length - 1].lng,
                ]}
                icon={SubzoneEndIcon()}
              />
            </React.Fragment>
          ))}
      </MapContainer>
    </div>
  );
};

export default PipelineMap;
