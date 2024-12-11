export interface StudentSubjectDetail {
    katedra: string;
    zkratka: string;
    rok: string;
    semestr: string;
    os_cislo: string;
    jmeno: string;
    prijmeni: string;
    titul: string;
    nesplnene_prerekvizity: string;
    predmetUznany: string;
    zk_tyhoidno: number | null;
    zk_hodnidno: number | null;
    zk_typ_hodnoceni: string;
    zk_datum: string;
    zk_hodnoceni: string;
    zk_body: string;
    zk_pokus: string;
    zk_ucit_idno: string;
    zk_jazyk: string;
    zk_ucit_jmeno: string;
    zppzk_tyhoidno: number | null;
    zppzk_hodnidno: number | null;
    zppzk_typ_hodnoceni: string | null;
    zppzk_datum: string;
    zppzk_hodnoceni: string;
    zppzk_pokus: string;
    zppzk_ucit_idno: string;
    zppzk_ucit_jmeno: string;
    zppzk_uznan: string;
    stavAbsolvovani: string;
  }
  
  export interface StudentSubjectDetailResponse {
    student_na_predmetu: StudentSubjectDetail[];
  }