import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';

@Component({
	imports: [TranslateDirective],
	templateUrl: './events.component.html',
	styleUrl: './events.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent {}
