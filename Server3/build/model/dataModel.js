export class DataModel {
    constructor(data, message) {
        if (typeof data === "string") {
            this.message = data;
            data = null;
            message = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}
export class SuccessModel extends DataModel {
    constructor(data, message) {
        super(data, message);
        this.code = 0;
    }
}
export class ErrorModel extends DataModel {
    constructor(data, message) {
        super(data, message);
        this.code = -1;
    }
}
