import pptxgen from "pptxgenjs";
import type {
    SlideData,
    TitleSlide,
    SummarySlide,
    SectionSlide,
    ContentSlide,
    PaletteSlide,
    ScenarioSplitSlide,
    EmailMockupSlide,
    ScreenshotSlide,
} from "../types/presentation";

// ─── Slide dimensions (LAYOUT_16x9) ───────────────────────────────
const W = 10; // inches
const H = 5.625; // inches

// ─── Colors (matching index.css @theme — NO # prefix for pptxgenjs) ─
const C = {
    navy: "062259",
    royalBlue: "0F56E3",
    brandBlue: "019EF7",
    dark: "14204b",
    green: "A9D18E",
    orange: "E46138",
    yellow: "FDCE6F",
    white: "FFFFFF",
    gray50: "F9FAFB",
    gray100: "F3F4F6",
    gray200: "E5E7EB",
    gray400: "9CA3AF",
    gray500: "6B7280",
    gray600: "4B5563",
    gray700: "374151",
    gray800: "1F2937",
    gray900: "111827",
    black: "000000",
    greenLight: "F0FDF4",
    green500: "22C55E",
    green800: "166534",
    orangeLight: "FFF7ED",
};

// ─── Font ──────────────────────────────────────────────────────────
const FONT = "Arial";

// ─── Helpers ───────────────────────────────────────────────────────

async function loadImageAsBase64(src: string): Promise<string | null> {
    try {
        const response = await fetch(src);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(blob);
        });
    } catch {
        console.warn("Failed to load image:", src);
        return null;
    }
}

/** Add "Spekty." footer in bottom-right */
function addSpektyFooter(slide: pptxgen.Slide) {
    slide.addText(
        [
            { text: "Spekty", options: { color: C.navy, bold: true } },
            { text: ".", options: { color: C.brandBlue, bold: true } },
        ],
        {
            x: W - 1.8,
            y: H - 0.45,
            w: 1.5,
            h: 0.35,
            fontSize: 16,
            fontFace: FONT,
            align: "right",
        }
    );
}

/** Add page number in top-right */
function addPageNumber(slide: pptxgen.Slide, index: number) {
    slide.addText(String(index + 1), {
        x: W - 0.6,
        y: 0.2,
        w: 0.4,
        h: 0.3,
        fontSize: 14,
        fontFace: FONT,
        color: C.navy,
        bold: true,
        align: "right",
    });
}

/** Add subtle content background blobs */
function addContentBackground(slide: pptxgen.Slide) {
    slide.background = { color: C.white };
    // Subtle top-left blob
    slide.addShape("ellipse", {
        x: -1.5,
        y: -1.5,
        w: 5,
        h: 5,
        fill: { color: C.brandBlue, transparency: 95 },
    });
    // Subtle bottom-right blob
    slide.addShape("ellipse", {
        x: W - 2.5,
        y: H * 0.3,
        w: 5,
        h: 5,
        fill: { color: C.brandBlue, transparency: 95 },
    });
}

// ─── Slide Renderers ───────────────────────────────────────────────

