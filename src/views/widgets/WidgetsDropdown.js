import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = (props) => {
  const widgetChartRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  const [data, setData] = useState({
    LastTransactionSenddatetime: null,
    LastResponseReceiveTime: null,
    LastDiffFileReceiveDatetime: null,
    LastInitFileReceiveDatetime: null,
    LastViolationSendDateTime: null,
    LastViolationRespReceiveDateTime: null,
    HeartBeatStatus: null,
    LastCheckTxnSendDatetIme: null,
    TotalPendingTxn: null,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8000/')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const jsonData = await response.json()
        console.log('Fetched data:', jsonData)
        setData(jsonData) // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 20000) // Poll every 20 seconds

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const handleColorSchemeChange = () => {
      widgetChartRefs.forEach((ref, index) => {
        if (ref.current) {
          setTimeout(() => {
            ref.current.data.datasets[0].pointBackgroundColor = getStyle(
              `--cui-${chartsData[index].color}`,
            )
            ref.current.update()
          })
        }
      })
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)

    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
    }
  }, [widgetChartRefs])

  useEffect(() => {
    console.log('Data state updated:', data)
  }, [data])

  const chartsData = [
    {
      color: 'primary',
      value: (
        <>
          {data.LastTransactionSenddatetime ? (
            <>
              {new Date(data.LastTransactionSenddatetime).toLocaleString()}
              <span className="fs-6 fw-normal"></span>
            </>
          ) : (
            'Loading...'
          )}
        </>
      ),
      title: 'Last Transaction Send Time',
      chartData: [65, 59, 84, 84, 51, 55, 40], // Placeholder data for chart (if applicable)
    },
    {
      color: 'info',
      value: (
        <>
          {data.LastResponseReceiveTime ? (
            <>
              {new Date(data.LastResponseReceiveTime).toLocaleString()}
              <span className="fs-6 fw-normal"></span>
            </>
          ) : (
            'Loading...'
          )}
        </>
      ),
      title: 'Last Response Receive Time',
      chartData: [1, 18, 9, 17, 34, 22, 11], // Placeholder data for chart (if applicable)
    },
    {
      color: 'warning',
      value: (
        <>
          {data.LastDiffFileReceiveDatetime ? (
            <>
              {new Date(data.LastDiffFileReceiveDatetime).toLocaleString()}
              <span className="fs-6 fw-normal"></span>
            </>
          ) : (
            'Loading...'
          )}
        </>
      ),
      title: 'Last Diff File Receive Time',
      chartData: [9, 8, 7, 6, 5, 4, 3], // Placeholder data for chart (if applicable)
    },
    {
      color: 'danger',
      value: (
        <>
          {data.LastInitFileReceiveDatetime ? (
            <>
              {new Date(data.LastInitFileReceiveDatetime).toLocaleString()}
              <span className="fs-6 fw-normal"></span>
            </>
          ) : (
            'Loading...'
          )}
        </>
      ),
      title: 'Last Init File Receive Time',
      chartData: [78, 81, 80, 45, 34, 12, 40], // Placeholder data for chart (if applicable)
    },
    {
      color: 'success',
      value: (
        <>
          {data.LastViolationSendDateTime ? (
            <>
              {new Date(data.LastViolationSendDateTime).toLocaleString()}
              <span className="fs-6 fw-normal"></span>
            </>
          ) : (
            'Loading...'
          )}
        </>
      ),
      title: 'Last Violation Send Time',
      chartData: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82], // Placeholder data for chart (if applicable)
    },
    {
      color: 'dark',
      value: (
        <>
          {data.LastViolationRespReceiveDateTime ? (
            <>
              {new Date(data.LastViolationRespReceiveDateTime).toLocaleString()}
              <span className="fs-6 fw-normal"></span>
            </>
          ) : (
            'Loading...'
          )}
        </>
      ),
      title: 'Last Violation Response Receive Time',
      chartData: [34, 45, 12, 67, 34, 23, 56], // Placeholder data for chart (if applicable)
    },
    {
      color: 'secondary',
      value: (
        <>
          {data.HeartBeatStatus ? (
            <>
              {data.HeartBeatStatus}
              <span className="fs-6 fw-normal"></span>
            </>
          ) : (
            'Loading...'
          )}
        </>
      ),
      title: 'Heartbeat Status',
      chartData: [78, 56, 34, 23, 12, 45, 67], // Placeholder data for chart (if applicable)
    },
    {
      color: 'danger',
      value: (
        <>
          {data.LastCheckTxnSendDatetIme ? (
            <>
              {new Date(data.LastCheckTxnSendDatetIme).toLocaleString()}
              <span className="fs-6 fw-normal"></span>
            </>
          ) : (
            'Loading...'
          )}
        </>
      ),
      title: 'Last Check Transaction Send Time',
      chartData: [22, 33, 45, 67, 89, 54, 32], // Placeholder data for chart (if applicable)
    },
    {
      color: 'info',
      value: (
        <>
          {data.TotalPendingTxn !== null ? (
            <>
              {data.TotalPendingTxn}
              <span className="fs-6 fw-normal"></span>
            </>
          ) : (
            'Loading...'
          )}
        </>
      ),
      title: 'Total Pending Transactions',
      chartData: [12, 23, 34, 45, 56, 67, 78], // Placeholder data for chart (if applicable)
    },
  ]

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      {chartsData.map((widget, index) => (
        <CCol sm={6} xl={4} xxl={4} key={index}>
          <CWidgetStatsA
            color={widget.color}
            value={widget.value}
            title={widget.title}
            action={
              <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                  <CIcon icon={cilOptions} />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>Action</CDropdownItem>
                  <CDropdownItem>Another action</CDropdownItem>
                  <CDropdownItem>Something else here...</CDropdownItem>
                  <CDropdownItem disabled>Disabled action</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              index < 7 ? (
                <CChartLine
                  ref={widgetChartRefs[index]}
                  className="mt-3 mx-3"
                  style={{ height: '70px' }}
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: 'My First dataset',
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointBackgroundColor: getStyle(`--cui-${widget.color}`),
                        data: widget.chartData,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        border: {
                          display: false,
                        },
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        min: Math.min(...widget.chartData) - 10,
                        max: Math.max(...widget.chartData) + 10,
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: 1,
                        tension: 0.4,
                      },
                      point: {
                        radius: 4,
                        hitRadius: 10,
                        hoverRadius: 4,
                      },
                    },
                  }}
                />
              ) : (
                <CChartBar
                  ref={widgetChartRefs[index]}
                  className="mt-3 mx-3"
                  style={{ height: '70px' }}
                  data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                      {
                        label: 'My First dataset',
                        backgroundColor: 'rgba(255,255,255,.2)',
                        borderColor: 'rgba(255,255,255,.55)',
                        data: widget.chartData,
                        barPercentage: 0.6,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                          drawTicks: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        border: {
                          display: false,
                        },
                        grid: {
                          display: false,
                          drawBorder: false,
                          drawTicks: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                  }}
                />
              )
            }
          />
        </CCol>
      ))}
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
