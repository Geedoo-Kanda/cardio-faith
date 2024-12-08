import React, { useState } from 'react';

const FAQAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleToggle = (index: any) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "Quels types de maladies prenez-vous en charge ?",
            answer:
                "Nous traitons un large éventail de maladies cardiovasculaires, telles que l’hypertension artérielle, les maladies coronariennes, l’insuffisance cardiaque, les troubles du rythme cardiaque (arythmies), et bien d’autres. Nous proposons également des programmes de prévention pour réduire les risques de maladies cardiaques.",
        },
        {
            question: "Ai-je besoin d’une prescription pour consulter ?",
            answer:
                "Non, il n’est pas nécessaire d’avoir une prescription médicale pour prendre rendez-vous avec nos spécialistes. Nous accueillons tous les patients, qu’ils viennent pour un contrôle préventif, un diagnostic ou un traitement spécifique.",
        },
        {
            question: "Quels examens réalisez-vous sur place ?",
            answer:
                "Nous effectuons une variété d'examens tels que l'électrocardiogramme (ECG), l’échocardiographie, les tests d’effort, le Holter ECG (surveillance continue du rythme cardiaque), et la mesure ambulatoire de la tension artérielle sur 24 heures. Ces examens nous permettent d’établir un diagnostic précis et d’adapter le traitement à vos besoins.",
        },
        {
            question: "Acceptez-vous les assurances médicales ?",
            answer:
                "Oui, nous travaillons avec plusieurs compagnies d’assurance. Si vous êtes assuré, veuillez apporter votre carte d’assurance lors de votre rendez-vous pour faciliter les démarches administratives. Notre équipe vous aidera à vérifier la couverture de vos frais médicaux et les conditions spécifiques de votre contrat.",
        },
        {
            question: "Quels sont vos horaires d’ouverture et comment puis-je vous contacter ?",
            answer:
                "Nous sommes ouverts du lundi au vendredi de 8h00 à 18h00, et le samedi de 9h00 à 13h00. Pour prendre rendez-vous ou poser vos questions, vous pouvez nous contacter par téléphone au [votre numéro] ou via notre site web à l’adresse [votre site]. Nous restons à votre disposition pour répondre à toutes vos préoccupations.",
        },
    ];

    return (
        <div className="">
            <span className="bg-red-100 text-red-600 py-2 px-8 rounded-full border border-red-600">FAQ</span>
            <div className="space-y-4 mt-5">
                {faqData.map((item, index) => (
                    <div key={index} className="">
                        <button
                            onClick={() => handleToggle(index)}
                            className={`${activeIndex === index ? 'bg-red-600 text-white' : ''} w-full text-sm text-left py-3 px-4 bg-red-50 font-medium hover:bg-red-600 focus:outline-none focus:bg-red-600 hover:text-white focus:text-white rounded-md border border-red-200`}
                        >
                            {item.question}
                        </button>
                        {activeIndex === index && (
                            <div className="py-3 px-4 bg-red-50 text-gray-700">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQAccordion;
