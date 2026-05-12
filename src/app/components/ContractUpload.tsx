import { Upload, FileText, ScanLine, Shield, FileCheck, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface ContractUploadProps {
  onUpload: (file: File) => void;
}

const analysisSteps = [
  { text: "계약서 내용을 읽고 있어요...", icon: FileText },
  { text: "보증금 규모 파악 중...", icon: FileCheck },
  { text: "특약 사항 위험도 분석 중...", icon: Shield },
  { text: "선순위 권리 확인 중...", icon: AlertTriangle },
  { text: "임대인 정보 확인 중...", icon: FileCheck },
  { text: "계약 일정 정리 중...", icon: FileText }
];

export function ContractUpload({ onUpload }: ContractUploadProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isAnalyzing) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      setTimeout(() => {
        onUpload(file);
      }, analysisSteps.length * 1500);
    }
  };

  if (isAnalyzing) {
    const CurrentIcon = analysisSteps[currentStep].icon;
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              <motion.div
                key={currentStep}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto relative"
              >
                <CurrentIcon className="w-10 h-10 text-primary" />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              <motion.div
                key={`text-${currentStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-lg font-medium mb-2">AI가 계약서를 분석하고 있어요</p>
                <p className="text-sm text-muted-foreground">{analysisSteps[currentStep].text}</p>
              </motion.div>

              <div className="flex gap-1.5 justify-center">
                {analysisSteps.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1.5 rounded-full ${
                      index <= currentStep ? "bg-primary" : "bg-gray-200"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: index <= currentStep ? 32 : 32 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">전월세 계약 AI 코칭</CardTitle>
          <CardDescription className="text-lg mt-2">
            계약서를 업로드하면 AI가 중요한 내용을 분석하고<br />
            놓치면 안 되는 절차를 안내해드립니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
            <input
              type="file"
              id="contract-upload"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <label htmlFor="contract-upload" className="cursor-pointer flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium mb-1">계약서를 업로드하세요</p>
                <p className="text-sm text-muted-foreground">
                  PDF, JPG, PNG 파일 지원
                </p>
              </div>
              <Button type="button" onClick={() => document.getElementById('contract-upload')?.click()}>
                <FileText className="w-4 h-4 mr-2" />
                파일 선택
              </Button>
            </label>
          </div>

          <div className="mt-8 space-y-3">
            <p className="text-sm font-medium text-center mb-4">분석 가능한 내용</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                "계약 금액 및 일정",
                "특약 사항",
                "잔금 납부일",
                "입주 가능일",
                "계약 당사자 정보",
                "권리 관계"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
