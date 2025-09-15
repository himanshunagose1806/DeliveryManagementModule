export interface OrderDelivery {
    id: number;
    orderId: string;
    orderDetails: {
        items: OrderItem[];
        totalAmount: number;
        paymentStatus: string;
        deliveryStatus: string;
        distance: number;
        eta: number | null;
    };
    customer: {
        name: string;
        contact: string;
        address: string;
        locationCoordinates: {
            lat: number;
            lng: number;
        };
        notes: string;
    };
    restaurant: {
        restaurantId: string;
        name: string;
        address: string;
        contact: string;
        pickupInstructions: string;
    };
}

export interface OrderItem {
    itemId: number;
    name: string;
    price: number;
    quantity: number;
}
