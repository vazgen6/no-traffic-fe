import { Pipe, PipeTransform } from '@angular/core';
import { Point } from '../interfaces/IZone';

@Pipe({
  name: 'formatSvgPoints'
})
export class FormatSvgPointsPipe implements PipeTransform {
  public transform(points: Point[]): string {
    const xPoints: number[] = [];
    const yPoints: number[] = [];

    points.forEach(([x, y]) => { xPoints.push(x); yPoints.push(y); });

    const minXPoint: number = Math.min(...xPoints);
    const minYPoint: number = Math.min(...yPoints);
    const width: number = Math.max(...xPoints) - minXPoint;
    const height: number = Math.max(...yPoints) - minYPoint;

    return `${minXPoint} ${minYPoint} ${width} ${height}`;
  }
}
