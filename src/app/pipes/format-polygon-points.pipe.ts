import { Pipe, PipeTransform } from '@angular/core';
import { Point } from '../interfaces/IZone';

@Pipe({
  name: 'formatPolygonPoints'
})
export class FormatPolygonPointsPipe implements PipeTransform {
  public transform(points: Point[]): string {
    return points.map(p => p.join(',')).join(' ');
  }
}
