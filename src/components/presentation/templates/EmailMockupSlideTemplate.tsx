
import type { EmailMockupSlide } from '../../../types/presentation';

interface Props {
    slide: EmailMockupSlide;
    onNext?: () => void;
}

export default function EmailMockupSlideTemplate({ slide, onNext }: Props) {
    return (
        <div className="relative w-full h-full bg-gray-100 flex items-center justify-center font-sans">
            <div className="w-[1200px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200">

                {/* Fake Email Header */}
                <div className="bg-gray-50 p-6 border-b border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-spekty-navy flex items-center justify-center text-white font-bold text-xl">
                            S
                        </div>
                        <div>
                            <div className="font-bold text-xl text-gray-900">{slide.sender}</div>
                            <div className="text-gray-500">à moi</div>
                        </div>
                        <div className="ml-auto text-gray-400">il y a 2 minutes</div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Objet : {slide.subject}</h2>
                </div>

                {/* Email Body */}
                {/* Email Body */}
                <div className="p-16 min-h-[400px] text-lg text-gray-800 leading-relaxed flex flex-col font-sans">

                    {slide.variant === 'confirmation' ? (
                        <>
                            {/* Header Logo */}
                            <div className="flex justify-center mb-12">
                                <span className="text-6xl font-bold text-spekty-navy">Spekty<span className="text-spekty-brand-blue">.</span></span>
                            </div>

                            <p className="mb-8">Bonjour Cyril DEUX</p>

                            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
                                <p className="font-bold text-green-800 text-lg">
                                    ✅ Votre rendez-vous est confirmé !
                                </p>
                            </div>

                            <p className="mb-6">
                                Nous vous confirmons le passage de notre technicien·ne pour le contrôle de vos travaux d'isolation.
                            </p>

                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                                <p className="mb-2 text-gray-500 uppercase text-sm font-bold tracking-wider">Date et Heure</p>
                                <p className="text-2xl font-bold text-spekty-navy mb-4">Samedi 31 Janvier 2026</p>
                                <p className="text-xl font-bold text-spekty-brand-blue">Entre 08:00 et 08:30</p>
                            </div>

                            <p className="mb-6">
                                Un SMS de rappel vous sera envoyé 24h avant le rendez-vous.
                            </p>

                            {/* Footer Legal */}
                            <p className="text-sm text-gray-600 mt-auto mb-4">
                                La demande de contrôle émane de la société <span className="font-bold">SIPLEC TEST | Primes Energie E.Leclerc</span>.
                            </p>
                        </>
                    ) : (
                        <>
                            {/* Header Logo */}
                            <div className="flex justify-center mb-12">
                                <span className="text-6xl font-bold text-spekty-navy">Spekty<span className="text-spekty-brand-blue">.</span></span>
                            </div>

                            <p className="mb-8">Bonjour Cyril DEUX</p>

                            <p className="mb-6">
                                Nous vous informons que <span className="font-bold text-spekty-brand-blue">BLE TEST</span>, notre technicien·ne <span className="font-bold bg-yellow-200 px-1">SPEKTY</span>, prendra contact avec vous dans les jours à venir pour effectuer un contrôle <span className="font-bold">obligatoire</span> des travaux d'isolation réalisés à l'adresse suivante :
                            </p>

                            <p className="font-bold mb-8">
                                3 avenue de chevreul, 92400 COURBEVOIE
                            </p>

                            <p className="mb-2">
                                Pour prendre rendez-vous, nous vous joindrons au(x) numéro(s) suivant(s) :
                            </p>
                            <p className="font-bold mb-8">
                                0613339524
                            </p>

                            <div className="mb-8 p-4 bg-orange-50 border-l-4 border-spekty-yellow rounded-r-lg">
                                <p>
                                    👉 Il n'est <span className="font-bold">pas nécessaire de nous contacter</span> pour convenir d'un rendez-vous : vous pourrez directement partager vos disponibilités avec notre technicien·ne lors de son appel.
                                </p>
                            </div>

                            <p className="mb-6">
                                Vous pouvez dès à présent planifier la mission vous-même en fonction de vos disponibilités :
                            </p>

                            {/* Interactive Button */}
                            <div className="my-6 text-center">
                                <button
                                    onClick={onNext}
                                    className="px-16 py-4 bg-[#062259] hover:bg-spekty-royal-blue text-white text-xl font-medium rounded shadow-lg transition-transform transform hover:scale-105 active:scale-95"
                                >
                                    Je planifie
                                </button>
                            </div>

                            {/* Footer Legal */}
                            <p className="text-sm text-gray-600 mt-8 mb-4">
                                La demande de contrôle émane de la société <span className="font-bold">SIPLEC TEST | Primes Energie E.Leclerc</span>, qui finance une partie de ces travaux grâce au dispositif CEE (certificats d'économies d'énergies), et qui prend également intégralement en charge le coût de ce contrôle.
                            </p>

                            {/* Green Footer */}
                            <p className="text-center font-bold text-spekty-green text-lg mt-4">
                                La visite dure environ 30 minutes et est totalement gratuite pour vous.
                            </p>
                        </>
                    )}

                </div>
            </div>

            {/* Context Note */}
            <div className="absolute bottom-8 text-gray-500 italic">
                * Cliquez sur le bouton "Je planifie" pour continuer la démonstration
            </div>
        </div>
    );
}
