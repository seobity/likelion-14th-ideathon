import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useState } from "react";

interface UserInfo {
  isFirstTime: boolean;
  hasLoan: boolean;
  wantsRegistrationHelp: boolean;
}

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
}

export function UserInfoForm({ onSubmit }: UserInfoFormProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    isFirstTime: true,
    hasLoan: false,
    wantsRegistrationHelp: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  return (
    <div className="min-h-screen p-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-medium mb-2">추가 정보를 알려주세요</h1>
          <p className="text-muted-foreground">
            더 정확한 맞춤 가이드를 제공하기 위해 몇 가지 질문에 답해주세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>계약 경험</CardTitle>
              <CardDescription>이전에 전월세 계약을 해보신 적이 있나요?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={userInfo.isFirstTime ? "first" : "experienced"}
                onValueChange={(value) =>
                  setUserInfo({ ...userInfo, isFirstTime: value === "first" })
                }
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="first" id="first" />
                  <Label htmlFor="first" className="flex-1 cursor-pointer">
                    처음입니다
                    <span className="block text-sm text-muted-foreground font-normal">
                      기본적인 절차부터 자세히 안내해드릴게요
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="experienced" id="experienced" />
                  <Label htmlFor="experienced" className="flex-1 cursor-pointer">
                    경험이 있습니다
                    <span className="block text-sm text-muted-foreground font-normal">
                      중요한 포인트 위주로 안내해드릴게요
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>대출 계획</CardTitle>
              <CardDescription>전세자금 대출을 받으실 계획이신가요?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={userInfo.hasLoan ? "yes" : "no"}
                onValueChange={(value) => setUserInfo({ ...userInfo, hasLoan: value === "yes" })}
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="yes" id="loan-yes" />
                  <Label htmlFor="loan-yes" className="flex-1 cursor-pointer">
                    예, 대출이 필요합니다
                    <span className="block text-sm text-muted-foreground font-normal">
                      대출 신청 절차도 함께 안내해드릴게요
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="no" id="loan-no" />
                  <Label htmlFor="loan-no" className="flex-1 cursor-pointer">
                    아니요, 자금이 준비되어 있습니다
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>전입신고 안내</CardTitle>
              <CardDescription>
                입주 후 전입신고 절차를 상세히 안내받고 싶으신가요?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={userInfo.wantsRegistrationHelp ? "yes" : "no"}
                onValueChange={(value) =>
                  setUserInfo({ ...userInfo, wantsRegistrationHelp: value === "yes" })
                }
              >
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="yes" id="reg-yes" />
                  <Label htmlFor="reg-yes" className="flex-1 cursor-pointer">
                    네, 자세히 알려주세요
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="no" id="reg-no" />
                  <Label htmlFor="reg-no" className="flex-1 cursor-pointer">
                    아니요, 알고 있습니다
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg" className="gap-2">
              맞춤 일정 생성하기
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
