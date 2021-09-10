import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '300px'
};
const center = {
  lat: 33.6348792,
  lng: -117.7426695
};
const options = {
  disableDefaultUI: true,
  zoomControl: true
};

const mapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: mapsApiKey,
    libraries
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    setMarker({ lat, lng });
  }, []);

  const [marker, setMarker] = useState(null);

  if (loadError) {
    return 'Error loading maps';
  }
  if (!isLoaded) {
    return 'Loading Maps';
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        <Search panTo={panTo} />
        <Marker position={marker} />
      </GoogleMap>
    </div>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 33.6348792, lng: () => -117.7426695 },
      radius: 200 * 1000
    }
  });

  return (
    <div className="search justify-center">
      <Combobox
        onSelect={async address => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            return ('error!');
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === 'OK' &&
              data.map(({ reference, description }) => (
                <ComboboxOption key={reference} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
