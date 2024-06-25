import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

import { CCard, CCardBody, CCol, CRow } from '@coreui/react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const [pieChartData, setPieChartData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/pie-bar')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const inputData = await response.json()
      console.log(inputData)

      // Initialize empty arrays for labels and data
      const labels = []
      const data = []

      // Iterate over the object keys and populate labels and data arrays
      for (let key in inputData) {
        labels.push(key) // Push key (label) into labels array
        data.push(inputData[key]) // Push corresponding value (data point) into data array
      }

      // Construct datasets array with formatted data
      const datasets = [
        {
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Example colors
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Example colors
        },
      ]

      // Construct pieChartData object with labels and datasets
      const pieChartData = {
        labels: labels,
        datasets: datasets,
      }

      console.log(pieChartData) // Verify the structur

      setPieChartData(pieChartData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4>Pie Chart</h4>
              {pieChartData ? <Pie data={pieChartData} /> : <p>Loading...</p>}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
