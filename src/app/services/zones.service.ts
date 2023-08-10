import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IZone } from '../interfaces/IZone';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {
  private baseUrl = 'http://localhost:3000/api/zones';
  private zones = new BehaviorSubject<IZone[]>([]);
  public zones$ = this.zones.asObservable();

  constructor(private http: HttpClient) { }

  public fetchAllZones(): Observable<IZone[]> {
    return this.http
      .get<IZone[]>(this.baseUrl)
      .pipe(tap(zones => this.zones.next(zones)));
  }

  public createZone(zone: Omit<IZone, 'id'>): Observable<IZone> {
    return this.http.post<IZone>(this.baseUrl, zone)
      .pipe(tap(zone => this.zones.next([...this.zones.value, zone])));
  }

  public deleteZoneById(zoneId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${zoneId}`)
      .pipe(
        tap(() => this.zones.next([...this.zones.value.filter(z => z.id !== zoneId)]))
      );
  }
}
