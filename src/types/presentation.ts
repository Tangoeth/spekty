export type SlideType = 'title' | 'summary' | 'section' | 'content' | 'palette' | 'scenario-split' | 'email-mockup' | 'screenshot';

export interface BaseSlide {
    type: SlideType;
}

export interface TitleSlide extends BaseSlide {
    type: 'title';
    title: string;
    subtitle?: string;
    date: string;
    footerText?: string;
}

export interface SummaryItem {
    id: string;
    number: string;
    text: string;
    // potentially add icon type here in future
}

export interface SummarySlide extends BaseSlide {
    type: 'summary';
    title: string;
    items: SummaryItem[];
}

export interface SectionSlide extends BaseSlide {
    type: 'section';
    number: string;
    title: string;
}

export interface ContentSlide extends BaseSlide {
    type: 'content';
    title: string;
    body: string | React.ReactNode;
}

export interface PaletteSlide extends BaseSlide {
    type: 'palette';
    title: string;
}

export interface ScenarioSplitSlide extends BaseSlide {
    type: 'scenario-split';
    title: string;
    scenario1: {
        title: string;
        items: string[];
        note?: string;
    };
    scenario2: {
        title: string;
        items: string[];
        note?: string;
    };
}

export interface EmailMockupSlide extends BaseSlide {
    type: 'email-mockup';
    title: string; // Internal title or displayed header
    subject: string;
    sender: string;
    buttonText: string;
    variant?: 'notification' | 'confirmation'; // Defaults to 'notification'
}

export interface ScreenshotSlide extends BaseSlide {
    type: 'screenshot';
    title: string;
    imageSrc: string; // URL or path to the image
    secondaryImageSrc?: string; // Optional second image for comparison
    secondaryImageHighlight?: {
        top: string;
        left: string;
        width: string;
        height: string;
    };
    layout?: 'row' | 'column'; // Defaults to 'row'
    imageFlexRatio?: number; // Flex value for primary image (default 1). Secondary is always 1.
    caption?: string;
}

export type SlideData =
    | TitleSlide
    | SummarySlide
    | SectionSlide
    | ContentSlide
    | PaletteSlide
    | ScenarioSplitSlide
    | EmailMockupSlide
    | ScreenshotSlide;
