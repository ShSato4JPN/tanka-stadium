import { Tanka } from "@prisma/client";

export interface CustomTanka extends Partial<Tanka> {
  user: {
    name: string;
  } | null;
}
