import {
  ArrowLeft,
  Lightbulb,
  CheckSquare,
  MessageSquare,
  Copy,
  Check,
  Share2,
  HelpCircle,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { useState } from "react";

interface ActionGuideProps {
  itemId: string;
  onBack: () => void;
}

interface GuideContent {
  title: string;
  category: string;
  date: string;
  daysFromNow: number;
  why: {
    title: string;
    content: string;
    example?: string;
  };
  how: {
    title: string;
    steps: string[];
  };
  glossary?: {
    term: string;
    definition: string;
    detail?: string;
  }[];
  questions: {
    target: string;
    texts: string[];
  }[];
  tips?: string[];
  warnings?: string[];
}

const guideData: Record<string, GuideContent> = {
  "2": {
    title: "등기부등본 확인",
    category: "계약 전 필수",
    date: "2026-05-12",
    daysFromNow: 5,
    why: {
      title: "왜 해야 하나요?",
      content:
        "등기부등본은 집의 '신분증'이에요. 진짜 주인이 누구인지, 집에 빚이 얼마나 있는지 확인할 수 있어요. 만약 집에 빚(근저당)이 너무 많으면, 나중에 집이 경매로 넘어가도 내 보증금을 못 받을 수 있어요.",
      example:
        "예를 들어, 5억원짜리 집에 근저당이 5억 2천만원이면 집값보다 빚이 더 많은 '깡통전세'일 가능성이 높아요. 이런 경우 보증금을 돌려받기 어려울 수 있어요."
    },
    how: {
      title: "어떻게 하나요?",
      steps: [
        "인터넷등기소(www.iros.go.kr) 접속",
        "공동인증서 또는 간편인증으로 로그인",
        "등기열람/발급 메뉴에서 주소 검색",
        "등기부등본(말소사항 포함) 발급 (수수료 700원)",
        "갑구와 을구를 꼼꼼히 확인하기"
      ]
    },
    glossary: [
      {
        term: "등기부등본",
        definition: "부동산의 소유권과 권리관계가 기록된 공식 문서",
        detail: "집의 주인이 누구인지, 빚은 얼마나 있는지 모두 기록되어 있어요"
      },
      {
        term: "근저당권",
        definition: "대출을 받을 때 부동산을 담보로 설정한 권리",
        detail: "집주인이 은행에서 돈을 빌릴 때 집을 담보로 잡힌 거예요. 보통 시세의 70% 이하면 안전해요"
      },
      {
        term: "갑구",
        definition: "소유권에 관한 사항이 기록된 부분",
        detail: "진짜 주인이 누구인지, 소유권이 바뀐 이력을 확인할 수 있어요"
      },
      {
        term: "을구",
        definition: "소유권 외의 권리(근저당, 전세권 등)가 기록된 부분",
        detail: "집에 걸린 빚이나 다른 권리들을 확인할 수 있어요"
      }
    ],
    questions: [
      {
        target: "중개사",
        texts: [
          "중개사님, 등기부등본상 근저당 설정액이 5억 2천만원인데, 잔금 치르기 전에 반드시 말소되는 거 맞나요?",
          "근저당 말소 확인증을 제게도 보여주실 수 있을까요?"
        ]
      },
      {
        target: "집주인",
        texts: [
          "임대인님, 등기부등본을 확인했는데 근저당이 있더라고요. 잔금일에 말소하실 계획이신가요?",
          "말소 확인서를 받을 수 있을까요?"
        ]
      }
    ],
    tips: [
      "등기부등본은 반드시 '말소사항 포함'으로 발급받으세요",
      "잔금일 당일 아침에 한 번 더 발급받아 확인하는 것이 안전해요",
      "근저당 금액이 시세의 70%를 넘으면 주의가 필요해요"
    ],
    warnings: [
      "가압류, 가처분이 있다면 계약을 재고해야 해요",
      "소유자와 계약 당사자가 다르다면 위임장을 꼭 확인하세요"
    ]
  },
  "4": {
    title: "임대차 신고",
    category: "법적 의무",
    date: "2026-06-05",
    daysFromNow: 29,
    why: {
      title: "왜 해야 하나요?",
      content:
        "보증금 6천만원(서울 수도권 기준) 이상의 전월세 계약은 법으로 의무화된 절차예요. 신고하지 않으면 최대 100만원의 과태료가 부과될 수 있어요.",
      example:
        "계약 체결일로부터 30일 이내에 신고해야 하며, 임대인과 임차인이 함께 신고하는 것이 원칙이에요."
    },
    how: {
      title: "어떻게 하나요?",
      steps: [
        "정부24 또는 부동산거래관리시스템 접속",
        "임대차 계약 신고 메뉴 선택",
        "계약서 정보 입력 (주소, 계약일, 보증금 등)",
        "임대인 동의 확인 (임대인도 함께 신청하거나 동의서 첨부)",
        "신고 완료 후 확인증 출력"
      ]
    },
    glossary: [
      {
        term: "임대차 신고제",
        definition: "일정 금액 이상의 전월세 계약을 정부에 신고하는 제도",
        detail: "전월세 시장을 투명하게 관리하고 임차인을 보호하기 위한 제도예요"
      }
    ],
    questions: [
      {
        target: "중개사",
        texts: [
          "중개사님, 임대차 신고는 제가 직접 해야 하나요 아니면 도와주시나요?",
          "신고할 때 필요한 서류가 더 있을까요?"
        ]
      },
      {
        target: "집주인",
        texts: [
          "임대인님, 임대차 신고를 해야 하는데 함께 신고하시거나 동의서를 주실 수 있나요?",
          "혹시 신고에 필요한 임대인 정보를 알려주실 수 있을까요?"
        ]
      }
    ],
    tips: [
      "임대인이 비협조적이라면 임차인 단독으로도 신고 가능해요",
      "신고 기한(30일)을 놓치지 않도록 알람을 설정하세요"
    ],
    warnings: ["신고하지 않으면 최대 100만원의 과태료가 부과될 수 있어요"]
  }
};

export function ActionGuide({ itemId, onBack }: ActionGuideProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const guide = guideData[itemId];

  if (!guide) {
    return (
      <div className="min-h-screen p-4 py-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            돌아가기
          </Button>
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">가이드를 준비 중입니다.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleCopy = (text: string, index: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleShare = (text: string) => {
    if (navigator.share) {
      navigator.share({ text });
    } else {
      handleCopy(text, "share");
    }
  };

  return (
    <div className="min-h-screen p-4 py-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="ghost" onClick={onBack} className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          돌아가기
        </Button>

        {/* 헤더 */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="mb-3">
                  {guide.category}
                </Badge>
                {guide.daysFromNow <= 7 && (
                  <Badge variant="destructive" className="text-base px-3 py-1">
                    D-{guide.daysFromNow}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-medium mb-2">{guide.title}</h1>
              <p className="text-sm opacity-90">{guide.date}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI 코칭 - 왜 해야 하나요? */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                {guide.why.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">{guide.why.content}</p>
              {guide.why.example && (
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-blue-900">
                    <span className="font-medium">💡 예시: </span>
                    {guide.why.example}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* 행동 지침 - 어떻게 하나요? */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-green-600" />
                {guide.how.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {guide.how.steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="flex-1 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 용어 설명 */}
        {guide.glossary && guide.glossary.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  어려운 용어 풀이
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {guide.glossary.map((item, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">{item.term}</h4>
                    <p className="text-sm text-blue-800 mb-2">{item.definition}</p>
                    {item.detail && (
                      <p className="text-sm text-blue-700 bg-blue-100/50 p-2 rounded">
                        {item.detail}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 질문 문구 만들기 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                질문 문구 만들기
              </CardTitle>
              <CardDescription>
                아래 문구를 복사해서 중개사님이나 집주인에게 전달하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {guide.questions.map((q, qIndex) => (
                <div key={qIndex}>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{q.target}에게</p>
                  <div className="space-y-2">
                    {q.texts.map((text, tIndex) => {
                      const copyId = `${qIndex}-${tIndex}`;
                      const isCopied = copiedIndex === copyId;
                      return (
                        <div
                          key={tIndex}
                          className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                        >
                          <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <p className="flex-1 text-sm">{text}</p>
                          <div className="flex gap-2 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCopy(text, copyId)}
                              className="gap-1"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  복사됨
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  복사
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleShare(text)}
                              className="gap-1"
                            >
                              <Share2 className="w-3 h-3" />
                              공유
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* 꿀팁 */}
        {guide.tips && guide.tips.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                  꿀팁
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {guide.tips.map((tip, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-600">💡</span>
                    <p className="text-sm flex-1">{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 주의사항 */}
        {guide.warnings && guide.warnings.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-900">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  주의사항
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {guide.warnings.map((warning, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-white rounded-lg border border-red-200">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm flex-1 text-red-900">{warning}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
