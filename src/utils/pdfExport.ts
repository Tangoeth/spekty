import { jsPDF } from "jspdf";
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

// ─── Page dimensions (A4 landscape) ────────────────────────────────
const PAGE_W = 297; // mm
const PAGE_H = 210; // mm

// ─── Colors (matching index.css @theme) ────────────────────────────
const C = {
    navy: "#062259",
    royalBlue: "#0F56E3",
    brandBlue: "#019EF7",
    dark: "#14204b",
    green: "#A9D18E",
    orange: "#E46138",
    yellow: "#FDCE6F",
    white: "#FFFFFF",
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",
    black: "#000000",
    greenLight: "#F0FDF4",
    green500: "#22C55E",
    green800: "#166534",
    orangeLight: "#FFF7ED",
    yellowLight: "#FEF9C3",
};

// ─── Font sizes (pt) ───────────────────────────────────────────────
const F = {
    heroTitle: 48,
    slideTitle: 28,
    subtitle: 20,
    heading: 24,
    body: 14,
    bodyLarge: 16,
    small: 11,
    tiny: 9,
    numberXL: 36,
    numberHero: 56,
};

// ─── Helpers ───────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace("#", "");
    return [
        parseInt(h.substring(0, 2), 16),
        parseInt(h.substring(2, 4), 16),
        parseInt(h.substring(4, 6), 16),
    ];
}

function setFill(doc: jsPDF, hex: string) {
    const [r, g, b] = hexToRgb(hex);
    doc.setFillColor(r, g, b);
}

function setTextCol(doc: jsPDF, hex: string) {
    const [r, g, b] = hexToRgb(hex);
    doc.setTextColor(r, g, b);
}

function setDraw(doc: jsPDF, hex: string) {
    const [r, g, b] = hexToRgb(hex);
    doc.setDrawColor(r, g, b);
}

/** Draw Spekty. footer in bottom-right */
function drawSpektyFooter(doc: jsPDF) {
    const x = PAGE_W - 12;
    const y = PAGE_H - 8;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(F.body);
    setTextCol(doc, C.navy);
    doc.text("Spekty", x, y, { align: "right" });
    const w = doc.getTextWidth("Spekty");
    setTextCol(doc, C.brandBlue);
    doc.text(".", x - w + doc.getTextWidth("Spekty."), y);
}

/** Draw page number in top-right */
function drawPageNumber(doc: jsPDF, index: number) {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(F.body);
    setTextCol(doc, C.navy);
    doc.text(String(index + 1), PAGE_W - 10, 10);
}

/** White background with subtle decorative blobs */
function drawContentBackground(doc: jsPDF) {
    // White base
    setFill(doc, C.white);
    doc.rect(0, 0, PAGE_W, PAGE_H, "F");

    // Subtle blue circles at very low opacity
    const gState = doc.GState({ opacity: 0.04 });
    doc.setGState(gState);
    setFill(doc, C.brandBlue);
    doc.circle(-20, -15, 80, "F");
    doc.circle(PAGE_W + 20, PAGE_H * 0.4, 100, "F");

    // Reset opacity
    doc.setGState(doc.GState({ opacity: 1 }));
}

/** Load an image as base64 data URL */
async function loadImageAsBase64(src: string): Promise<string> {
    const response = await fetch(src);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/** Wrapped text helper — returns array of lines */
function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
    return doc.splitTextToSize(text, maxWidth) as string[];
}

/** Draw text centered horizontally on page */
function drawCenteredText(
    doc: jsPDF,
    text: string,
    y: number,
    fontSize: number,
    color: string,
    style: string = "bold"
) {
    doc.setFont("Helvetica", style);
    doc.setFontSize(fontSize);
    setTextCol(doc, color);
    doc.text(text, PAGE_W / 2, y, { align: "center" });
}

// ─── Slide Renderers ───────────────────────────────────────────────

