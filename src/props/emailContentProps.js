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

const dividerFields = {
    id: 'mj-divider',
    align: 'center',
    width: '100',
    borderWidth: '2',
    borderColor: '#000000'
};

const dividerFA = [
    { label: 'Align', id: 'align', type: 'select', options: ['left', 'right', 'center', 'justify'] },
    { label: 'Width', id: 'width', type: 'number' },
    { label: 'Border width', id: 'borderWidth', type: 'number' },
    { label: 'Border color', id: 'borderColor' },
]

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
    align: 'left',
    fontFamily: ''
};


const textFA = [
    { label: 'Text', id: 'text', multiline: true },
    { label: 'Font size', id: 'fontSize', type: 'select', options: [...Array(29).keys()].map(x => x += 9) },
    { label: 'Font weight', id: 'fontWeight', type: 'select', options: [300, 400, 600, 700, 900] },
    { label: 'Font style', id: 'fontStyle', type: 'select', options: ['normal', 'italic', 'oblique'] },
    { label: 'Text color', id: 'color', },
    { label: 'Align', id: 'align', type: 'select', options: ['left', 'right', 'center', 'justify'] },
    { label: 'Font family', id: 'fontFamily' }
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
    width: '',
    fontFamily: '',
    border: '',
    borderRadius: '',
};

const buttonFA = [
    { label: 'Text', id: 'text', },
    { label: 'Text color', id: 'color', },
    { label: 'Background color', id: 'backgroundColor' },
    { label: 'Link', id: 'href' },
    { label: 'Font size', id: 'fontSize', type: 'select', options: [...Array(29).keys()].map(x => x += 9) },
    { label: 'Font weight', id: 'fontWeight', type: 'select', options: [300, 400, 600, 700, 900] },
    { label: 'Font style', id: 'fontStyle', type: 'select', options: ['normal', 'italic', 'oblique'] },
    { label: 'Text Decoration', id: 'textDecoration', type: 'select', options: ['underline', 'overline', 'none'] },
    { label: 'Width', id: 'width', type: 'number' },
    { label: 'Font family', id: 'fontFamily' },
    { label: 'Border', id: 'border' },
    { label: 'Border radius', id: 'borderRadius', type: 'number' },
];

const headerFields = {
    id: 'custom-header',
    variant: 'regular'
};

const headerFA = [
    { label: 'Variant', id: 'variant', type: 'select', options: ['regular'] }
];

const footerFields = {
    id: 'custom-footer',
    variant: 'regular',
    socialType: 'color'
};

const footerFA = [
    { label: 'Variant', id: 'variant', type: 'select', options: ['regular'] },
    { label: 'Social icons', id: 'socialType', type: 'select', options: ['color', 'bw'] },
];

const videoFields = {
    id: 'custom-video',
    videoId: '',
    thumbnail: '',
};

const videoFA = [
    { label: 'Video Id', id: 'videoId' },
    { label: 'Thumbnail', id: 'thumbnail' }
];

const previewFields = {
    id: 'mj-preview',
    text: ''
};

const previewFA = [
    { label: 'Text', id: 'text', }
];

const titleFields = {
    id: 'mj-title',
    text: ''
};

const titleFA = [
    { label: 'Text', id: 'text', }
];

const fontFields = {
    id: 'mj-font',
    href: '',
    name: ''
};

const fontFA = [
    { label: 'Link', id: 'href', },
    { label: 'Name', id: 'name' },
];

export const emailContentFields = {
    text: textFields,
    image: imageFields,
    button: buttonFields,
    header: headerFields,
    footer: footerFields,
    video: videoFields,
    section: sectionFields,
    column: columnFields,
    divider: dividerFields,
    preview: previewFields,
    title: titleFields,
    font: fontFields
};

export const emailContentFieldArrays = {
    text: textFA,
    image: imageFA,
    button: buttonFA,
    header: headerFA,
    footer: footerFA,
    video: videoFA,
    section: sectionFA,
    column: columnFA,
    divider: dividerFA,
    preview: previewFA,
    title: titleFA,
    font: fontFA
};