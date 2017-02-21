export default function throttleByAnimationFrame(fn: any, threshhold?: number): () => void;
export declare function throttleByAnimationFrameDecorator(threshhold?: number): (target: any, key: any, descriptor: any) => {
    configurable: boolean;
    get(): any;
};
