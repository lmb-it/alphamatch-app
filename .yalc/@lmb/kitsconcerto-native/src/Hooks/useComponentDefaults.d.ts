/**
 * Merges theme-level component defaults with user-supplied props.
 * User props always take precedence over theme defaults.
 *
 * @example
 * // In a component:
 * function Button(rawProps: IButtonProps) {
 *   const props = useComponentDefaults('Button', rawProps);
 *   // props now includes theme.components.Button defaults merged in
 * }
 */
export default function useComponentDefaults<T extends Record<string, any>>(componentName: string, props: T): T;
//# sourceMappingURL=useComponentDefaults.d.ts.map