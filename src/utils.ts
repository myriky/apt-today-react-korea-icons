import {
  // 시도
  Seoul,
  Gyeonggi,
  Busan,
  Ulsan,
  Daegu,
  Incheon,
  // 서울 시군구
  DobongGu,
  DongdaemunGu,
  DongjakGu,
  EunpyeongGu,
  GangbukGu,
  GangdongGu,
  GangnamGu,
  GangseoGu,
  GeumcheonGu,
  GuroGu,
  GwanakGu,
  GwangjinGu,
  JongnoGu,
  JungGu,
  JungnangGu,
  MapoGu,
  NowonGu,
  SeochoGu,
  SeodaemunGu,
  SeongbukGu,
  SeongdongGu,
  SongpaGu,
  YangcheonGu,
  YeongdeungpoGu,
  YongsanGu,
  // 경기도 시군구
  SuwonSi,
  GoyangSi,
  YonginSi,
  HwaseongSi,
  SeongnamSi,
  AnyangSi,
  GwangmyeongSi,
  GwacheonSi,
  GuriSi,
  NamyangjuSi,
  HanamSi,
  UiwangSi,
  GimpoSi,
  PajuSi,
  UijeongbuSi,
  // 부산 시군구
  BusanJungGu,
  BusanSeoGu,
  BusanDongGu,
  YeongdoGu,
  BusanjinGu,
  DongnaeGu,
  BusanNamGu,
  BusanBukGu,
  HaeundaeGu,
  SahaGu,
  GeumjeongGu,
  BusanGangseoGu,
  YeonjeGu,
  SuyeongGu,
  SasangGu,
  GijangGun,
  // 울산 시군구
  UlsanJungGu,
  UlsanNamGu,
  UlsanDongGu,
  UlsanBukGu,
  UlsanUljuGun,
  // 대구 시군구
  DaeguJungGu,
  DaeguDongGu,
  DaeguSeoGu,
  DaeguNamGu,
  DaeguBukGu,
  SuseongGu,
  DalseoGu,
  DalseongGun,
  GunwiGun,
  // 인천 시군구
  IncheonJungGu,
  IncheonDongGu,
  MichuholGu,
  YeonsuGu,
  NamdongGu,
  BupyeongGu,
  GeyangGu,
  IncheonSeoGu,
  GanghwaGun,
  OngjinGun,
  // 광주 시군구
  Gwangju,
  GwangjuDongGu,
  GwangjuSeoGu,
  GwangjuNamGu,
  GwangjuBukGu,
  GwangsanGu,
  // 대전 시군구
  Daejeon,
  DaejeonDongGu,
  DaejeonJungGu,
  DaejeonSeoGu,
  YuseongGu,
  DaedeokGu,
  // 강원 시군구
  Gangwon,
  ChuncheonSi,
  WonjuSi,
  GangneungSi,
  DonghaeSi,
  TaebaekSi,
  SokcheoSi,
  SamcheokSi,
  HongcheonGun,
  HoengseongGun,
  YeongwolGun,
  PyeongchangGun,
  JeongseonGun,
  CheorwonGun,
  HwacheonGun,
  YanguGun,
  InjeGun,
  GangwonGoseongGun,
  YangyangGun,
  // 충북 시군구
  Chungbuk,
  CheongjuSi,
  ChungjuSi,
  JecheonSi,
  BoeunGun,
  OkcheonGun,
  YeongdongGun,
  JeungpyeongGun,
  JincheonGun,
  GoesanGun,
  EumseongGun,
  DanyangGun,
  // 충남 시군구
  Chungnam,
  CheonanSi,
  GongjuSi,
  BoryeongSi,
  AsanSi,
  SeosanSi,
  NonsanSi,
  GyeryongSi,
  DangjinSi,
  GeumsanGun,
  BuyeoGun,
  SeocheonGun,
  CheongyangGun,
  HongseongGun,
  YesanGun,
  TaeanGun,
  // 전북 시군구
  Jeonbuk,
  JeonjuSi,
  GunsanSi,
  IksanSi,
  JeongeupSi,
  NamwonSi,
  GimjeSi,
  WanjuGun,
  JinanGun,
  MujuGun,
  JangsuGun,
  ImsilGun,
  SunchangGun,
  GochangGun,
  BuanGun,
  // 전남 시군구
  Jeonnam,
  MokpoSi,
  YeosuSi,
  SuncheonSi,
  NajuSi,
  GwangyangSi,
  DamyangGun,
  GokseongGun,
  GuryeGun,
  GoheungGun,
  BoseongGun,
  HwasunGun,
  JangheungGun,
  GangjinGun,
  HaenamGun,
  YeongamGun,
  MuanGun,
  HampyeongGun,
  YeonggwangGun,
  JangseongGun,
  WandoGun,
  JindoGun,
  SinanGun,
  // 경북 시군구
  Gyeongbuk,
  PohangSi,
  GyeongjuSi,
  GimcheonSi,
  AndongSi,
  GumiSi,
  YeongjuSi,
  YeongcheonSi,
  SangjuSi,
  MungyeongSi,
  GyeongsanSi,
  UiseongGun,
  CheongsongGun,
  YeongyangGun,
  YeongdeokGun,
  CheongdoGun,
  GoryeongGun,
  SeongjuGun,
  ChilgokGun,
  YecheonGun,
  BonghwaGun,
  UljinGun,
  UlleungGun,
  // 경남 시군구
  Gyeongnam,
  ChangwonSi,
  JinjuSi,
  TongyeongSi,
  SacheonSi,
  GimhaeSi,
  MiryangSi,
  GeojeSi,
  YangsanSi,
  UiryeongGun,
  HamanGun,
  ChangnyeongGun,
  GyeongnamGoseongGun,
  NamhaeGun,
  HadongGun,
  SancheongGun,
  HamyangGun,
  GeochangGun,
  HapcheonGun,
  // 제주
  Jeju,
  // 세종
  Sejong,} from "./components";

import type { IconComponent, IconInfo, RegionInfo } from "./types";

// ============================================
// 내부 데이터
// ============================================

