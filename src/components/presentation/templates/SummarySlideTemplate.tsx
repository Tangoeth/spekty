import React from 'react';
import type { SummarySlide } from '../../../types/presentation';
import { ContentBackground } from '../SlideBackgrounds';
import { Clock } from 'lucide-react'; // Placeholder icon from screenshot

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

            <div className="relative z-10 h-full flex flex-col justify-center pl-32">
                <div className="space-y-12">
                    {slide.items.map((item, idx) => (
                        <div key={item.id} className="flex items-center gap-12 group">
                            {/* Number */}
                            <div className="text-9xl font-light text-spekty-royal-blue relative">
                                {item.number}
                                <span className="absolute -right-6 top-2 bottom-2 w-1 bg-spekty-royal-blue/30" />
                            </div>

                            {/* Content */}
                            <div className="flex items-center gap-6">
                                <div className="text-4xl text-gray-400 font-light tracking-widest uppercase">
                                    {item.text}
                                </div>
                            </div>

                            {/* Icon / Decorative on Right side */}
                            <div className="absolute right-32 flex items-center justify-center">
                                {/* This would be positioned relatively to the list in reality, matching screenshot layout roughly */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Decorative Icons on Right - simplified for loop */}
            <div className="absolute right-32 top-1/2 -translate-y-1/2 space-y-24">
                {slide.items.map((_, i) => (
                    <div key={i} className="flex items-center gap-4 opacity-70">
                        <div className="p-4 rounded-full border-2 border-dashed border-spekty-brand-blue text-spekty-brand-blue">
                            <Clock size={48} />
                        </div>
                        <span className="text-3xl text-spekty-brand-blue font-bold">x'</span>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-8 right-12">
                <span className="text-4xl font-bold text-spekty-navy">Spekty.</span>
            </div>
        </div>
    );
}
