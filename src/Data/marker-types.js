const typeMap = {
    SnowGlobe: 'snow_globe',
    SkillBook: 'skill_book',
};

const typeLabelMap = {
    [typeMap.SnowGlobe]: 'Snow Globe',
    [typeMap.SkillBook]: 'Skill Book',
};

// Bulma CSS colors.
const typeColorMap = {
    [typeMap.SnowGlobe]: 'link',
    [typeMap.SkillBook]: 'warning',
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
    NikolaTeslaAndYou: 'ntay',
    PugilismIllustrated: 'pi',
    TalesOfAJunktownJerkyVendor: 'toajjv',
    TumblersToday: 'tt',
};

const subTypeSkillBookLabelMap = {
    [subTypeSkillBookSubMap.BigBookOfScience]: 'Big Book of Science (Science)',
    [subTypeSkillBookSubMap.ChineseArmySpecialOpsTrainingManual]: 'Chinese Army: Special Ops Training Manual (Sneak)',
    [subTypeSkillBookSubMap.DCJournalOfInternalMedicine]: 'D.C. Journal of Internal Medicine (Medicine)',
    [subTypeSkillBookSubMap.DeansElectronics]: 'Dean\'s Electronics (Repair)',
    [subTypeSkillBookSubMap.DuckAndCover]: 'Duck and Cover! (Explosives)',
    [subTypeSkillBookSubMap.GrognakTheBarbarian]: 'Grognak the Barbarian (Melee Weapons)',
    [subTypeSkillBookSubMap.GunsAndBullets]: 'Guns and Bullets (Guns)',
    [subTypeSkillBookSubMap.LyingCongressionalStyle]: 'Lying, Congressional Style (Speech)',
    [subTypeSkillBookSubMap.NikolaTeslaAndYou]: 'Nikola Tesla and You (Energy Weapons)',
    [subTypeSkillBookSubMap.PugilismIllustrated]: 'Pugilism Illustrated (Unarmed)',
    [subTypeSkillBookSubMap.TalesOfAJunktownJerkyVendor]: 'Tales of a Junktown Jerky Vendor (Barter)',
    [subTypeSkillBookSubMap.TumblersToday]: 'Tumblers Today (Lockpick)',
    [subTypeSkillBookSubMap.WastelandSurvivalGuide]: 'Wasteland Survival Guide (Survival)',
};

export {
    typeMap,
    typeLabelMap,
    typeColorMap,
    subTypeSkillBookSubMap,
    subTypeSkillBookLabelMap,
};
