import React, { PureComponent } from 'react';
import {Dot, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Routine: 2500, Emergency: 3651, Urgent: 2136 },
  { name: 'Feb', Routine: 3000, Emergency: 4000, Urgent: 4321 },
  { name: 'Mar', Routine: 2500, Emergency: 5000, Urgent: 2134 },
  { name: 'Apr', Routine: 4000, Emergency: 2377, Urgent: 1298 },
  { name: 'May', Routine: 4350, Emergency: 2537, Urgent: 1654 },
  { name: 'Jun', Routine: 3250, Emergency: 3277, Urgent: 2359 },
  { name: 'Jul', Routine: 4577, Emergency: 2327, Urgent: 3599 },
  { name: 'Aug', Routine: 2555, Emergency: 3363, Urgent: 2135},
  { name: 'Sep', Routine: 3248, Emergency: 3899, Urgent: 4899 },
  { name: 'Oct', Routine: 3257, Emergency: 2666, Urgent: 2000 },
  { name: 'Nov', Routine: 1577, Emergency: 1357, Urgent: 3000 },
  { name: 'Dec', Routine: 5000, Emergency: 3216, Urgent: 3500 },
];


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          width: "auto",
          fontFamily: "outfitmed",
          fontSize: "12px",
          color: "#ffffff",
          height: "90px",
          borderRadius: "5px",
          alignSelf: "center",
        }}
      >
        <p style={{ padding: "5px" }}>{`Month : ${label}`}</p>
        <p
          style={{
            color: "#ffffff",
            position: "relative",
            top: "-10px",
            left: "5px",
            marginLeft: "25px",
            paddingRight: "20px",
            fontFamily: "outfitlight",
          }}
        >{`Routine Operations: `}<span style={{fontFamily:'outfit'}}>{payload[0].value}</span></p>
        <p
          style={{
            color: "#ffffff",
            position: "relative",
            top: "-20px",
            left: "5px",
            marginLeft: "25px",
            paddingRight: "20px",
            fontFamily: "outfitlight",
          }}
        >{` Emergency Operations: `}<span style={{fontFamily:'outfit'}}>{payload[1].value}</span></p>
       
        <p
          style={{
            color: "#ffffff",
            position: "relative",
            top: "-30px",
            left: "5px",
            marginLeft: "25px",
            paddingRight: "20px",
            fontFamily: "outfitlight",
          }}
        >{`Urgent Operations : `}<span style={{fontFamily:'outfit'}}>{payload[2].value}</span></p>
      </div>
    );
  }

  return null;
};
export default class Areachart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-area-chart-4ujxw';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
  
  
           margin={{
            top: 20,
            right: 15,
            left: -20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="0 80" />
          <XAxis
            axisLine={false}
            dataKey="name"
            scale="point"
            padding={{ left: 0, right: 40}}
            tick={{ fontFamily: "outfit", fontSize: "12" ,fill:"#ced1d7"}}
          />
          <YAxis axisLine={false} tick={{ fontFamily: "outfit", fontSize: "11" ,fill:"#ced1d7"}} />
          <Tooltip
          content={<CustomTooltip />}
          active={true}
          contentStyle={{
            fontFamily: "outfitmed",
            fontSize: "12px",
            backgroundColor: "rgb(0,0,0,0.8)",
            color: "#ffffff",
            colorRendering: "#ffffff",
          }}
        />
          <Area
            type="monotone"
            dataKey="Routine"
            stroke="#6d00fc"
            strokeWidth={5} 
            dot={<circle r={3} fill="#6d00fc" stroke="#ffffff" strokeWidth={3} />}
            fill="url(#colorGradient1)" // Use the gradient with id "colorGradient1"
          />
          <Area
            type="monotone"
            dataKey="Emergency"
            stroke="#ffa63f"
            strokeWidth={2} 
            dot={<circle r={3} fill="#ffa63f" stroke="#ffffff" strokeWidth={3} />}
            fill="url(#colorGradient2)" // Use the gradient with id "colorGradient2"
          />
           <Area
            type="monotone"
            dataKey="Urgent"
            stroke="red"
            strokeWidth={3} 
            dot={<circle r={3} fill="red" stroke="#ffffff" strokeWidth={3} />}
            fill="url(#colorGradient3)" // Use the gradient with id "colorGradient2"
          />
          <defs>
            <linearGradient id="colorGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6d00fc" stopOpacity={0.2}/> // Start color and opacity
              <stop offset="95%" stopColor="#6d00fc" stopOpacity={0}/> // End color and opacity
            </linearGradient>
            <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffa63f" stopOpacity={0.2}/> // Start color and opacity
              <stop offset="95%" stopColor="#ffa63f" stopOpacity={0}/> // End color and opacity
            </linearGradient>
            <linearGradient id="colorGradient3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="red" stopOpacity={0.2}/> // Start color and opacity
              <stop offset="95%" stopColor="red" stopOpacity={0}/> // End color and opacity
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
