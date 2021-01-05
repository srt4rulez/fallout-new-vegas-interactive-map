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
};

const subTypeSkillBookLabelMap = {
    [subTypeSkillBookSubMap.ChineseArmySpecialOpsTrainingManual]: 'Chinese Army: Special Ops Training Manual',
    [subTypeSkillBookSubMap.WastelandSurvivalGuide]: 'Wasteland Survival Guide',
};

export {
    typeMap,
    typeLabelMap,
    typeColorMap,
    subTypeSkillBookSubMap,
    subTypeSkillBookLabelMap,
};
