import type { IStyleClasses } from '@lmb/kitsconcerto-types';
/**
 * Derives color-related style props from a colorScheme name and optional variant.
 * Returns CSS prop overrides that can be spread into cssProps.
 *
 * @example
 * const colorStyles = useKitsColorScheme('blue', 'solid');
 * // colorStyles = { bgColor: 'blue.500', fontColor: 'white' }
 */
export default function useKitsColorScheme(colorScheme: string | undefined, variant?: 'solid' | 'subtle' | 'outline' | 'ghost'): Partial<IStyleClasses>;
//# sourceMappingURL=useColorScheme.d.ts.map