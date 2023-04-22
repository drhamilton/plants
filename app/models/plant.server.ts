import { prisma } from "~/db.server";

export async function getPlants() {
    return prisma.plant.findMany();
}

export async function getPlant(slug: string) {
    return prisma.plant.findUnique({ where: { slug } })
}

export async function createPlant(plant) {
    return prisma.plant.create({ data: plant })
}