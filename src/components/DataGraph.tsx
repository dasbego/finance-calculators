import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { InvestmentGrowthData } from "./CompounInterestCalculator";

interface GraphProps {
  growthData: InvestmentGrowthData[];
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
const Graph: React.FC<GraphProps> = ({ growthData }) => {
  const data = {
    labels: growthData.map((data) => `Year ${data.year}`),
    datasets: [
      {
        label: "Initial Deposit",
        data: growthData.map((data) => data.initDeposit),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        label: "Accumulated Deposits",
        data: growthData.map((data) => data.accumulatedDeposits),
        backgroundColor: "rgba(153,102,255,0.6)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
      },
      {
        label: "Accumulated Interest",
        data: growthData.map((data) => data.accumulatedInterest),
        backgroundColor: "rgba(255,159,64,0.6)",
        borderColor: "rgba(255,159,64,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          title: function (tooltipItems: any[]) {
            const tooltipItem = tooltipItems[0];
            return `Year ${growthData[tooltipItem.dataIndex].year}`;
          },
          label: function (tooltipItems: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dataset: any;
            dataIndex: string | number;
          }) {
            const dataset = tooltipItems.dataset;
            const currentValue = dataset.data[tooltipItems.dataIndex];
            return `${dataset.label}: ${formatCurrency(currentValue)}`;
          },
          formatCurrency,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        stacked: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Graph;
