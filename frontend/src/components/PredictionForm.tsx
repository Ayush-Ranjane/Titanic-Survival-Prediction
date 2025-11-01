import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, User, Hash, Users, DollarSign, Anchor } from 'lucide-react';
import { PredictionInput } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface PredictionFormProps {
  onSubmit: (data: PredictionInput) => void;
  isLoading: boolean;
}

export function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
  const [formData, setFormData] = useState<PredictionInput>({
    Pclass: 1,
    Sex: 'male',
    Age: 30,
    SibSp: 0,
    Parch: 0,
    Fare: 50,
    Embarked: 'S'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200";

  return (
    <motion.div
      className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-800 shadow-2xl"
      whileHover={{ boxShadow: "0 20px 40px rgba(59, 130, 246, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl mb-6 text-slate-100 flex items-center gap-2">
        <User className="w-6 h-6 text-blue-400" />
        Passenger Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Passenger Class */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label htmlFor="pclass" className="text-slate-300 mb-2 flex items-center gap-2">
            <Hash className="w-4 h-4 text-blue-400" />
            Passenger Class
          </Label>
          <Select
            value={formData.Pclass.toString()}
            onValueChange={(value) => setFormData({ ...formData, Pclass: parseInt(value) })}
          >
            <SelectTrigger className={inputClasses}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1st Class (Upper)</SelectItem>
              <SelectItem value="2">2nd Class (Middle)</SelectItem>
              <SelectItem value="3">3rd Class (Lower)</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Sex */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Label htmlFor="sex" className="text-slate-300 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            Sex
          </Label>
          <Select
            value={formData.Sex}
            onValueChange={(value) => setFormData({ ...formData, Sex: value })}
          >
            <SelectTrigger className={inputClasses}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Age */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="age" className="text-slate-300 mb-2 flex items-center gap-2">
            <Hash className="w-4 h-4 text-pink-400" />
            Age
          </Label>
          <Input
            id="age"
            type="number"
            value={formData.Age}
            onChange={(e) => setFormData({ ...formData, Age: parseFloat(e.target.value) })}
            className={inputClasses}
            min="0"
            max="100"
            step="0.1"
          />
        </motion.div>

        {/* Siblings/Spouses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Label htmlFor="sibsp" className="text-slate-300 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-green-400" />
            Siblings/Spouses Aboard
          </Label>
          <Input
            id="sibsp"
            type="number"
            value={formData.SibSp}
            onChange={(e) => setFormData({ ...formData, SibSp: parseInt(e.target.value) })}
            className={inputClasses}
            min="0"
          />
        </motion.div>

        {/* Parents/Children */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Label htmlFor="parch" className="text-slate-300 mb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-orange-400" />
            Parents/Children Aboard
          </Label>
          <Input
            id="parch"
            type="number"
            value={formData.Parch}
            onChange={(e) => setFormData({ ...formData, Parch: parseInt(e.target.value) })}
            className={inputClasses}
            min="0"
          />
        </motion.div>

        {/* Fare */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Label htmlFor="fare" className="text-slate-300 mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-yellow-400" />
            Fare
          </Label>
          <Input
            id="fare"
            type="number"
            value={formData.Fare}
            onChange={(e) => setFormData({ ...formData, Fare: parseFloat(e.target.value) })}
            className={inputClasses}
            min="0"
            step="0.01"
          />
        </motion.div>

        {/* Port of Embarkation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Label htmlFor="embarked" className="text-slate-300 mb-2 flex items-center gap-2">
            <Anchor className="w-4 h-4 text-cyan-400" />
            Port of Embarkation
          </Label>
          <Select
            value={formData.Embarked}
            onValueChange={(value) => setFormData({ ...formData, Embarked: value })}
          >
            <SelectTrigger className={inputClasses}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="C">Cherbourg</SelectItem>
              <SelectItem value="Q">Queenstown</SelectItem>
              <SelectItem value="S">Southampton</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 group"
          >
            <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
            {isLoading ? 'Predicting...' : 'Predict Survival'}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
