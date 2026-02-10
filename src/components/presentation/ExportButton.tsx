import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { exportPresentationToPPTX } from '../../utils/pptxExport';
import type { SlideData } from '../../types/presentation';
import { exportPresentationToPDF } from '../../utils/pdfExport';

interface Props {
    slides: SlideData[];
}

export const ExportButton: React.FC<Props> = ({ slides }) => {
    const [isExporting, setIsExporting] = useState<'pdf' | 'pptx' | false>(false);
    const [progress, setProgress] = useState(0);

    const handleExport = async (format: 'pdf' | 'pptx') => {
        setIsExporting(format);
        setProgress(0);
        try {
            if (format === 'pdf') {
                await exportPresentationToPDF(slides, (p) => setProgress(p));
            } else {
                await exportPresentationToPPTX(slides, (p) => setProgress(p));
            }
        } catch (error) {
            console.error(`${format.toUpperCase()} Export failed:`, error);
            alert(`Export failed: ${(error as Error).message}`);
        } finally {
            setIsExporting(false);
            setProgress(0);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            <button
                onClick={() => handleExport('pdf')}
                disabled={!!isExporting}
                className={`${isExporting ? 'bg-gray-400 cursor-wait' : 'bg-red-600 hover:bg-red-700'} text-white p-3 rounded-full shadow-lg transition-colors duration-200 flex items-center gap-2 group`}
                title="Download as PDF"
            >
                {isExporting === 'pdf' ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                <span className="w-0 overflow-hidden group-hover:w-auto group-hover:pl-1 transition-all duration-300 whitespace-nowrap">
                    {isExporting === 'pdf' ? `PDF ${progress}%` : 'Export PDF'}
                </span>
            </button>
            <button
                onClick={() => handleExport('pptx')}
                disabled={!!isExporting}
                className={`${isExporting ? 'bg-gray-400 cursor-wait' : 'bg-spekty-navy hover:bg-spekty-royal-blue'} text-white p-3 rounded-full shadow-lg transition-colors duration-200 flex items-center gap-2 group`}
                title="Download as PPTX"
            >
                {isExporting === 'pptx' ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                <span className="w-0 overflow-hidden group-hover:w-auto group-hover:pl-1 transition-all duration-300 whitespace-nowrap">
                    {isExporting === 'pptx' ? `PPTX ${progress}%` : 'Export PPTX'}
                </span>
            </button>
        </div>
    );
};
