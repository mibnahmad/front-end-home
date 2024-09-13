import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create multiple projects
  const projects = [
    {
      title: 'Project Alpha',
      description: 'Description of Project Alpha',
    },
    {
      title: 'Project Beta',
      description: 'Description of Project Beta',
    },
    {
      title: 'Project Gamma',
      description: 'Description of Project Gamma',
    },
    {
      title: 'Project Delta',
      description: 'Description of Project Delta',
    },
  ];

  for (const project of projects) {
    const createdProject = await prisma.project.create({
      data: project,
    });
  }
}
main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
