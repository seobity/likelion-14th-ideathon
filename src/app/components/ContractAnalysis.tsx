import { CheckCircle2, AlertCircle, ChevronRight, AlertTriangle, ShieldAlert } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

interface ContractData {
  type: "전세" | "월세";
  deposit: number;
  monthlyRent?: number;
  contractDate: string;
  moveInDate: string;
  finalPaymentDate: string;
  address: string;
  landlord: string;
  tenant: string;
  specialTerms: string[];
}

interface ContractAnalysisProps {
  contractData: ContractData;
  onContinue: () => void;
}

export function ContractAnalysis({ contractData, onContinue }: ContractAnalysisProps) {
  return (
    <div className="min-h-screen p-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-8"
        >
          <CheckCircle2 className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl font-medium">AI 계약 분석 리포트</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-red-200 bg-red-50/50">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-red-900">위험 요소가 감지되었어요</CardTitle>
                  <CardDescription className="text-red-700 mt-1">
                    계약 전 반드시 확인이 필요한 사항입니다
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3 p-4 bg-white rounded-lg border border-red-200">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-red-900 mb-1">근저당 설정 발견</p>
                  <p className="text-sm text-red-700">
                    이 집에는 5억 2천만원의 근저당이 설정되어 있어요. 보증금 5억원을 고려하면
                    깡통전세 위험도를 꼭 확인해야 해요.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-4 bg-white rounded-lg border border-orange-200">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-orange-900 mb-1">임대차 신고 필수</p>
                  <p className="text-sm text-orange-700">
                    보증금 6천만원 이상 계약은 계약 체결일로부터 30일 이내에 임대차 신고를 해야
                    합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>계약 요약</CardTitle>
                <Badge variant={contractData.type === "전세" ? "default" : "secondary"}>
                  {contractData.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InfoItem label="보증금" value={`${contractData.deposit.toLocaleString()}만원`} />
                {contractData.monthlyRent && (
                  <InfoItem label="월세" value={`${contractData.monthlyRent.toLocaleString()}만원`} />
                )}
                <InfoItem label="계약일" value={contractData.contractDate} />
                <InfoItem label="입주 가능일" value={contractData.moveInDate} />
              </div>
              <div className="pt-2 border-t">
                <InfoItem label="주소" value={contractData.address} full />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>중요 일정</CardTitle>
              <CardDescription>꼭 기억해야 할 날짜입니다</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <DateItem
                  label="잔금 납부일"
                  date={contractData.finalPaymentDate}
                  status="upcoming"
                  description="잔금을 납부하고 등기 이전을 확인하세요"
                />
                <DateItem
                  label="입주 가능일"
                  date={contractData.moveInDate}
                  status="info"
                  description="전입신고는 입주 후 14일 이내에 완료하세요"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {contractData.specialTerms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>특약 사항</CardTitle>
                <CardDescription>계약서에 명시된 특별 조항입니다</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {contractData.specialTerms.map((term, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-muted rounded-lg">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{term}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center pt-4"
        >
          <Button size="lg" onClick={onContinue} className="gap-2 text-lg px-8 py-6">
            내 맞춤 타임라인 생성하기
            <ChevronRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, full = false }: { label: string; value: string; full?: boolean }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function DateItem({
  label,
  date,
  status,
  description
}: {
  label: string;
  date: string;
  status: "upcoming" | "info";
  description: string;
}) {
  return (
    <div className="flex gap-3 p-4 bg-muted rounded-lg">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          status === "upcoming" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
        }`}
      >
        <AlertCircle className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium">{label}</p>
          <Badge variant="outline">{date}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function FileText({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
