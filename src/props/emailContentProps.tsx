import { FieldsArrayItem } from "../types/fnProps";

const sectionFields = {
    id: 'mj-section',
    backgroundColor: '',
    backgroundUrl: '',
    border: '',
    borderRadius: '',
    padding: '',
    textAlign: 'left'
};

const sectionFA: FieldsArrayItem[] = [
    { label: 'Background color', id: 'backgroundColor' },
    { label: 'Background Url', id: 'backgroundUrl' },
    { label: 'Border', id: 'border' },
    { label: 'Border radius', id: 'borderRadius', type: 'number' },
    { label: 'Padding', id: 'padding' },
    { label: 'Text align', id: 'textAlign', type: 'select', options: [{ value: 'left' }, { value: 'right' }, { value: 'center' }, { value: 'justify' }] },
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

const dividerFA: FieldsArrayItem[] = [
    { label: 'Align', id: 'align', type: 'select', options: [{ value: 'left' }, { value: 'right' }, { value: 'center' }, { value: 'justify' }] },
    { label: 'Width', id: 'width', type: 'number' },
    { label: 'Border width', id: 'borderWidth', type: 'number' },
    { label: 'Border color', id: 'borderColor' },
]

const columnFA: FieldsArrayItem[] = [
    { label: 'Background color', id: 'backgroundColor' },
    { label: 'Background Url', id: 'backgroundUrl' },
    { label: 'Border', id: 'border' },
    { label: 'Border radius', id: 'borderRadius' },
    { label: 'Padding', id: 'padding' },
    { label: 'Text align', id: 'textAlign', type: 'select', options: [{ value: 'left' }, { value: 'right' }, { value: 'center' }, { value: 'justify' }] },
]

const textFields = {
    id: 'mj-text',
    text: '',
    fontSize: 17,
    fontWeight: 300,
    fontStyle: 'normal',
    color: '#000000',
    align: 'left',
    fontFamily: 'Helvetica, sans-serif',
    letterSpacing: '',
    lineHeight: '1.2'
};


const textFA: FieldsArrayItem[] = [
    { label: 'Text', id: 'text', multiline: true, type: 'rich-text' },
    { label: 'Font size', id: 'fontSize', type: 'select', options: [...Array(29).keys()].map(x => ({ value: x += 9 })) },
    { label: 'Font weight', id: 'fontWeight', type: 'select', options: [{ value: 300 }, { value: 400 }, { value: 600 }, { value: 700 }, { value: 900 }] },
    { label: 'Font style', id: 'fontStyle', type: 'select', options: [{ value: 'normal' }, { value: 'italic' }, { value: 'oblique' }] },
    { label: 'Text color', id: 'color', },
    { label: 'Align', id: 'align', type: 'select', options: [{ value: 'left' }, { value: 'right' }, { value: 'center' }, { value: 'justify' }] },
    { label: 'Font family', id: 'fontFamily' },
    { label: 'Letter spacing', id: 'letterSpacing', type: 'number' },
    { label: 'Line height', id: 'lineHeight' }
];

const customTextFields = {
    id: 'custom-event',
    title: '',
    dateTime: '',
    venue: '',
    location: '',
    href: '',
    fontSize: 17,
    fontWeight: 300,
    fontStyle: 'normal',
    color: '#000000',
    align: 'left',
    fontFamily: 'Helvetica, sans-serif',
    letterSpacing: '',
    lineHeight: '1.2'
};


const customTextFA: FieldsArrayItem[] = [
    { label: 'Title', id: 'title', },
    { label: 'Date & time', id: 'dateTime' },
    { label: 'Venue', id: 'venue' },
    { label: 'Location', id: 'location' },
    { label: 'Link', id: 'href' },
    { label: 'Font size', id: 'fontSize', type: 'select', options: [...Array(29).keys()].map(x => ({ value: x += 9 })) },
    { label: 'Font weight', id: 'fontWeight', type: 'select', options: [{ value: 300 }, { value: 400 }, { value: 600 }, { value: 700 }, { value: 900 }] },
    { label: 'Font style', id: 'fontStyle', type: 'select', options: [{ value: 'normal' }, { value: 'italic' }, { value: 'oblique' }] },
    { label: 'Text color', id: 'color', },
    { label: 'Align', id: 'align', type: 'select', options: [{ value: 'left' }, { value: 'right' }, { value: 'center' }, { value: 'justify' }] },
    { label: 'Font family', id: 'fontFamily' },
    { label: 'Letter spacing', id: 'letterSpacing', type: 'number' },
    { label: 'Line height', id: 'lineHeight' }
];

const imageFields = {
    id: 'mj-image',
    src: '',
    href: '',
    width: '',
    alt: ''
}

const imageFA: FieldsArrayItem[] = [
    { label: 'Source', id: 'src' },
    { label: 'Link', id: 'href' },
    { label: 'Width', id: 'width', type: 'number' },
    { label: 'Alt text', id: 'alt' }
];

const buttonFields = {
    id: 'mj-button',
    text: '',
    color: '#ffffff',
    backgroundColor: '#09455a',
    href: '',
    fontSize: 20,
    fontWeight: 600,
    fontStyle: 'normal',
    textDecoration: 'none',
    width: '',
    fontFamily: 'Helvetica, sans-serif',
    border: '2px solid #0c6280',
    borderRadius: 5,
};

const buttonFA: FieldsArrayItem[] = [
    { label: 'Text', id: 'text', },
    { label: 'Text color', id: 'color', },
    { label: 'Background color', id: 'backgroundColor' },
    { label: 'Link', id: 'href' },
    { label: 'Font size', id: 'fontSize', type: 'select', options: [...Array(29).keys()].map(x => ({ value: x += 9 })) },
    { label: 'Font weight', id: 'fontWeight', type: 'select', options: [{ value: 300 }, { value: 400 }, { value: 600 }, { value: 700 }, { value: 900 }] },
    { label: 'Font style', id: 'fontStyle', type: 'select', options: [{ value: 'normal' }, { value: 'italic' }, { value: 'oblique' }] },
    { label: 'Text Decoration', id: 'textDecoration', type: 'select', options: [{ value: 'underline' }, { value: 'overline' }, { value: 'none' }] },
    { label: 'Width', id: 'width', type: 'number' },
    { label: 'Font family', id: 'fontFamily' },
    { label: 'Border', id: 'border' },
    { label: 'Border radius', id: 'borderRadius', type: 'number' },
];

const headerFields = {
    id: 'custom-header',
    variant: 'regular'
};

const headerFA: FieldsArrayItem[] = [
    { label: 'Variant', id: 'variant', type: 'select', options: [{ value: 'regular' }] }
];

const footerFields = {
    id: 'custom-footer',
    variant: '',
    socialType: 'color'
};

const footerFA: FieldsArrayItem[] = [
    { label: 'Variant', id: 'variant', type: 'select', options: [{ value: 'regular' }, { value: 'no-button' }] },
    { label: 'Social icons', id: 'socialType', type: 'select', options: [{ value: 'color' }, { value: 'bw' }] },
];

const videoFields = {
    id: 'custom-video',
    videoId: '',
    thumbnail: '',
};

const videoFA: FieldsArrayItem[] = [
    { label: 'Video Id', id: 'videoId' },
    { label: 'Thumbnail', id: 'thumbnail' }
];

const previewFields = {
    id: 'mj-preview',
    text: ''
};

const previewFA: FieldsArrayItem[] = [
    { label: 'Text', id: 'text', }
];

const titleFields = {
    id: 'mj-title',
    text: ''
};

const titleFA: FieldsArrayItem[] = [
    { label: 'Text', id: 'text', }
];

const fontFields = {
    id: 'mj-font',
    href: '',
    name: ''
};

const fontFA: FieldsArrayItem[] = [
    { label: 'Link', id: 'href', },
    { label: 'Name', id: 'name' },
];

const rawFields = {
    id: 'mj-raw',
    text: ''
};

const rawFA: FieldsArrayItem[] = [
    { label: 'Text', id: 'text', multiline: true, type: 'rich-text' }
];

const signatureFields = {
    id: 'custom-signature',
    sender: ''
};

const signatureFA: FieldsArrayItem[] = [
    {
        label: 'Sender', id: 'sender', type: 'select', options: [
            { value: 'info@relicensemble.org' },
            { value: 'toma@relicensemble.org' },
            { value: 'aniela@relicensemble.org' },
            // { value: 'kako@relicensemble.org' },
            // { value: 'natalie@relicensemble.org' },
            // { value: 'cullen@relicensemble.org' },
            // { value: 'rebecca@relicensemble.org' }
        ]
    }
];

const attachmentFields = {
    id: 'custom-attachment',
    uri: ''
};

const attachmentFA: FieldsArrayItem[] = [
    {label: "URL", id: 'uri'}
]

export const emailContentFields = {
    attachment: attachmentFields,
    button: buttonFields,
    column: columnFields,
    divider: dividerFields,
    event: customTextFields,
    font: fontFields,
    footer: footerFields,
    header: headerFields,
    image: imageFields,
    preview: previewFields,
    section: sectionFields,
    text: textFields,
    title: titleFields,
    video: videoFields,
    raw: rawFields,
    signature: signatureFields
};

export const emailContentFieldArrays = {
    attachment: attachmentFA,
    button: buttonFA,
    column: columnFA,
    divider: dividerFA,
    event: customTextFA,
    font: fontFA,
    footer: footerFA,
    header: headerFA,
    image: imageFA,
    preview: previewFA,
    section: sectionFA,
    text: textFA,
    title: titleFA,
    video: videoFA,
    raw: rawFA,
    signature: signatureFA
};