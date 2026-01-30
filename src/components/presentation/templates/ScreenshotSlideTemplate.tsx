import React from 'react';
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
                    <div className={`flex ${slide.layout === 'column' ? 'flex-col' : ''} gap-1 h-full items-center justify-center w-full px-0`}>
                        {/* First Image */}
                        <div
                            className={`flex flex-col justify-center items-center ${slide.layout === 'column' ? 'w-full min-h-0 mt-12' : 'h-full flex-1 min-w-0'}`}
                            style={{ flex: slide.imageFlexRatio ?? 1 }}
                        >
                            <img
                                src={slide.imageSrc}
                                alt={slide.title}
                                className="object-contain w-full h-full max-w-full max-h-full"
                            />
                        </div>

                        {/* Second Image */}
                        <div className={`flex flex-col justify-center items-center relative ${slide.layout === 'column' ? 'w-full flex-1 min-h-0' : 'h-full flex-1 min-w-0'}`}>
                            <img
                                src={slide.secondaryImageSrc}
                                alt={slide.title}
                                className="object-contain w-full h-full max-w-full max-h-full"
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
                        </div>
                    </div>
                ) : (
                    /* Single Image Layout (Maximized) */
                    <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/50 max-h-full max-w-[98%]">
                        <img
                            src={slide.imageSrc}
                            alt={slide.title}
                            className="object-contain max-h-full w-auto bg-white"
                        />
                    </div>
                )}
            </div>

            {slide.caption && (
                <p className="mt-6 text-xl text-gray-600 font-medium italic bg-white/80 px-6 py-2 rounded-full">
                    {slide.caption}
                </p>
            )}
        </div>
    );
}
