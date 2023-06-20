import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { makePositive, priceFormatter, titleCase } from "../../actions/common";
import { useDispatch, useSelector } from "react-redux";
import { getAllTotalData } from "../../actions/auth";
import Select from "react-select";
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


function Admin(props) {
  const date = new Date();
  const currentYear = date.getFullYear();
  const user_id = props.auth.userdata.id;
  const dispatch = useDispatch();
  const totalData = useSelector((state) => state.authReducer).totalData;
  const [totalProfitLoss, setTotalProfitLoss] = useState(0);
  const [yearList, setYearList] = useState([]);
  const [yearValue, setYearValue] = useState({
    label: currentYear,
    value: currentYear,
  });
  const [buyMonths,setBuyMonths] = useState([]);
  const [buyList,setBuyListValue] = useState([]);
  const [sellList,setSellListValue] = useState([]);
  const [expenseList,setExpenseListValue] = useState([]);
  const [profitList,setProfitListValue] = useState([]);

  
  const labels = buyMonths;
  const totalBuy = buyList;
  const totalSell = sellList;
  const totalExpense = expenseList;
  const totalProfit = profitList;
  const options = {
    responsive: true,
    bezierCurve:true,
    plugins: {
      legend: {
        display: false,
      },
    },
  
    // Modify the axis by adding scales
    scales: {
      // to remove the labels
      x: {
        ticks: {
          display: false,
        },
  
        // to remove the x-axis grid
        grid: {
          drawBorder: false,
          display: false,
        },
        border:{
          display:false
        }
      },
      // to remove the y-axis labels
      y: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        // to remove the y-axis grid
        grid: {
          drawBorder: false,
          display: false,
        },
        border:{
          display:false
        }
      },
    },
    elements: {
      line: {
          tension: 0.3,
      },
  },
  };
 const buyChart = {
    labels,
    datasets: [
   
      {
        label: 'Total Buy',
        data: totalBuy.map((amount) => amount),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const sellChart = {
    labels,
    datasets: [
   
      {
        label: 'Total Sell',
        data: totalSell.map((amount) => amount),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const expenseChart = {
    labels,
    datasets: [
   
      {
        label: 'Total Expense',
        data: totalExpense.map((amount) => amount),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  
  const profitChart = {
    labels,
    datasets: [
   
      {
        label: 'Total',
        data: totalProfit.map((amount) => amount),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


  useEffect(() => {
    dispatch(getAllTotalData({ user_id: user_id, year: currentYear }));
  }, []);

  useEffect(() => {
    let months = [];
    let buyListMonth = [];
    let sellListMonth = [];
    let expenseListMonth = [];
    let profitListMonth = [];

    if(totalData){
    let yearList = [
      { label: currentYear, value: currentYear },
      { label: 2024, value: 2024 },
    ];
    let totalProfitLoss =
      parseInt(totalData.sale) -
      (parseInt(totalData.buy) +
        parseInt(totalData.investment) +
        parseInt(totalData.rent));
    setTotalProfitLoss(totalProfitLoss);
    if (totalData.year && totalData.year.length) {
      totalData.year.map((item) => {
        yearList.push({ label: item, value: item });
      });
    }
if(totalData.buyMonths){
  Object.entries(totalData.buyMonths).forEach(([key, value]) => {
    months.push(key);
    buyListMonth.push(value);
  });

}
if(totalData.saleMonths){
  Object.entries(totalData.saleMonths).forEach(([key, value]) => {
    sellListMonth.push(value);
  });

}
if(totalData.expenseMonths){
  Object.entries(totalData.expenseMonths).forEach(([key, value]) => {
    expenseListMonth.push(value);
  });

}

if(totalData.profitMonths){
  Object.entries(totalData.profitMonths).forEach(([key, value]) => {
    profitListMonth.push(value);
  });

}




setYearList(yearList);
    setBuyMonths(months);
    setBuyListValue(buyListMonth);
    setSellListValue(sellListMonth);
    setExpenseListValue(expenseListMonth);
    setProfitListValue(profitListMonth);
  }
  }, [totalData]);

  const handleSelectChange = (e) => {
    dispatch(getAllTotalData({ user_id: user_id, year: e.value }));
    setYearValue(e);
  };

  return (
    <>
    <Header heading="Dashboard" {...props} />
    <div className="body-content">
      <div className="body-content-wrap">
      {totalData?
      <>
      <div>
          <label>Select year</label>
          <Select
            id="year"
            options={yearList}
            onChange={(e) => handleSelectChange(e)}
            value={yearValue}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                primary25: "rgb(0 120 219 / 10%);",
                primary: "#0078db",
              },
            })}
          />
        </div>
  
        <div className="desktop-wrap">
          <div className="desktop-box">
           <div className="desktop-box-inr">
           <p>Total buy</p>
           <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 5.5H19L18 19H2L1 5.5Z" stroke="black" stroke-width="2" stroke-linejoin="round"/>
<path d="M6 7.5V1H14V7.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 15H14" stroke="black" stroke-width="2" stroke-linecap="round"/>
</svg>

           <h3>{priceFormatter(totalData.buy)}</h3>
           <Line options={options} data={buyChart} />
           </div>
          </div>
          <div className="desktop-box">
          <div className="desktop-box-inr">
            <p>Total Sell</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.41 11.41L12.58 2.58C12.21 2.21 11.7 2 11.17 2H4C2.9 2 2 2.9 2 4V11.17C2 11.7 2.21 12.21 2.59 12.58L11.42 21.41C12.2 22.19 13.47 22.19 14.25 21.41L21.42 14.24C22.2 13.46 22.2 12.2 21.41 11.41ZM12.83 20L4 11.17V4H11.17L20 12.83L12.83 20Z" fill="black"></path><path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" fill="black"></path></svg>            
            <h3>{priceFormatter(totalData.sale)}</h3>
            <Line options={options} data={sellChart} />
            </div>
          </div>
          <div className="desktop-box">
          <div className="desktop-box-inr">
            <p>Total Expenses</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 18L17.5 15.5L15.0002 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 18L21.5 15.5L19.0002 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.5 11V4.5C21.5 3.94771 21.0523 3.5 20.5 3.5H3.5C2.94771 3.5 2.5 3.94771 2.5 4.5V19.5C2.5 20.0523 2.94771 20.5 3.5 20.5H14.2353" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.5 7.5L9 10.5L11.5 7.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 13.5H12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 10.5H12" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 10.5V16.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            <h3>{priceFormatter(totalData.investment+totalData.rent)}</h3>
            <Line options={options} data={expenseChart} />
            </div>
          </div>
          <div className="desktop-box">
          <div className="desktop-box-inr">
            <p>{totalProfitLoss < 0 ? "Total Loss " : "Total Profit "}</p>
            <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.78875 12.4525H1.66375C1.51713 12.4524 1.37628 12.5096 1.27121 12.6119C1.16614 12.7142 1.10516 12.8534 1.10125 13V19.75C1.10125 19.8992 1.16051 20.0423 1.266 20.1477C1.37149 20.2532 1.51457 20.3125 1.66375 20.3125H5.78875C5.93793 20.3125 6.08101 20.2532 6.1865 20.1477C6.29199 20.0423 6.35125 19.8992 6.35125 19.75V13C6.34734 12.8534 6.28635 12.7142 6.18129 12.6119C6.07622 12.5096 5.93537 12.4524 5.78875 12.4525ZM5.22625 19.2025H2.22625V13.5775H5.22625V19.2025ZM12.0625 9.4525H7.9375C7.79088 9.45245 7.65003 9.50965 7.54496 9.61191C7.43989 9.71418 7.37891 9.85343 7.375 10V19.75C7.375 19.8992 7.43426 20.0423 7.53975 20.1477C7.64524 20.2532 7.78831 20.3125 7.9375 20.3125H12.0625C12.2117 20.3125 12.3548 20.2532 12.4602 20.1477C12.5657 20.0423 12.625 19.8992 12.625 19.75V10C12.6211 9.85343 12.5601 9.71418 12.455 9.61191C12.35 9.50965 12.2091 9.45245 12.0625 9.4525ZM11.5 19.2025H8.5V10.5775H11.5V19.2025ZM18.3362 6.4525H14.2112C14.0621 6.4525 13.919 6.51176 13.8135 6.61725C13.708 6.72274 13.6487 6.86581 13.6487 7.015V19.75C13.6487 19.8992 13.708 20.0423 13.8135 20.1477C13.919 20.2532 14.0621 20.3125 14.2112 20.3125H18.3362C18.4854 20.3125 18.6285 20.2532 18.734 20.1477C18.8395 20.0423 18.8987 19.8992 18.8987 19.75V7C18.8948 6.85343 18.8339 6.71418 18.7288 6.61191C18.6237 6.50965 18.4829 6.45245 18.3362 6.4525ZM17.7737 19.2025H14.7737V7.5775H17.7737V19.2025ZM2.93875 8.5C2.98828 8.55483 3.02652 8.61888 3.05129 8.68849C3.07607 8.7581 3.08688 8.83191 3.08312 8.9057C3.07936 8.97949 3.0611 9.05182 3.02938 9.11855C2.99765 9.18529 2.9531 9.24511 2.89825 9.29462L2.8975 9.295L1.62625 10.4425C1.57312 10.4997 1.50865 10.5453 1.43695 10.5762C1.36525 10.6072 1.28789 10.6229 1.2098 10.6223C1.1317 10.6217 1.05458 10.6049 0.983348 10.5729C0.912116 10.5409 0.848332 10.4944 0.796058 10.4363C0.743785 10.3783 0.704166 10.31 0.679726 10.2359C0.655287 10.1617 0.646561 10.0832 0.654104 10.0055C0.661648 9.92776 0.685296 9.85246 0.723542 9.78436C0.761788 9.71627 0.813795 9.65689 0.87625 9.61L2.125 8.45875C2.18026 8.40629 2.24561 8.36561 2.31707 8.33918C2.38853 8.31274 2.46462 8.3011 2.54072 8.30496C2.61681 8.30881 2.69133 8.32809 2.75975 8.36162C2.82818 8.39515 2.88907 8.44222 2.93875 8.5ZM16.6787 0.358749H13.8737C13.7246 0.358749 13.5815 0.418013 13.476 0.523502C13.3705 0.628991 13.3112 0.772065 13.3112 0.921249C13.3112 1.07043 13.3705 1.21351 13.476 1.319C13.5815 1.42449 13.7246 1.48375 13.8737 1.48375H15.0925L8.545 7L6.6475 5.1025C6.54549 5.0013 6.40863 4.94297 6.26498 4.93948C6.12133 4.936 5.98179 4.98762 5.875 5.08375L3.5425 7.195C3.44692 7.29798 3.39333 7.43299 3.39229 7.57349C3.39125 7.71398 3.44282 7.84978 3.53686 7.95417C3.6309 8.05855 3.7606 8.12397 3.90044 8.13754C4.04028 8.15111 4.18014 8.11185 4.2925 8.0275L6.2275 6.27625L8.1025 8.15125C8.20189 8.24771 8.33337 8.3041 8.47176 8.30964C8.61015 8.31518 8.74572 8.26946 8.8525 8.18125L16.0637 2.09125V3.5575C16.0637 3.70668 16.123 3.84976 16.2285 3.95525C16.334 4.06074 16.4771 4.12 16.6262 4.12C16.7754 4.12 16.9185 4.06074 17.024 3.95525C17.1295 3.84976 17.1887 3.70668 17.1887 3.5575V0.876249C17.1887 0.623499 17.0102 0.358749 16.6787 0.358749Z" fill="black"/>
</svg>
            <h3>{priceFormatter(makePositive(totalProfitLoss))}</h3>
            <Line options={options} data={profitChart} />
            </div>
          </div>
          <div className="desktop-box">
          <div className="desktop-box-inr">
            <p>Total Pending rent</p>
            <h3>{priceFormatter(totalData.pending_rent)}</h3>
            </div>
          </div>
          <div className="desktop-box">
          <div className="desktop-box-inr">
            <p>Total balance amount</p>
            <h3>
              {priceFormatter(makePositive(totalData.balance_amount))}
              {totalData.balance_amount > 0 ? " Dr." : " Cr."}
            </h3>
            </div>
          </div>
         
        </div>
        </>
      :""}
      </div>
    </div>
  </>
  );
}

export default Admin;
