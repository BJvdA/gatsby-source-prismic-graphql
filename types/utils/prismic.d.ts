import { PreviewCookie as CookieModel } from '../interfaces/PreviewCookie';
export declare const Endpoints: {
    DEFAULT_DOMAIN: string;
    regexp: RegExp;
    _parse(repositoryName: string): {
        isSecuredScheme: boolean;
        subdomain: string;
        domain: string;
    };
    domain(repositoryName: string): string;
    root(repositoryName: string, withCDN?: boolean): string;
    graphql(repositoryName: string): string;
    v2(repositoryName: string): string;
};
export declare const PreviewCookie: {
    get(repositoryName: string): CookieModel | undefined;
    ref(repositoryName: string): string | undefined;
};
export declare const EditButton: {
    HEADER_NAME: string;
};