function renderTitleSlide(doc: jsPDF, slide: TitleSlide) {
    // Gradient background approximation using 3 vertical bands blended diagonally
    const steps = 40;
    const bandW = PAGE_W / steps;
    const bandH = PAGE_H / steps;
    const r1 = hexToRgb(C.navy),
        r2 = hexToRgb(C.royalBlue),
        r3 = hexToRgb(C.brandBlue);

    for (let i = 0; i < steps; i++) {
        const t = i / (steps - 1);
        let r: number, g: number, b: number;
        if (t < 0.5) {
            const lt = t * 2;
            r = Math.round(r1[0] + (r2[0] - r1[0]) * lt);
            g = Math.round(r1[1] + (r2[1] - r1[1]) * lt);
            b = Math.round(r1[2] + (r2[2] - r1[2]) * lt);
        } else {
            const lt = (t - 0.5) * 2;
            r = Math.round(r2[0] + (r3[0] - r2[0]) * lt);
            g = Math.round(r2[1] + (r3[1] - r2[1]) * lt);
            b = Math.round(r2[2] + (r3[2] - r2[2]) * lt);
        }
        doc.setFillColor(r, g, b);
        // Diagonal: draw strips from top-left to bottom-right
        doc.rect(i * bandW - 2, i * bandH - 2, PAGE_W - i * bandW + 4, PAGE_H - i * bandH + 4, "F");
    }

    // Semi-transparent dark overlay for wave effect (approximation)
    const waveState = doc.GState({ opacity: 0.15 });
    doc.setGState(waveState);
    setFill(doc, C.black);
    doc.triangle(0, 0, PAGE_W * 0.6, 0, 0, PAGE_H * 0.7, "F");
    doc.setGState(doc.GState({ opacity: 1 }));

    // Light curve bottom-right approximation
    const curveState = doc.GState({ opacity: 0.08 });
    doc.setGState(curveState);
    setFill(doc, C.white);
    doc.ellipse(PAGE_W, PAGE_H, PAGE_W * 0.4, PAGE_H * 0.5, "F");
    doc.setGState(doc.GState({ opacity: 1 }));

    // Date — top left
    if (slide.date) {
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.small);
        setTextCol(doc, C.white);
        doc.text(`Date : ${slide.date}`, 25, 25);
    }

    // "Spekty." hero
    const heroY = PAGE_H * 0.42;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(F.heroTitle);
    setTextCol(doc, C.white);
    doc.text("Spekty", 25, heroY);
    const spektyW = doc.getTextWidth("Spekty");
    setTextCol(doc, C.brandBlue);
    doc.text(".", 25 + spektyW, heroY);

    // Title
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(F.slideTitle);
    setTextCol(doc, C.white);
    const titleLines = wrapText(doc, slide.title, PAGE_W * 0.6);
    doc.text(titleLines, 25, heroY + 15);

    // Subtitle
    if (slide.subtitle) {
        const subtitleState = doc.GState({ opacity: 0.8 });
        doc.setGState(subtitleState);
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.subtitle);
        setTextCol(doc, C.white);
        doc.text(slide.subtitle, 25, heroY + 15 + titleLines.length * 10 + 5);
        doc.setGState(doc.GState({ opacity: 1 }));
    }

    // Footer
    const footerY = PAGE_H - 15;
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(F.small);
    setTextCol(doc, C.white);
    const footerPart1 = "La confiance au service ";
    const footerPart2 = "d'une société engagée";
    const fp1w = doc.getTextWidth(footerPart1);
    const fp2w = doc.getTextWidth(footerPart2);
    const totalW = fp1w + fp2w;
    const startX = (PAGE_W - totalW) / 2;
    doc.text(footerPart1, startX, footerY);
    setTextCol(doc, C.brandBlue);
    doc.text(footerPart2, startX + fp1w, footerY);
}

function renderSummarySlide(doc: jsPDF, slide: SummarySlide) {
    drawContentBackground(doc);

    // Title "SOMMAIRE"
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(F.slideTitle);
    setTextCol(doc, C.navy);
    doc.text(slide.title.toUpperCase(), 20, 25);

    // Items
    const itemCount = slide.items.length;
    const startY = 55;
    const itemSpacing = (PAGE_H - startY - 30) / Math.max(itemCount, 1);
    const numberX = 55;
    const dividerX = 65;
    const textX = 72;

    slide.items.forEach((item, i) => {
        const y = startY + i * itemSpacing;

        // Number
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.numberXL);
        setTextCol(doc, C.royalBlue);
        doc.text(item.number, numberX, y + 5, { align: "right" });

        // Vertical divider
        const divState = doc.GState({ opacity: 0.3 });
        doc.setGState(divState);
        setDraw(doc, C.royalBlue);
        doc.setLineWidth(0.5);
        doc.line(dividerX, y - 8, dividerX, y + 10);
        doc.setGState(doc.GState({ opacity: 1 }));

        // Text
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.bodyLarge);
        setTextCol(doc, C.gray400);
        doc.text(item.text.toUpperCase(), textX, y + 2);
    });

    drawSpektyFooter(doc);
}

