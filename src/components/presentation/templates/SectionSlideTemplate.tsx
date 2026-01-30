
import type { SectionSlide } from '../../../types/presentation';
import { ContentBackground } from '../SlideBackgrounds';

interface Props {
    slide: SectionSlide;
}

export default function SectionSlideTemplate({ slide }: Props) {
    return (
        <div className="relative w-full h-full text-spekty-dark font-sans flex items-center">
            <ContentBackground />

            <div className="relative z-10 w-full px-24 flex items-center gap-16">
                {/* Big Circle Number */}
                <div className="relative shrink-0 w-[400px] h-[400px] rounded-full border-[20px] border-spekty-brand-blue flex items-center justify-center bg-white shadow-xl">
                    <span className="text-[250px] font-bold text-black leading-none pb-4">
                        {slide.number}
                    </span>
                </div>

                {/* Title and Decoration */}
                <div className="flex flex-col flex-1">
                    <h2 className="text-8xl font-bold text-black mb-8">
                        {slide.title}
                    </h2>

                    {/* Tri-color line */}
                    <div className="w-full flex flex-col gap-2">
                        <div className="h-2 w-full bg-spekty-brand-blue rounded-full" />
                        <div className="h-1 w-3/4 bg-spekty-royal-blue rounded-full" />
                        <div className="h-0.5 w-1/2 bg-spekty-navy rounded-full" />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 right-12">
                <span className="text-4xl font-bold text-spekty-navy">Spekty.</span>
            </div>
        </div>
    );
}
