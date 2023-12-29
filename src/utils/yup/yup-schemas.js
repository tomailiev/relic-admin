import { object, string, array, number, ref, mixed } from 'yup'

const performanceSchema = object({
    date: string().required('date required'),
    time: string().required('time required'),
    id: number().required('id required'),
    location: string().required('location required'),
    url: string().url('valid url needed'),
    venue: string().required('venue required'),
    lat: number('value needs to be a number'),
    lng: number('value needs to be a number')
});

const eventSchema = object({
    dateDone: string().required('date required'),
    description: string().required('description required'),
    imageUrl: string().required('imageUrl required'),
    title: string().required('title required'),
    performances: array().of(performanceSchema).min(1)
});

const musicianSchema = object({
    bio: string().required('bio required'),
    featured: number().min(0).required('featured required'),
    name: string().required('name required'),
    newTitle: string().required('instrument required'),
    pic: string().required('File path required')
});

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
    passwordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match')
});


const newTextSchema = object({
    key: string().required('title/key required'),
    value: string().required('value required')
});

const videoSchema = object({
    featured: number().min(0, 'number is less than 0').max(5, 'number is greater than 5').required('featured required'),
    title: string().required('title required'),
    youtubeId: string().required('youtubeId required'),
    thumbnail: string().url('valid url required').required('thumbnail is required')
});

const initialVideoSchema = object({
    featured: number().min(0, 'number is less than 0').max(5, 'number is greater than 5').required('featured required'),
    youtubeLink: string().url('valid youtube link required').required('youtube link required')
});

const donationSchema = object({
    date: string().required(),
    amount: string().required(),
    campaign: string().required().oneOf(['online', 'check', 'GoFundMe 2022']),
    recognitionName: string(),
    comment: string()
});

const donorSchema = object({
    // donations: array().of(donationSchema),
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
    notification: number().oneOf([0, 1]).required(),
    description: string()
});


const CSVSchema = object().shape({
    csv: mixed().required('CSV file upload required').test('is-valid-type', 'Not a valid CSV file', (value) => {
        return value && (value.name?.toLowerCase())?.endsWith('.csv');
    })
});

const subscriberSchema = object({
    email: string().required().email(),
    firstName: string().required(),
    lastName: string().required(),
    import: string(),
    // tags: array().of(),
    opt_in_time: string(),
    location: string(),
    status: string().oneOf(["0", "1"]).required()
});

const campaignSchema = object({
    subject: string(),
    previewText: string(),
    to: string(),
    from: string().email()
});

const emailComponentSchemas = {
    text: object({
        text: string().required(),
        fontSize: number().default(16),
        fontWeight: number().default(300),
        fontStyle: string().default('normal'),
        color: string(),
        align: string().default('left')
    }),
    image: object({
        src: string().url().required(),
        href: string().url(),
        width: string(),
        alt: string().required()
    }),
    button: object({
        text: string().required(),
        fontSize: number().default(16),
        fontWeight: number().default(300),
        fontStyle: string().default('normal'),
        color: string().default('#ffffff'),
        backgroundColor: string().default('#000000'),
        href: string().url(),
        textDecoration: string().default('none'),
        width: string(),
    }),
    header: object({
        variant: string().default('regular')
    }),
    footer: object({
        variant: string().default('regular')
    }),
    video: object({
        link: string().url()
    }),
    section: object({
        variant: string().required().oneOf(['start', 'end', 'end-start']),
        backgroundColor: string(),
        backgroundUrl: string().url(),
        border: string(),
        borderRadius: string(),
        padding: string(),
        textAlign: string()
    }),
    column: object({
        variant: string().required().oneOf(['start', 'end', 'end-start']),
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
    })
};

const selectComponentSchema = object({
    component: string()
});

export {
    eventSchema,
    musicianSchema,
    videoSchema,
    performanceSchema,
    newTextSchema,
    userSchema,
    initialVideoSchema,
    newUserSchema,
    emailSchema,
    donorSchema,
    donationSchema,
    grantSchema,
    CSVSchema,
    subscriberSchema,
    campaignSchema,
    emailComponentSchemas,
    selectComponentSchema
};