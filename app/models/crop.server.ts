import { prisma } from "~/db.server";

export async function getCrops() {
    return prisma.crop.findMany();
}