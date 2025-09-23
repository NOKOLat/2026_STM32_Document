import { Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';

import Step2_01_UartSend from '../../pages/documents/step2/01_UartSend/01_UartSend';
import Step2_02_UartReceive from '../../pages/documents/step2/02_UartReceive/02_UartReceive';
import Step2_03_UartReceiveIT from '../../pages/documents/step2/03_UartReceiveIT/03_UartReceiveIT';
import Step2_04_Printf from '../../pages/documents/step2/04_Printf/04_Printf';



export default function Section2Routes() {

    return [

    <Route key="Step2_01_uart_send" path="/Step2_01_UartSend" element={<ProtectedRoute><Step2_01_UartSend /></ProtectedRoute>} />,
    <Route key="Step2_02_uart_receive" path="/Step2_02_UartReceive" element={<ProtectedRoute><Step2_02_UartReceive /></ProtectedRoute>} />,
    <Route key="Step2_03_uart_receive_it" path="/Step2_03_UartReceiveIT" element={<ProtectedRoute><Step2_03_UartReceiveIT /></ProtectedRoute>} />,
    <Route key="Step2_04_printf" path="/Step2_04_Printf" element={<ProtectedRoute><Step2_04_Printf /></ProtectedRoute>} />,
    ];
}
