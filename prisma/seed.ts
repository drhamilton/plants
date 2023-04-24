import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const plants = [
    {
      slug: "radish",
      name: "Radish",
      markdown: "Here's info about the radish",
      brand: "Johnnys",
      daysToMaturity: 30
    },
    {
      slug: "cherry-tomato",
      name: "Cherry Tomato",
      markdown: `
              # Sun Gold botanical interests
            `.trim(),
      brand: "Botanical Interests",
      daysToMaturity: 60
    },
  ]

  for (const plant of plants) {
    await prisma.plant.create({
      data: plant
    })
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
