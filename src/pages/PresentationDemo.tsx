import React from 'react';
import Presentation from '../components/presentation/Presentation';
import type { SlideData } from '../types/presentation';

const demoSlides: SlideData[] = [
    {
        type: 'title',
        title: 'Intégration 7opteam dans Flow',
        date: '30/01/2026',
        subtitle: 'Optimiser la planification collaborative'
    },
    {
        type: 'summary',
        title: 'SOMMAIRE',
        items: [
            { id: '1', number: '01', text: 'Scénarios de Planification' },
            { id: '2', number: '02', text: 'Interface Bénéficiaire Flow' },
            { id: '3', number: '03', text: 'Interface Intervenant' },
            { id: '4', number: '04', text: 'Confirmation de planification' },
        ]
    },
    {
        type: 'section',
        number: '1',
        title: 'Scénarios de Planification'
    },
    {
        type: 'scenario-split',
        title: 'Planification assistée : Deux scénarios',
        scenario1: {
            title: 'Mission en Lot',
            items: [
                'Import du lot dans Flow',
                'La mission est correctement géocodée et le bénéficiaire est une personne physique',
                'Échantillonnage est réalisé (Échantillonnage assisté ou non)',
                'La mission est affectée à un intervenant',
                'L\'intervenant accepte la mission',
                'Envoi d\'un mail de planification automatique au bénéficiaire'
            ]
        },
        scenario2: {
            title: 'Mission Individuelle',
            items: [
                'Import de la mission dans Flow',
                'La mission est correctement géocodée et le bénéficiaire est une personne physique',
                'Passage automatique en planification assistée',
                'Envoi d\'un mail de planification automatique au bénéficiaire'
            ],
            note: '(L\'affectation sera alors faite en fonction du créneau choisi par le bénéficiaire, l\'affectation peut changer en fonction de la pertinence selon 7opteam.)'
        }
    },
    {
        type: 'email-mockup',
        title: 'Notification Bénéficiaire',
        sender: 'Equipe Spekty',
        subject: 'Planification de votre contrôle obligatoire',
        buttonText: 'Je planifie'
    },
    {
        type: 'section',
        number: '2',
        title: 'Interface Bénéficiaire Flow'
    },
    {
        type: 'screenshot',
        title: 'Les créneaux retournés par 7 opteam',
        imageSrc: '/assets/flow-step-1.png',
        secondaryImageSrc: '/assets/flow-step-2.png',
        caption: 'À gauche : Proposition optimale. À droite : Autres disponibilités en cas de refus.'
    },
    {
        type: 'screenshot',
        title: 'Le bénéficiaire définit ses créneaux',
        imageSrc: '/assets/flow-step-3-a.png',
        secondaryImageSrc: '/assets/flow-step-3-b.png',
        caption: 'Formulaire de proposition de nouveaux créneaux avec gestion des contraintes (exemple : alerte date non conforme).'
    },
    {
        type: 'section',
        number: '3',
        title: 'Interface Intervenant'
    },
    {
        type: 'screenshot',
        title: 'Le bénéficiaire a renseigné ses disponibilités',
        imageSrc: '/assets/intervenant-step-1-a.png',
        secondaryImageSrc: '/assets/intervenant-step-1-b.png',
        layout: 'column',
        imageFlexRatio: 0.6,
        caption: 'Notification de disponibilité (Popup) et mise à jour du statut dans le tableau de bord (Calendrier vert).'
    },
    {
        type: 'screenshot',
        title: "L'intervenant planifie selon les disponibilités du bénéficiaires",
        imageSrc: '/assets/intervenant-step-2-a.png',
        secondaryImageSrc: '/assets/intervenant-step-2-b.png',
        layout: 'row',
        caption: 'Comparaison des disponibilités : Validation directe ou proposition alternative.'
    },

    {
        type: 'section',
        number: '3',
        title: 'Interface Intervenant'
    },
    {
        type: 'screenshot',
        title: 'Le bénéficiaire a renseigné ses disponibilités',
        imageSrc: '/assets/intervenant-step-1-a.png',
        secondaryImageSrc: '/assets/intervenant-step-1-b.png',
        layout: 'column',
        imageFlexRatio: 0.6,
        caption: 'Notification de disponibilité (Popup) et mise à jour du statut dans le tableau de bord (Calendrier vert).'
    },
    {
        type: 'screenshot',
        title: "L'intervenant planifie selon les disponibilités du bénéficiaires",
        imageSrc: '/assets/intervenant-step-2-a.png',
        secondaryImageSrc: '/assets/intervenant-step-2-b.png',
        layout: 'row',
        caption: 'Comparaison des disponibilités : Validation directe ou proposition alternative.'
    },
    {
        type: 'section',
        number: '4',
        title: 'Confirmation de planification'
    },
    {
        type: 'screenshot',
        title: 'Confirmation de planification',
        imageSrc: '/assets/email-confirmation-beneficiaire.jpg',
        secondaryImageSrc: '/assets/email-confirmation-intervenant.png',
        layout: 'row',
        caption: "À gauche : Confirmation reçue par le bénéficiaire. À droite : Confirmation reçue par l'intervenant."
    }
];

export default function PresentationDemo() {
    return <Presentation slides={demoSlides} />;
}
