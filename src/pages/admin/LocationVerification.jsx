import { useRef, useState } from "react";
import Input from "../../components/atoms/Input";
import Checkbox from "../../components/atoms/Checkbox";
import { useFormContext } from "react-hook-form";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
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

  const lat = watch("lat");
  const lng = watch("lng");

  // 📍 Detect Location
  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        setMapCenter(location);

        setValue("lat", location.lat);
        setValue("lng", location.lng);
      },
      () => alert("Location access denied")
    );
  };

  // 📍 Map Click
  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setValue("lat", lat, { shouldValidate: true });
    setValue("lng", lng, { shouldValidate: true });
  };

  // 🔍 Search Place
  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();

    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setMapCenter({ lat, lng });

    const components = place.address_components;

    const get = (type) =>
      components?.find((c) => c.types.includes(type))?.long_name || "";

    setValue("lat", lat);
    setValue("lng", lng);
    setValue("address1", place.formatted_address || "");
    setValue("city", get("locality"));
    setValue("state", get("administrative_area_level_1"));
    setValue("pincode", get("postal_code"));
  };

  return (
    <div className="vendor-container formsec">
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <div className="darkbox">

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

          {/* Detect Button */}
          <button
            type="button"
            className="detect-btn"
            onClick={detectLocation}
          >
            📡 Auto-Detect Location
          </button>

          {/* Address Fields */}
          <Input
            label="Store Address Line"
            placeholder="Address line"
            {...register("address")}
            required
            error={errors.address?.message}
          />

          <Input
            label="Landmark"
            placeholder="Near daladali"
            {...register("landmark")}
            error={errors.landmark?.message}
          />

          <div className="row">
            <Input
              label="City"
              placeholder="Ranchi"
              {...register("city")}
              required
              error={errors.city?.message}
            />

            <Input
              label="State"
              placeholder="Jharkhand"
              {...register("state")}
              required
              error={errors.state?.message}
            />
          </div>

          <Input
            label="Pincode"
            placeholder="843001"
            {...register("pinCode")}
            required
            error={errors.pinCode?.message}
          />

          {/* Hidden Fields for lat/lng */}
          <input
            type="hidden"
            {...register("lat", { required: "Location is required" })}
          />
          <input
            type="hidden"
            {...register("lng", { required: "Location is required" })}
          />

          {errors.lat && (
            <p className="error text-danger">
              Please select location on map
            </p>
          )}

          {/* Checkbox */}
          <Checkbox
            label="Enable Auto Check-In (Geofencing)"
            {...register("geofencing")}
          />

        </div>
      </LoadScript>
    </div>
  );
}