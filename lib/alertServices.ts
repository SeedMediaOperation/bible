type Alert = {
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    description?: string;
  };

type AlertCallback = (alert: Alert) => void;

  
const subscribers: AlertCallback[] = [];

export const alertService = {
  subscribe: (callback: AlertCallback) => {
    subscribers.push(callback);
  },
  unsubscribe: (callback: AlertCallback) => {
    const index = subscribers.indexOf(callback);
    if (index > -1) subscribers.splice(index, 1);
  },
  sendAlert: (type: Alert['type'], message: string, description = '') => {
    subscribers.forEach((callback) => callback({ type, message, description }));
  },
  success: (message: string, description?: string) => {
    alertService.sendAlert('success', message, description);
  },
  error: (message: string, description = '') => {
    alertService.sendAlert('error', message, description);
  },
  info: (message: string, description = '') => {
    alertService.sendAlert('info', message, description);
  },
  warning: (message: string, description = '') => {
    alertService.sendAlert('warning', message, description);
  },
};
