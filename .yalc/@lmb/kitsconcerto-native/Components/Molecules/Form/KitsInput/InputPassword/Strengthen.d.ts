import * as Yup from "yup";
export type Auth0PasswordStrengthProps = {
    value: string;
    show: boolean;
    schema: Yup.StringSchema<string, Yup.AnyObject, undefined, "">;
};
declare const Auth0PasswordStrength: ({ value, show, schema }: Auth0PasswordStrengthProps) => import("react/jsx-runtime").JSX.Element;
export default Auth0PasswordStrength;
//# sourceMappingURL=Strengthen.d.ts.map