function renderTitleSlide(slide: pptxgen.Slide, data: TitleSlide) {
    // Gradient background (navy → royalBlue → brandBlue, diagonal)
    slide.addShape("rect", {
        x: 0,
        y: 0,
        w: "100%",
        h: "100%",
        fill: {
            type: "gradient",
            stops: [
                { color: C.navy, position: 0 },
                { color: C.royalBlue, position: 50 },
                { color: C.brandBlue, position: 100 },
            ],
        },
    });

    // Dark wave approximation (triangle overlay)
    slide.addShape("triangle", {
        x: 0,
        y: 0,
        w: W * 0.6,
        h: H * 0.7,
        fill: { color: C.black, transparency: 85 },
        rotate: 0,
    });

    // Light bottom-right ellipse
    slide.addShape("ellipse", {
        x: W * 0.6,
        y: H * 0.5,
        w: W * 0.5,
        h: H * 0.6,
        fill: { color: C.white, transparency: 92 },
    });

    // Date
    if (data.date) {
        slide.addText(`Date : ${data.date}`, {
            x: 0.8,
            y: 0.4,
            w: 4,
            h: 0.3,
            fontSize: 11,
            fontFace: FONT,
            color: C.white,
        });
    }

    // "Spekty." hero
    slide.addText(
        [
            { text: "Spekty", options: { color: C.white } },
            { text: ".", options: { color: C.brandBlue } },
        ],
        {
            x: 0.8,
            y: H * 0.3,
            w: 6,
            h: 1,
            fontSize: 54,
            fontFace: FONT,
            bold: true,
        }
    );

    // Title
    slide.addText(data.title, {
        x: 0.8,
        y: H * 0.3 + 1,
        w: W * 0.6,
        h: 0.8,
        fontSize: 28,
        fontFace: FONT,
        color: C.white,
    });

    // Subtitle
    if (data.subtitle) {
        slide.addText(data.subtitle, {
            x: 0.8,
            y: H * 0.3 + 1.8,
            w: W * 0.55,
            h: 0.5,
            fontSize: 18,
            fontFace: FONT,
            color: C.white,
            transparency: 20,
        });
    }

    // Footer tagline
    slide.addText(
        [
            {
                text: "La confiance au service ",
                options: { color: C.white, fontSize: 11 },
            },
            {
                text: "d'une société engagée",
                options: { color: C.brandBlue, fontSize: 11 },
            },
        ],
        {
            x: 0,
            y: H - 0.6,
            w: W,
            h: 0.4,
            fontFace: FONT,
            align: "center",
        }
    );
}

function renderSummarySlide(slide: pptxgen.Slide, data: SummarySlide) {
    addContentBackground(slide);

    // Title "SOMMAIRE"
    slide.addText(data.title.toUpperCase(), {
        x: 0.5,
        y: 0.3,
        w: 4,
        h: 0.6,
        fontSize: 28,
        fontFace: FONT,
        color: C.navy,
        bold: true,
    });

    // Items
    const startY = 1.3;
    const itemSpacing = (H - startY - 0.8) / Math.max(data.items.length, 1);

    data.items.forEach((item, i) => {
        const y = startY + i * itemSpacing;

        // Large number
        slide.addText(item.number, {
            x: 0.5,
            y: y,
            w: 1.4,
            h: 0.6,
            fontSize: 36,
            fontFace: FONT,
            color: C.royalBlue,
            align: "right",
        });

        // Vertical divider
        slide.addShape("line", {
            x: 2.1,
            y: y + 0.08,
            w: 0,
            h: 0.45,
            line: { color: C.royalBlue, width: 1, transparency: 70 },
        });

        // Item text
        slide.addText(item.text.toUpperCase(), {
            x: 2.3,
            y: y + 0.05,
            w: 7,
            h: 0.5,
            fontSize: 16,
            fontFace: FONT,
            color: C.gray400,
            valign: "middle",
        });
    });

    addSpektyFooter(slide);
}

function renderSectionSlide(slide: pptxgen.Slide, data: SectionSlide) {
    addContentBackground(slide);

    // Circle (ellipse with thick border)
    const cx = 1.8;
    const cy = H / 2 - 1.1;
    const circleSize = 2.2;

    // White filled circle
    slide.addShape("ellipse", {
        x: cx,
        y: cy,
        w: circleSize,
        h: circleSize,
        fill: { color: C.white },
        line: { color: C.brandBlue, width: 6 },
    });

    // Number inside circle
    slide.addText(data.number, {
        x: cx,
        y: cy,
        w: circleSize,
        h: circleSize,
        fontSize: 56,
        fontFace: FONT,
        color: C.black,
        bold: true,
        align: "center",
        valign: "middle",
    });

    // Title to the right
    const titleX = cx + circleSize + 0.5;
    slide.addText(data.title, {
        x: titleX,
        y: cy + 0.3,
        w: W - titleX - 0.8,
        h: 0.8,
        fontSize: 24,
        fontFace: FONT,
        color: C.black,
        bold: true,
        valign: "middle",
    });

    // Tri-color lines
    const lineY = cy + circleSize / 2 + 0.7;
    const lineMaxW = W - titleX - 1;

    // Brand blue (full width)
    slide.addShape("rect", {
        x: titleX,
        y: lineY,
        w: lineMaxW,
        h: 0.06,
        fill: { color: C.brandBlue },
    });
    // Royal blue (75%)
    slide.addShape("rect", {
        x: titleX,
        y: lineY + 0.12,
        w: lineMaxW * 0.75,
        h: 0.04,
        fill: { color: C.royalBlue },
    });
    // Navy (50%)
    slide.addShape("rect", {
        x: titleX,
        y: lineY + 0.22,
        w: lineMaxW * 0.5,
        h: 0.025,
        fill: { color: C.navy },
    });

    addSpektyFooter(slide);
}

