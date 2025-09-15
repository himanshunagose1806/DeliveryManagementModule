export interface DeliveryAgent {
    id: number;
    agentId: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
    status: string;
    currentOrderId: string;
    eta: number;
    location: string;
    todayEarning: number;
    totalEarning: number;
    totalDeliveries: number;
    distanceTravelled: number;
    rating: number;
    lastDeliveryTime: string;
    documents: {
        license: string;
        idProof: string;
    };
    orders: AgentOrder[];
}

export interface AgentOrder {
    orderId: string;
    status: string;
    restaurantName: string;
    customerName: string;
    customerContact: string;
    customerAddress: string;
    distance: number;
    deliveredTime?: string;
    paymentCollected?: boolean;
    deliveryFeedback?: string;
}
