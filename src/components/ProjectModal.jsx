import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { X, Lightbulb, Wrench, Star } from 'lucide-react'

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
              leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-900 border border-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-white mb-4 flex justify-between items-center">
                  {project.title}
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                    <X size={24} className="text-gray-400" />
                  </button>
                </Dialog.Title>

                <div className="mt-4 space-y-6">
                  {/* Problema Solucionado */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Lightbulb className="text-yellow-400" size={20} />
                      <h4 className="text-lg font-semibold text-white">Problema Solucionado</h4>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{project.problem}</p>
                  </div>

                  {/* Ferramentas Utilizadas */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Wrench className="text-blue-400" size={20} />
                      <h4 className="text-lg font-semibold text-white">Ferramentas e Tecnologias</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Habilidades Adquiridas */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="text-green-400" size={20} />
                      <h4 className="text-lg font-semibold text-white">Habilidades Empregadas</h4>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{project.skillsUsed}</p>
                  </div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ProjectModal