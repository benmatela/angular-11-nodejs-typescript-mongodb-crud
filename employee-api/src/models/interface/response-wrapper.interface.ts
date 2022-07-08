export interface IResponseWrapper<ResponseType> {
    data: ResponseType;
    success: boolean;
    error: string;
    status: number;
}