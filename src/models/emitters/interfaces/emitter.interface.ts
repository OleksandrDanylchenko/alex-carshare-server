export interface IEmitter {
  readonly emitterId: string;
  readonly activator: string;
  readonly batteryLevel?: number;
  readonly activatedAt?: Date;
  readonly deactivatedAt?: Date;
}
