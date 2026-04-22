import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';

@Component({
	imports: [TranslateDirective],
	templateUrl: './sales.component.html',
	styleUrl: './sales.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesComponent {}
