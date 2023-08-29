import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneComponent } from './zone.component';
import { FormatSvgPointsPipe } from 'src/app/pipes/format-svg-points.pipe';
import { FormatPolygonPointsPipe } from 'src/app/pipes/format-polygon-points.pipe';
import { IZone } from 'src/app/interfaces/IZone';
import { HttpClientModule } from '@angular/common/http';

describe('ZoneComponent', () => {
  let component: ZoneComponent;
  let fixture: ComponentFixture<ZoneComponent>;
  const mockZone: IZone = { id: '1', name: 'Test Zone', points: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ZoneComponent,
        FormatSvgPointsPipe,
        FormatPolygonPointsPipe,
      ],
      providers: [
        HttpClientModule,
      ]
    });
    fixture = TestBed.createComponent(ZoneComponent);
    component = fixture.componentInstance;
    component.zone = mockZone;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
