import { jsx } from 'react/jsx-runtime';
import { useRef, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import Experian from './Experian.js';
import '../../../../../Contexts/DialogContext.js';
import FormSelect from '../../KitsSelect/SelectContext.js';
import '../../../UI/Flex/index.js';
import 'primereact/tooltip';
import 'primereact/skeleton';

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
      if (query.length < 4) return;
      try {
        if (provider === "google") {
          const { data } = await axios.get(
            `${GOOGLE_AUTOCOMPLETE}?input=${encodeURIComponent(
              query
            )}&key=${api_key}`
          );
          setSuggestions(
            data.predictions?.map((p) => ({
              label: p.description,
              value: p.place_id
            })) || []
          );
        } else {
          const res = await experian?.searchAddress(query, countryISO);
          setSuggestions(
            res?.data?.result?.suggestions?.map((s) => ({
              label: s.text,
              value: s.global_address_key,
              format: s.format
            })) || []
          );
        }
      } catch {
        setSuggestions([]);
      }
    },
    [provider, api_key, countryISO, experian]
  );
  const onPickAddress = useCallback(
    async (selected) => {
      if (!selected) return;
      const placeId = selected[valueKey];
      onChange?.({
        target: { value: selected[labelKey] }
      });
      if (!onAddressClick || !placeId) return;
      if (provider === "google") {
        const { data } = await axios.get(
          `${GOOGLE_DETAILS}?place_id=${placeId}&key=${api_key}`
        );
        const address = {
          formatted_address: data.result.formatted_address
        };
        data.result.address_components.forEach((c) => {
          const type = c?.types?.[0];
          if (type && type in address) {
            address[type] = c.long_name;
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
