import { object, string, array, number, ref } from 'yup'

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
    password: string().required()
});

const emailSchema = object({
    email: string().required().email(),
});

const newUserSchema = object({
    email: string().required().email(),
    password: string().required('Password is required'),
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
    email: string().email().required(),
    address: string(),
    location: string(),
    phone: string()
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
    donationSchema
};