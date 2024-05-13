export type File = {
    name: string;
    type: string;
    ext: string;
    mime: string;
    relativePath: string;
    absolutePath: string;
    assetPaths: string[];
    downloadPath: string;
};