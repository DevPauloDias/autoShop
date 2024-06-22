import { UserProps } from 'src/utils/types';
import { PrismaService } from '../prisma-service';
import { Injectable } from '@nestjs/common';

export interface VehiclesProps {
  id?: string;
  model: string;
  brand: string;
  year: number;
  color: string;
  km: number;
}

@Injectable()
export class PrismaVehicle {
  constructor(private prisma: PrismaService) {}

  async getAll(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) return null;

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(data: VehiclesProps) {
    try {
      const res = await this.prisma.vehicle.create({
        data: {
          model: data.model,
          brand: data.brand,
          year: data.year,
          color: data.color,
          km: data.km,
        },
      });

      if (!res) return null;
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getDetails() {}
}
