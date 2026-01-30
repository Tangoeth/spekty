import React from 'react';
import Layout from '../components/Layout';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';

const ConversationTwo: React.FC = () => {
    const messages = [
        {
            role: 'user',
            content: "Y a-t-il un problème de conformité sur cette photo ?\n\n![Problème Pompe à Chaleur](/heat-pump-issue.png)"
        },
        {
            role: 'ai',
            content: "Pour affiner mon analyse, **recherchez-vous un défaut de conformité concernant l'installation de la pompe à chaleur elle-même, ou concernant l'isolation du mur extérieur visible autour ?**"
        },
        {
            role: 'user',
            content: "C'est l'isolant du mur extérieur."
        },
        {
            role: 'ai',
            content: "Entendu. Pour déterminer la conformité au regard des fiches CEE, j'ai besoin d'une information clé :\n\n**La pièce située derrière ce mur est-elle chauffée ?**"
        },
        {
            role: 'user',
            content: "Oui"
        },
        {
            role: 'ai',
            content: "Dans ce contexte, le constat est clair : **ne pas isoler derrière la pompe à chaleur va créer un pont thermique.**\n\n![Zone non conforme](/heat_pump_annotated.png)\n\nUn déplacement de l'équipement est nécessaire pour isoler correctement. L'absence d'isolant à cet endroit constitue un défaut majeur.\n\n### Conclusion CEE\nDans le cadre d’un contrôle réalisé pour une opération **BAR-EN-102** ou **BAT-EN-102**, le rapport sera classé **Non Satisfaisant**.\n\n### Référence Réglementaire\nCette conclusion s'appuie sur le point 4 de l’Arrêté du 28 septembre 2021 (en vigueur au 14 janvier 2026) :\n\n> « La répartition de l'isolant est manifestement non homogène ou il est constaté une absence d'isolant non explicable [...] ou une absence de coffrage et d'isolant au niveau du passage de points particuliers ou d'équipements particuliers. »\n\n**Conclusion** : L’absence d’isolant au niveau d’équipements particuliers (comme cette PAC) rend l'opération non conforme si le mur isolé donne sur un volume chauffé."
        }
    ] as const;

    return (
        <Layout>
            <div className="flex-1 overflow-y-auto pb-40">
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} role={msg.role} content={msg.content} />
                ))}
            </div>
            <ChatInput />
        </Layout>
    );
};

export default ConversationTwo;
