
import type { SlideData } from '../../types/presentation';
import TitleSlideTemplate from './templates/TitleSlideTemplate';
import SummarySlideTemplate from './templates/SummarySlideTemplate';
import SectionSlideTemplate from './templates/SectionSlideTemplate';
import ContentSlideTemplate from './templates/ContentSlideTemplate';
import PaletteSlideTemplate from './templates/PaletteSlideTemplate';
import ScenarioSplitSlideTemplate from './templates/ScenarioSplitSlideTemplate';
import EmailMockupSlideTemplate from './templates/EmailMockupSlideTemplate';

import ScreenshotSlideTemplate from './templates/ScreenshotSlideTemplate';

interface Props {
    slide: SlideData;
    currentSlideIndex: number;
    totalSlides: number;
    onNext?: () => void;
}

export default function SlideRenderer({ slide, currentSlideIndex, onNext }: Props) {
    // Common Overlay for Page Number (except Title slide)
    const showPageNumber = slide.type !== 'title' && slide.type !== 'email-mockup';

    let content;
    switch (slide.type) {
        case 'title':
            content = <TitleSlideTemplate slide={slide} />;
            break;
        case 'summary':
            content = <SummarySlideTemplate slide={slide} />;
            break;
        case 'section':
            content = <SectionSlideTemplate slide={slide} />;
            break;
        case 'content':
            content = <ContentSlideTemplate slide={slide} />;
            break;
        case 'palette':
            content = <PaletteSlideTemplate slide={slide} />;
            break;
        case 'scenario-split':
            content = <ScenarioSplitSlideTemplate slide={slide} />;
            break;
        case 'email-mockup':
            content = <EmailMockupSlideTemplate slide={slide} onNext={onNext} />;
            break;
        case 'screenshot':
            content = <ScreenshotSlideTemplate slide={slide} />;
            break;
        default:
            content = <div>Unknown Slide Type</div>;
    }

    return (
        <div className="relative w-full h-full">
            {content}

            {showPageNumber && (
                <div className="absolute top-8 right-8 text-2xl font-bold text-spekty-navy flex items-center gap-2">
                    <span>{currentSlideIndex + 1}</span>
                    <span className="text-spekty-brand-blue">
                        {/* Use a simple chevron icon or shape */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </span>
                </div>
            )}
        </div>
    );
}
