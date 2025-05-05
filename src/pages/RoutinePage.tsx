import React, { useState } from 'react';

import { Button } from '../assets/components/common/Button';
import useRoutineStore from '../store/routineStore';
import { RoutineActivity } from '../types';
import { motion } from 'framer-motion';


const DAYS_OF_WEEK = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const CATEGORIES = [
  { value: 'water', label: 'Água' },
  { value: 'exercise', label: 'Exercício' },
  { value: 'rest', label: 'Descanso' },
  { value: 'sunlight', label: 'Sol' },
  { value: 'temperance', label: 'Temperança' },
  { value: 'air', label: 'Ar' },
  { value: 'nutrition', label: 'Nutrição' },
  { value: 'trust', label: 'Confiança' },
  { value: 'medication', label: 'Medicamento' },
  { value: 'meal', label: 'Refeição' },
  { value: 'other', label: 'Outro' },
];

const CategoryIcon = ({ category }: { category: string }) => {
  const getIcon = () => {
    switch (category) {
      case 'water':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'exercise':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'medication':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
          </svg>
        );
      case 'meal':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="text-blue-500">
      {getIcon()}
    </div>
  );
};

const RoutinesPage = () => {
  const { routines, addRoutine, updateRoutine, removeRoutine } = useRoutineStore();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<RoutineActivity, 'id'>>({
    name: '',
    startTime: '',
    endTime: '',
    category: 'water',
    days: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => {
      const currentDays = prev.days || [];
      if (currentDays.includes(day)) {
        return { ...prev, days: currentDays.filter(d => d !== day) };
      } else {
        return { ...prev, days: [...currentDays, day] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate end time if not provided
    let endTime = formData.endTime;
    if (!endTime && formData.startTime) {
      const [hours, minutes] = formData.startTime.split(':').map(Number);
      const endDate = new Date();
      endDate.setHours(hours, minutes + 15); // Default 15 minutes duration
      endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
    }

    if (isEditing) {
      updateRoutine(isEditing, { ...formData, endTime });
      setIsEditing(null);
    } else {
      addRoutine({ ...formData, endTime });
    }
    
    setIsAdding(false);
    setFormData({
      name: '',
      startTime: '',
      endTime: '',
      category: 'water',
      days: []
    });
  };

  const handleEdit = (routine: RoutineActivity) => {
    setFormData({
      name: routine.name,
      startTime: routine.startTime,
      endTime: routine.endTime,
      category: routine.category,
      days: routine.days || []
    });
    setIsEditing(routine.id);
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({
      name: '',
      startTime: '',
      endTime: '',
      category: 'water',
      days: []
    });
  };

  // Sort routines by time
  const sortedRoutines = [...routines].sort((a, b) => {
    if (a.startTime < b.startTime) return -1;
    if (a.startTime > b.startTime) return 1;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Rotina Diária</h1>
        {!isAdding && (
          <Button 
            onClick={() => setIsAdding(true)}
            className="  px-3 py-2 rounded-md text-sm font-medium bg-blue-50 text-blue-600"

          >
            Adicionar Atividade
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">
            {isEditing ? 'Editar Atividade' : 'Nova Atividade'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome da Atividade
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Categoria
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  {CATEGORIES.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                  Horário de Início
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                  className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                  Horário de Término (opcional)
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Dias da Semana
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      formData.days?.includes(day)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Se nenhum dia for selecionado, a atividade aparecerá todos os dias.
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className='px-3 py-2 rounded-md text-sm font-medium border border-red-600 bg-red-100 text-red-600'
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className='px-3 py-2 rounded-md text-sm font-medium border border-blue-600 bg-blue-100 text-blue-600'
              >
                {isEditing ? 'Salvar Alterações' : 'Adicionar'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {sortedRoutines.length > 0 ? (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {sortedRoutines.map(routine => (
              <li key={routine.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CategoryIcon category={routine.category} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{routine.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{routine.startTime} - {routine.endTime}</span>
                        {routine.days && routine.days.length > 0 && (
                          <span className="ml-4">
                            {routine.days.map(day => day.substring(0, 3)).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(routine)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => removeRoutine(routine.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma atividade encontrada</h3>
          <p className="mt-1 text-sm text-gray-500">
            Comece adicionando atividades à sua rotina diária.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => setIsAdding(true)}
              className="  px-3 py-2 rounded-md text-sm font-medium bg-blue-50 text-blue-600"
            >
              Adicionar Primeira Atividade
            </Button>
          </div>
        </div>
      )}
      </motion.div>
    </div>
  );
};

export default RoutinesPage;