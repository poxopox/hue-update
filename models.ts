export class Light {
  state?: LightState;
  swupdate?: {
    state?: string;
    lastinstall?: Date;
  };
  type?: string;
  name?: string;
  modelid?: string;
  manufacturername?: string;
  productname?: string;
  capabilities?: {
    certified?: boolean;
    control?: {
      mindimlevel?: number;
      maxlumen?: number;
      colorgamuttype?: string;
      colorgamut?: number[][];
      ct: LightCT;
    };
    streaming?: {
      renderer?: boolean;
      proxy?: boolean;
    };
  };
  config?: LightConfig;
  uniqueid?: string;
  swversion?: string;
  swconfigid?: string;
  productid?: string;



}

interface LightConfig {
  archetype?: string;
  function?: string;
  direction?: string;
  startup?: {
    mode?: string;
    configured?: boolean;
  };
}

export interface LightCT {
  min?: number;
  max?: number;
}

export interface Hub {
  id: string;
  internalipaddress: string;
}

export interface LightState {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: number[];
  ct: number;
  alert: string;
  colormode: string;
  mode: string;
  reachable: boolean;
}
