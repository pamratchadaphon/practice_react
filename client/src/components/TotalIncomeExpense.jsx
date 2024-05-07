const TotalIncomeExpense = ({ totalIncome, totalExpense }) => {
    
  return (
    <div>
      <div>
        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4">
            <div className="border p-4 bg-pink-400 flex flex-col h-full rounded-2xl">
              <span className="text-sm font-semibold">รายรับ</span>
              <span className="text-lg font-bold">
                {totalIncome.toLocaleString()} บาท
              </span>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4">
            <div className="border p-4 rounded-2xl bg-violet-400 flex flex-col h-full">
              <span className="text-sm font-semibold">รายจ่าย</span>
              <span className="text-lg font-bold">
                {totalExpense.toLocaleString()} บาท
              </span>
            </div>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2 mb-4">
            <div className="border p-4 rounded-2xl bg-orange-400 flex flex-col h-full">
              <span className="text-sm font-semibold">คงเหลือ</span>
              <span className="text-lg font-bold">
                {(totalIncome - totalExpense).toLocaleString()} บาท
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalIncomeExpense;
