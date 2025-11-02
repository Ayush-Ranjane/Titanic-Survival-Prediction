import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PredictionForm } from './components/PredictionForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Ship, Brain } from 'lucide-react';

export interface PredictionInput {
  Pclass: number;
  Sex: string;
  Age: number;
  SibSp: number;
  Parch: number;
  Fare: number;
  Embarked: string;
}

export interface PredictionOutput {
  prediction: number;
  prediction_label: string;
  survival_probability: number;
}

export default function App() {
  const [result, setResult] = useState<PredictionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async (data: PredictionInput) => {
    setIsLoading(true);
    setResult(null);

    // --- ADD THIS LINE FOR DEBUGGING ---
    console.log("Data being sent to API:", data);

    try {
      // Send the POST request to our *real* FastAPI backend
      const API_URL = "https://titanic-survival-prediction-98nz.onrender.com";
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The 'data' object already matches the PredictionInput interface
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle server errors (e.g., 500, 422 Validation Error)
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Network response was not ok');
      }

      // The response from FastAPI will match the PredictionOutput interface
      const apiResult: PredictionOutput = await response.json();
      setResult(apiResult); // Store the real prediction result

    } catch (error) {
      console.error('Error fetching prediction:', error);
      // Here you could set an error state to display to the user
      // For now, it will just log to the console.
    } finally {
      setIsLoading(false); // Hide loading indicator in all cases
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <Ship className="w-16 h-16 text-blue-400" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-6 h-6 text-purple-400" />
              </motion.div>
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Survival Prediction AI
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Advanced machine learning model to predict survival probability based on passenger data
          </p>
        </motion.div>

        {/* Main content */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PredictionForm onSubmit={handlePredict} isLoading={isLoading} />
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {result ? (
                <ResultsDisplay result={result} key="result" />
              ) : isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center"
                >
                  <motion.div
                    className="w-24 h-24 mx-auto mb-6 border-4 border-blue-400/30 border-t-blue-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-slate-300 text-xl">Analyzing data...</p>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center p-12 border-2 border-dashed border-slate-700 rounded-2xl"
                >
                  <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-500 text-lg">
                    Enter passenger data to get prediction
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
