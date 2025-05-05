import { useState } from 'react';
import { motion } from 'framer-motion';
import useHabitStore from '../store/habitStore';
import Header from '../assets/components/layout/Header';
import { Button } from '../assets/components/common/Button';
import { Input } from '../assets/components/common/Input';
import { Checkbox } from '../assets/components/common/Checkbox';
import { HabitVisualization } from '../assets/components/HabitCalendar/HabitVisualisation';
import Footer from '../assets/components/layout/Footer';
import { NaturalRemedy } from '../types';

const HabitsPage = () => {
  const { habits, addHabit, toggleHabitCompletion, removeHabit } = useHabitStore();
  const [newHabitName, setNewHabitName] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  

  const selectedRemedies = ['exercise', 'water'] as NaturalRemedy[];

  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      addHabit({
        id: Date.now().toString(),
        name: newHabitName.trim(),
        createdAt: new Date().toISOString(),
        completedDates: [],
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

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-green-800">My Habits</h1>
            
            {!showAddForm && (
              <Button 
                onClick={() => setShowAddForm(true)}
                variant="primary"
              >
                Add New Habit
              </Button>
            )}
          </div>
          
          {showAddForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-green-50 rounded-lg p-4 mb-6"
            >
              <h2 className="text-xl font-semibold text-green-800 mb-3">Create New Habit</h2>
              <div className="flex gap-3">
                <Input
                  id="new-habit"
                  name="newHabit"
                  value={newHabitName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewHabitName(e.target.value)}
                  placeholder="Habit name"
                  className="flex-grow"
                />
                <Button onClick={handleAddHabit} variant="primary">
                  Save
                </Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}
          
          <div className="space-y-4">
            {habits.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                You don't have any habits yet. Add your first habit to get started!
              </p>
            ) : (
              habits.map((habit) => {
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
                       
                          label={habit.name}
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
                        Remove
                      </Button>
                    </div>
                  </motion.div>
                );
              })
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
            <h2 className="text-2xl font-bold text-green-800 mb-6">Habit Streak</h2>
            <HabitVisualization 
              habits={habits.map(habit => ({
                date: habit.createdAt.split('T')[0],
                completedRemedies: habit.completedDates.reduce((acc, _) => {
                 
                  acc['exercise' as NaturalRemedy] = true;
                  return acc;
                }, {} as {[key in NaturalRemedy]?: boolean}),
                completionLevel: Math.min(Math.floor(habit.completedDates.length / 5), 4) 
              }))}
              selectedRemedies={selectedRemedies} 
            />
          </motion.div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default HabitsPage;