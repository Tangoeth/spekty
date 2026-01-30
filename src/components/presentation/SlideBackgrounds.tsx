

export const TitleBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-spekty-brand-blue">
            {/* Gradient mesh or solid base */}
            <div className="absolute inset-0 bg-gradient-to-br from-spekty-navy via-spekty-royal-blue to-spekty-brand-blue" />

            {/* Left Dark Wave */}
            <svg className="absolute top-0 left-0 h-full w-2/3 opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 H 60 C 40 40, 80 60, 0 100 V 0 Z" fill="#000" />
            </svg>

            {/* Right Bottom Light Curve */}
            <svg className="absolute bottom-0 right-0 h-3/4 w-1/2 opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M50 100 C 60 40, 100 0, 100 0 V 100 H 50 Z" fill="#fff" />
            </svg>
        </div>
    );
};

export const ContentBackground: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-white">
            {/* Top Left Blob */}
            <svg className="absolute -top-[20%] -left-[10%] w-[40%] h-[60%] text-spekty-blue/5" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="50" />
            </svg>

            {/* Bottom Right Blob */}
            <svg className="absolute top-[30%] -right-[10%] w-[60%] h-[90%] text-spekty-blue/5" viewBox="0 0 200 200" fill="currentColor">
                <path d="M40,-65C52,-55,62,-43,70,-29C78,-15,84,1,81,16C78,32,66,46,53,58C40,70,25,80,9,81C-7,83,-25,75,-41,64C-57,54,-72,40,-78,24C-84,7,-81,-12,-73,-28C-65,-43,-52,-56,-38,-65C-24,-74,-9,-80,4,-83C17,-86,33,-87,40,-65Z" transform="translate(100 100) scale(1.1)" />
            </svg>
        </div>
    );
};