function renderSectionSlide(doc: jsPDF, slide: SectionSlide) {
    drawContentBackground(doc);

    // Circle
    const cx = 80;
    const cy = PAGE_H / 2;
    const radius = 38;

    // White filled circle
    setFill(doc, C.white);
    doc.circle(cx, cy, radius, "F");

    // Circle border (brand-blue)
    setDraw(doc, C.brandBlue);
    doc.setLineWidth(4);
    doc.circle(cx, cy, radius, "S");

    // Number inside circle
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(F.numberHero);
    setTextCol(doc, C.black);
    doc.text(slide.number, cx, cy + 5, { align: "center" });

    // Title to the right
    const titleX = cx + radius + 20;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(F.heading);
    setTextCol(doc, C.black);
    const titleLines = wrapText(doc, slide.title, PAGE_W - titleX - 20);
    doc.text(titleLines, titleX, cy - 10);

    // Tri-color lines
    const lineY = cy + titleLines.length * 8 + 2;
    const lineMaxW = PAGE_W - titleX - 30;

    setFill(doc, C.brandBlue);
    doc.rect(titleX, lineY, lineMaxW, 2, "F");

    setFill(doc, C.royalBlue);
    doc.rect(titleX, lineY + 4, lineMaxW * 0.75, 1.2, "F");

    setFill(doc, C.navy);
    doc.rect(titleX, lineY + 7, lineMaxW * 0.5, 0.8, "F");

    drawSpektyFooter(doc);
}

function renderScenarioSplitSlide(doc: jsPDF, slide: ScenarioSplitSlide) {
    drawContentBackground(doc);

    // Title
    drawCenteredText(doc, slide.title, 18, F.subtitle, C.navy, "bold");

    // Card dimensions
    const gap = 8;
    const cardW = (PAGE_W - 30 - gap) / 2;
    const cardX1 = 15;
    const cardX2 = cardX1 + cardW + gap;
    const cardY = 28;
    const cardH = PAGE_H - cardY - 15;

    // Draw card function
    const drawCard = (
        x: number,
        accentColor: string,
        iconColor: string,
        title: string,
        items: string[],
        isMultiUser: boolean,
        note?: string
    ) => {
        // Card background
        setFill(doc, C.white);
        setDraw(doc, C.gray200);
        doc.setLineWidth(0.3);
        doc.roundedRect(x, cardY, cardW, cardH, 3, 3, "FD");

        // Top accent border
        setFill(doc, accentColor);
        doc.rect(x, cardY, cardW, 2.5, "F");

        // Icon circle background
        const iconCx = x + cardW / 2;
        const iconCy = cardY + 14;
        setFill(doc, iconColor);
        const iconState = doc.GState({ opacity: 0.15 });
        doc.setGState(iconState);
        doc.circle(iconCx, iconCy, 8, "F");
        doc.setGState(doc.GState({ opacity: 1 }));

        // Draw person icon(s) inside the circle
        setFill(doc, accentColor);
        if (isMultiUser) {
            // Two people: left person
            doc.circle(iconCx - 2.5, iconCy - 2, 1.8, "F"); // head
            doc.roundedRect(iconCx - 4.8, iconCy + 0.5, 4.6, 3, 1, 1, "F"); // body
            // Right person
            doc.circle(iconCx + 2.5, iconCy - 2, 1.8, "F"); // head
            doc.roundedRect(iconCx + 0.2, iconCy + 0.5, 4.6, 3, 1, 1, "F"); // body
        } else {
            // Single person
            doc.circle(iconCx, iconCy - 2, 2.2, "F"); // head
            doc.roundedRect(iconCx - 3, iconCy + 1, 6, 3.5, 1.5, 1.5, "F"); // body
        }

        // Card title
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(F.bodyLarge);
        setTextCol(doc, accentColor);
        doc.text(title, iconCx, iconCy + 15, { align: "center" });

        // Items
        const itemStartY = iconCy + 24;
        const lineH = 10;
        const textMaxW = cardW - 20;

        items.forEach((item, i) => {
            const itemY = itemStartY + i * lineH;

            // Number
            doc.setFont("Helvetica", "bold");
            doc.setFontSize(F.small);
            setTextCol(doc, accentColor);
            doc.text(`${i + 1}.`, x + 8, itemY);

            // Item text (wrap if needed)
            doc.setFont("Helvetica", "normal");
            doc.setFontSize(F.small);
            setTextCol(doc, C.gray700);
            const lines = wrapText(doc, item, textMaxW - 12);
            doc.text(lines, x + 15, itemY);
        });

        // Note
        if (note) {
            const noteY = itemStartY + items.length * lineH + 5;
            doc.setFont("Helvetica", "italic");
            doc.setFontSize(F.tiny);
            setTextCol(doc, C.gray500);
            const noteLines = wrapText(doc, note, cardW - 16);
            doc.text(noteLines, x + 8, noteY);
        }
    };

    drawCard(
        cardX1,
        C.brandBlue,
        C.brandBlue,
        slide.scenario1.title,
        slide.scenario1.items,
        true, // multi-user icon
        slide.scenario1.note
    );

    drawCard(
        cardX2,
        C.green,
        C.green,
        slide.scenario2.title,
        slide.scenario2.items,
        false, // single-user icon
        slide.scenario2.note
    );
}

function renderEmailMockupSlide(doc: jsPDF, slide: EmailMockupSlide) {
    // Gray background
    setFill(doc, C.gray100);
    doc.rect(0, 0, PAGE_W, PAGE_H, "F");

    // Email container
    const emailW = 200;
    const emailH = 170;
    const emailX = (PAGE_W - emailW) / 2;
    const emailY = (PAGE_H - emailH) / 2 - 5;

    setFill(doc, C.white);
    setDraw(doc, C.gray200);
    doc.setLineWidth(0.3);
    doc.roundedRect(emailX, emailY, emailW, emailH, 2, 2, "FD");

    // ─ Email Header ─
    const headerH = 30;
    setFill(doc, C.gray50);
    doc.rect(emailX, emailY, emailW, headerH, "F");
    // Separator line
    setDraw(doc, C.gray200);
    doc.setLineWidth(0.2);
    doc.line(emailX, emailY + headerH, emailX + emailW, emailY + headerH);

    // Avatar
    const avatarR = 4;
    const avatarCx = emailX + 10 + avatarR;
    const avatarCy = emailY + 9 + avatarR;
    setFill(doc, C.navy);
    doc.circle(avatarCx, avatarCy, avatarR, "F");
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(F.small);
    setTextCol(doc, C.white);
    doc.text("S", avatarCx, avatarCy + 1.5, { align: "center" });

    // Sender name
    const senderTextX = avatarCx + avatarR + 5;
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(F.small);
    setTextCol(doc, C.gray900);
    doc.text(slide.sender, senderTextX, avatarCy);

    // "à moi" below sender name
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(F.tiny);
    setTextCol(doc, C.gray500);
    doc.text("à moi", senderTextX, avatarCy + 5);

    // Timestamp — aligned with sender name
    doc.setFontSize(F.tiny);
    setTextCol(doc, C.gray400);
    doc.text("il y a 2 minutes", emailX + emailW - 10, avatarCy, {
        align: "right",
    });

    // Subject — on its own line below sender block
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(F.body);
    setTextCol(doc, C.gray800);
    doc.text(`Objet : ${slide.subject}`, emailX + 10, emailY + headerH - 4);

    // ─ Email Body ─
    const bodyX = emailX + 12;
    const bodyMaxW = emailW - 24;
    let cursorY = emailY + headerH + 10;

    // Logo "Spekty."
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(F.heading);
    setTextCol(doc, C.navy);
    const logoText = "Spekty";
    const logoW = doc.getTextWidth(logoText);
    const logoCx = emailX + emailW / 2 - logoW / 2;
    doc.text(logoText, logoCx, cursorY);
    setTextCol(doc, C.brandBlue);
    doc.text(".", logoCx + logoW, cursorY);
    cursorY += 10;

    if (slide.variant === "confirmation") {
        // Greeting
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.small);
        setTextCol(doc, C.gray800);
        doc.text("Bonjour Cyril DEUX", bodyX, cursorY);
        cursorY += 8;

        // Green confirmation banner
        setFill(doc, C.greenLight);
        doc.rect(bodyX, cursorY - 3, bodyMaxW, 10, "F");
        setFill(doc, C.green500);
        doc.rect(bodyX, cursorY - 3, 1.2, 10, "F");
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(F.small);
        setTextCol(doc, C.green800);
        doc.text("Votre rendez-vous est confirmé !", bodyX + 5, cursorY + 3);
        cursorY += 14;

        // Confirmation text
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.tiny);
        setTextCol(doc, C.gray800);
        const confText = wrapText(
            doc,
            "Nous vous confirmons le passage de notre technicien·ne pour le contrôle de vos travaux d'isolation.",
            bodyMaxW
        );
        doc.text(confText, bodyX, cursorY);
        cursorY += confText.length * 4 + 5;

        // Date/time box
        setFill(doc, C.gray50);
        setDraw(doc, C.gray200);
        doc.setLineWidth(0.2);
        doc.roundedRect(bodyX, cursorY, bodyMaxW, 22, 1, 1, "FD");

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(7);
        setTextCol(doc, C.gray500);
        doc.text("DATE ET HEURE", bodyX + 5, cursorY + 5);

        doc.setFontSize(F.body);
        setTextCol(doc, C.navy);
        doc.text("Samedi 31 Janvier 2026", bodyX + 5, cursorY + 12);

        doc.setFontSize(F.small);
        setTextCol(doc, C.brandBlue);
        doc.text("Entre 08:00 et 08:30", bodyX + 5, cursorY + 18);
        cursorY += 28;

        // Reminder
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.tiny);
        setTextCol(doc, C.gray800);
        doc.text(
            "Un SMS de rappel vous sera envoyé 24h avant le rendez-vous.",
            bodyX,
            cursorY
        );
        cursorY += 10;

        // Legal footer
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(7);
        setTextCol(doc, C.gray600);
        const legalLines = wrapText(
            doc,
            "La demande de contrôle émane de la société SIPLEC TEST | Primes Energie E.Leclerc.",
            bodyMaxW
        );
        doc.text(legalLines, bodyX, cursorY);
    } else {
        // ─ Notification variant ─
        // Greeting
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.small);
        setTextCol(doc, C.gray800);
        doc.text("Bonjour Cyril DEUX", bodyX, cursorY);
        cursorY += 7;

        // Intro paragraph
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.tiny);
        setTextCol(doc, C.gray800);
        const introText = wrapText(
            doc,
            "Nous vous informons que BLE TEST, notre technicien·ne SPEKTY, prendra contact avec vous dans les jours à venir pour effectuer un contrôle obligatoire des travaux d'isolation réalisés à l'adresse suivante :",
            bodyMaxW
        );
        doc.text(introText, bodyX, cursorY);
        cursorY += introText.length * 4 + 4;

        // Address
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(F.tiny);
        setTextCol(doc, C.gray800);
        doc.text("3 avenue de chevreul, 92400 COURBEVOIE", bodyX, cursorY);
        cursorY += 7;

        // Phone
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.tiny);
        doc.text(
            "Pour prendre rendez-vous, nous vous joindrons au(x) numéro(s) suivant(s) :",
            bodyX,
            cursorY
        );
        cursorY += 5;
        doc.setFont("Helvetica", "bold");
        doc.text("0613339524", bodyX, cursorY);
        cursorY += 7;

        // Orange info banner
        setFill(doc, C.orangeLight);
        doc.rect(bodyX, cursorY - 3, bodyMaxW, 14, "F");
        setFill(doc, C.yellow);
        doc.rect(bodyX, cursorY - 3, 1.2, 14, "F");
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.tiny);
        setTextCol(doc, C.gray800);
        const bannerLines = wrapText(
            doc,
            "Il n'est pas nécessaire de nous contacter pour convenir d'un rendez-vous : vous pourrez directement partager vos disponibilités avec notre technicien·ne lors de son appel.",
            bodyMaxW - 8
        );
        doc.text(bannerLines, bodyX + 4, cursorY + 2);
        cursorY += 18;

        // Scheduling text
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.tiny);
        setTextCol(doc, C.gray800);
        const schedText = wrapText(
            doc,
            "Vous pouvez dès à présent planifier la mission vous-même en fonction de vos disponibilités :",
            bodyMaxW
        );
        doc.text(schedText, bodyX, cursorY);
        cursorY += schedText.length * 4 + 5;

        // "Je planifie" button
        const btnW = 50;
        const btnH = 10;
        const btnX = emailX + emailW / 2 - btnW / 2;
        setFill(doc, C.navy);
        doc.roundedRect(btnX, cursorY, btnW, btnH, 1, 1, "F");
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(F.small);
        setTextCol(doc, C.white);
        doc.text(slide.buttonText, emailX + emailW / 2, cursorY + btnH / 2 + 1.5, {
            align: "center",
        });
        cursorY += btnH + 8;

        // Legal footer
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(7);
        setTextCol(doc, C.gray600);
        const legalText = wrapText(
            doc,
            "La demande de contrôle émane de la société SIPLEC TEST | Primes Energie E.Leclerc, qui finance une partie de ces travaux grâce au dispositif CEE (certificats d'économies d'énergies), et qui prend également intégralement en charge le coût de ce contrôle.",
            bodyMaxW
        );
        doc.text(legalText, bodyX, cursorY);
        cursorY += legalText.length * 3 + 4;

        // Green footer
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(F.tiny);
        setTextCol(doc, C.green);
        doc.text(
            "La visite dure environ 30 minutes et est totalement gratuite pour vous.",
            emailX + emailW / 2,
            cursorY,
            { align: "center" }
        );
    }

    // Context note
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(F.tiny);
    setTextCol(doc, C.gray500);
    doc.text(
        '* Cliquez sur le bouton "Je planifie" pour continuer la démonstration',
        PAGE_W / 2,
        PAGE_H - 6,
        { align: "center" }
    );
}

async function renderScreenshotSlide(doc: jsPDF, slide: ScreenshotSlide) {
    drawContentBackground(doc);

    // Title
    drawCenteredText(doc, slide.title, 15, F.slideTitle, C.navy, "bold");

    const contentTop = 25;
    const contentH = PAGE_H - contentTop - 25;
    const contentW = PAGE_W - 20;
    const contentX = 10;

    // Load images
    let img1Data: string | null = null;
    let img2Data: string | null = null;

    try {
        img1Data = await loadImageAsBase64(slide.imageSrc);
    } catch {
        console.warn("Failed to load primary image:", slide.imageSrc);
    }

    if (slide.secondaryImageSrc) {
        try {
            img2Data = await loadImageAsBase64(slide.secondaryImageSrc);
        } catch {
            console.warn("Failed to load secondary image:", slide.secondaryImageSrc);
        }
    }

    if (img1Data && !img2Data && !slide.secondaryImageSrc) {
        // Single image — centered
        const imgProps = doc.getImageProperties(img1Data);
        const imgRatio = imgProps.width / imgProps.height;
        let imgW = contentW * 0.85;
        let imgH = imgW / imgRatio;
        if (imgH > contentH) {
            imgH = contentH;
            imgW = imgH * imgRatio;
        }
        const imgX = contentX + (contentW - imgW) / 2;
        const imgY = contentTop + (contentH - imgH) / 2;
        doc.addImage(img1Data, "PNG", imgX, imgY, imgW, imgH);

        // Caption
        if (slide.caption) {
            doc.setFont("Helvetica", "normal");
            doc.setFontSize(F.small);
            setTextCol(doc, C.navy);
            const captionLines = wrapText(doc, slide.caption, contentW * 0.8);
            doc.text(captionLines, PAGE_W / 2, imgY + imgH + 6, {
                align: "center",
            });
        }
    } else if (img1Data || img2Data) {
        // Dual image layout
        const isColumn = slide.layout === "column";
        const ratio1 = slide.imageFlexRatio ?? 1;
        const ratio2 = 1;
        const totalRatio = ratio1 + ratio2;

        if (isColumn) {
            // Stacked vertically
            const captionSpace = 8;
            const gapH = 4;
            const availH = contentH - gapH - (slide.secondaryCaption ? captionSpace * 2 : captionSpace);

            const h1 = (availH * ratio1) / totalRatio;
            const h2 = (availH * ratio2) / totalRatio;

            if (img1Data) {
                const props1 = doc.getImageProperties(img1Data);
                const r1 = props1.width / props1.height;
                let w1 = Math.min(contentW * 0.9, h1 * r1);
                let ah1 = w1 / r1;
                if (ah1 > h1) { ah1 = h1; w1 = ah1 * r1; }
                const x1 = contentX + (contentW - w1) / 2;
                doc.addImage(img1Data, "PNG", x1, contentTop, w1, ah1);

                if (slide.secondaryCaption && slide.caption) {
                    doc.setFont("Helvetica", "normal");
                    doc.setFontSize(F.tiny);
                    setTextCol(doc, C.navy);
                    doc.text(slide.caption, PAGE_W / 2, contentTop + ah1 + 4, { align: "center" });
                }
            }

            if (img2Data) {
                const props2 = doc.getImageProperties(img2Data);
                const r2 = props2.width / props2.height;
                const y2start = contentTop + h1 + gapH + (slide.secondaryCaption && slide.caption ? captionSpace : 0);
                let w2 = Math.min(contentW * 0.9, h2 * r2);
                let ah2 = w2 / r2;
                if (ah2 > h2) { ah2 = h2; w2 = ah2 * r2; }
                const x2 = contentX + (contentW - w2) / 2;
                doc.addImage(img2Data, "PNG", x2, y2start, w2, ah2);

                if (slide.secondaryCaption) {
                    doc.setFont("Helvetica", "normal");
                    doc.setFontSize(F.tiny);
                    setTextCol(doc, C.gray600);
                    doc.text(slide.secondaryCaption, PAGE_W / 2, y2start + ah2 + 4, { align: "center" });
                }
            }
        } else {
            // Side by side (row) — default
            const gapW = 4;
            const captionSpace = slide.secondaryCaption || slide.caption ? 10 : 0;
            const availH = contentH - captionSpace;
            const w1area = ((contentW - gapW) * ratio1) / totalRatio;
            const w2area = ((contentW - gapW) * ratio2) / totalRatio;

            if (img1Data) {
                const props1 = doc.getImageProperties(img1Data);
                const r1 = props1.width / props1.height;
                let iw1 = w1area;
                let ih1 = iw1 / r1;
                if (ih1 > availH) { ih1 = availH; iw1 = ih1 * r1; }
                const ix1 = contentX + (w1area - iw1) / 2;
                const iy1 = contentTop + (availH - ih1) / 2;
                doc.addImage(img1Data, "PNG", ix1, iy1, iw1, ih1);

                if (slide.secondaryCaption && slide.caption) {
                    doc.setFont("Helvetica", "normal");
                    doc.setFontSize(F.tiny);
                    setTextCol(doc, C.navy);
                    doc.text(slide.caption, contentX + w1area / 2, contentTop + availH + 5, { align: "center" });
                }
            }

            if (img2Data) {
                const props2 = doc.getImageProperties(img2Data);
                const r2 = props2.width / props2.height;
                const x2start = contentX + w1area + gapW;
                let iw2 = w2area;
                let ih2 = iw2 / r2;
                if (ih2 > availH) { ih2 = availH; iw2 = ih2 * r2; }
                const ix2 = x2start + (w2area - iw2) / 2;
                const iy2 = contentTop + (availH - ih2) / 2;
                doc.addImage(img2Data, "PNG", ix2, iy2, iw2, ih2);

                if (slide.secondaryCaption) {
                    doc.setFont("Helvetica", "normal");
                    doc.setFontSize(F.tiny);
                    setTextCol(doc, C.gray600);
                    doc.text(slide.secondaryCaption, x2start + w2area / 2, contentTop + availH + 5, { align: "center" });
                }
            }

            // Shared caption (only if no secondaryCaption)
            if (slide.caption && !slide.secondaryCaption) {
                doc.setFont("Helvetica", "normal");
                doc.setFontSize(F.small);
                setTextCol(doc, C.navy);
                const captionLines = wrapText(doc, slide.caption, contentW * 0.8);
                doc.text(captionLines, PAGE_W / 2, contentTop + availH + 6, { align: "center" });
            }
        }
    } else {
        // No images loaded — placeholder
        setFill(doc, C.gray100);
        doc.roundedRect(contentX + 20, contentTop + 20, contentW - 40, contentH - 40, 3, 3, "F");
        drawCenteredText(doc, "Image non disponible", PAGE_H / 2, F.body, C.gray500, "italic");
    }
}

