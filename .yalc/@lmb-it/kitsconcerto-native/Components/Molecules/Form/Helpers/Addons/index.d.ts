import { type FunctionComponent } from 'react';
import type { IKitsContainer } from "@lmb/kitsconcerto-types";
interface IAddonsProps {
    leftAddon?: IKitsContainer["leftAddon"];
    rightAddon?: IKitsContainer["rightAddon"];
    children: IKitsContainer["children"];
    additionalClassName?: string;
    invalid: boolean;
}
declare const Addons: FunctionComponent<IAddonsProps>;
export default Addons;
//# sourceMappingURL=index.native.d.ts.map