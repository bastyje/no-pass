import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComplexComponent } from '../../../shared/list-item-complex/list-item-complex.component';
import { GetAllSecrets } from '../../../../../domain/secret/get-all-secrets.usecase';
import { Secret } from '../../../../../domain/secret/secret';

@Component({
  selector: 'np-secret-side-menu',
  standalone: true,
  imports: [CommonModule, ListItemComplexComponent],
  templateUrl: './secret-side-menu.component.html',
  styleUrl: './secret-side-menu.component.scss'
})
export class SecretSideMenuComponent implements OnInit {
  protected secrets: Secret[];

  constructor(private getAllSecrets: GetAllSecrets) {}

  public ngOnInit(): void {
    this.getAllSecrets.execute().subscribe({
      next: r => {
        this.secrets = r.content;
        console.log(this.secrets);
      }, error: err => console.error(err)
    })
  }

  protected getPrimaryText(item: Secret): string {
    return item.plain === null ? '' : item.plain.name;
  }

  protected getSecondaryText(item: Secret): string {
    return item.plain === null ? '' : item.plain.loginId;
  }
}
