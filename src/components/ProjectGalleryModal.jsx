import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectGalleryModal = ({ isOpen, onClose, project }) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);

    // Assegura que a imagem inicial sempre é 0 quando abre o modal
    React.useEffect(() => {
        if (isOpen) {
            setCurrentSlide(0);
        }
    }, [isOpen]);

    if (!isOpen || !project || !project.galleryImages || project.galleryImages.length === 0) {
        return null;
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % project.galleryImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + project.galleryImages.length) % project.galleryImages.length);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                className="bg-gray-800 rounded-xl max-w-5xl w-full max-h-full overflow-hidden shadow-2xl relative transform transition-all duration-300 scale-100 opacity-100"
                onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar no modal
            >
                {/* Botão de Fechar (Close Button) */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Conteúdo do Carrossel (Carousel Content) */}
                <div className="relative flex items-center justify-center p-6 sm:p-10 w-full">
                    {/* Imagem */}
                    <img
                        src={project.galleryImages[currentSlide].image}
                        alt={project.galleryImages[currentSlide].caption || 'Project Screenshot'}
                        className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
                    />

                    {/* Controles de Navegação (Navigation Controls) */}
                    {project.galleryImages.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 sm:left-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10 -ml-1 sm:ml-0"
                                aria-label="Anterior"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 sm:right-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10 -mr-1 sm:mr-0"
                                aria-label="Próximo"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}
                </div>

                {/* Legenda/Rodapé (Caption/Footer) */}
                {project.galleryImages[currentSlide].caption && (
                    <div className="px-6 py-4 bg-gray-900 border-t border-gray-700">
                        <p className="text-sm text-gray-300 text-center">{project.galleryImages[currentSlide].caption}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectGalleryModal;