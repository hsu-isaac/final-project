import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

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
import '@reach/combobox/styles.css';

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

export default function Map({ onSearch, address }) {

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng, address }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    setMarker({ lat, lng });
    onSearch({ lat, lng, address });
  }, []);

  const [marker, setMarker] = useState(null);
  useEffect(() => {
    if (!address) {
      setMarker(null);
    }
  }, [address]);

  return (
    <div style={{ borderRadius: '5px', overflow: 'hidden' }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        <Search panTo={panTo} address={address} />
        <Marker position={marker} />
      </GoogleMap>
    </div>
  );
}

function Search({ panTo, address }) {
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
    },
    defaultValue: address
  });

  useEffect(() => {
    setValue(address);
  }, [address]);

  return (
    <div className="search justify-center width-100">
      <Combobox
        onSelect={async address => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng, address });
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
