import { object, string, array, number, ref, mixed } from 'yup'
import { months } from '../../vars/dateObjects';

const performanceSchema = array().of(object({
    date: string().required('date required'),
    time: string().required('time required'),
    id: number().required('id required'),
    location: string().required('location required'),
    url: string().url('valid url needed'),
    venue: string().required('venue required'),
    lat: number(),
    lng: number()
})).min(1);

const eventFileSchema = object({
    imageUrl: mixed().required('Image file upload required').test('is-valid-type', 'Not a valid image file', (value) => {
        return value && value instanceof File && ((value.name?.toLowerCase())?.endsWith('.png') || (value.name?.toLowerCase())?.endsWith('.jpg') || (value.name?.toLowerCase())?.endsWith('.jpeg') || (value.name?.toLowerCase())?.endsWith('.webp'))
    }),
    program: mixed().test('is-valid-type', 'Not a valid pdf file', (value) => {
        return value && value instanceof File ? ((value.name?.toLowerCase())?.endsWith('.pdf')) : true;
    })
})

const eventSchema = object({
    dateDone: string().required('date required'),
    description: string().required('description required'),
    title: string().required('title required'),
    // performances: array().of(performanceSchema).min(1)
});

const musicianSchema = object({
    bio: string().required('bio required'),
    featured: number().min(0).required('featured required'),
    name: string().required('name required'),
    newTitle: string().required('instrument required'),
});

const musicianFileSchema = object({
    pic: mixed().required('Image file upload required').test('is-valid-type', 'Not a valid image file', (value) => {
        return value && value instanceof File &&  ((value.name?.toLowerCase())?.endsWith('.png') || (value.name?.toLowerCase())?.endsWith('.jpg') || (value.name?.toLowerCase())?.endsWith('.jpeg') || (value.name?.toLowerCase())?.endsWith('.webp'))
    })
})

const userSchema = object({
    email: string().required().email(),
    password: string().required().min(6, 'Password must be at least 6 characters long')
});

const emailSchema = object({
    email: string().required().email(),
});

const newUserSchema = object({
    email: string().required().email(),
    password: string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    passwordConfirmation: string().oneOf([ref('password'), undefined], 'Passwords must match')
});


const newTextSchema = object({
    key: string().required('title/key required'),
    value: string().required('value required')
});

const videoSchema = object({
    featured: number().min(0, 'number is less than 0').max(5, 'number is greater than 5').required('featured required'),
    title: string().required('title required'),
    youtubeId: string().required('youtubeId required'),
    thumbnail: string().url('valid url required').required('thumbnail is required'),
    program: string().required(),
    category: string().required().oneOf(['full concert', 'live', 'studio'])
});

const initialVideoSchema = object({
    url: string().url('valid youtube link required').required('youtube link required')
});

const donationSchema = array().of(object({
    date: string().required(),
    amount: string().required(),
    campaign: string().required().oneOf(['online', 'check', 'GoFundMe 2022']),
    recognitionName: string(),
    comment: string()
}));

const donorSchema = object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email(),
    address: string(),
    location: string(),
    phone: string()
});

const grantSchema = object({
    name: string().required(),
    link: string().url().required(),
    notification: string().oneOf(['No', 'Yes']).required(),
    description: string()
});

const dueMonthsSchema = array().of(object({
    dueMonth: string().required().oneOf(months)
}));


const CSVSchema = object().shape({
    csv: mixed().required('CSV file upload required').test('is-valid-type', 'Not a valid CSV file', (value) => {
        return value && value instanceof File && (value.name.toLowerCase()).endsWith('.csv');
    })
});

const publicFileSchema = object().shape({
    file: mixed().required().test('is-file', 'Not a valid file', (value) => {
        return value && value instanceof File
    })
})

const subscriberSchema = object({
    email: string().required().email(),
    firstName: string().required(),
    lastName: string().required(),
    imported: string(),
    location: string(),
    status: string().oneOf(["Unsubscribed", "Subscribed"]).required()
});

const tagsSchema = array().of(object({
    tag: string().required()
}));