const regionData: RegionInfo[] = [
  {
    code: 11,
    name: "서울특별시",
    shortName: "서울",
    englishName: "Seoul",
    component: Seoul,
  },
  {
    code: 26,
    name: "부산광역시",
    shortName: "부산",
    englishName: "Busan",
    component: Busan,
  },
  {
    code: 27,
    name: "대구광역시",
    shortName: "대구",
    englishName: "Daegu",
    component: Daegu,
  },
  {
    code: 28,
    name: "인천광역시",
    shortName: "인천",
    englishName: "Incheon",
    component: Incheon,
  },
  {
    code: 29,
    name: "광주광역시",
    shortName: "광주",
    englishName: "Gwangju",
    component: Gwangju,
  },
  {
    code: 30,
    name: "대전광역시",
    shortName: "대전",
    englishName: "Daejeon",
    component: Daejeon,
  },
  {
    code: 31,
    name: "울산광역시",
    shortName: "울산",
    englishName: "Ulsan",
    component: Ulsan,
  },
  {
    code: 36,
    name: "세종특별자치시",
    shortName: "세종",
    englishName: "Sejong",
    component: Sejong,
  },
  {
    code: 41,
    name: "경기도",
    shortName: "경기",
    englishName: "Gyeonggi",
    component: Gyeonggi,
  },
  {
    code: 42,
    name: "강원특별자치도",
    shortName: "강원",
    englishName: "Gangwon",
    component: Gangwon,
  },
  {
    code: 43,
    name: "충청북도",
    shortName: "충북",
    englishName: "Chungbuk",
    component: Chungbuk,
  },
  {
    code: 44,
    name: "충청남도",
    shortName: "충남",
    englishName: "Chungnam",
    component: Chungnam,
  },
  {
    code: 45,
    name: "전북특별자치도",
    shortName: "전북",
    englishName: "Jeonbuk",
    component: Jeonbuk,
  },
  {
    code: 46,
    name: "전라남도",
    shortName: "전남",
    englishName: "Jeonnam",
    component: Jeonnam,
  },
  {
    code: 47,
    name: "경상북도",
    shortName: "경북",
    englishName: "Gyeongbuk",
    component: Gyeongbuk,
  },
  {
    code: 48,
    name: "경상남도",
    shortName: "경남",
    englishName: "Gyeongnam",
    component: Gyeongnam,
  },
  {
    code: 50,
    name: "제주특별자치도",
    shortName: "제주",
    englishName: "Jeju",
    component: Jeju,
  },
];

interface InternalIconData {
  code: number;
  regionCode: number;
  name: string;
  shortName: string;
  componentName: string;
  component: IconComponent;
}