function renderPaletteSlide(doc: jsPDF, slide: PaletteSlide) {
    drawContentBackground(doc);

    // Title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(F.slideTitle);
    setTextCol(doc, C.navy);
    doc.text(slide.title, 20, 25);

    // Color palette grid
    const paletteColors = [
        { name: "Blue", hex: "#019EF7" },
        { name: "Royal", hex: "#0F56E3" },
        { name: "Navy", hex: "#062259" },
        { name: "Green", hex: "#A9D18E" },
        { name: "Orange", hex: "#E46138" },
        { name: "Yellow", hex: "#FDCE6F" },
        { name: "Gray Light", hex: "#D9D9D9" },
        { name: "Gray Dark", hex: "#7F7F7F" },
        { name: "Black", hex: "#000000" },
    ];

    const cols = 3;
    const rows = 3;
    const gridX = 30;
    const gridY = 40;
    const swatchW = (PAGE_W - 60 - (cols - 1) * 10) / cols;
    const swatchH = (PAGE_H - gridY - 40 - (rows - 1) * 8) / rows;
    const gapX = 10;
    const gapY = 8;

    paletteColors.forEach((color, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = gridX + col * (swatchW + gapX);
        const y = gridY + row * (swatchH + gapY);

        setFill(doc, color.hex);
        doc.roundedRect(x, y, swatchW, swatchH, 1, 1, "F");

        // Hex code text (white)
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(F.body);
        setTextCol(doc, C.white);
        doc.text(color.hex, x + swatchW / 2, y + swatchH / 2 + 2, {
            align: "center",
        });
    });

    drawSpektyFooter(doc);
}

