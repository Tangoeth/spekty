
import type { PaletteSlide } from '../../../types/presentation';
import { ContentBackground } from '../SlideBackgrounds';

interface Props {
    slide: PaletteSlide;
}

const colors = [
    { name: 'Blue', hex: '#019EF7', bg: 'bg-spekty-brand-blue', text: 'white' },
    { name: 'Royal', hex: '#0F56E3', bg: 'bg-spekty-royal-blue', text: 'white' },
    { name: 'Navy', hex: '#062259', bg: 'bg-spekty-navy', text: 'white' },
    { name: 'Green', hex: '#A9D18E', bg: 'bg-spekty-green', text: 'white' },
    { name: 'Orange', hex: '#E46138', bg: 'bg-spekty-orange', text: 'white' },
    { name: 'Yellow', hex: '#FDCE6F', bg: 'bg-spekty-yellow', text: 'white' },
    { name: 'Gray Light', hex: '#D9D9D9', bg: 'bg-gray-300', text: 'white' }, // approximates
    { name: 'Gray Dark', hex: '#7F7F7F', bg: 'bg-gray-500', text: 'white' },
    { name: 'Black', hex: '#000000', bg: 'bg-black', text: 'white' },
];

export default function PaletteSlideTemplate({ slide }: Props) {
    return (
        <div className="relative w-full h-full text-spekty-dark font-sans p-16">
            <ContentBackground />

            <div className="relative z-10 h-full flex flex-col">
                <h2 className="text-6xl font-bold text-spekty-navy mb-24">
                    {slide.title}
                </h2>

                <div className="grid grid-cols-3 gap-16 px-24">
                    {colors.map((c) => (
                        <div key={c.hex} className={`${c.bg} h-32 flex items-center justify-center shadow-lg rounded-sm text-2xl font-medium text-white`}>
                            {c.hex}
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
