import { Component, Signal, computed } from '@angular/core';
import { BatteryService } from '../battery.service';

@Component({
  selector: 'app-battery',
  standalone: true,
  imports: [],
  templateUrl: './battery.component.html',
  styleUrl: './battery.component.css'
})
export class BatteryComponent {
  batterylevel: Signal<number> = computed(() => this.batteryService.getBatteryLevel());
  isCharging: Signal<boolean> = computed(() => this.batteryService.isBatteryCharging());
  chargingTime: Signal<number> = computed(() => this.batteryService.getChargingTime());
  dischargingTime: Signal<number> = computed(() => this.batteryService.getDischargingTime());

  constructor(private batteryService: BatteryService) {
  }


}
