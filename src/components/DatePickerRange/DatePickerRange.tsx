import { useEffect, useRef, useState } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

interface DatePickerProps {
  value?: any,
  onChange?: (dates?: any) => void

}

const PRESET_RANGES: any = {
  今天: [moment().startOf('day'), moment().endOf('day')],
  昨天: [
    moment()
      .subtract(1, 'day')
      .startOf('day'),
    moment()
      .subtract(1, 'day')
      .endOf('day')
  ],
  近7天: [
    moment()
      .subtract(6, 'day')
      .startOf('day'),
    moment().endOf('day')
  ],
  本月: [
    moment()
      .startOf('month')
      .startOf('day'),
    moment().endOf('day')
  ],
  上月: [
    moment()
      .subtract(1, 'month')
      .startOf('month')
      .startOf('day'),
    moment()
      .subtract(1, 'month')
      .endOf('month')
      .endOf('day')
  ],
  近1个月: [
    moment()
      .subtract(1, 'month')
      .startOf('day'),
    moment().endOf('day')
  ],
  近3个月: [
    moment()
      .subtract(3, 'month')
      .startOf('day'),
    moment().endOf('day')
  ]
}

/**
 * @description 判断两个dates的两个值是否都是同一天
 * @param a {[moment, moment]}
 * @param b {[moment, moment]}
 * @return {boolean}
 */
const checkDatesEqual = (a: any, b: any) => {
  const diffSizeA = a ? a?.map((d: any) => (d ? d.format('YYYY-MM-DD') : d)) : a
  const diffSizeB = b ? b?.map((d: any) => (d ? d.format('YYYY-MM-DD') : d)) : b
  return String(diffSizeA) === String(diffSizeB)
}

const DatePickerRange = ({ value, onChange, ...props }: DatePickerProps) => {
  const dateValue = useRef(null) // 快捷选择当天有问题，所以用useRef同步状态而不是useState异步状态
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    dateValue.current = value
  }, [value])

  const changeHandler = (dates: any) => {
    dateValue.current = dates
    if (!panelOpen) {
      triggerChangeHandler(dates)
    }
  }

  const openChangeHandler = (open: any) => {
    if (!open && !checkDatesEqual(dateValue.current, value)) {
      triggerChangeHandler(dateValue.current)
    }
    setPanelOpen(open)
  }

  const triggerChangeHandler = (dates: any) => {
    onChange?.(dates)
  }
  return (
    <DatePicker.RangePicker
      value={value}
      allowEmpty={[true, true]}
      ranges={PRESET_RANGES}
      {...props}
      open={panelOpen}
      onCalendarChange={changeHandler}
      onOpenChange={openChangeHandler}
    />
  )
}



export default DatePickerRange