function renderScenarioSplitSlide(
    slide: pptxgen.Slide,
    data: ScenarioSplitSlide
) {
    addContentBackground(slide);

    // Title
    slide.addText(data.title, {
        x: 0,
        y: 0.15,
        w: W,
        h: 0.5,
        fontSize: 20,
        fontFace: FONT,
        color: C.navy,
        bold: true,
        align: "center",
    });

    // Card dimensions
    const gap = 0.3;
    const cardW = (W - 0.8 - gap) / 2;
    const cardX1 = 0.4;
    const cardX2 = cardX1 + cardW + gap;
    const cardY = 0.8;
    const cardH = H - cardY - 0.35;

    const renderCard = (
        x: number,
        accentColor: string,
        title: string,
        items: string[],
        isMultiUser: boolean,
        note?: string
    ) => {
        // Card background with border
        slide.addShape("roundRect", {
            x,
            y: cardY,
            w: cardW,
            h: cardH,
            rectRadius: 0.1,
            fill: { color: C.white },
            line: { color: C.gray200, width: 0.5 },
        });

        // Top accent border
        slide.addShape("rect", {
            x,
            y: cardY,
            w: cardW,
            h: 0.07,
            fill: { color: accentColor },
        });

        // Icon circle
        const iconCx = x + cardW / 2 - 0.25;
        const iconCy = cardY + 0.25;
        slide.addShape("ellipse", {
            x: iconCx,
            y: iconCy,
            w: 0.5,
            h: 0.5,
            fill: { color: accentColor, transparency: 85 },
        });

        // Person icon (simplified via text)
        if (isMultiUser) {
            slide.addText("👥", {
                x: iconCx,
                y: iconCy,
                w: 0.5,
                h: 0.5,
                fontSize: 16,
                align: "center",
                valign: "middle",
            });
        } else {
            slide.addText("👤", {
                x: iconCx,
                y: iconCy,
                w: 0.5,
                h: 0.5,
                fontSize: 16,
                align: "center",
                valign: "middle",
            });
        }

        // Card title
        slide.addText(title, {
            x: x + 0.2,
            y: cardY + 0.85,
            w: cardW - 0.4,
            h: 0.4,
            fontSize: 16,
            fontFace: FONT,
            color: accentColor,
            bold: true,
            align: "center",
        });

        // Numbered items
        const itemStartY = cardY + 1.35;
        const lineH = 0.38;

        items.forEach((item, i) => {
            slide.addText(
                [
                    {
                        text: `${i + 1}. `,
                        options: {
                            color: accentColor,
                            bold: true,
                            fontSize: 10,
                        },
                    },
                    {
                        text: item,
                        options: { color: C.gray700, fontSize: 10 },
                    },
                ],
                {
                    x: x + 0.2,
                    y: itemStartY + i * lineH,
                    w: cardW - 0.4,
                    h: lineH,
                    fontFace: FONT,
                    valign: "top",
                }
            );
        });

        // Note
        if (note) {
            const noteY = itemStartY + items.length * lineH + 0.1;
            slide.addText(note, {
                x: x + 0.2,
                y: noteY,
                w: cardW - 0.4,
                h: 0.6,
                fontSize: 8,
                fontFace: FONT,
                color: C.gray500,
                italic: true,
                valign: "top",
            });
        }
    };

    renderCard(
        cardX1,
        C.brandBlue,
        data.scenario1.title,
        data.scenario1.items,
        true,
        data.scenario1.note
    );
    renderCard(
        cardX2,
        C.green,
        data.scenario2.title,
        data.scenario2.items,
        false,
        data.scenario2.note
    );
}

