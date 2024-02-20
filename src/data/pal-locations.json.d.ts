declare module '@/data/pal-locations.json' {
  const value: {
    id: string;
    isBoss: boolean;
    locations: {
      day: {
        x: number;
        y: number;
        z: number;
      }[];
      night: {
        x: number;
        y: number;
        z: number;
      }[];
    };
  }[];
  export default value;
}
