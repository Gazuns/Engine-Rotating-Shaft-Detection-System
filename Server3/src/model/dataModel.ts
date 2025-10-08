export class DataModel {
    private message;
    private data;
    protected code;

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
    constructor(data, message = 'success') {
        super(data, message);
        this.code = 0;
    }
}

export class ErrorModel extends DataModel {
    constructor(data) {
        super(data, null);
        this.code = -1;
    }
}
