import { useCallback, useRef, useState } from "react";
import Input from "../../components/atoms/Input";
import Checkbox from "../../components/atoms/Checkbox";
import { useFormContext } from "react-hook-form";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "250px",
  borderRadius: "10px",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

export default function LocationVerification() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const autocompleteRef = useRef(null);

  const lat = watch("latitude");
  const lng = watch("longitude");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const extractAddress = useCallback((components = []) => {
    const get = (type) =>
      components.find((c) => c.types.includes(type))?.long_name || "";

    return {
      city: get("locality"),
      state: get("administrative_area_level_1"),
      pinCode: get("postal_code"),
    };
  }, []);

  const setLocationData = useCallback(
    (lat, lng, address = "", components = []) => {
      const { city, state, pinCode } = extractAddress(components);

      setValue("latitude", lat);
      setValue("longitude", lng);
      setValue("address", address);
      setValue("city", city);
      setValue("state", state);
      setValue("pinCode", pinCode);
    },
    [setValue, extractAddress],
  );

  // Detect Location
  const detectLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setMapCenter({ lat, lng });

        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results[0]) {
            const result = results[0];

            setLocationData(
              lat,
              lng,
              result.formatted_address,
              result.address_components,
            );
          } else {
            // fallback: at least set lat/lng
            setLocationData(lat, lng);
          }
        });
      },
      () => alert("Location access denied"),
    );
  }, [setLocationData]);

  // Map Click
  const handleMapClick = useCallback(
    (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      setMapCenter({ lat, lng });

      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          const result = results[0];

          setLocationData(
            lat,
            lng,
            result.formatted_address,
            result.address_components,
          );
        }
      });
    },
    [setLocationData],
  );

  // Search Place
  const onPlaceChanged = useCallback(() => {
    const place = autocompleteRef.current?.getPlace();
    if (!place?.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setMapCenter({ lat, lng });

    setLocationData(
      lat,
      lng,
      place.formatted_address,
      place.address_components,
    );
  }, [setLocationData]);

  return (
    <div className="vendor-container formsec">
      <div className="darkbox">
        {isLoaded ? (
          <>
            {/* Search */}
            <Autocomplete
              onLoad={(ref) => (autocompleteRef.current = ref)}
              onPlaceChanged={onPlaceChanged}
            >
              <input
                type="text"
                placeholder="Search location..."
                className="input"
                style={{ marginBottom: "15px" }}
              />
            </Autocomplete>

            {/* Map */}
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={mapCenter}
              zoom={14}
              onClick={handleMapClick}
            >
              {lat && lng && <Marker position={{ lat, lng }} />}
            </GoogleMap>
          </>
        ) : (
          <span>Loading....</span>
        )}

        {/* Detect Button */}
        <button type="button" className="detect-btn" onClick={detectLocation}>
          📡 Auto-Detect Location
        </button>

        {/* Address Fields */}
        <Input
          label="Store Address Line"
          name="address"
          placeholder="Address line"
          {...register("address")}
          required
          error={errors.address?.message}
        />

        <Input
          label="Landmark"
          name="landmark"
          placeholder="Near daladali"
          {...register("landmark")}
          error={errors.landmark?.message}
        />

        <div className="row">
          <Input
            label="City"
            name="city"
            placeholder="Ranchi"
            {...register("city")}
            required
            error={errors.city?.message}
          />

          <Input
            label="State"
            name="state"
            placeholder="Jharkhand"
            {...register("state")}
            required
            error={errors.state?.message}
          />
        </div>

        <Input
          label="Pincode"
          name="pinCode"
          placeholder="843001"
          {...register("pinCode")}
          required
          error={errors.pinCode?.message}
        />

        {/* Hidden Fields for lat/lng */}
        <input
          type="hidden"
          {...register("latitude", { required: "Location is required" })}
        />
        <input
          type="hidden"
          {...register("longitude", { required: "Location is required" })}
        />

        {(errors.latitude || errors.longitude) && (
          <p className="error text-danger">Please select location on map</p>
        )}

        {/* Checkbox */}
        <Checkbox
          label="Enable Auto Check-In (Geofencing)"
          {...register("isGeofenceEnabled")}
        />
      </div>
    </div>
  );
}