const iconData: InternalIconData[] = [
  // 서울특별시
  {
    code: 11110,
    regionCode: 11,
    name: "종로구",
    shortName: "종로",
    componentName: "JongnoGu",
    component: JongnoGu,
  },
  {
    code: 11140,
    regionCode: 11,
    name: "중구",
    shortName: "중",
    componentName: "JungGu",
    component: JungGu,
  },
  {
    code: 11170,
    regionCode: 11,
    name: "용산구",
    shortName: "용산",
    componentName: "YongsanGu",
    component: YongsanGu,
  },
  {
    code: 11200,
    regionCode: 11,
    name: "성동구",
    shortName: "성동",
    componentName: "SeongdongGu",
    component: SeongdongGu,
  },
  {
    code: 11215,
    regionCode: 11,
    name: "광진구",
    shortName: "광진",
    componentName: "GwangjinGu",
    component: GwangjinGu,
  },
  {
    code: 11230,
    regionCode: 11,
    name: "동대문구",
    shortName: "동대문",
    componentName: "DongdaemunGu",
    component: DongdaemunGu,
  },
  {
    code: 11260,
    regionCode: 11,
    name: "중랑구",
    shortName: "중랑",
    componentName: "JungnangGu",
    component: JungnangGu,
  },
  {
    code: 11290,
    regionCode: 11,
    name: "성북구",
    shortName: "성북",
    componentName: "SeongbukGu",
    component: SeongbukGu,
  },
  {
    code: 11305,
    regionCode: 11,
    name: "강북구",
    shortName: "강북",
    componentName: "GangbukGu",
    component: GangbukGu,
  },
  {
    code: 11320,
    regionCode: 11,
    name: "도봉구",
    shortName: "도봉",
    componentName: "DobongGu",
    component: DobongGu,
  },
  {
    code: 11350,
    regionCode: 11,
    name: "노원구",
    shortName: "노원",
    componentName: "NowonGu",
    component: NowonGu,
  },
  {
    code: 11380,
    regionCode: 11,
    name: "은평구",
    shortName: "은평",
    componentName: "EunpyeongGu",
    component: EunpyeongGu,
  },
  {
    code: 11410,
    regionCode: 11,
    name: "서대문구",
    shortName: "서대문",
    componentName: "SeodaemunGu",
    component: SeodaemunGu,
  },
  {
    code: 11440,
    regionCode: 11,
    name: "마포구",
    shortName: "마포",
    componentName: "MapoGu",
    component: MapoGu,
  },
  {
    code: 11470,
    regionCode: 11,
    name: "양천구",
    shortName: "양천",
    componentName: "YangcheonGu",
    component: YangcheonGu,
  },
  {
    code: 11500,
    regionCode: 11,
    name: "강서구",
    shortName: "강서",
    componentName: "GangseoGu",
    component: GangseoGu,
  },
  {
    code: 11530,
    regionCode: 11,
    name: "구로구",
    shortName: "구로",
    componentName: "GuroGu",
    component: GuroGu,
  },
  {
    code: 11545,
    regionCode: 11,
    name: "금천구",
    shortName: "금천",
    componentName: "GeumcheonGu",
    component: GeumcheonGu,
  },
  {
    code: 11560,
    regionCode: 11,
    name: "영등포구",
    shortName: "영등포",
    componentName: "YeongdeungpoGu",
    component: YeongdeungpoGu,
  },
  {
    code: 11590,
    regionCode: 11,
    name: "동작구",
    shortName: "동작",
    componentName: "DongjakGu",
    component: DongjakGu,
  },
  {
    code: 11620,
    regionCode: 11,
    name: "관악구",
    shortName: "관악",
    componentName: "GwanakGu",
    component: GwanakGu,
  },
  {
    code: 11650,
    regionCode: 11,
    name: "서초구",
    shortName: "서초",
    componentName: "SeochoGu",
    component: SeochoGu,
  },
  {
    code: 11680,
    regionCode: 11,
    name: "강남구",
    shortName: "강남",
    componentName: "GangnamGu",
    component: GangnamGu,
  },
  {
    code: 11710,
    regionCode: 11,
    name: "송파구",
    shortName: "송파",
    componentName: "SongpaGu",
    component: SongpaGu,
  },
  {
    code: 11740,
    regionCode: 11,
    name: "강동구",
    shortName: "강동",
    componentName: "GangdongGu",
    component: GangdongGu,
  },
  // 경기도
  {
    code: 41110,
    regionCode: 41,
    name: "수원시",
    shortName: "수원",
    componentName: "SuwonSi",
    component: SuwonSi,
  },
  {
    code: 41280,
    regionCode: 41,
    name: "고양시",
    shortName: "고양",
    componentName: "GoyangSi",
    component: GoyangSi,
  },
  {
    code: 41460,
    regionCode: 41,
    name: "용인시",
    shortName: "용인",
    componentName: "YonginSi",
    component: YonginSi,
  },
  {
    code: 41590,
    regionCode: 41,
    name: "화성시",
    shortName: "화성",
    componentName: "HwaseongSi",
    component: HwaseongSi,
  },
  {
    code: 41130,
    regionCode: 41,
    name: "성남시",
    shortName: "성남",
    componentName: "SeongnamSi",
    component: SeongnamSi,
  },
  {
    code: 41170,
    regionCode: 41,
    name: "안양시",
    shortName: "안양",
    componentName: "AnyangSi",
    component: AnyangSi,
  },
  {
    code: 41210,
    regionCode: 41,
    name: "광명시",
    shortName: "광명",
    componentName: "GwangmyeongSi",
    component: GwangmyeongSi,
  },
  {
    code: 41290,
    regionCode: 41,
    name: "과천시",
    shortName: "과천",
    componentName: "GwacheonSi",
    component: GwacheonSi,
  },
  {
    code: 41310,
    regionCode: 41,
    name: "구리시",
    shortName: "구리",
    componentName: "GuriSi",
    component: GuriSi,
  },
  {
    code: 41360,
    regionCode: 41,
    name: "남양주시",
    shortName: "남양주",
    componentName: "NamyangjuSi",
    component: NamyangjuSi,
  },
  {
    code: 41450,
    regionCode: 41,
    name: "하남시",
    shortName: "하남",
    componentName: "HanamSi",
    component: HanamSi,
  },
  {
    code: 41430,
    regionCode: 41,
    name: "의왕시",
    shortName: "의왕",
    componentName: "UiwangSi",
    component: UiwangSi,
  },
  {
    code: 41570,
    regionCode: 41,
    name: "김포시",
    shortName: "김포",
    componentName: "GimpoSi",
    component: GimpoSi,
  },
  {
    code: 41480,
    regionCode: 41,
    name: "파주시",
    shortName: "파주",
    componentName: "PajuSi",
    component: PajuSi,
  },
  {
    code: 41550,
    regionCode: 41,
    name: "의정부시",
    shortName: "의정부",
    componentName: "UijeongbuSi",
    component: UijeongbuSi,
  },
  // 부산광역시
  {
    code: 26110,
    regionCode: 26,
    name: "중구",
    shortName: "중",
    componentName: "BusanJungGu",
    component: BusanJungGu,
  },
  {
    code: 26140,
    regionCode: 26,
    name: "서구",
    shortName: "서",
    componentName: "BusanSeoGu",
    component: BusanSeoGu,
  },
  {
    code: 26170,
    regionCode: 26,
    name: "동구",
    shortName: "동",
    componentName: "BusanDongGu",
    component: BusanDongGu,
  },
  {
    code: 26200,
    regionCode: 26,
    name: "영도구",
    shortName: "영도",
    componentName: "YeongdoGu",
    component: YeongdoGu,
  },
  {
    code: 26230,
    regionCode: 26,
    name: "부산진구",
    shortName: "부산진",
    componentName: "BusanjinGu",
    component: BusanjinGu,
  },
  {
    code: 26260,
    regionCode: 26,
    name: "동래구",
    shortName: "동래",
    componentName: "DongnaeGu",
    component: DongnaeGu,
  },
  {
    code: 26290,
    regionCode: 26,
    name: "남구",
    shortName: "남",
    componentName: "BusanNamGu",
    component: BusanNamGu,
  },
  {
    code: 26320,
    regionCode: 26,
    name: "북구",
    shortName: "북",
    componentName: "BusanBukGu",
    component: BusanBukGu,
  },
  {
    code: 26350,
    regionCode: 26,
    name: "해운대구",
    shortName: "해운대",
    componentName: "HaeundaeGu",
    component: HaeundaeGu,
  },
  {
    code: 26380,
    regionCode: 26,
    name: "사하구",
    shortName: "사하",
    componentName: "SahaGu",
    component: SahaGu,
  },
  {
    code: 26410,
    regionCode: 26,
    name: "금정구",
    shortName: "금정",
    componentName: "GeumjeongGu",
    component: GeumjeongGu,
  },
  {
    code: 26440,
    regionCode: 26,
    name: "강서구",
    shortName: "강서",
    componentName: "BusanGangseoGu",
    component: BusanGangseoGu,
  },
  {
    code: 26470,
    regionCode: 26,
    name: "연제구",
    shortName: "연제",
    componentName: "YeonjeGu",
    component: YeonjeGu,
  },
  {
    code: 26500,
    regionCode: 26,
    name: "수영구",
    shortName: "수영",
    componentName: "SuyeongGu",
    component: SuyeongGu,
  },
  {
    code: 26530,
    regionCode: 26,
    name: "사상구",
    shortName: "사상",
    componentName: "SasangGu",
    component: SasangGu,
  },
  {
    code: 26710,
    regionCode: 26,
    name: "기장군",
    shortName: "기장",
    componentName: "GijangGun",
    component: GijangGun,
  },
  // 울산광역시
  {
    code: 31110,
    regionCode: 31,
    name: "중구",
    shortName: "중",
    componentName: "UlsanJungGu",
    component: UlsanJungGu,
  },
  {
    code: 31140,
    regionCode: 31,
    name: "남구",
    shortName: "남",
    componentName: "UlsanNamGu",
    component: UlsanNamGu,
  },
  {
    code: 31170,
    regionCode: 31,
    name: "동구",
    shortName: "동",
    componentName: "UlsanDongGu",
    component: UlsanDongGu,
  },
  {
    code: 31200,
    regionCode: 31,
    name: "북구",
    shortName: "북",
    componentName: "UlsanBukGu",
    component: UlsanBukGu,
  },
  {
    code: 31710,
    regionCode: 31,
    name: "울주군",
    shortName: "울주",
    componentName: "UlsanUljuGun",
    component: UlsanUljuGun,
  },
  // 대구광역시
  {
    code: 27110,
    regionCode: 27,
    name: "중구",
    shortName: "중",
    componentName: "DaeguJungGu",
    component: DaeguJungGu,
  },
  {
    code: 27140,
    regionCode: 27,
    name: "동구",
    shortName: "동",
    componentName: "DaeguDongGu",
    component: DaeguDongGu,
  },
  {
    code: 27170,
    regionCode: 27,
    name: "서구",
    shortName: "서",
    componentName: "DaeguSeoGu",
    component: DaeguSeoGu,
  },
  {
    code: 27200,
    regionCode: 27,
    name: "남구",
    shortName: "남",
    componentName: "DaeguNamGu",
    component: DaeguNamGu,
  },
  {
    code: 27230,
    regionCode: 27,
    name: "북구",
    shortName: "북",
    componentName: "DaeguBukGu",
    component: DaeguBukGu,
  },
  {
    code: 27260,
    regionCode: 27,
    name: "수성구",
    shortName: "수성",
    componentName: "SuseongGu",
    component: SuseongGu,
  },
  {
    code: 27290,
    regionCode: 27,
    name: "달서구",
    shortName: "달서",
    componentName: "DalseoGu",
    component: DalseoGu,
  },
  {
    code: 27710,
    regionCode: 27,
    name: "달성군",
    shortName: "달성",
    componentName: "DalseongGun",
    component: DalseongGun,
  },
  {
    code: 27720,
    regionCode: 27,
    name: "군위군",
    shortName: "군위",
    componentName: "GunwiGun",
    component: GunwiGun,
  },
  // 인천광역시
  {
    code: 28110,
    regionCode: 28,
    name: "중구",
    shortName: "중",
    componentName: "IncheonJungGu",
    component: IncheonJungGu,
  },
  {
    code: 28140,
    regionCode: 28,
    name: "동구",
    shortName: "동",
    componentName: "IncheonDongGu",
    component: IncheonDongGu,
  },
  {
    code: 28177,
    regionCode: 28,
    name: "미추홀구",
    shortName: "미추홀",
    componentName: "MichuholGu",
    component: MichuholGu,
  },
  {
    code: 28185,
    regionCode: 28,
    name: "연수구",
    shortName: "연수",
    componentName: "YeonsuGu",
    component: YeonsuGu,
  },
  {
    code: 28200,
    regionCode: 28,
    name: "남동구",
    shortName: "남동",
    componentName: "NamdongGu",
    component: NamdongGu,
  },
  {
    code: 28237,
    regionCode: 28,
    name: "부평구",
    shortName: "부평",
    componentName: "BupyeongGu",
    component: BupyeongGu,
  },
  {
    code: 28245,
    regionCode: 28,
    name: "계양구",
    shortName: "계양",
    componentName: "GeyangGu",
    component: GeyangGu,
  },
  {
    code: 28260,
    regionCode: 28,
    name: "서구",
    shortName: "서",
    componentName: "IncheonSeoGu",
    component: IncheonSeoGu,
  },
  {
    code: 28710,
    regionCode: 28,
    name: "강화군",
    shortName: "강화",
    componentName: "GanghwaGun",
    component: GanghwaGun,
  },
  {
    code: 28720,
    regionCode: 28,
    name: "옹진군",
    shortName: "옹진",
    componentName: "OngjinGun",
    component: OngjinGun,
  },
  // 광주광역시
  {
    code: 29110,
    regionCode: 29,
    name: "동구",
    shortName: "동",
    componentName: "GwangjuDongGu",
    component: GwangjuDongGu,
  },
  {
    code: 29140,
    regionCode: 29,
    name: "서구",
    shortName: "서",
    componentName: "GwangjuSeoGu",
    component: GwangjuSeoGu,
  },
  {
    code: 29155,
    regionCode: 29,
    name: "남구",
    shortName: "남",
    componentName: "GwangjuNamGu",
    component: GwangjuNamGu,
  },
  {
    code: 29170,
    regionCode: 29,
    name: "북구",
    shortName: "북",
    componentName: "GwangjuBukGu",
    component: GwangjuBukGu,
  },
  {
    code: 29200,
    regionCode: 29,
    name: "광산구",
    shortName: "광산",
    componentName: "GwangsanGu",
    component: GwangsanGu,
  },
  // 대전광역시
  {
    code: 30110,
    regionCode: 30,
    name: "동구",
    shortName: "동",
    componentName: "DaejeonDongGu",
    component: DaejeonDongGu,
  },
  {
    code: 30140,
    regionCode: 30,
    name: "중구",
    shortName: "중",
    componentName: "DaejeonJungGu",
    component: DaejeonJungGu,
  },
  {
    code: 30170,
    regionCode: 30,
    name: "서구",
    shortName: "서",
    componentName: "DaejeonSeoGu",
    component: DaejeonSeoGu,
  },
  {
    code: 30200,
    regionCode: 30,
    name: "유성구",
    shortName: "유성",
    componentName: "YuseongGu",
    component: YuseongGu,
  },
  {
    code: 30230,
    regionCode: 30,
    name: "대덕구",
    shortName: "대덕",
    componentName: "DaedeokGu",
    component: DaedeokGu,
  },
  // 강원특별자치도
  {
    code: 42110,
    regionCode: 42,
    name: "춘천시",
    shortName: "춘천",
    componentName: "ChuncheonSi",
    component: ChuncheonSi,
  },
  {
    code: 42130,
    regionCode: 42,
    name: "원주시",
    shortName: "원주",
    componentName: "WonjuSi",
    component: WonjuSi,
  },
  {
    code: 42150,
    regionCode: 42,
    name: "강릉시",
    shortName: "강릉",
    componentName: "GangneungSi",
    component: GangneungSi,
  },
  {
    code: 42170,
    regionCode: 42,
    name: "동해시",
    shortName: "동해",
    componentName: "DonghaeSi",
    component: DonghaeSi,
  },
  {
    code: 42190,
    regionCode: 42,
    name: "태백시",
    shortName: "태백",
    componentName: "TaebaekSi",
    component: TaebaekSi,
  },
  {
    code: 42210,
    regionCode: 42,
    name: "속초시",
    shortName: "속초",
    componentName: "SokcheoSi",
    component: SokcheoSi,
  },
  {
    code: 42230,
    regionCode: 42,
    name: "삼척시",
    shortName: "삼척",
    componentName: "SamcheokSi",
    component: SamcheokSi,
  },
  {
    code: 42720,
    regionCode: 42,
    name: "홍천군",
    shortName: "홍천",
    componentName: "HongcheonGun",
    component: HongcheonGun,
  },
  {
    code: 42730,
    regionCode: 42,
    name: "횡성군",
    shortName: "횡성",
    componentName: "HoengseongGun",
    component: HoengseongGun,
  },
  {
    code: 42750,
    regionCode: 42,
    name: "영월군",
    shortName: "영월",
    componentName: "YeongwolGun",
    component: YeongwolGun,
  },
  {
    code: 42760,
    regionCode: 42,
    name: "평창군",
    shortName: "평창",
    componentName: "PyeongchangGun",
    component: PyeongchangGun,
  },
  {
    code: 42770,
    regionCode: 42,
    name: "정선군",
    shortName: "정선",
    componentName: "JeongseonGun",
    component: JeongseonGun,
  },
  {
    code: 42780,
    regionCode: 42,
    name: "철원군",
    shortName: "철원",
    componentName: "CheorwonGun",
    component: CheorwonGun,
  },
  {
    code: 42790,
    regionCode: 42,
    name: "화천군",
    shortName: "화천",
    componentName: "HwacheonGun",
    component: HwacheonGun,
  },
  {
    code: 42800,
    regionCode: 42,
    name: "양구군",
    shortName: "양구",
    componentName: "YanguGun",
    component: YanguGun,
  },
  {
    code: 42810,
    regionCode: 42,
    name: "인제군",
    shortName: "인제",
    componentName: "InjeGun",
    component: InjeGun,
  },
  {
    code: 42820,
    regionCode: 42,
    name: "고성군",
    shortName: "고성",
    componentName: "GangwonGoseongGun",
    component: GangwonGoseongGun,
  },
  {
    code: 42830,
    regionCode: 42,
    name: "양양군",
    shortName: "양양",
    componentName: "YangyangGun",
    component: YangyangGun,
  },
  // 충청북도
  {
    code: 43110,
    regionCode: 43,
    name: "청주시",
    shortName: "청주",
    componentName: "CheongjuSi",
    component: CheongjuSi,
  },
  {
    code: 43130,
    regionCode: 43,
    name: "충주시",
    shortName: "충주",
    componentName: "ChungjuSi",
    component: ChungjuSi,
  },
  {
    code: 43150,
    regionCode: 43,
    name: "제천시",
    shortName: "제천",
    componentName: "JecheonSi",
    component: JecheonSi,
  },
  {
    code: 43720,
    regionCode: 43,
    name: "보은군",
    shortName: "보은",
    componentName: "BoeunGun",
    component: BoeunGun,
  },
  {
    code: 43730,
    regionCode: 43,
    name: "옥천군",
    shortName: "옥천",
    componentName: "OkcheonGun",
    component: OkcheonGun,
  },
  {
    code: 43740,
    regionCode: 43,
    name: "영동군",
    shortName: "영동",
    componentName: "YeongdongGun",
    component: YeongdongGun,
  },
  {
    code: 43745,
    regionCode: 43,
    name: "증평군",
    shortName: "증평",
    componentName: "JeungpyeongGun",
    component: JeungpyeongGun,
  },
  {
    code: 43750,
    regionCode: 43,
    name: "진천군",
    shortName: "진천",
    componentName: "JincheonGun",
    component: JincheonGun,
  },
  {
    code: 43760,
    regionCode: 43,
    name: "괴산군",
    shortName: "괴산",
    componentName: "GoesanGun",
    component: GoesanGun,
  },
  {
    code: 43770,
    regionCode: 43,
    name: "음성군",
    shortName: "음성",
    componentName: "EumseongGun",
    component: EumseongGun,
  },
  {
    code: 43800,
    regionCode: 43,
    name: "단양군",
    shortName: "단양",
    componentName: "DanyangGun",
    component: DanyangGun,
  },
  // 충청남도
  {
    code: 44130,
    regionCode: 44,
    name: "천안시",
    shortName: "천안",
    componentName: "CheonanSi",
    component: CheonanSi,
  },
  {
    code: 44150,
    regionCode: 44,
    name: "공주시",
    shortName: "공주",
    componentName: "GongjuSi",
    component: GongjuSi,
  },
  {
    code: 44180,
    regionCode: 44,
    name: "보령시",
    shortName: "보령",
    componentName: "BoryeongSi",
    component: BoryeongSi,
  },
  {
    code: 44200,
    regionCode: 44,
    name: "아산시",
    shortName: "아산",
    componentName: "AsanSi",
    component: AsanSi,
  },
  {
    code: 44210,
    regionCode: 44,
    name: "서산시",
    shortName: "서산",
    componentName: "SeosanSi",
    component: SeosanSi,
  },
  {
    code: 44230,
    regionCode: 44,
    name: "논산시",
    shortName: "논산",
    componentName: "NonsanSi",
    component: NonsanSi,
  },
  {
    code: 44250,
    regionCode: 44,
    name: "계룡시",
    shortName: "계룡",
    componentName: "GyeryongSi",
    component: GyeryongSi,
  },
  {
    code: 44270,
    regionCode: 44,
    name: "당진시",
    shortName: "당진",
    componentName: "DangjinSi",
    component: DangjinSi,
  },
  {
    code: 44710,
    regionCode: 44,
    name: "금산군",
    shortName: "금산",
    componentName: "GeumsanGun",
    component: GeumsanGun,
  },
  {
    code: 44760,
    regionCode: 44,
    name: "부여군",
    shortName: "부여",
    componentName: "BuyeoGun",
    component: BuyeoGun,
  },
  {
    code: 44770,
    regionCode: 44,
    name: "서천군",
    shortName: "서천",
    componentName: "SeocheonGun",
    component: SeocheonGun,
  },
  {
    code: 44790,
    regionCode: 44,
    name: "청양군",
    shortName: "청양",
    componentName: "CheongyangGun",
    component: CheongyangGun,
  },
  {
    code: 44800,
    regionCode: 44,
    name: "홍성군",
    shortName: "홍성",
    componentName: "HongseongGun",
    component: HongseongGun,
  },
  {
    code: 44810,
    regionCode: 44,
    name: "예산군",
    shortName: "예산",
    componentName: "YesanGun",
    component: YesanGun,
  },
  {
    code: 44825,
    regionCode: 44,
    name: "태안군",
    shortName: "태안",
    componentName: "TaeanGun",
    component: TaeanGun,
  },
  // 전북특별자치도
  {
    code: 45110,
    regionCode: 45,
    name: "전주시",
    shortName: "전주",
    componentName: "JeonjuSi",
    component: JeonjuSi,
  },
  {
    code: 45130,
    regionCode: 45,
    name: "군산시",
    shortName: "군산",
    componentName: "GunsanSi",
    component: GunsanSi,
  },
  {
    code: 45140,
    regionCode: 45,
    name: "익산시",
    shortName: "익산",
    componentName: "IksanSi",
    component: IksanSi,
  },
  {
    code: 45180,
    regionCode: 45,
    name: "정읍시",
    shortName: "정읍",
    componentName: "JeongeupSi",
    component: JeongeupSi,
  },
  {
    code: 45190,
    regionCode: 45,
    name: "남원시",
    shortName: "남원",
    componentName: "NamwonSi",
    component: NamwonSi,
  },
  {
    code: 45210,
    regionCode: 45,
    name: "김제시",
    shortName: "김제",
    componentName: "GimjeSi",
    component: GimjeSi,
  },
  {
    code: 45710,
    regionCode: 45,
    name: "완주군",
    shortName: "완주",
    componentName: "WanjuGun",
    component: WanjuGun,
  },
  {
    code: 45720,
    regionCode: 45,
    name: "진안군",
    shortName: "진안",
    componentName: "JinanGun",
    component: JinanGun,
  },
  {
    code: 45730,
    regionCode: 45,
    name: "무주군",
    shortName: "무주",
    componentName: "MujuGun",
    component: MujuGun,
  },
  {
    code: 45740,
    regionCode: 45,
    name: "장수군",
    shortName: "장수",
    componentName: "JangsuGun",
    component: JangsuGun,
  },
  {
    code: 45750,
    regionCode: 45,
    name: "임실군",
    shortName: "임실",
    componentName: "ImsilGun",
    component: ImsilGun,
  },
  {
    code: 45770,
    regionCode: 45,
    name: "순창군",
    shortName: "순창",
    componentName: "SunchangGun",
    component: SunchangGun,
  },
  {
    code: 45790,
    regionCode: 45,
    name: "고창군",
    shortName: "고창",
    componentName: "GochangGun",
    component: GochangGun,
  },
  {
    code: 45800,
    regionCode: 45,
    name: "부안군",
    shortName: "부안",
    componentName: "BuanGun",
    component: BuanGun,
  },
  // 전라남도
  {
    code: 46110,
    regionCode: 46,
    name: "목포시",
    shortName: "목포",
    componentName: "MokpoSi",
    component: MokpoSi,
  },
  {
    code: 46130,
    regionCode: 46,
    name: "여수시",
    shortName: "여수",
    componentName: "YeosuSi",
    component: YeosuSi,
  },
  {
    code: 46150,
    regionCode: 46,
    name: "순천시",
    shortName: "순천",
    componentName: "SuncheonSi",
    component: SuncheonSi,
  },
  {
    code: 46170,
    regionCode: 46,
    name: "나주시",
    shortName: "나주",
    componentName: "NajuSi",
    component: NajuSi,
  },
  {
    code: 46230,
    regionCode: 46,
    name: "광양시",
    shortName: "광양",
    componentName: "GwangyangSi",
    component: GwangyangSi,
  },
  {
    code: 46710,
    regionCode: 46,
    name: "담양군",
    shortName: "담양",
    componentName: "DamyangGun",
    component: DamyangGun,
  },
  {
    code: 46720,
    regionCode: 46,
    name: "곡성군",
    shortName: "곡성",
    componentName: "GokseongGun",
    component: GokseongGun,
  },
  {
    code: 46730,
    regionCode: 46,
    name: "구례군",
    shortName: "구례",
    componentName: "GuryeGun",
    component: GuryeGun,
  },
  {
    code: 46770,
    regionCode: 46,
    name: "고흥군",
    shortName: "고흥",
    componentName: "GoheungGun",
    component: GoheungGun,
  },
  {
    code: 46780,
    regionCode: 46,
    name: "보성군",
    shortName: "보성",
    componentName: "BoseongGun",
    component: BoseongGun,
  },
  {
    code: 46790,
    regionCode: 46,
    name: "화순군",
    shortName: "화순",
    componentName: "HwasunGun",
    component: HwasunGun,
  },
  {
    code: 46800,
    regionCode: 46,
    name: "장흥군",
    shortName: "장흥",
    componentName: "JangheungGun",
    component: JangheungGun,
  },
  {
    code: 46810,
    regionCode: 46,
    name: "강진군",
    shortName: "강진",
    componentName: "GangjinGun",
    component: GangjinGun,
  },
  {
    code: 46820,
    regionCode: 46,
    name: "해남군",
    shortName: "해남",
    componentName: "HaenamGun",
    component: HaenamGun,
  },
  {
    code: 46830,
    regionCode: 46,
    name: "영암군",
    shortName: "영암",
    componentName: "YeongamGun",
    component: YeongamGun,
  },
  {
    code: 46840,
    regionCode: 46,
    name: "무안군",
    shortName: "무안",
    componentName: "MuanGun",
    component: MuanGun,
  },
  {
    code: 46860,
    regionCode: 46,
    name: "함평군",
    shortName: "함평",
    componentName: "HampyeongGun",
    component: HampyeongGun,
  },
  {
    code: 46870,
    regionCode: 46,
    name: "영광군",
    shortName: "영광",
    componentName: "YeonggwangGun",
    component: YeonggwangGun,
  },
  {
    code: 46880,
    regionCode: 46,
    name: "장성군",
    shortName: "장성",
    componentName: "JangseongGun",
    component: JangseongGun,
  },
  {
    code: 46890,
    regionCode: 46,
    name: "완도군",
    shortName: "완도",
    componentName: "WandoGun",
    component: WandoGun,
  },
  {
    code: 46900,
    regionCode: 46,
    name: "진도군",
    shortName: "진도",
    componentName: "JindoGun",
    component: JindoGun,
  },
  {
    code: 46910,
    regionCode: 46,
    name: "신안군",
    shortName: "신안",
    componentName: "SinanGun",
    component: SinanGun,
  },
  // 경상북도
  {
    code: 47110,
    regionCode: 47,
    name: "포항시",
    shortName: "포항",
    componentName: "PohangSi",
    component: PohangSi,
  },
  {
    code: 47130,
    regionCode: 47,
    name: "경주시",
    shortName: "경주",
    componentName: "GyeongjuSi",
    component: GyeongjuSi,
  },
  {
    code: 47150,
    regionCode: 47,
    name: "김천시",
    shortName: "김천",
    componentName: "GimcheonSi",
    component: GimcheonSi,
  },
  {
    code: 47170,
    regionCode: 47,
    name: "안동시",
    shortName: "안동",
    componentName: "AndongSi",
    component: AndongSi,
  },
  {
    code: 47190,
    regionCode: 47,
    name: "구미시",
    shortName: "구미",
    componentName: "GumiSi",
    component: GumiSi,
  },
  {
    code: 47210,
    regionCode: 47,
    name: "영주시",
    shortName: "영주",
    componentName: "YeongjuSi",
    component: YeongjuSi,
  },
  {
    code: 47230,
    regionCode: 47,
    name: "영천시",
    shortName: "영천",
    componentName: "YeongcheonSi",
    component: YeongcheonSi,
  },
  {
    code: 47250,
    regionCode: 47,
    name: "상주시",
    shortName: "상주",
    componentName: "SangjuSi",
    component: SangjuSi,
  },
  {
    code: 47280,
    regionCode: 47,
    name: "문경시",
    shortName: "문경",
    componentName: "MungyeongSi",
    component: MungyeongSi,
  },
  {
    code: 47290,
    regionCode: 47,
    name: "경산시",
    shortName: "경산",
    componentName: "GyeongsanSi",
    component: GyeongsanSi,
  },
  {
    code: 47730,
    regionCode: 47,
    name: "의성군",
    shortName: "의성",
    componentName: "UiseongGun",
    component: UiseongGun,
  },
  {
    code: 47750,
    regionCode: 47,
    name: "청송군",
    shortName: "청송",
    componentName: "CheongsongGun",
    component: CheongsongGun,
  },
  {
    code: 47760,
    regionCode: 47,
    name: "영양군",
    shortName: "영양",
    componentName: "YeongyangGun",
    component: YeongyangGun,
  },
  {
    code: 47770,
    regionCode: 47,
    name: "영덕군",
    shortName: "영덕",
    componentName: "YeongdeokGun",
    component: YeongdeokGun,
  },
  {
    code: 47820,
    regionCode: 47,
    name: "청도군",
    shortName: "청도",
    componentName: "CheongdoGun",
    component: CheongdoGun,
  },
  {
    code: 47830,
    regionCode: 47,
    name: "고령군",
    shortName: "고령",
    componentName: "GoryeongGun",
    component: GoryeongGun,
  },
  {
    code: 47840,
    regionCode: 47,
    name: "성주군",
    shortName: "성주",
    componentName: "SeongjuGun",
    component: SeongjuGun,
  },
  {
    code: 47850,
    regionCode: 47,
    name: "칠곡군",
    shortName: "칠곡",
    componentName: "ChilgokGun",
    component: ChilgokGun,
  },
  {
    code: 47900,
    regionCode: 47,
    name: "예천군",
    shortName: "예천",
    componentName: "YecheonGun",
    component: YecheonGun,
  },
  {
    code: 47920,
    regionCode: 47,
    name: "봉화군",
    shortName: "봉화",
    componentName: "BonghwaGun",
    component: BonghwaGun,
  },
  {
    code: 47930,
    regionCode: 47,
    name: "울진군",
    shortName: "울진",
    componentName: "UljinGun",
    component: UljinGun,
  },
  {
    code: 47940,
    regionCode: 47,
    name: "울릉군",
    shortName: "울릉",
    componentName: "UlleungGun",
    component: UlleungGun,
  },
  // 경상남도
  {
    code: 48120,
    regionCode: 48,
    name: "창원시",
    shortName: "창원",
    componentName: "ChangwonSi",
    component: ChangwonSi,
  },
  {
    code: 48170,
    regionCode: 48,
    name: "진주시",
    shortName: "진주",
    componentName: "JinjuSi",
    component: JinjuSi,
  },
  {
    code: 48220,
    regionCode: 48,
    name: "통영시",
    shortName: "통영",
    componentName: "TongyeongSi",
    component: TongyeongSi,
  },
  {
    code: 48240,
    regionCode: 48,
    name: "사천시",
    shortName: "사천",
    componentName: "SacheonSi",
    component: SacheonSi,
  },
  {
    code: 48250,
    regionCode: 48,
    name: "김해시",
    shortName: "김해",
    componentName: "GimhaeSi",
    component: GimhaeSi,
  },
  {
    code: 48270,
    regionCode: 48,
    name: "밀양시",
    shortName: "밀양",
    componentName: "MiryangSi",
    component: MiryangSi,
  },
  {
    code: 48310,
    regionCode: 48,
    name: "거제시",
    shortName: "거제",
    componentName: "GeojeSi",
    component: GeojeSi,
  },
  {
    code: 48330,
    regionCode: 48,
    name: "양산시",
    shortName: "양산",
    componentName: "YangsanSi",
    component: YangsanSi,
  },
  {
    code: 48720,
    regionCode: 48,
    name: "의령군",
    shortName: "의령",
    componentName: "UiryeongGun",
    component: UiryeongGun,
  },
  {
    code: 48730,
    regionCode: 48,
    name: "함안군",
    shortName: "함안",
    componentName: "HamanGun",
    component: HamanGun,
  },
  {
    code: 48740,
    regionCode: 48,
    name: "창녕군",
    shortName: "창녕",
    componentName: "ChangnyeongGun",
    component: ChangnyeongGun,
  },
  {
    code: 48820,
    regionCode: 48,
    name: "고성군",
    shortName: "고성",
    componentName: "GyeongnamGoseongGun",
    component: GyeongnamGoseongGun,
  },
  {
    code: 48840,
    regionCode: 48,
    name: "남해군",
    shortName: "남해",
    componentName: "NamhaeGun",
    component: NamhaeGun,
  },
  {
    code: 48850,
    regionCode: 48,
    name: "하동군",
    shortName: "하동",
    componentName: "HadongGun",
    component: HadongGun,
  },
  {
    code: 48860,
    regionCode: 48,
    name: "산청군",
    shortName: "산청",
    componentName: "SancheongGun",
    component: SancheongGun,
  },
  {
    code: 48870,
    regionCode: 48,
    name: "함양군",
    shortName: "함양",
    componentName: "HamyangGun",
    component: HamyangGun,
  },
  {
    code: 48880,
    regionCode: 48,
    name: "거창군",
    shortName: "거창",
    componentName: "GeochangGun",
    component: GeochangGun,
  },
  {
    code: 48890,
    regionCode: 48,
    name: "합천군",
    shortName: "합천",
    componentName: "HapcheonGun",
    component: HapcheonGun,
  },
];

