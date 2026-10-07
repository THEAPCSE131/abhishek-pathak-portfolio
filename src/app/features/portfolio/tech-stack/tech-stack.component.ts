import { Component } from '@angular/core';
import { IconComponent } from '../../../shared/icon.component';

interface Technology {
  name: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
})
export class TechStackComponent {
  readonly technologies: Technology[] = [
    { name: 'Angular', icon: 'angular', color: 'var(--angular)' },
    { name: 'TypeScript', icon: 'typescript', color: '#3178c6' },
    { name: 'JavaScript', icon: 'javascript', color: 'var(--javascript)' },
    { name: 'Node.js', icon: 'node', color: 'var(--node)' },
    { name: 'Express.js', icon: 'express', color: 'var(--text)' },
    { name: 'MongoDB', icon: 'mongodb', color: 'var(--mongodb)' },
    { name: 'Python', icon: 'python', color: 'var(--python-blue)' },
    { name: 'HTML5', icon: 'html5', color: '#ef652a' },
    { name: 'CSS3', icon: 'css3', color: '#2196f3' },
    { name: 'Git', icon: 'git', color: '#f05032' },
    { name: 'REST API', icon: 'cloud', color: 'var(--blue)' },
    { name: 'SQL', icon: 'database', color: 'var(--cyan)' },
    { name: 'AI/ML', icon: 'brain', color: 'var(--violet)' },
    { name: 'VS Code', icon: 'vscode', color: '#23a9f2' },
  ];
}
