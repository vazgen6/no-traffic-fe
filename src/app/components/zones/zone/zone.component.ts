import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IZone } from 'src/app/interfaces/IZone';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoneComponent {
  @Input() zone!: IZone;
}
