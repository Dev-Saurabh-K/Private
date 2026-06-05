
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { data } from 'react-router-dom';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = () => {

  const URL = `${import.meta.env.VITE_API_URL}/api/analytics/subjectscore`;
  const token = localStorage.getItem("access_token");
  const [subjects, setSubjects] = useState([]);
  const [average_scores, setAverage_scores] = useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
      const res=await axios.get(URL,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if(res){
        setSubjects(res.data.subjects)
        setAverage_scores(res.data.average_scores)
      }
    }
    fetchData()
  },[])

  const chartData = {
    // labels: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer'],
    labels: subjects,

    datasets: [
      // {
      //   label: 'Quiz Performance (Subject-wise)',
      //   data: [88, 72, 52, 46, 92],
      //   backgroundColor: 'rgba(75, 192, 192, 0.6)',
      //   borderColor: 'rgba(75, 192, 192, 1)',
      //   borderWidth: 1,
      // },
      {
        label: 'Quiz Performance (Subject-wise)',
        data: average_scores,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Recent Quiz Performance' },
    },
  };

  return (
    <div className="w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;