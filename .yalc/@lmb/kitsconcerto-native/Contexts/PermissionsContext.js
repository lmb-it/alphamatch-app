import { jsx } from 'react/jsx-runtime';
import { useCallback, createContext } from 'react';

const PermissionsContext = createContext({});
const PermissionsProvider = ({ children, roles }) => {
  const inPermissions = useCallback((permissions) => {
    if (!roles) {
      return true;
    }
    if (typeof permissions === "string") {
      return roles.includes(permissions);
    }
    if (Array.isArray(permissions)) {
      return permissions.every((permission) => roles.includes(permission));
    }
    return false;
  }, [roles]);
  const check = useCallback((permissions = null) => {
    if (!roles) {
      return true;
    }
    if (!permissions || roles.length == 0) return false;
    if (typeof permissions === "string" || Array.isArray(permissions)) {
      return inPermissions(permissions);
    }
    if (typeof permissions === "object") {
      const { permissionsRequired, permissionsOptional } = permissions;
      if (permissionsRequired && typeof permissionsRequired === "string" || Array.isArray(permissionsRequired)) {
        return inPermissions(permissionsRequired);
      }
      if (permissionsRequired) {
        return inPermissions(permissionsRequired);
      }
      if (permissionsOptional) {
        return permissionsOptional.some((permission) => roles.includes(permission));
      }
    }
    return false;
  }, [roles]);
  return /* @__PURE__ */ jsx(PermissionsContext.Provider, { value: {
    check
  }, children });
};

export { PermissionsProvider as default };
//# sourceMappingURL=PermissionsContext.js.map
