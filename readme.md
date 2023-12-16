# TShipAPI SDK for Terminal Africa API

This is an SDK (Software Development Kit) for interacting with the Terminal Africa API. It provides a set of methods that allow you to easily integrate Terminal Africa's shipping and logistics services into your applications.

## Installation

You can install the TShipAPI SDK using npm or yarn:

npm install terminal_africa_nodesdk
# or
yarn add terminal_africa_nodesdk` 

## Usage

Here's how you can use the TShipAPI SDK in your Node.js application:

import { TShipAPI } from "terminal_africa_nodesdk"
    
    // Initialize the SDK with your API secret key
    const api = new TShipAPI('YOUR_SECRET_KEY');
    
    // Example: Fetch carriers
    api.getCarriers({ active: true })
      .then(carriers => {
        console.log('Carriers:', carriers);
      })
      .catch(error => {
        console.error('Error fetching carriers:', error);
      });

## Methods

### Carriers

-   `getCarriers(options: { active?: boolean, type?: string, perPage?: number, page?: number }): Promise<any>` - Fetch a list of carriers.

### Carrier

-   `getCarrier(carrierId: string): Promise<any>` - Fetch details of a specific carrier.

### Drop-off Locations

-   `getDropOffLocations(country: string, state?: string, city?: string, carrier?: number): Promise<any>` - Fetch a list of drop-off locations.

### Shipment Rates

-   `getShipmentRates(options: { currency?: string, deliveryAddress?: string, pickupAddress?: string, parcelId?: string, shipmentId?: string, cashOnDelivery?: boolean }): Promise<any>` - Fetch shipment rates.

### Shipment Quotes

-   `getShipmentQuotes(options: { pickupAddress: object, deliveryAddress: object, parcel: object, carrierId?: string, currency?: string, cashOnDelivery?: boolean }): Promise<any>` - Fetch shipment quotes.

### User Rates

-   `getUserRates(perPage?: number, page?: number): Promise<any>` - Fetch user rates.

### Rate

-   `getRate(rateId: string, currency?: string): Promise<any>` - Fetch details of a specific rate.

### Parcel

-   `createParcel(parcelData: { description?: string, items: Array<object>, metadata?: object, packaging: string, weight_unit: string }): Promise<any>` - Create a new parcel.
    
-   `updateParcel(parcelId: string, updateData: { description?: string, items?: Array<object>, metadata?: object, packaging?: string }): Promise<any>` - Update a parcel.
    
-   `getParcels(perPage?: number, page?: number): Promise<any>` - Fetch a list of parcels.
    
-   `getParcel(parcelId: string): Promise<any>` - Fetch details of a specific parcel.
    

### Shipment

-   `createShipment(shipmentData: { address_from: string, address_to: string, address_return?: string, metadata?: object, parcel?: string, parcels?: Array<string>, shipment_purpose: string, shipment_type?: string }): Promise<any>` - Create a new shipment.
    
-   `createQuickShipment(quickShipmentData: { pickup_address: object, delivery_address: object, parcel?: object, parcels?: Array<object>, metadata?: string, shipment_purpose: string, shipment_type?: string }): Promise<any>` - Create a new quick shipment.
    
-   `updateShipment(shipmentId: string, updateData: { address_to?: string, address_from?: string, address_return?: string, metadata?: object, parcel?: string, parcels?: Array<string>, shipment_purpose?: string }): Promise<any>` - Update a shipment.
    
-   `getShipments(queryParams: { perPage?: string, page?: string, populate?: boolean, status?: string, }): Promise<any>` - Fetch a list of shipments.
    
-   `getShipment(shipmentId: string): Promise<any>` - Fetch details of a specific shipment.
    
-   `trackShipment(shipmentId: string): Promise<any>` - Track a shipment.
    
-   `cancelShipment(shipmentId: string): Promise<any>` - Cancel a shipment.
    
-   `deleteShipment(shipmentId: string): Promise<any>` - Delete a shipment.
    
-   `arrangePickupAndDelivery(rateId: string, shipmentId?: string, purchaseInsurance?: boolean, cashToCollect?: number): Promise<any>` - Arrange pickup and delivery for a shipment.
    

## License

This SDK is released under the [MIT License](https://chat.openai.com/c/LICENSE). Feel free to use it in your projects and make contributions to improve it.

