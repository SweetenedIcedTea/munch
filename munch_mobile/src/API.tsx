export default class MunchServer {
    address: string;
    constructor(address: string) {
        this.address = address;
    }
    async testConnection(): Promise<boolean> {
        return (await this.post("echo", "bruh") == "bruh");
    }
    async getMenu(id: string | number) {
        return this.get("menu/"+id);
    }
    async get(endpoint: string) {
        try {
            const response = await fetch(this.address + "/" + endpoint, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });
            const responseData = response.json();
            return responseData;
        } catch (error) {
            console.log("[API Error] " + error); // bruh
        }
    }
    async post(endpoint: string, data: any) {
        try {
            const response = await fetch(this.address + "/" + endpoint, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const responseData = response.json();
            return responseData;
        } catch (error) {
            console.log("[API Error] " + error); // bruh
        }
    }
}
