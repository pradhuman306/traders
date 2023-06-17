import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { makePositive, priceFormatter, titleCase } from "../../actions/common";
import { useDispatch, useSelector } from "react-redux";
import { getAllTotalData } from "../../actions/auth";
import Select from "react-select";

function Admin(props) {
  const date = new Date();
  const currentYear = date.getFullYear();
  const user_id = props.auth.userdata.id;
  const dispatch = useDispatch();
  const totalData = useSelector((state) => state.authReducer).totalData;
  const [totalProfitLoss,setTotalProfitLoss] = useState(0);
  const [yearList,setYearList] = useState([]);
  const [yearValue,setYearValue] = useState({label:currentYear,value:currentYear});
  
  useEffect(()=>{
  dispatch(getAllTotalData({user_id:user_id,year:currentYear}));
  },[])


  

  useEffect(()=>{
   let yearList = [{label:currentYear,value:currentYear},{label:2024,value:2024}];
   let totalProfitLoss = parseInt(totalData.sale)-(parseInt(totalData.buy)+parseInt(totalData.investment)+parseInt(totalData.rent));
   setTotalProfitLoss(totalProfitLoss);
   if(totalData.year&&totalData.year.length){
    totalData.year.map((item)=>{
      yearList.push({label:item,value:item})
    })
   }
   setYearList(yearList);
    },[totalData])

    const handleSelectChange = (e) => {
      dispatch(getAllTotalData({user_id:user_id,year:e.value}));
      setYearValue(e);
    }

  return (
    <>

            <Header heading="Dashboard" {...props} />
      <div className="body-content">
        <div className="body-content-wrap">
        <h1 className="mt-0 mb-1">
           
        Hello {titleCase(props.auth.userdata.name)},
        </h1>
        <h4 className="sub-heading mb-3">Welcome note</h4>
        <p>Admin welcome content</p>
        <p>Total buy:{priceFormatter(totalData.buy)}</p>
        <p>Total Sell:{priceFormatter(totalData.sale)}</p>
        <p>Total Investment:{priceFormatter(totalData.investment)}</p>
        <p>Total Transport:{priceFormatter(totalData.rent)}</p>
        <p>Total Pending rent:{priceFormatter(totalData.pending_rent)}</p>
        <p>Total balance amount:{priceFormatter(totalData.balance_amount)}</p>
        <p className={`${totalProfitLoss<0 ? 'text-bg-danger':'text-bg-success'}`}>
          {totalProfitLoss<0?'Total Loss ':'Total Profit '}
          {priceFormatter(makePositive(totalProfitLoss))}
          </p>
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
      </div>
    </>
  );
}

export default Admin;
