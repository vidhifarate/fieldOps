export class ResponseHandler {
    constructor(
        public statusCode:number|null,
        public data: any,
        public err: any = null
    ) {}
}