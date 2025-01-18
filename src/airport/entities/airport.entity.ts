import { Transform } from 'class-transformer';

export class Airport {
  name: string;
  location: string;
  searchId: string;

  public static transform(airport: any): Airport {
    return {
      name: airport.name,
      location: airport.location,
      searchId: airport.skyId,
    };
  }

  public static async transformMany(airports: any[]): Promise<Airport[]> {
    return airports.map((airport) => Airport.transform(airport));
  }
}
