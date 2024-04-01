const donationAcknowledgementFA = [
    { label: 'To', id: 'email' },
    { label: 'From', id: 'from', type: 'select', options: ['aniela@relicensemble.org', 'cullen@relicensemble.org', 'kako@relicensemble.org', 'natalie@relicensemble.org', 'rebecca@relicensemble.org', 'toma@relicensemble.org'] },
    { label: 'Content', id: 'content', multiline: true }
];

const donationAcknowledgementFields = {
    email: '',
    from: '',
    content: '',
};

export const donationAcknowledgementProps = {
    fields: donationAcknowledgementFields,
    fieldsArray: donationAcknowledgementFA
};