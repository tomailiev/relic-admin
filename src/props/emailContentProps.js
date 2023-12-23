const textFields = {
    id: 'mj-text',
    text: '',
    fontSize: '',
    fontWeight: '',
    fontStyle: '',
    color: '',
    align: ''
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
    color: '',
    backgroundColor: '',
    href: '',
    fontSize: '',
    fontWeight: '',
    fontStyle: '',
    textDecoration: '',
    width: ''
};

const buttonFA = [
    { label: 'Text', id: 'text', },
    { label: 'Text color', id: 'color', },
    { label: 'Background color', id: 'background-color' },
    { label: 'Link', id: 'href' },
    { label: 'Font size', id: 'fontSize', type: 'select', options: [...Array(29).keys()].map(x => x += 9) },
    { label: 'Font weight', id: 'fontWeight', type: 'select', options: [300, 600, 700] },
    { label: 'Font style', id: 'fontStyle', type: 'select', options: ['normal', 'italic', 'oblique'] },
    { label: 'Text Decoration', id: 'textDecoration', type: 'select', options: ['underline', 'overline', 'none'] },
    { label: 'Width', id: 'width', type: 'number' },
];

const headerFields = {
    id: 'custom-header',
    version: ''
};

const headerFA = [
    { label: 'Version', id: 'version', type: 'select', options: ['regular'] }
];

const footerFields = {
    id: 'custom-footer',
    version: ''
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
    video: videoFields
};

export const emailContentFieldArrays = {
    text: textFA,
    image: imageFA,
    button: buttonFA,
    header: headerFA,
    footer: footerFA,
    video: videoFA
};