import pptxgen from 'pptxgenjs';
import type { SlideData } from '../types/presentation';

// Colors (matching index.css / tailwind config)
const COLORS = {
    navy: "0A1E4C", // spekty-navy
    royalBlue: "1E40AF", // spekty-royal-blue (approx)
    brandBlue: "3B82F6", // spekty-brand-blue (approx)
    light: "F3F4F6", // gray-100
    white: "FFFFFF",
    dark: "1F2937", // gray-800
    gray: "6B7280", // gray-500
};

export const exportPresentationToPPTX = (slides: SlideData[]) => {
    const pres = new pptxgen();

    // Set Presentation Properties
    pres.layout = "LAYOUT_16x9";
    pres.title = "Presentation Spekty";
    pres.company = "Spekty";
    pres.author = "Spekty";

    // Define Master Slides (Backgrounds)
    pres.defineSlideMaster({
        title: "MASTER_SLIDE",
        background: { color: COLORS.light },
        objects: [
            // Top Right Architecture
            {
                rect: { x: "85%", y: 0, w: "15%", h: "20%", fill: { color: COLORS.navy } },
            },
            // Bottom Left Architecture
            {
                rect: { x: 0, y: "90%", w: "100%", h: "10%", fill: { color: COLORS.white } },
            },
            {
                rect: { x: 0, y: "98%", w: "100%", h: "2%", fill: { color: COLORS.brandBlue } },
            },
            // Logo (Placeholder if image not available, text for now)
            {
                text: { text: "SPEKTY", options: { x: 0.2, y: 0.2, fontSize: 14, fontFace: "Arial", color: COLORS.navy, bold: true } }
            }
        ],
    });

    // Process each slide
    slides.forEach((slide) => {
        const pptxSlide = pres.addSlide();

        switch (slide.type) {
            case "title":
                // Title Slide Layout
                // Background override for title slide usually different, but using white/clean for now
                pptxSlide.background = { color: COLORS.white };

                // Blue geometric shape on right
                pptxSlide.addShape("rect", { x: "60%", y: 0, w: "40%", h: "100%", fill: { color: COLORS.navy } });

                // Title
                pptxSlide.addText(slide.title, {
                    x: 0.5, y: 2.5, w: "50%", h: 2,
                    fontSize: 44, fontFace: "Arial", color: COLORS.navy, bold: true, align: "left"
                });

                // Subtitle
                if (slide.subtitle) {
                    pptxSlide.addText(slide.subtitle, {
                        x: 0.5, y: 4, w: "50%", h: 1,
                        fontSize: 24, fontFace: "Arial", color: COLORS.royalBlue, align: "left"
                    });
                }

                // Date/Footer
                pptxSlide.addText(slide.date, {
                    x: 0.5, y: 6.5, w: "50%", h: 0.5,
                    fontSize: 14, fontFace: "Arial", color: COLORS.gray, align: "left"
                });
                break;

            case "summary":
                // Summary Layout
                pptxSlide.addText(slide.title, {
                    x: 0.5, y: 0.5, w: "90%", h: 1,
                    fontSize: 32, fontFace: "Arial", color: COLORS.navy, bold: true, align: "center"
                });

                slide.items.forEach((item, index) => {
                    const yPos = 2.0 + (index * 1.5);

                    // Number
                    pptxSlide.addText(item.number, {
                        x: 1, y: yPos, w: 1, h: 1,
                        fontSize: 48, fontFace: "Arial", color: COLORS.royalBlue, align: "right", bold: true
                    });
                    // Separator line
                    pptxSlide.addShape("line", {
                        x: 2.2, y: yPos + 0.2, w: 0, h: 0.8,
                        line: { color: COLORS.gray, width: 2 }
                    });

                    // Text
                    pptxSlide.addText(item.text, {
                        x: 2.5, y: yPos + 0.1, w: 7, h: 1,
                        fontSize: 24, fontFace: "Arial", color: COLORS.dark, align: "left", valign: "middle"
                    });
                });
                break;

            case "section":
                pptxSlide.background = { color: COLORS.navy };

                pptxSlide.addText(slide.number, {
                    x: 0, y: 2, w: "100%", h: 1.5,
                    fontSize: 80, fontFace: "Arial", color: COLORS.brandBlue, align: "center", bold: true
                });

                pptxSlide.addText(slide.title, {
                    x: 1, y: 3.5, w: "80%", h: 2,
                    fontSize: 40, fontFace: "Arial", color: COLORS.white, align: "center", bold: true
                });
                break;

            case "content":
                pptxSlide.addText(slide.title, {
                    x: 0.5, y: 0.5, w: "90%", h: 1,
                    fontSize: 32, fontFace: "Arial", color: COLORS.navy, bold: true, align: "left"
                });

                // Handling body if it's string. If ReactNode, we might need to strip tags or handle differently.
                if (typeof slide.body === 'string') {
                    pptxSlide.addText(slide.body, {
                        x: 0.5, y: 1.5, w: "90%", h: 5,
                        fontSize: 18, fontFace: "Arial", color: COLORS.dark, align: "left", valign: "top"
                    });
                } else {
                    // Fallback for ReactNode content (simplified)
                    pptxSlide.addText("Content not fully renderable in export.", {
                        x: 0.5, y: 1.5, w: "90%", h: 1,
                        fontSize: 14, fontFace: "Arial", color: COLORS.gray, align: "left"
                    });
                }
                break;

            case "palette":
                pptxSlide.addText(slide.title, {
                    x: 0.5, y: 0.5, w: "90%", h: 1,
                    fontSize: 32, fontFace: "Arial", color: COLORS.navy, bold: true, align: "center"
                });

                // Color Palette Bubbles (simulation)
                const colors = [
                    { name: 'Navy', hex: COLORS.navy },
                    { name: 'Royal Blue', hex: COLORS.royalBlue },
                    { name: 'Brand Blue', hex: COLORS.brandBlue },
                    { name: 'Gray', hex: COLORS.gray },
                ];

                colors.forEach((c, i) => {
                    pptxSlide.addShape("ellipse", {
                        x: 1.5 + (i * 2.2), y: 3, w: 1.5, h: 1.5,
                        fill: { color: c.hex }
                    });
                    pptxSlide.addText(c.name, {
                        x: 1.5 + (i * 2.2), y: 4.6, w: 1.5, h: 0.5,
                        fontSize: 14, fontFace: "Arial", color: COLORS.dark, align: "center"
                    });
                });
                break;

            case "scenario-split":
                pptxSlide.addText(slide.title, {
                    x: 0.5, y: 0.3, w: "90%", h: 0.8,
                    fontSize: 28, fontFace: "Arial", color: COLORS.navy, bold: true, align: "center"
                });

                // Scenario 1 (Left)
                pptxSlide.addShape("rect", { x: 0.5, y: 1.2, w: 4.5, h: 0.6, fill: { color: COLORS.light } });
                pptxSlide.addText(slide.scenario1.title, {
                    x: 0.5, y: 1.2, w: 4.5, h: 0.6,
                    fontSize: 18, fontFace: "Arial", color: COLORS.navy, bold: true, align: "center"
                });

                slide.scenario1.items.forEach((item, i) => {
                    pptxSlide.addText(`${i + 1}. ${item}`, {
                        x: 0.5, y: 2 + (i * 0.6), w: 4.5, h: 0.5,
                        fontSize: 14, fontFace: "Arial", color: COLORS.dark
                    });
                });

                // Vertical Separator
                pptxSlide.addShape("line", {
                    x: 5, y: 1.5, w: 0, h: 4,
                    line: { color: COLORS.gray, width: 1, dashType: 'dash' }
                });

                // Scenario 2 (Right)
                pptxSlide.addShape("rect", { x: 5.5, y: 1.2, w: 4.5, h: 0.6, fill: { color: COLORS.light } });
                pptxSlide.addText(slide.scenario2.title, {
                    x: 5.5, y: 1.2, w: 4.5, h: 0.6,
                    fontSize: 18, fontFace: "Arial", color: COLORS.navy, bold: true, align: "center"
                });
                slide.scenario2.items.forEach((item, i) => {
                    pptxSlide.addText(`${i + 1}. ${item}`, {
                        x: 5.5, y: 2 + (i * 0.6), w: 4.5, h: 0.5,
                        fontSize: 14, fontFace: "Arial", color: COLORS.dark
                    });
                });
                break;

            case "email-mockup":
                pptxSlide.addText("Simulation Email", {
                    x: 0.5, y: 0.3, w: "90%", h: 0.5,
                    fontSize: 24, fontFace: "Arial", color: COLORS.gray, align: "left"
                });

                // Mockup Container
                pptxSlide.addShape("rect", { x: 2, y: 1.5, w: 6, h: 4, fill: { color: COLORS.white }, line: { color: COLORS.gray } });

                // Header
                pptxSlide.addShape("rect", { x: 2, y: 1.5, w: 6, h: 0.8, fill: { color: COLORS.light } });
                pptxSlide.addText(`De: ${slide.sender}`, { x: 2.2, y: 1.6, w: 5, h: 0.3, fontSize: 12, color: COLORS.dark });
                pptxSlide.addText(`Objet: ${slide.subject}`, { x: 2.2, y: 1.9, w: 5, h: 0.3, fontSize: 12, color: COLORS.dark, bold: true });

                // Button Placeholder
                pptxSlide.addShape("roundRect", { x: 3.5, y: 4, w: 3, h: 0.6, fill: { color: COLORS.brandBlue } });
                pptxSlide.addText(slide.buttonText, { x: 3.5, y: 4, w: 3, h: 0.6, fontSize: 14, color: COLORS.white, align: "center" });
                break;

            case "screenshot":
                pptxSlide.addText(slide.title, {
                    x: 0.5, y: 0.2, w: "90%", h: 0.8,
                    fontSize: 28, fontFace: "Arial", color: COLORS.navy, bold: true, align: "center"
                });

                if (slide.secondaryImageSrc) {
                    // Dual Image
                    pptxSlide.addImage({ path: slide.imageSrc, x: 0.5, y: 1.2, w: 4.2, h: 3.5, sizing: { type: "contain", w: 4.2, h: 3.5 } });
                    pptxSlide.addImage({ path: slide.secondaryImageSrc, x: 5.1, y: 1.2, w: 4.2, h: 3.5, sizing: { type: "contain", w: 4.2, h: 3.5 } });

                    if (slide.caption) {
                        pptxSlide.addText(slide.caption, { x: 0.5, y: 4.8, w: 4.2, h: 0.5, fontSize: 12, align: "center", color: COLORS.gray });
                    }
                    if (slide.secondaryCaption) {
                        pptxSlide.addText(slide.secondaryCaption, { x: 5.1, y: 4.8, w: 4.2, h: 0.5, fontSize: 12, align: "center", color: COLORS.gray });
                    }

                } else {
                    // Single Image
                    pptxSlide.addImage({ path: slide.imageSrc, x: 1, y: 1.2, w: 8, h: 4, sizing: { type: "contain", w: 8, h: 4 } });
                    if (slide.caption) {
                        pptxSlide.addText(slide.caption, { x: 2, y: 5.3, w: 6, h: 0.5, fontSize: 14, align: "center", color: COLORS.gray, fill: { color: COLORS.white } });
                    }
                }
                break;
        }
    });

    pres.writeFile({ fileName: "Spekty_Presentation.pptx" });
};