function renderEmailMockupSlide(
    slide: pptxgen.Slide,
    data: EmailMockupSlide
) {
    // Gray background
    slide.background = { color: C.gray100 };

    // Email container
    const emailW = 7;
    const emailH = 4.8;
    const emailX = (W - emailW) / 2;
    const emailY = (H - emailH) / 2 - 0.1;

    slide.addShape("roundRect", {
        x: emailX,
        y: emailY,
        w: emailW,
        h: emailH,
        rectRadius: 0.05,
        fill: { color: C.white },
        line: { color: C.gray200, width: 0.5 },
    });

    // ─ Email Header ─
    const headerH = 0.9;
    slide.addShape("rect", {
        x: emailX,
        y: emailY,
        w: emailW,
        h: headerH,
        fill: { color: C.gray50 },
    });
    // Separator line
    slide.addShape("line", {
        x: emailX,
        y: emailY + headerH,
        w: emailW,
        h: 0,
        line: { color: C.gray200, width: 0.5 },
    });

    // Avatar
    const avatarX = emailX + 0.2;
    const avatarY = emailY + 0.15;
    slide.addShape("ellipse", {
        x: avatarX,
        y: avatarY,
        w: 0.35,
        h: 0.35,
        fill: { color: C.navy },
    });
    slide.addText("S", {
        x: avatarX,
        y: avatarY,
        w: 0.35,
        h: 0.35,
        fontSize: 12,
        fontFace: FONT,
        color: C.white,
        bold: true,
        align: "center",
        valign: "middle",
    });

    // Sender name
    const senderX = avatarX + 0.5;
    slide.addText(data.sender, {
        x: senderX,
        y: avatarY,
        w: 3,
        h: 0.2,
        fontSize: 11,
        fontFace: FONT,
        color: C.gray900,
        bold: true,
    });

    // "à moi"
    slide.addText("à moi", {
        x: senderX,
        y: avatarY + 0.2,
        w: 1,
        h: 0.15,
        fontSize: 8,
        fontFace: FONT,
        color: C.gray500,
    });

    // Timestamp
    slide.addText("il y a 2 minutes", {
        x: emailX + emailW - 1.8,
        y: avatarY + 0.05,
        w: 1.5,
        h: 0.2,
        fontSize: 8,
        fontFace: FONT,
        color: C.gray400,
        align: "right",
    });

    // Subject
    slide.addText(`Objet : ${data.subject}`, {
        x: emailX + 0.25,
        y: emailY + headerH - 0.3,
        w: emailW - 0.5,
        h: 0.25,
        fontSize: 12,
        fontFace: FONT,
        color: C.gray800,
        bold: true,
    });

    // ─ Email Body ─
    const bodyX = emailX + 0.4;
    const bodyW = emailW - 0.8;
    let cursorY = emailY + headerH + 0.25;

    // Logo "Spekty."
    slide.addText(
        [
            { text: "Spekty", options: { color: C.navy, bold: true } },
            { text: ".", options: { color: C.brandBlue, bold: true } },
        ],
        {
            x: emailX,
            y: cursorY,
            w: emailW,
            h: 0.35,
            fontSize: 22,
            fontFace: FONT,
            align: "center",
        }
    );
    cursorY += 0.4;

    if (data.variant === "confirmation") {
        // Greeting
        slide.addText("Bonjour Cyril DEUX", {
            x: bodyX,
            y: cursorY,
            w: bodyW,
            h: 0.2,
            fontSize: 10,
            fontFace: FONT,
            color: C.gray800,
        });
        cursorY += 0.3;

        // Green confirmation banner
        slide.addShape("rect", {
            x: bodyX,
            y: cursorY,
            w: bodyW,
            h: 0.35,
            fill: { color: C.greenLight },
        });
        slide.addShape("rect", {
            x: bodyX,
            y: cursorY,
            w: 0.04,
            h: 0.35,
            fill: { color: C.green500 },
        });
        slide.addText("Votre rendez-vous est confirmé !", {
            x: bodyX + 0.15,
            y: cursorY,
            w: bodyW - 0.3,
            h: 0.35,
            fontSize: 10,
            fontFace: FONT,
            color: C.green800,
            bold: true,
            valign: "middle",
        });
        cursorY += 0.45;

        // Confirmation text
        slide.addText(
            "Nous vous confirmons le passage de notre technicien·ne pour le contrôle de vos travaux d'isolation.",
            {
                x: bodyX,
                y: cursorY,
                w: bodyW,
                h: 0.35,
                fontSize: 9,
                fontFace: FONT,
                color: C.gray800,
            }
        );
        cursorY += 0.45;

        // Date/time box
        slide.addShape("roundRect", {
            x: bodyX,
            y: cursorY,
            w: bodyW,
            h: 0.7,
            rectRadius: 0.03,
            fill: { color: C.gray50 },
            line: { color: C.gray200, width: 0.3 },
        });
        slide.addText("DATE ET HEURE", {
            x: bodyX + 0.15,
            y: cursorY + 0.05,
            w: bodyW,
            h: 0.15,
            fontSize: 7,
            fontFace: FONT,
            color: C.gray500,
            bold: true,
        });
        slide.addText("Samedi 31 Janvier 2026", {
            x: bodyX + 0.15,
            y: cursorY + 0.22,
            w: bodyW,
            h: 0.2,
            fontSize: 12,
            fontFace: FONT,
            color: C.navy,
            bold: true,
        });
        slide.addText("Entre 08:00 et 08:30", {
            x: bodyX + 0.15,
            y: cursorY + 0.45,
            w: bodyW,
            h: 0.18,
            fontSize: 10,
            fontFace: FONT,
            color: C.brandBlue,
            bold: true,
        });
        cursorY += 0.8;

        // Reminder
        slide.addText(
            "Un SMS de rappel vous sera envoyé 24h avant le rendez-vous.",
            {
                x: bodyX,
                y: cursorY,
                w: bodyW,
                h: 0.2,
                fontSize: 9,
                fontFace: FONT,
                color: C.gray800,
            }
        );
        cursorY += 0.35;

        // Legal
        slide.addText(
            "La demande de contrôle émane de la société SIPLEC TEST | Primes Energie E.Leclerc.",
            {
                x: bodyX,
                y: cursorY,
                w: bodyW,
                h: 0.25,
                fontSize: 7,
                fontFace: FONT,
                color: C.gray600,
            }
        );
    } else {
        // ─ Notification variant ─
        // Greeting
        slide.addText("Bonjour Cyril DEUX", {
            x: bodyX,
            y: cursorY,
            w: bodyW,
            h: 0.2,
            fontSize: 10,
            fontFace: FONT,
            color: C.gray800,
        });
        cursorY += 0.28;

        // Intro text
        slide.addText(
            "Nous vous informons que BLE TEST, notre technicien·ne SPEKTY, prendra contact avec vous dans les jours à venir pour effectuer un contrôle obligatoire des travaux d'isolation réalisés à l'adresse suivante :",
            {
                x: bodyX,
                y: cursorY,
                w: bodyW,
                h: 0.45,
                fontSize: 9,
                fontFace: FONT,
                color: C.gray800,
            }
        );
        cursorY += 0.5;

        // Address
        slide.addText("3 avenue de chevreul, 92400 COURBEVOIE", {
            x: bodyX,
            y: cursorY,
            w: bodyW,
            h: 0.18,
            fontSize: 9,
            fontFace: FONT,
            color: C.gray800,
            bold: true,
        });
        cursorY += 0.28;

        // Phone
        slide.addText(
            "Pour prendre rendez-vous, nous vous joindrons au(x) numéro(s) suivant(s) :",
            {
                x: bodyX,
                y: cursorY,
                w: bodyW,
                h: 0.15,
                fontSize: 9,
                fontFace: FONT,
                color: C.gray800,
            }
        );
        cursorY += 0.18;
        slide.addText("0613339524", {
            x: bodyX,
            y: cursorY,
            w: bodyW,
            h: 0.15,
            fontSize: 9,
            fontFace: FONT,
            color: C.gray800,
            bold: true,
        });
        cursorY += 0.25;

        // Orange info banner
        slide.addShape("rect", {
            x: bodyX,
            y: cursorY,
            w: bodyW,
            h: 0.5,
            fill: { color: C.orangeLight },
        });
        slide.addShape("rect", {
            x: bodyX,
            y: cursorY,
            w: 0.04,
            h: 0.5,
            fill: { color: C.yellow },
        });
        slide.addText(
            "Il n'est pas nécessaire de nous contacter pour convenir d'un rendez-vous : vous pourrez directement partager vos disponibilités avec notre technicien·ne lors de son appel.",
            {
                x: bodyX + 0.15,
                y: cursorY,
                w: bodyW - 0.3,
                h: 0.5,
                fontSize: 8,
                fontFace: FONT,
                color: C.gray800,
                valign: "middle",
            }
        );
        cursorY += 0.6;

        // Schedule text
        slide.addText(
            "Vous pouvez dès à présent planifier la mission vous-même en fonction de vos disponibilités :",
            {
                x: bodyX,
                y: cursorY,
                w: bodyW,
                h: 0.2,
                fontSize: 9,
                fontFace: FONT,
                color: C.gray800,
            }
        );
        cursorY += 0.3;

        // "Je planifie" button
        const btnW = 1.8;
        const btnX = emailX + emailW / 2 - btnW / 2;
        slide.addShape("roundRect", {
            x: btnX,
            y: cursorY,
            w: btnW,
            h: 0.35,
            rectRadius: 0.03,
            fill: { color: C.navy },
        });
        slide.addText(data.buttonText, {
            x: btnX,
            y: cursorY,
            w: btnW,
            h: 0.35,
            fontSize: 11,
            fontFace: FONT,
            color: C.white,
            bold: true,
            align: "center",
            valign: "middle",
        });
        cursorY += 0.5;

        // Legal
        slide.addText(
            "La demande de contrôle émane de la société SIPLEC TEST | Primes Energie E.Leclerc, qui finance une partie de ces travaux grâce au dispositif CEE (certificats d'économies d'énergies), et qui prend également intégralement en charge le coût de ce contrôle.",
            {
                x: bodyX,
                y: cursorY,
                w: bodyW,
                h: 0.35,
                fontSize: 7,
                fontFace: FONT,
                color: C.gray600,
            }
        );
        cursorY += 0.4;

        // Green footer
        slide.addText(
            "La visite dure environ 30 minutes et est totalement gratuite pour vous.",
            {
                x: emailX,
                y: cursorY,
                w: emailW,
                h: 0.2,
                fontSize: 9,
                fontFace: FONT,
                color: C.green,
                bold: true,
                align: "center",
            }
        );
    }

    // Context note
    slide.addText(
        '* Cliquez sur le bouton "Je planifie" pour continuer la démonstration',
        {
            x: 0,
            y: H - 0.35,
            w: W,
            h: 0.25,
            fontSize: 8,
            fontFace: FONT,
            color: C.gray500,
            italic: true,
            align: "center",
        }
    );
}

