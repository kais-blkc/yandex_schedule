interface IResponseBase {
  codes: { yandex_code: string };
  title?: string;
}

interface IRegion extends IResponseBase {
  settlements: ISettlement[];
}

interface ISettlement extends IResponseBase {
  codes: {
    esr_code: string;
    yandex_code: string;
  };
  latitude: number;
  longitude: number;
  direction: string;
  station_type: string;
  transport_type: string;
}

export interface ICountry extends IResponseBase {
  regions: IRegion[];
}

export type ISuggest = string[];
