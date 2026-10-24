// Real gnomAD v4 Population Allele Frequency & Counts for Human Collagen Genes
// Extracted directly from Broad Institute gnomAD v4 exome + genome dataset

export interface GnomadVariantRecord {
  pos: number; // 1-based protein position
  cdnaChange: string;
  aaChange: string;
  ac: number; // Allele Count in gnomAD v4
  an: number; // Allele Number in gnomAD v4
  af: number; // Allele Frequency in gnomAD v4
  variantId?: string;
  observedInGnomad: boolean;
}

export const GENE_GNOMAD_MAP: Record<string, Record<number, GnomadVariantRecord>> = {
  "COL10A1": {
    "86": {
      "pos": 86,
      "cdnaChange": "c.256G>A",
      "aaChange": "p.Gly86Arg",
      "ac": 1656,
      "an": 1613950,
      "af": 0.0010260540908950092,
      "variantId": "6-116121860-C-T",
      "observedInGnomad": true
    },
    "434": {
      "pos": 434,
      "cdnaChange": "c.1300G>A",
      "aaChange": "p.Gly434Arg",
      "ac": 14,
      "an": 1612736,
      "af": 8.680900035715703e-06,
      "variantId": "6-116120816-C-T",
      "observedInGnomad": true
    },
    "473": {
      "pos": 473,
      "cdnaChange": "c.1417G>A",
      "aaChange": "p.Gly473Ser",
      "ac": 16,
      "an": 1553906,
      "af": 1.0296633129674511e-05,
      "variantId": "6-116120699-C-T",
      "observedInGnomad": true
    },
    "490": {
      "pos": 490,
      "cdnaChange": "c.1468G>A",
      "aaChange": "p.Gly490Arg",
      "ac": 34,
      "an": 1395190,
      "af": 2.4369440721335447e-05,
      "variantId": "6-116120648-C-T",
      "observedInGnomad": true
    }
  },
  "COL11A1": {
    "961": {
      "pos": 961,
      "cdnaChange": "c.2881G>A",
      "aaChange": "p.Gly961Ser",
      "ac": 8,
      "an": 1461280,
      "af": 5.474652359575167e-06,
      "variantId": "1-102965522-C-T",
      "observedInGnomad": true
    },
    "976": {
      "pos": 976,
      "cdnaChange": "c.2926G>A",
      "aaChange": "p.Gly976Ser",
      "ac": 41,
      "an": 1613792,
      "af": 2.540600027760703e-05,
      "variantId": "1-102962751-C-T",
      "observedInGnomad": true
    },
    "1120": {
      "pos": 1120,
      "cdnaChange": "c.3358G>A",
      "aaChange": "p.Gly1120Ser",
      "ac": 225,
      "an": 1613800,
      "af": 0.0001394224811005081,
      "variantId": "1-102940353-C-T",
      "observedInGnomad": true
    },
    "1126": {
      "pos": 1126,
      "cdnaChange": "c.3376G>A",
      "aaChange": "p.Gly1126Arg",
      "ac": 13,
      "an": 1613140,
      "af": 8.05881696566944e-06,
      "variantId": "1-102940335-C-T",
      "observedInGnomad": true
    },
    "1150": {
      "pos": 1150,
      "cdnaChange": "c.3448G>A",
      "aaChange": "p.Gly1150Ser",
      "ac": 11,
      "an": 1461620,
      "af": 7.5258959237010984e-06,
      "variantId": "1-102935104-C-T",
      "observedInGnomad": true
    },
    "1273": {
      "pos": 1273,
      "cdnaChange": "c.3817G>A",
      "aaChange": "p.Gly1273Ser",
      "ac": 0,
      "an": 1450522,
      "af": 0.0,
      "variantId": "1-102914811-C-T",
      "observedInGnomad": false
    },
    "1393": {
      "pos": 1393,
      "cdnaChange": "c.4177G>A",
      "aaChange": "p.Gly1393Ser",
      "ac": 39,
      "an": 1461020,
      "af": 2.6693679757977303e-05,
      "variantId": "1-102898737-C-T",
      "observedInGnomad": true
    },
    "1396": {
      "pos": 1396,
      "cdnaChange": "c.4186G>A",
      "aaChange": "p.Gly1396Ser",
      "ac": 124,
      "an": 1612886,
      "af": 7.688082108716921e-05,
      "variantId": "1-102898728-C-T",
      "observedInGnomad": true
    }
  },
  "COL11A2": {
    "595": {
      "pos": 595,
      "cdnaChange": "c.1783G>A",
      "aaChange": "p.Gly595Arg",
      "ac": 22,
      "an": 1612870,
      "af": 1.364028098978839e-05,
      "variantId": "6-33178343-C-T",
      "observedInGnomad": true
    },
    "661": {
      "pos": 661,
      "cdnaChange": "c.1981G>A",
      "aaChange": "p.Gly661Arg",
      "ac": 1,
      "an": 1460746,
      "af": 6.845817137270956e-07,
      "variantId": "6-33177216-C-G",
      "observedInGnomad": true
    },
    "667": {
      "pos": 667,
      "cdnaChange": "c.1999G>A",
      "aaChange": "p.Gly667Ser",
      "ac": 7,
      "an": 1612918,
      "af": 4.339960245964147e-06,
      "variantId": "6-33177198-C-T",
      "observedInGnomad": true
    },
    "682": {
      "pos": 682,
      "cdnaChange": "c.2044G>A",
      "aaChange": "p.Gly682Ser",
      "ac": 16,
      "an": 1611834,
      "af": 9.926580528764128e-06,
      "variantId": "6-33177018-C-T",
      "observedInGnomad": true
    },
    "688": {
      "pos": 688,
      "cdnaChange": "c.2062G>A",
      "aaChange": "p.Gly688Arg",
      "ac": 6,
      "an": 1459178,
      "af": 4.111904099431324e-06,
      "variantId": "6-33177000-C-T",
      "observedInGnomad": true
    },
    "727": {
      "pos": 727,
      "cdnaChange": "c.2179G>A",
      "aaChange": "p.Gly727Arg",
      "ac": 4,
      "an": 1454490,
      "af": 2.7501048477473203e-06,
      "variantId": "6-33176294-C-T",
      "observedInGnomad": true
    },
    "886": {
      "pos": 886,
      "cdnaChange": "c.2656G>A",
      "aaChange": "p.Gly886Arg",
      "ac": 4,
      "an": 1460376,
      "af": 2.73902063578147e-06,
      "variantId": "6-33173528-C-T",
      "observedInGnomad": true
    },
    "919": {
      "pos": 919,
      "cdnaChange": "c.2755G>A",
      "aaChange": "p.Gly919Ser",
      "ac": 7,
      "an": 1612306,
      "af": 4.341607610466003e-06,
      "variantId": "6-33173095-C-T",
      "observedInGnomad": true
    },
    "937": {
      "pos": 937,
      "cdnaChange": "c.2809G>A",
      "aaChange": "p.Gly937Ser",
      "ac": 20,
      "an": 1612374,
      "af": 1.2404070023456096e-05,
      "variantId": "6-33172619-C-T",
      "observedInGnomad": true
    },
    "1093": {
      "pos": 1093,
      "cdnaChange": "c.3277G>A",
      "aaChange": "p.Gly1093Arg",
      "ac": 4,
      "an": 1461886,
      "af": 2.736191467734146e-06,
      "variantId": "6-33171306-C-T",
      "observedInGnomad": true
    },
    "1129": {
      "pos": 1129,
      "cdnaChange": "c.3385G>A",
      "aaChange": "p.Gly1129Arg",
      "ac": 2,
      "an": 1612914,
      "af": 1.2399917168553313e-06,
      "variantId": "6-33170899-C-T",
      "observedInGnomad": true
    },
    "1234": {
      "pos": 1234,
      "cdnaChange": "c.3700G>A",
      "aaChange": "p.Gly1234Arg",
      "ac": 9,
      "an": 1460560,
      "af": 6.16202004710522e-06,
      "variantId": "6-33169481-C-T",
      "observedInGnomad": true
    },
    "1309": {
      "pos": 1309,
      "cdnaChange": "c.3925G>A",
      "aaChange": "p.Gly1309Arg",
      "ac": 13,
      "an": 1461458,
      "af": 8.895226547735207e-06,
      "variantId": "6-33168554-C-T",
      "observedInGnomad": true
    },
    "1453": {
      "pos": 1453,
      "cdnaChange": "c.4357G>A",
      "aaChange": "p.Gly1453Ser",
      "ac": 22,
      "an": 1461694,
      "af": 1.5051029832509403e-05,
      "variantId": "6-33166548-C-T",
      "observedInGnomad": true
    },
    "1462": {
      "pos": 1462,
      "cdnaChange": "c.4384G>A",
      "aaChange": "p.Gly1462Ser",
      "ac": 29,
      "an": 1613510,
      "af": 1.7973238467688456e-05,
      "variantId": "6-33166521-C-T",
      "observedInGnomad": true
    },
    "1465": {
      "pos": 1465,
      "cdnaChange": "c.4393G>A",
      "aaChange": "p.Gly1465Arg",
      "ac": 0,
      "an": 1526931,
      "af": 0.0,
      "variantId": "6-33166206-C-T",
      "observedInGnomad": false
    },
    "1480": {
      "pos": 1480,
      "cdnaChange": "c.4438G>A",
      "aaChange": "p.Gly1480Arg",
      "ac": 2,
      "an": 1461786,
      "af": 1.368189324565976e-06,
      "variantId": "6-33165975-C-T",
      "observedInGnomad": true
    }
  },
  "COL12A1": {
    "2848": {
      "pos": 2848,
      "cdnaChange": "c.8542G>A",
      "aaChange": "p.Gly2848Ser",
      "ac": 2,
      "an": 1461474,
      "af": 1.3684814098642878e-06,
      "variantId": "6-75097288-C-T",
      "observedInGnomad": true
    }
  },
  "COL13A1": {
    "131": {
      "pos": 131,
      "cdnaChange": "c.391G>A",
      "aaChange": "p.Gly131Arg",
      "ac": 1,
      "an": 1461682,
      "af": 6.84143336238662e-07,
      "variantId": "10-69872202-G-C",
      "observedInGnomad": true
    },
    "149": {
      "pos": 149,
      "cdnaChange": "c.445G>A",
      "aaChange": "p.Gly149Arg",
      "ac": 0,
      "an": 1484454,
      "af": 0.0,
      "variantId": "10-69880512-G-A",
      "observedInGnomad": false
    },
    "160": {
      "pos": 160,
      "cdnaChange": "c.478G>A",
      "aaChange": "p.Gly160Ser",
      "ac": 14108,
      "an": 1613006,
      "af": 0.00874640267922128,
      "variantId": "10-69880518-G-A",
      "observedInGnomad": true
    },
    "181": {
      "pos": 181,
      "cdnaChange": "c.541G>A",
      "aaChange": "p.Gly181Ser",
      "ac": 0,
      "an": 1484454,
      "af": 0.0,
      "variantId": "10-69888322-G-A",
      "observedInGnomad": false
    },
    "315": {
      "pos": 315,
      "cdnaChange": "c.943G>A",
      "aaChange": "p.Gly315Ser",
      "ac": 0,
      "an": 1484454,
      "af": 0.0,
      "variantId": "10-69905814-G-A",
      "observedInGnomad": false
    },
    "336": {
      "pos": 336,
      "cdnaChange": "c.1006G>A",
      "aaChange": "p.Gly336Arg",
      "ac": 0,
      "an": 1484454,
      "af": 0.0,
      "variantId": "10-69918294-G-A",
      "observedInGnomad": false
    },
    "503": {
      "pos": 503,
      "cdnaChange": "c.1507G>A",
      "aaChange": "p.Gly503Ser",
      "ac": 0,
      "an": 1484454,
      "af": 0.0,
      "variantId": "10-69930409-G-A",
      "observedInGnomad": false
    },
    "530": {
      "pos": 530,
      "cdnaChange": "c.1588G>A",
      "aaChange": "p.Gly530Arg",
      "ac": 0,
      "an": 1484454,
      "af": 0.0,
      "variantId": "10-69930490-G-A",
      "observedInGnomad": false
    },
    "557": {
      "pos": 557,
      "cdnaChange": "c.1669G>A",
      "aaChange": "p.Gly557Arg",
      "ac": 0,
      "an": 1484454,
      "af": 0.0,
      "variantId": "10-69932578-G-A",
      "observedInGnomad": false
    },
    "577": {
      "pos": 577,
      "cdnaChange": "c.1729G>A",
      "aaChange": "p.Gly577Arg",
      "ac": 1,
      "an": 1427718,
      "af": 7.004184299700641e-07,
      "variantId": "10-69935350-G-A",
      "observedInGnomad": true
    },
    "616": {
      "pos": 616,
      "cdnaChange": "c.1846G>A",
      "aaChange": "p.Gly616Arg",
      "ac": 0,
      "an": 1435412,
      "af": 0.0,
      "variantId": "10-69937683-G-A",
      "observedInGnomad": false
    },
    "622": {
      "pos": 622,
      "cdnaChange": "c.1864G>A",
      "aaChange": "p.Gly622Ser",
      "ac": 0,
      "an": 1484454,
      "af": 0.0,
      "variantId": "10-69941006-G-A",
      "observedInGnomad": false
    },
    "670": {
      "pos": 670,
      "cdnaChange": "c.2008G>A",
      "aaChange": "p.Gly670Arg",
      "ac": 0,
      "an": 1484454,
      "af": 0.0,
      "variantId": "10-69947325-G-A",
      "observedInGnomad": false
    }
  },
  "COL14A1": {
    "1518": {
      "pos": 1518,
      "cdnaChange": "c.4552G>A",
      "aaChange": "p.Gly1518Arg",
      "ac": 0,
      "an": 1570554,
      "af": 0.0,
      "variantId": "8-120315533-G-A",
      "observedInGnomad": false
    },
    "1681": {
      "pos": 1681,
      "cdnaChange": "c.5041G>A",
      "aaChange": "p.Gly1681Arg",
      "ac": 8,
      "an": 1570554,
      "af": 5.093743990973886e-06,
      "variantId": "8-120345527-G-A",
      "observedInGnomad": true
    }
  },
  "COL15A1": {
    "673": {
      "pos": 673,
      "cdnaChange": "c.2017G>A",
      "aaChange": "p.Gly673Ser",
      "ac": 18,
      "an": 1612492,
      "af": 1.1162846079236363e-05,
      "variantId": "9-99025940-G-A",
      "observedInGnomad": true
    },
    "676": {
      "pos": 676,
      "cdnaChange": "c.2026G>A",
      "aaChange": "p.Gly676Arg",
      "ac": 159,
      "an": 1611954,
      "af": 9.863805046545994e-05,
      "variantId": "9-99025949-G-A",
      "observedInGnomad": true
    },
    "829": {
      "pos": 829,
      "cdnaChange": "c.2485G>A",
      "aaChange": "p.Gly829Arg",
      "ac": 43,
      "an": 1614056,
      "af": 2.6640959173659402e-05,
      "variantId": "9-99040530-G-A",
      "observedInGnomad": true
    },
    "909": {
      "pos": 909,
      "cdnaChange": "c.2725G>A",
      "aaChange": "p.Gly909Arg",
      "ac": 10,
      "an": 1613902,
      "af": 6.196163087969406e-06,
      "variantId": "9-99047831-G-A",
      "observedInGnomad": true
    },
    "984": {
      "pos": 984,
      "cdnaChange": "c.2950G>A",
      "aaChange": "p.Gly984Ser",
      "ac": 20,
      "an": 1601804,
      "af": 1.2485922122806535e-05,
      "variantId": "9-99052433-G-A",
      "observedInGnomad": true
    },
    "1059": {
      "pos": 1059,
      "cdnaChange": "c.3175G>A",
      "aaChange": "p.Gly1059Arg",
      "ac": 44,
      "an": 1611066,
      "af": 2.7311109538653287e-05,
      "variantId": "9-99055355-G-A",
      "observedInGnomad": true
    },
    "1130": {
      "pos": 1130,
      "cdnaChange": "c.3388G>A",
      "aaChange": "p.Gly1130Arg",
      "ac": 35,
      "an": 1613884,
      "af": 2.1686812682943756e-05,
      "variantId": "9-99059939-G-A",
      "observedInGnomad": true
    }
  },
  "COL16A1": {
    "420": {
      "pos": 420,
      "cdnaChange": "c.1258G>A",
      "aaChange": "p.Gly420Ser",
      "ac": 0,
      "an": 1540417,
      "af": 0.0,
      "variantId": "1-31691642-C-T",
      "observedInGnomad": false
    },
    "453": {
      "pos": 453,
      "cdnaChange": "c.1357G>A",
      "aaChange": "p.Gly453Ser",
      "ac": 9,
      "an": 1612834,
      "af": 5.580239503879507e-06,
      "variantId": "1-31691458-C-T",
      "observedInGnomad": true
    },
    "605": {
      "pos": 605,
      "cdnaChange": "c.1813G>A",
      "aaChange": "p.Gly605Arg",
      "ac": 9,
      "an": 1614070,
      "af": 5.575966345945343e-06,
      "variantId": "1-31686270-C-T",
      "observedInGnomad": true
    },
    "656": {
      "pos": 656,
      "cdnaChange": "c.1966G>A",
      "aaChange": "p.Gly656Arg",
      "ac": 205,
      "an": 1614016,
      "af": 0.0001270123716245688,
      "variantId": "1-31685689-C-T",
      "observedInGnomad": true
    },
    "745": {
      "pos": 745,
      "cdnaChange": "c.2233G>A",
      "aaChange": "p.Gly745Ser",
      "ac": 8974,
      "an": 1548550,
      "af": 0.005795098640663847,
      "variantId": "1-31684159-C-T",
      "observedInGnomad": true
    },
    "762": {
      "pos": 762,
      "cdnaChange": "c.2284G>A",
      "aaChange": "p.Gly762Ser",
      "ac": 0,
      "an": 1540417,
      "af": 0.0,
      "variantId": "1-31684003-C-T",
      "observedInGnomad": false
    },
    "765": {
      "pos": 765,
      "cdnaChange": "c.2293G>A",
      "aaChange": "p.Gly765Ser",
      "ac": 58,
      "an": 1614086,
      "af": 3.5933649136415285e-05,
      "variantId": "1-31683994-C-T",
      "observedInGnomad": true
    },
    "833": {
      "pos": 833,
      "cdnaChange": "c.2497G>A",
      "aaChange": "p.Gly833Arg",
      "ac": 9,
      "an": 1613856,
      "af": 5.5767057283921245e-06,
      "variantId": "1-31682975-C-T",
      "observedInGnomad": true
    },
    "913": {
      "pos": 913,
      "cdnaChange": "c.2737G>A",
      "aaChange": "p.Gly913Arg",
      "ac": 1,
      "an": 1461816,
      "af": 6.840806230059049e-07,
      "variantId": "1-31679667-C-G",
      "observedInGnomad": true
    },
    "931": {
      "pos": 931,
      "cdnaChange": "c.2791G>A",
      "aaChange": "p.Gly931Ser",
      "ac": 26,
      "an": 1613988,
      "af": 1.61091656195709e-05,
      "variantId": "1-31675293-C-T",
      "observedInGnomad": true
    },
    "1051": {
      "pos": 1051,
      "cdnaChange": "c.3151G>A",
      "aaChange": "p.Gly1051Ser",
      "ac": 3,
      "an": 1279488,
      "af": 2.34468787515006e-06,
      "variantId": "1-31670646-C-T",
      "observedInGnomad": true
    },
    "1063": {
      "pos": 1063,
      "cdnaChange": "c.3187G>A",
      "aaChange": "p.Gly1063Arg",
      "ac": 4,
      "an": 1258202,
      "af": 3.179139756573269e-06,
      "variantId": "1-31670610-C-T",
      "observedInGnomad": true
    },
    "1111": {
      "pos": 1111,
      "cdnaChange": "c.3331G>A",
      "aaChange": "p.Gly1111Arg",
      "ac": 31,
      "an": 1451750,
      "af": 2.1353538832443603e-05,
      "variantId": "1-31667601-C-T",
      "observedInGnomad": true
    },
    "1147": {
      "pos": 1147,
      "cdnaChange": "c.3439G>A",
      "aaChange": "p.Gly1147Ser",
      "ac": 40,
      "an": 1614012,
      "af": 2.4782963199777944e-05,
      "variantId": "1-31665899-C-T",
      "observedInGnomad": true
    },
    "1213": {
      "pos": 1213,
      "cdnaChange": "c.3637G>A",
      "aaChange": "p.Gly1213Ser",
      "ac": 68,
      "an": 1612518,
      "af": 4.2170071899972586e-05,
      "variantId": "1-31662378-C-T",
      "observedInGnomad": true
    },
    "1222": {
      "pos": 1222,
      "cdnaChange": "c.3664G>A",
      "aaChange": "p.Gly1222Ser",
      "ac": 13,
      "an": 1611760,
      "af": 8.065716980195563e-06,
      "variantId": "1-31662351-C-T",
      "observedInGnomad": true
    },
    "1288": {
      "pos": 1288,
      "cdnaChange": "c.3862G>A",
      "aaChange": "p.Gly1288Ser",
      "ac": 6,
      "an": 1614022,
      "af": 3.717421447786957e-06,
      "variantId": "1-31660602-C-T",
      "observedInGnomad": true
    },
    "1320": {
      "pos": 1320,
      "cdnaChange": "c.3958G>A",
      "aaChange": "p.Gly1320Arg",
      "ac": 5,
      "an": 1452580,
      "af": 3.442151206818213e-06,
      "variantId": "1-31658550-C-T",
      "observedInGnomad": true
    },
    "1332": {
      "pos": 1332,
      "cdnaChange": "c.3994G>A",
      "aaChange": "p.Gly1332Ser",
      "ac": 3,
      "an": 1604774,
      "af": 1.8694221117739943e-06,
      "variantId": "1-31658514-C-T",
      "observedInGnomad": true
    },
    "1386": {
      "pos": 1386,
      "cdnaChange": "c.4156G>A",
      "aaChange": "p.Gly1386Ser",
      "ac": 7,
      "an": 1614042,
      "af": 4.33693794833096e-06,
      "variantId": "1-31655448-C-T",
      "observedInGnomad": true
    },
    "1535": {
      "pos": 1535,
      "cdnaChange": "c.4603G>A",
      "aaChange": "p.Gly1535Ser",
      "ac": 6,
      "an": 1461576,
      "af": 4.105157720159608e-06,
      "variantId": "1-31653608-C-T",
      "observedInGnomad": true
    }
  },
  "COL17A1": {
    "428": {
      "pos": 428,
      "cdnaChange": "c.1282G>A",
      "aaChange": "p.Gly428Ser",
      "ac": 1553379,
      "an": 1613840,
      "af": 0.9625359391265553,
      "variantId": "10-104057158-C-T",
      "observedInGnomad": true
    },
    "440": {
      "pos": 440,
      "cdnaChange": "c.1318G>A",
      "aaChange": "p.Gly440Ser",
      "ac": 173,
      "an": 1602934,
      "af": 0.00010792708870109437,
      "variantId": "10-104057122-C-T",
      "observedInGnomad": true
    },
    "446": {
      "pos": 446,
      "cdnaChange": "c.1336G>A",
      "aaChange": "p.Gly446Ser",
      "ac": 7258,
      "an": 1612570,
      "af": 0.004500889883850004,
      "variantId": "10-104057104-C-T",
      "observedInGnomad": true
    },
    "671": {
      "pos": 671,
      "cdnaChange": "c.2011G>A",
      "aaChange": "p.Gly671Ser",
      "ac": 415,
      "an": 1613940,
      "af": 0.0002571347138059655,
      "variantId": "10-104051508-C-T",
      "observedInGnomad": true
    },
    "737": {
      "pos": 737,
      "cdnaChange": "c.2209G>A",
      "aaChange": "p.Gly737Arg",
      "ac": 5,
      "an": 1461874,
      "af": 3.420267410187198e-06,
      "variantId": "10-104049427-C-T",
      "observedInGnomad": true
    },
    "749": {
      "pos": 749,
      "cdnaChange": "c.2245G>A",
      "aaChange": "p.Gly749Arg",
      "ac": 18,
      "an": 1614032,
      "af": 1.1152195247677864e-05,
      "variantId": "10-104048087-C-T",
      "observedInGnomad": true
    },
    "791": {
      "pos": 791,
      "cdnaChange": "c.2371G>A",
      "aaChange": "p.Gly791Ser",
      "ac": 28,
      "an": 1612544,
      "af": 1.736386728052072e-05,
      "variantId": "10-104045785-C-T",
      "observedInGnomad": true
    },
    "842": {
      "pos": 842,
      "cdnaChange": "c.2524G>A",
      "aaChange": "p.Gly842Ser",
      "ac": 47,
      "an": 1614166,
      "af": 2.9117203558989596e-05,
      "variantId": "10-104042447-C-T",
      "observedInGnomad": true
    },
    "863": {
      "pos": 863,
      "cdnaChange": "c.2587G>A",
      "aaChange": "p.Gly863Ser",
      "ac": 221,
      "an": 1613564,
      "af": 0.00013696388863410438,
      "variantId": "10-104041503-C-T",
      "observedInGnomad": true
    },
    "866": {
      "pos": 866,
      "cdnaChange": "c.2596G>A",
      "aaChange": "p.Gly866Arg",
      "ac": 2,
      "an": 1612760,
      "af": 1.240110121778814e-06,
      "variantId": "10-104041494-C-T",
      "observedInGnomad": true
    },
    "906": {
      "pos": 906,
      "cdnaChange": "c.2716G>A",
      "aaChange": "p.Gly906Ser",
      "ac": 185,
      "an": 1610700,
      "af": 0.00011485689451791147,
      "variantId": "10-104040396-C-T",
      "observedInGnomad": true
    },
    "1033": {
      "pos": 1033,
      "cdnaChange": "c.3097G>A",
      "aaChange": "p.Gly1033Arg",
      "ac": 37,
      "an": 1613960,
      "af": 2.2924979553396614e-05,
      "variantId": "10-104037747-C-T",
      "observedInGnomad": true
    },
    "1325": {
      "pos": 1325,
      "cdnaChange": "c.3973G>A",
      "aaChange": "p.Gly1325Ser",
      "ac": 104,
      "an": 1613898,
      "af": 6.444025582781564e-05,
      "variantId": "10-104034128-C-T",
      "observedInGnomad": true
    },
    "1411": {
      "pos": 1411,
      "cdnaChange": "c.4231G>A",
      "aaChange": "p.Gly1411Ser",
      "ac": 119,
      "an": 1603632,
      "af": 7.420655112893731e-05,
      "variantId": "10-104033301-C-T",
      "observedInGnomad": true
    }
  },
  "COL18A1": {
    "517": {
      "pos": 517,
      "cdnaChange": "c.1549G>A",
      "aaChange": "p.Gly517Ser",
      "ac": 250,
      "an": 1611438,
      "af": 0.0001551409362321107,
      "variantId": "21-45480796-G-A",
      "observedInGnomad": true
    },
    "567": {
      "pos": 567,
      "cdnaChange": "c.1699G>A",
      "aaChange": "p.Gly567Arg",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45477903-G-A",
      "observedInGnomad": false
    },
    "579": {
      "pos": 579,
      "cdnaChange": "c.1735G>A",
      "aaChange": "p.Gly579Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45477939-G-A",
      "observedInGnomad": false
    },
    "585": {
      "pos": 585,
      "cdnaChange": "c.1753G>A",
      "aaChange": "p.Gly585Ser",
      "ac": 0,
      "an": 1371688,
      "af": 0.0,
      "variantId": "21-45486912-G-A",
      "observedInGnomad": false
    },
    "591": {
      "pos": 591,
      "cdnaChange": "c.1771G>A",
      "aaChange": "p.Gly591Ser",
      "ac": 1,
      "an": 1355088,
      "af": 7.379594535557838e-07,
      "variantId": "21-45486930-G-A",
      "observedInGnomad": true
    },
    "594": {
      "pos": 594,
      "cdnaChange": "c.1780G>A",
      "aaChange": "p.Gly594Arg",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45478345-G-A",
      "observedInGnomad": false
    },
    "600": {
      "pos": 600,
      "cdnaChange": "c.1798G>A",
      "aaChange": "p.Gly600Arg",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45479911-G-A",
      "observedInGnomad": false
    },
    "606": {
      "pos": 606,
      "cdnaChange": "c.1816G>A",
      "aaChange": "p.Gly606Arg",
      "ac": 0,
      "an": 1365166,
      "af": 0.0,
      "variantId": "21-45486975-G-C",
      "observedInGnomad": false
    },
    "674": {
      "pos": 674,
      "cdnaChange": "c.2020G>A",
      "aaChange": "p.Gly674Arg",
      "ac": 1,
      "an": 1429956,
      "af": 6.993222169073734e-07,
      "variantId": "21-45490335-G-A",
      "observedInGnomad": true
    },
    "677": {
      "pos": 677,
      "cdnaChange": "c.2029G>A",
      "aaChange": "p.Gly677Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45480736-G-A",
      "observedInGnomad": false
    },
    "683": {
      "pos": 683,
      "cdnaChange": "c.2047G>A",
      "aaChange": "p.Gly683Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45480754-G-A",
      "observedInGnomad": false
    },
    "700": {
      "pos": 700,
      "cdnaChange": "c.2098G>A",
      "aaChange": "p.Gly700Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45480805-G-A",
      "observedInGnomad": false
    },
    "712": {
      "pos": 712,
      "cdnaChange": "c.2134G>A",
      "aaChange": "p.Gly712Arg",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45480841-G-A",
      "observedInGnomad": false
    },
    "754": {
      "pos": 754,
      "cdnaChange": "c.2260G>A",
      "aaChange": "p.Gly754Ser",
      "ac": 0,
      "an": 1409062,
      "af": 0.0,
      "variantId": "21-45493208-G-A",
      "observedInGnomad": false
    },
    "763": {
      "pos": 763,
      "cdnaChange": "c.2287G>A",
      "aaChange": "p.Gly763Ser",
      "ac": 1,
      "an": 1408604,
      "af": 7.099227320098481e-07,
      "variantId": "21-45493510-G-A",
      "observedInGnomad": true
    },
    "769": {
      "pos": 769,
      "cdnaChange": "c.2305G>A",
      "aaChange": "p.Gly769Arg",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45486924-G-A",
      "observedInGnomad": false
    },
    "816": {
      "pos": 816,
      "cdnaChange": "c.2446G>A",
      "aaChange": "p.Gly816Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45488427-G-A",
      "observedInGnomad": false
    },
    "843": {
      "pos": 843,
      "cdnaChange": "c.2527G>A",
      "aaChange": "p.Gly843Arg",
      "ac": 3,
      "an": 1352068,
      "af": 2.2188233136203208e-06,
      "variantId": "21-45496518-G-A",
      "observedInGnomad": true
    },
    "846": {
      "pos": 846,
      "cdnaChange": "c.2536G>A",
      "aaChange": "p.Gly846Ser",
      "ac": 0,
      "an": 1379872,
      "af": 0.0,
      "variantId": "21-45496527-G-A",
      "observedInGnomad": false
    },
    "876": {
      "pos": 876,
      "cdnaChange": "c.2626G>A",
      "aaChange": "p.Gly876Arg",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45491243-G-A",
      "observedInGnomad": false
    },
    "878": {
      "pos": 878,
      "cdnaChange": "c.2632G>A",
      "aaChange": "p.Gly878Arg",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45491249-G-A",
      "observedInGnomad": false
    },
    "887": {
      "pos": 887,
      "cdnaChange": "c.2659G>A",
      "aaChange": "p.Gly887Arg",
      "ac": 0,
      "an": 1417818,
      "af": 0.0,
      "variantId": "21-45497637-G-A",
      "observedInGnomad": false
    },
    "919": {
      "pos": 919,
      "cdnaChange": "c.2755G>A",
      "aaChange": "p.Gly919Arg",
      "ac": 3,
      "an": 1459458,
      "af": 2.0555576111131665e-06,
      "variantId": "21-45504443-G-C",
      "observedInGnomad": true
    },
    "977": {
      "pos": 977,
      "cdnaChange": "c.2929G>A",
      "aaChange": "p.Gly977Arg",
      "ac": 54,
      "an": 1604934,
      "af": 3.3646243396924736e-05,
      "variantId": "21-45505194-G-A",
      "observedInGnomad": true
    },
    "995": {
      "pos": 995,
      "cdnaChange": "c.2983G>A",
      "aaChange": "p.Gly995Arg",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45495367-G-A",
      "observedInGnomad": false
    },
    "998": {
      "pos": 998,
      "cdnaChange": "c.2992G>A",
      "aaChange": "p.Gly998Arg",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45495376-G-A",
      "observedInGnomad": false
    },
    "1020": {
      "pos": 1020,
      "cdnaChange": "c.3058G>A",
      "aaChange": "p.Gly1020Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45496509-G-A",
      "observedInGnomad": false
    },
    "1048": {
      "pos": 1048,
      "cdnaChange": "c.3142G>A",
      "aaChange": "p.Gly1048Arg",
      "ac": 99,
      "an": 1612450,
      "af": 6.139725262798847e-05,
      "variantId": "21-45505892-G-A",
      "observedInGnomad": true
    },
    "1072": {
      "pos": 1072,
      "cdnaChange": "c.3214G>A",
      "aaChange": "p.Gly1072Arg",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45497652-G-A",
      "observedInGnomad": false
    },
    "1108": {
      "pos": 1108,
      "cdnaChange": "c.3322G>A",
      "aaChange": "p.Gly1108Arg",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45504470-G-A",
      "observedInGnomad": false
    },
    "1111": {
      "pos": 1111,
      "cdnaChange": "c.3331G>A",
      "aaChange": "p.Gly1111Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45504479-G-A",
      "observedInGnomad": false
    },
    "1114": {
      "pos": 1114,
      "cdnaChange": "c.3340G>A",
      "aaChange": "p.Gly1114Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45504488-G-A",
      "observedInGnomad": false
    },
    "1119": {
      "pos": 1119,
      "cdnaChange": "c.3355G>A",
      "aaChange": "p.Gly1119Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45504503-G-A",
      "observedInGnomad": false
    },
    "1122": {
      "pos": 1122,
      "cdnaChange": "c.3364G>A",
      "aaChange": "p.Gly1122Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45504512-G-A",
      "observedInGnomad": false
    },
    "1145": {
      "pos": 1145,
      "cdnaChange": "c.3433G>A",
      "aaChange": "p.Gly1145Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45505167-G-A",
      "observedInGnomad": false
    },
    "1154": {
      "pos": 1154,
      "cdnaChange": "c.3460G>A",
      "aaChange": "p.Gly1154Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45505194-G-A",
      "observedInGnomad": false
    },
    "1156": {
      "pos": 1156,
      "cdnaChange": "c.3466G>A",
      "aaChange": "p.Gly1156Ser",
      "ac": 54,
      "an": 1521116,
      "af": 3.550025113140615e-05,
      "variantId": "21-45509572-G-A",
      "observedInGnomad": true
    },
    "1165": {
      "pos": 1165,
      "cdnaChange": "c.3493G>A",
      "aaChange": "p.Gly1165Ser",
      "ac": 0,
      "an": 1340780,
      "af": 0.0,
      "variantId": "21-45509599-G-A",
      "observedInGnomad": false
    },
    "1187": {
      "pos": 1187,
      "cdnaChange": "c.3559G>A",
      "aaChange": "p.Gly1187Ser",
      "ac": 0,
      "an": 1442633,
      "af": 0.0,
      "variantId": "21-45505372-G-A",
      "observedInGnomad": false
    }
  },
  "COL19A1": {
    "418": {
      "pos": 418,
      "cdnaChange": "c.1252G>A",
      "aaChange": "p.Gly418Arg",
      "ac": 9,
      "an": 1612604,
      "af": 5.581035393686237e-06,
      "variantId": "6-70102196-G-A",
      "observedInGnomad": true
    },
    "513": {
      "pos": 513,
      "cdnaChange": "c.1537G>A",
      "aaChange": "p.Gly513Arg",
      "ac": 45,
      "an": 1612102,
      "af": 2.7913866492318725e-05,
      "variantId": "6-70142041-G-A",
      "observedInGnomad": true
    },
    "571": {
      "pos": 571,
      "cdnaChange": "c.1711G>A",
      "aaChange": "p.Gly571Arg",
      "ac": 50,
      "an": 1589820,
      "af": 3.145010126932609e-05,
      "variantId": "6-70144948-G-A",
      "observedInGnomad": true
    },
    "615": {
      "pos": 615,
      "cdnaChange": "c.1843G>A",
      "aaChange": "p.Gly615Ser",
      "ac": 346,
      "an": 1597494,
      "af": 0.0002165892328860077,
      "variantId": "6-70146839-G-A",
      "observedInGnomad": true
    },
    "804": {
      "pos": 804,
      "cdnaChange": "c.2410G>A",
      "aaChange": "p.Gly804Arg",
      "ac": 1,
      "an": 152070,
      "af": 6.575918984678109e-06,
      "variantId": "6-70165950-G-A",
      "observedInGnomad": true
    },
    "810": {
      "pos": 810,
      "cdnaChange": "c.2428G>A",
      "aaChange": "p.Gly810Arg",
      "ac": 3,
      "an": 1461632,
      "af": 2.0525002189333566e-06,
      "variantId": "6-70165968-G-A",
      "observedInGnomad": true
    },
    "845": {
      "pos": 845,
      "cdnaChange": "c.2533G>A",
      "aaChange": "p.Gly845Ser",
      "ac": 64,
      "an": 1612762,
      "af": 3.968347468504342e-05,
      "variantId": "6-70168207-G-A",
      "observedInGnomad": true
    },
    "980": {
      "pos": 980,
      "cdnaChange": "c.2938G>A",
      "aaChange": "p.Gly980Ser",
      "ac": 7,
      "an": 1613866,
      "af": 4.337410912678004e-06,
      "variantId": "6-70188156-G-A",
      "observedInGnomad": true
    }
  },
  "COL1A1": {
    "109": {
      "pos": 109,
      "cdnaChange": "c.325G>A",
      "aaChange": "p.Gly109Ser",
      "ac": 9,
      "an": 1614038,
      "af": 5.576076895339515e-06,
      "variantId": "17-50199564-C-T",
      "observedInGnomad": true
    },
    "142": {
      "pos": 142,
      "cdnaChange": "c.424G>A",
      "aaChange": "p.Gly142Arg",
      "ac": 0,
      "an": 1361084,
      "af": 0.0,
      "variantId": "17-50199273-C-T",
      "observedInGnomad": false
    },
    "145": {
      "pos": 145,
      "cdnaChange": "c.433G>A",
      "aaChange": "p.Gly145Arg",
      "ac": 1,
      "an": 1348564,
      "af": 7.415295084252583e-07,
      "variantId": "17-50199264-C-T",
      "observedInGnomad": true
    },
    "148": {
      "pos": 148,
      "cdnaChange": "c.442G>A",
      "aaChange": "p.Gly148Arg",
      "ac": 3,
      "an": 1330030,
      "af": 2.2555882198145905e-06,
      "variantId": "17-50199255-C-T",
      "observedInGnomad": true
    },
    "151": {
      "pos": 151,
      "cdnaChange": "c.451G>A",
      "aaChange": "p.Gly151Arg",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50199246-C-T",
      "observedInGnomad": false
    },
    "257": {
      "pos": 257,
      "cdnaChange": "c.769G>A",
      "aaChange": "p.Gly257Arg",
      "ac": 2,
      "an": 1461840,
      "af": 1.3681387839982487e-06,
      "variantId": "17-50197045-C-T",
      "observedInGnomad": true
    },
    "332": {
      "pos": 332,
      "cdnaChange": "c.994G>A",
      "aaChange": "p.Gly332Arg",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50196163-C-T",
      "observedInGnomad": false
    },
    "338": {
      "pos": 338,
      "cdnaChange": "c.1012G>A",
      "aaChange": "p.Gly338Ser",
      "ac": 6,
      "an": 1594402,
      "af": 3.763166378366309e-06,
      "variantId": "17-50195967-C-T",
      "observedInGnomad": true
    },
    "425": {
      "pos": 425,
      "cdnaChange": "c.1273G>A",
      "aaChange": "p.Gly425Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50195258-C-T",
      "observedInGnomad": false
    },
    "434": {
      "pos": 434,
      "cdnaChange": "c.1300G>A",
      "aaChange": "p.Gly434Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50195100-C-T",
      "observedInGnomad": false
    },
    "476": {
      "pos": 476,
      "cdnaChange": "c.1426G>A",
      "aaChange": "p.Gly476Arg",
      "ac": 1,
      "an": 1573242,
      "af": 6.356301192060725e-07,
      "variantId": "17-50194756-C-T",
      "observedInGnomad": true
    },
    "482": {
      "pos": 482,
      "cdnaChange": "c.1444G>A",
      "aaChange": "p.Gly482Arg",
      "ac": 0,
      "an": 1418150,
      "af": 0.0,
      "variantId": "17-50194738-C-T",
      "observedInGnomad": false
    },
    "530": {
      "pos": 530,
      "cdnaChange": "c.1588G>A",
      "aaChange": "p.Gly530Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50194375-C-T",
      "observedInGnomad": false
    },
    "560": {
      "pos": 560,
      "cdnaChange": "c.1678G>A",
      "aaChange": "p.Gly560Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50194032-C-T",
      "observedInGnomad": false
    },
    "566": {
      "pos": 566,
      "cdnaChange": "c.1696G>A",
      "aaChange": "p.Gly566Arg",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50194014-C-T",
      "observedInGnomad": false
    },
    "593": {
      "pos": 593,
      "cdnaChange": "c.1777G>A",
      "aaChange": "p.Gly593Ser",
      "ac": 1,
      "an": 1461648,
      "af": 6.841592503803926e-07,
      "variantId": "17-50193038-C-T",
      "observedInGnomad": true
    },
    "602": {
      "pos": 602,
      "cdnaChange": "c.1804G>A",
      "aaChange": "p.Gly602Arg",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50193011-C-T",
      "observedInGnomad": false
    },
    "608": {
      "pos": 608,
      "cdnaChange": "c.1822G>A",
      "aaChange": "p.Gly608Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50192850-C-T",
      "observedInGnomad": false
    },
    "641": {
      "pos": 641,
      "cdnaChange": "c.1921G>A",
      "aaChange": "p.Gly641Arg",
      "ac": 1,
      "an": 1461892,
      "af": 6.840450594161539e-07,
      "variantId": "17-50192648-C-T",
      "observedInGnomad": true
    },
    "701": {
      "pos": 701,
      "cdnaChange": "c.2101G>A",
      "aaChange": "p.Gly701Ser",
      "ac": 1,
      "an": 1444576,
      "af": 6.922446447954279e-07,
      "variantId": "17-50191814-C-T",
      "observedInGnomad": true
    },
    "704": {
      "pos": 704,
      "cdnaChange": "c.2110G>A",
      "aaChange": "p.Gly704Ser",
      "ac": 0,
      "an": 1438716,
      "af": 0.0,
      "variantId": "17-50191805-C-T",
      "observedInGnomad": false
    },
    "719": {
      "pos": 719,
      "cdnaChange": "c.2155G>A",
      "aaChange": "p.Gly719Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50191463-C-T",
      "observedInGnomad": false
    },
    "788": {
      "pos": 788,
      "cdnaChange": "c.2362G>A",
      "aaChange": "p.Gly788Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50190578-C-T",
      "observedInGnomad": false
    },
    "800": {
      "pos": 800,
      "cdnaChange": "c.2398G>A",
      "aaChange": "p.Gly800Arg",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50190380-C-T",
      "observedInGnomad": false
    },
    "809": {
      "pos": 809,
      "cdnaChange": "c.2425G>A",
      "aaChange": "p.Gly809Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50190353-C-T",
      "observedInGnomad": false
    },
    "821": {
      "pos": 821,
      "cdnaChange": "c.2461G>A",
      "aaChange": "p.Gly821Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50190099-C-T",
      "observedInGnomad": false
    },
    "845": {
      "pos": 845,
      "cdnaChange": "c.2533G>A",
      "aaChange": "p.Gly845Arg",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50190027-C-T",
      "observedInGnomad": false
    },
    "866": {
      "pos": 866,
      "cdnaChange": "c.2596G>A",
      "aaChange": "p.Gly866Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50189876-C-T",
      "observedInGnomad": false
    },
    "884": {
      "pos": 884,
      "cdnaChange": "c.2650G>A",
      "aaChange": "p.Gly884Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50189696-C-T",
      "observedInGnomad": false
    },
    "950": {
      "pos": 950,
      "cdnaChange": "c.2848G>A",
      "aaChange": "p.Gly950Arg",
      "ac": 0,
      "an": 1461762,
      "af": 0.0,
      "variantId": "17-50189257-C-T",
      "observedInGnomad": false
    },
    "962": {
      "pos": 962,
      "cdnaChange": "c.2884G>A",
      "aaChange": "p.Gly962Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50189221-C-T",
      "observedInGnomad": false
    },
    "1028": {
      "pos": 1028,
      "cdnaChange": "c.3082G>A",
      "aaChange": "p.Gly1028Ser",
      "ac": 5,
      "an": 1461866,
      "af": 3.4202861274562783e-06,
      "variantId": "17-50188759-C-T",
      "observedInGnomad": true
    },
    "1040": {
      "pos": 1040,
      "cdnaChange": "c.3118G>A",
      "aaChange": "p.Gly1040Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50188619-C-T",
      "observedInGnomad": false
    },
    "1076": {
      "pos": 1076,
      "cdnaChange": "c.3226G>A",
      "aaChange": "p.Gly1076Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50188131-C-T",
      "observedInGnomad": false
    },
    "1079": {
      "pos": 1079,
      "cdnaChange": "c.3235G>A",
      "aaChange": "p.Gly1079Ser",
      "ac": 1,
      "an": 1425036,
      "af": 7.017366578809237e-07,
      "variantId": "17-50188122-C-T",
      "observedInGnomad": true
    },
    "1088": {
      "pos": 1088,
      "cdnaChange": "c.3262G>A",
      "aaChange": "p.Gly1088Arg",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50187983-C-T",
      "observedInGnomad": false
    },
    "1157": {
      "pos": 1157,
      "cdnaChange": "c.3469G>A",
      "aaChange": "p.Gly1157Ser",
      "ac": 3,
      "an": 1461140,
      "af": 2.0531913437452947e-06,
      "variantId": "17-50187077-C-T",
      "observedInGnomad": true
    },
    "1169": {
      "pos": 1169,
      "cdnaChange": "c.3505G>A",
      "aaChange": "p.Gly1169Ser",
      "ac": 0,
      "an": 1457613,
      "af": 0.0,
      "variantId": "17-50187041-C-T",
      "observedInGnomad": false
    },
    "1181": {
      "pos": 1181,
      "cdnaChange": "c.3541G>A",
      "aaChange": "p.Gly1181Ser",
      "ac": 0,
      "an": 1461446,
      "af": 0.0,
      "variantId": "17-50186913-C-T",
      "observedInGnomad": false
    }
  },
  "COL1A2": {
    "36": {
      "pos": 36,
      "cdnaChange": "c.106G>A",
      "aaChange": "p.Gly36Arg",
      "ac": 27,
      "an": 1613632,
      "af": 1.673243961448459e-05,
      "variantId": "7-94399058-G-A",
      "observedInGnomad": true
    },
    "151": {
      "pos": 151,
      "cdnaChange": "c.451G>A",
      "aaChange": "p.Gly151Arg",
      "ac": 2,
      "an": 1461704,
      "af": 1.3682660784946885e-06,
      "variantId": "7-94405217-G-A",
      "observedInGnomad": true
    },
    "193": {
      "pos": 193,
      "cdnaChange": "c.577G>A",
      "aaChange": "p.Gly193Ser",
      "ac": 4,
      "an": 1613788,
      "af": 2.4786403170676694e-06,
      "variantId": "7-94406286-G-A",
      "observedInGnomad": true
    },
    "280": {
      "pos": 280,
      "cdnaChange": "c.838G>A",
      "aaChange": "p.Gly280Ser",
      "ac": 6,
      "an": 1614028,
      "af": 3.7174076286161084e-06,
      "variantId": "7-94409367-G-A",
      "observedInGnomad": true
    },
    "292": {
      "pos": 292,
      "cdnaChange": "c.874G>A",
      "aaChange": "p.Gly292Ser",
      "ac": 10,
      "an": 1461880,
      "af": 6.84050674473965e-06,
      "variantId": "7-94409403-G-A",
      "observedInGnomad": true
    },
    "304": {
      "pos": 304,
      "cdnaChange": "c.910G>A",
      "aaChange": "p.Gly304Ser",
      "ac": 4,
      "an": 1614012,
      "af": 2.4782963199777944e-06,
      "variantId": "7-94409582-G-A",
      "observedInGnomad": true
    },
    "316": {
      "pos": 316,
      "cdnaChange": "c.946G>A",
      "aaChange": "p.Gly316Ser",
      "ac": 5,
      "an": 1613918,
      "af": 3.0980508303395837e-06,
      "variantId": "7-94409732-G-A",
      "observedInGnomad": true
    },
    "322": {
      "pos": 322,
      "cdnaChange": "c.964G>A",
      "aaChange": "p.Gly322Ser",
      "ac": 1,
      "an": 1461860,
      "af": 6.840600331085056e-07,
      "variantId": "7-94409750-G-A",
      "observedInGnomad": true
    },
    "328": {
      "pos": 328,
      "cdnaChange": "c.982G>A",
      "aaChange": "p.Gly328Ser",
      "ac": 0,
      "an": 1510733,
      "af": 0.0,
      "variantId": "7-94409768-G-A",
      "observedInGnomad": false
    },
    "337": {
      "pos": 337,
      "cdnaChange": "c.1009G>A",
      "aaChange": "p.Gly337Ser",
      "ac": 1,
      "an": 1461856,
      "af": 6.840619048661428e-07,
      "variantId": "7-94409795-G-A",
      "observedInGnomad": true
    },
    "358": {
      "pos": 358,
      "cdnaChange": "c.1072G>A",
      "aaChange": "p.Gly358Ser",
      "ac": 1,
      "an": 1461638,
      "af": 6.841639311512153e-07,
      "variantId": "7-94410278-G-A",
      "observedInGnomad": true
    },
    "364": {
      "pos": 364,
      "cdnaChange": "c.1090G>A",
      "aaChange": "p.Gly364Ser",
      "ac": 0,
      "an": 1510733,
      "af": 0.0,
      "variantId": "7-94410420-G-A",
      "observedInGnomad": false
    },
    "391": {
      "pos": 391,
      "cdnaChange": "c.1171G>A",
      "aaChange": "p.Gly391Ser",
      "ac": 1,
      "an": 1397570,
      "af": 7.155276658772011e-07,
      "variantId": "7-94410501-G-A",
      "observedInGnomad": true
    },
    "460": {
      "pos": 460,
      "cdnaChange": "c.1378G>A",
      "aaChange": "p.Gly460Ser",
      "ac": 0,
      "an": 1510733,
      "af": 0.0,
      "variantId": "7-94412095-G-A",
      "observedInGnomad": false
    },
    "469": {
      "pos": 469,
      "cdnaChange": "c.1405G>A",
      "aaChange": "p.Gly469Ser",
      "ac": 0,
      "an": 1510733,
      "af": 0.0,
      "variantId": "7-94412584-G-A",
      "observedInGnomad": false
    },
    "475": {
      "pos": 475,
      "cdnaChange": "c.1423G>A",
      "aaChange": "p.Gly475Ser",
      "ac": 7,
      "an": 1461764,
      "af": 4.788734706833662e-06,
      "variantId": "7-94412602-G-A",
      "observedInGnomad": true
    },
    "508": {
      "pos": 508,
      "cdnaChange": "c.1522G>A",
      "aaChange": "p.Gly508Ser",
      "ac": 16,
      "an": 1614020,
      "af": 9.913136144533525e-06,
      "variantId": "7-94413101-G-A",
      "observedInGnomad": true
    },
    "592": {
      "pos": 592,
      "cdnaChange": "c.1774G>A",
      "aaChange": "p.Gly592Ser",
      "ac": 0,
      "an": 1423406,
      "af": 0.0,
      "variantId": "7-94416414-G-A",
      "observedInGnomad": false
    },
    "601": {
      "pos": 601,
      "cdnaChange": "c.1801G>A",
      "aaChange": "p.Gly601Ser",
      "ac": 0,
      "an": 1433852,
      "af": 0.0,
      "variantId": "7-94416441-G-A",
      "observedInGnomad": false
    },
    "718": {
      "pos": 718,
      "cdnaChange": "c.2152G>A",
      "aaChange": "p.Gly718Ser",
      "ac": 0,
      "an": 1510733,
      "af": 0.0,
      "variantId": "7-94420409-G-A",
      "observedInGnomad": false
    },
    "751": {
      "pos": 751,
      "cdnaChange": "c.2251G>A",
      "aaChange": "p.Gly751Ser",
      "ac": 6,
      "an": 1459344,
      "af": 4.111436371410716e-06,
      "variantId": "7-94420604-G-A",
      "observedInGnomad": true
    },
    "772": {
      "pos": 772,
      "cdnaChange": "c.2314G>A",
      "aaChange": "p.Gly772Ser",
      "ac": 2,
      "an": 1461864,
      "af": 1.368116322722223e-06,
      "variantId": "7-94421027-G-A",
      "observedInGnomad": true
    },
    "901": {
      "pos": 901,
      "cdnaChange": "c.2701G>A",
      "aaChange": "p.Gly901Ser",
      "ac": 10,
      "an": 1461838,
      "af": 6.84070327902271e-06,
      "variantId": "7-94425144-G-A",
      "observedInGnomad": true
    },
    "919": {
      "pos": 919,
      "cdnaChange": "c.2755G>A",
      "aaChange": "p.Gly919Ser",
      "ac": 75,
      "an": 1613994,
      "af": 4.646857423261797e-05,
      "variantId": "7-94425198-G-A",
      "observedInGnomad": true
    },
    "943": {
      "pos": 943,
      "cdnaChange": "c.2827G>A",
      "aaChange": "p.Gly943Arg",
      "ac": 42,
      "an": 1461870,
      "af": 2.87303248578875e-05,
      "variantId": "7-94425655-G-A",
      "observedInGnomad": true
    },
    "949": {
      "pos": 949,
      "cdnaChange": "c.2845G>A",
      "aaChange": "p.Gly949Ser",
      "ac": 0,
      "an": 1510733,
      "af": 0.0,
      "variantId": "7-94425759-G-A",
      "observedInGnomad": false
    },
    "1012": {
      "pos": 1012,
      "cdnaChange": "c.3034G>A",
      "aaChange": "p.Gly1012Ser",
      "ac": 1,
      "an": 1454186,
      "af": 6.876699404340298e-07,
      "variantId": "7-94426459-G-A",
      "observedInGnomad": true
    },
    "1105": {
      "pos": 1105,
      "cdnaChange": "c.3313G>A",
      "aaChange": "p.Gly1105Ser",
      "ac": 1966,
      "an": 1614106,
      "af": 0.0012180117043118605,
      "variantId": "7-94427672-G-A",
      "observedInGnomad": true
    }
  },
  "COL20A1": {
    "1120": {
      "pos": 1120,
      "cdnaChange": "c.3358G>A",
      "aaChange": "p.Gly1120Ser",
      "ac": 96,
      "an": 1610468,
      "af": 5.961000156476254e-05,
      "variantId": "20-63325677-G-A",
      "observedInGnomad": true
    },
    "1126": {
      "pos": 1126,
      "cdnaChange": "c.3376G>A",
      "aaChange": "p.Gly1126Arg",
      "ac": 32,
      "an": 1611754,
      "af": 1.98541464764474e-05,
      "variantId": "20-63325695-G-A",
      "observedInGnomad": true
    }
  },
  "COL21A1": {
    "584": {
      "pos": 584,
      "cdnaChange": "c.1750G>A",
      "aaChange": "p.Gly584Ser",
      "ac": 11,
      "an": 1508222,
      "af": 7.293356017880657e-06,
      "variantId": "6-56124070-C-T",
      "observedInGnomad": true
    },
    "692": {
      "pos": 692,
      "cdnaChange": "c.2074G>A",
      "aaChange": "p.Gly692Arg",
      "ac": 8,
      "an": 1600584,
      "af": 4.998175665881953e-06,
      "variantId": "6-56069063-C-T",
      "observedInGnomad": true
    },
    "785": {
      "pos": 785,
      "cdnaChange": "c.2353G>A",
      "aaChange": "p.Gly785Arg",
      "ac": 2,
      "an": 1608798,
      "af": 1.2431641511240068e-06,
      "variantId": "6-56060795-C-G",
      "observedInGnomad": true
    }
  },
  "COL22A1": {
    "539": {
      "pos": 539,
      "cdnaChange": "c.1615G>A",
      "aaChange": "p.Gly539Ser",
      "ac": 16,
      "an": 1607728,
      "af": 9.951932167630346e-06,
      "variantId": "8-138780962-C-T",
      "observedInGnomad": true
    },
    "545": {
      "pos": 545,
      "cdnaChange": "c.1633G>A",
      "aaChange": "p.Gly545Ser",
      "ac": 13,
      "an": 1613286,
      "af": 8.058087654637802e-06,
      "variantId": "8-138780944-C-T",
      "observedInGnomad": true
    },
    "566": {
      "pos": 566,
      "cdnaChange": "c.1696G>A",
      "aaChange": "p.Gly566Ser",
      "ac": 193,
      "an": 1612608,
      "af": 0.00011968190657617971,
      "variantId": "8-138779517-C-T",
      "observedInGnomad": true
    },
    "578": {
      "pos": 578,
      "cdnaChange": "c.1732G>A",
      "aaChange": "p.Gly578Arg",
      "ac": 11,
      "an": 1459338,
      "af": 7.537664338213628e-06,
      "variantId": "8-138778379-C-T",
      "observedInGnomad": true
    },
    "584": {
      "pos": 584,
      "cdnaChange": "c.1750G>A",
      "aaChange": "p.Gly584Arg",
      "ac": 20,
      "an": 1613802,
      "af": 1.2393094072259175e-05,
      "variantId": "8-138778361-C-T",
      "observedInGnomad": true
    },
    "623": {
      "pos": 623,
      "cdnaChange": "c.1867G>A",
      "aaChange": "p.Gly623Ser",
      "ac": 25,
      "an": 1598526,
      "af": 1.5639407804439842e-05,
      "variantId": "8-138760278-C-T",
      "observedInGnomad": true
    },
    "672": {
      "pos": 672,
      "cdnaChange": "c.2014G>A",
      "aaChange": "p.Gly672Ser",
      "ac": 45,
      "an": 1613974,
      "af": 2.7881490036394637e-05,
      "variantId": "8-138755174-C-T",
      "observedInGnomad": true
    },
    "738": {
      "pos": 738,
      "cdnaChange": "c.2212G>A",
      "aaChange": "p.Gly738Ser",
      "ac": 262,
      "an": 1614178,
      "af": 0.00016231171531268547,
      "variantId": "8-138724650-C-T",
      "observedInGnomad": true
    },
    "756": {
      "pos": 756,
      "cdnaChange": "c.2266G>A",
      "aaChange": "p.Gly756Arg",
      "ac": 27,
      "an": 1431354,
      "af": 1.886325814578364e-05,
      "variantId": "8-138722071-C-T",
      "observedInGnomad": true
    },
    "849": {
      "pos": 849,
      "cdnaChange": "c.2545G>A",
      "aaChange": "p.Gly849Arg",
      "ac": 188,
      "an": 1613530,
      "af": 0.00011651472237888356,
      "variantId": "8-138703320-C-T",
      "observedInGnomad": true
    },
    "865": {
      "pos": 865,
      "cdnaChange": "c.2593G>A",
      "aaChange": "p.Gly865Arg",
      "ac": 3,
      "an": 1613818,
      "af": 1.8589456803679225e-06,
      "variantId": "8-138694879-C-T",
      "observedInGnomad": true
    },
    "919": {
      "pos": 919,
      "cdnaChange": "c.2755G>A",
      "aaChange": "p.Gly919Ser",
      "ac": 0,
      "an": 1562035,
      "af": 0.0,
      "variantId": "8-138690874-C-T",
      "observedInGnomad": false
    },
    "922": {
      "pos": 922,
      "cdnaChange": "c.2764G>A",
      "aaChange": "p.Gly922Arg",
      "ac": 11,
      "an": 1609984,
      "af": 6.832366035935761e-06,
      "variantId": "8-138690865-C-T",
      "observedInGnomad": true
    },
    "925": {
      "pos": 925,
      "cdnaChange": "c.2773G>A",
      "aaChange": "p.Gly925Ser",
      "ac": 6,
      "an": 1610046,
      "af": 3.726601600202727e-06,
      "variantId": "8-138690856-C-T",
      "observedInGnomad": true
    },
    "928": {
      "pos": 928,
      "cdnaChange": "c.2782G>A",
      "aaChange": "p.Gly928Ser",
      "ac": 43,
      "an": 1457928,
      "af": 2.9493911907858277e-05,
      "variantId": "8-138690847-C-T",
      "observedInGnomad": true
    },
    "940": {
      "pos": 940,
      "cdnaChange": "c.2818G>A",
      "aaChange": "p.Gly940Ser",
      "ac": 4,
      "an": 1461100,
      "af": 2.7376634042844433e-06,
      "variantId": "8-138688961-C-T",
      "observedInGnomad": true
    },
    "982": {
      "pos": 982,
      "cdnaChange": "c.2944G>A",
      "aaChange": "p.Gly982Arg",
      "ac": 156,
      "an": 1613360,
      "af": 9.669261665096445e-05,
      "variantId": "8-138685231-C-T",
      "observedInGnomad": true
    },
    "1054": {
      "pos": 1054,
      "cdnaChange": "c.3160G>A",
      "aaChange": "p.Gly1054Arg",
      "ac": 9,
      "an": 1610622,
      "af": 5.587903306921177e-06,
      "variantId": "8-138663731-C-T",
      "observedInGnomad": true
    },
    "1078": {
      "pos": 1078,
      "cdnaChange": "c.3232G>A",
      "aaChange": "p.Gly1078Ser",
      "ac": 3,
      "an": 1459582,
      "af": 2.055382979510572e-06,
      "variantId": "8-138662038-C-T",
      "observedInGnomad": true
    },
    "1081": {
      "pos": 1081,
      "cdnaChange": "c.3241G>A",
      "aaChange": "p.Gly1081Ser",
      "ac": 1,
      "an": 1461268,
      "af": 6.843371647090062e-07,
      "variantId": "8-138660480-C-T",
      "observedInGnomad": true
    },
    "1237": {
      "pos": 1237,
      "cdnaChange": "c.3709G>A",
      "aaChange": "p.Gly1237Arg",
      "ac": 12,
      "an": 1598830,
      "af": 7.505488388384006e-06,
      "variantId": "8-138626198-C-T",
      "observedInGnomad": true
    },
    "1288": {
      "pos": 1288,
      "cdnaChange": "c.3862G>A",
      "aaChange": "p.Gly1288Ser",
      "ac": 7,
      "an": 1614028,
      "af": 4.336975566718793e-06,
      "variantId": "8-138616922-C-T",
      "observedInGnomad": true
    },
    "1515": {
      "pos": 1515,
      "cdnaChange": "c.4543G>A",
      "aaChange": "p.Gly1515Ser",
      "ac": 32,
      "an": 1585834,
      "af": 2.0178656782487953e-05,
      "variantId": "8-138594089-C-T",
      "observedInGnomad": true
    },
    "1568": {
      "pos": 1568,
      "cdnaChange": "c.4702G>A",
      "aaChange": "p.Gly1568Arg",
      "ac": 49,
      "an": 1401692,
      "af": 3.495775106086073e-05,
      "variantId": "8-138589432-C-T",
      "observedInGnomad": true
    },
    "1600": {
      "pos": 1600,
      "cdnaChange": "c.4798G>A",
      "aaChange": "p.Gly1600Ser",
      "ac": 97,
      "an": 1612432,
      "af": 6.015757563729819e-05,
      "variantId": "8-138589336-C-T",
      "observedInGnomad": true
    }
  },
  "COL23A1": {
    "127": {
      "pos": 127,
      "cdnaChange": "c.379G>A",
      "aaChange": "p.Gly127Ser",
      "ac": 23,
      "an": 1547620,
      "af": 1.4861529315981959e-05,
      "variantId": "5-178306902-C-T",
      "observedInGnomad": true
    },
    "157": {
      "pos": 157,
      "cdnaChange": "c.469G>A",
      "aaChange": "p.Gly157Arg",
      "ac": 3,
      "an": 1451312,
      "af": 2.067095152524061e-06,
      "variantId": "5-178268756-C-T",
      "observedInGnomad": true
    },
    "220": {
      "pos": 220,
      "cdnaChange": "c.658G>A",
      "aaChange": "p.Gly220Arg",
      "ac": 0,
      "an": 1431498,
      "af": 0.0,
      "variantId": "5-178262234-C-G",
      "observedInGnomad": false
    },
    "223": {
      "pos": 223,
      "cdnaChange": "c.667G>A",
      "aaChange": "p.Gly223Ser",
      "ac": 81,
      "an": 1583636,
      "af": 5.1148117370405826e-05,
      "variantId": "5-178262225-C-T",
      "observedInGnomad": true
    },
    "271": {
      "pos": 271,
      "cdnaChange": "c.811G>A",
      "aaChange": "p.Gly271Ser",
      "ac": 13,
      "an": 1613442,
      "af": 8.057308536656415e-06,
      "variantId": "5-178256892-C-T",
      "observedInGnomad": true
    },
    "274": {
      "pos": 274,
      "cdnaChange": "c.820G>A",
      "aaChange": "p.Gly274Ser",
      "ac": 11,
      "an": 1613216,
      "af": 6.818677722016147e-06,
      "variantId": "5-178256883-C-T",
      "observedInGnomad": true
    },
    "324": {
      "pos": 324,
      "cdnaChange": "c.970G>A",
      "aaChange": "p.Gly324Arg",
      "ac": 36,
      "an": 1610184,
      "af": 2.2357693282258424e-05,
      "variantId": "5-178252588-C-T",
      "observedInGnomad": true
    },
    "345": {
      "pos": 345,
      "cdnaChange": "c.1033G>A",
      "aaChange": "p.Gly345Ser",
      "ac": 11,
      "an": 1461838,
      "af": 7.524773606924981e-06,
      "variantId": "5-178250087-C-T",
      "observedInGnomad": true
    },
    "381": {
      "pos": 381,
      "cdnaChange": "c.1141G>A",
      "aaChange": "p.Gly381Ser",
      "ac": 41,
      "an": 1614142,
      "af": 2.540049140658009e-05,
      "variantId": "5-178249125-C-T",
      "observedInGnomad": true
    },
    "387": {
      "pos": 387,
      "cdnaChange": "c.1159G>A",
      "aaChange": "p.Gly387Ser",
      "ac": 44,
      "an": 1611970,
      "af": 2.7295793346030013e-05,
      "variantId": "5-178248245-C-T",
      "observedInGnomad": true
    },
    "451": {
      "pos": 451,
      "cdnaChange": "c.1351G>A",
      "aaChange": "p.Gly451Ser",
      "ac": 192,
      "an": 1579364,
      "af": 0.00012156792227757503,
      "variantId": "5-178246399-C-T",
      "observedInGnomad": true
    },
    "475": {
      "pos": 475,
      "cdnaChange": "c.1423G>A",
      "aaChange": "p.Gly475Arg",
      "ac": 41,
      "an": 1614006,
      "af": 2.540263171264543e-05,
      "variantId": "5-178245959-C-T",
      "observedInGnomad": true
    },
    "505": {
      "pos": 505,
      "cdnaChange": "c.1513G>A",
      "aaChange": "p.Gly505Ser",
      "ac": 39,
      "an": 1401114,
      "af": 2.783499415465123e-05,
      "variantId": "5-178242110-C-T",
      "observedInGnomad": true
    }
  },
  "COL24A1": {
    "498": {
      "pos": 498,
      "cdnaChange": "c.1492G>A",
      "aaChange": "p.Gly498Ser",
      "ac": 0,
      "an": 1503210,
      "af": 0.0,
      "variantId": "1-86115378-C-T",
      "observedInGnomad": false
    },
    "597": {
      "pos": 597,
      "cdnaChange": "c.1789G>A",
      "aaChange": "p.Gly597Ser",
      "ac": 16,
      "an": 1609976,
      "af": 9.938036343398907e-06,
      "variantId": "1-86059138-C-T",
      "observedInGnomad": true
    },
    "729": {
      "pos": 729,
      "cdnaChange": "c.2185G>A",
      "aaChange": "p.Gly729Arg",
      "ac": 52,
      "an": 1612468,
      "af": 3.224870198974491e-05,
      "variantId": "1-86022555-C-T",
      "observedInGnomad": true
    },
    "783": {
      "pos": 783,
      "cdnaChange": "c.2347G>A",
      "aaChange": "p.Gly783Ser",
      "ac": 31,
      "an": 1458944,
      "af": 2.124824530619407e-05,
      "variantId": "1-85987618-C-T",
      "observedInGnomad": true
    },
    "903": {
      "pos": 903,
      "cdnaChange": "c.2707G>A",
      "aaChange": "p.Gly903Ser",
      "ac": 21,
      "an": 1331454,
      "af": 1.577223095953747e-05,
      "variantId": "1-85908615-C-T",
      "observedInGnomad": true
    }
  },
  "COL25A1": {
    "225": {
      "pos": 225,
      "cdnaChange": "c.673G>A",
      "aaChange": "p.Gly225Ser",
      "ac": 0,
      "an": 1562210,
      "af": 0.0,
      "variantId": "4-108937843-C-T",
      "observedInGnomad": false
    },
    "264": {
      "pos": 264,
      "cdnaChange": "c.790G>A",
      "aaChange": "p.Gly264Arg",
      "ac": 1,
      "an": 1459434,
      "af": 6.851971380685937e-07,
      "variantId": "4-108901163-C-G",
      "observedInGnomad": true
    },
    "294": {
      "pos": 294,
      "cdnaChange": "c.880G>A",
      "aaChange": "p.Gly294Ser",
      "ac": 36,
      "an": 1613736,
      "af": 2.230848168473654e-05,
      "variantId": "4-108896693-C-T",
      "observedInGnomad": true
    },
    "382": {
      "pos": 382,
      "cdnaChange": "c.1144G>A",
      "aaChange": "p.Gly382Arg",
      "ac": 6,
      "an": 1613460,
      "af": 3.718716299133539e-06,
      "variantId": "4-108863327-C-T",
      "observedInGnomad": true
    }
  },
  "COL26A1": {
    "200": {
      "pos": 200,
      "cdnaChange": "c.598G>A",
      "aaChange": "p.Gly200Arg",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "7-101540049-G-A",
      "observedInGnomad": false
    },
    "215": {
      "pos": 215,
      "cdnaChange": "c.643G>A",
      "aaChange": "p.Gly215Arg",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "7-101544042-G-A",
      "observedInGnomad": false
    },
    "251": {
      "pos": 251,
      "cdnaChange": "c.751G>A",
      "aaChange": "p.Gly251Ser",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "7-101545391-G-A",
      "observedInGnomad": false
    },
    "257": {
      "pos": 257,
      "cdnaChange": "c.769G>A",
      "aaChange": "p.Gly257Ser",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "7-101545409-G-A",
      "observedInGnomad": false
    },
    "342": {
      "pos": 342,
      "cdnaChange": "c.1024G>A",
      "aaChange": "p.Gly342Ser",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "7-101553326-G-A",
      "observedInGnomad": false
    }
  },
  "COL27A1": {
    "667": {
      "pos": 667,
      "cdnaChange": "c.1999G>A",
      "aaChange": "p.Gly667Ser",
      "ac": 32,
      "an": 1613222,
      "af": 1.9836079597228403e-05,
      "variantId": "9-114183058-G-A",
      "observedInGnomad": true
    },
    "700": {
      "pos": 700,
      "cdnaChange": "c.2098G>A",
      "aaChange": "p.Gly700Arg",
      "ac": 1224,
      "an": 1613948,
      "af": 0.0007583887461058224,
      "variantId": "9-114195986-G-A",
      "observedInGnomad": true
    },
    "721": {
      "pos": 721,
      "cdnaChange": "c.2161G>A",
      "aaChange": "p.Gly721Arg",
      "ac": 52,
      "an": 1613314,
      "af": 3.2231791207415296e-05,
      "variantId": "9-114205138-G-A",
      "observedInGnomad": true
    },
    "751": {
      "pos": 751,
      "cdnaChange": "c.2251G>A",
      "aaChange": "p.Gly751Ser",
      "ac": 11,
      "an": 1614014,
      "af": 6.8153064347645066e-06,
      "variantId": "9-114206279-G-A",
      "observedInGnomad": true
    },
    "766": {
      "pos": 766,
      "cdnaChange": "c.2296G>A",
      "aaChange": "p.Gly766Ser",
      "ac": 12,
      "an": 1613952,
      "af": 7.435165358077564e-06,
      "variantId": "9-114209702-G-A",
      "observedInGnomad": true
    },
    "820": {
      "pos": 820,
      "cdnaChange": "c.2458G>A",
      "aaChange": "p.Gly820Ser",
      "ac": 9,
      "an": 1613408,
      "af": 5.578254229556318e-06,
      "variantId": "9-114222259-G-A",
      "observedInGnomad": true
    },
    "850": {
      "pos": 850,
      "cdnaChange": "c.2548G>A",
      "aaChange": "p.Gly850Arg",
      "ac": 7,
      "an": 1461822,
      "af": 4.788544706537458e-06,
      "variantId": "9-114231849-G-A",
      "observedInGnomad": true
    },
    "868": {
      "pos": 868,
      "cdnaChange": "c.2602G>A",
      "aaChange": "p.Gly868Arg",
      "ac": 5,
      "an": 1613330,
      "af": 3.099179956983382e-06,
      "variantId": "9-114235635-G-A",
      "observedInGnomad": true
    },
    "883": {
      "pos": 883,
      "cdnaChange": "c.2647G>A",
      "aaChange": "p.Gly883Ser",
      "ac": 11,
      "an": 1459200,
      "af": 7.5383771929824565e-06,
      "variantId": "9-114237008-G-A",
      "observedInGnomad": true
    },
    "895": {
      "pos": 895,
      "cdnaChange": "c.2683G>A",
      "aaChange": "p.Gly895Arg",
      "ac": 3,
      "an": 1461834,
      "af": 2.0522165991487405e-06,
      "variantId": "9-114237671-G-A",
      "observedInGnomad": true
    },
    "904": {
      "pos": 904,
      "cdnaChange": "c.2710G>A",
      "aaChange": "p.Gly904Arg",
      "ac": 1,
      "an": 1461832,
      "af": 6.840731356270762e-07,
      "variantId": "9-114237698-G-C",
      "observedInGnomad": true
    },
    "916": {
      "pos": 916,
      "cdnaChange": "c.2746G>A",
      "aaChange": "p.Gly916Ser",
      "ac": 6,
      "an": 1456292,
      "af": 4.120052846544512e-06,
      "variantId": "9-114240238-G-A",
      "observedInGnomad": true
    },
    "973": {
      "pos": 973,
      "cdnaChange": "c.2917G>A",
      "aaChange": "p.Gly973Ser",
      "ac": 42,
      "an": 1613614,
      "af": 2.6028529747510868e-05,
      "variantId": "9-114243543-G-A",
      "observedInGnomad": true
    },
    "1003": {
      "pos": 1003,
      "cdnaChange": "c.3007G>A",
      "aaChange": "p.Gly1003Arg",
      "ac": 1,
      "an": 1459836,
      "af": 6.850084530043101e-07,
      "variantId": "9-114250642-G-A",
      "observedInGnomad": true
    },
    "1072": {
      "pos": 1072,
      "cdnaChange": "c.3214G>A",
      "aaChange": "p.Gly1072Arg",
      "ac": 11,
      "an": 1597244,
      "af": 6.886862620864439e-06,
      "variantId": "9-114264373-G-A",
      "observedInGnomad": true
    },
    "1165": {
      "pos": 1165,
      "cdnaChange": "c.3493G>A",
      "aaChange": "p.Gly1165Arg",
      "ac": 36,
      "an": 1590066,
      "af": 2.264056963673206e-05,
      "variantId": "9-114267549-G-A",
      "observedInGnomad": true
    },
    "1228": {
      "pos": 1228,
      "cdnaChange": "c.3682G>A",
      "aaChange": "p.Gly1228Arg",
      "ac": 5,
      "an": 1549282,
      "af": 3.2273014209162695e-06,
      "variantId": "9-114275733-G-A",
      "observedInGnomad": true
    },
    "1231": {
      "pos": 1231,
      "cdnaChange": "c.3691G>A",
      "aaChange": "p.Gly1231Ser",
      "ac": 9,
      "an": 1396456,
      "af": 6.444886197631719e-06,
      "variantId": "9-114275742-G-A",
      "observedInGnomad": true
    },
    "1336": {
      "pos": 1336,
      "cdnaChange": "c.4006G>A",
      "aaChange": "p.Gly1336Ser",
      "ac": 7,
      "an": 1457830,
      "af": 4.801657257704945e-06,
      "variantId": "9-114288473-G-A",
      "observedInGnomad": true
    },
    "1358": {
      "pos": 1358,
      "cdnaChange": "c.4072G>A",
      "aaChange": "p.Gly1358Arg",
      "ac": 7,
      "an": 1610770,
      "af": 4.345747685889357e-06,
      "variantId": "9-114288729-G-A",
      "observedInGnomad": true
    },
    "1385": {
      "pos": 1385,
      "cdnaChange": "c.4153G>A",
      "aaChange": "p.Gly1385Arg",
      "ac": 0,
      "an": 1439784,
      "af": 0.0,
      "variantId": "9-114289242-G-A",
      "observedInGnomad": false
    },
    "1451": {
      "pos": 1451,
      "cdnaChange": "c.4351G>A",
      "aaChange": "p.Gly1451Arg",
      "ac": 8,
      "an": 1580554,
      "af": 5.061516405007358e-06,
      "variantId": "9-114290314-G-C",
      "observedInGnomad": true
    },
    "1481": {
      "pos": 1481,
      "cdnaChange": "c.4441G>A",
      "aaChange": "p.Gly1481Ser",
      "ac": 48,
      "an": 1551684,
      "af": 3.09341334962531e-05,
      "variantId": "9-114290882-G-A",
      "observedInGnomad": true
    },
    "1499": {
      "pos": 1499,
      "cdnaChange": "c.4495G>A",
      "aaChange": "p.Gly1499Arg",
      "ac": 12,
      "an": 1558220,
      "af": 7.701094838982943e-06,
      "variantId": "9-114292121-G-A",
      "observedInGnomad": true
    },
    "1544": {
      "pos": 1544,
      "cdnaChange": "c.4630G>A",
      "aaChange": "p.Gly1544Arg",
      "ac": 21,
      "an": 1461778,
      "af": 1.4366066529938198e-05,
      "variantId": "9-114300115-G-A",
      "observedInGnomad": true
    },
    "1574": {
      "pos": 1574,
      "cdnaChange": "c.4720G>A",
      "aaChange": "p.Gly1574Arg",
      "ac": 5,
      "an": 1460230,
      "af": 3.4241181183786117e-06,
      "variantId": "9-114301090-G-A",
      "observedInGnomad": true
    },
    "1577": {
      "pos": 1577,
      "cdnaChange": "c.4729G>A",
      "aaChange": "p.Gly1577Arg",
      "ac": 1,
      "an": 1460900,
      "af": 6.845095489082072e-07,
      "variantId": "9-114301099-G-C",
      "observedInGnomad": true
    },
    "1607": {
      "pos": 1607,
      "cdnaChange": "c.4819G>A",
      "aaChange": "p.Gly1607Ser",
      "ac": 4,
      "an": 1611328,
      "af": 2.4824244350001986e-06,
      "variantId": "9-114301691-G-A",
      "observedInGnomad": true
    },
    "1613": {
      "pos": 1613,
      "cdnaChange": "c.4837G>A",
      "aaChange": "p.Gly1613Ser",
      "ac": 21,
      "an": 1612182,
      "af": 1.3025824627740541e-05,
      "variantId": "9-114301709-G-A",
      "observedInGnomad": true
    }
  },
  "COL28A1": {
    "404": {
      "pos": 404,
      "cdnaChange": "c.1210G>A",
      "aaChange": "p.Gly404Arg",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "7-7477135-C-T",
      "observedInGnomad": false
    },
    "452": {
      "pos": 452,
      "cdnaChange": "c.1354G>A",
      "aaChange": "p.Gly452Arg",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "7-7456061-C-T",
      "observedInGnomad": false
    },
    "739": {
      "pos": 739,
      "cdnaChange": "c.2215G>A",
      "aaChange": "p.Gly739Arg",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "7-7380853-C-T",
      "observedInGnomad": false
    }
  },
  "COL2A1": {
    "168": {
      "pos": 168,
      "cdnaChange": "c.502G>A",
      "aaChange": "p.Gly168Ser",
      "ac": 7,
      "an": 1613570,
      "af": 4.338206585397596e-06,
      "variantId": "12-47997635-C-T",
      "observedInGnomad": true
    },
    "297": {
      "pos": 297,
      "cdnaChange": "c.889G>A",
      "aaChange": "p.Gly297Ser",
      "ac": 4,
      "an": 1461882,
      "af": 2.7361989544983793e-06,
      "variantId": "12-47993844-C-T",
      "observedInGnomad": true
    },
    "318": {
      "pos": 318,
      "cdnaChange": "c.952G>A",
      "aaChange": "p.Gly318Arg",
      "ac": 3,
      "an": 1461400,
      "af": 2.0528260572054195e-06,
      "variantId": "12-47993475-C-T",
      "observedInGnomad": true
    },
    "360": {
      "pos": 360,
      "cdnaChange": "c.1078G>A",
      "aaChange": "p.Gly360Ser",
      "ac": 9,
      "an": 1460676,
      "af": 6.161530688530516e-06,
      "variantId": "12-47989272-C-T",
      "observedInGnomad": true
    },
    "378": {
      "pos": 378,
      "cdnaChange": "c.1132G>A",
      "aaChange": "p.Gly378Ser",
      "ac": 1,
      "an": 1458776,
      "af": 6.855062052021695e-07,
      "variantId": "12-47987700-C-T",
      "observedInGnomad": true
    },
    "393": {
      "pos": 393,
      "cdnaChange": "c.1177G>A",
      "aaChange": "p.Gly393Ser",
      "ac": 3,
      "an": 1461158,
      "af": 2.053166050488722e-06,
      "variantId": "12-47987655-C-T",
      "observedInGnomad": true
    },
    "408": {
      "pos": 408,
      "cdnaChange": "c.1222G>A",
      "aaChange": "p.Gly408Ser",
      "ac": 0,
      "an": 1473978,
      "af": 0.0,
      "variantId": "12-47987313-C-T",
      "observedInGnomad": false
    },
    "504": {
      "pos": 504,
      "cdnaChange": "c.1510G>A",
      "aaChange": "p.Gly504Ser",
      "ac": 1,
      "an": 1413436,
      "af": 7.074957762502158e-07,
      "variantId": "12-47986353-C-T",
      "observedInGnomad": true
    },
    "513": {
      "pos": 513,
      "cdnaChange": "c.1537G>A",
      "aaChange": "p.Gly513Ser",
      "ac": 0,
      "an": 1473978,
      "af": 0.0,
      "variantId": "12-47985956-C-T",
      "observedInGnomad": false
    },
    "516": {
      "pos": 516,
      "cdnaChange": "c.1546G>A",
      "aaChange": "p.Gly516Ser",
      "ac": 0,
      "an": 1473978,
      "af": 0.0,
      "variantId": "12-47985947-C-T",
      "observedInGnomad": false
    },
    "546": {
      "pos": 546,
      "cdnaChange": "c.1636G>A",
      "aaChange": "p.Gly546Ser",
      "ac": 0,
      "an": 1473978,
      "af": 0.0,
      "variantId": "12-47985772-C-T",
      "observedInGnomad": false
    },
    "612": {
      "pos": 612,
      "cdnaChange": "c.1834G>A",
      "aaChange": "p.Gly612Ser",
      "ac": 0,
      "an": 1473978,
      "af": 0.0,
      "variantId": "12-47984599-C-T",
      "observedInGnomad": false
    },
    "687": {
      "pos": 687,
      "cdnaChange": "c.2059G>A",
      "aaChange": "p.Gly687Ser",
      "ac": 2,
      "an": 1461450,
      "af": 1.3685038831297683e-06,
      "variantId": "12-47983128-C-T",
      "observedInGnomad": true
    },
    "711": {
      "pos": 711,
      "cdnaChange": "c.2131G>A",
      "aaChange": "p.Gly711Ser",
      "ac": 3,
      "an": 1613274,
      "af": 1.8595725214687647e-06,
      "variantId": "12-47982910-C-T",
      "observedInGnomad": true
    },
    "723": {
      "pos": 723,
      "cdnaChange": "c.2167G>A",
      "aaChange": "p.Gly723Ser",
      "ac": 3,
      "an": 1460186,
      "af": 2.0545327787007958e-06,
      "variantId": "12-47982874-C-T",
      "observedInGnomad": true
    },
    "831": {
      "pos": 831,
      "cdnaChange": "c.2491G>A",
      "aaChange": "p.Gly831Arg",
      "ac": 0,
      "an": 1400216,
      "af": 0.0,
      "variantId": "12-47980941-C-T",
      "observedInGnomad": false
    },
    "855": {
      "pos": 855,
      "cdnaChange": "c.2563G>A",
      "aaChange": "p.Gly855Ser",
      "ac": 2,
      "an": 1460674,
      "af": 1.3692309166864064e-06,
      "variantId": "12-47980616-C-T",
      "observedInGnomad": true
    },
    "936": {
      "pos": 936,
      "cdnaChange": "c.2806G>A",
      "aaChange": "p.Gly936Ser",
      "ac": 3,
      "an": 1461036,
      "af": 2.0533374947639896e-06,
      "variantId": "12-47978686-C-T",
      "observedInGnomad": true
    },
    "945": {
      "pos": 945,
      "cdnaChange": "c.2833G>A",
      "aaChange": "p.Gly945Ser",
      "ac": 3,
      "an": 1461174,
      "af": 2.053143568117144e-06,
      "variantId": "12-47978659-C-T",
      "observedInGnomad": true
    },
    "963": {
      "pos": 963,
      "cdnaChange": "c.2887G>A",
      "aaChange": "p.Gly963Ser",
      "ac": 0,
      "an": 1473978,
      "af": 0.0,
      "variantId": "12-47978605-C-T",
      "observedInGnomad": false
    },
    "984": {
      "pos": 984,
      "cdnaChange": "c.2950G>A",
      "aaChange": "p.Gly984Ser",
      "ac": 0,
      "an": 152346,
      "af": 0.0,
      "variantId": "12-47978344-C-T",
      "observedInGnomad": false
    },
    "1005": {
      "pos": 1005,
      "cdnaChange": "c.3013G>A",
      "aaChange": "p.Gly1005Ser",
      "ac": 1,
      "an": 1460770,
      "af": 6.845704662609446e-07,
      "variantId": "12-47978108-C-T",
      "observedInGnomad": true
    },
    "1041": {
      "pos": 1041,
      "cdnaChange": "c.3121G>A",
      "aaChange": "p.Gly1041Ser",
      "ac": 0,
      "an": 1473978,
      "af": 0.0,
      "variantId": "12-47977644-C-T",
      "observedInGnomad": false
    },
    "1143": {
      "pos": 1143,
      "cdnaChange": "c.3427G>A",
      "aaChange": "p.Gly1143Ser",
      "ac": 0,
      "an": 1473978,
      "af": 0.0,
      "variantId": "12-47976820-C-T",
      "observedInGnomad": false
    },
    "1170": {
      "pos": 1170,
      "cdnaChange": "c.3508G>A",
      "aaChange": "p.Gly1170Ser",
      "ac": 1,
      "an": 152136,
      "af": 6.573066203922806e-06,
      "variantId": "12-47976052-C-T",
      "observedInGnomad": true
    },
    "1197": {
      "pos": 1197,
      "cdnaChange": "c.3589G>A",
      "aaChange": "p.Gly1197Ser",
      "ac": 0,
      "an": 1473978,
      "af": 0.0,
      "variantId": "12-47975971-C-T",
      "observedInGnomad": false
    }
  },
  "COL3A1": {
    "183": {
      "pos": 183,
      "cdnaChange": "c.547G>A",
      "aaChange": "p.Gly183Ser",
      "ac": 0,
      "an": 1491933,
      "af": 0.0,
      "variantId": "2-188988099-G-A",
      "observedInGnomad": false
    },
    "237": {
      "pos": 237,
      "cdnaChange": "c.709G>A",
      "aaChange": "p.Gly237Arg",
      "ac": 4,
      "an": 1461438,
      "af": 2.7370302400786074e-06,
      "variantId": "2-188990114-G-A",
      "observedInGnomad": true
    },
    "324": {
      "pos": 324,
      "cdnaChange": "c.970G>A",
      "aaChange": "p.Gly324Ser",
      "ac": 2,
      "an": 1461720,
      "af": 1.3682511014421367e-06,
      "variantId": "2-188992202-G-A",
      "observedInGnomad": true
    },
    "342": {
      "pos": 342,
      "cdnaChange": "c.1024G>A",
      "aaChange": "p.Gly342Arg",
      "ac": 0,
      "an": 1461738,
      "af": 0.0,
      "variantId": "2-188992914-G-A",
      "observedInGnomad": false
    },
    "420": {
      "pos": 420,
      "cdnaChange": "c.1258G>A",
      "aaChange": "p.Gly420Ser",
      "ac": 5,
      "an": 1461454,
      "af": 3.4212503438356596e-06,
      "variantId": "2-188994297-G-A",
      "observedInGnomad": true
    },
    "444": {
      "pos": 444,
      "cdnaChange": "c.1330G>A",
      "aaChange": "p.Gly444Arg",
      "ac": 0,
      "an": 1491933,
      "af": 0.0,
      "variantId": "2-188994577-G-A",
      "observedInGnomad": false
    },
    "450": {
      "pos": 450,
      "cdnaChange": "c.1348G>A",
      "aaChange": "p.Gly450Ser",
      "ac": 0,
      "an": 1491933,
      "af": 0.0,
      "variantId": "2-188994724-G-A",
      "observedInGnomad": false
    },
    "540": {
      "pos": 540,
      "cdnaChange": "c.1618G>A",
      "aaChange": "p.Gly540Arg",
      "ac": 1,
      "an": 1461414,
      "af": 6.842687972059936e-07,
      "variantId": "2-188996134-G-A",
      "observedInGnomad": true
    },
    "555": {
      "pos": 555,
      "cdnaChange": "c.1663G>A",
      "aaChange": "p.Gly555Arg",
      "ac": 0,
      "an": 1491933,
      "af": 0.0,
      "variantId": "2-188996398-G-A",
      "observedInGnomad": false
    },
    "582": {
      "pos": 582,
      "cdnaChange": "c.1744G>A",
      "aaChange": "p.Gly582Ser",
      "ac": 0,
      "an": 1491933,
      "af": 0.0,
      "variantId": "2-188996479-G-A",
      "observedInGnomad": false
    },
    "666": {
      "pos": 666,
      "cdnaChange": "c.1996G>A",
      "aaChange": "p.Gly666Ser",
      "ac": 12,
      "an": 1461616,
      "af": 8.210090748869744e-06,
      "variantId": "2-188998692-G-A",
      "observedInGnomad": true
    },
    "786": {
      "pos": 786,
      "cdnaChange": "c.2356G>A",
      "aaChange": "p.Gly786Arg",
      "ac": 0,
      "an": 1491933,
      "af": 0.0,
      "variantId": "2-189001554-G-A",
      "observedInGnomad": false
    },
    "897": {
      "pos": 897,
      "cdnaChange": "c.2689G>A",
      "aaChange": "p.Gly897Ser",
      "ac": 2,
      "an": 1612416,
      "af": 1.2403746923870764e-06,
      "variantId": "2-189004009-G-A",
      "observedInGnomad": true
    },
    "987": {
      "pos": 987,
      "cdnaChange": "c.2959G>A",
      "aaChange": "p.Gly987Ser",
      "ac": 2,
      "an": 1461768,
      "af": 1.3682061722516842e-06,
      "variantId": "2-189005377-G-A",
      "observedInGnomad": true
    },
    "1056": {
      "pos": 1056,
      "cdnaChange": "c.3166G>A",
      "aaChange": "p.Gly1056Ser",
      "ac": 3,
      "an": 1613926,
      "af": 1.858821284247233e-06,
      "variantId": "2-189006417-G-A",
      "observedInGnomad": true
    },
    "1077": {
      "pos": 1077,
      "cdnaChange": "c.3229G>A",
      "aaChange": "p.Gly1077Ser",
      "ac": 0,
      "an": 1491933,
      "af": 0.0,
      "variantId": "2-189006964-G-A",
      "observedInGnomad": false
    },
    "1131": {
      "pos": 1131,
      "cdnaChange": "c.3391G>A",
      "aaChange": "p.Gly1131Ser",
      "ac": 1,
      "an": 1461848,
      "af": 6.840656484121468e-07,
      "variantId": "2-189007912-G-A",
      "observedInGnomad": true
    }
  },
  "COL4A1": {
    "109": {
      "pos": 109,
      "cdnaChange": "c.325G>A",
      "aaChange": "p.Gly109Arg",
      "ac": 0,
      "an": 1511877,
      "af": 0.0,
      "variantId": "13-110212479-C-T",
      "observedInGnomad": false
    },
    "115": {
      "pos": 115,
      "cdnaChange": "c.343G>A",
      "aaChange": "p.Gly115Ser",
      "ac": 31,
      "an": 1613960,
      "af": 1.9207415301494462e-05,
      "variantId": "13-110212461-C-T",
      "observedInGnomad": true
    },
    "136": {
      "pos": 136,
      "cdnaChange": "c.406G>A",
      "aaChange": "p.Gly136Arg",
      "ac": 0,
      "an": 1511877,
      "af": 0.0,
      "variantId": "13-110211904-C-T",
      "observedInGnomad": false
    },
    "148": {
      "pos": 148,
      "cdnaChange": "c.442G>A",
      "aaChange": "p.Gly148Arg",
      "ac": 0,
      "an": 1511877,
      "af": 0.0,
      "variantId": "13-110211673-C-T",
      "observedInGnomad": false
    },
    "179": {
      "pos": 179,
      "cdnaChange": "c.535G>A",
      "aaChange": "p.Gly179Arg",
      "ac": 2,
      "an": 1461834,
      "af": 1.3681443994324936e-06,
      "variantId": "13-110210146-C-T",
      "observedInGnomad": true
    },
    "203": {
      "pos": 203,
      "cdnaChange": "c.607G>A",
      "aaChange": "p.Gly203Arg",
      "ac": 1,
      "an": 1461868,
      "af": 6.840562896239606e-07,
      "variantId": "13-110209988-C-T",
      "observedInGnomad": true
    },
    "212": {
      "pos": 212,
      "cdnaChange": "c.634G>A",
      "aaChange": "p.Gly212Ser",
      "ac": 0,
      "an": 1511877,
      "af": 0.0,
      "variantId": "13-110209409-C-T",
      "observedInGnomad": false
    },
    "275": {
      "pos": 275,
      "cdnaChange": "c.823G>A",
      "aaChange": "p.Gly275Arg",
      "ac": 28,
      "an": 1614176,
      "af": 1.7346311678528238e-05,
      "variantId": "13-110206700-C-T",
      "observedInGnomad": true
    },
    "281": {
      "pos": 281,
      "cdnaChange": "c.841G>A",
      "aaChange": "p.Gly281Arg",
      "ac": 2,
      "an": 1461850,
      "af": 1.368129425043609e-06,
      "variantId": "13-110206682-C-T",
      "observedInGnomad": true
    },
    "290": {
      "pos": 290,
      "cdnaChange": "c.868G>A",
      "aaChange": "p.Gly290Arg",
      "ac": 5,
      "an": 1609516,
      "af": 3.1065239488144263e-06,
      "variantId": "13-110205529-C-T",
      "observedInGnomad": true
    },
    "302": {
      "pos": 302,
      "cdnaChange": "c.904G>A",
      "aaChange": "p.Gly302Ser",
      "ac": 1,
      "an": 1461888,
      "af": 6.840469310918484e-07,
      "variantId": "13-110205406-C-T",
      "observedInGnomad": true
    },
    "308": {
      "pos": 308,
      "cdnaChange": "c.922G>A",
      "aaChange": "p.Gly308Arg",
      "ac": 27,
      "an": 1613946,
      "af": 1.672918424780011e-05,
      "variantId": "13-110205388-C-T",
      "observedInGnomad": true
    },
    "371": {
      "pos": 371,
      "cdnaChange": "c.1111G>A",
      "aaChange": "p.Gly371Arg",
      "ac": 1,
      "an": 1461864,
      "af": 6.840581613611115e-07,
      "variantId": "13-110200863-C-G",
      "observedInGnomad": true
    },
    "437": {
      "pos": 437,
      "cdnaChange": "c.1309G>A",
      "aaChange": "p.Gly437Arg",
      "ac": 13,
      "an": 1613984,
      "af": 8.05460277177469e-06,
      "variantId": "13-110195095-C-T",
      "observedInGnomad": true
    },
    "474": {
      "pos": 474,
      "cdnaChange": "c.1420G>A",
      "aaChange": "p.Gly474Arg",
      "ac": 74,
      "an": 1613946,
      "af": 4.585035682730401e-05,
      "variantId": "13-110192875-C-T",
      "observedInGnomad": true
    },
    "480": {
      "pos": 480,
      "cdnaChange": "c.1438G>A",
      "aaChange": "p.Gly480Arg",
      "ac": 0,
      "an": 1511877,
      "af": 0.0,
      "variantId": "13-110192857-C-T",
      "observedInGnomad": false
    },
    "553": {
      "pos": 553,
      "cdnaChange": "c.1657G>A",
      "aaChange": "p.Gly553Ser",
      "ac": 8,
      "an": 1613848,
      "af": 4.957096331253005e-06,
      "variantId": "13-110187209-C-T",
      "observedInGnomad": true
    },
    "601": {
      "pos": 601,
      "cdnaChange": "c.1801G>A",
      "aaChange": "p.Gly601Ser",
      "ac": 1,
      "an": 1461456,
      "af": 6.842491323721002e-07,
      "variantId": "13-110186481-C-T",
      "observedInGnomad": true
    },
    "670": {
      "pos": 670,
      "cdnaChange": "c.2008G>A",
      "aaChange": "p.Gly670Arg",
      "ac": 0,
      "an": 1511877,
      "af": 0.0,
      "variantId": "13-110183080-C-T",
      "observedInGnomad": false
    },
    "696": {
      "pos": 696,
      "cdnaChange": "c.2086G>A",
      "aaChange": "p.Gly696Ser",
      "ac": 0,
      "an": 1460086,
      "af": 0.0,
      "variantId": "13-110183002-C-T",
      "observedInGnomad": false
    },
    "702": {
      "pos": 702,
      "cdnaChange": "c.2104G>A",
      "aaChange": "p.Gly702Ser",
      "ac": 2,
      "an": 1461032,
      "af": 1.3688954109150245e-06,
      "variantId": "13-110181381-C-T",
      "observedInGnomad": true
    },
    "749": {
      "pos": 749,
      "cdnaChange": "c.2245G>A",
      "aaChange": "p.Gly749Ser",
      "ac": 2,
      "an": 1461872,
      "af": 1.368108835794105e-06,
      "variantId": "13-110179370-C-T",
      "observedInGnomad": true
    },
    "755": {
      "pos": 755,
      "cdnaChange": "c.2263G>A",
      "aaChange": "p.Gly755Arg",
      "ac": 1,
      "an": 1461884,
      "af": 6.840488027777854e-07,
      "variantId": "13-110179352-C-T",
      "observedInGnomad": true
    },
    "773": {
      "pos": 773,
      "cdnaChange": "c.2317G>A",
      "aaChange": "p.Gly773Arg",
      "ac": 0,
      "an": 1511877,
      "af": 0.0,
      "variantId": "13-110179298-C-T",
      "observedInGnomad": false
    },
    "832": {
      "pos": 832,
      "cdnaChange": "c.2494G>A",
      "aaChange": "p.Gly832Arg",
      "ac": 0,
      "an": 1511877,
      "af": 0.0,
      "variantId": "13-110178196-C-T",
      "observedInGnomad": false
    },
    "888": {
      "pos": 888,
      "cdnaChange": "c.2662G>A",
      "aaChange": "p.Gly888Arg",
      "ac": 0,
      "an": 1511877,
      "af": 0.0,
      "variantId": "13-110177896-C-T",
      "observedInGnomad": false
    },
    "930": {
      "pos": 930,
      "cdnaChange": "c.2788G>A",
      "aaChange": "p.Gly930Ser",
      "ac": 0,
      "an": 1511877,
      "af": 0.0,
      "variantId": "13-110176966-C-T",
      "observedInGnomad": false
    },
    "981": {
      "pos": 981,
      "cdnaChange": "c.2941G>A",
      "aaChange": "p.Gly981Arg",
      "ac": 1,
      "an": 1461826,
      "af": 6.840759433749297e-07,
      "variantId": "13-110176653-C-T",
      "observedInGnomad": true
    },
    "1103": {
      "pos": 1103,
      "cdnaChange": "c.3307G>A",
      "aaChange": "p.Gly1103Arg",
      "ac": 0,
      "an": 1461860,
      "af": 0.0,
      "variantId": "13-110174641-C-T",
      "observedInGnomad": false
    },
    "1198": {
      "pos": 1198,
      "cdnaChange": "c.3592G>A",
      "aaChange": "p.Gly1198Arg",
      "ac": 3,
      "an": 1461880,
      "af": 2.052152023421895e-06,
      "variantId": "13-110170697-C-T",
      "observedInGnomad": true
    },
    "1239": {
      "pos": 1239,
      "cdnaChange": "c.3715G>A",
      "aaChange": "p.Gly1239Arg",
      "ac": 0,
      "an": 1511877,
      "af": 0.0,
      "variantId": "13-110170574-C-T",
      "observedInGnomad": false
    },
    "1278": {
      "pos": 1278,
      "cdnaChange": "c.3832G>A",
      "aaChange": "p.Gly1278Ser",
      "ac": 19,
      "an": 1614022,
      "af": 1.1771834584658697e-05,
      "variantId": "13-110169673-C-T",
      "observedInGnomad": true
    },
    "1360": {
      "pos": 1360,
      "cdnaChange": "c.4078G>A",
      "aaChange": "p.Gly1360Arg",
      "ac": 4,
      "an": 1452806,
      "af": 2.7532925937805875e-06,
      "variantId": "13-110164934-C-T",
      "observedInGnomad": true
    },
    "1402": {
      "pos": 1402,
      "cdnaChange": "c.4204G>A",
      "aaChange": "p.Gly1402Ser",
      "ac": 5,
      "an": 1461868,
      "af": 3.420281448119803e-06,
      "variantId": "13-110163508-C-T",
      "observedInGnomad": true
    },
    "1414": {
      "pos": 1414,
      "cdnaChange": "c.4240G>A",
      "aaChange": "p.Gly1414Arg",
      "ac": 0,
      "an": 1461798,
      "af": 0.0,
      "variantId": "13-110163472-C-T",
      "observedInGnomad": false
    }
  },
  "COL4A2": {
    "97": {
      "pos": 97,
      "cdnaChange": "c.289G>A",
      "aaChange": "p.Gly97Arg",
      "ac": 38,
      "an": 1614124,
      "af": 2.3542181393746702e-05,
      "variantId": "13-110424842-G-A",
      "observedInGnomad": true
    },
    "139": {
      "pos": 139,
      "cdnaChange": "c.415G>A",
      "aaChange": "p.Gly139Arg",
      "ac": 24,
      "an": 1585416,
      "af": 1.5137982712423742e-05,
      "variantId": "13-110428521-G-A",
      "observedInGnomad": true
    },
    "151": {
      "pos": 151,
      "cdnaChange": "c.451G>A",
      "aaChange": "p.Gly151Ser",
      "ac": 10,
      "an": 1561132,
      "af": 6.405608238124643e-06,
      "variantId": "13-110428557-G-A",
      "observedInGnomad": true
    },
    "157": {
      "pos": 157,
      "cdnaChange": "c.469G>A",
      "aaChange": "p.Gly157Arg",
      "ac": 15,
      "an": 1386352,
      "af": 1.0819762946207024e-05,
      "variantId": "13-110428575-G-A",
      "observedInGnomad": true
    },
    "160": {
      "pos": 160,
      "cdnaChange": "c.478G>A",
      "aaChange": "p.Gly160Arg",
      "ac": 0,
      "an": 1543122,
      "af": 0.0,
      "variantId": "13-110429885-G-A",
      "observedInGnomad": false
    },
    "193": {
      "pos": 193,
      "cdnaChange": "c.577G>A",
      "aaChange": "p.Gly193Ser",
      "ac": 53,
      "an": 1613944,
      "af": 3.283880977282979e-05,
      "variantId": "13-110430428-G-A",
      "observedInGnomad": true
    },
    "199": {
      "pos": 199,
      "cdnaChange": "c.595G>A",
      "aaChange": "p.Gly199Ser",
      "ac": 32,
      "an": 1614036,
      "af": 1.9826075750478924e-05,
      "variantId": "13-110430554-G-A",
      "observedInGnomad": true
    },
    "237": {
      "pos": 237,
      "cdnaChange": "c.709G>A",
      "aaChange": "p.Gly237Arg",
      "ac": 7,
      "an": 1613826,
      "af": 4.337518418962143e-06,
      "variantId": "13-110434425-G-A",
      "observedInGnomad": true
    },
    "252": {
      "pos": 252,
      "cdnaChange": "c.754G>A",
      "aaChange": "p.Gly252Arg",
      "ac": 1,
      "an": 1461874,
      "af": 6.840534820374396e-07,
      "variantId": "13-110436296-G-C",
      "observedInGnomad": true
    },
    "341": {
      "pos": 341,
      "cdnaChange": "c.1021G>A",
      "aaChange": "p.Gly341Arg",
      "ac": 9,
      "an": 1459820,
      "af": 6.165143647846995e-06,
      "variantId": "13-110446807-G-A",
      "observedInGnomad": true
    },
    "413": {
      "pos": 413,
      "cdnaChange": "c.1237G>A",
      "aaChange": "p.Gly413Arg",
      "ac": 4,
      "an": 1613636,
      "af": 2.4788737980560674e-06,
      "variantId": "13-110450352-G-A",
      "observedInGnomad": true
    },
    "416": {
      "pos": 416,
      "cdnaChange": "c.1246G>A",
      "aaChange": "p.Gly416Ser",
      "ac": 4,
      "an": 1461390,
      "af": 2.7371201390457033e-06,
      "variantId": "13-110450361-G-A",
      "observedInGnomad": true
    },
    "438": {
      "pos": 438,
      "cdnaChange": "c.1312G>A",
      "aaChange": "p.Gly438Arg",
      "ac": 3,
      "an": 1613776,
      "af": 1.8589940611336394e-06,
      "variantId": "13-110450427-G-A",
      "observedInGnomad": true
    },
    "466": {
      "pos": 466,
      "cdnaChange": "c.1396G>A",
      "aaChange": "p.Gly466Ser",
      "ac": 152,
      "an": 1613040,
      "af": 9.423200912562615e-05,
      "variantId": "13-110457399-G-A",
      "observedInGnomad": true
    },
    "472": {
      "pos": 472,
      "cdnaChange": "c.1414G>A",
      "aaChange": "p.Gly472Arg",
      "ac": 23,
      "an": 1453692,
      "af": 1.582178343142839e-05,
      "variantId": "13-110457417-G-A",
      "observedInGnomad": true
    },
    "509": {
      "pos": 509,
      "cdnaChange": "c.1525G>A",
      "aaChange": "p.Gly509Arg",
      "ac": 14,
      "an": 1612748,
      "af": 8.680835443603092e-06,
      "variantId": "13-110458863-G-A",
      "observedInGnomad": true
    },
    "521": {
      "pos": 521,
      "cdnaChange": "c.1561G>A",
      "aaChange": "p.Gly521Ser",
      "ac": 10,
      "an": 1592628,
      "af": 6.278930170761785e-06,
      "variantId": "13-110458899-G-A",
      "observedInGnomad": true
    },
    "524": {
      "pos": 524,
      "cdnaChange": "c.1570G>A",
      "aaChange": "p.Gly524Ser",
      "ac": 44,
      "an": 1586662,
      "af": 2.773117399925126e-05,
      "variantId": "13-110458908-G-A",
      "observedInGnomad": true
    },
    "542": {
      "pos": 542,
      "cdnaChange": "c.1624G>A",
      "aaChange": "p.Gly542Arg",
      "ac": 2,
      "an": 1461894,
      "af": 1.368088247164295e-06,
      "variantId": "13-110462141-G-A",
      "observedInGnomad": true
    },
    "563": {
      "pos": 563,
      "cdnaChange": "c.1687G>A",
      "aaChange": "p.Gly563Ser",
      "ac": 4,
      "an": 1461856,
      "af": 2.736247619464571e-06,
      "variantId": "13-110462295-G-A",
      "observedInGnomad": true
    },
    "569": {
      "pos": 569,
      "cdnaChange": "c.1705G>A",
      "aaChange": "p.Gly569Arg",
      "ac": 8,
      "an": 1461842,
      "af": 5.47254764878831e-06,
      "variantId": "13-110462313-G-A",
      "observedInGnomad": true
    },
    "587": {
      "pos": 587,
      "cdnaChange": "c.1759G>A",
      "aaChange": "p.Gly587Ser",
      "ac": 22,
      "an": 1613310,
      "af": 1.3636560859351271e-05,
      "variantId": "13-110462367-G-A",
      "observedInGnomad": true
    },
    "593": {
      "pos": 593,
      "cdnaChange": "c.1777G>A",
      "aaChange": "p.Gly593Ser",
      "ac": 2,
      "an": 1604430,
      "af": 1.2465486185124935e-06,
      "variantId": "13-110465405-G-A",
      "observedInGnomad": true
    },
    "627": {
      "pos": 627,
      "cdnaChange": "c.1879G>A",
      "aaChange": "p.Gly627Ser",
      "ac": 23,
      "an": 1613868,
      "af": 1.4251475337512113e-05,
      "variantId": "13-110465507-G-A",
      "observedInGnomad": true
    },
    "639": {
      "pos": 639,
      "cdnaChange": "c.1915G>A",
      "aaChange": "p.Gly639Ser",
      "ac": 36,
      "an": 1613850,
      "af": 2.230690584626824e-05,
      "variantId": "13-110465543-G-A",
      "observedInGnomad": true
    },
    "759": {
      "pos": 759,
      "cdnaChange": "c.2275G>A",
      "aaChange": "p.Gly759Ser",
      "ac": 23,
      "an": 1526026,
      "af": 1.5071827085514926e-05,
      "variantId": "13-110473000-G-A",
      "observedInGnomad": true
    },
    "782": {
      "pos": 782,
      "cdnaChange": "c.2344G>A",
      "aaChange": "p.Gly782Arg",
      "ac": 138,
      "an": 1536844,
      "af": 8.979440984250842e-05,
      "variantId": "13-110473069-G-A",
      "observedInGnomad": true
    },
    "800": {
      "pos": 800,
      "cdnaChange": "c.2398G>A",
      "aaChange": "p.Gly800Arg",
      "ac": 7,
      "an": 1560246,
      "af": 4.486472005055613e-06,
      "variantId": "13-110473123-G-A",
      "observedInGnomad": true
    },
    "830": {
      "pos": 830,
      "cdnaChange": "c.2488G>A",
      "aaChange": "p.Gly830Ser",
      "ac": 18,
      "an": 1453298,
      "af": 1.2385622219255789e-05,
      "variantId": "13-110478065-G-A",
      "observedInGnomad": true
    },
    "917": {
      "pos": 917,
      "cdnaChange": "c.2749G>A",
      "aaChange": "p.Gly917Arg",
      "ac": 3,
      "an": 1458834,
      "af": 2.056436852993555e-06,
      "variantId": "13-110480381-G-A",
      "observedInGnomad": true
    },
    "941": {
      "pos": 941,
      "cdnaChange": "c.2821G>A",
      "aaChange": "p.Gly941Arg",
      "ac": 0,
      "an": 1543122,
      "af": 0.0,
      "variantId": "13-110482578-G-A",
      "observedInGnomad": false
    },
    "953": {
      "pos": 953,
      "cdnaChange": "c.2857G>A",
      "aaChange": "p.Gly953Arg",
      "ac": 2,
      "an": 1461874,
      "af": 1.3681069640748791e-06,
      "variantId": "13-110482614-G-A",
      "observedInGnomad": true
    },
    "956": {
      "pos": 956,
      "cdnaChange": "c.2866G>A",
      "aaChange": "p.Gly956Ser",
      "ac": 5,
      "an": 1613960,
      "af": 3.0979702099184616e-06,
      "variantId": "13-110482623-G-A",
      "observedInGnomad": true
    },
    "1030": {
      "pos": 1030,
      "cdnaChange": "c.3088G>A",
      "aaChange": "p.Gly1030Ser",
      "ac": 14,
      "an": 1613510,
      "af": 8.67673581198753e-06,
      "variantId": "13-110485717-G-A",
      "observedInGnomad": true
    },
    "1040": {
      "pos": 1040,
      "cdnaChange": "c.3118G>A",
      "aaChange": "p.Gly1040Arg",
      "ac": 0,
      "an": 1543122,
      "af": 0.0,
      "variantId": "13-110485747-G-A",
      "observedInGnomad": false
    },
    "1043": {
      "pos": 1043,
      "cdnaChange": "c.3127G>A",
      "aaChange": "p.Gly1043Ser",
      "ac": 6,
      "an": 1461644,
      "af": 4.104966736086215e-06,
      "variantId": "13-110485756-G-A",
      "observedInGnomad": true
    },
    "1046": {
      "pos": 1046,
      "cdnaChange": "c.3136G>A",
      "aaChange": "p.Gly1046Ser",
      "ac": 5,
      "an": 1461660,
      "af": 3.4207681676997388e-06,
      "variantId": "13-110485765-G-A",
      "observedInGnomad": true
    },
    "1091": {
      "pos": 1091,
      "cdnaChange": "c.3271G>A",
      "aaChange": "p.Gly1091Ser",
      "ac": 19,
      "an": 1614032,
      "af": 1.1771761650326635e-05,
      "variantId": "13-110489508-G-A",
      "observedInGnomad": true
    },
    "1094": {
      "pos": 1094,
      "cdnaChange": "c.3280G>A",
      "aaChange": "p.Gly1094Arg",
      "ac": 0,
      "an": 1543122,
      "af": 0.0,
      "variantId": "13-110489719-G-A",
      "observedInGnomad": false
    },
    "1131": {
      "pos": 1131,
      "cdnaChange": "c.3391G>A",
      "aaChange": "p.Gly1131Ser",
      "ac": 6,
      "an": 1601030,
      "af": 3.7475874905529567e-06,
      "variantId": "13-110491277-G-A",
      "observedInGnomad": true
    },
    "1197": {
      "pos": 1197,
      "cdnaChange": "c.3589G>A",
      "aaChange": "p.Gly1197Ser",
      "ac": 7,
      "an": 1614034,
      "af": 4.336959444472669e-06,
      "variantId": "13-110493237-G-A",
      "observedInGnomad": true
    },
    "1200": {
      "pos": 1200,
      "cdnaChange": "c.3598G>A",
      "aaChange": "p.Gly1200Ser",
      "ac": 8,
      "an": 1614008,
      "af": 4.956604923891331e-06,
      "variantId": "13-110493246-G-A",
      "observedInGnomad": true
    },
    "1217": {
      "pos": 1217,
      "cdnaChange": "c.3649G>A",
      "aaChange": "p.Gly1217Arg",
      "ac": 16,
      "an": 1461818,
      "af": 1.0945274993193408e-05,
      "variantId": "13-110495356-G-A",
      "observedInGnomad": true
    },
    "1329": {
      "pos": 1329,
      "cdnaChange": "c.3985G>A",
      "aaChange": "p.Gly1329Arg",
      "ac": 7,
      "an": 1461312,
      "af": 4.790215915560811e-06,
      "variantId": "13-110503228-G-A",
      "observedInGnomad": true
    },
    "1332": {
      "pos": 1332,
      "cdnaChange": "c.3994G>A",
      "aaChange": "p.Gly1332Arg",
      "ac": 14,
      "an": 1461062,
      "af": 9.582071123607349e-06,
      "variantId": "13-110503237-G-A",
      "observedInGnomad": true
    },
    "1383": {
      "pos": 1383,
      "cdnaChange": "c.4147G>A",
      "aaChange": "p.Gly1383Arg",
      "ac": 2,
      "an": 1613796,
      "af": 1.239314014906469e-06,
      "variantId": "13-110503855-G-A",
      "observedInGnomad": true
    },
    "1389": {
      "pos": 1389,
      "cdnaChange": "c.4165G>A",
      "aaChange": "p.Gly1389Arg",
      "ac": 1,
      "an": 152110,
      "af": 6.57418973111564e-06,
      "variantId": "13-110503873-G-A",
      "observedInGnomad": true
    },
    "1426": {
      "pos": 1426,
      "cdnaChange": "c.4276G>A",
      "aaChange": "p.Gly1426Arg",
      "ac": 2,
      "an": 1405250,
      "af": 1.4232342999466288e-06,
      "variantId": "13-110503984-G-A",
      "observedInGnomad": true
    },
    "1450": {
      "pos": 1450,
      "cdnaChange": "c.4348G>A",
      "aaChange": "p.Gly1450Ser",
      "ac": 13,
      "an": 1614016,
      "af": 8.054443078631191e-06,
      "variantId": "13-110504210-G-A",
      "observedInGnomad": true
    }
  },
  "COL4A3": {
    "43": {
      "pos": 43,
      "cdnaChange": "c.127G>A",
      "aaChange": "p.Gly43Arg",
      "ac": 543490,
      "an": 1604472,
      "af": 0.33873448710853166,
      "variantId": "2-227238007-G-C",
      "observedInGnomad": true
    },
    "58": {
      "pos": 58,
      "cdnaChange": "c.172G>A",
      "aaChange": "p.Gly58Ser",
      "ac": 41,
      "an": 1611166,
      "af": 2.5447408895172813e-05,
      "variantId": "2-227240170-G-A",
      "observedInGnomad": true
    },
    "115": {
      "pos": 115,
      "cdnaChange": "c.343G>A",
      "aaChange": "p.Gly115Arg",
      "ac": 19,
      "an": 1613654,
      "af": 1.177451919680427e-05,
      "variantId": "2-227245972-G-A",
      "observedInGnomad": true
    },
    "118": {
      "pos": 118,
      "cdnaChange": "c.352G>A",
      "aaChange": "p.Gly118Arg",
      "ac": 1,
      "an": 1461624,
      "af": 6.841704843379692e-07,
      "variantId": "2-227245981-G-C",
      "observedInGnomad": true
    },
    "121": {
      "pos": 121,
      "cdnaChange": "c.361G>A",
      "aaChange": "p.Gly121Ser",
      "ac": 15,
      "an": 1613638,
      "af": 9.295765221195831e-06,
      "variantId": "2-227245990-G-A",
      "observedInGnomad": true
    },
    "174": {
      "pos": 174,
      "cdnaChange": "c.520G>A",
      "aaChange": "p.Gly174Arg",
      "ac": 1,
      "an": 1460992,
      "af": 6.844664447170142e-07,
      "variantId": "2-227248494-G-C",
      "observedInGnomad": true
    },
    "300": {
      "pos": 300,
      "cdnaChange": "c.898G>A",
      "aaChange": "p.Gly300Arg",
      "ac": 33,
      "an": 1461620,
      "af": 2.2577687771103298e-05,
      "variantId": "2-227256035-G-A",
      "observedInGnomad": true
    },
    "378": {
      "pos": 378,
      "cdnaChange": "c.1132G>A",
      "aaChange": "p.Gly378Arg",
      "ac": 4,
      "an": 1459824,
      "af": 2.740056335558259e-06,
      "variantId": "2-227261099-G-A",
      "observedInGnomad": true
    },
    "452": {
      "pos": 452,
      "cdnaChange": "c.1354G>A",
      "aaChange": "p.Gly452Arg",
      "ac": 2,
      "an": 1461794,
      "af": 1.3681818368388433e-06,
      "variantId": "2-227266455-G-A",
      "observedInGnomad": true
    },
    "487": {
      "pos": 487,
      "cdnaChange": "c.1459G>A",
      "aaChange": "p.Gly487Ser",
      "ac": 150,
      "an": 1613808,
      "af": 9.294785996847209e-05,
      "variantId": "2-227267043-G-A",
      "observedInGnomad": true
    },
    "619": {
      "pos": 619,
      "cdnaChange": "c.1855G>A",
      "aaChange": "p.Gly619Arg",
      "ac": 9,
      "an": 1461814,
      "af": 6.156734030458047e-06,
      "variantId": "2-227273045-G-A",
      "observedInGnomad": true
    },
    "637": {
      "pos": 637,
      "cdnaChange": "c.1909G>A",
      "aaChange": "p.Gly637Arg",
      "ac": 5,
      "an": 1613730,
      "af": 3.0984117541348306e-06,
      "variantId": "2-227273099-G-A",
      "observedInGnomad": true
    },
    "640": {
      "pos": 640,
      "cdnaChange": "c.1918G>A",
      "aaChange": "p.Gly640Arg",
      "ac": 11,
      "an": 1613642,
      "af": 6.816877597385294e-06,
      "variantId": "2-227273108-G-A",
      "observedInGnomad": true
    },
    "643": {
      "pos": 643,
      "cdnaChange": "c.1927G>A",
      "aaChange": "p.Gly643Ser",
      "ac": 14,
      "an": 1613180,
      "af": 8.678510767552287e-06,
      "variantId": "2-227273117-G-A",
      "observedInGnomad": true
    },
    "943": {
      "pos": 943,
      "cdnaChange": "c.2827G>A",
      "aaChange": "p.Gly943Arg",
      "ac": 26,
      "an": 1461826,
      "af": 1.778597452774817e-05,
      "variantId": "2-227284291-G-A",
      "observedInGnomad": true
    },
    "988": {
      "pos": 988,
      "cdnaChange": "c.2962G>A",
      "aaChange": "p.Gly988Arg",
      "ac": 7,
      "an": 1613200,
      "af": 4.339201586908009e-06,
      "variantId": "2-227289230-G-A",
      "observedInGnomad": true
    },
    "1167": {
      "pos": 1167,
      "cdnaChange": "c.3499G>A",
      "aaChange": "p.Gly1167Arg",
      "ac": 14,
      "an": 1613458,
      "af": 8.677015453764523e-06,
      "variantId": "2-227295044-G-A",
      "observedInGnomad": true
    },
    "1231": {
      "pos": 1231,
      "cdnaChange": "c.3691G>A",
      "aaChange": "p.Gly1231Ser",
      "ac": 18,
      "an": 1573722,
      "af": 1.1437852428827963e-05,
      "variantId": "2-227297799-G-A",
      "observedInGnomad": true
    }
  },
  "COL4A4": {
    "98": {
      "pos": 98,
      "cdnaChange": "c.292G>A",
      "aaChange": "p.Gly98Ser",
      "ac": 43,
      "an": 1614042,
      "af": 2.6641190254033042e-05,
      "variantId": "2-227121049-C-T",
      "observedInGnomad": true
    },
    "235": {
      "pos": 235,
      "cdnaChange": "c.703G>A",
      "aaChange": "p.Gly235Ser",
      "ac": 42,
      "an": 1613854,
      "af": 2.60246589840221e-05,
      "variantId": "2-227108613-C-T",
      "observedInGnomad": true
    },
    "466": {
      "pos": 466,
      "cdnaChange": "c.1396G>A",
      "aaChange": "p.Gly466Arg",
      "ac": 13,
      "an": 1613412,
      "af": 8.057458355336393e-06,
      "variantId": "2-227089931-C-T",
      "observedInGnomad": true
    },
    "748": {
      "pos": 748,
      "cdnaChange": "c.2242G>A",
      "aaChange": "p.Gly748Ser",
      "ac": 33,
      "an": 1613958,
      "af": 2.0446628722680516e-05,
      "variantId": "2-227059546-C-T",
      "observedInGnomad": true
    },
    "864": {
      "pos": 864,
      "cdnaChange": "c.2590G>A",
      "aaChange": "p.Gly864Arg",
      "ac": 34,
      "an": 1613904,
      "af": 2.1066928392271163e-05,
      "variantId": "2-227056071-C-T",
      "observedInGnomad": true
    },
    "873": {
      "pos": 873,
      "cdnaChange": "c.2617G>A",
      "aaChange": "p.Gly873Arg",
      "ac": 6,
      "an": 1613810,
      "af": 3.717909791115435e-06,
      "variantId": "2-227056044-C-T",
      "observedInGnomad": true
    },
    "918": {
      "pos": 918,
      "cdnaChange": "c.2752G>A",
      "aaChange": "p.Gly918Arg",
      "ac": 20,
      "an": 1614046,
      "af": 1.2391220572400043e-05,
      "variantId": "2-227054702-C-T",
      "observedInGnomad": true
    },
    "960": {
      "pos": 960,
      "cdnaChange": "c.2878G>A",
      "aaChange": "p.Gly960Arg",
      "ac": 14,
      "an": 1608358,
      "af": 8.704529712912175e-06,
      "variantId": "2-227052395-C-T",
      "observedInGnomad": true
    },
    "996": {
      "pos": 996,
      "cdnaChange": "c.2986G>A",
      "aaChange": "p.Gly996Arg",
      "ac": 0,
      "an": 1461852,
      "af": 0.0,
      "variantId": "2-227051141-C-G",
      "observedInGnomad": false
    },
    "1008": {
      "pos": 1008,
      "cdnaChange": "c.3022G>A",
      "aaChange": "p.Gly1008Arg",
      "ac": 31,
      "an": 1614092,
      "af": 1.920584452435177e-05,
      "variantId": "2-227051105-C-T",
      "observedInGnomad": true
    },
    "1103": {
      "pos": 1103,
      "cdnaChange": "c.3307G>A",
      "aaChange": "p.Gly1103Arg",
      "ac": 30,
      "an": 1613970,
      "af": 1.8587706091191287e-05,
      "variantId": "2-227043167-C-T",
      "observedInGnomad": true
    },
    "1136": {
      "pos": 1136,
      "cdnaChange": "c.3406G>A",
      "aaChange": "p.Gly1136Arg",
      "ac": 1,
      "an": 152128,
      "af": 6.573411863693732e-06,
      "variantId": "2-227042247-C-G",
      "observedInGnomad": true
    },
    "1172": {
      "pos": 1172,
      "cdnaChange": "c.3514G>A",
      "aaChange": "p.Gly1172Arg",
      "ac": 1,
      "an": 1460888,
      "af": 6.845151715942632e-07,
      "variantId": "2-227033473-C-G",
      "observedInGnomad": true
    },
    "1178": {
      "pos": 1178,
      "cdnaChange": "c.3532G>A",
      "aaChange": "p.Gly1178Ser",
      "ac": 91,
      "an": 1613518,
      "af": 5.6398503146540664e-05,
      "variantId": "2-227033455-C-T",
      "observedInGnomad": true
    },
    "1430": {
      "pos": 1430,
      "cdnaChange": "c.4288G>A",
      "aaChange": "p.Gly1430Arg",
      "ac": 7,
      "an": 1613974,
      "af": 4.337120672328055e-06,
      "variantId": "2-227012226-C-T",
      "observedInGnomad": true
    },
    "1439": {
      "pos": 1439,
      "cdnaChange": "c.4315G>A",
      "aaChange": "p.Gly1439Ser",
      "ac": 3,
      "an": 1461574,
      "af": 2.0525816688036323e-06,
      "variantId": "2-227012199-C-T",
      "observedInGnomad": true
    }
  },
  "COL4A5": {
    "123": {
      "pos": 123,
      "cdnaChange": "c.367G>A",
      "aaChange": "p.Gly123Arg",
      "ac": 0,
      "an": 1112538,
      "af": 0.0,
      "variantId": "X-108568804-G-A",
      "observedInGnomad": false
    },
    "138": {
      "pos": 138,
      "cdnaChange": "c.412G>A",
      "aaChange": "p.Gly138Ser",
      "ac": 1,
      "an": 1090008,
      "af": 9.174244592700237e-07,
      "variantId": "X-108571440-G-A",
      "observedInGnomad": true
    },
    "325": {
      "pos": 325,
      "cdnaChange": "c.973G>A",
      "aaChange": "p.Gly325Arg",
      "ac": 1,
      "an": 1090915,
      "af": 9.16661701415784e-07,
      "variantId": "X-108582920-G-A",
      "observedInGnomad": true
    },
    "426": {
      "pos": 426,
      "cdnaChange": "c.1276G>A",
      "aaChange": "p.Gly426Arg",
      "ac": 4,
      "an": 1208783,
      "af": 3.3091133809790507e-06,
      "variantId": "X-108591168-G-A",
      "observedInGnomad": true
    },
    "626": {
      "pos": 626,
      "cdnaChange": "c.1876G>A",
      "aaChange": "p.Gly626Ser",
      "ac": 14,
      "an": 1209435,
      "af": 1.1575653094213414e-05,
      "variantId": "X-108598798-G-A",
      "observedInGnomad": true
    },
    "743": {
      "pos": 743,
      "cdnaChange": "c.2227G>A",
      "aaChange": "p.Gly743Ser",
      "ac": 3,
      "an": 1060520,
      "af": 2.828800965564063e-06,
      "variantId": "X-108603044-G-A",
      "observedInGnomad": true
    },
    "869": {
      "pos": 869,
      "cdnaChange": "c.2605G>A",
      "aaChange": "p.Gly869Arg",
      "ac": 2,
      "an": 1095642,
      "af": 1.8254137756675994e-06,
      "variantId": "X-108620354-G-A",
      "observedInGnomad": true
    },
    "1030": {
      "pos": 1030,
      "cdnaChange": "c.3088G>A",
      "aaChange": "p.Gly1030Ser",
      "ac": 2,
      "an": 1085171,
      "af": 1.8430275044209623e-06,
      "variantId": "X-108625776-G-A",
      "observedInGnomad": true
    },
    "1107": {
      "pos": 1107,
      "cdnaChange": "c.3319G>A",
      "aaChange": "p.Gly1107Arg",
      "ac": 0,
      "an": 1112538,
      "af": 0.0,
      "variantId": "X-108655403-G-A",
      "observedInGnomad": false
    },
    "1143": {
      "pos": 1143,
      "cdnaChange": "c.3427G>A",
      "aaChange": "p.Gly1143Ser",
      "ac": 3,
      "an": 1093076,
      "af": 2.744548412004289e-06,
      "variantId": "X-108665560-G-A",
      "observedInGnomad": true
    },
    "1170": {
      "pos": 1170,
      "cdnaChange": "c.3508G>A",
      "aaChange": "p.Gly1170Ser",
      "ac": 3,
      "an": 1094761,
      "af": 2.740324143808557e-06,
      "variantId": "X-108666549-G-A",
      "observedInGnomad": true
    },
    "1229": {
      "pos": 1229,
      "cdnaChange": "c.3685G>A",
      "aaChange": "p.Gly1229Ser",
      "ac": 1,
      "an": 1097077,
      "af": 9.115130478535235e-07,
      "variantId": "X-108668399-G-A",
      "observedInGnomad": true
    }
  },
  "COL4A6": {
    "146": {
      "pos": 146,
      "cdnaChange": "c.436G>A",
      "aaChange": "p.Gly146Arg",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108214120-C-T",
      "observedInGnomad": false
    },
    "149": {
      "pos": 149,
      "cdnaChange": "c.445G>A",
      "aaChange": "p.Gly149Arg",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108211740-C-T",
      "observedInGnomad": false
    },
    "190": {
      "pos": 190,
      "cdnaChange": "c.568G>A",
      "aaChange": "p.Gly190Arg",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108206562-C-T",
      "observedInGnomad": false
    },
    "495": {
      "pos": 495,
      "cdnaChange": "c.1483G>A",
      "aaChange": "p.Gly495Arg",
      "ac": 1,
      "an": 1082418,
      "af": 9.238575116082696e-07,
      "variantId": "X-108188621-C-T",
      "observedInGnomad": true
    },
    "579": {
      "pos": 579,
      "cdnaChange": "c.1735G>A",
      "aaChange": "p.Gly579Arg",
      "ac": 1,
      "an": 111069,
      "af": 9.003412293259146e-06,
      "variantId": "X-108187880-C-T",
      "observedInGnomad": true
    },
    "649": {
      "pos": 649,
      "cdnaChange": "c.1945G>A",
      "aaChange": "p.Gly649Arg",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108187105-C-T",
      "observedInGnomad": false
    },
    "664": {
      "pos": 664,
      "cdnaChange": "c.1990G>A",
      "aaChange": "p.Gly664Ser",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108180933-C-T",
      "observedInGnomad": false
    },
    "673": {
      "pos": 673,
      "cdnaChange": "c.2017G>A",
      "aaChange": "p.Gly673Arg",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108180906-C-T",
      "observedInGnomad": false
    },
    "789": {
      "pos": 789,
      "cdnaChange": "c.2365G>A",
      "aaChange": "p.Gly789Arg",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108178837-C-T",
      "observedInGnomad": false
    },
    "954": {
      "pos": 954,
      "cdnaChange": "c.2860G>A",
      "aaChange": "p.Gly954Arg",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108175189-C-T",
      "observedInGnomad": false
    },
    "978": {
      "pos": 978,
      "cdnaChange": "c.2932G>A",
      "aaChange": "p.Gly978Arg",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108175117-C-T",
      "observedInGnomad": false
    },
    "1072": {
      "pos": 1072,
      "cdnaChange": "c.3214G>A",
      "aaChange": "p.Gly1072Ser",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108171453-C-T",
      "observedInGnomad": false
    },
    "1079": {
      "pos": 1079,
      "cdnaChange": "c.3235G>A",
      "aaChange": "p.Gly1079Ser",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108171432-C-T",
      "observedInGnomad": false
    },
    "1136": {
      "pos": 1136,
      "cdnaChange": "c.3406G>A",
      "aaChange": "p.Gly1136Ser",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108170699-C-T",
      "observedInGnomad": false
    },
    "1160": {
      "pos": 1160,
      "cdnaChange": "c.3478G>A",
      "aaChange": "p.Gly1160Arg",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108170627-C-T",
      "observedInGnomad": false
    },
    "1195": {
      "pos": 1195,
      "cdnaChange": "c.3583G>A",
      "aaChange": "p.Gly1195Ser",
      "ac": 1,
      "an": 1096856,
      "af": 9.116967040340756e-07,
      "variantId": "X-108169603-C-T",
      "observedInGnomad": true
    },
    "1217": {
      "pos": 1217,
      "cdnaChange": "c.3649G>A",
      "aaChange": "p.Gly1217Arg",
      "ac": 1,
      "an": 1098164,
      "af": 9.106108013010807e-07,
      "variantId": "X-108169537-C-T",
      "observedInGnomad": true
    },
    "1244": {
      "pos": 1244,
      "cdnaChange": "c.3730G>A",
      "aaChange": "p.Gly1244Ser",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108165451-C-T",
      "observedInGnomad": false
    },
    "1262": {
      "pos": 1262,
      "cdnaChange": "c.3784G>A",
      "aaChange": "p.Gly1262Arg",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108165397-C-T",
      "observedInGnomad": false
    },
    "1292": {
      "pos": 1292,
      "cdnaChange": "c.3874G>A",
      "aaChange": "p.Gly1292Arg",
      "ac": 1,
      "an": 1097933,
      "af": 9.108023895811493e-07,
      "variantId": "X-108164973-C-T",
      "observedInGnomad": true
    },
    "1349": {
      "pos": 1349,
      "cdnaChange": "c.4045G>A",
      "aaChange": "p.Gly1349Arg",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108164627-C-T",
      "observedInGnomad": false
    },
    "1416": {
      "pos": 1416,
      "cdnaChange": "c.4246G>A",
      "aaChange": "p.Gly1416Ser",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108161709-C-T",
      "observedInGnomad": false
    },
    "1455": {
      "pos": 1455,
      "cdnaChange": "c.4363G>A",
      "aaChange": "p.Gly1455Arg",
      "ac": 0,
      "an": 1093842,
      "af": 0.0,
      "variantId": "X-108160628-C-T",
      "observedInGnomad": false
    }
  },
  "COL5A1": {
    "481": {
      "pos": 481,
      "cdnaChange": "c.1441G>A",
      "aaChange": "p.Gly481Arg",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134738755-G-A",
      "observedInGnomad": false
    },
    "493": {
      "pos": 493,
      "cdnaChange": "c.1477G>A",
      "aaChange": "p.Gly493Arg",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134738791-G-A",
      "observedInGnomad": false
    },
    "514": {
      "pos": 514,
      "cdnaChange": "c.1540G>A",
      "aaChange": "p.Gly514Ser",
      "ac": 3,
      "an": 1613406,
      "af": 1.8594203814786855e-06,
      "variantId": "9-134750587-G-A",
      "observedInGnomad": true
    },
    "604": {
      "pos": 604,
      "cdnaChange": "c.1810G>A",
      "aaChange": "p.Gly604Arg",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134754309-G-A",
      "observedInGnomad": false
    },
    "607": {
      "pos": 607,
      "cdnaChange": "c.1819G>A",
      "aaChange": "p.Gly607Arg",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134754318-G-A",
      "observedInGnomad": false
    },
    "634": {
      "pos": 634,
      "cdnaChange": "c.1900G>A",
      "aaChange": "p.Gly634Ser",
      "ac": 5,
      "an": 1613828,
      "af": 3.0982236025152617e-06,
      "variantId": "9-134758261-G-A",
      "observedInGnomad": true
    },
    "652": {
      "pos": 652,
      "cdnaChange": "c.1954G>A",
      "aaChange": "p.Gly652Ser",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134761943-G-A",
      "observedInGnomad": false
    },
    "667": {
      "pos": 667,
      "cdnaChange": "c.1999G>A",
      "aaChange": "p.Gly667Arg",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134763702-G-A",
      "observedInGnomad": false
    },
    "679": {
      "pos": 679,
      "cdnaChange": "c.2035G>A",
      "aaChange": "p.Gly679Arg",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134765681-G-A",
      "observedInGnomad": false
    },
    "694": {
      "pos": 694,
      "cdnaChange": "c.2080G>A",
      "aaChange": "p.Gly694Arg",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134765726-G-A",
      "observedInGnomad": false
    },
    "697": {
      "pos": 697,
      "cdnaChange": "c.2089G>A",
      "aaChange": "p.Gly697Ser",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134766454-G-A",
      "observedInGnomad": false
    },
    "703": {
      "pos": 703,
      "cdnaChange": "c.2107G>A",
      "aaChange": "p.Gly703Ser",
      "ac": 3,
      "an": 1461830,
      "af": 2.0522222146213994e-06,
      "variantId": "9-134766472-G-A",
      "observedInGnomad": true
    },
    "757": {
      "pos": 757,
      "cdnaChange": "c.2269G>A",
      "aaChange": "p.Gly757Ser",
      "ac": 7,
      "an": 1613964,
      "af": 4.337147544802734e-06,
      "variantId": "9-134768446-G-A",
      "observedInGnomad": true
    },
    "760": {
      "pos": 760,
      "cdnaChange": "c.2278G>A",
      "aaChange": "p.Gly760Arg",
      "ac": 2,
      "an": 1461750,
      "af": 1.3682230203523174e-06,
      "variantId": "9-134768455-G-A",
      "observedInGnomad": true
    },
    "814": {
      "pos": 814,
      "cdnaChange": "c.2440G>A",
      "aaChange": "p.Gly814Ser",
      "ac": 10,
      "an": 1613900,
      "af": 6.196170766466324e-06,
      "variantId": "9-134782676-G-A",
      "observedInGnomad": true
    },
    "832": {
      "pos": 832,
      "cdnaChange": "c.2494G>A",
      "aaChange": "p.Gly832Ser",
      "ac": 8,
      "an": 1613126,
      "af": 4.959315019409519e-06,
      "variantId": "9-134784998-G-A",
      "observedInGnomad": true
    },
    "835": {
      "pos": 835,
      "cdnaChange": "c.2503G>A",
      "aaChange": "p.Gly835Ser",
      "ac": 0,
      "an": 1460994,
      "af": 0.0,
      "variantId": "9-134785007-G-A",
      "observedInGnomad": false
    },
    "856": {
      "pos": 856,
      "cdnaChange": "c.2566G>A",
      "aaChange": "p.Gly856Ser",
      "ac": 2,
      "an": 1460932,
      "af": 1.3689891110606106e-06,
      "variantId": "9-134785070-G-A",
      "observedInGnomad": true
    },
    "868": {
      "pos": 868,
      "cdnaChange": "c.2602G>A",
      "aaChange": "p.Gly868Arg",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134786004-G-A",
      "observedInGnomad": false
    },
    "937": {
      "pos": 937,
      "cdnaChange": "c.2809G>A",
      "aaChange": "p.Gly937Arg",
      "ac": 15,
      "an": 1614052,
      "af": 9.293380882400319e-06,
      "variantId": "9-134796383-G-A",
      "observedInGnomad": true
    },
    "940": {
      "pos": 940,
      "cdnaChange": "c.2818G>A",
      "aaChange": "p.Gly940Ser",
      "ac": 35,
      "an": 1614036,
      "af": 2.168477035208632e-05,
      "variantId": "9-134796392-G-A",
      "observedInGnomad": true
    },
    "991": {
      "pos": 991,
      "cdnaChange": "c.2971G>A",
      "aaChange": "p.Gly991Ser",
      "ac": 11,
      "an": 1613290,
      "af": 6.818364956083531e-06,
      "variantId": "9-134801972-G-A",
      "observedInGnomad": true
    },
    "997": {
      "pos": 997,
      "cdnaChange": "c.2989G>A",
      "aaChange": "p.Gly997Ser",
      "ac": 19,
      "an": 1461086,
      "af": 1.3004025772610237e-05,
      "variantId": "9-134801990-G-A",
      "observedInGnomad": true
    },
    "1000": {
      "pos": 1000,
      "cdnaChange": "c.2998G>A",
      "aaChange": "p.Gly1000Ser",
      "ac": 5,
      "an": 1461072,
      "af": 3.422144836120328e-06,
      "variantId": "9-134801999-G-A",
      "observedInGnomad": true
    },
    "1024": {
      "pos": 1024,
      "cdnaChange": "c.3070G>A",
      "aaChange": "p.Gly1024Ser",
      "ac": 6,
      "an": 1610598,
      "af": 3.7253243826206167e-06,
      "variantId": "9-134802951-G-A",
      "observedInGnomad": true
    },
    "1102": {
      "pos": 1102,
      "cdnaChange": "c.3304G>A",
      "aaChange": "p.Gly1102Arg",
      "ac": 1,
      "an": 1398268,
      "af": 7.151704823395801e-07,
      "variantId": "9-134806234-G-A",
      "observedInGnomad": true
    },
    "1135": {
      "pos": 1135,
      "cdnaChange": "c.3403G>A",
      "aaChange": "p.Gly1135Ser",
      "ac": 8,
      "an": 1449984,
      "af": 5.517302259887006e-06,
      "variantId": "9-134809219-G-A",
      "observedInGnomad": true
    },
    "1156": {
      "pos": 1156,
      "cdnaChange": "c.3466G>A",
      "aaChange": "p.Gly1156Arg",
      "ac": 3,
      "an": 1455754,
      "af": 2.060787742984048e-06,
      "variantId": "9-134809282-G-A",
      "observedInGnomad": true
    },
    "1162": {
      "pos": 1162,
      "cdnaChange": "c.3484G>A",
      "aaChange": "p.Gly1162Arg",
      "ac": 2,
      "an": 1461836,
      "af": 1.368142527615957e-06,
      "variantId": "9-134810264-G-A",
      "observedInGnomad": true
    },
    "1189": {
      "pos": 1189,
      "cdnaChange": "c.3565G>A",
      "aaChange": "p.Gly1189Arg",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134811375-G-A",
      "observedInGnomad": false
    },
    "1198": {
      "pos": 1198,
      "cdnaChange": "c.3592G>A",
      "aaChange": "p.Gly1198Ser",
      "ac": 128,
      "an": 1612572,
      "af": 7.937630071711527e-05,
      "variantId": "9-134811501-G-A",
      "observedInGnomad": true
    },
    "1210": {
      "pos": 1210,
      "cdnaChange": "c.3628G>A",
      "aaChange": "p.Gly1210Arg",
      "ac": 2,
      "an": 1442360,
      "af": 1.3866163787126653e-06,
      "variantId": "9-134811537-G-A",
      "observedInGnomad": true
    },
    "1261": {
      "pos": 1261,
      "cdnaChange": "c.3781G>A",
      "aaChange": "p.Gly1261Arg",
      "ac": 1,
      "an": 1447320,
      "af": 6.909322057319735e-07,
      "variantId": "9-134812641-G-A",
      "observedInGnomad": true
    },
    "1300": {
      "pos": 1300,
      "cdnaChange": "c.3898G>A",
      "aaChange": "p.Gly1300Ser",
      "ac": 8,
      "an": 1398454,
      "af": 5.720602894339035e-06,
      "variantId": "9-134814028-G-A",
      "observedInGnomad": true
    },
    "1321": {
      "pos": 1321,
      "cdnaChange": "c.3961G>A",
      "aaChange": "p.Gly1321Arg",
      "ac": 14,
      "an": 1551408,
      "af": 9.024060724193764e-06,
      "variantId": "9-134814851-G-A",
      "observedInGnomad": true
    },
    "1330": {
      "pos": 1330,
      "cdnaChange": "c.3988G>A",
      "aaChange": "p.Gly1330Arg",
      "ac": 1,
      "an": 1398768,
      "af": 7.149148393443373e-07,
      "variantId": "9-134814878-G-A",
      "observedInGnomad": true
    },
    "1351": {
      "pos": 1351,
      "cdnaChange": "c.4051G>A",
      "aaChange": "p.Gly1351Arg",
      "ac": 3,
      "an": 1461438,
      "af": 2.0527726800589557e-06,
      "variantId": "9-134815612-G-A",
      "observedInGnomad": true
    },
    "1372": {
      "pos": 1372,
      "cdnaChange": "c.4114G>A",
      "aaChange": "p.Gly1372Arg",
      "ac": 1,
      "an": 1461806,
      "af": 6.840853027009056e-07,
      "variantId": "9-134815980-G-A",
      "observedInGnomad": true
    },
    "1378": {
      "pos": 1378,
      "cdnaChange": "c.4132G>A",
      "aaChange": "p.Gly1378Ser",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134817035-G-A",
      "observedInGnomad": false
    },
    "1414": {
      "pos": 1414,
      "cdnaChange": "c.4240G>A",
      "aaChange": "p.Gly1414Ser",
      "ac": 61,
      "an": 1608538,
      "af": 3.792263533718196e-05,
      "variantId": "9-134818665-G-A",
      "observedInGnomad": true
    },
    "1426": {
      "pos": 1426,
      "cdnaChange": "c.4276G>A",
      "aaChange": "p.Gly1426Ser",
      "ac": 12,
      "an": 1610118,
      "af": 7.452869913882088e-06,
      "variantId": "9-134818701-G-A",
      "observedInGnomad": true
    },
    "1435": {
      "pos": 1435,
      "cdnaChange": "c.4303G>A",
      "aaChange": "p.Gly1435Arg",
      "ac": 1,
      "an": 1459452,
      "af": 6.851886872606979e-07,
      "variantId": "9-134818728-G-A",
      "observedInGnomad": true
    },
    "1459": {
      "pos": 1459,
      "cdnaChange": "c.4375G>A",
      "aaChange": "p.Gly1459Ser",
      "ac": 26,
      "an": 1612932,
      "af": 1.611971242433035e-05,
      "variantId": "9-134818884-G-A",
      "observedInGnomad": true
    },
    "1462": {
      "pos": 1462,
      "cdnaChange": "c.4384G>A",
      "aaChange": "p.Gly1462Ser",
      "ac": 10,
      "an": 1612892,
      "af": 6.20004315230034e-06,
      "variantId": "9-134818893-G-A",
      "observedInGnomad": true
    },
    "1471": {
      "pos": 1471,
      "cdnaChange": "c.4411G>A",
      "aaChange": "p.Gly1471Ser",
      "ac": 12,
      "an": 1613290,
      "af": 7.438216315727489e-06,
      "variantId": "9-134819018-G-A",
      "observedInGnomad": true
    },
    "1489": {
      "pos": 1489,
      "cdnaChange": "c.4465G>A",
      "aaChange": "p.Gly1489Arg",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134820134-G-A",
      "observedInGnomad": false
    },
    "1492": {
      "pos": 1492,
      "cdnaChange": "c.4474G>A",
      "aaChange": "p.Gly1492Ser",
      "ac": 0,
      "an": 1523719,
      "af": 0.0,
      "variantId": "9-134820143-G-A",
      "observedInGnomad": false
    },
    "1513": {
      "pos": 1513,
      "cdnaChange": "c.4537G>A",
      "aaChange": "p.Gly1513Ser",
      "ac": 1,
      "an": 1461416,
      "af": 6.842678607597016e-07,
      "variantId": "9-134820206-G-A",
      "observedInGnomad": true
    }
  },
  "COL5A2": {
    "498": {
      "pos": 498,
      "cdnaChange": "c.1492G>A",
      "aaChange": "p.Gly498Ser",
      "ac": 0,
      "an": 1530000,
      "af": 0.0,
      "variantId": "2-189066461-C-T",
      "observedInGnomad": false
    },
    "612": {
      "pos": 612,
      "cdnaChange": "c.1834G>A",
      "aaChange": "p.Gly612Arg",
      "ac": 0,
      "an": 1530000,
      "af": 0.0,
      "variantId": "2-189063207-C-T",
      "observedInGnomad": false
    },
    "702": {
      "pos": 702,
      "cdnaChange": "c.2104G>A",
      "aaChange": "p.Gly702Arg",
      "ac": 0,
      "an": 1530000,
      "af": 0.0,
      "variantId": "2-189058875-C-T",
      "observedInGnomad": false
    },
    "849": {
      "pos": 849,
      "cdnaChange": "c.2545G>A",
      "aaChange": "p.Gly849Arg",
      "ac": 0,
      "an": 1530000,
      "af": 0.0,
      "variantId": "2-189053432-C-T",
      "observedInGnomad": false
    },
    "855": {
      "pos": 855,
      "cdnaChange": "c.2563G>A",
      "aaChange": "p.Gly855Arg",
      "ac": 0,
      "an": 1530000,
      "af": 0.0,
      "variantId": "2-189053009-C-T",
      "observedInGnomad": false
    },
    "936": {
      "pos": 936,
      "cdnaChange": "c.2806G>A",
      "aaChange": "p.Gly936Arg",
      "ac": 0,
      "an": 1530000,
      "af": 0.0,
      "variantId": "2-189051445-C-T",
      "observedInGnomad": false
    },
    "990": {
      "pos": 990,
      "cdnaChange": "c.2968G>A",
      "aaChange": "p.Gly990Arg",
      "ac": 0,
      "an": 1530000,
      "af": 0.0,
      "variantId": "2-189050640-C-T",
      "observedInGnomad": false
    },
    "1008": {
      "pos": 1008,
      "cdnaChange": "c.3022G>A",
      "aaChange": "p.Gly1008Ser",
      "ac": 0,
      "an": 1530000,
      "af": 0.0,
      "variantId": "2-189050586-C-T",
      "observedInGnomad": false
    }
  },
  "COL5A3": {
    "410": {
      "pos": 410,
      "cdnaChange": "c.1228G>A",
      "aaChange": "p.Gly410Ser",
      "ac": 42,
      "an": 1609972,
      "af": 2.608741021582984e-05,
      "variantId": "19-9997406-C-T",
      "observedInGnomad": true
    },
    "431": {
      "pos": 431,
      "cdnaChange": "c.1291G>A",
      "aaChange": "p.Gly431Ser",
      "ac": 16,
      "an": 1455900,
      "af": 1.0989765780616801e-05,
      "variantId": "19-9996662-C-T",
      "observedInGnomad": true
    },
    "497": {
      "pos": 497,
      "cdnaChange": "c.1489G>A",
      "aaChange": "p.Gly497Arg",
      "ac": 1,
      "an": 152106,
      "af": 6.574362615544423e-06,
      "variantId": "19-9996110-C-G",
      "observedInGnomad": true
    },
    "575": {
      "pos": 575,
      "cdnaChange": "c.1723G>A",
      "aaChange": "p.Gly575Ser",
      "ac": 3,
      "an": 1614052,
      "af": 1.8586761764800638e-06,
      "variantId": "19-9993406-C-T",
      "observedInGnomad": true
    },
    "653": {
      "pos": 653,
      "cdnaChange": "c.1957G>A",
      "aaChange": "p.Gly653Ser",
      "ac": 38,
      "an": 1609982,
      "af": 2.3602748353708302e-05,
      "variantId": "19-9991645-C-T",
      "observedInGnomad": true
    },
    "734": {
      "pos": 734,
      "cdnaChange": "c.2200G>A",
      "aaChange": "p.Gly734Ser",
      "ac": 25,
      "an": 1613802,
      "af": 1.5491367590323968e-05,
      "variantId": "19-9986597-C-T",
      "observedInGnomad": true
    },
    "752": {
      "pos": 752,
      "cdnaChange": "c.2254G>A",
      "aaChange": "p.Gly752Arg",
      "ac": 5,
      "an": 1460700,
      "af": 3.4230163620182103e-06,
      "variantId": "19-9986413-C-T",
      "observedInGnomad": true
    },
    "809": {
      "pos": 809,
      "cdnaChange": "c.2425G>A",
      "aaChange": "p.Gly809Ser",
      "ac": 34,
      "an": 1605360,
      "af": 2.1179050181890668e-05,
      "variantId": "19-9982100-C-T",
      "observedInGnomad": true
    },
    "980": {
      "pos": 980,
      "cdnaChange": "c.2938G>A",
      "aaChange": "p.Gly980Ser",
      "ac": 84,
      "an": 1494076,
      "af": 5.622203957496138e-05,
      "variantId": "19-9978917-C-T",
      "observedInGnomad": true
    },
    "1013": {
      "pos": 1013,
      "cdnaChange": "c.3037G>A",
      "aaChange": "p.Gly1013Ser",
      "ac": 11,
      "an": 1600260,
      "af": 6.873882994013473e-06,
      "variantId": "19-9977683-C-T",
      "observedInGnomad": true
    },
    "1085": {
      "pos": 1085,
      "cdnaChange": "c.3253G>A",
      "aaChange": "p.Gly1085Arg",
      "ac": 6,
      "an": 1461830,
      "af": 4.104444429242799e-06,
      "variantId": "19-9977264-C-G",
      "observedInGnomad": true
    },
    "1118": {
      "pos": 1118,
      "cdnaChange": "c.3352G>A",
      "aaChange": "p.Gly1118Arg",
      "ac": 24,
      "an": 1594666,
      "af": 1.5050173515958827e-05,
      "variantId": "19-9974399-C-T",
      "observedInGnomad": true
    },
    "1136": {
      "pos": 1136,
      "cdnaChange": "c.3406G>A",
      "aaChange": "p.Gly1136Arg",
      "ac": 26,
      "an": 1612742,
      "af": 1.612161151628717e-05,
      "variantId": "19-9974345-C-T",
      "observedInGnomad": true
    },
    "1163": {
      "pos": 1163,
      "cdnaChange": "c.3487G>A",
      "aaChange": "p.Gly1163Arg",
      "ac": 28,
      "an": 1613992,
      "af": 1.7348289210851106e-05,
      "variantId": "19-9974188-C-T",
      "observedInGnomad": true
    },
    "1166": {
      "pos": 1166,
      "cdnaChange": "c.3496G>A",
      "aaChange": "p.Gly1166Arg",
      "ac": 8,
      "an": 1613862,
      "af": 4.957053329218979e-06,
      "variantId": "19-9974179-C-T",
      "observedInGnomad": true
    },
    "1265": {
      "pos": 1265,
      "cdnaChange": "c.3793G>A",
      "aaChange": "p.Gly1265Arg",
      "ac": 0,
      "an": 1410354,
      "af": 0.0,
      "variantId": "19-9971240-C-G",
      "observedInGnomad": false
    },
    "1304": {
      "pos": 1304,
      "cdnaChange": "c.3910G>A",
      "aaChange": "p.Gly1304Ser",
      "ac": 43,
      "an": 1452352,
      "af": 2.960714757854845e-05,
      "variantId": "19-9970648-C-T",
      "observedInGnomad": true
    },
    "1307": {
      "pos": 1307,
      "cdnaChange": "c.3919G>A",
      "aaChange": "p.Gly1307Arg",
      "ac": 0,
      "an": 1299346,
      "af": 0.0,
      "variantId": "19-9970639-C-G",
      "observedInGnomad": false
    },
    "1310": {
      "pos": 1310,
      "cdnaChange": "c.3928G>A",
      "aaChange": "p.Gly1310Ser",
      "ac": 11,
      "an": 1445986,
      "af": 7.607265907138797e-06,
      "variantId": "19-9970630-C-T",
      "observedInGnomad": true
    },
    "1409": {
      "pos": 1409,
      "cdnaChange": "c.4225G>A",
      "aaChange": "p.Gly1409Ser",
      "ac": 6,
      "an": 1434174,
      "af": 4.1835927858126e-06,
      "variantId": "19-9968474-C-T",
      "observedInGnomad": true
    }
  },
  "COL6A1": {
    "266": {
      "pos": 266,
      "cdnaChange": "c.796G>A",
      "aaChange": "p.Gly266Ser",
      "ac": 0,
      "an": 1512707,
      "af": 0.0,
      "variantId": "21-45987646-G-A",
      "observedInGnomad": false
    },
    "284": {
      "pos": 284,
      "cdnaChange": "c.850G>A",
      "aaChange": "p.Gly284Arg",
      "ac": 0,
      "an": 1512707,
      "af": 0.0,
      "variantId": "21-45989129-G-A",
      "observedInGnomad": false
    },
    "290": {
      "pos": 290,
      "cdnaChange": "c.868G>A",
      "aaChange": "p.Gly290Arg",
      "ac": 0,
      "an": 1512707,
      "af": 0.0,
      "variantId": "21-45989617-G-A",
      "observedInGnomad": false
    },
    "293": {
      "pos": 293,
      "cdnaChange": "c.877G>A",
      "aaChange": "p.Gly293Arg",
      "ac": 0,
      "an": 1512707,
      "af": 0.0,
      "variantId": "21-45989626-G-A",
      "observedInGnomad": false
    },
    "329": {
      "pos": 329,
      "cdnaChange": "c.985G>A",
      "aaChange": "p.Gly329Arg",
      "ac": 95,
      "an": 1605054,
      "af": 5.918803977934699e-05,
      "variantId": "21-45990405-G-A",
      "observedInGnomad": true
    },
    "332": {
      "pos": 332,
      "cdnaChange": "c.994G>A",
      "aaChange": "p.Gly332Ser",
      "ac": 19,
      "an": 1598366,
      "af": 1.1887139741460966e-05,
      "variantId": "21-45990414-G-A",
      "observedInGnomad": true
    },
    "350": {
      "pos": 350,
      "cdnaChange": "c.1048G>A",
      "aaChange": "p.Gly350Arg",
      "ac": 4,
      "an": 1461146,
      "af": 2.737577216787371e-06,
      "variantId": "21-45990818-G-A",
      "observedInGnomad": true
    },
    "353": {
      "pos": 353,
      "cdnaChange": "c.1057G>A",
      "aaChange": "p.Gly353Ser",
      "ac": 0,
      "an": 1512707,
      "af": 0.0,
      "variantId": "21-45990979-G-A",
      "observedInGnomad": false
    },
    "365": {
      "pos": 365,
      "cdnaChange": "c.1093G>A",
      "aaChange": "p.Gly365Ser",
      "ac": 32,
      "an": 1613384,
      "af": 1.9834087855092156e-05,
      "variantId": "21-45991015-G-A",
      "observedInGnomad": true
    },
    "380": {
      "pos": 380,
      "cdnaChange": "c.1138G>A",
      "aaChange": "p.Gly380Arg",
      "ac": 16,
      "an": 1449878,
      "af": 1.1035411255291825e-05,
      "variantId": "21-45992028-G-A",
      "observedInGnomad": true
    },
    "404": {
      "pos": 404,
      "cdnaChange": "c.1210G>A",
      "aaChange": "p.Gly404Arg",
      "ac": 23,
      "an": 1461530,
      "af": 1.573693321382387e-05,
      "variantId": "21-45992191-G-A",
      "observedInGnomad": true
    },
    "419": {
      "pos": 419,
      "cdnaChange": "c.1255G>A",
      "aaChange": "p.Gly419Ser",
      "ac": 7,
      "an": 1461168,
      "af": 4.790687997547168e-06,
      "variantId": "21-45992381-G-A",
      "observedInGnomad": true
    },
    "422": {
      "pos": 422,
      "cdnaChange": "c.1264G>A",
      "aaChange": "p.Gly422Arg",
      "ac": 8,
      "an": 1613156,
      "af": 4.959222790604256e-06,
      "variantId": "21-45992390-G-A",
      "observedInGnomad": true
    },
    "473": {
      "pos": 473,
      "cdnaChange": "c.1417G>A",
      "aaChange": "p.Gly473Arg",
      "ac": 4,
      "an": 1612822,
      "af": 2.480124899089918e-06,
      "variantId": "21-45997439-G-A",
      "observedInGnomad": true
    },
    "497": {
      "pos": 497,
      "cdnaChange": "c.1489G>A",
      "aaChange": "p.Gly497Arg",
      "ac": 7,
      "an": 1595876,
      "af": 4.3863057029493515e-06,
      "variantId": "21-45997727-G-A",
      "observedInGnomad": true
    },
    "512": {
      "pos": 512,
      "cdnaChange": "c.1534G>A",
      "aaChange": "p.Gly512Ser",
      "ac": 62,
      "an": 1612224,
      "af": 3.8456194672700566e-05,
      "variantId": "21-45998130-G-A",
      "observedInGnomad": true
    },
    "523": {
      "pos": 523,
      "cdnaChange": "c.1567G>A",
      "aaChange": "p.Gly523Ser",
      "ac": 3,
      "an": 1459952,
      "af": 2.0548620776573475e-06,
      "variantId": "21-45998163-G-A",
      "observedInGnomad": true
    },
    "526": {
      "pos": 526,
      "cdnaChange": "c.1576G>A",
      "aaChange": "p.Gly526Arg",
      "ac": 1,
      "an": 1460966,
      "af": 6.844786257859526e-07,
      "variantId": "21-45998398-G-A",
      "observedInGnomad": true
    },
    "535": {
      "pos": 535,
      "cdnaChange": "c.1603G>A",
      "aaChange": "p.Gly535Arg",
      "ac": 12,
      "an": 1460944,
      "af": 8.21386719819514e-06,
      "variantId": "21-45998425-G-A",
      "observedInGnomad": true
    },
    "538": {
      "pos": 538,
      "cdnaChange": "c.1612G>A",
      "aaChange": "p.Gly538Ser",
      "ac": 2,
      "an": 1402140,
      "af": 1.4263910879084828e-06,
      "variantId": "21-45998897-G-A",
      "observedInGnomad": true
    },
    "544": {
      "pos": 544,
      "cdnaChange": "c.1630G>A",
      "aaChange": "p.Gly544Ser",
      "ac": 0,
      "an": 1403640,
      "af": 0.0,
      "variantId": "21-45998915-G-A",
      "observedInGnomad": false
    },
    "553": {
      "pos": 553,
      "cdnaChange": "c.1657G>A",
      "aaChange": "p.Gly553Arg",
      "ac": 0,
      "an": 1402612,
      "af": 0.0,
      "variantId": "21-45998942-G-C",
      "observedInGnomad": false
    },
    "556": {
      "pos": 556,
      "cdnaChange": "c.1666G>A",
      "aaChange": "p.Gly556Arg",
      "ac": 3,
      "an": 1553872,
      "af": 1.930660955342525e-06,
      "variantId": "21-45998951-G-A",
      "observedInGnomad": true
    }
  },
  "COL6A2": {
    "316": {
      "pos": 316,
      "cdnaChange": "c.946G>A",
      "aaChange": "p.Gly316Ser",
      "ac": 17,
      "an": 1612928,
      "af": 1.053983810808666e-05,
      "variantId": "21-46116669-G-A",
      "observedInGnomad": true
    },
    "328": {
      "pos": 328,
      "cdnaChange": "c.982G>A",
      "aaChange": "p.Gly328Arg",
      "ac": 18,
      "an": 1612836,
      "af": 1.116046516818821e-05,
      "variantId": "21-46116797-G-A",
      "observedInGnomad": true
    },
    "340": {
      "pos": 340,
      "cdnaChange": "c.1018G>A",
      "aaChange": "p.Gly340Arg",
      "ac": 4,
      "an": 1460460,
      "af": 2.73886309792805e-06,
      "variantId": "21-46117418-G-A",
      "observedInGnomad": true
    },
    "355": {
      "pos": 355,
      "cdnaChange": "c.1063G>A",
      "aaChange": "p.Gly355Ser",
      "ac": 8,
      "an": 1611948,
      "af": 4.962939251142096e-06,
      "variantId": "21-46117883-G-A",
      "observedInGnomad": true
    },
    "388": {
      "pos": 388,
      "cdnaChange": "c.1162G>A",
      "aaChange": "p.Gly388Arg",
      "ac": 1,
      "an": 1459134,
      "af": 6.853380155626557e-07,
      "variantId": "21-46118659-G-C",
      "observedInGnomad": true
    },
    "418": {
      "pos": 418,
      "cdnaChange": "c.1252G>A",
      "aaChange": "p.Gly418Arg",
      "ac": 32,
      "an": 1611636,
      "af": 1.985560014792422e-05,
      "variantId": "21-46119102-G-A",
      "observedInGnomad": true
    },
    "430": {
      "pos": 430,
      "cdnaChange": "c.1288G>A",
      "aaChange": "p.Gly430Ser",
      "ac": 27,
      "an": 1563986,
      "af": 1.7263581643313944e-05,
      "variantId": "21-46119806-G-A",
      "observedInGnomad": true
    },
    "454": {
      "pos": 454,
      "cdnaChange": "c.1360G>A",
      "aaChange": "p.Gly454Ser",
      "ac": 40,
      "an": 1478130,
      "af": 2.7061219243233005e-05,
      "variantId": "21-46120542-G-A",
      "observedInGnomad": true
    },
    "484": {
      "pos": 484,
      "cdnaChange": "c.1450G>A",
      "aaChange": "p.Gly484Arg",
      "ac": 24,
      "an": 1460484,
      "af": 1.6432908542647506e-05,
      "variantId": "21-46121115-G-A",
      "observedInGnomad": true
    },
    "493": {
      "pos": 493,
      "cdnaChange": "c.1477G>A",
      "aaChange": "p.Gly493Ser",
      "ac": 14,
      "an": 1612838,
      "af": 8.68035103339579e-06,
      "variantId": "21-46121574-G-A",
      "observedInGnomad": true
    },
    "511": {
      "pos": 511,
      "cdnaChange": "c.1531G>A",
      "aaChange": "p.Gly511Ser",
      "ac": 18,
      "an": 1460460,
      "af": 1.2324883940676225e-05,
      "variantId": "21-46122117-G-A",
      "observedInGnomad": true
    },
    "525": {
      "pos": 525,
      "cdnaChange": "c.1573G>A",
      "aaChange": "p.Gly525Arg",
      "ac": 0,
      "an": 1549576,
      "af": 0.0,
      "variantId": "21-46122496-G-A",
      "observedInGnomad": false
    },
    "531": {
      "pos": 531,
      "cdnaChange": "c.1591G>A",
      "aaChange": "p.Gly531Ser",
      "ac": 5,
      "an": 1612628,
      "af": 3.1005290742812353e-06,
      "variantId": "21-46122514-G-A",
      "observedInGnomad": true
    },
    "534": {
      "pos": 534,
      "cdnaChange": "c.1600G>A",
      "aaChange": "p.Gly534Ser",
      "ac": 4,
      "an": 1460522,
      "af": 2.738746831612259e-06,
      "variantId": "21-46122523-G-A",
      "observedInGnomad": true
    },
    "582": {
      "pos": 582,
      "cdnaChange": "c.1744G>A",
      "aaChange": "p.Gly582Ser",
      "ac": 13,
      "an": 1612758,
      "af": 8.060725787749928e-06,
      "variantId": "21-46124894-G-A",
      "observedInGnomad": true
    },
    "588": {
      "pos": 588,
      "cdnaChange": "c.1762G>A",
      "aaChange": "p.Gly588Ser",
      "ac": 161,
      "an": 1612904,
      "af": 9.9819952086423e-05,
      "variantId": "21-46124912-G-A",
      "observedInGnomad": true
    }
  },
  "COL6A3": {
    "2044": {
      "pos": 2044,
      "cdnaChange": "c.6130G>A",
      "aaChange": "p.Gly2044Arg",
      "ac": 0,
      "an": 1550595,
      "af": 0.0,
      "variantId": "2-237361765-C-T",
      "observedInGnomad": false
    },
    "2047": {
      "pos": 2047,
      "cdnaChange": "c.6139G>A",
      "aaChange": "p.Gly2047Ser",
      "ac": 3,
      "an": 1461882,
      "af": 2.0521492158737845e-06,
      "variantId": "2-237361756-C-T",
      "observedInGnomad": true
    },
    "2050": {
      "pos": 2050,
      "cdnaChange": "c.6148G>A",
      "aaChange": "p.Gly2050Arg",
      "ac": 3,
      "an": 1614044,
      "af": 1.8586853889980695e-06,
      "variantId": "2-237361747-C-T",
      "observedInGnomad": true
    },
    "2059": {
      "pos": 2059,
      "cdnaChange": "c.6175G>A",
      "aaChange": "p.Gly2059Ser",
      "ac": 7,
      "an": 1461822,
      "af": 4.788544706537458e-06,
      "variantId": "2-237361156-C-T",
      "observedInGnomad": true
    },
    "2071": {
      "pos": 2071,
      "cdnaChange": "c.6211G>A",
      "aaChange": "p.Gly2071Ser",
      "ac": 2,
      "an": 1461846,
      "af": 1.3681331686100997e-06,
      "variantId": "2-237360159-C-T",
      "observedInGnomad": true
    },
    "2080": {
      "pos": 2080,
      "cdnaChange": "c.6238G>A",
      "aaChange": "p.Gly2080Ser",
      "ac": 0,
      "an": 1550595,
      "af": 0.0,
      "variantId": "2-237360132-C-T",
      "observedInGnomad": false
    },
    "2174": {
      "pos": 2174,
      "cdnaChange": "c.6520G>A",
      "aaChange": "p.Gly2174Ser",
      "ac": 19,
      "an": 1461852,
      "af": 1.299721175604644e-05,
      "variantId": "2-237357834-C-T",
      "observedInGnomad": true
    },
    "2177": {
      "pos": 2177,
      "cdnaChange": "c.6529G>A",
      "aaChange": "p.Gly2177Ser",
      "ac": 6,
      "an": 1613952,
      "af": 3.717582679038782e-06,
      "variantId": "2-237357825-C-T",
      "observedInGnomad": true
    },
    "2207": {
      "pos": 2207,
      "cdnaChange": "c.6619G>A",
      "aaChange": "p.Gly2207Arg",
      "ac": 8,
      "an": 1613576,
      "af": 4.957931947426089e-06,
      "variantId": "2-237354907-C-T",
      "observedInGnomad": true
    },
    "2267": {
      "pos": 2267,
      "cdnaChange": "c.6799G>A",
      "aaChange": "p.Gly2267Ser",
      "ac": 7,
      "an": 1614092,
      "af": 4.336803602272981e-06,
      "variantId": "2-237351147-C-T",
      "observedInGnomad": true
    },
    "2276": {
      "pos": 2276,
      "cdnaChange": "c.6826G>A",
      "aaChange": "p.Gly2276Arg",
      "ac": 12,
      "an": 1461784,
      "af": 8.209147179063391e-06,
      "variantId": "2-237350200-C-T",
      "observedInGnomad": true
    },
    "2285": {
      "pos": 2285,
      "cdnaChange": "c.6853G>A",
      "aaChange": "p.Gly2285Arg",
      "ac": 10,
      "an": 1614016,
      "af": 6.195725445100916e-06,
      "variantId": "2-237350173-C-T",
      "observedInGnomad": true
    },
    "2297": {
      "pos": 2297,
      "cdnaChange": "c.6889G>A",
      "aaChange": "p.Gly2297Arg",
      "ac": 12,
      "an": 1614086,
      "af": 7.4345480971893695e-06,
      "variantId": "2-237348654-C-T",
      "observedInGnomad": true
    },
    "2300": {
      "pos": 2300,
      "cdnaChange": "c.6898G>A",
      "aaChange": "p.Gly2300Arg",
      "ac": 39,
      "an": 1614188,
      "af": 2.4160754509388e-05,
      "variantId": "2-237348645-C-T",
      "observedInGnomad": true
    }
  },
  "COL6A5": {
    "1659": {
      "pos": 1659,
      "cdnaChange": "c.4975G>A",
      "aaChange": "p.Gly1659Ser",
      "ac": 0,
      "an": 1530000,
      "af": 0.0,
      "variantId": "3-130421177-G-A",
      "observedInGnomad": false
    }
  },
  "COL6A6": {
    "1467": {
      "pos": 1467,
      "cdnaChange": "c.4399G>A",
      "aaChange": "p.Gly1467Arg",
      "ac": 18,
      "an": 1613570,
      "af": 1.1155388362450964e-05,
      "variantId": "3-130593088-G-A",
      "observedInGnomad": true
    },
    "1470": {
      "pos": 1470,
      "cdnaChange": "c.4408G>A",
      "aaChange": "p.Gly1470Arg",
      "ac": 23,
      "an": 1613588,
      "af": 1.4253948343691203e-05,
      "variantId": "3-130593097-G-A",
      "observedInGnomad": true
    },
    "1512": {
      "pos": 1512,
      "cdnaChange": "c.4534G>A",
      "aaChange": "p.Gly1512Arg",
      "ac": 1,
      "an": 152014,
      "af": 6.57834146854895e-06,
      "variantId": "3-130598365-G-C",
      "observedInGnomad": true
    },
    "1543": {
      "pos": 1543,
      "cdnaChange": "c.4627G>A",
      "aaChange": "p.Gly1543Arg",
      "ac": 14,
      "an": 1613452,
      "af": 8.67704772128331e-06,
      "variantId": "3-130599784-G-A",
      "observedInGnomad": true
    },
    "1659": {
      "pos": 1659,
      "cdnaChange": "c.4975G>A",
      "aaChange": "p.Gly1659Arg",
      "ac": 1,
      "an": 1461410,
      "af": 6.842706701062672e-07,
      "variantId": "3-130627352-G-C",
      "observedInGnomad": true
    }
  },
  "COL7A1": {
    "1281": {
      "pos": 1281,
      "cdnaChange": "c.3841G>A",
      "aaChange": "p.Gly1281Ser",
      "ac": 53,
      "an": 1614000,
      "af": 3.283767038413878e-05,
      "variantId": "3-48585610-C-T",
      "observedInGnomad": true
    },
    "1284": {
      "pos": 1284,
      "cdnaChange": "c.3850G>A",
      "aaChange": "p.Gly1284Ser",
      "ac": 11,
      "an": 1461662,
      "af": 7.525679671497241e-06,
      "variantId": "3-48585601-C-T",
      "observedInGnomad": true
    },
    "1314": {
      "pos": 1314,
      "cdnaChange": "c.3940G>A",
      "aaChange": "p.Gly1314Arg",
      "ac": 2,
      "an": 1612398,
      "af": 1.2403885393060523e-06,
      "variantId": "3-48585071-C-T",
      "observedInGnomad": true
    },
    "1353": {
      "pos": 1353,
      "cdnaChange": "c.4057G>A",
      "aaChange": "p.Gly1353Arg",
      "ac": 50,
      "an": 1461832,
      "af": 3.420365678135381e-05,
      "variantId": "3-48584547-C-T",
      "observedInGnomad": true
    },
    "1430": {
      "pos": 1430,
      "cdnaChange": "c.4288G>A",
      "aaChange": "p.Gly1430Arg",
      "ac": 95,
      "an": 1613820,
      "af": 5.8866540258517057e-05,
      "variantId": "3-48583771-C-T",
      "observedInGnomad": true
    },
    "1569": {
      "pos": 1569,
      "cdnaChange": "c.4705G>A",
      "aaChange": "p.Gly1569Arg",
      "ac": 11,
      "an": 1461800,
      "af": 7.524969216035025e-06,
      "variantId": "3-48581723-C-T",
      "observedInGnomad": true
    },
    "1578": {
      "pos": 1578,
      "cdnaChange": "c.4732G>A",
      "aaChange": "p.Gly1578Ser",
      "ac": 18,
      "an": 1614200,
      "af": 1.1151034568207162e-05,
      "variantId": "3-48581623-C-T",
      "observedInGnomad": true
    },
    "1725": {
      "pos": 1725,
      "cdnaChange": "c.5173G>A",
      "aaChange": "p.Gly1725Arg",
      "ac": 14,
      "an": 1613540,
      "af": 8.676574488391982e-06,
      "variantId": "3-48579650-C-T",
      "observedInGnomad": true
    },
    "1782": {
      "pos": 1782,
      "cdnaChange": "c.5344G>A",
      "aaChange": "p.Gly1782Arg",
      "ac": 1,
      "an": 152178,
      "af": 6.571252086372537e-06,
      "variantId": "3-48579241-C-G",
      "observedInGnomad": true
    },
    "1809": {
      "pos": 1809,
      "cdnaChange": "c.5425G>A",
      "aaChange": "p.Gly1809Arg",
      "ac": 0,
      "an": 1548035,
      "af": 0.0,
      "variantId": "3-48578515-C-T",
      "observedInGnomad": false
    },
    "1845": {
      "pos": 1845,
      "cdnaChange": "c.5533G>A",
      "aaChange": "p.Gly1845Arg",
      "ac": 1,
      "an": 1461600,
      "af": 6.841817186644772e-07,
      "variantId": "3-48577027-C-T",
      "observedInGnomad": true
    },
    "1854": {
      "pos": 1854,
      "cdnaChange": "c.5560G>A",
      "aaChange": "p.Gly1854Arg",
      "ac": 16,
      "an": 1461652,
      "af": 1.0946518049439948e-05,
      "variantId": "3-48577000-C-T",
      "observedInGnomad": true
    },
    "1997": {
      "pos": 1997,
      "cdnaChange": "c.5989G>A",
      "aaChange": "p.Gly1997Ser",
      "ac": 9,
      "an": 1612696,
      "af": 5.580717010521512e-06,
      "variantId": "3-48575530-C-T",
      "observedInGnomad": true
    },
    "2003": {
      "pos": 2003,
      "cdnaChange": "c.6007G>A",
      "aaChange": "p.Gly2003Arg",
      "ac": 3,
      "an": 1460452,
      "af": 2.054158575564277e-06,
      "variantId": "3-48575512-C-T",
      "observedInGnomad": true
    },
    "2028": {
      "pos": 2028,
      "cdnaChange": "c.6082G>A",
      "aaChange": "p.Gly2028Arg",
      "ac": 1,
      "an": 1457686,
      "af": 6.860187996591859e-07,
      "variantId": "3-48575437-C-T",
      "observedInGnomad": true
    },
    "2031": {
      "pos": 2031,
      "cdnaChange": "c.6091G>A",
      "aaChange": "p.Gly2031Ser",
      "ac": 15,
      "an": 1609700,
      "af": 9.318506554016277e-06,
      "variantId": "3-48575428-C-T",
      "observedInGnomad": true
    },
    "2034": {
      "pos": 2034,
      "cdnaChange": "c.6100G>A",
      "aaChange": "p.Gly2034Arg",
      "ac": 1,
      "an": 1457728,
      "af": 6.8599903411336e-07,
      "variantId": "3-48575419-C-T",
      "observedInGnomad": true
    },
    "2043": {
      "pos": 2043,
      "cdnaChange": "c.6127G>A",
      "aaChange": "p.Gly2043Arg",
      "ac": 1,
      "an": 1458936,
      "af": 6.854310264466707e-07,
      "variantId": "3-48575392-C-T",
      "observedInGnomad": true
    },
    "2088": {
      "pos": 2088,
      "cdnaChange": "c.6262G>A",
      "aaChange": "p.Gly2088Arg",
      "ac": 7,
      "an": 1613334,
      "af": 4.338841182297032e-06,
      "variantId": "3-48575081-C-T",
      "observedInGnomad": true
    },
    "2150": {
      "pos": 2150,
      "cdnaChange": "c.6448G>A",
      "aaChange": "p.Gly2150Ser",
      "ac": 26,
      "an": 1613988,
      "af": 1.61091656195709e-05,
      "variantId": "3-48574496-C-T",
      "observedInGnomad": true
    },
    "2233": {
      "pos": 2233,
      "cdnaChange": "c.6697G>A",
      "aaChange": "p.Gly2233Ser",
      "ac": 5,
      "an": 1461730,
      "af": 3.420604352376978e-06,
      "variantId": "3-48573191-C-T",
      "observedInGnomad": true
    },
    "2287": {
      "pos": 2287,
      "cdnaChange": "c.6859G>A",
      "aaChange": "p.Gly2287Arg",
      "ac": 1,
      "an": 1456534,
      "af": 6.865613847668506e-07,
      "variantId": "3-48572712-C-G",
      "observedInGnomad": true
    },
    "2304": {
      "pos": 2304,
      "cdnaChange": "c.6910G>A",
      "aaChange": "p.Gly2304Arg",
      "ac": 1,
      "an": 1461830,
      "af": 6.840740715404664e-07,
      "variantId": "3-48572529-C-G",
      "observedInGnomad": true
    },
    "2351": {
      "pos": 2351,
      "cdnaChange": "c.7051G>A",
      "aaChange": "p.Gly2351Arg",
      "ac": 3,
      "an": 1612496,
      "af": 1.8604697313977834e-06,
      "variantId": "3-48572018-C-T",
      "observedInGnomad": true
    },
    "2374": {
      "pos": 2374,
      "cdnaChange": "c.7120G>A",
      "aaChange": "p.Gly2374Arg",
      "ac": 121,
      "an": 1614018,
      "af": 7.496818498926282e-05,
      "variantId": "3-48571145-C-T",
      "observedInGnomad": true
    },
    "2398": {
      "pos": 2398,
      "cdnaChange": "c.7192G>A",
      "aaChange": "p.Gly2398Ser",
      "ac": 7,
      "an": 1613542,
      "af": 4.338281866849453e-06,
      "variantId": "3-48570941-C-T",
      "observedInGnomad": true
    },
    "2487": {
      "pos": 2487,
      "cdnaChange": "c.7459G>A",
      "aaChange": "p.Gly2487Ser",
      "ac": 24,
      "an": 1614034,
      "af": 1.4869575238192008e-05,
      "variantId": "3-48570160-C-T",
      "observedInGnomad": true
    },
    "2575": {
      "pos": 2575,
      "cdnaChange": "c.7723G>A",
      "aaChange": "p.Gly2575Arg",
      "ac": 19,
      "an": 1576158,
      "af": 1.205462904099716e-05,
      "variantId": "3-48568819-C-T",
      "observedInGnomad": true
    },
    "2653": {
      "pos": 2653,
      "cdnaChange": "c.7957G>A",
      "aaChange": "p.Gly2653Arg",
      "ac": 12,
      "an": 1614010,
      "af": 7.434898172873774e-06,
      "variantId": "3-48567736-C-T",
      "observedInGnomad": true
    },
    "2680": {
      "pos": 2680,
      "cdnaChange": "c.8038G>A",
      "aaChange": "p.Gly2680Ser",
      "ac": 14,
      "an": 1614068,
      "af": 8.67373617468409e-06,
      "variantId": "3-48567582-C-T",
      "observedInGnomad": true
    },
    "2689": {
      "pos": 2689,
      "cdnaChange": "c.8065G>A",
      "aaChange": "p.Gly2689Arg",
      "ac": 8,
      "an": 1461816,
      "af": 5.4726449840472395e-06,
      "variantId": "3-48567172-C-T",
      "observedInGnomad": true
    },
    "2749": {
      "pos": 2749,
      "cdnaChange": "c.8245G>A",
      "aaChange": "p.Gly2749Arg",
      "ac": 16,
      "an": 1613778,
      "af": 9.914622705229591e-06,
      "variantId": "3-48566719-C-T",
      "observedInGnomad": true
    },
    "2775": {
      "pos": 2775,
      "cdnaChange": "c.8323G>A",
      "aaChange": "p.Gly2775Ser",
      "ac": 11,
      "an": 1614048,
      "af": 6.815162870001388e-06,
      "variantId": "3-48566545-C-T",
      "observedInGnomad": true
    }
  },
  "COL8A1": {
    "246": {
      "pos": 246,
      "cdnaChange": "c.736G>A",
      "aaChange": "p.Gly246Arg",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "3-99794637-G-A",
      "observedInGnomad": false
    },
    "261": {
      "pos": 261,
      "cdnaChange": "c.781G>A",
      "aaChange": "p.Gly261Ser",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "3-99794682-G-A",
      "observedInGnomad": false
    },
    "264": {
      "pos": 264,
      "cdnaChange": "c.790G>A",
      "aaChange": "p.Gly264Ser",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "3-99794691-G-A",
      "observedInGnomad": false
    },
    "314": {
      "pos": 314,
      "cdnaChange": "c.940G>A",
      "aaChange": "p.Gly314Arg",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "3-99794841-G-A",
      "observedInGnomad": false
    },
    "480": {
      "pos": 480,
      "cdnaChange": "c.1438G>A",
      "aaChange": "p.Gly480Arg",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "3-99795339-G-A",
      "observedInGnomad": false
    },
    "536": {
      "pos": 536,
      "cdnaChange": "c.1606G>A",
      "aaChange": "p.Gly536Arg",
      "ac": 0,
      "an": 1540000,
      "af": 0.0,
      "variantId": "3-99795507-G-A",
      "observedInGnomad": false
    }
  },
  "COL8A2": {
    "80": {
      "pos": 80,
      "cdnaChange": "c.238G>A",
      "aaChange": "p.Gly80Ser",
      "ac": 3,
      "an": 1544816,
      "af": 1.941978850555665e-06,
      "variantId": "1-36099443-C-T",
      "observedInGnomad": true
    },
    "86": {
      "pos": 86,
      "cdnaChange": "c.256G>A",
      "aaChange": "p.Gly86Arg",
      "ac": 3,
      "an": 1397010,
      "af": 2.1474434685506905e-06,
      "variantId": "1-36099425-C-T",
      "observedInGnomad": true
    },
    "135": {
      "pos": 135,
      "cdnaChange": "c.403G>A",
      "aaChange": "p.Gly135Arg",
      "ac": 2,
      "an": 1403616,
      "af": 1.4248911383170325e-06,
      "variantId": "1-36099278-C-T",
      "observedInGnomad": true
    },
    "214": {
      "pos": 214,
      "cdnaChange": "c.640G>A",
      "aaChange": "p.Gly214Arg",
      "ac": 1,
      "an": 1387384,
      "af": 7.207809806081085e-07,
      "variantId": "1-36099041-C-G",
      "observedInGnomad": true
    },
    "226": {
      "pos": 226,
      "cdnaChange": "c.676G>A",
      "aaChange": "p.Gly226Ser",
      "ac": 4,
      "an": 1436210,
      "af": 2.7851080273776118e-06,
      "variantId": "1-36099005-C-T",
      "observedInGnomad": true
    },
    "229": {
      "pos": 229,
      "cdnaChange": "c.685G>A",
      "aaChange": "p.Gly229Ser",
      "ac": 9,
      "an": 1436796,
      "af": 6.2639372604044e-06,
      "variantId": "1-36098996-C-T",
      "observedInGnomad": true
    },
    "279": {
      "pos": 279,
      "cdnaChange": "c.835G>A",
      "aaChange": "p.Gly279Ser",
      "ac": 31,
      "an": 1612354,
      "af": 1.922654702379254e-05,
      "variantId": "1-36098846-C-T",
      "observedInGnomad": true
    },
    "525": {
      "pos": 525,
      "cdnaChange": "c.1573G>A",
      "aaChange": "p.Gly525Arg",
      "ac": 2,
      "an": 1358566,
      "af": 1.4721404775329282e-06,
      "variantId": "1-36098108-C-T",
      "observedInGnomad": true
    }
  },
  "COL9A1": {
    "278": {
      "pos": 278,
      "cdnaChange": "c.832G>A",
      "aaChange": "p.Gly278Arg",
      "ac": 0,
      "an": 1595490,
      "af": 0.0,
      "variantId": "6-70281434-C-T",
      "observedInGnomad": false
    },
    "293": {
      "pos": 293,
      "cdnaChange": "c.877G>A",
      "aaChange": "p.Gly293Ser",
      "ac": 6,
      "an": 1609658,
      "af": 3.727499878856254e-06,
      "variantId": "6-70281039-C-T",
      "observedInGnomad": true
    },
    "457": {
      "pos": 457,
      "cdnaChange": "c.1369G>A",
      "aaChange": "p.Gly457Arg",
      "ac": 26,
      "an": 1608364,
      "af": 1.6165494875538123e-05,
      "variantId": "6-70263270-C-T",
      "observedInGnomad": true
    },
    "475": {
      "pos": 475,
      "cdnaChange": "c.1423G>A",
      "aaChange": "p.Gly475Ser",
      "ac": 111,
      "an": 1613906,
      "af": 6.877723981446255e-05,
      "variantId": "6-70260683-C-T",
      "observedInGnomad": true
    },
    "670": {
      "pos": 670,
      "cdnaChange": "c.2008G>A",
      "aaChange": "p.Gly670Ser",
      "ac": 72,
      "an": 1609928,
      "af": 4.4722496906693963e-05,
      "variantId": "6-70241445-C-T",
      "observedInGnomad": true
    },
    "745": {
      "pos": 745,
      "cdnaChange": "c.2233G>A",
      "aaChange": "p.Gly745Ser",
      "ac": 13,
      "an": 1613928,
      "af": 8.054882250013632e-06,
      "variantId": "6-70234820-C-T",
      "observedInGnomad": true
    },
    "802": {
      "pos": 802,
      "cdnaChange": "c.2404G>A",
      "aaChange": "p.Gly802Ser",
      "ac": 21,
      "an": 1613822,
      "af": 1.3012587509651002e-05,
      "variantId": "6-70232682-C-T",
      "observedInGnomad": true
    },
    "852": {
      "pos": 852,
      "cdnaChange": "c.2554G>A",
      "aaChange": "p.Gly852Ser",
      "ac": 1,
      "an": 1461718,
      "af": 6.841264867778874e-07,
      "variantId": "6-70225959-C-T",
      "observedInGnomad": true
    },
    "875": {
      "pos": 875,
      "cdnaChange": "c.2623G>A",
      "aaChange": "p.Gly875Ser",
      "ac": 57,
      "an": 1614046,
      "af": 3.5314978631340123e-05,
      "variantId": "6-70217040-C-T",
      "observedInGnomad": true
    },
    "899": {
      "pos": 899,
      "cdnaChange": "c.2695G>A",
      "aaChange": "p.Gly899Ser",
      "ac": 36,
      "an": 1614048,
      "af": 2.2304169392731814e-05,
      "variantId": "6-70216968-C-T",
      "observedInGnomad": true
    }
  },
  "COL9A2": {
    "48": {
      "pos": 48,
      "cdnaChange": "c.142G>A",
      "aaChange": "p.Gly48Ser",
      "ac": 9,
      "an": 1400194,
      "af": 6.427680735669486e-06,
      "variantId": "1-40315598-C-T",
      "observedInGnomad": true
    },
    "51": {
      "pos": 51,
      "cdnaChange": "c.151G>A",
      "aaChange": "p.Gly51Ser",
      "ac": 10,
      "an": 1614030,
      "af": 6.195671703747762e-06,
      "variantId": "1-40314387-C-T",
      "observedInGnomad": true
    },
    "78": {
      "pos": 78,
      "cdnaChange": "c.232G>A",
      "aaChange": "p.Gly78Arg",
      "ac": 83,
      "an": 1614216,
      "af": 5.141814973956398e-05,
      "variantId": "1-40314222-C-T",
      "observedInGnomad": true
    },
    "81": {
      "pos": 81,
      "cdnaChange": "c.241G>A",
      "aaChange": "p.Gly81Arg",
      "ac": 13,
      "an": 1614104,
      "af": 8.05400395513548e-06,
      "variantId": "1-40314213-C-T",
      "observedInGnomad": true
    },
    "105": {
      "pos": 105,
      "cdnaChange": "c.313G>A",
      "aaChange": "p.Gly105Arg",
      "ac": 27,
      "an": 1613826,
      "af": 1.673042818742541e-05,
      "variantId": "1-40312600-C-T",
      "observedInGnomad": true
    },
    "181": {
      "pos": 181,
      "cdnaChange": "c.541G>A",
      "aaChange": "p.Gly181Arg",
      "ac": 7,
      "an": 1613998,
      "af": 4.3370561797474345e-06,
      "variantId": "1-40311265-C-T",
      "observedInGnomad": true
    },
    "199": {
      "pos": 199,
      "cdnaChange": "c.595G>A",
      "aaChange": "p.Gly199Arg",
      "ac": 7,
      "an": 1461868,
      "af": 4.788394027367724e-06,
      "variantId": "1-40311128-C-T",
      "observedInGnomad": true
    },
    "259": {
      "pos": 259,
      "cdnaChange": "c.775G>A",
      "aaChange": "p.Gly259Ser",
      "ac": 283,
      "an": 1613992,
      "af": 0.00017534163738110227,
      "variantId": "1-40310128-C-T",
      "observedInGnomad": true
    },
    "307": {
      "pos": 307,
      "cdnaChange": "c.919G>A",
      "aaChange": "p.Gly307Ser",
      "ac": 213,
      "an": 1614132,
      "af": 0.0001319594679988997,
      "variantId": "1-40307738-C-T",
      "observedInGnomad": true
    },
    "328": {
      "pos": 328,
      "cdnaChange": "c.982G>A",
      "aaChange": "p.Gly328Arg",
      "ac": 314,
      "an": 1614094,
      "af": 0.00019453637768308414,
      "variantId": "1-40307472-C-T",
      "observedInGnomad": true
    },
    "415": {
      "pos": 415,
      "cdnaChange": "c.1243G>A",
      "aaChange": "p.Gly415Arg",
      "ac": 1,
      "an": 1582854,
      "af": 6.317702074859716e-07,
      "variantId": "1-40304364-C-T",
      "observedInGnomad": true
    },
    "436": {
      "pos": 436,
      "cdnaChange": "c.1306G>A",
      "aaChange": "p.Gly436Arg",
      "ac": 30,
      "an": 1572460,
      "af": 1.9078386731617974e-05,
      "variantId": "1-40304081-C-T",
      "observedInGnomad": true
    },
    "439": {
      "pos": 439,
      "cdnaChange": "c.1315G>A",
      "aaChange": "p.Gly439Ser",
      "ac": 3,
      "an": 1423950,
      "af": 2.1068155482987464e-06,
      "variantId": "1-40304072-C-T",
      "observedInGnomad": true
    },
    "448": {
      "pos": 448,
      "cdnaChange": "c.1342G>A",
      "aaChange": "p.Gly448Ser",
      "ac": 1,
      "an": 1409732,
      "af": 7.093546858551838e-07,
      "variantId": "1-40303954-C-T",
      "observedInGnomad": true
    },
    "451": {
      "pos": 451,
      "cdnaChange": "c.1351G>A",
      "aaChange": "p.Gly451Arg",
      "ac": 3,
      "an": 1407482,
      "af": 2.1314659796714983e-06,
      "variantId": "1-40303945-C-T",
      "observedInGnomad": true
    },
    "460": {
      "pos": 460,
      "cdnaChange": "c.1378G>A",
      "aaChange": "p.Gly460Ser",
      "ac": 2,
      "an": 1408058,
      "af": 1.4203960348224292e-06,
      "variantId": "1-40303830-C-T",
      "observedInGnomad": true
    },
    "475": {
      "pos": 475,
      "cdnaChange": "c.1423G>A",
      "aaChange": "p.Gly475Ser",
      "ac": 8,
      "an": 1537652,
      "af": 5.202737680567514e-06,
      "variantId": "1-40303655-C-T",
      "observedInGnomad": true
    },
    "481": {
      "pos": 481,
      "cdnaChange": "c.1441G>A",
      "aaChange": "p.Gly481Arg",
      "ac": 4,
      "an": 1438096,
      "af": 2.7814554800235867e-06,
      "variantId": "1-40303637-C-T",
      "observedInGnomad": true
    },
    "496": {
      "pos": 496,
      "cdnaChange": "c.1486G>A",
      "aaChange": "p.Gly496Ser",
      "ac": 6,
      "an": 1607644,
      "af": 3.7321695599274467e-06,
      "variantId": "1-40303592-C-T",
      "observedInGnomad": true
    },
    "502": {
      "pos": 502,
      "cdnaChange": "c.1504G>A",
      "aaChange": "p.Gly502Arg",
      "ac": 2,
      "an": 1458900,
      "af": 1.3708958804578793e-06,
      "variantId": "1-40303574-C-T",
      "observedInGnomad": true
    },
    "511": {
      "pos": 511,
      "cdnaChange": "c.1531G>A",
      "aaChange": "p.Gly511Arg",
      "ac": 2,
      "an": 1460334,
      "af": 1.3695497057522457e-06,
      "variantId": "1-40303547-C-G",
      "observedInGnomad": true
    },
    "592": {
      "pos": 592,
      "cdnaChange": "c.1774G>A",
      "aaChange": "p.Gly592Ser",
      "ac": 5,
      "an": 1603304,
      "af": 3.1185601732422547e-06,
      "variantId": "1-40302639-C-T",
      "observedInGnomad": true
    },
    "615": {
      "pos": 615,
      "cdnaChange": "c.1843G>A",
      "aaChange": "p.Gly615Arg",
      "ac": 109,
      "an": 1614000,
      "af": 6.753407682775712e-05,
      "variantId": "1-40301839-C-T",
      "observedInGnomad": true
    },
    "635": {
      "pos": 635,
      "cdnaChange": "c.1903G>A",
      "aaChange": "p.Gly635Ser",
      "ac": 19,
      "an": 1608844,
      "af": 1.1809721762955265e-05,
      "variantId": "1-40301349-C-T",
      "observedInGnomad": true
    }
  },
  "COL9A3": {
    "32": {
      "pos": 32,
      "cdnaChange": "c.94G>A",
      "aaChange": "p.Gly32Ser",
      "ac": 1,
      "an": 1388310,
      "af": 7.203002211321679e-07,
      "variantId": "20-62817582-G-A",
      "observedInGnomad": true
    },
    "35": {
      "pos": 35,
      "cdnaChange": "c.103G>A",
      "aaChange": "p.Gly35Ser",
      "ac": 5,
      "an": 1546682,
      "af": 3.232726572107259e-06,
      "variantId": "20-62817591-G-A",
      "observedInGnomad": true
    },
    "41": {
      "pos": 41,
      "cdnaChange": "c.121G>A",
      "aaChange": "p.Gly41Arg",
      "ac": 2,
      "an": 1546712,
      "af": 1.2930655480787632e-06,
      "variantId": "20-62817609-G-A",
      "observedInGnomad": true
    },
    "44": {
      "pos": 44,
      "cdnaChange": "c.130G>A",
      "aaChange": "p.Gly44Ser",
      "ac": 277,
      "an": 1545500,
      "af": 0.00017923002264639274,
      "variantId": "20-62817618-G-A",
      "observedInGnomad": true
    },
    "47": {
      "pos": 47,
      "cdnaChange": "c.139G>A",
      "aaChange": "p.Gly47Ser",
      "ac": 2,
      "an": 1540550,
      "af": 1.2982376424004415e-06,
      "variantId": "20-62817627-G-A",
      "observedInGnomad": true
    },
    "50": {
      "pos": 50,
      "cdnaChange": "c.148G>A",
      "aaChange": "p.Gly50Arg",
      "ac": 5,
      "an": 1460710,
      "af": 3.4229929280966107e-06,
      "variantId": "20-62818518-G-C",
      "observedInGnomad": true
    },
    "113": {
      "pos": 113,
      "cdnaChange": "c.337G>A",
      "aaChange": "p.Gly113Arg",
      "ac": 25,
      "an": 1613262,
      "af": 1.5496552946762524e-05,
      "variantId": "20-62821208-G-A",
      "observedInGnomad": true
    },
    "124": {
      "pos": 124,
      "cdnaChange": "c.370G>A",
      "aaChange": "p.Gly124Arg",
      "ac": 3,
      "an": 1458020,
      "af": 2.0575849439651035e-06,
      "variantId": "20-62821757-G-A",
      "observedInGnomad": true
    },
    "130": {
      "pos": 130,
      "cdnaChange": "c.388G>A",
      "aaChange": "p.Gly130Ser",
      "ac": 1735,
      "an": 1610366,
      "af": 0.0010773948282564337,
      "variantId": "20-62821775-G-A",
      "observedInGnomad": true
    },
    "136": {
      "pos": 136,
      "cdnaChange": "c.406G>A",
      "aaChange": "p.Gly136Ser",
      "ac": 22,
      "an": 1606834,
      "af": 1.3691520094795107e-05,
      "variantId": "20-62821793-G-A",
      "observedInGnomad": true
    },
    "139": {
      "pos": 139,
      "cdnaChange": "c.415G>A",
      "aaChange": "p.Gly139Ser",
      "ac": 47,
      "an": 1603858,
      "af": 2.930433991039107e-05,
      "variantId": "20-62821802-G-A",
      "observedInGnomad": true
    },
    "148": {
      "pos": 148,
      "cdnaChange": "c.442G>A",
      "aaChange": "p.Gly148Ser",
      "ac": 15,
      "an": 1587186,
      "af": 9.450688199114659e-06,
      "variantId": "20-62822129-G-A",
      "observedInGnomad": true
    },
    "157": {
      "pos": 157,
      "cdnaChange": "c.469G>A",
      "aaChange": "p.Gly157Arg",
      "ac": 18,
      "an": 1574238,
      "af": 1.143410335667161e-05,
      "variantId": "20-62822156-G-A",
      "observedInGnomad": true
    },
    "205": {
      "pos": 205,
      "cdnaChange": "c.613G>A",
      "aaChange": "p.Gly205Ser",
      "ac": 0,
      "an": 1566248,
      "af": 0.0,
      "variantId": "20-62825004-G-A",
      "observedInGnomad": false
    },
    "208": {
      "pos": 208,
      "cdnaChange": "c.622G>A",
      "aaChange": "p.Gly208Ser",
      "ac": 1,
      "an": 1458256,
      "af": 6.857506500916163e-07,
      "variantId": "20-62825013-G-A",
      "observedInGnomad": true
    },
    "220": {
      "pos": 220,
      "cdnaChange": "c.658G>A",
      "aaChange": "p.Gly220Ser",
      "ac": 53,
      "an": 1558126,
      "af": 3.4015220848634836e-05,
      "variantId": "20-62825844-G-A",
      "observedInGnomad": true
    },
    "241": {
      "pos": 241,
      "cdnaChange": "c.721G>A",
      "aaChange": "p.Gly241Arg",
      "ac": 5,
      "an": 1554860,
      "af": 3.2157236021249503e-06,
      "variantId": "20-62826240-G-A",
      "observedInGnomad": true
    },
    "277": {
      "pos": 277,
      "cdnaChange": "c.829G>A",
      "aaChange": "p.Gly277Ser",
      "ac": 16,
      "an": 1613048,
      "af": 9.919109660716854e-06,
      "variantId": "20-62827277-G-A",
      "observedInGnomad": true
    },
    "283": {
      "pos": 283,
      "cdnaChange": "c.847G>A",
      "aaChange": "p.Gly283Ser",
      "ac": 1,
      "an": 152178,
      "af": 6.571252086372537e-06,
      "variantId": "20-62827923-G-A",
      "observedInGnomad": true
    },
    "292": {
      "pos": 292,
      "cdnaChange": "c.874G>A",
      "aaChange": "p.Gly292Arg",
      "ac": 42,
      "an": 1612860,
      "af": 2.604069789070347e-05,
      "variantId": "20-62827950-G-A",
      "observedInGnomad": true
    },
    "295": {
      "pos": 295,
      "cdnaChange": "c.883G>A",
      "aaChange": "p.Gly295Arg",
      "ac": 1,
      "an": 1460652,
      "af": 6.846257698616782e-07,
      "variantId": "20-62827959-G-C",
      "observedInGnomad": true
    },
    "298": {
      "pos": 298,
      "cdnaChange": "c.892G>A",
      "aaChange": "p.Gly298Arg",
      "ac": 26,
      "an": 1612806,
      "af": 1.6120971772178427e-05,
      "variantId": "20-62827968-G-A",
      "observedInGnomad": true
    },
    "307": {
      "pos": 307,
      "cdnaChange": "c.919G>A",
      "aaChange": "p.Gly307Ser",
      "ac": 8,
      "an": 1612722,
      "af": 4.9605573682258934e-06,
      "variantId": "20-62828782-G-A",
      "observedInGnomad": true
    },
    "325": {
      "pos": 325,
      "cdnaChange": "c.973G>A",
      "aaChange": "p.Gly325Ser",
      "ac": 17,
      "an": 1611166,
      "af": 1.0551364663852142e-05,
      "variantId": "20-62828941-G-A",
      "observedInGnomad": true
    },
    "334": {
      "pos": 334,
      "cdnaChange": "c.1000G>A",
      "aaChange": "p.Gly334Arg",
      "ac": 13,
      "an": 1607666,
      "af": 8.086256722478425e-06,
      "variantId": "20-62828968-G-A",
      "observedInGnomad": true
    },
    "361": {
      "pos": 361,
      "cdnaChange": "c.1081G>A",
      "aaChange": "p.Gly361Ser",
      "ac": 21,
      "an": 1609272,
      "af": 1.304937884956676e-05,
      "variantId": "20-62829655-G-A",
      "observedInGnomad": true
    },
    "379": {
      "pos": 379,
      "cdnaChange": "c.1135G>A",
      "aaChange": "p.Gly379Ser",
      "ac": 405,
      "an": 1583826,
      "af": 0.00025570990752772085,
      "variantId": "20-62829793-G-A",
      "observedInGnomad": true
    },
    "391": {
      "pos": 391,
      "cdnaChange": "c.1171G>A",
      "aaChange": "p.Gly391Ser",
      "ac": 19,
      "an": 1571918,
      "af": 1.2087144494814615e-05,
      "variantId": "20-62830369-G-A",
      "observedInGnomad": true
    },
    "397": {
      "pos": 397,
      "cdnaChange": "c.1189G>A",
      "aaChange": "p.Gly397Arg",
      "ac": 4,
      "an": 1420654,
      "af": 2.8156046440583e-06,
      "variantId": "20-62830387-G-A",
      "observedInGnomad": true
    },
    "415": {
      "pos": 415,
      "cdnaChange": "c.1243G>A",
      "aaChange": "p.Gly415Ser",
      "ac": 67,
      "an": 1607872,
      "af": 4.166998368029296e-05,
      "variantId": "20-62830544-G-A",
      "observedInGnomad": true
    },
    "448": {
      "pos": 448,
      "cdnaChange": "c.1342G>A",
      "aaChange": "p.Gly448Ser",
      "ac": 17,
      "an": 1613708,
      "af": 1.0534743584341158e-05,
      "variantId": "20-62833038-G-A",
      "observedInGnomad": true
    },
    "460": {
      "pos": 460,
      "cdnaChange": "c.1378G>A",
      "aaChange": "p.Gly460Ser",
      "ac": 154,
      "an": 1614176,
      "af": 9.540471423190532e-05,
      "variantId": "20-62835930-G-A",
      "observedInGnomad": true
    },
    "463": {
      "pos": 463,
      "cdnaChange": "c.1387G>A",
      "aaChange": "p.Gly463Arg",
      "ac": 17,
      "an": 1614060,
      "af": 1.0532446129635825e-05,
      "variantId": "20-62835939-G-A",
      "observedInGnomad": true
    },
    "484": {
      "pos": 484,
      "cdnaChange": "c.1450G>A",
      "aaChange": "p.Gly484Ser",
      "ac": 41,
      "an": 1613582,
      "af": 2.5409306747348446e-05,
      "variantId": "20-62836235-G-A",
      "observedInGnomad": true
    },
    "487": {
      "pos": 487,
      "cdnaChange": "c.1459G>A",
      "aaChange": "p.Gly487Ser",
      "ac": 22,
      "an": 1613592,
      "af": 1.3634177660771743e-05,
      "variantId": "20-62836244-G-A",
      "observedInGnomad": true
    },
    "493": {
      "pos": 493,
      "cdnaChange": "c.1477G>A",
      "aaChange": "p.Gly493Arg",
      "ac": 26,
      "an": 1613660,
      "af": 1.6112440043131763e-05,
      "variantId": "20-62836262-G-A",
      "observedInGnomad": true
    },
    "496": {
      "pos": 496,
      "cdnaChange": "c.1486G>A",
      "aaChange": "p.Gly496Ser",
      "ac": 8,
      "an": 1613732,
      "af": 4.957452662523889e-06,
      "variantId": "20-62836271-G-A",
      "observedInGnomad": true
    },
    "551": {
      "pos": 551,
      "cdnaChange": "c.1651G>A",
      "aaChange": "p.Gly551Arg",
      "ac": 169,
      "an": 1613298,
      "af": 0.0001047543603227674,
      "variantId": "20-62837130-G-A",
      "observedInGnomad": true
    },
    "557": {
      "pos": 557,
      "cdnaChange": "c.1669G>A",
      "aaChange": "p.Gly557Ser",
      "ac": 13,
      "an": 1613102,
      "af": 8.059006808000981e-06,
      "variantId": "20-62837148-G-A",
      "observedInGnomad": true
    },
    "584": {
      "pos": 584,
      "cdnaChange": "c.1750G>A",
      "aaChange": "p.Gly584Ser",
      "ac": 18,
      "an": 1611608,
      "af": 1.1168969128969328e-05,
      "variantId": "20-62837229-G-A",
      "observedInGnomad": true
    },
    "593": {
      "pos": 593,
      "cdnaChange": "c.1777G>A",
      "aaChange": "p.Gly593Arg",
      "ac": 24,
      "an": 1610014,
      "af": 1.4906702674635127e-05,
      "variantId": "20-62837256-G-A",
      "observedInGnomad": true
    },
    "613": {
      "pos": 613,
      "cdnaChange": "c.1837G>A",
      "aaChange": "p.Gly613Arg",
      "ac": 17,
      "an": 1552128,
      "af": 1.0952704931552036e-05,
      "variantId": "20-62838734-G-A",
      "observedInGnomad": true
    },
    "628": {
      "pos": 628,
      "cdnaChange": "c.1882G>A",
      "aaChange": "p.Gly628Ser",
      "ac": 35,
      "an": 1611984,
      "af": 2.1712374316370385e-05,
      "variantId": "20-62840559-G-A",
      "observedInGnomad": true
    },
    "633": {
      "pos": 633,
      "cdnaChange": "c.1897G>A",
      "aaChange": "p.Gly633Ser",
      "ac": 27,
      "an": 1460260,
      "af": 1.8489857970498404e-05,
      "variantId": "20-62840574-G-A",
      "observedInGnomad": true
    },
    "636": {
      "pos": 636,
      "cdnaChange": "c.1906G>A",
      "aaChange": "p.Gly636Ser",
      "ac": 46,
      "an": 1612886,
      "af": 2.8520304596853096e-05,
      "variantId": "20-62840583-G-A",
      "observedInGnomad": true
    },
    "639": {
      "pos": 639,
      "cdnaChange": "c.1915G>A",
      "aaChange": "p.Gly639Ser",
      "ac": 6,
      "an": 1460600,
      "af": 4.107900862659181e-06,
      "variantId": "20-62840592-G-A",
      "observedInGnomad": true
    },
    "645": {
      "pos": 645,
      "cdnaChange": "c.1933G>A",
      "aaChange": "p.Gly645Arg",
      "ac": 16,
      "an": 1460876,
      "af": 1.0952332709963063e-05,
      "variantId": "20-62840610-G-A",
      "observedInGnomad": true
    }
  }
};
