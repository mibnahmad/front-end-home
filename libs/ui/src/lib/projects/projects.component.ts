import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../projects.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { $Enums, Project } from '@prisma/client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'monorepo-take-home-test-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  public $projects: Observable<Project[]>;
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  public filteredProjects: Project[] = [];
  public viewMode: 'card' | 'list' = 'card';
  public searchTerm: string = '';
  public imageUrl = 'https://excelway.co/wp-content/uploads/2024/06/logo-color.svg';
  public $Enums = $Enums;
  public isModalOpen: boolean = false;
  public isImageModalOpen: boolean = false;
  public isDeleteModalOpen: boolean = false;
  public projectToDelete: Project | null = null;

  public newProject: Project = {
    id: '',
    title: '',
    description: '',
    priority: $Enums.Priority.MEDIUM,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  constructor(public projectsService: ProjectsService) {
    this.$projects = this.projectsSubject.asObservable();
  }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectsService.getAllProjects().subscribe(
      projects => {
        this.projectsSubject.next(projects);
        this.filteredProjects = projects;
      }
    );
  }

  deleteProject(project: Project | null): void {
    if (!project) {
      return;
    }
    this.projectsService.deleteProject(project.id).subscribe(() => {
      this.fetchProjects();
    });
  }


  switchViewMode(mode: 'card' | 'list'): void {
    this.viewMode = mode;
  }

  searchProjects(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredProjects = this.projectsSubject.getValue().filter(project =>
      project.title.toLowerCase().includes(searchTermLower) ||
      (project.description && project.description.toLowerCase().includes(searchTermLower))
    );
  }

  addProject(): void {
    this.projectsService.createProject(this.newProject).subscribe(
      () => {
        this.fetchProjects();
        this.resetNewProject();
        this.closeModal();
      },
      error => console.error('Error adding project:', error)
    );
  }

  private resetNewProject(): void {
    this.newProject = {
      id: '',
      title: '',
      description: '',
      priority: $Enums.Priority.MEDIUM,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetNewProject();
  }

  openImageModal(imageUrl: string): void {
    this.imageUrl = imageUrl;
    this.isImageModalOpen = true;
  }

  closeImageModal(): void {
    this.isImageModalOpen = false;
    this.imageUrl = '';
  }

  openDeleteModal(project: Project): void {
    this.isDeleteModalOpen = true;
    this.projectToDelete = project;

  }
  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
  }

}
