import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateZoneComponent } from './create-zone.component';
import { HttpClientModule } from '@angular/common/http';
import { ZonesService } from 'src/app/services/zones.service';
import { of } from 'rxjs';
import { IZone } from 'src/app/interfaces/IZone';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

describe('CreateZoneComponent', () => {
  let component: CreateZoneComponent;
  let fixture: ComponentFixture<CreateZoneComponent>;
  let mockZonesService: jasmine.SpyObj<ZonesService>;

  const mockZone: IZone = { id: '1', name: 'Zone 1', points: [] };

  beforeEach(() => {
    mockZonesService = jasmine.createSpyObj('ZonesService', ['zones$', 'fetchAllZones', 'deleteZoneById']);
    mockZonesService.zones$ = of([mockZone]);
    mockZonesService.fetchAllZones.and.returnValue(of([mockZone]));
    mockZonesService.deleteZoneById.and.returnValue(of());
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [CreateZoneComponent],
      providers: [
        { provide: ZonesService, useValue: mockZonesService },
      ]
    });
    fixture = TestBed.createComponent(CreateZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
