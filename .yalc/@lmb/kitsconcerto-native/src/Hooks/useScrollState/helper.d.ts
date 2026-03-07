export type ScrollDirection = "up" | "down";
export type ScrollState = {
    y: number;
    isScrolled: boolean;
    direction: ScrollDirection;
};
export declare function computeScrollState(prevY: number, currentY: number, threshold: number): {
    readonly y: number;
    readonly isScrolled: boolean;
    readonly direction: "down" | "up";
};
//# sourceMappingURL=helper.d.ts.map