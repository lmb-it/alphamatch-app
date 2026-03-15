import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import {
  KitsInputLocation,
  KitsInputText,
  FormSelect,
  InputSwitch,
  Text,
  Flex,
  Label,
} from '@lmb-it/kitsconcerto';
import api from '@src/services/api';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface IAddressValue {
  formatted_address: string;
  address_line_1?: string;
  address_line_2?: string;
  state_id?: number;
  state_name?: string;
  city_id?: number;
  city_name?: string;
  postcode?: string;
  latitude?: number;
  longitude?: number;
  place_id?: string;
  entry_mode: 'autocomplete' | 'manual';
}

interface AddressFieldProps {
  fieldRef: string;
  label: string;
  isRequired?: boolean;
  onChange: (value: IAddressValue) => void;
  value?: IAddressValue | null;
}

interface GeoOption {
  label: string;
  value: number;
}

const AUSTRALIA_COUNTRY_ID = 14;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const AddressField: React.FC<AddressFieldProps> = ({
  fieldRef,
  label,
  isRequired = false,
  onChange,
  value,
}) => {
  const [isManual, setIsManual] = useState(false);

  // Manual mode fields
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [selectedState, setSelectedState] = useState<GeoOption | null>(null);
  const [selectedCity, setSelectedCity] = useState<GeoOption | null>(null);
  const [postcode, setPostcode] = useState('');

  // Dropdown options
  const [states, setStates] = useState<GeoOption[]>([]);
  const [cities, setCities] = useState<GeoOption[]>([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Track if we've synced from prop value
  const didSyncRef = useRef(false);

  // Sync initial value from props
  useEffect(() => {
    if (value && !didSyncRef.current) {
      didSyncRef.current = true;
      setIsManual(value.entry_mode === 'manual');
      setAddressLine1(value.address_line_1 || '');
      setAddressLine2(value.address_line_2 || '');
      setPostcode(value.postcode || '');
    }
  }, [value]);

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const res = await api.get(`/states/${AUSTRALIA_COUNTRY_ID}`);
        const data = res.data?.data || res.data || [];
        const mapped: GeoOption[] = (Array.isArray(data) ? data : []).map(
          (s: any) => ({
            label: s.name,
            value: s.id,
          }),
        );
        setStates(mapped);
      } catch (err) {
        console.warn('Failed to fetch states:', err);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      return;
    }
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const res = await api.get(`/cities?state=${selectedState.value}`);
        const data = res.data?.data || res.data || [];
        const mapped: GeoOption[] = (Array.isArray(data) ? data : []).map(
          (c: any) => ({
            label: c.name,
            value: c.id,
          }),
        );
        setCities(mapped);
      } catch (err) {
        console.warn('Failed to fetch cities:', err);
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [selectedState]);

  // Compose formatted_address from manual fields
  const composeFormattedAddress = useCallback(
    (line1: string, line2: string, city: string, state: string, zip: string) => {
      const parts = [line1, line2, city, state, zip].filter(Boolean);
      return parts.join(', ');
    },
    [],
  );

  // Emit change for manual mode
  const emitManualChange = useCallback(
    (
      l1: string,
      l2: string,
      state: GeoOption | null,
      city: GeoOption | null,
      zip: string,
    ) => {
      const formatted = composeFormattedAddress(
        l1,
        l2,
        city?.label || '',
        state?.label || '',
        zip,
      );
      onChange({
        formatted_address: formatted,
        address_line_1: l1 || undefined,
        address_line_2: l2 || undefined,
        state_id: state?.value,
        state_name: state?.label,
        city_id: city?.value,
        city_name: city?.label,
        postcode: zip || undefined,
        entry_mode: 'manual',
      });
    },
    [onChange, composeFormattedAddress],
  );

  // Handle autocomplete address selection
  const handleAddressClick = useCallback(
    (addressData: any) => {
      const formatted = addressData?.formatted_address || '';
      onChange({
        formatted_address: formatted,
        place_id: addressData?.place_id,
        entry_mode: 'autocomplete',
      });
    },
    [onChange],
  );

  // Handle autocomplete text change (from KitsInputLocation onChange)
  const handleAutocompleteChange = useCallback(
    (event: any) => {
      // The onChange from KitsInputLocation fires with { target: { value } }
      const text = event?.target?.value || event || '';
      if (typeof text === 'string' && text.length > 0) {
        // Don't emit onChange for partial typing - only emit on address selection via onAddressClick
      }
    },
    [],
  );

  // Toggle mode
  const handleModeToggle = useCallback(
    (val: boolean) => {
      setIsManual(val);
      if (val) {
        // Switching to manual - emit current manual state
        emitManualChange(addressLine1, addressLine2, selectedState, selectedCity, postcode);
      }
    },
    [addressLine1, addressLine2, selectedState, selectedCity, postcode, emitManualChange],
  );

  return (
    <View style={styles.container}>
      <Label label={label} elementId={fieldRef} />

      {/* Mode toggle */}
      <Flex flexDirection="row" alignItems="center" mt={8} mb={12}>
        <InputSwitch
          value={isManual}
          onChange={handleModeToggle}
        />
        <Text fontSize={13} color="text-subtle" ml={8}>
          Enter address manually
        </Text>
      </Flex>

      {!isManual ? (
        /* ── Autocomplete Mode ── */
        <KitsInputLocation
          id={`${fieldRef}_autocomplete`}
          label=""
          placeholder="Search for an address..."
          provider="google"
          api_key={Config.GOOGLE_MAPS_API_KEY || ''}
          countryISO="au"
          forceSelection
          onAddressClick={handleAddressClick}
          onChange={handleAutocompleteChange}
          list={[]}
          value={value?.formatted_address || ''}
        />
      ) : (
        /* ── Manual Mode ── */
        <View>
          <View style={styles.fieldRow}>
            <KitsInputText
              id={`${fieldRef}_line1`}
              label="Address Line 1"
              placeholder="Street address"
              value={addressLine1}
              onChange={(e: any) => {
                const v = e?.target?.value ?? e ?? '';
                setAddressLine1(v);
                emitManualChange(v, addressLine2, selectedState, selectedCity, postcode);
              }}
              required={isRequired}
            />
          </View>

          <View style={styles.fieldRow}>
            <KitsInputText
              id={`${fieldRef}_line2`}
              label="Address Line 2"
              placeholder="Unit, suite, etc. (optional)"
              value={addressLine2}
              onChange={(e: any) => {
                const v = e?.target?.value ?? e ?? '';
                setAddressLine2(v);
                emitManualChange(addressLine1, v, selectedState, selectedCity, postcode);
              }}
            />
          </View>

          <View style={styles.fieldRow}>
            <FormSelect
              id={`${fieldRef}_state`}
              label="State"
              placeholder="Select state"
              value={selectedState}
              list={states}
              labelKey="label"
              valueKey="value"
              onChange={(e: any, item?: any) => {
                const picked = item || e;
                const opt = picked ? {label: picked.label, value: picked.value} : null;
                setSelectedState(opt);
                setSelectedCity(null);
                setCities([]);
                emitManualChange(addressLine1, addressLine2, opt, null, postcode);
              }}
              disabled={loadingStates}
            />
          </View>

          <View style={styles.fieldRow}>
            <FormSelect
              id={`${fieldRef}_city`}
              label="City / Suburb"
              placeholder={selectedState ? 'Select city' : 'Select state first'}
              value={selectedCity}
              list={cities}
              labelKey="label"
              valueKey="value"
              onChange={(e: any, item?: any) => {
                const picked = item || e;
                const opt = picked ? {label: picked.label, value: picked.value} : null;
                setSelectedCity(opt);
                emitManualChange(addressLine1, addressLine2, selectedState, opt, postcode);
              }}
              disabled={!selectedState || loadingCities}
            />
          </View>

          <View style={styles.fieldRow}>
            <KitsInputText
              id={`${fieldRef}_postcode`}
              label="Postcode"
              placeholder="e.g. 2000"
              value={postcode}
              onChange={(e: any) => {
                const v = e?.target?.value ?? e ?? '';
                setPostcode(v);
                emitManualChange(addressLine1, addressLine2, selectedState, selectedCity, v);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  fieldRow: {
    marginBottom: 12,
  },
});

export default AddressField;