// ============================================
// 내부 조회용 맵 (초기화)
// ============================================

const regionCodeMap = new Map<number, RegionInfo>(
  regionData.map((r) => [r.code, r]),
);

const regionShortNameMap = new Map<string, RegionInfo>(
  regionData.map((r) => [r.shortName, r]),
);

const iconCodeMap = new Map<number, InternalIconData>(
  iconData.map((i) => [i.code, i]),
);

// 이름 → 아이콘 데이터 (중복 가능)
const nameToIconMap = new Map<string, InternalIconData[]>();

function addToNameMap(key: string, data: InternalIconData) {
  const existing = nameToIconMap.get(key);
  if (existing) {
    existing.push(data);
  } else {
    nameToIconMap.set(key, [data]);
  }
}

iconData.forEach((icon) => {
  const region = regionCodeMap.get(icon.regionCode);
  if (region) {
    addToNameMap(icon.name, icon); // "강남구"
    addToNameMap(icon.shortName, icon); // "강남"
    addToNameMap(`${region.name} ${icon.name}`, icon); // "서울특별시 강남구"
    addToNameMap(`${region.shortName} ${icon.name}`, icon); // "서울 강남구"
  }
});

// ============================================
// 내부 헬퍼
// ============================================

function toIconInfo(data: InternalIconData): IconInfo {
  const region = regionCodeMap.get(data.regionCode);
  return {
    code: data.code,
    regionCode: data.regionCode,
    regionName: region?.name ?? "",
    name: data.name,
    shortName: data.shortName,
    componentName: data.componentName,
    component: data.component,
  };
}

