import {
  CheckCircle2,
  Circle,
  Calendar,
  FileText,
  Home,
  CreditCard,
  AlertCircle,
  MapPin,
  ChevronRight,
  Clock
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { motion } from "motion/react";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  daysFromNow: number;
  status: "completed" | "current" | "upcoming";
  category: "contract" | "payment" | "registration" | "loan" | "moving";
  urgent?: boolean;
}

interface DashboardProps {
  contractData: any;
  userInfo: any;
  onItemClick: (item: TimelineItem) => void;
}

const getCategoryIcon = (category: TimelineItem["category"]) => {
  switch (category) {
    case "contract":
      return FileText;
    case "payment":
      return CreditCard;
    case "registration":
      return MapPin;
    case "loan":
      return CreditCard;
    case "moving":
      return Home;
    default:
      return Circle;
  }
};

const getCategoryColor = (category: TimelineItem["category"]) => {
  switch (category) {
    case "contract":
      return "bg-blue-500";
    case "payment":
      return "bg-green-500";
    case "registration":
      return "bg-purple-500";
    case "loan":
      return "bg-orange-500";
    case "moving":
      return "bg-pink-500";
    default:
      return "bg-gray-500";
  }
};

export function Dashboard({ contractData, userInfo, onItemClick }: DashboardProps) {
  const timelineItems: TimelineItem[] = [
    {
      id: "1",
      title: "계약금 납부",
      description: "계약금을 지불하고 계약서 작성",
      date: "2026-05-10",
      daysFromNow: 3,
      status: "completed",
      category: "payment"
    },
    {
      id: "2",
      title: "등기부등본 확인",
      description: "최신 등기부등본으로 권리관계 확인",
      date: "2026-05-12",
      daysFromNow: 5,
      status: "current",
      category: "contract",
      urgent: true
    },
    ...(userInfo.hasLoan
      ? [
          {
            id: "3",
            title: "전세자금 대출 신청",
            description: "은행에 전세자금 대출 신청",
            date: "2026-05-20",
            daysFromNow: 13,
            status: "upcoming" as const,
            category: "loan" as const
          }
        ]
      : []),
    {
      id: "4",
      title: "임대차 신고",
      description: "계약 체결일로부터 30일 이내 필수",
      date: "2026-06-05",
      daysFromNow: 29,
      status: "upcoming",
      category: "registration",
      urgent: true
    },
    {
      id: "5",
      title: "잔금 납부 및 입주",
      description: "잔금 납부하고 열쇠 수령",
      date: contractData.finalPaymentDate,
      daysFromNow: 30,
      status: "upcoming",
      category: "payment"
    },
    {
      id: "6",
      title: "전입신고 & 확정일자",
      description: "입주 후 14일 이내 완료",
      date: "2026-06-20",
      daysFromNow: 44,
      status: "upcoming",
      category: "registration"
    }
  ];

  const currentStepIndex = timelineItems.findIndex((item) => item.status === "current");
  const completedSteps = timelineItems.filter((item) => item.status === "completed").length;
  const progressPercent = (completedSteps / timelineItems.length) * 100;

  const todayTasks = timelineItems.filter(
    (item) => (item.status === "current" || item.urgent) && item.status !== "completed"
  );

  return (
    <div className="min-h-screen p-4 py-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 상단 진행 상태 */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm opacity-90 mb-1">현재 단계</p>
                  <h2 className="text-2xl font-medium">
                    {currentStepIndex + 1}/{timelineItems.length} 단계
                  </h2>
                  <p className="text-lg mt-1 opacity-95">
                    {timelineItems[currentStepIndex]?.title}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold mb-1">{Math.round(progressPercent)}%</div>
                  <p className="text-sm opacity-90">완료</p>
                </div>
              </div>
              <Progress value={progressPercent} className="h-2 bg-white/20" />
            </CardContent>
          </Card>
        </motion.div>

        {/* 이번 절차에서 해야 할 일 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  이번 절차에서 해야 할 일
                </CardTitle>
                <Badge variant="destructive">{todayTasks.length}개</Badge>
              </div>
              <CardDescription>놓치면 안 되는 중요한 절차입니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.map((task) => {
                const Icon = getCategoryIcon(task.category);
                return (
                  <motion.div
                    key={task.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-2 border-orange-200 cursor-pointer hover:border-orange-300 transition-colors"
                    onClick={() => onItemClick(task)}
                  >
                    <div className={`w-10 h-10 rounded-full ${getCategoryColor(task.category)} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{task.title}</p>
                        {task.daysFromNow <= 7 && (
                          <Badge variant="destructive" className="text-xs">
                            D-{task.daysFromNow}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {task.date}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* 전체 타임라인 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>전체 일정</CardTitle>
              <CardDescription>계약부터 입주까지의 모든 단계</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineItems.map((item, index) => {
                  const Icon = getCategoryIcon(item.category);
                  const isLast = index === timelineItems.length - 1;

                  return (
                    <div key={item.id} className="relative">
                      {!isLast && (
                        <div
                          className={`absolute left-5 top-12 bottom-0 w-0.5 ${
                            item.status === "completed" ? "bg-primary" : "bg-gray-200"
                          }`}
                        />
                      )}

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.01 }}
                        className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                          item.status === "current"
                            ? "bg-blue-50 border-2 border-blue-300"
                            : item.status === "completed"
                            ? "bg-gray-50 opacity-75"
                            : "bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => onItemClick(item)}
                      >
                        <div className="relative flex-shrink-0">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              item.status === "completed"
                                ? "bg-green-500"
                                : item.status === "current"
                                ? getCategoryColor(item.category)
                                : "bg-gray-300"
                            }`}
                          >
                            {item.status === "completed" ? (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            ) : (
                              <Icon className="w-5 h-5 text-white" />
                            )}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4
                              className={`font-medium ${
                                item.status === "completed" ? "line-through text-muted-foreground" : ""
                              }`}
                            >
                              {item.title}
                            </h4>
                            {item.status === "current" && (
                              <Badge variant="default" className="text-xs">
                                진행중
                              </Badge>
                            )}
                            {item.status === "upcoming" && item.daysFromNow <= 7 && (
                              <Badge variant="destructive" className="text-xs">
                                D-{item.daysFromNow}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </p>
                        </div>

                        {item.status !== "completed" && (
                          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
