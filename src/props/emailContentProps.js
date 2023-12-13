const textFields = {
    text: '',
    fontSize: '',
    fontWeight: '',
    fontStyle: '',
    color: '',
    align: ''
};


const textFA = [
    { label: 'Text', id: 'text', },
    { label: 'Font size', id: 'font-size', type: 'select', options: [...Array(29).keys()].map(x => x += 9) },
    { label: 'Font weight', id: 'font-weight', type: 'select', options: [300, 600, 700] },
    { label: 'Font style', id: 'font-style', type: 'select', options: ['normal', 'italic', 'oblique'] },
    { label: 'Text color', id: 'color', },
    { label: 'Align', id: 'align', type: 'select', options: ['left', 'right', 'center', 'justify'] }
];

const imageFields = {
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
    { label: 'Font size', id: 'font-size', type: 'select', options: [...Array(29).keys()].map(x => x += 9) },
    { label: 'Font weight', id: 'font-weight', type: 'select', options: [300, 600, 700] },
    { label: 'Font style', id: 'font-style', type: 'select', options: ['normal', 'italic', 'oblique'] },
    { label: 'Text Decoration', id: 'text-decoration', type: 'select', options: ['underline', 'overline', 'none'] },
    { label: 'Width', id: 'width', type: 'number' },
];

const headerFields = {
    version: ''
};

const headerFA = [
    { label: 'Version', id: 'version', type: 'select', options: ['regular'] }
];

const footerFields = {
    version: ''
};

const footerFA = [
    { label: 'Version', id: 'version', type: 'select', options: ['regular'] }
];

const videoFields = {
    link: ''
};

const videoFA = [
    { label: 'Link', id: 'link' }
];

export const fields = {
    textFields,
    imageFields,
    buttonFields,
    headerFields,
    footerFields,
    videoFields
};

export const fieldArrays = {
    textFA,
    imageFA,
    buttonFA,
    headerFA,
    footerFA,
    videoFA
};