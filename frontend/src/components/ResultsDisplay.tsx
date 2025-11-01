import { motion } from "motion/react";
import {
  Heart,
  HeartOff,
  TrendingUp,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { PredictionOutput } from "../App";

interface ResultsDisplayProps {
  result: PredictionOutput;
}

export function ResultsDisplay({
  result,
}: ResultsDisplayProps) {
  const survived = result.prediction === 1;
  const probability = result.survival_probability * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className="w-full"
    >
      <div
        className={`relative bg-gradient-to-br ${
          survived
            ? "from-green-900/50 via-emerald-900/50 to-teal-900/50"
            : "from-red-900/50 via-rose-900/50 to-pink-900/50"
        } backdrop-blur-xl rounded-2xl p-8 border ${
          survived ? "border-green-500/30" : "border-red-500/30"
        } shadow-2xl overflow-hidden`}
      >
        {/* Animated background effect */}
        <motion.div
          className={`absolute inset-0 ${
            survived ? "bg-green-500/5" : "bg-red-500/5"
          }`}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 300,
            }}
            className="flex justify-center mb-6"
          >
            {survived ? (
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <CheckCircle2 className="w-24 h-24 text-green-400" />
              </motion.div>
            ) : (
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
              >
                <XCircle className="w-24 h-24 text-red-400" />
              </motion.div>
            )}
          </motion.div>

          {/* Prediction Label */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-4xl text-center mb-2 ${
              survived ? "text-green-300" : "text-red-300"
            }`}
          >
            {result.prediction_label}
          </motion.h3>

          {/* Probability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp
                className={`w-5 h-5 ${survived ? "text-green-400" : "text-red-400"}`}
              />
              <span className="text-slate-400">
                Survival Probability
              </span>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 200,
              }}
              className="text-6xl bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
            >
              {probability.toFixed(2)}%
            </motion.div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${probability}%` }}
                transition={{
                  delay: 0.7,
                  duration: 1,
                  ease: "easeOut",
                }}
                className={`h-full rounded-full ${
                  survived
                    ? "bg-gradient-to-r from-green-500 to-emerald-400"
                    : "bg-gradient-to-r from-red-500 to-rose-400"
                }`}
              />
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-slate-400 text-sm mb-1">
                Prediction
              </div>
              <div className="text-2xl text-slate-100">
                {result.prediction}
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4 text-center">
              <div className="text-slate-400 text-sm mb-1">
                Confidence
              </div>
              <div className="text-2xl text-slate-100">
                {survived
                  ? probability.toFixed(1)
                  : (100 - probability).toFixed(1)}
                %
              </div>
            </div>
          </motion.div>

          {/* Status Icon at bottom */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 1,
              type: "spring",
              stiffness: 200,
            }}
            className="flex justify-center mt-6"
          >
            {survived ? (
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className="w-8 h-8 text-green-400 fill-green-400" />
              </motion.div>
            ) : (
              <HeartOff className="w-8 h-8 text-red-400" />
            )}
          </motion.div>
        </div>

        {/* Decorative corner elements */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 ${
            survived ? "bg-green-500/10" : "bg-red-500/10"
          } rounded-bl-full`}
        />
        <div
          className={`absolute bottom-0 left-0 w-32 h-32 ${
            survived ? "bg-green-500/10" : "bg-red-500/10"
          } rounded-tr-full`}
        />
      </div>
    </motion.div>
  );
}