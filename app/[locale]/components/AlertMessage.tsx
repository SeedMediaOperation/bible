import { Alert } from 'antd'
import React from 'react'

const AlertMessage = (
    {
        type = 'info',
        message = '',
        description = '',
        closable = true,   // fix here
    }: {
      type?: 'success' | 'info' | 'warning' | 'error',
      message?: string,
      description?: string,
      closable?: boolean
    }
) => {
  return (
      <Alert
          message={message}
          description={description}
          type={type}
          closable={closable}  // fix here
          showIcon
      />
  )
}

export default AlertMessage