function renderContentSlide(doc: jsPDF, slide: ContentSlide) {
    drawContentBackground(doc);

    // Title with underline
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(F.slideTitle);
    setTextCol(doc, C.navy);
    doc.text(slide.title, 20, 30);

    // Blue underline
    const titleW = doc.getTextWidth(slide.title);
    setFill(doc, C.brandBlue);
    doc.rect(20, 33, titleW * 0.35, 1.2, "F");

    // Body
    if (typeof slide.body === "string") {
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(F.bodyLarge);
        setTextCol(doc, C.gray600);
        const bodyLines = wrapText(doc, slide.body, PAGE_W - 50);
        doc.text(bodyLines, 20, 45);
    } else {
        doc.setFont("Helvetica", "italic");
        doc.setFontSize(F.body);
        setTextCol(doc, C.gray400);
        doc.text("Contenu non exportable en PDF.", 20, 45);
    }

    drawSpektyFooter(doc);
}

// ─── Main Export Function ──────────────────────────────────────────

export async function exportPresentationToPDF(
    slides: SlideData[],
    onProgress?: (percent: number) => void
): Promise<void> {
    if (!slides || slides.length === 0) {
        throw new Error("No slides provided for PDF export");
    }

    console.log(`Creating structured PDF with ${slides.length} slides...`);

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
    });

    for (let i = 0; i < slides.length; i++) {
        if (i > 0) doc.addPage();

        const slide = slides[i];
        console.log(`Rendering slide ${i + 1}/${slides.length} (${slide.type})...`);

        switch (slide.type) {
            case "title":
                renderTitleSlide(doc, slide);
                break;
            case "summary":
                renderSummarySlide(doc, slide);
                break;
            case "section":
                renderSectionSlide(doc, slide);
                break;
            case "content":
                renderContentSlide(doc, slide);
                break;
            case "palette":
                renderPaletteSlide(doc, slide);
                break;
            case "scenario-split":
                renderScenarioSplitSlide(doc, slide);
                break;
            case "email-mockup":
                renderEmailMockupSlide(doc, slide);
                break;
            case "screenshot":
                await renderScreenshotSlide(doc, slide);
                break;
            default:
                drawContentBackground(doc);
                drawCenteredText(doc, "Slide type non supporté", PAGE_H / 2, F.body, C.gray500, "italic");
        }

        // Page number (except title and email-mockup)
        if (slide.type !== "title" && slide.type !== "email-mockup") {
            drawPageNumber(doc, i);
        }

        onProgress?.(Math.round(((i + 1) / slides.length) * 100));
        console.log(`✓ Slide ${i + 1} rendered`);
    }

    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `Spekty_Presentation_${timestamp}.pdf`;

    console.log(`Saving PDF as: ${filename}`);
    doc.save(filename);
    console.log("✓ PDF saved successfully!");
}
