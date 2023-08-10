import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { Point } from 'src/app/interfaces/IZone';
import { ZonesService } from 'src/app/services/zones.service';

const LEFT_CLICK_CODE = 0;

interface DrawPoint {
  x: number;
  y: number;
}

@Component({
  selector: 'app-create-zone',
  templateUrl: './create-zone.component.html',
  styleUrls: ['./create-zone.component.scss'],
})
export class CreateZoneComponent {
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
  });
  public points: Point[] = [];
  public tempPoint: DrawPoint | null = null;
  public lastPoint: DrawPoint = { x: 0, y: 0 };

  private isDrawing = true;

  constructor(private zoneService: ZonesService, private fb: FormBuilder) {}

  public setPoint(event: MouseEvent): void {
    if (event.button !== LEFT_CLICK_CODE) {
      return;
    }

    this.points = [...this.points, [event.offsetX, event.offsetY]];
    this.lastPoint = { x: event.offsetX, y: event.offsetY };
    this.isDrawing = true;
  }

  public previewEdge(event: MouseEvent): void {
    if (this.points.length && this.isDrawing) {
      this.tempPoint = { x: event.offsetX, y: event.offsetY };
    }
  }

  public reset(): void {
    this.points = [];
    this.lastPoint = { x: 0, y: 0 };
    this.tempPoint = null;
  }

  public finish(event: MouseEvent): void {
    event.preventDefault(); // so context menu isn't opened
    this.isDrawing = false;
    this.tempPoint = null;
  }

  public createZone(): void {
    this.zoneService
      .createZone({
        name: this.form?.get('name')?.value,
        points: this.points,
      })
      .pipe(
        tap(() => {
          this.reset();
          this.form?.reset();
        })
      )
      .subscribe();
  }
}
