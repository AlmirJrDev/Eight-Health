import { useState } from 'react';
import { motion } from 'framer-motion';
import useHabitStore from '../store/habitStore';

import { Button } from '../assets/components/common/Button';
import { Input } from '../assets/components/common/Input';
import { Checkbox } from '../assets/components/common/Checkbox';


import { NaturalRemedy } from '../types';
import { HabitCalendar } from '../assets/components/HabitCalendar/HabitVisualisation';

const NATURAL_REMEDIES = [
  { id: 'water', name: 'Água', icon: '💧' },
  { id: 'exercise', name: 'Exercício', icon: '🏃' },
  { id: 'rest', name: 'Descanso', icon: '😴' },
  { id: 'sunlight', name: 'Sol', icon: '☀️' },
  { id: 'temperance', name: 'Temperança', icon: '⚖️' },
  { id: 'air', name: 'Ar Puro', icon: '🌬️' },
  { id: 'nutrition', name: 'Nutrição', icon: '🥗' },
  { id: 'trust', name: 'Confiança', icon: '🙏' }
];

const HabitsPage = () => {
  const { habits, addHabit, toggleHabitCompletion, removeHabit } = useHabitStore();
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedRemedy, setSelectedRemedy] = useState<NaturalRemedy>('water');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      addHabit({
        id: Date.now().toString(),
        name: newHabitName.trim(),
        createdAt: new Date().toISOString(),
        completedDates: [],
        remedy: selectedRemedy
      });
      setNewHabitName('');
      setShowAddForm(false);
    }
  };

  const handleToggleHabit = (habitId: string) => {
    const today = new Date().toISOString().split('T')[0];
    toggleHabitCompletion(habitId, today);
  };

  const handleDeleteHabit = (habitId: string) => {
    removeHabit(habitId);
  };

  // Group habits by remedy
  const habitsByRemedy = NATURAL_REMEDIES.map(remedy => {
    const remedyHabits = habits.filter(habit => habit.remedy === remedy.id);
    return {
      ...remedy,
      habits: remedyHabits
    };
  }).filter(group => group.habits.length > 0);

  // Get list of remedies that have at least one habit
  const activeRemedies = habitsByRemedy.map(group => group.id as NaturalRemedy);

  // Get data for calendar visualization
  const calendarData = habits.map(habit => {
    return {
      id: habit.id,
      remedy: habit.remedy,
      name: habit.name,
      dates: habit.completedDates
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col ">
      <main className="flex-grow container  px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-600">Meus 8 Remédios Naturais</h1>
            
            {!showAddForm && (
              <Button 
                onClick={() => setShowAddForm(true)}
                variant="primary"
                className='px-3 py-2 rounded-md text-sm font-medium bg-blue-50 text-blue-600'
              >
                Adicionar Novo Hábito
              </Button>
            )}
          </div>
          
          {showAddForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-gray-50 rounded-lg p-4 mb-6"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-3">Criar Novo Hábito</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome do Hábito
                  </label>
                  <Input
                    id="new-habit"
                    name="newHabit"
                    value={newHabitName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewHabitName(e.target.value)}
                    placeholder="Ex: Beber 2L de água"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Remédio Natural
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {NATURAL_REMEDIES.map((remedy) => (
                      <div
                        key={remedy.id}
                        onClick={() => setSelectedRemedy(remedy.id as NaturalRemedy)}
                        className={`flex items-center p-3 rounded-lg cursor-pointer border ${
                          selectedRemedy === remedy.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <span className="text-2xl mr-2">{remedy.icon}</span>
                        <span className="text-sm">{remedy.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
           
                  <Button onClick={() => setShowAddForm(false)} variant="outline" className='px-3 py-2 rounded-md text-sm font-medium border border-red-600 bg-red-100 text-red-600'>
                    Cancelar
                  </Button>
                  <Button onClick={handleAddHabit} variant="primary" className='px-3 py-2 rounded-md text-sm font-medium border border-green-600 bg-green-100 text-green-600'>
                    Salvar
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="space-y-6">
            {habitsByRemedy.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Você ainda não tem nenhum hábito. Adicione seu primeiro hábito para começar!
              </p>
            ) : (
              habitsByRemedy.map((remedyGroup) => (
                <div key={remedyGroup.id} className="mb-6">
                  <h2 className="text-lg font-semibold text-blue-600 flex items-center mb-3">
                    <span className="text-xl mr-2">{remedyGroup.icon}</span>
                    <span>{remedyGroup.name}</span>
                  </h2>
                  
                  <div className="space-y-2">
                    {remedyGroup.habits.map((habit) => {
                      const isCompletedToday = habit.completedDates.includes(
                        new Date().toISOString().split('T')[0]
                      );
                      
                      return (
                        <motion.div 
                          key={habit.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                id={`habit-${habit.id}`}
                                label=""
                                checked={isCompletedToday}
                                onChange={() => handleToggleHabit(habit.id)}
                              />
                              <span className={`text-lg ${isCompletedToday ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                {habit.name}
                              </span>
                            </div>
                            
                            <Button 
                              onClick={() => handleDeleteHabit(habit.id)}
                              variant="outline"
                              className="text-sm"
                            >
                              Remover
                            </Button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
        
        {habits.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Meu Calendário de Hábitos</h2>
            <HabitCalendar 
              habitsData={calendarData}
              activeRemedies={activeRemedies}
            />
          </motion.div>
        )}
      </main>
      
  
    </div>
  );
};

export default HabitsPage;