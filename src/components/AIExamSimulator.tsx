import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const examQuestions: Question[] = [
  {
    id: 1,
    question: "What is the main advantage of Small Language Models (SLMs) over Large Language Models (LLMs)?",
    options: [
      "They have more parameters and are more accurate",
      "They are cheaper, more efficient, and easier to tailor to specific tasks",
      "They require more GPUs to run",
      "They can only run on cloud systems"
    ],
    correctAnswer: 1,
    explanation: "SLMs are catching up in performance thanks to improved training techniques. Their lower cost, reduced reliance on GPUs, and ability to run on local systems make them attractive for specific tasks."
  },
  {
    id: 2,
    question: "What are the three core approaches for training machine learning models?",
    options: [
      "Deep learning, Pattern recognition, Computer vision",
      "Neural Networks, GPUs, CPUs",
      "Supervised learning, Reinforced learning, Unsupervised learning",
      "LLMs, SLMs, Agent AI"
    ],
    correctAnswer: 2,
    explanation: "The three core machine learning approaches are: Supervised learning (uses labeled data), Reinforced learning (learns via rewards & penalties), and Unsupervised learning (finds patterns in unlabeled data)."
  },
  {
    id: 3,
    question: "What distinguishes 'Agent AI' from other forms of AI?",
    options: [
      "It only generates text responses",
      "It executes tasks on your behalf within different ecosystems",
      "It can only recognize patterns",
      "It requires human supervision for every action"
    ],
    correctAnswer: 1,
    explanation: "Agent AI is defined as AI that executes stuff on your behalf. It needs different ecosystems to execute orders and represents the future of generative AI."
  },
  {
    id: 4,
    question: "What is the difference between 'General AI' and 'Light AI'?",
    options: [
      "General AI is faster than Light AI",
      "Light AI is more expensive to implement",
      "General AI is not achieved yet and would be super-intelligent; Light AI addresses specific tasks",
      "There is no difference between them"
    ],
    correctAnswer: 2,
    explanation: "General AI (not achieved yet) would become better than humans and feel emotions. Light AI follows and addresses specific tasks like recommendation engines."
  },
  {
    id: 5,
    question: "According to the course material, what is happening to traditional search engines?",
    options: [
      "They are becoming more popular",
      "They are being replaced by prompting on AI",
      "They are merging with social media",
      "They are becoming more expensive"
    ],
    correctAnswer: 1,
    explanation: "The material states that 'search engine is disappearing, dying' and is being replaced by prompting on AI systems."
  },
  {
    id: 6,
    question: "What are Generative Adversarial Networks (GANs) composed of?",
    options: [
      "One large neural network",
      "Multiple supervised learning models",
      "A Generator and a Discriminator that compete against each other",
      "Only unsupervised learning algorithms"
    ],
    correctAnswer: 2,
    explanation: "GANs consist of two neural networks: a Generator (creates synthetic data) and a Discriminator (distinguishes real from fake). They compete in a zero-sum game to improve outputs."
  },
  {
    id: 7,
    question: "What is 'Retrieval-Augmented Generation' (RAG)?",
    options: [
      "A type of computer vision algorithm",
      "A method that combines retrieval of relevant data with LLM generation for more accurate responses",
      "A new programming language for AI",
      "A hardware acceleration technique"
    ],
    correctAnswer: 1,
    explanation: "RAG combines information retrieval with generative AI. It retrieves relevant documents/data and uses them as context for the LLM to generate more accurate, grounded responses."
  },
  {
    id: 8,
    question: "What is 'Computer Vision' in AI?",
    options: [
      "AI that writes computer code",
      "AI that can interpret and make decisions from visual inputs like images and videos",
      "AI that designs computer screens",
      "AI that manages computer networks"
    ],
    correctAnswer: 1,
    explanation: "Computer Vision enables machines to interpret and make decisions based on visual data. It's used for facial recognition, object detection, autonomous vehicles, and medical imaging."
  },
  {
    id: 9,
    question: "What is the main limitation of LLMs mentioned in the material regarding current events?",
    options: [
      "They cannot process images",
      "They are updated only to a certain date and start guessing about recent events",
      "They cannot understand multiple languages",
      "They are too slow for real-time applications"
    ],
    correctAnswer: 1,
    explanation: "LLMs are updated only up to their training data cutoff. When asked about recent news, they 'start guessing (like human beings)' and tend to create misconceptions."
  },
  {
    id: 10,
    question: "According to analysts, how might AI agents be built in the future?",
    options: [
      "Using a single massive model for everything",
      "Lego-style, with networks of small specialized models",
      "Only using cloud-based systems",
      "Without any machine learning"
    ],
    correctAnswer: 1,
    explanation: "Analysts suggest that AI agents in the future may be built 'Lego-style, with networks of small specialized models rather than one all-knowing intelligence.'"
  }
];

