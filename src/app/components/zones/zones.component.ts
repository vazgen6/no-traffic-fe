import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IZone } from 'src/app/interfaces/IZone';
import { ZonesService } from 'src/app/services/zones.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZonesComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource$ = this.zonesService.zones$;
  public selectedZone!: IZone;

  constructor(
    private zonesService: ZonesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.zonesService.fetchAllZones().subscribe();
  }

  public preview(zone: IZone): void {
    this.selectedZone = zone;
  }

  public delete(zone: IZone): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Are you sure you want to delete ${zone.name}` },
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.zonesService.deleteZoneById(zone.id).subscribe();
      }
    });

  }
}
