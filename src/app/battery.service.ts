import { Injectable, InjectionToken, Signal, inject, WritableSignal, signal} from '@angular/core';
import { Observable } from 'rxjs';

declare global {
  interface Navigator {
    getBattery(): Promise<Battery>
  }
}

type Battery = {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  addEventListener(event: 
    'chargingchange' | 'chargingchangetime' | 'dischargingchangetime' | 'levelchange', func: () => void): void;
}


const BATTERY_MANAGER = new InjectionToken<Promise<Battery>>("This is the battery manager of the system", {providedIn: 'root', factory: () => navigator.getBattery()})

@Injectable({
  providedIn: 'root'
})
export class BatteryService {
  private batteryManager = inject(BATTERY_MANAGER);
  getBatteryLevel: WritableSignal<number> = signal<number>(0);
  isBatteryCharging: WritableSignal<boolean> = signal<boolean>(false);
  getChargingTime: WritableSignal<number> =  signal<number>(0);
  getDischargingTime: WritableSignal<number> = signal<number>(0);

  constructor() { 
    this.open();
  }

  private open() {
    this.batteryManager
    .then(battery => {
      this.initializeData(battery);
      battery.addEventListener('levelchange', () => {
        this.getBatteryLevel.set(battery.level);
      });
      battery.addEventListener('chargingchange', () => {
        this.isBatteryCharging.set(battery.charging);
      });
      battery.addEventListener('chargingchangetime', () => {
        this.getChargingTime.set(battery.chargingTime);
      });
      battery.addEventListener('dischargingchangetime', () => {
        this.getDischargingTime.set(battery.dischargingTime);
      });
    })
  }

  private initializeData(battery: Battery) {
    this.getBatteryLevel.set(battery.level);
    this.getChargingTime.set(battery.chargingTime);
    this.getDischargingTime.set(battery.dischargingTime);
    this.isBatteryCharging.set(battery.charging);
  }
}
