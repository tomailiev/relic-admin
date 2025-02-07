const donationAcknowledgementFA = [
    { label: 'To', id: 'email' },
    {
        label: 'From', id: 'from', type: 'select', options: [
            { value: 'aniela@relicensemble.org' },
            { value: 'cullen@relicensemble.org' },
            { value: 'kako@relicensemble.org' },
            { value: 'natalie@relicensemble.org' },
            { value: 'rebecca@relicensemble.org' },
            { value: 'toma@relicensemble.org' }
        ]
    },
    { label: 'Subject', id: 'subject', },
    { label: 'Content', id: 'content', multiline: true }
];

const donationAcknowledgementFields = {
    email: '',
    from: '',
    subject: '',
    content: '',
};

export const donationAcknowledgementProps = {
    fields: donationAcknowledgementFields,
    fieldsArray: donationAcknowledgementFA
};