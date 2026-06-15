import { useCallback, useState, useEffect } from "react";
import { dummyPayslipData, dummyEmployeeData } from "../assets/assets"; 
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipForm from "../components/payslip/GeneratePayslipForm";

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = true; // Replace with actual role check

  const fetchPayslips = useCallback(async () => {
    setPayslips(dummyPayslipData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  useEffect(() => {
    if (isAdmin) {
      setEmployees(dummyEmployeeData);
    }
  }, [isAdmin]);

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in p-6 w-full">
      {/* Header wrapper ko flex kiya taaki text left mein aur button right mein jaye */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="page-title text-2xl font-bold text-slate-800">Payslips</h1>
          <p className="page-subtitle text-slate-500 text-sm mt-1">
            {isAdmin ? "Generate and manage employee payslips" : "Your payslip history"}
          </p>
        </div>
        
       {isAdmin && (
          <GeneratePayslipForm employees={employees} onSuccess={fetchPayslips} />
        )}
        
      </div>

      {/* Payslip list component */}
      <PayslipList payslips={payslips} isAdmin={isAdmin} />
    </div>
  );
};

export default Payslips;