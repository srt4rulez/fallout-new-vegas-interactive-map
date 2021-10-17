const typeMap = {
    SnowGlobe: 'snow_globe',
    SkillBook: 'skill_book',
} as const;

export type SnowGlobe = typeof typeMap.SnowGlobe;
export type SkillBook = typeof typeMap.SkillBook;

export type MarkerType = SnowGlobe | SkillBook;

export type TypesThatHaveSubTypes = SkillBook;

const typeLabelMap = {
    [typeMap.SnowGlobe]: 'Snow Globe',
    [typeMap.SkillBook]: 'Skill Book',
} as const;

// Bulma CSS colors.
const typeColorMap = {
    [typeMap.SnowGlobe]: 'link',
    [typeMap.SkillBook]: 'warning',
} as const;

const subTypeSkillBookSubMap = {
    ChineseArmySpecialOpsTrainingManual: 'casotm',
    WastelandSurvivalGuide:              'wsg',
    BigBookOfScience:                    'bbos',
    DCJournalOfInternalMedicine:         'dcjoim',
    DeansElectronics:                    'de',
    DuckAndCover:                        'dac',
    GrognakTheBarbarian:                 'gtb',
    GunsAndBullets:                      'gab',
    LyingCongressionalStyle:             'lcs',
    NikolaTeslaAndYou:                   'ntay',
    PugilismIllustrated:                 'pi',
    TalesOfAJunktownJerkyVendor:         'toajjv',
    TumblersToday:                       'tt',
} as const;

export type ChineseArmySpecialOpsTrainingManual = typeof subTypeSkillBookSubMap.ChineseArmySpecialOpsTrainingManual;
export type WastelandSurvivalGuide              = typeof subTypeSkillBookSubMap.WastelandSurvivalGuide;
export type BigBookOfScience                    = typeof subTypeSkillBookSubMap.BigBookOfScience;
export type DCJournalOfInternalMedicine         = typeof subTypeSkillBookSubMap.DCJournalOfInternalMedicine;
export type DeansElectronics                    = typeof subTypeSkillBookSubMap.DeansElectronics;
export type DuckAndCover                        = typeof subTypeSkillBookSubMap.DuckAndCover;
export type GrognakTheBarbarian                 = typeof subTypeSkillBookSubMap.GrognakTheBarbarian;
export type GunsAndBullets                      = typeof subTypeSkillBookSubMap.GunsAndBullets;
export type LyingCongressionalStyle             = typeof subTypeSkillBookSubMap.LyingCongressionalStyle;
export type NikolaTeslaAndYou                   = typeof subTypeSkillBookSubMap.NikolaTeslaAndYou;
export type PugilismIllustrated                 = typeof subTypeSkillBookSubMap.PugilismIllustrated;
export type TalesOfAJunktownJerkyVendor         = typeof subTypeSkillBookSubMap.TalesOfAJunktownJerkyVendor;
export type TumblersToday                       = typeof subTypeSkillBookSubMap.TumblersToday;

export type SkillBookSubTypes =
    ChineseArmySpecialOpsTrainingManual
    | WastelandSurvivalGuide
    | BigBookOfScience
    | DCJournalOfInternalMedicine
    | DeansElectronics
    | DuckAndCover
    | GrognakTheBarbarian
    | GunsAndBullets
    | LyingCongressionalStyle
    | NikolaTeslaAndYou
    | PugilismIllustrated
    | TalesOfAJunktownJerkyVendor
    | TumblersToday
;

export type MarkerSubtypes = SkillBookSubTypes;

const subTypeSkillBookLabelMap = {
    [subTypeSkillBookSubMap.BigBookOfScience]:                    'Big Book of Science (Science)',
    [subTypeSkillBookSubMap.ChineseArmySpecialOpsTrainingManual]: 'Chinese Army: Special Ops Training Manual (Sneak)',
    [subTypeSkillBookSubMap.DCJournalOfInternalMedicine]:         'D.C. Journal of Internal Medicine (Medicine)',
    [subTypeSkillBookSubMap.DeansElectronics]:                    'Dean\'s Electronics (Repair)',
    [subTypeSkillBookSubMap.DuckAndCover]:                        'Duck and Cover! (Explosives)',
    [subTypeSkillBookSubMap.GrognakTheBarbarian]:                 'Grognak the Barbarian (Melee Weapons)',
    [subTypeSkillBookSubMap.GunsAndBullets]:                      'Guns and Bullets (Guns)',
    [subTypeSkillBookSubMap.LyingCongressionalStyle]:             'Lying, Congressional Style (Speech)',
    [subTypeSkillBookSubMap.NikolaTeslaAndYou]:                   'Nikola Tesla and You (Energy Weapons)',
    [subTypeSkillBookSubMap.PugilismIllustrated]:                 'Pugilism Illustrated (Unarmed)',
    [subTypeSkillBookSubMap.TalesOfAJunktownJerkyVendor]:         'Tales of a Junktown Jerky Vendor (Barter)',
    [subTypeSkillBookSubMap.TumblersToday]:                       'Tumblers Today (Lockpick)',
    [subTypeSkillBookSubMap.WastelandSurvivalGuide]:              'Wasteland Survival Guide (Survival)',
} as const;

export interface MarkerInterface {
    id?: string;
    type?: MarkerType;
    subType: MarkerSubtypes;
    title?: string;
    desc?: string;
    url?: string;
    imgSrc?: string;
    lat?: number;
    lng?: number;
    isFound?: boolean;
}

export {
    typeMap,
    typeLabelMap,
    typeColorMap,
    subTypeSkillBookSubMap,
    subTypeSkillBookLabelMap,
};

