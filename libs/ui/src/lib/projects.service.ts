import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@prisma/client';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private API_URL = 'http://localhost:3333/api';
  constructor(public http: HttpClient) {}

  public getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.API_URL}/projects`);
  }

  public createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.API_URL}/projects`, project);
  }

  public deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/projects/${id}`);
  }
}
