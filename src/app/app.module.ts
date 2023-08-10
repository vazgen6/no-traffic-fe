import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZonesComponent } from './components/zones/zones.component';
import { ZoneComponent } from './components/zones/zone/zone.component';
import { CreateZoneComponent } from './components/zones/create-zone/create-zone.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

// material
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { FormatSvgPointsPipe } from './pipes/format-svg-points.pipe';
import { FormatPolygonPointsPipe } from './pipes/format-polygon-points.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ZonesComponent,
    ZoneComponent,
    CreateZoneComponent,
    FormatPolygonPointsPipe,
    FormatSvgPointsPipe,
    ConfirmationDialogComponent,
  ],
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
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
