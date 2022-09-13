import { Airport } from "./airport.model";

export class FlightForm {

    constructor(
        public originObject: Airport,
        public destinationObject: Airport,
        public cabin_class: string,
        public tickets: number
    ){}

    getOriginCode(){
        return this.originObject.code;
    }

    getDestinationCode(){
        return this.destinationObject.code;
    }

    getCabinClass(){
        return this.cabin_class;
    }

    getTickets(){
        return this.tickets;
    }
}