import React, { useState, useEffect, useCallback } from 'react';
import type { SlideData } from '../../types/presentation';
import SlideRenderer from './SlideRenderer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PresentationProps {
    slides: SlideData[];
}

export default function Presentation({ slides }: PresentationProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scale, setScale] = useState(1);

    // Aspect ratio 16:9
    const WIDTH = 1920;
    const HEIGHT = 1080;

    const updateScale = useCallback(() => {
        const windowRatio = window.innerWidth / window.innerHeight;
        const targetRatio = WIDTH / HEIGHT;

        if (windowRatio > targetRatio) {
            // Window is wider than 16:9, fit to height
            setScale(window.innerHeight / HEIGHT);
        } else {
            // Window is narrower, fit to width
            setScale(window.innerWidth / WIDTH);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', updateScale);
        updateScale();
        return () => window.removeEventListener('resize', updateScale);
    }, [updateScale]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
    }, [slides.length]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') goToNext();
            if (e.key === 'ArrowLeft') goToPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goToNext, goToPrev]);

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
            {/* Viewport Container */}
            <div
                style={{
                    width: WIDTH,
                    height: HEIGHT,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center'
                }}
                className="relative bg-white shadow-2xl overflow-hidden"
            >
                <SlideRenderer
                    slide={slides[currentIndex]}
                    currentSlideIndex={currentIndex}
                    totalSlides={slides.length}
                    onNext={goToNext}
                />
            </div>

            {/* Navigation Controls (Overlay) */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-50 group">
                <button
                    onClick={goToPrev}
                    disabled={currentIndex === 0}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 transition-opacity"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={goToNext}
                    disabled={currentIndex === slides.length - 1}
                    className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 transition-opacity"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Page Indicator */}
            <div className="absolute bottom-4 left-4 text-white/50 text-sm font-sans">
                {currentIndex + 1} / {slides.length}
            </div>
        </div>
    );
}
