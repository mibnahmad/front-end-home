import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { $Enums, Project } from '@prisma/client'; // Assuming you're using Prisma's Project type

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // Get all projects
  @Get()
  async findAll(): Promise<Project[]> {
    return await this.projectsService.findAll();
  }

  // Get a project by ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Project | null> {
    return await this.projectsService.findOne(id);
  }

  // Create a new project
  @Post()
  async create(
    @Body() createProjectDto: { title: string; description?: string | null; priority: $Enums.Priority; order: number }
  ): Promise<Project> {
    return await this.projectsService.create(createProjectDto);
  }

  // Delete a project by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.projectsService.remove(id);
  }
}