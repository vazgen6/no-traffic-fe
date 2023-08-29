import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZonesComponent } from './zones.component';
import { ZonesService } from 'src/app/services/zones.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IZone } from 'src/app/interfaces/IZone';
import { of } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ZoneComponent } from './zone/zone.component';
import { CreateZoneComponent } from './create-zone/create-zone.component';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('ZonesComponent', () => {
  let component: ZonesComponent;
  let fixture: ComponentFixture<ZonesComponent>;
  let mockZonesService: jasmine.SpyObj<ZonesService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  const mockZone: IZone = { id: '1', name: 'Zone 1', points: [] };

  beforeEach(waitForAsync(() => {
    mockZonesService = jasmine.createSpyObj('ZonesService', ['zones$', 'fetchAllZones', 'deleteZoneById']);
    mockZonesService.zones$ = of([mockZone]);
    mockZonesService.fetchAllZones.and.returnValue(of([mockZone]));
    mockZonesService.deleteZoneById.and.returnValue(of());

    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockDialog.open.and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<ConfirmationDialogComponent, boolean>);

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatToolbarModule,
        MatButtonModule,
        MatGridListModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatDialogModule,
      ],
      declarations: [ZonesComponent, ZoneComponent, CreateZoneComponent],
      providers: [
        { provide: ZonesService, useValue: mockZonesService },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch zones on component initialization', () => {
    expect(mockZonesService.fetchAllZones).toHaveBeenCalled();
  });

  it('should set selected zone when preview is called', () => {
    const zoneToPreview: IZone = { id: '2', name: 'Zone 2', points: [] };
    component.preview(zoneToPreview);
    expect(component.selectedZone).toEqual(zoneToPreview);
  });

  it('should open confirmation dialog and delete zone when confirmed', () => {
    component.delete(mockZone);

    expect(mockDialog.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to delete ${mockZone.name}` },
    });

    expect(mockZonesService.deleteZoneById).toHaveBeenCalledWith(mockZone.id);
  });
});
