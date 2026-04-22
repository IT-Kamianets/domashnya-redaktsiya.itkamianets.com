import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';

@Component({
	imports: [TranslateDirective],
	templateUrl: './quests.component.html',
	styleUrl: './quests.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestsComponent {}
