import { jsx } from 'react/jsx-runtime';
import { useRef, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import Experian from './Experian.js';
import FormSelect from '../../selects/SelectContext.js';

const GOOGLE_AUTOCOMPLETE = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const GOOGLE_DETAILS = "https://maps.googleapis.com/maps/api/place/details/json";
const KitsInputLocation = ({
  id,
  label,
  errors,
  invalid,
  value,
  hideError,
  onAddressClick,
  onChange,
  disabled,
  placeholder,
  countryISO = "AUS",
  helperText,
  provider,
  api_key,
  labelKey = "label",
  valueKey = "value",
  list,
  ...rest
}) => {
  if (!api_key) throw new Error("API KEY NOT PROVIDED");
  const selectRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const experian = useMemo(
    () => provider !== "google" ? new Experian(api_key) : null,
    [provider, api_key]
  );
  const search = useCallback(
    async (query) => {
      if (query.length < 4) return [];
      try {
        if (provider === "google") {
          let url = `${GOOGLE_AUTOCOMPLETE}?input=${encodeURIComponent(
            query
          )}&key=${api_key}`;
          if (countryISO) {
            url += `&components=country:${countryISO.toLowerCase().slice(0, 2)}`;
          }
          const { data } = await axios.get(url);
          const mapped = data.predictions?.map((p) => ({
            label: p.description,
            value: p.place_id
          })) || [];
          setSuggestions(mapped);
          return mapped;
        } else {
          const res = await experian?.searchAddress(query, countryISO);
          const mapped = res?.data?.result?.suggestions?.map((s) => ({
            label: s.text,
            value: s.global_address_key,
            format: s.format
          })) || [];
          setSuggestions(mapped);
          return mapped;
        }
      } catch {
        setSuggestions([]);
        return [];
      }
    },
    [provider, api_key, countryISO, experian]
  );
  const onPickAddress = useCallback(
    async (event, rawItem) => {
      const selected = rawItem ?? event;
      if (!selected) return;
      const placeId = selected[valueKey];
      onChange?.({
        target: { value: selected[labelKey] }
      });
      if (!onAddressClick || !placeId) return;
      if (provider === "google") {
        const url = `${GOOGLE_DETAILS}?place_id=${placeId}&key=${api_key}`;
        const { data } = await axios.get(url);
        const address = {
          formatted_address: data.result.formatted_address
        };
        data.result.address_components.forEach((c) => {
          const placeType = c?.types?.[0];
          if (placeType && !(placeType in address)) {
            address[placeType] = c.long_name;
          }
        });
        onAddressClick(address);
      } else {
        const res = await experian?.formatAddress(placeId);
        if (res?.data?.result) {
          onAddressClick(res.data.result);
        }
      }
    },
    [
      provider,
      api_key,
      valueKey,
      labelKey,
      onChange,
      onAddressClick,
      experian
    ]
  );
  return /* @__PURE__ */ jsx(
    FormSelect,
    {
      ref: selectRef,
      id,
      shape: "autocomplete",
      value,
      label,
      placeholder,
      labelKey,
      valueKey,
      onChange: onPickAddress,
      isMultiple: false,
      forceSelection: true,
      completeMethod: search,
      list: suggestions,
      helperText,
      hideError,
      disabled,
      invalid,
      errors,
      ...rest
    }
  );
};

export { KitsInputLocation as default };
//# sourceMappingURL=index.js.map
