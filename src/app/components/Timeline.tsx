import {
  CheckCircle2,
  Circle,
  Calendar,
  FileText,
  Home,
  CreditCard,
  AlertCircle,
  MapPin,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import { useState } from "react";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  daysFromNow: number;
  status: "completed" | "upcoming" | "pending";
  category: "contract" | "payment" | "registration" | "loan" | "moving";
  checklist: ChecklistItem[];
  tips?: string[];
  glossary?: GlossaryTerm[];
}

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface GlossaryTerm {
  term: string;
  definition: string;
}

interface TimelineProps {
  contractData: any;
  userInfo: any;
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
      return "bg-blue-100 text-blue-600";
    case "payment":
      return "bg-green-100 text-green-600";
    case "registration":
      return "bg-purple-100 text-purple-600";
    case "loan":
      return "bg-orange-100 text-orange-600";
    case "moving":
      return "bg-pink-100 text-pink-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export function Timeline({ contractData, userInfo }: TimelineProps) {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    {
      id: "1",
      title: "계약금 납부",
      description: "계약금을 지불하고 계약서를 작성합니다",
      date: "2026-05-10",
      daysFromNow: 3,
      status: "upcoming",
      category: "payment",
      checklist: [
        { id: "1-1", text: "계약금 준비 (보증금의 10%)", completed: false },
        { id: "1-2", text: "신분증 지참", completed: false },
        { id: "1-3", text: "인감도장 또는 서명 준비", completed: false },
        { id: "1-4", text: "계약서 사본 수령", completed: false }
      ],
      tips: [
        "계약금은 보통 보증금의 10% 정도입니다",
        "계약서는 반드시 2부 작성하여 1부씩 보관하세요"
      ]
    },
    {
      id: "2",
      title: "등기부등본 확인",
      description: "계약 전 반드시 최신 등기부등본을 확인하세요",
      date: "2026-05-12",
      daysFromNow: 5,
      status: "pending",
      category: "contract",
      checklist: [
        { id: "2-1", text: "인터넷등기소에서 등기부등본 발급", completed: false },
        { id: "2-2", text: "소유권 확인 (임대인 명의 일치 여부)", completed: false },
        { id: "2-3", text: "근저당권 및 가압류 여부 확인", completed: false },
        { id: "2-4", text: "전세권 설정 여부 검토", completed: false }
      ],
      tips: [
        "등기부등본은 대법원 인터넷등기소(www.iros.go.kr)에서 발급 가능합니다",
        "근저당권 금액이 시세의 70%를 초과하면 주의가 필요합니다"
      ],
      glossary: [
        {
          term: "등기부등본",
          definition: "부동산의 소유권, 권리관계 등이 기재된 공적 문서입니다"
        },
        {
          term: "근저당권",
          definition: "대출을 받을 때 부동산을 담보로 설정한 권리입니다"
        }
      ]
    },
    ...(userInfo.hasLoan
      ? [
          {
            id: "3",
            title: "전세자금 대출 신청",
            description: "은행에 전세자금 대출을 신청합니다",
            date: "2026-05-20",
            daysFromNow: 13,
            status: "pending" as const,
            category: "loan" as const,
            checklist: [
              { id: "3-1", text: "대출 가능 은행 비교", completed: false },
              { id: "3-2", text: "필요 서류 준비 (계약서, 등기부등본, 소득증빙)", completed: false },
              { id: "3-3", text: "대출 신청서 작성", completed: false },
              { id: "3-4", text: "대출 승인 확인", completed: false }
            ],
            tips: [
              "여러 은행의 금리와 조건을 비교해보세요",
              "보증금의 최대 80%까지 대출 가능합니다"
            ]
          }
        ]
      : []),
    {
      id: "4",
      title: "잔금 납부 및 입주",
      description: "잔금을 납부하고 열쇠를 받습니다",
      date: contractData.finalPaymentDate,
      daysFromNow: 30,
      status: "pending",
      category: "payment",
      checklist: [
        { id: "4-1", text: "잔금 준비", completed: false },
        { id: "4-2", text: "등기부등본 최종 확인 (당일 재발급)", completed: false },
        { id: "4-3", text: "전입세대 열람 확인", completed: false },
        { id: "4-4", text: "공과금 정산 확인", completed: false },
        { id: "4-5", text: "열쇠 수령 및 확인", completed: false },
        { id: "4-6", text: "현관, 수도, 전기 등 시설 점검", completed: false }
      ],
      tips: [
        "잔금 납부 당일 아침에 등기부등본을 다시 확인하세요",
        "공과금 미납이 있는지 반드시 확인하고 정산하세요"
      ],
      glossary: [
        {
          term: "전입세대 열람",
          definition: "해당 주소지에 등록된 세대원을 확인하는 서류입니다"
        }
      ]
    },
    {
      id: "5",
      title: "전입신고",
      description: "입주 후 14일 이내에 전입신고를 완료하세요",
      date: "2026-06-20",
      daysFromNow: 44,
      status: "pending",
      category: "registration",
      checklist: [
        { id: "5-1", text: "신분증 준비", completed: false },
        { id: "5-2", text: "임대차계약서 사본 지참", completed: false },
        { id: "5-3", text: "주민센터 방문 또는 온라인 신고", completed: false },
        { id: "5-4", text: "전입신고 확인증 수령", completed: false }
      ],
      tips: [
        "전입신고는 정부24 또는 주민센터에서 가능합니다",
        "전입신고를 해야 확정일자를 받을 수 있습니다"
      ],
      glossary: [
        {
          term: "확정일자",
          definition:
            "전입신고 시 받는 날짜로, 이후 발생하는 권리 변동에 우선권을 갖게 됩니다"
        }
      ]
    },
    {
      id: "6",
      title: "확정일자 받기",
      description: "전입신고와 함께 확정일자를 받으세요",
      date: "2026-06-20",
      daysFromNow: 44,
      status: "pending",
      category: "registration",
      checklist: [
        { id: "6-1", text: "주민센터 또는 온라인에서 신청", completed: false },
        { id: "6-2", text: "임대차계약서에 확정일자 날인 확인", completed: false }
      ],
      tips: [
        "확정일자는 전입신고와 동시에 받는 것이 안전합니다",
        "확정일자를 받아야 임차권 우선변제권을 행사할 수 있습니다"
      ],
      glossary: [
        {
          term: "우선변제권",
          definition:
            "집이 경매로 넘어가도 다른 채권자보다 먼저 보증금을 돌려받을 수 있는 권리입니다"
        }
      ]
    }
  ]);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(["1"]));

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const toggleChecklistItem = (itemId: string, checklistId: string) => {
    setTimelineItems((items) =>
      items.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            checklist: item.checklist.map((check) =>
              check.id === checklistId ? { ...check, completed: !check.completed } : check
            )
          };
        }
        return item;
      })
    );
  };

  const completedCount = timelineItems.reduce((acc, item) => {
    const completed = item.checklist.filter((c) => c.completed).length;
    return acc + completed;
  }, 0);

  const totalCount = timelineItems.reduce((acc, item) => acc + item.checklist.length, 0);
  const progressPercent = (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen p-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-medium mb-2">입주까지 맞춤 가이드</h1>
                <p className="text-sm opacity-90">
                  체크리스트를 따라가며 안전하게 계약을 완료하세요
                </p>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {completedCount}/{totalCount}
              </Badge>
            </div>
            <Progress value={progressPercent} className="h-3 bg-primary-foreground/20" />
          </CardContent>
        </Card>

        <div className="space-y-4">
          {timelineItems.map((item, index) => {
            const Icon = getCategoryIcon(item.category);
            const isExpanded = expandedItems.has(item.id);
            const itemCompletedCount = item.checklist.filter((c) => c.completed).length;
            const itemTotalCount = item.checklist.length;

            return (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getCategoryColor(item.category)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        {item.daysFromNow <= 7 && (
                          <Badge variant="destructive" className="text-xs">
                            D-{item.daysFromNow}
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {item.date} · {item.description}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${(itemCompletedCount / itemTotalCount) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                          {itemCompletedCount}/{itemTotalCount}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </Button>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="border-t pt-6 space-y-6">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        체크리스트
                      </h4>
                      <div className="space-y-2">
                        {item.checklist.map((check) => (
                          <div
                            key={check.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <Checkbox
                              id={check.id}
                              checked={check.completed}
                              onCheckedChange={() => toggleChecklistItem(item.id, check.id)}
                            />
                            <label
                              htmlFor={check.id}
                              className={`flex-1 cursor-pointer ${
                                check.completed ? "line-through text-muted-foreground" : ""
                              }`}
                            >
                              {check.text}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {item.tips && item.tips.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          꿀팁
                        </h4>
                        <div className="space-y-2">
                          {item.tips.map((tip, i) => (
                            <div key={i} className="flex gap-2 p-3 bg-orange-50 text-orange-900 rounded-lg">
                              <span className="text-orange-600">•</span>
                              <p className="text-sm flex-1">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.glossary && item.glossary.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-blue-600" />
                          용어 설명
                        </h4>
                        <div className="space-y-2">
                          {item.glossary.map((term, i) => (
                            <div key={i} className="p-3 bg-blue-50 rounded-lg">
                              <p className="font-medium text-blue-900 mb-1">{term.term}</p>
                              <p className="text-sm text-blue-800">{term.definition}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <AlertCircle className="w-5 h-5" />
              <p>
                모든 절차가 완료되면 임차권 우선변제권이 확보됩니다. 혹시 궁금한 점이 있다면 언제든
                물어보세요!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
