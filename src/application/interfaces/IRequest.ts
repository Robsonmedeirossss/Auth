export interface IRequest {
    headers: Record<string, string>;
    params?: Record<string, any>;
    body: Record <string, any>;
    metadata?: {
        account?: {
            id: string;
            role: string;
        }
    } 
}