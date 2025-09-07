export default class Delivery {
    agentId! : string;
    name! : string;
    phone! : string;
    status! : string;
    currentOrderId! : string;

    constructor(agentId : string, name : string, phone : string, status : string, currentOrderId : string) {
        this.agentId = agentId;
        this.name = name;
        this.phone = phone;
        this.status = status;
        this.currentOrderId = currentOrderId;
    }
}