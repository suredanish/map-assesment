
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
function Map({data}) {
  return (
    <div>
    <ComposableMap>
      <Geographies geography="./features.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      {
        data.map( coordinates =>
            <Marker coordinates={coordinates}>
            <circle r={3} fill="#F53" />
          </Marker>
        )
        }
    </ComposableMap>
  </div>
  );
}

export default Map;