import { type ScrollState } from "./helper";
type Options = {
    threshold?: number;
    target?: any;
};
declare const useScrollState: (options?: Options) => {
    scrollState: ScrollState;
    onScroll: (e: any) => void;
};
export default useScrollState;
//# sourceMappingURL=index.native.d.ts.map