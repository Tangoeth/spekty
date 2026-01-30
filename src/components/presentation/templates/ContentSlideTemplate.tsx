
import type { ContentSlide } from '../../../types/presentation';
import { ContentBackground } from '../SlideBackgrounds';

interface Props {
    slide: ContentSlide;
}

export default function ContentSlideTemplate({ slide }: Props) {
    return (
        <div className="relative w-full h-full text-spekty-dark font-sans p-16">
            <ContentBackground />

            <div className="relative z-10 h-full flex flex-col">
                {/* Title */}
                <div className="mb-16">
                    <h2 className="text-6xl font-bold text-spekty-navy relative inline-block">
                        {slide.title}
                        {/* Decorative underline */}
                        <span className="absolute -bottom-2 left-0 w-1/3 h-2 bg-spekty-brand-blue rounded-full" />
                    </h2>
                </div>

                {/* Body Content */}
                <div className="flex-1 text-3xl leading-relaxed text-gray-600 max-w-5xl">
                    {typeof slide.body === 'string' ? <p>{slide.body}</p> : slide.body}
                </div>
            </div>

            <div className="absolute bottom-8 right-12">
                <span className="text-4xl font-bold text-spekty-navy">Spekty.</span>
            </div>
        </div>
    );
}