async function renderScreenshotSlide(
    slide: pptxgen.Slide,
    data: ScreenshotSlide
) {
    addContentBackground(slide);

    // Title
    slide.addText(data.title, {
        x: 0,
        y: 0.15,
        w: W,
        h: 0.5,
        fontSize: 22,
        fontFace: FONT,
        color: C.navy,
        bold: true,
        align: "center",
    });

    const contentTop = 0.75;
    const contentH = H - contentTop - 0.6;
    const contentW = W - 0.6;
    const contentX = 0.3;

    // Load images
    const img1Data = await loadImageAsBase64(data.imageSrc);
    const img2Data = data.secondaryImageSrc
        ? await loadImageAsBase64(data.secondaryImageSrc)
        : null;

    if (img1Data && !img2Data && !data.secondaryImageSrc) {
        // Single image — centered
        slide.addImage({
            data: img1Data,
            x: contentX + contentW * 0.075,
            y: contentTop,
            w: contentW * 0.85,
            h: contentH - 0.3,
            sizing: {
                type: "contain",
                w: contentW * 0.85,
                h: contentH - 0.3,
            },
        });

        if (data.caption) {
            slide.addText(data.caption, {
                x: 1,
                y: H - 0.55,
                w: W - 2,
                h: 0.3,
                fontSize: 10,
                fontFace: FONT,
                color: C.navy,
                align: "center",
            });
        }
    } else if (img1Data || img2Data) {
        // Dual image layout
        const isColumn = data.layout === "column";
        const ratio1 = data.imageFlexRatio ?? 1;
        const ratio2 = 1;
        const totalRatio = ratio1 + ratio2;
        const captionSpace = data.secondaryCaption || data.caption ? 0.35 : 0;

        if (isColumn) {
            const gapH = 0.15;
            const availH = contentH - gapH - captionSpace;
            const h1 = (availH * ratio1) / totalRatio;
            const h2 = (availH * ratio2) / totalRatio;

            if (img1Data) {
                slide.addImage({
                    data: img1Data,
                    x: contentX,
                    y: contentTop,
                    w: contentW,
                    h: h1,
                    sizing: { type: "contain", w: contentW, h: h1 },
                });
                if (data.secondaryCaption && data.caption) {
                    slide.addText(data.caption, {
                        x: 1,
                        y: contentTop + h1,
                        w: W - 2,
                        h: 0.25,
                        fontSize: 9,
                        fontFace: FONT,
                        color: C.navy,
                        align: "center",
                    });
                }
            }

            if (img2Data) {
                const y2 =
                    contentTop +
                    h1 +
                    gapH +
                    (data.secondaryCaption && data.caption ? 0.3 : 0);
                slide.addImage({
                    data: img2Data,
                    x: contentX,
                    y: y2,
                    w: contentW,
                    h: h2,
                    sizing: { type: "contain", w: contentW, h: h2 },
                });
                if (data.secondaryCaption) {
                    slide.addText(data.secondaryCaption, {
                        x: 1,
                        y: y2 + h2,
                        w: W - 2,
                        h: 0.25,
                        fontSize: 9,
                        fontFace: FONT,
                        color: C.gray600,
                        align: "center",
                    });
                }
            }
        } else {
            // Row layout (side by side)
            const gapW = 0.15;
            const availH = contentH - captionSpace;
            const w1 = ((contentW - gapW) * ratio1) / totalRatio;
            const w2 = ((contentW - gapW) * ratio2) / totalRatio;

            if (img1Data) {
                slide.addImage({
                    data: img1Data,
                    x: contentX,
                    y: contentTop,
                    w: w1,
                    h: availH,
                    sizing: { type: "contain", w: w1, h: availH },
                });
                if (data.secondaryCaption && data.caption) {
                    slide.addText(data.caption, {
                        x: contentX,
                        y: contentTop + availH + 0.05,
                        w: w1,
                        h: 0.25,
                        fontSize: 9,
                        fontFace: FONT,
                        color: C.navy,
                        align: "center",
                    });
                }
            }

            if (img2Data) {
                const x2 = contentX + w1 + gapW;
                slide.addImage({
                    data: img2Data,
                    x: x2,
                    y: contentTop,
                    w: w2,
                    h: availH,
                    sizing: { type: "contain", w: w2, h: availH },
                });
                if (data.secondaryCaption) {
                    slide.addText(data.secondaryCaption, {
                        x: x2,
                        y: contentTop + availH + 0.05,
                        w: w2,
                        h: 0.25,
                        fontSize: 9,
                        fontFace: FONT,
                        color: C.gray600,
                        align: "center",
                    });
                }
            }

            // Shared caption (only if no secondaryCaption)
            if (data.caption && !data.secondaryCaption) {
                slide.addText(data.caption, {
                    x: 1,
                    y: H - 0.55,
                    w: W - 2,
                    h: 0.3,
                    fontSize: 10,
                    fontFace: FONT,
                    color: C.navy,
                    align: "center",
                });
            }
        }
    } else {
        // Placeholder
        slide.addShape("rect", {
            x: 2,
            y: 1.5,
            w: W - 4,
            h: H - 3,
            fill: { color: C.gray100 },
        });
        slide.addText("Image non disponible", {
            x: 2,
            y: H / 2 - 0.2,
            w: W - 4,
            h: 0.4,
            fontSize: 14,
            fontFace: FONT,
            color: C.gray500,
            italic: true,
            align: "center",
        });
    }
}

