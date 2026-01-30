
import type { TitleSlide } from '../../../types/presentation';
import { TitleBackground } from '../SlideBackgrounds';
import { Rocket } from 'lucide-react';

interface Props {
    slide: TitleSlide;
}

export default function TitleSlideTemplate({ slide }: Props) {
    return (
        <div className="relative w-full h-full text-white font-sans">
            <TitleBackground />

            <div className="relative z-10 w-full h-full flex flex-col p-24">
                {/* Header / Date */}
                <div className="text-2xl opacity-90 font-light mb-auto">
                    {slide.date && `Date : ${slide.date}`}
                </div>

                {/* Main Content */}
                <div className="mb-24 relative">
                    <h1 className="text-[180px] font-bold leading-none tracking-tight mb-8">
                        Spekty<span className="text-spekty-brand-blue">.</span>
                    </h1>
                    <h2 className="text-6xl font-normal opacity-95">
                        {slide.title}
                    </h2>
                    {slide.subtitle && (
                        <p className="text-3xl mt-6 opacity-80 max-w-2xl">
                            {slide.subtitle}
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-auto text-center border-t border-white/10 pt-8">
                    <p className="text-2xl font-medium">
                        La confiance au service <span className="text-spekty-brand-blue">d'une société engagée</span>
                    </p>
                </div>
            </div>

            {/* Decorative Rocket - Positioned to match screenshot */}
            <div className="absolute bottom-[15%] right-[15%] z-20 transform rotate-12">
                <Rocket size={400} className="text-white drop-shadow-2xl" strokeWidth={1} fill="white" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-spekty-brand-blue/50 blur-[60px] rounded-full" />
            </div>
        </div>
    );
}
