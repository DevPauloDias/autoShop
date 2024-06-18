export interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface VeiclesProps {
  id: string;
  model: string;
  brand: string;
  year: string;
  color: string;
  km: number;
}

export interface match {
  vehicleId: string;
  ownerId: string;
  buyerId: string;
  dateSend: Date;
  dateMatch: Date;
}