// ============================================
// Public utils 객체
// ============================================

export const utils = {
  /**
   * 코드로 아이콘 컴포넌트를 가져옵니다.
   * 시도 코드(2자리)와 시군구 코드(5자리)를 자동으로 판별합니다.
   *
   * @example
   * utils.getIcon(11)    // 서울특별시
   * utils.getIcon(11680) // 강남구
   */
  getIcon(code: number): IconComponent | null {
    // 시도 코드 (2자리)
    if (code < 100) {
      return regionCodeMap.get(code)?.component ?? null;
    }
    // 시군구 코드 (5자리)
    return iconCodeMap.get(code)?.component ?? null;
  },

  /**
   * 이름으로 아이콘 컴포넌트를 검색합니다.
   * 다양한 형식을 지원합니다.
   *
   * @example
   * utils.findByName("강남구")              // OK
   * utils.findByName("강남")                // OK
   * utils.findByName("서울특별시 강남구")    // OK
   * utils.findByName("서울 강남구")         // OK
   * utils.findByName("중구", { region: "서울" }) // 중복 이름 해소
   */
  findByName(
    name: string,
    options?: { region?: string },
  ): IconComponent | null {
    const list = nameToIconMap.get(name);
    if (!list || list.length === 0) return null;

    if (options?.region) {
      const region = regionShortNameMap.get(options.region);
      if (!region) return null;
      const filtered = list.filter((i) => i.regionCode === region.code);
      return filtered.length === 1 ? filtered[0].component : null;
    }

    return list.length === 1 ? list[0].component : null;
  },

  /**
   * 코드로 아이콘 상세 정보를 가져옵니다.
   * 시도 코드(2자리)는 RegionInfo를, 시군구 코드(5자리)는 IconInfo를 반환합니다.
   *
   * @example
   * utils.getInfo(11680)  // { code: 11680, name: "강남구", regionName: "서울특별시", ... }
   */
  getInfo(code: number): IconInfo | RegionInfo | null {
    if (code < 100) {
      return regionCodeMap.get(code) ?? null;
    }
    const data = iconCodeMap.get(code);
    return data ? toIconInfo(data) : null;
  },

  /**
   * 특정 시도에 속한 모든 시군구 아이콘 정보를 반환합니다.
   * 시도 코드(숫자) 또는 단축명(문자열) 모두 사용 가능합니다.
   *
   * @example
   * utils.getByRegion(11)     // 서울시 모든 구
   * utils.getByRegion("서울") // 서울시 모든 구
   * utils.getByRegion("경기") // 경기도 모든 시
   */
  getByRegion(regionCodeOrName: number | string): IconInfo[] {
    let code: number | undefined;

    if (typeof regionCodeOrName === "number") {
      code = regionCodeOrName;
    } else {
      code = regionShortNameMap.get(regionCodeOrName)?.code;
    }

    if (code === undefined) return [];
    return iconData.filter((i) => i.regionCode === code).map(toIconInfo);
  },

  /**
   * 모든 시도(광역자치단체) 정보를 반환합니다.
   *
   * @example
   * const regions = utils.getAllRegions()
   * // [{ code: 11, name: "서울특별시", ... }, ...]
   */
  getAllRegions(): readonly RegionInfo[] {
    return regionData;
  },

  /**
   * 아이콘이 있는 시도 정보만 반환합니다.
   */
  getAvailableRegions(): RegionInfo[] {
    return regionData.filter((r) => r.component !== null);
  },

  /**
   * 시군구가 있는 시도 정보만 반환합니다.
   */
  getRegionsWithIcons(): RegionInfo[] {
    return regionData.filter((r) => {
      return iconData.some((i) => i.regionCode === r.code);
    });
  },

  /**
   * 모든 시군구 아이콘 정보를 반환합니다.
   *
   * @example
   * const all = utils.getAll()
   * all.map(icon => <icon.component key={icon.code} width={48} />)
   */
  getAll(): readonly IconInfo[] {
    return iconData.map(toIconInfo);
  },

  /**
   * 유효한 시도 또는 시군구 코드인지 확인합니다.
   *
   * @example
   * utils.isValid(11680)  // true (강남구)
   * utils.isValid(11)     // true (서울특별시)
   * utils.isValid(99999)  // false
   */
  isValid(code: number): boolean {
    if (code < 100) return regionCodeMap.has(code);
    return iconCodeMap.has(code);
  },
};
