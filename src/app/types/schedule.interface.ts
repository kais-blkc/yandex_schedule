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

export interface IFromTo extends IResponseBase {
  transport_type?: string;
  popular_title?: string;
  station_type: string;
  short_title: string;
  type: string;
}

interface IThread {
  express_type: null | string;
  thread_method_link: string;
  transport_type: string;
  short_title: string;
  vehicle: string;
  number: string;
  title: string;
  uid: string;
  carrier: {
    code: number;
    title: string;
    codes: {
      sirena: string;
      iata: string;
      icao: string;
    };
    address: string;
    url: string;
    email: null | string;
    contacts: string;
    phone: string;
    logo_svg: string;
    logo: string;
  };
}

export interface ISegment {
  departure_platform: string;
  departure_terminal: string;
  arrival_platform: string;
  arrival_terminal: string;
  except_days: string;
  start_date: string;
  departure: string;
  duration: number;
  arrival: string;
  stops: string;
  days: string;
  from: IFromTo;
  to: IFromTo;

  thread: IThread;
}

export interface ISearchData {
  interval_segments: any;
  pagination: {
    offset: number;
    limit: number;
    total: number;
  };

  search: {
    from: IFromTo;
    to: IFromTo;
    date: any;
  };

  segments: ISegment[];
}