function renderPaletteSlide(slide: pptxgen.Slide, data: PaletteSlide) {
    addContentBackground(slide);

    // Title
    slide.addText(data.title, {
        x: 0.5,
        y: 0.3,
        w: 5,
        h: 0.6,
        fontSize: 28,
        fontFace: FONT,
        color: C.navy,
        bold: true,
    });

    // Color palette grid (3x3)
    const paletteColors = [
        { name: "Blue", hex: "019EF7" },
        { name: "Royal", hex: "0F56E3" },
        { name: "Navy", hex: "062259" },
        { name: "Green", hex: "A9D18E" },
        { name: "Orange", hex: "E46138" },
        { name: "Yellow", hex: "FDCE6F" },
        { name: "Gray Light", hex: "D9D9D9" },
        { name: "Gray Dark", hex: "7F7F7F" },
        { name: "Black", hex: "000000" },
    ];

    const cols = 3;
    const gridX = 0.8;
    const gridY = 1.2;
    const gapX = 0.3;
    const gapY = 0.2;
    const swatchW = (W - 2 * gridX - (cols - 1) * gapX) / cols;
    const swatchH = 1.1;

    paletteColors.forEach((color, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = gridX + col * (swatchW + gapX);
        const y = gridY + row * (swatchH + gapY);

        slide.addShape("rect", {
            x,
            y,
            w: swatchW,
            h: swatchH,
            fill: { color: color.hex },
        });

        slide.addText(`#${color.hex}`, {
            x,
            y,
            w: swatchW,
            h: swatchH,
            fontSize: 12,
            fontFace: FONT,
            color: C.white,
            bold: true,
            align: "center",
            valign: "middle",
        });
    });

    addSpektyFooter(slide);
}

