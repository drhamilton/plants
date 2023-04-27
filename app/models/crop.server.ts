import type { Crop } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getCrops() {
    return prisma.crop.findMany();
}

export async function getCrop(id: number) {
    return prisma.crop.findUnique({ where: { id }, include: { plant: { select: { slug: true } } } })
}

export async function createCrop(crop: Pick<Crop, "dateSown" | "quantity" | "location" | "name" | "plantId">) {
    return prisma.crop.create({ data: crop })
}