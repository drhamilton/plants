import { prisma } from "~/db.server";
import type { Plant } from "@prisma/client";

export async function getPlants() {
    return prisma.plant.findMany();
}

export async function getPlant(slug: string) {
    return prisma.plant.findUnique({ where: { slug } })
}

export async function createPlant(
    plant: Pick<Plant, "slug" | "name" | "markdown">
) {
    return prisma.plant.create({ data: plant })
}