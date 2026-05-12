import { useState } from "react";
import { ContractUpload } from "./components/ContractUpload";
import { ContractAnalysis } from "./components/ContractAnalysis";
import { UserInfoForm } from "./components/UserInfoForm";
import { Dashboard } from "./components/Dashboard";
import { ActionGuide } from "./components/ActionGuide";

type Step = "upload" | "analysis" | "userInfo" | "dashboard" | "actionGuide";

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

interface UserInfo {
  isFirstTime: boolean;
  hasLoan: boolean;
  wantsRegistrationHelp: boolean;
}

export default function App() {
  const [step, setStep] = useState<Step>("upload");
  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleUpload = (file: File) => {
    // Mock data - 실제로는 AI가 계약서를 파싱함
    const mockContractData: ContractData = {
      type: "전세",
      deposit: 50000,
      contractDate: "2026-05-07",
      moveInDate: "2026-06-06",
      finalPaymentDate: "2026-06-06",
      address: "서울특별시 강남구 테헤란로 123, 456호",
      landlord: "김임대",
      tenant: "이세입",
      specialTerms: [
        "임차인은 입주 전 보일러 및 배관 점검을 실시할 수 있다",
        "임대인은 계약기간 중 임대료 인상을 요구하지 않는다",
        "반려동물 양육 가능 (소형견 1마리)"
      ]
    };

    setContractData(mockContractData);
    setStep("analysis");
  };

  const handleContinueFromAnalysis = () => {
    setStep("userInfo");
  };

  const handleUserInfoSubmit = (info: UserInfo) => {
    setUserInfo(info);
    setStep("dashboard");
  };

  const handleItemClick = (item: any) => {
    setSelectedItemId(item.id);
    setStep("actionGuide");
  };

  const handleBackToDashboard = () => {
    setSelectedItemId(null);
    setStep("dashboard");
  };

  return (
    <div className="size-full">
      {step === "upload" && <ContractUpload onUpload={handleUpload} />}
      {step === "analysis" && contractData && (
        <ContractAnalysis
          contractData={contractData}
          onContinue={handleContinueFromAnalysis}
        />
      )}
      {step === "userInfo" && <UserInfoForm onSubmit={handleUserInfoSubmit} />}
      {step === "dashboard" && contractData && userInfo && (
        <Dashboard
          contractData={contractData}
          userInfo={userInfo}
          onItemClick={handleItemClick}
        />
      )}
      {step === "actionGuide" && selectedItemId && (
        <ActionGuide itemId={selectedItemId} onBack={handleBackToDashboard} />
      )}
    </div>
  );
}