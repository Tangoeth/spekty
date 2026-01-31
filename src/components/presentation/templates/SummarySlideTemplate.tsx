
import type { SummarySlide } from '../../../types/presentation';
import { ContentBackground } from '../SlideBackgrounds';


interface Props {
    slide: SummarySlide;
}

export default function SummarySlideTemplate({ slide }: Props) {
    return (
        <div className="relative w-full h-full text-spekty-dark font-sans">
            <ContentBackground />

            {/* Top Left Title curve mimics screenshot with styles if needed, but Title is usually simpler */}
            <div className="absolute top-16 left-16 z-10">
                <h2 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-spekty-navy to-spekty-royal-blue uppercase tracking-wide">
                    {slide.title}
                </h2>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center px-32 w-full">
                <div className="space-y-12 w-full">
                    {slide.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-12 group w-full">
                            {/* Number - Fixed width for alignment */}
                            <div className="text-9xl font-light text-spekty-royal-blue relative shrink-0 w-48 text-right">
                                {item.number}
                                <span className="absolute -right-6 top-2 bottom-2 w-1 bg-spekty-royal-blue/30" />
                            </div>

                            {/* Content */}
                            <div className="flex items-center gap-6 grow">
                                <div className="text-4xl text-gray-400 font-light tracking-widest uppercase">
                                    {item.text}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-8 right-12">
                <span className="text-4xl font-bold text-spekty-navy">Spekty.</span>
            </div>
        </div>
    );
}
