import { object, string, array, number } from 'yup'

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

const textContentSchema = object({
    aboutBio: string().required(),
    aboutMission: string().required(),
    aboutStory: string().required(),
    aboutValues: string().required(),
    actionCenterDonate: string().required(),
    actionCenterSubscribe: string().required(),
    actionCenterTitle: string().required(),
    contentSections: array().of(object({
        cardImage: string().required(),
        cardTitle: string().required(),
        infoTitle: string().required(),
        infoText: string().required(),
        route: string().required()
    })),
    footerGemsNote: string().required(),
    mapText: string().required(),
    siteSubtitle: string().required(),
    subscribeTitle: string().required(),
    supportDonateCheckText: string().required(),
    supportDonateCheckTitle: string().required(),
    supportDonateNowNote: string().required(),
    supportDonateNowText: string().required(),
    supportDonateNowTitle: string().required(),
    supportGemsAddress: string().required(),
    supportJoinTitle: string().required(),
    supportMatchingText: string().required(),
    supportMatchingTitle: string().required(),
    supportOtherText: string().required(),
    supportOtherTitle: string().required(),
    supportSectionDonateTitle: string().required(),
    supportSectionJoinTitle: string().required(),
    supportVolunteersTitle: string().required()
});

const newTextSchema = object({
    key: string().required('title/key required'),
    value: string().required('value required')
})

const videoSchema = object({
    featured: number().min(0, 'number is less than 0').max(5, 'number is greater than 5').required('featured required'),
    title: string().required('title required'),
    youtubeId: string().required('youtubeId required'),
    thumbnail: string().url('valid url required').required('thumbnail is required')
})

export { eventSchema, musicianSchema, textContentSchema, videoSchema, performanceSchema, newTextSchema, userSchema };