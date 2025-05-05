import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { UserData } from '../types'; 

import { motion } from 'framer-motion';
import { Button } from '../assets/components/common/Button';
import { Step1Name } from '../assets/components/FormSteps/Step1Name';
import { Step2Age } from '../assets/components/FormSteps/Step2Age';
import { Step3Remedies } from '../assets/components/FormSteps/Step3Remedies';
import { Step4Routine } from '../assets/components/FormSteps/Step4Routine';
import { ProgressIndicator } from '../assets/components/common/Checkbox';
import { ArrowLeft, Leaf } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Omit<UserData, 'onboardingCompleted'>>({
    name: '',
    age: '',
    height: 170, // valor padrão
    weight: 70, // valor padrão
    selectedRemedies: [], 
    remedies: [],
    waterGoal: 2000, 
    wakeUpTime: '07:00',
    sleepTime: '22:00',
    routines: []
  });

  useEffect(() => {
    if (userData && userData.name && userData.age && userData.onboardingCompleted) {
      navigate('/dashboard');
    }
  }, [userData, navigate]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calcular recomendação de água baseada no peso se não foi modificada pelo usuário
      if (formData.waterGoal === 2000 && formData.weight > 0) {
        formData.waterGoal = Math.round(formData.weight * 30);
      }
   
      setUserData({
        ...formData,
        onboardingCompleted: true
      } as UserData);
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setUserData({
      ...formData,
      onboardingCompleted: true
    } as UserData);
    navigate('/dashboard');
  };

  const handleUpdateFormData = (field: keyof Omit<UserData, 'onboardingCompleted'>, value: any) => {
    setFormData(prevData => {
   
      if (field === 'remedies') {
        const selectedRemedies = value.map((remedy: any) => remedy.id);
        return {
          ...prevData,
          [field]: value,
          selectedRemedies
        };
      }
      
      return {
        ...prevData,
        [field]: value
      };
    });
  };

  const stepLabels = ['Seu Nome', 'Sua Idade', 'Objetivo', 'Rotina'];
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0;
      case 2:
        return formData.age && !isNaN(Number(formData.age)) && Number(formData.age) > 0;
      case 3:
        return true; 
      case 4:
        return formData.height > 0 && formData.weight > 0; // Verificar se altura e peso foram informados
      default:
        return false;
    }
  };


  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Name 
            name={formData.name} 
            setName={(value) => handleUpdateFormData('name', value)}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2Age 
            age={formData.age}
            onAgeChange={(value) => handleUpdateFormData('age', value)}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <div>
            <Step3Remedies 
              remedies={formData.remedies} 
              onRemediesChange={(value) => handleUpdateFormData('remedies', value)}
            />
            {/* Navigation buttons for Step3 */}
            <div className="flex items-center justify-between mt-8">
     
              <div className="flex space-x-3 gap-2">

              <Button variant="outline" onClick={handleBack} type="button" className="px-8 gap-2  font-medium text-red-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
             <ArrowLeft className='w-4'/> Voltar
            </Button>
                <Button 
                  onClick={handleSkip} 
                  variant="text"
                  className="px-8  font-medium  text-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto"
                >
                  Pular
                </Button>
                <Button 
                  onClick={handleNext} 
                  className="px-8 w-full h-12 font-medium bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto"
                  variant="primary"
                >
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <Step4Routine 
            waterGoal={formData.waterGoal}
            wakeUpTime={formData.wakeUpTime}
            sleepTime={formData.sleepTime}
            height={formData.height}
            weight={formData.weight}
            onWaterGoalChange={(value) => handleUpdateFormData('waterGoal', value)}
            onWakeUpTimeChange={(value) => handleUpdateFormData('wakeUpTime', value)}
            onSleepTimeChange={(value) => handleUpdateFormData('sleepTime', value)}
            onHeightChange={(value) => handleUpdateFormData('height', value)}
            onWeightChange={(value) => handleUpdateFormData('weight', value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 max-w-xl mx-auto">
        <div className="mb-8">
        <Leaf
           className="h-10 w-10 mx-auto mb-6 text-blue-600"
         />
         
         <h1 className="text-xl text-center font-bold mx-auto text-gray-900 sm:text-5xl md:text-4xl mb-4">
           Eight<span className="text-blue-600">Health</span>
         </h1>
          <h2 className="mt-2 text-center text-2xl font-bold text-gray-900">
            Vamos configurar seu perfil
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Preencha os detalhes abaixo para personalizar sua experiência
          </p>
        </div>

        <div className="mb-8">
          <ProgressIndicator 
            steps={4} 
            currentStep={currentStep} 
            labels={stepLabels}
          />
        </div>

        <motion.div
          key={currentStep}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={slideVariants}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {renderStep()}
        </motion.div>

        {/* Navigation buttons for step 4 only */}
        {currentStep === 4 && (
          <div className="flex justify-between">
            <div>
              <Button 
                onClick={handleBack} 
                variant="outline"
              >
                Voltar
              </Button>
            </div>

            <div className="flex space-x-3">
              <Button 
                onClick={handleNext} 
                variant="primary"
                disabled={!canProceed()}
              >
                Concluir
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;