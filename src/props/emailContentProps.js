const sectionFields = {
    id: 'mj-section',
    backgroundColor: '',
    backgroundUrl: '',
    border: '',
    borderRadius: '',
    padding: '',
    textAlign: 'left'
};

const sectionFA = [
    { label: 'Background color', id: 'backgroundColor' },
    { label: 'Background Url', id: 'backgroundUrl' },
    { label: 'Border', id: 'border' },
    { label: 'Border radius', id: 'borderRadius', type: 'number' },
    { label: 'Padding', id: 'padding' },
    { label: 'Text align', id: 'textAlign', type: 'select', options: ['left', 'right', 'center', 'justify'] },
];

const columnFields = {
    id: 'mj-column',
    backgroundColor: '',
    backgroundUrl: '',
    border: '',
    borderRadius: '',
    padding: '',
    textAlign: 'left'
}

const columnFA = [
    { label: 'Background color', id: 'backgroundColor' },
    { label: 'Background Url', id: 'backgroundUrl' },
    { label: 'Border', id: 'border' },
    { label: 'Border radius', id: 'borderRadius', type: 'number' },
    { label: 'Padding', id: 'padding' },
    { label: 'Text align', id: 'textAlign', type: 'select', options: ['left', 'right', 'center', 'justify'] },
]

const textFields = {
    id: 'mj-text',
    text: '',
    fontSize: 16,
    fontWeight: 300,
    fontStyle: 'normal',
    color: '#000000',
    align: 'left'
};


const textFA = [
    { label: 'Text', id: 'text', },
    { label: 'Font size', id: 'fontSize', type: 'select', options: [...Array(29).keys()].map(x => x += 9) },
    { label: 'Font weight', id: 'fontWeight', type: 'select', options: [300, 600, 700] },
    { label: 'Font style', id: 'fontStyle', type: 'select', options: ['normal', 'italic', 'oblique'] },
    { label: 'Text color', id: 'color', },
    { label: 'Align', id: 'align', type: 'select', options: ['left', 'right', 'center', 'justify'] }
];

const imageFields = {
    id: 'mj-image',
    src: '',
    href: '',
    width: '',
    alt: ''
}

const imageFA = [
    { label: 'Source', id: 'src' },
    { label: 'Link', id: 'href' },
    { label: 'Width', id: 'width', type: 'number' },
    { label: 'Alt text', id: 'alt' }
];

const buttonFields = {
    id: 'mj-button',
    text: '',
    color: '#ffffff',
    backgroundColor: '#000000',
    href: '',
    fontSize: 16,
    fontWeight: 300,
    fontStyle: 'normal',
    textDecoration: 'none',
    width: ''
};

const buttonFA = [
    { label: 'Text', id: 'text', },
    { label: 'Text color', id: 'color', },
    { label: 'Background color', id: 'backgroundColor' },
    { label: 'Link', id: 'href' },
    { label: 'Font size', id: 'fontSize', type: 'select', options: [...Array(29).keys()].map(x => x += 9) },
    { label: 'Font weight', id: 'fontWeight', type: 'select', options: [300, 600, 700] },
    { label: 'Font style', id: 'fontStyle', type: 'select', options: ['normal', 'italic', 'oblique'] },
    { label: 'Text Decoration', id: 'textDecoration', type: 'select', options: ['underline', 'overline', 'none'] },
    { label: 'Width', id: 'width', type: 'number' },
];

const headerFields = {
    id: 'custom-header',
    version: 'regular'
};

const headerFA = [
    { label: 'Version', id: 'version', type: 'select', options: ['regular'] }
];

const footerFields = {
    id: 'custom-footer',
    version: 'regular'
};

const footerFA = [
    { label: 'Version', id: 'version', type: 'select', options: ['regular'] }
];

const videoFields = {
    id: 'custom-video',
    link: ''
};

const videoFA = [
    { label: 'Link', id: 'link' }
];

export const emailContentFields = {
    text: textFields,
    image: imageFields,
    button: buttonFields,
    header: headerFields,
    footer: footerFields,
    video: videoFields,
    section: sectionFields,
    column: columnFields
};

export const emailContentFieldArrays = {
    text: textFA,
    image: imageFA,
    button: buttonFA,
    header: headerFA,
    footer: footerFA,
    video: videoFA,
    section: sectionFA,
    column: columnFA
};