import { CampaignComponent } from "./DB";

export interface MJMLSection extends CampaignComponent {
    backgroundColor: string;
    backgroundUrl: string,
    border: string,
    borderRadius: string,
    padding: string,
    textAlign: string
};

export interface MJMLColumn extends CampaignComponent {
    backgroundColor: string;
    backgroundUrl: string,
    border: string,
    borderRadius: string,
    padding: string,
    textAlign: string
};

export interface MJMLDivider extends CampaignComponent {
    align: string,
    width: string,
    borderWidth: string,
    borderColor: string
};

export interface MJMLText extends CampaignComponent {
    text: string,
    fontSize: number,
    fontWeight: number,
    fontStyle: string,
    color: string,
    align: string,
    fontFamily: string,
    letterSpacing: string,
    lineHeight: string
};

export interface MJMLCustomText extends Omit<MJMLText, "text"> {
    title: string,
    dateTime: string,
    venue: string,
    location: string,
    href: string
};

export interface MJMLImage extends CampaignComponent {
    src: string,
    href: string,
    width: string,
    alt: string
};

export interface MJMLButton extends Omit<MJMLText, "lineHeight" | "letterSpacing" | "align"> {
    backgroundColor: string,
    href: string,
    textDecoration: string,
    width: string,
    border: string,
    borderRadius: number,
};

export interface MJMLHeader extends CampaignComponent {
    variant: string;
};

export interface MJMLFooter extends MJMLHeader {
    socialType: string;
};

export interface MJMLVideo extends CampaignComponent {
    videoId: string;
    thumbnail: string;
};

export interface MJMLTextOnlyComponent extends CampaignComponent {
    text: string;
}

export interface MJMLPreview extends MJMLTextOnlyComponent { };

export interface MJMLTitle extends MJMLTextOnlyComponent { };

export interface MJMLFont extends CampaignComponent {
    href: string;
    name: string;
};

export interface MJMLRaw extends MJMLTextOnlyComponent { };

export interface MJMLSignature extends CampaignComponent {
    sender: string;
};

export interface MJMLAttachment extends CampaignComponent {
    uri: string;
}

export type AnyMJMLComponent = MJMLButton
    | MJMLColumn
    | MJMLCustomText
    | MJMLDivider
    | MJMLFont
    | MJMLFooter
    | MJMLHeader
    | MJMLImage
    | MJMLPreview
    | MJMLRaw
    | MJMLSection
    | MJMLSignature
    | MJMLText
    | MJMLTitle
    | MJMLVideo
    | MJMLAttachment

export type AnyMJMLKey = 'attachment' | 'button' | 'column' | 'divider' | 'event' | 'font' | 'footer' | 'header' | 'image' | 'preview' | 'raw' | 'section' | 'signature' | 'text' | 'title' | 'video';