function renderContentSlide(slide: pptxgen.Slide, data: ContentSlide) {
    addContentBackground(slide);

    // Title
    slide.addText(data.title, {
        x: 0.5,
        y: 0.5,
        w: W - 1,
        h: 0.6,
        fontSize: 28,
        fontFace: FONT,
        color: C.navy,
        bold: true,
    });

    // Blue underline
    slide.addShape("rect", {
        x: 0.5,
        y: 1.15,
        w: 1.5,
        h: 0.04,
        fill: { color: C.brandBlue },
    });

    // Body
    if (typeof data.body === "string") {
        slide.addText(data.body, {
            x: 0.5,
            y: 1.4,
            w: W - 1.5,
            h: H - 2.2,
            fontSize: 16,
            fontFace: FONT,
            color: C.gray600,
            valign: "top",
        });
    } else {
        slide.addText("Contenu non exportable.", {
            x: 0.5,
            y: 1.4,
            w: W - 1,
            h: 0.4,
            fontSize: 14,
            fontFace: FONT,
            color: C.gray400,
            italic: true,
        });
    }

    addSpektyFooter(slide);
}

// ─── Main Export Function ──────────────────────────────────────────

export async function exportPresentationToPPTX(
    slides: SlideData[],
    onProgress?: (percent: number) => void
): Promise<void> {
    if (!slides || slides.length === 0) {
        throw new Error("No slides provided for PPTX export");
    }

    console.log(`Creating PPTX with ${slides.length} slides...`);

    const pres = new pptxgen();
    pres.layout = "LAYOUT_16x9";
    pres.title = "Présentation Spekty";
    pres.company = "Spekty";
    pres.author = "Spekty";

    for (let i = 0; i < slides.length; i++) {
        const pptxSlide = pres.addSlide();
        const slideData = slides[i];

        console.log(
            `Rendering slide ${i + 1}/${slides.length} (${slideData.type})...`
        );

        switch (slideData.type) {
            case "title":
                renderTitleSlide(pptxSlide, slideData);
                break;
            case "summary":
                renderSummarySlide(pptxSlide, slideData);
                break;
            case "section":
                renderSectionSlide(pptxSlide, slideData);
                break;
            case "content":
                renderContentSlide(pptxSlide, slideData);
                break;
            case "palette":
                renderPaletteSlide(pptxSlide, slideData);
                break;
            case "scenario-split":
                renderScenarioSplitSlide(pptxSlide, slideData);
                break;
            case "email-mockup":
                renderEmailMockupSlide(pptxSlide, slideData);
                break;
            case "screenshot":
                await renderScreenshotSlide(pptxSlide, slideData);
                break;
            default:
                pptxSlide.background = { color: C.white };
                pptxSlide.addText("Slide type non supporté", {
                    x: 0,
                    y: H / 2 - 0.3,
                    w: W,
                    h: 0.6,
                    fontSize: 16,
                    fontFace: FONT,
                    color: C.gray500,
                    italic: true,
                    align: "center",
                });
        }

        // Page number (except title and email-mockup)
        if (slideData.type !== "title" && slideData.type !== "email-mockup") {
            addPageNumber(pptxSlide, i);
        }

        onProgress?.(Math.round(((i + 1) / slides.length) * 100));
        console.log(`✓ Slide ${i + 1} rendered`);
    }

    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `Spekty_Presentation_${timestamp}.pptx`;

    console.log(`Saving PPTX as: ${filename}`);
    await pres.writeFile({ fileName: filename });
    console.log("✓ PPTX saved successfully!");
}
