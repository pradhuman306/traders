import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { makePositive, priceFormatter, titleCase } from "../../actions/common";
import { useDispatch, useSelector } from "react-redux";
import { getAllTotalData } from "../../actions/auth";
import Select from "react-select";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  ArcElement,
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
  const [buyMonths, setBuyMonths] = useState([]);
  const [buyList, setBuyListValue] = useState([]);
  const [sellList, setSellListValue] = useState([]);
  const [expenseList, setExpenseListValue] = useState([]);
  const [profitList, setProfitListValue] = useState([]);
  const [itemListValue, setItemListValue] = useState([]);
  const [items, setItems] = useState([]);

  const labels = buyMonths;
  const itemLabels = items;
  const totalBuy = buyList;
  const totalSell = sellList;
  const totalExpense = expenseList;
  const totalProfit = profitList;
  const options = {
    responsive: true,
    bezierCurve: true,
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
        border: {
          display: false,
        },
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
        border: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 1.5,
      },
    },
  };

  const buyChart = {
    labels,
    datasets: [
      {
        label: "Total Buy",
        data: totalBuy.map((amount) => amount),
        borderColor: "rgb(10 129 209)",
        backgroundColor: "rgba(10, 129, 209, 0.3)",
        borderWidth: 2,
      },
    ],
  };

  const sellChart = {
    labels,
    datasets: [
      {
        label: "Total Sell",
        data: totalSell.map((amount) => amount),
        borderColor: "rgb(5, 99, 129)",
        backgroundColor: "rgba(5, 99, 129, 0.3)",
        borderWidth: 2,
      },
    ],
  };

  const expenseChart = {
    labels,
    datasets: [
      {
        label: "Total Expense",
        data: totalExpense.map((amount) => amount),
        borderColor: "rgb(15, 139, 122)",
        backgroundColor: "rgba(15, 139, 122, 0.3)",
        borderWidth: 2,
      },
    ],
  };

  const profitChart = {
    labels,
    datasets: [
      {
        label: "Total",
        data: totalProfit.map((amount) => amount),
        borderColor: "rgb(0, 128, 0)",
        backgroundColor: "rgba(0, 128, 0, 0.3)",
        borderWidth: 2,
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
    let items = [];
    let itemListData = [];

    if (totalData) {
      let yearList = [
        { label: currentYear, value: currentYear }
      ];
      let totalProfitLoss =
        parseInt(totalData?.sale) -
        (parseInt(totalData?.buy) +
          parseInt(totalData?.investment) +
          parseInt(totalData?.rent));
      setTotalProfitLoss(totalProfitLoss);
      if (totalData.year && totalData.year.length) {
        totalData.year.map((item) => {
          yearList.push({ label: item, value: item });
        });
      }
      if (totalData.buyMonths) {
        Object.entries(totalData.buyMonths).forEach(([key, value]) => {
          months.push(key);
          buyListMonth.push(value);
        });
      }
      if (totalData.saleMonths) {
        Object.entries(totalData.saleMonths).forEach(([key, value]) => {
          sellListMonth.push(value);
        });
      }
      if (totalData.expenseMonths) {
        Object.entries(totalData.expenseMonths).forEach(([key, value]) => {
          expenseListMonth.push(value);
        });
      }

      if (totalData.profitMonths) {
        Object.entries(totalData.profitMonths).forEach(([key, value]) => {
          profitListMonth.push(value);
        });
      }

      if (totalData.items) {
        totalData.items.map((item) => {
          items.push(item.name);
          itemListData.push(item.weight);
        });
      }

      setYearList(yearList);
      setBuyMonths(months);
      setBuyListValue(buyListMonth);
      setSellListValue(sellListMonth);
      setExpenseListValue(expenseListMonth);
      setProfitListValue(profitListMonth);
      setItemListValue(itemListData);
      setItems(items);
    }
  }, [totalData]);

  const handleSelectChange = (e) => {
    dispatch(getAllTotalData({ user_id: user_id, year: e.value }));
    setYearValue(e);
  };

  const data = {
    labels: ["Total Buy", "Total Sell", "Total Expense", "Profit/Loss"],
    datasets: [
      {
        label: "₹",
        data: [
          totalData?.buy,
          totalData?.sale,
          totalData?.expense,
          totalData?.profit,
        ],
        backgroundColor: [
          "rgba(7, 84, 137, 1)",
          "rgba(0, 164, 217, 1)",
          "rgba(215, 142, 9,1)",
          "rgba(3, 64, 3, 1)",
        ],
        borderColor: [
          "rgba(7, 84, 137, 1)",
          "rgba(0, 164, 217, 1)",
          "rgba(215, 142, 9, 1)",
          "rgba(3, 64, 3, 1)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: {
        position: "bottom",

        display: false,
      },
    },
  };
  const StockChart = {
    labels: itemLabels,
    datasets: [
      {
        data: itemListValue ? itemListValue.map((stock) => stock) : null,
        backgroundColor: [
          "rgba(234, 173, 47, 1)",
          "rgba(234, 235, 239,1)",
          "rgba(236, 187, 109, 1)",
          "rgba(227, 208, 174, 1)",
        ],
        borderColor: [
          "rgba(235, 164, 3, 1)",
          "rgba(234, 235, 239,1)",
          "rgba(236, 187, 109, 1)",
          "rgba(227, 208, 174, 1)",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      <Header heading="Dashboard" {...props} />
      <div className="body-content">
        <div className="body-content-wrap">
          {totalData ? (
            <>
              <div className="year-filter">
                <h1>Analytics</h1>
                <div className="form-group">
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
              <div className="desktop-wrap">
                <div className="desktop-wrap-left">
                  <div className="desktop-box box-first">
                    <div className="desktop-box-inr">
                      <div>
                        <p>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 5.5H19L18 19H2L1 5.5Z"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 7.5V1H14V7.5"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 15H14"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          Total buy
                        </p>
                        <h3>{priceFormatter(totalData?.buy)}</h3>
                      </div>
                      <div>
                        <Line options={options} data={buyChart} />
                      </div>
                    </div>
                  </div>
                  <div className="desktop-box box-second">
                    <div className="desktop-box-inr">
                      <div>
                        <p>
                          {" "}
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.41 11.41L12.58 2.58C12.21 2.21 11.7 2 11.17 2H4C2.9 2 2 2.9 2 4V11.17C2 11.7 2.21 12.21 2.59 12.58L11.42 21.41C12.2 22.19 13.47 22.19 14.25 21.41L21.42 14.24C22.2 13.46 22.2 12.2 21.41 11.41ZM12.83 20L4 11.17V4H11.17L20 12.83L12.83 20Z"
                              fill="black"
                            ></path>
                            <path
                              d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
                              fill="black"
                            ></path>
                          </svg>{" "}
                          Total Sell
                        </p>
                        <h3>{priceFormatter(totalData?.sale)}</h3>
                      </div>
                      <div>
                        <Line options={options} data={sellChart} />
                      </div>
                    </div>
                  </div>
                  <div className="desktop-box box-third">
                    <div className="desktop-box-inr">
                      <div>
                        <p>
                          {" "}
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 18L17.5 15.5L15.0002 13"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M19 18L21.5 15.5L19.0002 13"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M21.5 11V4.5C21.5 3.94771 21.0523 3.5 20.5 3.5H3.5C2.94771 3.5 2.5 3.94771 2.5 4.5V19.5C2.5 20.0523 2.94771 20.5 3.5 20.5H14.2353"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.5 7.5L9 10.5L11.5 7.5"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 13.5H12"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 10.5H12"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 10.5V16.5"
                              stroke="black"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>{" "}
                          Total Expenses
                        </p>
                        <h3>
                          {priceFormatter(
                            totalData.investment + totalData.rent
                          )}
                        </h3>
                      </div>
                      <div>
                        <Line options={options} data={expenseChart} />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`desktop-box box-fourth ${
                      totalProfitLoss < 0 ? "loss " : "profit "
                    }`}
                  >
                    <div className="desktop-box-inr">
                      <div>
                        <p>
                          {totalProfitLoss < 0 ? (
                            <svg
                              width="26"
                              height="18"
                              viewBox="0 0 26 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_434_2)">
                                <path d="M6 6V14H8V6H6Z" fill="black" />
                                <path d="M9 8V14H11V8H9Z" fill="black" />
                                <path d="M12 11V14H14V11H12Z" fill="black" />
                                <path
                                  d="M23.5 1H2.5C1.3 1 1 1.9697 1 2.45455V15.5455C1 16.7091 2 17 2.5 17H23.5C24.7 17 25 16.0303 25 15.5455V2.45455C25 1.29091 24 1 23.5 1Z"
                                  stroke="black"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M21 7H15V5H21V7Z"
                                  fill="black"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_434_2">
                                  <rect width="26" height="18" fill="black" />
                                </clipPath>
                              </defs>
                            </svg>
                          ) : (
                            <svg
                              width="26"
                              height="18"
                              viewBox="0 0 26 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_434_8)">
                                <path d="M22 5V13H20V5H22Z" fill="black" />
                                <path d="M19 7V13H17V7H19Z" fill="black" />
                                <path d="M16 10V13H14V10H16Z" fill="black" />
                                <path
                                  d="M23.5 1H2.5C1.3 1 1 1.9697 1 2.45455V15.5455C1 16.7091 2 17 2.5 17H23.5C24.7 17 25 16.0303 25 15.5455V2.45455C25 1.29091 24 1 23.5 1Z"
                                  stroke="black"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.25 8.75V11H8.75V8.75H11V7.25H8.75V5H7.25V7.25H5V8.75H7.25Z"
                                  fill="black"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_434_8">
                                  <rect width="26" height="18" fill="black" />
                                </clipPath>
                              </defs>
                            </svg>
                          )}

                          {totalProfitLoss < 0
                            ? "Total Loss "
                            : "Total Profit "}
                        </p>
                        <h3>{priceFormatter(totalProfitLoss)}</h3>
                      </div>
                      <div>
                        <Line options={options} data={profitChart} />
                      </div>
                    </div>
                  </div>
                  <div className="desktop-box balance-box">
                    <div className="desktop-box-inr">
                      <div>
                        <p>Total balance amount</p>
                        <h3>
                          {priceFormatter(
                            makePositive(totalData.balance_amount)
                          )}
                          {totalData.balance_amount > 0 ? " Dr." : " Cr."}
                        </h3>
                      </div>
                      <div className="box-icon">
                        <svg
                          width="75px"
                          height="75px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g>
                            <path d="M14 2a8 8 0 0 1 3.292 15.293A8 8 0 1 1 6.706 6.707 8.003 8.003 0 0 1 14 2zm-4 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm1 1v1h2v2H9a.5.5 0 0 0-.09.992L9 13h2a2.5 2.5 0 1 1 0 5v1H9v-1H7v-2h4a.5.5 0 0 0 .09-.992L11 15H9a2.5 2.5 0 1 1 0-5V9h2zm3-5a5.985 5.985 0 0 0-4.484 2.013 8 8 0 0 1 8.47 8.471A6 6 0 0 0 14 4z"></path>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="desktop-box panding-box">
                    <div className="desktop-box-inr">
                      <div>
                        <p>Total pending transport</p>
                        <h3>{priceFormatter(totalData.pending_rent)}</h3>
                      </div>
                      <div className="box-icon">
                        <svg
                          width="75"
                          height="75"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transport-icon"
                        >
                          <path
                            d="M21 4H10C9.73478 4 9.48043 4.10536 9.29289 4.29289C9.10536 4.48043 9 4.73478 9 5V16C9 16.2652 9.10536 16.5196 9.29289 16.7071C9.48043 16.8946 9.73478 17 10 17H21C21.2652 17 21.5196 16.8946 21.7071 16.7071C21.8946 16.5196 22 16.2652 22 16V5C22 4.73478 21.8946 4.48043 21.7071 4.29289C21.5196 4.10536 21.2652 4 21 4ZM2 17H9V10H5.5L2 13.231V17Z"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M9 18C9 18.5304 8.78929 19.0391 8.41421 19.4142C8.03914 19.7893 7.53043 20 7 20C6.46957 20 5.96086 19.7893 5.58579 19.4142C5.21071 19.0391 5 18.5304 5 18M20 18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20C17.4696 20 16.9609 19.7893 16.5858 19.4142C16.2107 19.0391 16 18.5304 16 18"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="graph-wrap row">
                <div className="col-lg-6 col-md-12">
                  <div className="desktop-box graph-box">
                    <div className="desktop-box-inr">
                      <div>
                        <h3>Stock chart</h3>
                        <div className="justify-content-center">
                          <Bar data={StockChart} options={barOptions} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