interface AIExamSimulatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseName: string;
}

export const AIExamSimulator = ({ open, onOpenChange, courseName }: AIExamSimulatorProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(examQuestions.length).fill(null));
  const [isComplete, setIsComplete] = useState(false);

  const question = examQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / examQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(examQuestions.length).fill(null));
    setIsComplete(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / examQuestions.length) * 100;
    if (percentage >= 90) return { message: "Outstanding! You've mastered this material!", emoji: "🏆" };
    if (percentage >= 70) return { message: "Great job! You have a solid understanding.", emoji: "🌟" };
    if (percentage >= 50) return { message: "Good effort! Review the explanations to improve.", emoji: "📚" };
    return { message: "Keep studying! Review the course material and try again.", emoji: "💪" };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/70">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            AI Exam Simulator
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 ml-2">
              <Sparkles className="w-3 h-3 mr-1" />
              RAG-Powered
            </Badge>
          </DialogTitle>
        </DialogHeader>

        {!isComplete ? (
          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Question {currentQuestion + 1} of {examQuestions.length}</span>
                <span className="text-muted-foreground">Score: {score}/{currentQuestion + (showResult ? 1 : 0)}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <div className="p-4 rounded-xl bg-muted/30 border">
              <p className="font-medium text-lg">{question.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correctAnswer;
                const showCorrectness = showResult;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all",
                      !showResult && isSelected && "border-primary bg-primary/10",
                      !showResult && !isSelected && "border-border hover:border-primary/50 hover:bg-muted/50",
                      showResult && isCorrect && "border-emerald-500 bg-emerald-500/10",
                      showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                      showResult && "cursor-default"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
                        !showResult && isSelected && "border-primary bg-primary text-primary-foreground",
                        !showResult && !isSelected && "border-muted-foreground/30",
                        showResult && isCorrect && "border-emerald-500 bg-emerald-500 text-white",
                        showResult && isSelected && !isCorrect && "border-red-500 bg-red-500 text-white"
                      )}>
                        {showResult && isCorrect ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : showResult && isSelected && !isCorrect ? (
                          <XCircle className="w-5 h-5" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className={cn(
                        showResult && isCorrect && "text-emerald-700 dark:text-emerald-400 font-medium",
                        showResult && isSelected && !isCorrect && "text-red-700 dark:text-red-400"
                      )}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className={cn(
                "p-4 rounded-xl border",
                selectedAnswer === question.correctAnswer 
                  ? "bg-emerald-500/10 border-emerald-500/30" 
                  : "bg-amber-500/10 border-amber-500/30"
              )}>
                <p className="text-sm font-medium mb-1">
                  {selectedAnswer === question.correctAnswer ? "✓ Correct!" : "✗ Incorrect"}
                </p>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              {!showResult ? (
                <Button 
                  onClick={handleSubmitAnswer} 
                  disabled={selectedAnswer === null}
                  className="gap-2"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="gap-2">
                  {currentQuestion < examQuestions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      See Results
                      <Trophy className="w-4 h-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        ) : (
          /* Results Screen */
          <div className="space-y-6 text-center py-4">
            <div className="text-6xl">{getScoreMessage().emoji}</div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Exam Complete!</h3>
              <p className="text-muted-foreground">{getScoreMessage().message}</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-background to-accent/10 border">
              <div className="text-5xl font-bold text-primary mb-2">
                {score}/{examQuestions.length}
              </div>
              <p className="text-muted-foreground">
                {Math.round((score / examQuestions.length) * 100)}% correct
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    answer === examQuestions[index].correctAnswer
                      ? "bg-emerald-500 text-white"
                      : "bg-red-500 text-white"
                  )}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            <Button onClick={handleRestart} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
