import React from 'react';
import { data, Link, Navigate } from 'react-router-dom';
import './Dasboard.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TbVirusSearch } from "react-icons/tb";
import { RxCalendar } from "react-icons/rx";
import { BsCardChecklist } from "react-icons/bs";
import { GoTrophy } from "react-icons/go";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell, PieChart, Pie, Legend, TooltipProps, LegendProps } from 'recharts';




const Dashboard = ({ }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const goToAnalytics = () => {
    navigate('');

  }
  const goToCVAnalyzer = () => {
    navigate('');

  }


  const barChartdata = [
    { name: 'Network Engineer', users: 400 },
    { name: 'Software Engineer', users: 300 },
    { name: 'Data Scientist', users: 200 },
    { name: 'Product Manager', users: 278 },
    { name: 'UX Designer', users: 189 },
    { name: 'AI Specialist', users: 200 },
    { name: 'Full Stack Developer', users: 400 },
    { name: 'Mobile App Developer', users: 500 },
    { name: 'DevOps Engineer', users: 300 },
    { name: 'Cybersecurity Analyst', users: 250 },
    { name: 'Cloud Architect', users: 350 },
    { name: 'Database Administrator', users: 150 },
    { name: 'Systems Analyst', users: 220 },
    { name: 'Web Developer', users: 300 },
    { name: 'Business Analyst', users: 400 },
    { name: 'Network Administrator', users: 280 },
    { name: 'IT Support Specialist', users: 320 },
    { name: 'Data Analyst', users: 360 },
    { name: 'Game Developer', users: 200 },
    { name: 'Blockchain Developer', users: 150 },
    { name: 'Machine Learning Engineer', users: 300 },
    { name: 'Robotics Engineer', users: 180 },
    { name: 'Augmented Reality Developer', users: 220 },
    { name: 'Virtual Reality Developer', users: 170 },
    { name: 'Quantum Computing Specialist', users: 90 }
  ];

  const colors = [
    "#00FFAB",
    "#FF6B6B",
    "#3AB0FF",
    "#FFD93D",
    "#A66CFF",
    "#FF9F00"
  ];



  const rawData = [
    { name: 'Colombo', value: 52.1 },
    { name: 'Kandy', value: 20.3 },
    { name: 'Galle', value: 15.4 },
    { name: 'Jaffna', value: 10.2 },
    { name: 'Trincomalee', value: 3.9 },
    { name: 'Homagama', value: 20.3 }

  ];


  const total = rawData.reduce((sum, item) => sum + item.value, 0);

  // const donutData = rawData.map((item) => ({
  //   name : `${item.name}:${((item.value / total) * 100).toFixed(1)}%`,
  //   value: item.value,
  // }));



  // const donutData = rawData.map((item) => {
  //   const percent = ((item.value / total) * 100).toFixed(1);
  //   return {
  //     name: `${item.name}\u00A0\u00A0\u00A0\u00A0${percent}% `,
  //     // name:item.name,
  //     // name: `${item.name}${percent}% `,



  //     // name: `${item.name.padEnd(10,' ')} (${percent}%)`,
  //     // name: `${item.name} (${percent}%)`,
  //     value: item.value,

  //     percent: `${percent}%`,
  //   };
  // });


  const donutData = rawData.map((item) => {
    const percent = ((item.value / total) * 100).toFixed(1);
    return {
      name: item.name,           // Keep just the name here
      value: item.value,
      percent: `${percent}%`,    // Percent as separate field
    };
  });


  type CustomTooltipProps = TooltipProps<any, any> & {
    payload?: { payload: { percent: string; name: string } }[];
  };

  const CustomTooltip = (props: CustomTooltipProps) => {
    const { active, payload } = props;

    if (active && payload && payload.length > 0) {
      const { percent } = payload[0].payload;
      const { name } = payload[0].payload;
      return (
        <div style={{ backgroundColor: 'white', padding: '6px 10px', border: '1px solid #ccc', color: 'black', borderRadius: '4px' }}>
          {name}  {percent}
        </div>
      );
    }

    return null;
  };

  // type CustomLegendProps = LegendProps & {
  //   payload?: {payload:{name:string; percent:string}}[];
  // };

  // const CustomLegend = (props: CustomLegendProps) => {
  //   const { payload } = props;

  //   if ((payload ?? []).length > 0)
  //   {
  //     const { percent } = payload[0].payload;
  //     const {name} = payload[0].payload;

  //   }
  //   return null;
  // }



  type LegendPayloadItem = {
    payload: {
      name: string;
      percent: string; // your data uses percent as string (e.g. "52.1%")
    };
    color: string;
  };


  type CustomLegendProps = LegendProps & {
    payload?: LegendPayloadItem[];
  };

  const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
    if (!payload || payload.length === 0) {
      return null;
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 14 }}>
        {payload.map(({ payload: dataItem, color }, index) => {
          const { name, percent } = dataItem;
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: 160,
                marginBottom: 4,
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: 12,
                    height: 12,
                    backgroundColor: color,
                    marginRight: 8,
                    borderRadius: 2,
                  }}
                />
                <span style={{ paddingRight: 10 }}>{name}</span>
              </div>
              <span>{percent}</span>
            </div>
          );
        })}
      </div>
    );
  };



  // type CustomTooltipProps = TooltipProps<any, any> & {
  //   payload?: { payload: { percent: string; name: string } }[];
  // };

  // type LegendPayloadItem = TooltipProps<any, any> & {
  //   payload?: { name: string; percent: string }[];
  // };

  // interface LegendPayloadItem {
  //   value: number;
  //   name: string;
  //   color: string;
  //   percent: number;
  // }

  // interface CustomLegendProps {
  //   payload?: LegendPayloadItem[];
  // }

  // const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  //   if (!payload) return null;

  //   return (
  //     <div style={{ display: 'flex', flexDirection: 'column', fontSize: 14 }}>
  //       {payload.map(({ name, percent, color }, index) => (
  //         <div
  //           key={index}
  //           style={{
  //             display: 'flex',
  //             justifyContent: 'space-between',
  //             width: 140,
  //             marginBottom: 4,
  //             alignItems: 'center',
  //           }}
  //         >
  //           <div style={{ display: 'flex', alignItems: 'center' }}>
  //             <div
  //               style={{
  //                 width: 12,
  //                 height: 12,
  //                 backgroundColor: color,
  //                 marginRight: 8,
  //                 borderRadius: 2,
  //               }}
  //             />
  //             <span>{name}</span>
  //           </div>
  //           <span>{(percent * 100).toFixed(1)}%</span>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };




  // useEffect(() => {
  //   const total = rawData.reduce((sum, item) => sum + item.value, 0);
  //   const legendTexts = document.querySelectorAll('.recharts-legend-item-text');
  //   legendTexts.forEach((el, index) => {
  //     const item = rawData[index];
  //     const percent = ((item.value / total) * 100).toFixed(1);
  //     el.innerHTML = `
  //       <div style="display: flex; justify-content: space-between; width: 140px;">
  //         <span>${item.name}</span>
  //         <span>${percent}%</span>
  //       </div>
  //     `;
  //   });
  // }, []);




  console.log(barChartdata);
  // console.log(donutData);



    const historyData = [
      { candidate: 'Ashan Karunarathna', date: '2025-06-23', score: '87%', status: 'Matched' },
      { candidate: 'Hasunika Nirmani', date: '2025-06-22', score: '75%', status: 'Pending' },
      { candidate: 'Achini Irushika', date: '2025-06-20', score: '92%', status: 'Matched' },
      { candidate: 'Ishara Maduwantha', date: '2025-06-18', score: '60%', status: 'Rejected' },
    ];

    



  return (
    <div className='dashboard-wapper-body'>
      <div className='dashboard-navigation'>
        <p>CVScreen</p>
        <div className='dashboard-nav-buttons'>
          <Link to="/dashboard" className={`nav-buttons-text ${location.pathname === "/dashboard" ? "active" : ""}`}>Dashboard</Link>
          <Link to="" className={`nav-buttons-text${location.pathname === "" ? "active" : ""}`}>Account</Link>
          <Link to="/" className={`nav-buttons-text ${location.pathname === "" ? "active" : ""}`}>Log out</Link>
        </div>
      </div>
      <div className='dashboard-main-mover'>
        <button className='dashboard-analytics-button' onClick={goToAnalytics}>Analytics</button>
        <button className='dashboard-cv-analyzer-button' onClick={goToCVAnalyzer}>CV Analyzer</button>
      </div>


      <div className='dashboard-cards-wapper'>
        <div className='dashboard-card'>
          <h5>Analyze Count (All time)</h5>
          <p>157</p>
          <span className='card-icon'><TbVirusSearch /></span>
        </div>
        <div className='dashboard-card'>
          <h5>Analyze Count (Past 30 Days)</h5>
          <p>41</p>
          <span className='card-icon'><RxCalendar /></span>
        </div>
        <div className='dashboard-card'>
          <h5>Hire Count</h5>
          <p>67</p>
          <span className='card-icon'><BsCardChecklist /></span>
        </div>
        <div className='dashboard-card'>
          <h5>Analyze Count (All Time)</h5>
          <p>157</p>
          <span className='card-icon'><GoTrophy /></span>
        </div>
      </div>

      <div className='dashboard-bar-wrapper'>
        <div className='dashboard-bar-chart'>
          <label>CV Types by Profession</label>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartdata} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              {/* <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} minTickGap={15} /> */}
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" barSize={50} radius={[10, 10, 0, 0]} >
                {barChartdata.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className='donut-table-wapper'>
        <div className='dashboard-donut-chart-wrapper'>
          <div className='dashboard-donut-chart'>
            <label>Candidates by Location</label>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={50}
                  paddingAngle={2}
                  fill="#8884d8">
                  {/* label */}
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip content={CustomTooltip} />
                {/* <Legend content={</CustomLegend>} verticalAlign="middle" align="right" layout="vertical"/> */}
                <Legend content={<CustomLegend />} verticalAlign="middle" align="right" layout="vertical" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="analyze-history-wrapper">
      <div className="analyze-history-table">
        <label>Analysis History</label>
        <table>
          <thead>
            <tr>
              <th><center>Candidate</center></th>
              <th><center>Date</center></th>
              <th><center>Similarity Score</center></th>
              <th><center>Status</center></th>
              {/* <th>Date</th>
              <th>Similarity Score</th>
              <th>Status</th> */}
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, index) => (
              <tr key={index}>
                <td>{item.candidate}</td>
                <td><center>{item.date}</center></td>
                 <td><center>{item.score}</center></td>
                {/* <td>{item.score}</td> */}
                <td className={`status ${item.status.toLocaleLowerCase()}`}><center>{item.status}</center></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


       

        </div>

      </div>

    </div>
  );
}

export default Dashboard;