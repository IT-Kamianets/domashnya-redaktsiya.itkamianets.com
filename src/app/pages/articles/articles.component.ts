import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateDirective } from '@wawjs/ngx-translate';

@Component({
	imports: [TranslateDirective],
	templateUrl: './articles.component.html',
	styleUrl: './articles.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesComponent {}
