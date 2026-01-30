import React from 'react';
import Layout from '../components/Layout';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';

const ConversationOne: React.FC = () => {
    const messages = [
        { role: 'user', content: "Dans le cadre d’une isolation de murs par l’extérieur, peut-on ne pas isoler derrière l’unité extérieure d’une pompe à chaleur ?" },
        {
            role: 'ai',
            content: "Pour vous répondre précisément selon le référentiel CEE, j'ai besoin d'une précision technique :\n\n**La pièce située derrière le mur, à proximité immédiate de l'unité extérieure de la pompe à chaleur (PAC), est-elle un volume chauffé ?**"
        },
        { role: 'user', content: "Oui" },
        {
            role: 'ai',
            content: "Dans ce cas, il n'est **pas admissible** de laisser cette zone non isolée.\n\nD'après le référentiel CEE (Fiches BAR-EN-102 / BAT-EN-102), une absence d'isolation derrière la pompe à chaleur entraînerait systématiquement un rapport de contrôle **Non Satisfaisant**.\n\n### Analyse Réglementaire\nCette conclusion s'appuie sur le point 4 de l'Arrêté du 28 septembre 2021 :\n> « La répartition de l'isolant est manifestement non homogène ou il est constaté une absence d'isolant non explicable [...] au niveau du passage de points particuliers ou d'équipements particuliers. »\n\n### Recommandation Technique\nNe pas isoler à cet endroit crée un **pont thermique**. Il est nécessaire de prévoir le déplacement de l'unité (dépose/repose) pour garantir la continuité de l'isolant derrière l'équipement.\n\n*Note : Si le mur donnait sur un volume non chauffé, l'absence d'isolant serait tolérée techniquement, mais la surface correspondante serait exclue du calcul de la prime CEE.*"
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

export default ConversationOne;
