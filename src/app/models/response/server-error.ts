export interface ServerError {
    readonly errors: {key: string, message: string};
    readonly code: string;
    readonly stacktrace: string[];
}
