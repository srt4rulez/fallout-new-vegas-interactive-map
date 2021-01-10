const typeMap = {
    SnowGlobe:    'snow_globe',
    SkillBook:    'skill_book',
    UniqueWeapon: 'unique_weapon',
};

const typeLabelMap = {
    [typeMap.SnowGlobe]:    'Snow Globe',
    [typeMap.SkillBook]:    'Skill Book',
    [typeMap.UniqueWeapon]: 'Unique Weapon',
};

// Bulma CSS colors.
const typeColorMap = {
    [typeMap.SnowGlobe]:    'link',
    [typeMap.SkillBook]:    'warning',
    [typeMap.UniqueWeapon]: 'primary',
};

const subTypeSkillBookSubMap = {
    ChineseArmySpecialOpsTrainingManual: 'casotm',
    WastelandSurvivalGuide: 'wsg',
    BigBookOfScience: 'bbos',
    DCJournalOfInternalMedicine: 'dcjoim',
    DeansElectronics: 'de',
    DuckAndCover: 'dac',
    GrognakTheBarbarian: 'gtb',
    GunsAndBullets: 'gab',
    LyingCongressionalStyle: 'lcs',
};

const subTypeSkillBookLabelMap = {
    [subTypeSkillBookSubMap.ChineseArmySpecialOpsTrainingManual]: 'Chinese Army: Special Ops Training Manual (Sneak)',
    [subTypeSkillBookSubMap.WastelandSurvivalGuide]: 'Wasteland Survival Guide (Survival)',
    [subTypeSkillBookSubMap.BigBookOfScience]: 'Big Book of Science (Science)',
    [subTypeSkillBookSubMap.DCJournalOfInternalMedicine]: 'D.C. Journal of Internal Medicine (Medicine)',
    [subTypeSkillBookSubMap.DeansElectronics]: 'Dean\'s Electronics (Repair)',
    [subTypeSkillBookSubMap.DuckAndCover]: 'Duck and Cover! (Explosives)',
    [subTypeSkillBookSubMap.GrognakTheBarbarian]: 'Grognak the Barbarian (Melee Weapons)',
    [subTypeSkillBookSubMap.GunsAndBullets]: 'Guns and Bullets (Guns)',
    [subTypeSkillBookSubMap.LyingCongressionalStyle]: 'Lying, Congressional Style (Speech)',
};

export {
    typeMap,
    typeLabelMap,
    typeColorMap,
    subTypeSkillBookSubMap,
    subTypeSkillBookLabelMap,
};
