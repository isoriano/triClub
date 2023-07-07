import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ButtonComponent, FormFieldInputComponent } from '@isg/ui';

import { TeamsService } from '../../services';

@Component({
  selector: 'tcs-team',
  templateUrl: 'team.component.html',
  styleUrls: ['./team.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ButtonComponent, FormFieldInputComponent, NgIf]
})
export class TeamComponent implements OnInit {
  teamId: number;

  teamNameCtrl = new FormControl<string>('', Validators.required);

  private route = inject(ActivatedRoute);
  private teamsService = inject(TeamsService);

  ngOnInit(): void {
    this.teamId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onCreateTeam(): void {
    if (this.teamNameCtrl.valid) {
      this.teamsService.create(this.teamNameCtrl.value);
    }
  }
}
