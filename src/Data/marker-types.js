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

export {
    typeMap,
    typeLabelMap,
    typeColorMap,
};
