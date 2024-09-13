import { $Enums, PrismaClient, Project } from '@prisma/client';
import { Injectable } from '@nestjs/common';

const prisma = new PrismaClient();
@Injectable()
export class ProjectsService {
  
  //Fetch all projects
  async findAll(): Promise<Project[]> {
    return await prisma.project.findMany();
  }

  //Find by id project
  async findOne(id: string): Promise<Project | null> {
    return await prisma.project.findUnique({
      where: {
        id,
      },
    });
  }

  // Create a new project
  async create(data: { 
    title: string; 
    description?: string | null; 
    priority: $Enums.Priority;
  }): Promise<Project> {
    return await prisma.project.create({
      data: {
        title: data.title,
        description: data.description ?? null,
        priority: data.priority,
      },
    });
  }

  //Delete a project
  async remove(id: string) {
    return await prisma.project.delete({
      where: {
        id,
      },
    });
  }
  
}
