export interface ScheduleResponse {
  rozvrhovaAkce: RozvrhovaAkce[];
}

export interface RozvrhovaAkce {
  roakIdno: number;
  nazev: string;
  katedra: string;
  predmet: string;
  statut: string;
  ucitIdno: number;
  ucitel: Ucitel;
  rok: string;
  budova: string;
  mistnost: string;
  kapacitaMistnosti: number;
  planObsazeni: number;
  obsazeni: number;
  typAkce: string;
  typAkceZkr: string;
  semestr: string;
  platnost: string;
  den: string;
  denZkr: string;
  hodinaOd: number;
  hodinaDo: number;
  pocetVyucHodin: number;
  hodinaSkutOd: { value: string };
  hodinaSkutDo: { value: string };
  tydenOd: number;
  tydenDo: number;
  tyden: string;
  tydenZkr: string;
  grupIdno: number | null;
  jeNadrazena: string;
  maNadrazenou: string;
  kontakt: string;
  krouzky: string;
  casovaRada: string;
  datum: string | null;
  datumOd: { value: string };
  datumDo: { value: string };
  druhAkce: string;
  vsichniUciteleUcitIdno: string;
  vsichniUciteleJmenaTituly: string;
  vsichniUciteleJmenaTitulySPodily: string;
  vsichniUcitelePrijmeni: string;
  referencedIdno: number;
  poznamkaRozvrhare: string | null;
  nekonaSe: string | null;
  owner: string;
  zakazaneAkce: string | null;
}

export interface Ucitel {
  ucitIdno: number;
  jmeno: string;
  prijmeni: string;
  titulPred: string;
  titulZa: string;
  platnost: string;
  zamestnanec: string;
  podilNaVyuce: number;
}