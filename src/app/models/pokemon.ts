export class Pokemon {
    
    public flavortext: string;
    constructor(public id: number, public name: string, public url: string, public description: string, public flavor_text_entries: [{}])
    {

    }

    public flavorText(): void {
        this.flavor_text_entries.forEach(function(entry) {
            console.log(entry);
        });
    }
 
}