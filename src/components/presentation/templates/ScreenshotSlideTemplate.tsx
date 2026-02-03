
import type { ScreenshotSlide } from '../../../types/presentation';
import { ContentBackground } from '../SlideBackgrounds';

interface Props {
    slide: ScreenshotSlide;
}

export default function ScreenshotSlideTemplate({ slide }: Props) {
    return (
        <div className="relative w-full h-full text-spekty-dark font-sans p-2 overflow-hidden flex flex-col">
            <ContentBackground />

            {/* Header */}
            <div className="relative z-10 mb-1 text-center shrink-0">
                <h2 className="text-3xl font-bold text-spekty-navy">{slide.title}</h2>
            </div>

            {/* Image Container */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 w-full">
                {slide.secondaryImageSrc ? (
                    /* Dual Image Layout */
                    <div className={`flex ${slide.layout === 'column' ? 'flex-col' : ''} gap-1 h-full items-end justify-center w-full px-0 pb-12`}>
                        {/* First Image */}
                        <div
                            className={`flex flex-col justify-end items-center ${slide.layout === 'column' ? 'w-full min-h-0 mt-12' : 'h-full flex-1 min-w-0'}`}
                            style={{ flex: slide.imageFlexRatio ?? 1 }}
                        >
                            <img
                                src={slide.imageSrc}
                                alt={slide.title}
                                className="object-contain w-full h-auto max-w-full max-h-[85%]"
                            />
                            {slide.secondaryCaption && slide.caption && (
                                <p className="mt-4 text-center text-lg text-spekty-navy font-medium bg-white/90 px-4 py-1 rounded-full shadow-sm border border-gray-100">
                                    {slide.caption}
                                </p>
                            )}
                        </div>

                        {/* Second Image */}
                        <div className={`flex flex-col justify-end items-center relative ${slide.layout === 'column' ? 'w-full flex-1 min-h-0' : 'h-full flex-1 min-w-0'}`}>
                            <img
                                src={slide.secondaryImageSrc}
                                alt={slide.title}
                                className="object-contain w-full h-auto max-w-full max-h-[85%]"
                            />
                            {slide.secondaryImageHighlight && (
                                <div
                                    className="absolute border-4 border-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                                    style={{
                                        top: slide.secondaryImageHighlight.top,
                                        left: slide.secondaryImageHighlight.left,
                                        width: slide.secondaryImageHighlight.width,
                                        height: slide.secondaryImageHighlight.height,
                                    }}
                                />
                            )}
                            {slide.secondaryCaption && (
                                <p className="mt-4 text-center text-lg text-gray-600 font-medium bg-white/90 px-4 py-1 rounded-full shadow-sm border border-gray-100">
                                    {slide.secondaryCaption}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Single Image Layout (Maximized) */
                    <div className="relative w-full h-full flex items-center justify-center mt-4">
                        <img
                            src={slide.imageSrc}
                            alt={slide.title}
                            className="object-contain w-full h-full max-h-[60vh]"
                        />
                    </div>
                )}
            </div>

            {/* Shared Caption (only if NO secondary caption) */}
            {slide.caption && !slide.secondaryCaption && (
                <div className="mt-4 shrink-0 text-center">
                    <p className="text-2xl text-spekty-navy font-medium bg-white/90 px-8 py-3 rounded-full shadow-sm inline-block border border-gray-100">
                        {slide.caption}
                    </p>
                </div>
            )}
        </div>
    );
}
