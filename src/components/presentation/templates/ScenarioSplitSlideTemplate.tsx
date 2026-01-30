
import type { ScenarioSplitSlide } from '../../../types/presentation';
import { ContentBackground } from '../SlideBackgrounds';
import { Users, User } from 'lucide-react';

interface Props {
    slide: ScenarioSplitSlide;
}

export default function ScenarioSplitSlideTemplate({ slide }: Props) {
    return (
        <div className="relative w-full h-full text-spekty-dark font-sans p-12 overflow-hidden">
            <ContentBackground />

            <div className="relative z-10 w-full h-full flex flex-col">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-5xl font-bold text-spekty-navy">{slide.title}</h2>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-12 px-12 pb-12">
                    {/* Scenario 1 */}
                    <div className="bg-white/80 rounded-2xl shadow-xl p-8 border-t-8 border-spekty-brand-blue flex flex-col items-center text-center backdrop-blur-sm">
                        <div className="mb-6 p-6 rounded-full bg-blue-50 text-spekty-brand-blue">
                            <Users size={64} />
                        </div>
                        <h3 className="text-4xl font-bold text-spekty-royal-blue mb-10">
                            {slide.scenario1.title}
                        </h3>
                        <ul className="text-left space-y-6 px-4 w-full">
                            {slide.scenario1.items.map((item, idx) => (
                                <li key={idx} className="flex items-start text-2xl text-gray-700 leading-relaxed">
                                    <span className="mr-4 text-spekty-brand-blue font-bold text-3xl shrink-0">{idx + 1}.</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        {slide.scenario1.note && (
                            <p className="mt-8 text-xl text-gray-500 italic px-4 text-left">
                                {slide.scenario1.note}
                            </p>
                        )}
                    </div>

                    {/* Scenario 2 */}
                    <div className="bg-white/80 rounded-2xl shadow-xl p-10 border-t-8 border-spekty-green flex flex-col items-center backdrop-blur-sm h-full justify-start">
                        <div className="mb-8 p-6 rounded-full bg-green-50 text-spekty-green">
                            <User size={72} />
                        </div>
                        <h3 className="text-4xl font-bold text-spekty-green mb-10">
                            {slide.scenario2.title}
                        </h3>
                        <ul className="text-left space-y-6 px-4 w-full">
                            {slide.scenario2.items.map((item, idx) => (
                                <li key={idx} className="flex items-start text-2xl text-gray-700 leading-relaxed">
                                    <span className="mr-4 text-spekty-green font-bold text-3xl shrink-0">{idx + 1}.</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        {slide.scenario2.note && (
                            <p className="mt-8 text-xl text-gray-500 italic px-4 text-left border-t border-gray-200 pt-4">
                                {slide.scenario2.note}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
