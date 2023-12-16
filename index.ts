import axios, { AxiosInstance } from 'axios';

export class TShipAPI {
    private axiosInstance: AxiosInstance;

    constructor(private secretKey: string) {
        this.axiosInstance = axios.create({
            baseURL: 'https://api.terminal.africa/v1',
            headers: {
                'Authorization': `Bearer ${this.secretKey}`,
                'Content-Type': 'application/json'
            }
        });
    }

    public async getCarriers(active?: boolean, type?: string, perPage: number = 100, page: number = 1): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/carriers', {
                params: { active, type, perPage, page }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching carriers:', error);
            throw error;
        }
    }

    public async getCarrier(carrierId: string): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`/carriers/${carrierId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching carrier with ID ${carrierId}:`, error);
            throw error;
        }
    }

    public async getDropOffLocations(country: string, state?: string, city?: string, carrier?: number): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/locations/drop-off', {
                params: { country, state, city, carrier }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching drop-off locations:', error);
            throw error;
        }
    }

    // Add this new method to the TShipAPI class

    public async getShipmentRates(options: {
        currency?: string,
        deliveryAddress?: string,
        pickupAddress?: string,
        parcelId?: string,
        shipmentId?: string,
        cashOnDelivery?: boolean
    }): Promise<any> {
        try {
            const params = {
                currency: options.currency,
                delivery_address: options.deliveryAddress,
                pickup_address: options.pickupAddress,
                parcel: options.parcelId,
                shipment_id: options.shipmentId,
                cash_on_delivery: options.cashOnDelivery
            };

            const response = await this.axiosInstance.get('/rates/shipment', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching shipment rates:', error);
            throw error;
        }
    }

    // Add this new method to the TShipAPI class

    public async getShipmentQuotes(options: {
        pickupAddress: object,
        deliveryAddress: object,
        parcel: object,
        carrierId?: string,
        currency?: string,
        cashOnDelivery?: boolean
    }): Promise<any> {
        try {
            const data = {
                pickup_address: options.pickupAddress,
                delivery_address: options.deliveryAddress,
                parcel: options.parcel,
                carrier_id: options.carrierId,
                currency: options.currency,
                cash_on_delivery: options.cashOnDelivery
            };

            const response = await this.axiosInstance.post('/rates/shipment/quotes', data);
            return response.data;
        } catch (error) {
            console.error('Error fetching shipment quotes:', error);
            throw error;
        }
    }


    // Add this new method to the TShipAPI class

    public async getUserRates(perPage: number = 100, page: number = 1): Promise<any> {
        try {
            const params = { perPage, page };

            const response = await this.axiosInstance.get('/rates', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching user rates:', error);
            throw error;
        }
    }

    public async getRate(rateId: string, currency?: string): Promise<any> {
        try {
            const params = { currency };
            const response = await this.axiosInstance.get(`/rates/${rateId}`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching rate:', error);
            throw error;
        }
    }

    public async createParcel(parcelData: {
        description?: string,
        items: Array<object>,
        metadata?: object,
        packaging: string,
        weight_unit: string
    }): Promise<any> {
        try {
            const response = await this.axiosInstance.post('/parcels', parcelData);
            return response.data;
        } catch (error) {
            console.error('Error creating parcel:', error);
            throw error;
        }
    }

    public async updateParcel(parcelId: string, updateData: {
        description?: string,
        items?: Array<object>,
        metadata?: object,
        packaging?: string
    }): Promise<any> {
        try {
            const response = await this.axiosInstance.put(`/parcels/${parcelId}`, updateData);
            return response.data;
        } catch (error) {
            console.error('Error updating parcel:', error);
            throw error;
        }
    }


    public async getParcels(perPage: number = 100, page: number = 1): Promise<any> {
        try {
            const params = { perPage, page };
            const response = await this.axiosInstance.get('/parcels', { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching parcels:', error);
            throw error;
        }
    }

    public async getParcel(parcelId: string): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`/parcels/${parcelId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching parcel details:', error);
            throw error;
        }
    }

    public async createShipment(shipmentData: {
        address_from: string,
        address_to: string,
        address_return?: string,
        metadata?: object,
        parcel?: string,
        parcels?: Array<string>,
        shipment_purpose: string,
        shipment_type?: string
    }): Promise<any> {
        try {
            const response = await this.axiosInstance.post('/shipments', shipmentData);
            return response.data;
        } catch (error) {
            console.error('Error creating shipment:', error);
            throw error;
        }
    }

    public async createQuickShipment(quickShipmentData: {
        pickup_address: object,
        delivery_address: object,
        parcel?: object,
        parcels?: Array<object>,
        metadata?: string,
        shipment_purpose: string,
        shipment_type?: string
    }): Promise<any> {
        try {
            const response = await this.axiosInstance.post('/shipments/quick', quickShipmentData);
            return response.data;
        } catch (error) {
            console.error('Error creating quick shipment:', error);
            throw error;
        }
    }

    public async updateShipment(shipmentId: string, updateData: {
        address_to?: string,
        address_from?: string,
        address_return?: string,
        metadata?: object,
        parcel?: string,
        parcels?: Array<string>,
        shipment_purpose?: string
    }): Promise<any> {
        try {
            const response = await this.axiosInstance.put(`/shipments/${shipmentId}`, updateData);
            return response.data;
        } catch (error) {
            console.error('Error updating shipment:', error);
            throw error;
        }
    }


    public async getShipments(queryParams: {
        perPage?: string,
        page?: string,
        populate?: boolean,
        status?: string,
    }): Promise<any> {
        try {
            const response = await this.axiosInstance.get('/shipments', { params: queryParams });
            return response.data;
        } catch (error) {
            console.error('Error fetching shipments:', error);
            throw error;
        }
    }


    public async getShipment(shipmentId: string): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`/shipments/${shipmentId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching shipment details:', error);
            throw error;
        }
    }


    public async trackShipment(shipmentId: string): Promise<any> {
        try {
            const response = await this.axiosInstance.get(`/shipments/track/${shipmentId}`);
            return response.data;
        } catch (error) {
            console.error('Error tracking shipment:', error);
            throw error;
        }
    }


    public async cancelShipment(shipmentId: string): Promise<any> {
        try {
            const response = await this.axiosInstance.post('/shipments/cancel', { shipment_id: shipmentId });
            return response.data;
        } catch (error) {
            console.error('Error canceling shipment:', error);
            throw error;
        }
    }

    public async deleteShipment(shipmentId: string): Promise<any> {
        try {
            const response = await this.axiosInstance.delete('/shipments', {
                data: { shipment_id: shipmentId },
            });
            return response.data;
        } catch (error) {
            console.error('Error deleting shipment:', error);
            throw error;
        }
    }

    public async arrangePickupAndDelivery(rateId: string, shipmentId?: string, purchaseInsurance?: boolean, cashToCollect?: number): Promise<any> {
        try {
            const requestData = {
                rate_id: rateId,
                shipment_id: shipmentId,
                purchase_insurance: purchaseInsurance,
                cash_to_collect: cashToCollect,
            };

            const response = await this.axiosInstance.post('/shipments/pickup', requestData);
            return response.data;
        } catch (error) {
            console.error('Error arranging pickup and delivery:', error);
            throw error;
        }
    }

}

 