const campaignSchema = object({
    subject: string().required(),
    previewText: string(),
    to: string().required(),
    from: string().email().required()
});

const emailComponentSchemas = {
    text: object({
        text: string().required(),
        fontSize: number().default(17),
        fontWeight: number().default(300),
        fontStyle: string().default('normal'),
        color: string(),
        align: string().default('left'),
        fontFamily: string().default('Helvetica, sans-serif'),
        lineHeight: string(),
        letterSpacing: string()
    }),
    image: object({
        src: string().url().required(),
        href: string().url(),
        width: string(),
        alt: string().required()
    }),
    button: object({
        text: string().required(),
        fontSize: number().default(20),
        fontWeight: number().default(600),
        fontStyle: string().default('normal'),
        color: string().default('#ffffff'),
        backgroundColor: string().default('#09455a'),
        href: string().url().required(),
        textDecoration: string().default('none'),
        width: string(),
        fontFamily: string().default('Helvetica, sans-serif'),
        border: string(),
        borderRadius: string(),
    }),
    header: object({
        variant: string().default('regular')
    }),
    footer: object({
        variant: string().oneOf(['regular', 'no-button']),
        socialType: string().oneOf(['color', 'bw'])
    }),
    video: object({
        videoId: string().required(),
        thumbnail: string().url()
    }),
    section: object({
        backgroundColor: string(),
        backgroundUrl: string().url(),
        border: string(),
        borderRadius: string(),
        padding: string(),
        textAlign: string()
    }),
    column: object({
        backgroundColor: string(),
        backgroundUrl: string().url(),
        border: string(),
        borderRadius: string(),
        padding: string(),
        textAlign: string()
    }),
    divider: object({
        width: string(),
        align: string().default('center'),
        borderWidth: string(),
        borderColor: string(),
    }),
    preview: object({
        text: string().required()
    }),
    title: object({
        text: string().required()
    }),
    font: object({
        href: string().url().required(),
        name: string().required()
    }),
    event: object({
        title: string().required(),
        href: string().url().required(),
        venue: string().required(),
        location: string().required(),
        dateTime: string().required(),
        fontSize: number().default(16),
        fontWeight: number().default(300),
        fontStyle: string().default('normal'),
        color: string(),
        align: string().default('left'),
        fontFamily: string(),
        lineHeight: string(),
        letterSpacing: string()
    }),
    raw: object({
        text: string().required()
    }),
    signature: object({
        sender: string().email().required().oneOf(['info@relicensemble.org', 'toma@relicensemble.org', 'aniela@relicensemble.org'])
    })
};

const selectComponentSchema = object({
    component: string()
});

const donationAcknowledgementSchema = object({
    email: string().email().required(),
    from: string().email().oneOf(['aniela@relicensemble.org', 'cullen@relicensemble.org', 'kako@relicensemble.org', 'natalie@relicensemble.org', 'rebecca@relicensemble.org', 'toma@relicensemble.org']).required(),
    subject: string().required(),
    content: string().required()
});

const operationSchema = object({
    ticketRevenue: number(),
    presenterFee: number(),
    eventDate: string().required(),
    partnerName: string(),
    partnerWebsite: string().url(),
    cashRevenue: number(),
    totalIncome: number(),
    title: string().required(),
    venueName: string().required(),
    venueAddress: string().required(),
    eventUrl: string().url().required(),
    eventDatabaseId: string(),
    eventbriteId: string(),
});

const listSchema = object({
    source: string().required().oneOf(['donors', 'subscribers']),
    name: string().required()
});

export {
    eventSchema,
    musicianSchema,
    musicianFileSchema,
    videoSchema,
    performanceSchema,
    eventFileSchema,
    newTextSchema,
    userSchema,
    initialVideoSchema,
    newUserSchema,
    emailSchema,
    donorSchema,
    donationSchema,
    grantSchema,
    dueMonthsSchema,
    CSVSchema,
    subscriberSchema,
    tagsSchema,
    campaignSchema,
    emailComponentSchemas,
    selectComponentSchema,
    donationAcknowledgementSchema,
    operationSchema,
    listSchema,
    publicFileSchema
};