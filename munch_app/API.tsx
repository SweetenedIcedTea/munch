export default class MunchServer {
    address: string;
    constructor(address: string) {
        this.address = address;

    }
    async post(endpoint:string, data: any) {
        try {
            const response = await fetch(this.address+'/'+endpoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = response.json();
            return responseData;
        } catch (error) {
            console.error(error); // bruh
        }
    }
}