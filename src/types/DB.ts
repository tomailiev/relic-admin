import { Timestamp } from "firebase/firestore"

export interface WithId {
    id: string
};

export interface Video {
    category: string,
    featured: number,
    program: string,
    thumbnail: string,
    title: string,
    youtubeId: string,
    id?: string
};

export interface Musician {
    bio: string,
    featured: number,
    newTitle: string,
    name: string,
    pic: string,
    id?: string,
    imgSrc?: File
}

export interface Performance {
    date: string,
    day: string,
    geocode?: { lat: number, lng: number },
    id: string,
    location: string,
    time: string,
    url: string,
    venue: string
};

export interface DePerformance extends Omit<Performance, 'geocode'> {
    lng?: number,
    lat?: number
};

export interface Event {
    dateDone: Timestamp,
    description: string,
    imageUrl: string,
    title: string,
    performances: Performance[],
    program: string,
    id?: string,
    imgSrc?: File 
};

export interface DeEvent extends Omit<Event, 'id' | 'dateDone' | 'performances'> {
    dateDone: string,
    performances: DePerformance[],
    imgSrc?: File,
    programBook?: File
}

export interface Grant {
    description: string,
    dueMonths: number[],
    link: string,
    name: string,
    notification: number,
    id?: string
};

export interface DeschematifiedGrant extends Omit<Grant, 'dueMonths' | 'notification'> {
    dueMonths: { dueMonth: string }[],
    notification: string
}

export interface List {
    datetime: Timestamp,
    members: string[],
    name: string,
    source: 'subscribers' | 'donors',
    id?: string
};

export interface Donation {
    amount: number,
    campaign: string,
    comment: string,
    date: string,
    recognitionName: string,
    acknowledged: {
        content: string,
        from: string,
        sent: string,
        subject: string,
        to: string
    }
}

export interface Donor {
    address: string,
    email: string,
    firstName: string,
    lastName: string,
    lastDonationAmount: number,
    lastDonationDate: string,
    location: string,
    phone: string,
    tier: string,
    donations: Donation[],
    id?: string
}

interface CampaignAnalyticsEvent {
    email: string,
    timestamp: Timestamp
}

export interface Campaign {
    bounce: (CampaignAnalyticsEvent & { bounceType: string })[],
    click: (CampaignAnalyticsEvent & { link: string })[],
    delivered: CampaignAnalyticsEvent[],
    open: CampaignAnalyticsEvent[],
    unsubscribe: CampaignAnalyticsEvent[],
    reject: CampaignAnalyticsEvent[],
    spam: CampaignAnalyticsEvent[],
    sentTo: { email: string, firstName: string, lastName: string }[],
    status: 0 | 1,
    subject: string,
    to: string,
    mjml: string,
    messageId: string,
    lastTestId: string,
    html: string,
    from: string,
    datetime: Timestamp,
    components: { id: string }[],
    id?: string
};

interface SubscriberHistoryEvent {
    event: string,
    subject: string,
    timestamp: Timestamp
};

interface SubHistoryDateTime extends Omit<SubscriberHistoryEvent, 'timestamp'> {
    timestamp: Date
};


export interface Subscriber {
    email: string,
    firstName: string,
    lastName: string,
    imported: string,
    location: string,
    opt_in_time: string,
    origin: string,
    status: 0 | 1,
    history?: SubscriberHistoryEvent[],
    tags: string[],
    lists: string[],
    id?: string
};

export interface DeschematifiedSubscriber extends Omit<Subscriber, 'status' | 'tags'| 'history'> {
    status: string,
    tags: {tag: string}[],
    history?: SubHistoryDateTime[]
}

export interface CSV {
    csv: string
}

export interface Text {
    [key: string]: string
};

export type AnyItemType = Video | Musician | Event | Grant | List | Donor | Campaign | Subscriber;

export type ItemTypeMap = {
    'videos': Video;
    'musicians': Musician;
    'events': Event;
    'grants': Grant;
    'lists': List;
    'donors': Donor;
    'campaigns': Campaign;
    'subscribers': Subscriber;
    'CSVs': CSV;
    'texts': Text
};

export type DeschematifiedItemTypeMap = {
    grants: DeschematifiedGrant;
    subscribers: DeschematifiedSubscriber;
    event: DeEvent
}