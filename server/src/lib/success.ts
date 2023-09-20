
export class APISuccessResponse {
    statusCode: number;
    response: string | Record<string,any>;
    
    constructor(response: string | Record<string,any>, statusCode: number = 200) {
        this.statusCode = statusCode;
        this.response = response;   
    }
}