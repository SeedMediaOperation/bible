import React, { useEffect, useState } from 'react'
import AlertMessage from './AlertMessage';
import { alertService } from '@/lib/alertServices';

type Alert = {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  description?: string;
};

const AlertContainer = () => {
    const [alert, setAlert] = useState<Alert | null>(null);

    useEffect(() => {
        const handleAlert = (alertData: Alert) => {
            setAlert(alertData);
            setTimeout(() => setAlert(null), 5000); // Auto-close alert after 5s
        };

        alertService.subscribe(handleAlert);
        return () => alertService.unsubscribe(handleAlert);
    }, []);

    return alert ? (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
            <AlertMessage {...alert} />
        </div>
    ) : null;
}

export default AlertContainer;
