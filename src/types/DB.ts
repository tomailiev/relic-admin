import { Timestamp } from "firebase/firestore"
import { ListWithNewMembers } from "./itemProps"
import { AnyMJMLComponent } from "./campaignComponents"

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
    firstName: string,
    lastName: string,
    isCurrent: number
    email?: string,
    phone?: string,
    id?: string,
    imgSrc?: File,
    chair?: string
}

export interface Photo {
    title: string,
    caption: string,
    pc: string,
    path: string,
    thumb: string,
    imgSrc?: File,
    id?: string
}

export interface Performance {
    date: string,
    day: string,
    geocode?: { lat: number, lng: number },
    id: string,
    location: string,
    time: string,
    url: string,
    venue: string,
    presenter?: string,
    caption?: string
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
    banner: string,
    program?: string,
    music?: string,
    subtitle?: string,
    intro?: string,
    id?: string,
    imgSrc?: File,
    musicians?: { name: string, newTitle: string, id: string }[]
};

export interface DeEvent extends Omit<Event, 'id' | 'dateDone' | 'performances'> {
    dateDone: string,
    performances: DePerformance[],
    imgSrc?: File,
    programBook?: File,
    eventBanner?: File,
    newMusicians?: any[],
    source?: string
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
    lists: string[]
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

export type CampaignComponent = {
    id: string,
    index?: number
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
    components: AnyMJMLComponent[],
    id?: string,
    attachments?: string[]
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

export interface DeschematifiedSubscriber extends Omit<Subscriber, 'status' | 'tags' | 'history'> {
    status: string,
    tags: { tag: string }[],
    history?: SubHistoryDateTime[]
}

export interface CSV {
    csv: string,
    csvFile?: File,
    id?: string
}

export interface Text {
    [key: string]: string
};

export interface CSVItem {
    docs: Subscriber[];
    id: string;
}

export type AnyItemType = Video | Musician | Event | Grant | List | Donor | Campaign | Subscriber | CSV | CSVItem | Photo;

export type ItemTypeMap = {
    'videos': Video;
    'musicians': Musician;
    'events': Event;
    'grants': Grant;
    'deschematifiedGrants': DeschematifiedGrant;
    'lists': List;
    'listsWithNewMembers': ListWithNewMembers;
    'donors': Donor;
    'campaigns': Campaign;
    'subscribers': Subscriber;
    'deschematifiedSubscribers': DeschematifiedSubscriber;
    'CSVs': CSV;
    'CSVItems': CSVItem
    'texts': Text,
    'textContent': Text,
    'photos': Photo
};

export type DeschematifiedItemTypeMap = {
    grants: DeschematifiedGrant;
    subscribers: DeschematifiedSubscriber;
    event: DeEvent
}


export type TimestampType =
    | { timestamp: Timestamp; timestamps?: never }
    | { timestamps: Timestamp[]; timestamp?: never };

export type statListType = ({ email: string, links?: string[], count?: number } & TimestampType)[];

export interface SubscriberCampaignStat {
    email: string,
    open: boolean,
    click: boolean,
    bounce: boolean,
    reject: boolean,
    unsubscribe: boolean,
    spam: boolean
};